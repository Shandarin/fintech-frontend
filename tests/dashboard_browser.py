"""Chromium smoke test for the actual portable app, using empty API responses only.

The harness uses set_content to work in environments where browser navigation is blocked.
No fabricated financial data is shown or shipped with the application.
Requires playwright and an installed Chromium; run after npm run build:portable.
"""
from pathlib import Path
import os
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
html = (root / 'RegimeLab-preview.html').read_text(encoding='utf-8')
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), args=['--no-sandbox', '--disable-dev-shm-usage'])
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.evaluate("""() => {
      const values = new Map();
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: {
          getItem: key => values.has(key) ? values.get(key) : null,
          setItem: (key, value) => values.set(key, String(value)),
          removeItem: key => values.delete(key)
        }
      });
      window.fetch = async url => new Response(String(url).includes('market/latest') ? '{}': '{"items":[],"next_cursor":""}', {status: 200, headers: {'Content-Type': 'application/json'}});
      window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
      window.scrollTo = () => {};
    }""")
    page.set_content(html, wait_until='domcontentloaded')
    page.get_by_role('heading', name='市场总览').wait_for()
    assert page.locator('.dashboard-widget').count() == 1  # Shortcuts only, data modules hidden
    assert page.locator('.benchmark,.dashboard-news-row,.current-state,.highcharts-container').count() == 0
    print('PASS: empty API hides market records, retains only actual navigation')

    page.get_by_role('button', name='自定义看板').click()
    assert page.locator('.dashboard-picker-item').count() == 6
    page.get_by_role('button', name='添加研究与工具卡片').click()
    assert page.locator('.dashboard-widget').count() == 2
    page.get_by_role('button', name='上移研究与工具').click()
    saved = page.evaluate("JSON.parse(localStorage.getItem('fintech.preferences.v2')).widgets")
    assert saved.index('tools') < saved.index('shortcuts')
    page.get_by_role('region', name='管理看板卡片').get_by_role('button', name='移除快捷入口卡片').click()
    assert page.locator('.dashboard-widget').count() == 1
    assert 'shortcuts' not in page.evaluate("JSON.parse(localStorage.getItem('fintech.preferences.v2')).widgets")
    page.get_by_role('button', name='恢复默认布局').click()
    assert page.get_by_role('dialog').get_by_text('当前的卡片选择与排序将替换为默认布局。不会修改任何市场数据。').count() == 1
    page.get_by_role('dialog').get_by_role('button', name='取消').click()
    assert 'shortcuts' not in page.evaluate("JSON.parse(localStorage.getItem('fintech.preferences.v2')).widgets")
    page.get_by_role('button', name='完成编辑').click()
    print('PASS: add, remove, reorder and persist dashboard configuration')

    page.set_viewport_size({'width': 390, 'height': 844})
    assert not page.evaluate('document.documentElement.scrollWidth > innerWidth')
    assert not errors, errors
    print('PASS: mobile layout without overflow or runtime errors')
    browser.close()
