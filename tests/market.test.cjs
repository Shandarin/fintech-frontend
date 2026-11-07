const test = require('node:test');
const assert = require('node:assert/strict');
const { fetchMarket } = require('../.test-build/src/services/market.js');
test('market API preserves decimal values, sends filters and rejects HTTP/schema errors', async () => {
  const original = global.fetch;
  const row = {record_id:'r',entity_id:'示例指数',metric:'close',business_date:'2026-04-30',value:'102.00000001',unit:'unknown',source_id:'s',source_locator:'row:4'};
  try {
    global.fetch = async url => { assert.equal(url,'https://example.test/api/v1/market?dataset=demo&cursor=abc'); return new Response(JSON.stringify({dataset:'demo',items:[row],next_cursor:'next'})); };
    const result = await fetchMarket('https://example.test/api/v1/',new URLSearchParams({dataset:'demo',cursor:'abc'}));
    assert.equal(result.items[0].value,'102.00000001'); assert.equal(result.next_cursor,'next');
    global.fetch = async () => new Response('error',{status:502});
    await assert.rejects(fetchMarket('https://example.test',new URLSearchParams()),/HTTP 502/);
    global.fetch = async () => new Response(JSON.stringify({dataset:'demo',items:[{...row,value:102}],next_cursor:''}));
    await assert.rejects(fetchMarket('https://example.test',new URLSearchParams()),/格式/);
    global.fetch = async () => new Response(JSON.stringify({dataset:'demo',items:[],next_cursor:''}));
    assert.deepEqual((await fetchMarket('https://example.test',new URLSearchParams())).items,[]);
    global.fetch = async () => { throw new Error('offline'); };
    await assert.rejects(fetchMarket('https://example.test',new URLSearchParams()),/offline/);
  } finally { global.fetch = original; }
});
