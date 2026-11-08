const {test}=require('node:test');
const assert=require('node:assert/strict');
const {validWatch,priceFields,validSequence,marketRequest}=require('../.test-build/src/services/realtimeMarket.js');
test('watchlist validation preserves an intentionally empty list and caps unique assets',()=>{
  assert.deepEqual(validWatch([]),[]);
  assert.deepEqual(validWatch(['FX:SPOT:USD:CNH','FX:SPOT:USD:CNH',null,'bad token']),['FX:SPOT:USD:CNH']);
  assert.equal(validWatch(Array.from({length:120},(_,i)=>'US:S'+i)).length,100);
});
test('bid and ask remain separate with separate times; never synthesize a last price',()=>{
  const fields=priceFields({last_price:null,bid_price:{value:'0.049240',source_time:'t1'},ask_price:{value:'0.049250',source_time:'t2'}});
  assert.deepEqual(fields.map(f=>f.label),['买价','卖价']);
  assert.equal(fields[0].price.value,'0.049240');assert.equal(fields[1].price.source_time,'t2');
  assert.deepEqual(priceFields({last_price:{value:null,source_time:'t3'}}),[]);
});
test('connection sequence resets only with hello and gaps require resync',()=>{
  assert.equal(validSequence(null,{type:'hello',connection_id:'a',sequence:1}),true);
  assert.equal(validSequence(null,{type:'snapshot',connection_id:'a',sequence:1}),false);
  assert.equal(validSequence({id:'a',sequence:1},{connection_id:'a',sequence:2}),true);
  assert.equal(validSequence({id:'a',sequence:1},{connection_id:'a',sequence:3}),false);
  assert.equal(validSequence({id:'a',sequence:1},{connection_id:'b',sequence:2}),false);
});
test('browser sends no token; failures do not return synthetic data',async()=>{
  const old=global.fetch;
  try {
    global.fetch=async(url,options)=>{
      assert.equal(url.includes('secret'),false);assert.equal(options.headers?.Authorization,undefined);
      assert.equal(options.redirect,'error');assert.equal(options.cache,'no-store');
      return {ok:false,status:401};
    };
    await assert.rejects(marketRequest('instruments',new AbortController().signal),/服务端配置/);
  }finally{global.fetch=old;}
});

test('intraday validation rejects bad prices and unordered source times',()=>{
  const {validateIntraday}=require('../.test-build/src/services/realtimeMarket.js');
  const data={instrument_id:'INDEX:XSHG:000001',currency:'CNY',trading_date:'2026-11-06',timezone:'Asia/Shanghai',points:[{time:'2026-11-06T01:30:00Z',price:'3649.1800'}]};
  validateIntraday({status:'OK',data});assert.equal(data.points[0].price,'3649.1800');
  assert.throws(()=>validateIntraday({status:'OK'}));
  assert.throws(()=>validateIntraday({status:'OK',data:{...data,points:[...data.points,...data.points]}}));
  assert.throws(()=>validateIntraday({status:'OK',data:{...data,points:[{...data.points[0],price:'NaN'}]}}));
});

test('codes resolve catalog assets without guessing a market or FX currency',()=>{
  const {matchInstrumentCode}=require('../.test-build/src/services/realtimeMarket.js');
  const catalog=[{instrument_id:'EQUITY:XSHE:000001',venue:'XSHE',asset_type:'EQUITY'},{instrument_id:'INDEX:XSHG:000001',venue:'XSHG',asset_type:'INDEX'},{instrument_id:'FX:SPOT:USD:CNH',venue:'OTC',asset_type:'FX'}];
  assert.equal(matchInstrumentCode('000001',catalog).length,2);
  assert.equal(matchInstrumentCode(' sz000001 ',catalog)[0].asset_type,'EQUITY');
  assert.equal(matchInstrumentCode('000001.SH',catalog)[0].asset_type,'INDEX');
  assert.equal(matchInstrumentCode('USD/CNH',catalog).length,1);
  assert.equal(matchInstrumentCode('USD/CNY',catalog).length,0);
  assert.equal(matchInstrumentCode('999999',catalog).length,0);
});
test('server proxy rejects remote and cross-origin access',async()=>{
  const {localMarketRequest}=await import('../scripts/market-proxy.mjs');
  const req={socket:{remoteAddress:'127.0.0.1'},headers:{host:'localhost:5173',origin:'http://localhost:5173'}};
  assert.equal(localMarketRequest(req),true);
  assert.equal(localMarketRequest({...req,socket:{remoteAddress:'192.168.1.9'}}),false);
  assert.equal(localMarketRequest({...req,headers:{...req.headers,origin:'https://foreign.example'}}),false);
  assert.equal(localMarketRequest({...req,headers:{...req.headers,host:'foreign.example'}}),false);
  assert.equal(localMarketRequest({...req,headers:{...req.headers,'sec-fetch-site':'cross-site'}}),false);
});

