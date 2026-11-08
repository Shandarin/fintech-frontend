import { createLogger, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import {readMarketToken,marketAccessPlugin,authorizeMarketProxy,guardMarketSocket} from './scripts/market-proxy.mjs';
const proxy = (token:string) => ({
  '/market-ws/': { target: 'ws://127.0.0.1:8082', ws: true, configure:guardMarketSocket, rewrite: (path: string) => path.replace(/^\/market-ws\//, '/ws/') },
  '/market-api/': { configure: (upstream:any) => authorizeMarketProxy(upstream,token), target: 'http://127.0.0.1:8082', rewrite: (path: string) => path.replace(/^\/market-api\//, '/api/') },
  '/api/': { target: 'http://127.0.0.1:8080' },
  '/ws/': { target: 'ws://127.0.0.1:8080', ws: true },
});
const logger=createLogger();
for(const method of ['info','warn','warnOnce','error'] as const){
  const original=logger[method].bind(logger);
  logger[method]=(message,options)=>original(message.replace(/([?&]ticket=)[^&\s]+/g,'$1[REDACTED]'),options);
}
export default defineConfig(({mode})=>{
  const token=readMarketToken({...loadEnv(mode,process.cwd(),'MARKET_'),...process.env});
  const routes=proxy(token);
  return {customLogger:logger,plugins:[react(),marketAccessPlugin(token)],base:'./',server:{port:5173,proxy:routes},preview:{port:5173,proxy:routes},build:{target:'es2022'}};
});
