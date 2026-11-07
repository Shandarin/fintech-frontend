const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
// Optional DOM test dependency; runtime application dependencies stay unchanged.
const { JSDOM, VirtualConsole } = require(process.env.JSDOM_MODULE || 'jsdom');
const project = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(project,'RegimeLab-preview.html'),'utf8');
const failures = [], results = [], requests = [], errors = [];
let responseMode = 'empty';
const output = path.join(project,'docs/ui-contract-results.json');
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => { if (!error.message.includes('Not implemented: Window')) errors.push(error.message); });
virtualConsole.on('error', error => errors.push(String(error)));
const dom = new JSDOM(html, {
 url: 'https://fintech.test/#/overview', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole,
 beforeParse(window) {
  window.scrollTo = () => {};
  window.matchMedia = () => ({ matches:false, addEventListener(){}, removeEventListener(){} });
  window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
  window.fetch = async (url, options = {}) => {
   requests.push({url:String(url),method:options.method || 'GET',body:options.body});
   if(responseMode === 'error') return {status:503, text:async()=>JSON.stringify({error:{message:'Service unavailable'}})};
   if(String(url).includes('stream/status')) return {status:200,text:async()=>'null'};
   if(String(url).includes('market/latest')) return {status:200,text:async()=>'{}'};
   return {status:200,text:async()=>JSON.stringify({items:[],next_cursor:''})};
  };
  window.localStorage.setItem('regimelab.workspace.v1', JSON.stringify({schema:1,sessionUserId:'legacy',users:[{id:'legacy',name:'LEGACY_ACCOUNT',active:true,role:'admin'}],rules:[],alerts:[{id:'old',title:'LEGACY_ALERT'}],sources:[{id:'old'}],prefs:{compact:false,positiveGreen:false}}));
 }
});
const w = dom.window, doc = w.document;
const wait = (ms=60) => new Promise(resolve=>setTimeout(resolve,ms));
const byText = (selector,text) => [...doc.querySelectorAll(selector)].find(el=>el.textContent.replace(/\s+/g,' ').trim() === text);
const setValue = (node,value) => { const proto=node.tagName==='SELECT'?w.HTMLSelectElement.prototype:node.tagName==='TEXTAREA'?w.HTMLTextAreaElement.prototype:w.HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto,'value').set.call(node,value); node.dispatchEvent(new w.Event(node.tagName==='SELECT'?'change':'input',{bubbles:true})); };
const go = async hash => { w.location.hash='#/'+hash;await wait(90); };
async function check(name, fn) {try { await fn();results.push({name,result:'PASS'});console.log('PASS',name);}catch(error){failures.push(name);results.push({name,result:'FAIL',error:error.stack});console.log('FAIL',name,error.message);}}
(async()=>{
 await wait(250);
 await check('Empty API does not create market values or restore old synthetic state',async()=>{
  assert.equal(doc.querySelector('h1').textContent,'市场总览');
  assert.equal(doc.querySelectorAll('.benchmark,.performance-card,.market-state-card,.news-item,.stat-card').length,0);
  assert(!doc.querySelector('#root').textContent.includes('LEGACY_'));
  assert(!doc.querySelector('[aria-label="用户菜单"]'));
  const saved=JSON.parse(w.localStorage.getItem('fintech.preferences.v2'));
  assert.equal(saved.schema,2);assert(!saved.users && !saved.alerts && !saved.sessionUserId);
 });
 await check('All routes render with empty API results',async()=>{
  for (const [route,title] of [['data','行情中心'],['features','市场研究'],['regimes','市场回放'],['quality','数据管理'],['lineage','数据溯源'],['api','API 访问'],['settings','显示设置'],['alerts','预警'],['system','服务状态']]) {
   await go(route);assert.equal(doc.querySelector('h1')?.textContent,title,route);
   assert.equal(doc.querySelectorAll('tbody tr,.highcharts-container,.stat-card,.replay-main-card').length,0,route);
  }
 });
 await check('Only backed tools appear in primary navigation',async()=>{
  byText('button','工具').click();await wait();
  const links=[...doc.querySelectorAll('#tools-navigation a')].map(el=>el.textContent.trim());
  assert.deepEqual(links,['数据管理','数据溯源','API 访问','显示设置']);
 });
 await check('Search keyboard shortcut and deep-link navigation',async()=>{
  w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'k',ctrlKey:true,bubbles:true}));await wait();
  const search=doc.querySelector('input[aria-label="资产名称、代码或功能"]');assert(search);assert.equal(doc.activeElement,search);
  setValue(search,'经济日历');await wait();
  const link=[...doc.querySelectorAll('.command-results a')].find(el=>el.textContent==='经济日历');assert(link);link.click();await wait();
  assert(w.location.hash.includes('tab=calendar'));assert.equal(doc.querySelector('[role="tab"][aria-selected="true"]')?.textContent,'经济日历');assert(!doc.querySelector('[role="dialog"]'));
 });
 await check('Arrow-key tabs update selected tab and URL',async()=>{
  await go('data?tab=history');const tab=doc.querySelector('[role="tab"]');tab.focus();tab.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));await wait();
  assert.equal(doc.activeElement?.textContent,'宏观');assert(w.location.hash.includes('tab=macro'));
  for(const label of ['经济日历','资讯研报','行情']){byText('[role="tab"]',label).click();await wait();assert.equal(doc.querySelectorAll('tbody tr,.highcharts-container').length,0);}
 });
 await check('Display preferences save actual changes and survive remount',async()=>{
  await go('settings');const color=[...doc.querySelectorAll('button')].find(el=>el.textContent.includes('绿涨红跌'));color.click();doc.querySelector('[role="switch"]').click();await wait();
  assert(doc.body.classList.contains('compact-density'));assert(!doc.body.classList.contains('red-positive'));
  const prefs=JSON.parse(w.localStorage.getItem('fintech.preferences.v2'));assert(prefs.prefs.compact && prefs.prefs.positiveGreen);
  await go('overview');await go('settings');assert.equal(doc.querySelector('[role="switch"]').getAttribute('aria-checked'),'true');
 });
 await check('Reset explains consequences and cancel preserves preferences',async()=>{
  byText('button','恢复默认显示').click();await wait();assert(doc.querySelector('[role="dialog"]').textContent.includes('红涨绿跌'));
  byText('[role="dialog"] button','取消').click();await wait();assert.equal(doc.querySelector('[role="switch"]').getAttribute('aria-checked'),'true');
  byText('button','恢复默认显示').click();await wait();byText('[role="dialog"] button','恢复默认').click();await wait();assert.equal(doc.querySelector('[role="switch"]').getAttribute('aria-checked'),'false');
 });
 await check('First focus/click opens Info and Escape closes it',async()=>{
  const info=doc.querySelector('.preferences-actions .info-tip button');info.focus();info.click();await wait();assert(doc.querySelector('[role="tooltip"]'));
  info.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await wait();assert(!doc.querySelector('[role="tooltip"]'));
 });
 await check('Destructive API request cannot run before confirmation',async()=>{
  await go('api');setValue(doc.querySelector('select'),'DELETE');await wait();const before=requests.filter(r=>r.method!=='GET').length;
  byText('button','发送请求').click();await wait();assert(doc.querySelector('[role="dialog"]').textContent.includes('可能无法撤销'));assert.equal(requests.filter(r=>r.method!=='GET').length,before);
  byText('[role="dialog"] button','取消').click();await wait();assert.equal(requests.filter(r=>r.method!=='GET').length,before);
 });
 await check('Invalid JSON reveals a usable error and sends nothing',async()=>{
  setValue(doc.querySelector('select'),'POST');await wait();setValue(doc.querySelector('textarea'),'{invalid');await wait();
  byText('button','发送请求').click();await wait();byText('[role="dialog"] button','确认发送').click();await wait();
  assert(!doc.querySelector('[role="dialog"]'));assert(doc.querySelector('[role="alert"]').textContent.includes('有效的 JSON'));assert.equal(requests.filter(r=>r.method!=='GET').length,0);
 });
 await check('Empty response hides the response card and reports HTTP status',async()=>{
  setValue(doc.querySelector('select'),'GET');await wait();byText('button','发送请求').click();await wait();
  assert(doc.querySelector('.api-response-status').textContent.includes('HTTP 200'));assert(!byText('h3','响应'));
 });
 await check('API errors preserve retry actions without synthesizing output',async()=>{
  responseMode='error';await go('overview');assert(doc.querySelector('.load-error'));assert.equal(doc.querySelectorAll('.benchmark,.performance-card,.news-item').length,0);
  const before=requests.length;byText('button','重试').click();await wait();assert(requests.length>before);
  for(const route of ['data','features','regimes','quality']){await go(route);assert(doc.querySelector('[role="alert"]'),route);assert.equal(doc.querySelectorAll('tbody tr,.stat-card').length,0,route);}
  responseMode='empty';
 });
 await check('Form labels identify their inputs',async()=>{
  for(const route of ['api','lineage','data?tab=calendar','data?tab=news']) {
   await go(route);
   for(const el of doc.querySelectorAll('input,select,textarea')) {
    assert(el.getAttribute('aria-label') || [...doc.querySelectorAll('label')].some(label=>label.contains(el) || label.htmlFor && label.htmlFor===el.id),route+' '+el.outerHTML);
   }
  }
 });
 await check('Mobile navigation links close the disclosure after navigation',async()=>{
  const toggle=doc.querySelector('[aria-controls="mobile-navigation"]');toggle.click();await wait();assert(doc.querySelector('#mobile-navigation'));
  [...doc.querySelectorAll('#mobile-navigation a')].find(el=>el.textContent==='行情中心').click();await wait();assert(!doc.querySelector('#mobile-navigation'));assert.equal(doc.querySelector('h1').textContent,'行情中心');
 });
 await check('Application has no runtime errors, demo imports or demo requests',async()=>{
  assert.equal(errors.length,0,JSON.stringify(errors));assert(requests.every(r=>!r.url.includes('dataset=demo')));assert(!html.includes('"src/data/mock.ts":'));
  assert(html.includes('.research-controls{') && html.includes('.api-console-layout{') && html.includes('.market-layout {'));
 });
 fs.writeFileSync(output,JSON.stringify({environment:'JSDOM (DOM/state only; no browser layout claims)',financialFixtures:'none; only empty responses and explicit failures',results},null,2)+'\n');
 console.log('TOTAL',results.length,'PASS',results.filter(r=>r.result==='PASS').length);console.log('ERRORS',errors);
 dom.window.close();process.exitCode=failures.length?1:0;
})().catch(error=>{console.error(error);dom.window.close();process.exitCode=1;});