test('proxy adds the credential only to realtime requests and middleware fails closed',async()=>{
  const {marketAccessPlugin,authorizeMarketProxy}=await import('../scripts/market-proxy.mjs');
  let handler;
  const plugin=marketAccessPlugin('server-secret');
  assert.equal(plugin.configureServer({middlewares:{use:fn=>{handler=fn;return ()=>{throw Error('must not return middleware as a hook');};}}}),undefined);
  const request={url:'/market-api/v1/market/realtime/instruments',socket:{remoteAddress:'127.0.0.1'},headers:{host:'localhost:5173'}};
  let next=false;handler(request,{},()=>{next=true;});assert.equal(next,true);
  const denied={setHeader(){},end(){this.ended=true;}};
  handler({...request,socket:{remoteAddress:'10.0.0.2'}},denied,()=>assert.fail());assert.equal(denied.statusCode,403);
  let forward;authorizeMarketProxy({on:(event,fn)=>{forward=fn;}},'server-secret');
  let auth;const outgoing={setHeader:(name,value)=>{auth=value;},destroy:()=>assert.fail()};
  forward(outgoing,{...request,url:'/api/v1/market/realtime/instruments'});assert.equal(auth,'Bearer server-secret');
  auth=undefined;forward(outgoing,{...request,url:'/api/v1/market/latest'});assert.equal(auth,undefined);
});

test('real search preserves security names and fails on malformed search results',async()=>{
  const {rememberInstruments,instrumentName}=require('../.test-build/src/services/realtimeMarket.js');
  rememberInstruments([{instrument_id:'EQUITY:XSHG:600036',name:'招商银行'}]);
  assert.equal(instrumentName('EQUITY:XSHG:600036'),'招商银行');
  const old=global.fetch;
  try {global.fetch=async()=>({ok:true,json:async()=>({status:'OK',items:[{instrument_id:'bad'}]})});
    await assert.rejects(marketRequest('search?q=600036',new AbortController().signal),/搜索结果格式无效/);
  }finally{global.fetch=old;}
});

test('watchlist returns require matching dates and real positive previous close',()=>{
  const {watchlistReturn}=require('../.test-build/src/services/realtimeMarket.js');
  const q={instrument_id:'INDEX:XSHG:000001',currency:'CNY',index_value:{value:'110',source_time:'2026-11-06T07:00:00Z'}};
  const result={status:'OK',freshness:'FRESH',data:{instrument_id:q.instrument_id,currency:'CNY',timezone:'Asia/Shanghai',trading_date:'2026-11-06',previous_close:'100'}};
  assert.equal(watchlistReturn(q,result),110/100-1);
  assert(watchlistReturn({...q,index_value:{...q.index_value,value:'90'}},result)<0);
  assert.equal(watchlistReturn(q,{...result,data:{...result.data,previous_close:'0'}}),null);
  assert.equal(watchlistReturn(q,{...result,data:{...result.data,trading_date:'2026-11-05'}}),null);
  assert.equal(watchlistReturn(q,{...result,freshness:'STALE'}),null);
  assert.equal(watchlistReturn({...q,index_value:null,bid_price:{value:'110'}},result),null);
});
