import {readFileSync} from 'node:fs';

export function localMarketRequest(req) {
  const ip=req.socket?.remoteAddress;
  if(!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(ip))return false;
  const host=req.headers.host || '';
  if(!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host))return false;
  if(req.headers['sec-fetch-site']==='cross-site')return false;
  const origin=req.headers.origin;
  return !origin || origin==='http://'+host || origin==='https://'+host;
}
export function readMarketToken(env) {
  if(env.MARKET_ACCESS_TOKEN)return env.MARKET_ACCESS_TOKEN.trim();
  if(!env.MARKET_ACCESS_TOKEN_FILE)return '';
  try {return readFileSync(env.MARKET_ACCESS_TOKEN_FILE,'utf8').match(/^MARKET_ACCESS_TOKEN=(.+)$/m)?.[1].trim() || '';}
  catch {return '';}
}
export function marketAccessPlugin(token) {
  const setup=server=>{server.middlewares.use((req,res,next)=>{
    if(!(req.url?.startsWith('/market-api/v1/market/realtime/') || req.url?.startsWith('/market-api/v1/monitoring/')))return next();
    if(!localMarketRequest(req) || !token){res.statusCode=token?403:503;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({code:token?'LOCAL_ONLY':'MARKET_PROXY_NOT_CONFIGURED'}));return;}
    next();
  });};
  return {name:'local-market-access',configureServer:setup,configurePreviewServer:setup};
}
export function authorizeMarketProxy(proxy,token) {
  proxy.on('proxyReq',(out,req)=>{
    if(req.url?.startsWith('/api/v1/market/realtime/') || req.url?.startsWith('/api/v1/monitoring/')){
      if(!token || !localMarketRequest(req)){out.destroy();return;}
      out.setHeader('Authorization','Bearer '+token);
    }
  });
}
export function guardMarketSocket(proxy) {
  proxy.on('proxyReqWs',(out,req,socket)=>{
    if(!req.headers.origin || !localMarketRequest(req)){out.destroy();socket.destroy();}
  });
}

