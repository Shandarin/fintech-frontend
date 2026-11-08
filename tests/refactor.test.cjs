const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const validation = require('../.test-build/src/lib/validation.js');
const quotes = require('../.test-build/src/features/market/quotes.js');
const assets = require('../.test-build/src/features/market/assets.js');
const documents = require('../.test-build/src/features/documents/model.js');
const replay = require('../.test-build/src/features/replay/model.js');
const quality = require('../.test-build/src/features/quality/model.js');
const nav = require('../.test-build/src/config/navigation.js');
const palette = require('../.test-build/src/styles/palette.js');

test('shared date and number guards reject invalid calendar days and nonnumeric prices', () => {
  assert.equal(validation.isDate('2026-02-28'), true);
  assert.equal(validation.isDate('2026-02-30'), false);
  assert.equal(validation.isDate('2026-01-01T00:00:00Z'), false);
  assert.equal(validation.numericText('0.0000123400'), '0.0000123400');
  assert.equal(validation.numericText('1e-9'), '1e-9');
  assert.equal(validation.numericText('NaN'), undefined);
  assert.equal(validation.numericText(''), undefined);
});
test('market quotes retain decimal precision, sort chronologically and represent missing values as null', () => {
  const series = quotes.normaliseQuoteRows([
    { business_date: '2026-03-02', value: '123.123456789000', daily_return: 0 },
    { business_date: '2026-02-27', value: '', daily_return: null },
  ]);
  assert.deepEqual(series.map(x => x.business_date), ['2026-02-27','2026-03-02']);
  assert.equal(series[0].value, null);
  assert.equal(series[1].value, '123.123456789000');
  assert.equal(quotes.hasQuoteValue(series[0]), false);
  assert.equal(quotes.hasQuoteValue(series[1]), true);
});
test('malformed market responses fail instead of fabricating values', () => {
  assert.throws(() => quotes.normaliseQuoteRows([{business_date:'bad',value:'23'}]), /Invalid quote/);
  assert.throws(() => quotes.normaliseQuoteRows([{business_date:'2026-01-01',value:'missing'}]), /Invalid quote/);
  assert.equal(quotes.chartQuoteFrom({business_date:'2026-01-01',value:null}).value, null);
  assert.equal(quotes.chartQuoteFrom({business_date:'2026-01-01',value:'=1+2'}).value, null);
  assert.equal(quotes.chartStateFrom({business_date:'2026-01-01',state_name:'up',state_id:-1}), undefined);
});
test('shared asset catalog parser excludes sample groups and rejects invalid metadata', () => {
  const row = asset => ({asset_id:'沪深300',metadata:JSON.stringify(asset)});
  assert.deepEqual(assets.assetFromApi(row({字段:'close',大类:'中国权益'})),{id:'沪深300',group:'中国权益',metric:'close'});
  assert.equal(assets.assetFromApi(row({字段:'close',大类:'示例'})), null);
  assert.equal(assets.assetFromApi(row({字段:'other',大类:'中国权益'})), null);
  assert.throws(() => assets.assetFromApi({asset_id:'a',metadata:'{bad'}));
});
test('document page parser is strict, discards blank records, preserves text and cursor', () => {
  const page = documents.normaliseDocumentPage({items:[null,{}, {record_id:'x',title:'真实资讯',metric:'news',payload:'{"text":"hello"}',date_known:true}],next_cursor:'next'});
  assert.equal(page.items.length,1);
  assert.equal(page.items[0].date_known,1);
  assert.equal(page.next_cursor,'next');
  assert.equal(documents.parsePayload(page.items[0].payload).text,'hello');
  assert.throws(()=>documents.normaliseDocumentPage({items:[{title:'no id'}]}),/Missing document identifier/);
  assert.throws(()=>documents.parsePayload('[1,2]'),/Invalid document payload/);
});
test('replay API parsers retain the probability index and reject bad sessions', () => {
  const row = replay.predictionFrom({business_date:'2026-01-12',state_name:'状态',state_id:2,close:'4321.987654321',probabilities:[0.1, 2, 0.9]});
  assert.equal(row.close,'4321.987654321');
  assert.deepEqual(row.probabilities,[0.1,null,0.9]);
  assert.equal(replay.predictionFrom({business_date:'2026-02-30',state_name:'x',state_id:0,close:'1'}),undefined);
  assert.equal(replay.sessionFrom({session_id:'s',model_id:'m',status:'RUNNING',start_date:'2026-01-03',end_date:'2026-01-02'}),undefined);
  assert.equal(replay.statusTitle('COMPLETED'),'已完成');
});
test('quality parser omits missing totals rather than converting them to zero',()=>{
  assert.equal(quality.completeTotal([], 'accepted_records'),undefined);
  assert.equal(quality.completeTotal([{run_id:1,source_id:'s',status:'SUCCESS',finished_at:''}], 'accepted_records'),undefined);
  assert.equal(quality.completeTotal([{run_id:1,source_id:'s',status:'SUCCESS',finished_at:'',accepted_records:0}], 'accepted_records'),0);
  assert.deepEqual(quality.validRecords([{run_id:2,source_id:'s'},{name:'bad'}],quality.runRecord).map(x=>x.run_id),[2]);
});
test('navigation, chart palette and CSS theme have a single source of truth', () => {
  assert.equal(new Set(nav.NAV.map(x=>x.route)).size, nav.NAV.length);
  assert.equal(new Set(nav.SEARCH_DESTINATIONS.map(x=>x.href)).size, nav.SEARCH_DESTINATIONS.length);
  assert.equal(palette.ACCENT_COLOR,'#F0520F');
  assert.equal(palette.BRAND_COLOR,'#F0520F');
  const base = path.resolve(__dirname, '..', 'src/styles');
  const tokens = fs.readFileSync(path.join(base,'tokens.css'),'utf8');
  assert.match(tokens,/--bg:\s*#ffffff/i);
  assert.match(tokens,/--accent:\s*#F0520F/i);
  const entry = fs.readFileSync(path.join(base,'index.css'),'utf8');
  const imports=[...entry.matchAll(/@import '\.\/([^']+)'/g)].map(m=>m[1]);
  assert.equal(new Set(imports).size,imports.length);
  for(const file of imports) assert.ok(fs.existsSync(path.join(base,file)),file);
});

test('decimal-string daily returns preserve valid and missing values', () => {
  const {normaliseQuoteRows} = require('../.test-build/src/features/market/quotes.js');
  const row = {business_date:'2026-04-30',value:'74.23'};
  assert.equal(normaliseQuoteRows([{...row,daily_return:'0.02203065134'}])[0].daily_return,0.02203065134);
  assert.equal(normaliseQuoteRows([{...row,daily_return:0}])[0].daily_return,0);
  assert.equal(normaliseQuoteRows([{...row,daily_return:null}])[0].daily_return,null);
  assert.equal(normaliseQuoteRows([row])[0].daily_return,undefined);
  for (const value of ['', 'NaN', 'Infinity', 'invalid', true]) {
    assert.throws(() => normaliseQuoteRows([{...row,daily_return:value}]),/Invalid daily return/);
  }
});
