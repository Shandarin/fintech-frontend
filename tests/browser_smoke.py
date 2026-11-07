"""UI regression checks using only empty API responses or explicit failures.

No financial values, models, news, forecasts or example accounts are supplied.
Run after npm run build:portable. Requires Playwright and Chromium.
Set CHROMIUM_PATH or PREVIEW_BASE to use an existing browser/server.
"""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import re
import threading
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
ARTIFACTS = ROOT / 'artifacts'
ARTIFACTS.mkdir(exist_ok=True)
results = []

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = None
base = os.environ.get('PREVIEW_BASE')
if not base:
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}/RegimeLab-preview.html'

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 1440, 'height': 1024}, device_scale_factor=1)
    context.add_init_script("""(() => {
      localStorage.setItem('regimelab.workspace.v1', JSON.stringify({schema:1,
        users:[{id:'old-user',name:'LEGACY_DEMO_ACCOUNT',active:true,role:'admin'}],
        sessionUserId:'old-user',rules:[],alerts:[{id:'legacy-alert',title:'LEGACY_DEMO_ALERT'}],
        checkpoints:[{id:'legacy-checkpoint'}], prefs:{positiveGreen:false,compact:false}}));
    })();""")
    page = context.new_page()
    page.set_default_timeout(6000)
    page_errors = []
    requests = []
    mode = {'value': 'empty'}
    page.on('pageerror', lambda error: page_errors.append(str(error)))

    def respond(route):
        requests.append({'url': route.request.url, 'method': route.request.method})
        if mode['value'] == 'error':
            route.fulfill(status=503, content_type='application/json', body=json.dumps({'error': {'message': 'Service unavailable'}}))
        elif '/stream/status' in route.request.url:
            route.fulfill(status=200, content_type='application/json', body='{"ready":false}')
        elif '/market/latest' in route.request.url:
            route.fulfill(status=200, content_type='application/json', body='{}')
        else:
            route.fulfill(status=200, content_type='application/json', body='{"items":[],"next_cursor":""}')

    page.route(re.compile(r'/(?:market-api|api)/'), respond)
    page.goto(base + '#/overview')
    expect(page.locator('h1')).to_have_text('市场总览')

    def run(name, fn):
        try:
            fn()
            results.append({'name': name, 'result': 'PASS'})
            print('PASS', name)
        except Exception as error:
            results.append({'name': name, 'result': 'FAIL', 'error': str(error)[:1600]})
            print('FAIL', name, str(error)[:300])
            page.keyboard.press('Escape')

    def go(route):
        page.keyboard.press('Escape')
        page.evaluate('(r) => location.hash = "/" + r', route)
        page.wait_for_timeout(180)

    def empty_overview():
        expect(page.locator('.load-track')).to_have_count(0)
        assert page.locator('.benchmark,.performance-card,.market-state-card,.news-item').count() == 0
        assert page.get_by_role('link', name='历史行情', exact=True).count() == 1
        assert 'LEGACY_DEMO' not in page.locator('body').inner_text()
        assert not page.get_by_role('button', name='用户菜单').count()
    run('empty API: no financial placeholders or legacy demo state', empty_overview)

    def route_checks():
        for route, title in [('overview','市场总览'),('data','行情中心'),('features','市场研究'),('regimes','市场回放'),('quality','数据管理'),('lineage','数据溯源'),('api','API 访问'),('settings','显示设置')]:
            go(route)
            expect(page.locator('h1')).to_have_text(title)
            assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), route
            assert not page.locator('tbody tr,.highcharts-container,.replay-main-card,.stat-card').count(), route
    run('all live routes render with empty contracts and no empty data tables', route_checks)

    def tools_navigation():
        page.get_by_role('button', name='工具', exact=True).click()
        menu = page.locator('#tools-navigation')
        expect(menu).to_be_visible()
        assert menu.get_by_role('link').count() == 4
        menu.get_by_role('link', name='数据管理', exact=True).click()
        expect(page.locator('h1')).to_have_text('数据管理')
        expect(menu).to_have_count(0)
    run('tools navigation exposes actual data capabilities', tools_navigation)

    def global_search():
        page.keyboard.press('Control+k')
        search = page.get_by_role('textbox', name='资产名称、代码或功能')
        expect(search).to_be_focused()
        search.fill('经济日历')
        page.get_by_role('dialog').get_by_role('link', name='经济日历', exact=True).click()
        expect(page.get_by_role('tab', name='经济日历', exact=True)).to_have_attribute('aria-selected','true')
        expect(page.get_by_role('dialog')).to_have_count(0)
    run('keyboard global search deep-links to economic calendar', global_search)

    def keyboard_tabs():
        go('data?tab=history')
        page.get_by_role('tab', name='行情', exact=True).focus()
        page.keyboard.press('ArrowRight')
        expect(page.get_by_role('tab', name='宏观', exact=True)).to_be_focused()
        expect(page.get_by_role('tab', name='宏观', exact=True)).to_have_attribute('aria-selected','true')
        assert 'tab=macro' in page.url
        for label in ['经济日历','资讯研报','行情']:
            page.get_by_role('tab', name=label, exact=True).click()
            page.wait_for_timeout(160)
            assert page.locator('tbody tr,.highcharts-container,.macro-series,.document-list-item').count() == 0
    run('tabs support arrow keys and stable deep links', keyboard_tabs)

    def preferences():
        go('settings')
        page.get_by_role('button', name=re.compile('绿涨红跌')).click()
        page.get_by_role('switch', name='紧凑布局').click()
        assert page.locator('body').evaluate("el => el.classList.contains('compact-density')")
        saved = json.loads(page.evaluate("localStorage.getItem('fintech.preferences.v2')"))
        assert saved['prefs']['compact'] and saved['prefs']['positiveGreen']
        assert all(key not in saved for key in ['users','sessionUserId','alerts','rules','checkpoints','imports'])
        page.reload()
        expect(page.get_by_role('switch', name='紧凑布局')).to_have_attribute('aria-checked','true')
        page.get_by_role('button', name='恢复默认显示', exact=True).click()
        dialog = page.get_by_role('dialog')
        expect(dialog).to_contain_text('红涨绿跌')
        dialog.get_by_role('button', name='取消', exact=True).click()
        expect(page.get_by_role('switch', name='紧凑布局')).to_have_attribute('aria-checked','true')
        page.get_by_role('button', name='恢复默认显示', exact=True).click()
        page.get_by_role('dialog').get_by_role('button', name='恢复默认', exact=True).click()
        expect(page.get_by_role('switch', name='紧凑布局')).to_have_attribute('aria-checked','false')
    run('display preferences persist; reset consequences and cancellation work', preferences)

    def api_write_guard():
        go('api')
        page.get_by_label('HTTP 方法').select_option('DELETE')
        before = sum(request['method'] != 'GET' for request in requests)
        page.get_by_role('button', name='发送请求', exact=True).click()
        expect(page.get_by_role('dialog')).to_contain_text('可能无法撤销')
        assert sum(request['method'] != 'GET' for request in requests) == before
        page.get_by_role('dialog').get_by_role('button', name='取消', exact=True).click()
        assert sum(request['method'] != 'GET' for request in requests) == before
    run('API mutations require a concrete confirmation before any request', api_write_guard)

    def api_empty_response():
        page.get_by_label('HTTP 方法').select_option('GET')
        page.get_by_role('button', name='发送请求', exact=True).click()
        expect(page.get_by_text('HTTP 200', exact=True)).to_be_visible()
        assert page.get_by_role('heading', name='响应', exact=True).count() == 0
    run('empty API response hides output card while retaining real status', api_empty_response)

    def error_retry():
        mode['value'] = 'error'
        go('overview')
        expect(page.locator('.load-error')).to_be_visible()
        expect(page.locator('.load-track')).to_have_count(0)
        assert page.locator('.benchmark,.performance-card,.market-state-card,.news-item').count() == 0
        before = len(requests)
        page.get_by_role('button', name='重试', exact=True).click()
        expect(page.locator('.load-track')).to_have_count(0)
        assert len(requests) > before
        for route in ['data','features','regimes','quality']:
            go(route)
            expect(page.get_by_role('alert').first).to_be_visible()
            assert not page.locator('tbody tr,.highcharts-container,.stat-card').count()
        mode['value'] = 'empty'
    run('failed APIs have retry controls and never synthesize output', error_retry)

    def mobile():
        for width in [375,390,768,1280,1440]:
            page.set_viewport_size({'width': width, 'height': 900})
            for route in ['overview','data','data?tab=macro','data?tab=calendar','data?tab=news','features','regimes','quality','lineage','api','settings']:
                go(route)
                assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), (width,route)
        page.set_viewport_size({'width':390,'height':844})
        go('overview')
        page.get_by_role('button', name='展开导航', exact=True).click()
        nav = page.get_by_role('navigation', name='移动导航')
        expect(nav).to_be_visible()
        nav.get_by_role('link', name='行情中心', exact=True).click()
        expect(nav).to_have_count(0)
        expect(page.locator('h1')).to_have_text('行情中心')
        go('overview')
        page.screenshot(path=str(ARTIFACTS/'mobile.png'), full_page=True)
        page.set_viewport_size({'width':1440,'height':1024})
        page.screenshot(path=str(ARTIFACTS/'overview.png'), full_page=True)
        go('settings');page.screenshot(path=str(ARTIFACTS/'settings.png'), full_page=True)
        go('api');page.screenshot(path=str(ARTIFACTS/'api.png'), full_page=True)
    run('five viewport sizes and mobile menu navigation', mobile)

    def real_only():
        assert requests
        assert all('dataset=demo' not in request['url'] for request in requests)
        assert not page_errors, page_errors
        assert 'data/mock.ts' not in (ROOT/'RegimeLab-preview.html').read_text()
        assert '.research-controls{' in (ROOT/'RegimeLab-preview.html').read_text()
        assert '.api-console-layout{' in (ROOT/'RegimeLab-preview.html').read_text()
    run('no demo requests, complete portable styles, no runtime exceptions', real_only)
    (ROOT/'docs/browser-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
    browser.close()
if server:
    server.shutdown()
print('TOTAL', len(results), 'PASS', sum(item['result']=='PASS' for item in results))
raise SystemExit(0 if all(item['result']=='PASS' for item in results) else 1)
