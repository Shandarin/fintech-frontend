"""Browser interactions for the delivered portable build.
Requires: pip install playwright + an installed Chromium.
In locked render environments we inject the HTML using set_content and supply a
Storage-compatible in-memory test double. No external sites or live APIs are used.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import os, json, re
ROOT = Path(__file__).resolve().parents[1]
results=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1080},device_scale_factor=1)
    page.set_default_timeout(3500)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.evaluate('''() => { const store = new Map(); Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()}}); }''')
    page.set_content((ROOT/'RegimeLab-preview.html').read_text(),wait_until='load')
    page.wait_for_timeout(300)
    def run(name, fn):
        try:
            fn();results.append({'name':name,'result':'PASS'});print('PASS',name)
        except Exception as e:
            results.append({'name':name,'result':'FAIL','error':str(e)[:1000]});print('FAIL',name,str(e)[:200]);page.keyboard.press('Escape')
    def go(route):
        page.keyboard.press('Escape');page.evaluate('(r)=>window.location.hash="/"+r',route);page.wait_for_timeout(130)
    def tab(name):page.get_by_role('tab',name=re.compile(name)).click()
    def role(label):
        page.get_by_role('button',name='用户菜单').click();page.locator('.user-popover').get_by_role('button',name=label,exact=True).click();page.wait_for_timeout(100)
    for route,title in [('overview','市场总览'),('data','市场数据'),('features','特征实验室'),('regimes','市场状态'),('alerts','预警中心'),('quality','数据质量'),('lineage','数据血缘'),('system','服务监控'),('api','API 工作台'),('settings','团队与设置')]:
        def route_test(route=route,title=title):
            go(route);expect(page.get_by_role('heading',name=title,exact=True)).to_be_visible();assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
        run('page: '+route,route_test)
    def all_tabs():
        for route in ['data','features','regimes','alerts','quality','api','settings']:
            go(route)
            for i in range(page.get_by_role('tab').count()):
                page.get_by_role('tab').nth(i).click();page.wait_for_timeout(70)
                assert page.locator('h1').count()==1
    run('all secondary tabs render',all_tabs)
    def rule_create():
        go('alerts');page.get_by_role('button',name='创建预警规则').click()
        page.get_by_label('规则名称',exact=True).fill('浏览器验收规则')
        page.get_by_label('阈值（%）',exact=True).fill('0')
        page.get_by_role('button',name='保存规则',exact=True).click()
        tab('规则管理');expect(page.get_by_role('heading',name='浏览器验收规则',exact=True)).to_be_visible()
        before=json.loads(page.evaluate('localStorage.getItem("regimelab.demo.v1")'))
        page.get_by_role('button',name='检测当前规则').click();page.wait_for_timeout(100)
        after=json.loads(page.evaluate('localStorage.getItem("regimelab.demo.v1")'))
        assert len(after['alerts'])>len(before['alerts'])
        page.get_by_role('button',name='检测当前规则').click();page.wait_for_timeout(100)
        again=json.loads(page.evaluate('localStorage.getItem("regimelab.demo.v1")'))
        assert len(again['alerts'])==len(after['alerts'])
    run('create rule, trigger alerts, cooldown deduplication',rule_create)
    def process_alert():
        go('alerts');tab('预警列表');page.locator('tbody').get_by_role('button',name='详情').first.click()
        page.get_by_label('处理说明').fill('浏览器验收：已复核模拟数据。')
        page.get_by_role('button',name='标记已处理',exact=True).click()
        expect(page.get_by_role('dialog').get_by_text('已处理',exact=True)).to_be_visible()
        page.keyboard.press('Escape')
    run('alert resolution and note',process_alert)
    def backtest():
        go('alerts');tab('样本回测');page.get_by_role('button',name=re.compile('运行.*回测|开始.*回测')).click();page.wait_for_timeout(650)
        expect(page.get_by_text('有效评价样本',exact=True)).to_be_visible()
    run('computed synthetic backtest',backtest)
    def feature_create():
        go('features');page.get_by_role('button',name='新建特征定义').click();page.get_by_label('特征名称').fill('浏览器验收特征');page.get_by_label('公式说明').fill('mean(close, 20) — 文档元数据');page.get_by_label('业务解释').fill('本地定义测试');page.get_by_role('button',name='保存定义').click();tab('特征目录');expect(page.locator('tbody').get_by_text('浏览器验收特征',exact=True)).to_be_visible()
    run('feature definition CRUD create',feature_create)
    def pca():
        go('features');tab('PCA 降维');assert page.locator('svg').count()>15
    run('PCA and covariance visualizations',pca)
    def replay():
        go('regimes');slider=page.get_by_label('回放日期进度');before=slider.input_value();slider.focus();page.keyboard.press('ArrowLeft');assert slider.input_value()!=before
        page.locator('.heat-cell').first.click();expect(page.get_by_role('dialog')).to_be_visible();page.keyboard.press('Escape')
    run('historical replay and heatmap detail',replay)
    def api():
        go('api');page.get_by_role('button',name='发送模拟请求').click();expect(page.locator('.response-block')).to_contain_text('requestId')
        page.get_by_label('API路径').fill('/api/not-found');page.get_by_role('button',name='发送模拟请求').click();expect(page.locator('.response-block')).to_contain_text('NOT_FOUND')
        tab('GraphQL');page.get_by_role('button',name='发送模拟请求').click();expect(page.locator('.response-block')).to_contain_text('unreadAlertCount')
    run('REST 200 / 404 and GraphQL query',api)
    def viewer():
        role('观察员');go('data');expect(page.get_by_role('button',name='导入 CSV')).to_be_disabled();assert '6' in page.get_by_role('tab',name=re.compile('多资产行情')).inner_text()
        go('alerts');expect(page.get_by_role('button',name='创建预警规则')).to_be_disabled()
        go('settings');tab('团队成员');expect(page.get_by_text('此页面需要管理员权限',exact=True)).to_be_visible()
    run('viewer UI and asset access restrictions',viewer)
    def csv():
        role('管理员');go('data');page.get_by_role('button',name='导入 CSV').click();page.locator('input[type=file]').set_input_files({'name':'browser-test.csv','mimeType':'text/csv','buffer':b'asset_id,close\ndemo,100\ndemo,101'})
        expect(page.get_by_role('button',name=re.compile('确认导入 2 行'))).to_be_enabled();page.get_by_role('button',name=re.compile('确认导入 2 行')).click()
        data=json.loads(page.evaluate('localStorage.getItem("regimelab.demo.v1")'));assert data['imports'][-1]['name']=='browser-test.csv' or data['imports'][0]['name']=='browser-test.csv'
    run('administrator CSV parse and local import',csv)
    def checkpoint():
        go('system');before=json.loads(page.evaluate('localStorage.getItem("regimelab.demo.v1")'));page.get_by_role('button',name='模拟 Savepoint').click();page.wait_for_timeout(850);after=json.loads(page.evaluate('localStorage.getItem("regimelab.demo.v1")'));assert len(after['checkpoints'])==len(before['checkpoints'])+1
    run('simulated savepoint record workflow',checkpoint)
    def preferences():
        go('settings');page.get_by_role('switch',name='紧凑表格').click();assert 'compact-density' in page.locator('body').get_attribute('class');page.get_by_role('switch',name='紧凑表格').click()
    run('preferences applied and serialized',preferences)
    def customize():
        go('overview');page.get_by_role('button',name='自定义看板').click();page.get_by_role('dialog').get_by_label('最新预警').uncheck();page.get_by_role('button',name='保存看板').click();assert page.get_by_role('heading',name='最新预警',exact=True).count()==0
        page.get_by_role('button',name='自定义看板').click();page.get_by_role('button',name='恢复默认布局').click();page.get_by_role('button',name='保存看板').click()
    run('custom dashboard hide and restore',customize)
    def login():
        page.get_by_role('button',name='用户菜单').click();page.get_by_role('button',name='退出演示账号').click();expect(page.get_by_role('heading',name='欢迎回到研境')).to_be_visible();page.get_by_role('button',name='分析师',exact=True).click();expect(page.get_by_role('heading',name='市场总览',exact=True)).to_be_visible()
    run('logout and demo login',login)
    def mobile():
        page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(150)
        for route in ['overview','data','features','regimes','alerts','quality','lineage','system','api','settings']:
            go(route);assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),route
        go('overview');page.get_by_role('button',name='展开导航').click();expect(page.get_by_role('navigation',name='主要导航')).to_be_visible();page.get_by_role('button',name='关闭导航').click()
        page.screenshot(path=str(ROOT/'artifacts/mobile.png'),full_page=True)
    run('mobile 390px layout and navigation',mobile)
    page.set_viewport_size({'width':1440,'height':1080});go('overview');page.wait_for_timeout(4200)
    page.screenshot(path=str(ROOT/'artifacts/overview.png'),full_page=True)
    go('regimes');page.screenshot(path=str(ROOT/'artifacts/regimes.png'),full_page=True)
    go('features');tab('PCA 降维');page.screenshot(path=str(ROOT/'artifacts/features.png'),full_page=True)
    results.append({'name':'no browser runtime errors','result':'PASS' if not errors else 'FAIL','errors':errors})
    (ROOT/'artifacts/browser-tests.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
    print('TOTAL',len(results),'PASS',sum(x['result']=='PASS' for x in results));print('ERRORS',errors)
    page.close()
    browser.close()
