"""Run against the real local replay stack. Requires Playwright, pandas and pyarrow."""
import argparse
import io
import re
from math import isclose
from urllib.parse import urlparse
from zipfile import ZipFile

import pandas as pd
from playwright.sync_api import expect, sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("bundle")
parser.add_argument("--base", default="http://localhost:5173")
parser.add_argument("--channel", default="chromium")
parser.add_argument("--model-id", help="Select the imported model when several models are available")
args = parser.parse_args()
with ZipFile(args.bundle) as archive:
    snapshot = pd.read_parquet(io.BytesIO(archive.read("snapshot.parquet")))

with sync_playwright() as pw:
    browser = pw.chromium.launch(channel=args.channel)
    context = browser.new_context()
    page = context.new_page()
    page.goto(args.base + "/#/regimes")
    page.get_by_role("tab", name="历史回放").click()
    if args.model_id:
        page.get_by_label("研究标的", exact=True).select_option(args.model_id)
    start = page.get_by_role("button", name="启动回放")
    expect(start).to_be_enabled(timeout=30000)
    with page.expect_response(lambda response: response.request.method == "POST"
                              and urlparse(response.url).path == "/api/v1/stream/sessions") as started:
        start.click()
    assert started.value.ok, started.value.status
    sid = started.value.json()["session_id"]
    session = page.get_by_label("回放记录", exact=True)
    expect(session).to_have_value(sid)
    completion = page.locator(".replay-session-status")
    expect(completion).to_contain_text("已完成", timeout=240000)
    expect(completion).to_contain_text(re.compile(r"30\s*/\s*30"))
    def query(endpoint):
        response = context.request.get(args.base + "/api/v1/" + endpoint, params={"session_id": sid})
        assert response.ok, response.status
        return response.json()["items"]
    states = query("regimes")
    observations = query("features")
    dates = [row["business_date"] for row in states]
    assert len(dates) == len(set(dates)) == len(observations) == 30
    assert dates == sorted(dates)
    day = dates[-1]
    state = states[-1]
    close = snapshot.loc[snapshot.business_date.astype(str).str[:10] == day, "close"].item()
    assert isclose(float(close), float(state["close"]), rel_tol=1e-10)
    expected_features = next(row["features"] for row in observations if row["business_date"] == day)
    assert len(expected_features) == 6 and len(state["probabilities"]) == 3
    assert isclose(sum(state["probabilities"]), 1, abs_tol=1e-8)
    for step in ("initial", "refresh", "reconnect"):
        if step == "refresh":
            page.reload()
        if step == "reconnect":
            context.set_offline(True)
            page.wait_for_timeout(2200)
            context.set_offline(False)
        page.get_by_role("tab", name="历史回放").click()
        expect(session).to_have_value(sid)
        selector = page.get_by_label("交易日期", exact=True)
        expect(selector.locator("option")).to_have_count(31)
        assert selector.locator("option").all_text_contents()[1:] == dates
        selector.select_option(day)
        price = page.locator(".replay-quote-head h2")
        expect(price).to_have_attribute("title", state["close"])
        # The main quote is formatted to two decimals; its tooltip retains the exact API value.
        assert isclose(float(price.inner_text().replace(",", "")), float(state["close"]), rel_tol=0, abs_tol=0.00500001)
        for name, value in expected_features.items():
            expect(page.locator("dt").filter(has_text={"return_1d":"单日对数收益率","momentum_5d":"5 日动量","momentum_20d":"20 日动量","volatility_20d":"20 日年化波动率","ma_deviation_20d":"20 日均线偏离","drawdown_60d":"60 日回撤"}[name]).locator("..").locator("dd")).to_have_text(f"{value:.6f}")
        probabilities = [f"{p * 100:.2f}%" for p in state["probabilities"]]
        expect(page.locator(".replay-probabilities > span > b")).to_have_text(probabilities)
    print(f"PASS {sid}: 30 dates, snapshot/API/UI close, six features and three probabilities")
    browser.close()
