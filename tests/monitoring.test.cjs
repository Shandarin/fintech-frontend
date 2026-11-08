const {test}=require('node:test');
const assert=require('node:assert/strict');
test('monitoring proxy protects reads and mutations, injecting credentials only server-side',async()=>{
 const {marketAccessPlugin,authorizeMarketProxy}=await import('../scripts/market-proxy.mjs');let middleware;
 marketAccessPlugin('private-test-token').configureServer({middlewares:{use:f=>middleware=f}});
 const bad={url:'/market-api/v1/monitoring/rules',socket:{remoteAddress:'10.0.0.2'},headers:{host:'localhost:5173'}};
 let blocked=false;const res={setHeader(){},end(){blocked=true}};middleware(bad,res,()=>assert.fail('remote access allowed'));assert.equal(res.statusCode,403);assert.ok(blocked);
 let handler;authorizeMarketProxy({on:(name,f)=>handler=f},'private-test-token');let sent;
 handler({setHeader:(k,v)=>sent=[k,v],destroy:()=>assert.fail('local rejected')},{url:'/api/v1/monitoring/rules',socket:{remoteAddress:'127.0.0.1'},headers:{host:'localhost:5173',origin:'http://localhost:5173'}});assert.deepEqual(sent,['Authorization','Bearer private-test-token']);
});
test('monitor events validate identifiers and reject unsafe source links',()=>{
 const {validEventPage,safeSource}=require('../.test-build/src/state/Monitoring.js');
 assert.equal(safeSource('javascript:alert(1)'),null);assert.equal(safeSource('https://www.hkexnews.hk/'),'https://www.hkexnews.hk/');
 assert.throws(()=>validEventPage({items:[{id:'bad'}],unread:1,latest_id:'1'}));assert.equal(validEventPage({items:[],unread:0,latest_id:'0',next_cursor:''}).unread,0);
});
