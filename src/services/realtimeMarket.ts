export type Instrument = {instrument_id:string; name?:string; asset_type:string; venue:string; currency:string; capabilities:{provider:string; available:boolean; status:string}[]};
export type Price = {value:string|null; source_time:string|null};
export type QuoteView = {quote:{instrument_id:string; provider:string; feed:string; currency:string; last_price:Price|null; bid_price:Price|null; ask_price:Price|null; index_value:Price|null; indicative_rate:Price|null; data_tier:string; delay_seconds:number|null; market_status:string}; freshness:string; source_health:string; error:string|null};
export type ItemError = {instrument_id:string; code:string};
export type Intraday = {instrument_id:string; provider:string; currency:string; trading_date:string; timezone:string; price_kind:string; previous_close:string|null; points:{time:string;price:string}[]};
export type IntradayResponse = {status:string; data?:Intraday|null; freshness?:string; error?:string|null; refresh_pending?:boolean};
export function validWatch(value:unknown):string[] {
  return Array.isArray(value) ? [...new Set(value.filter((v):v is string => typeof v==='string' && /^[A-Z0-9:_./-]{1,80}$/.test(v)))].slice(0,100) : [];
}
export function priceFields(q:QuoteView['quote']):{label:string;price:Price}[] {
  return ([['成交',q.last_price],['指数',q.index_value],['参考汇率',q.indicative_rate],['买价',q.bid_price],['卖价',q.ask_price]] as [string,Price|null][])
    .filter((v):v is [string,Price]=>v[1]?.value!=null).map(([label,price])=>({label,price}));
}
export const names:Record<string,string> = {'EQUITY:XSHG:600519':'贵州茅台','EQUITY:XSHE:000001':'平安银行','EQUITY:XHKG:00700':'腾讯控股','ETF:XSHG:510300':'沪深300 ETF','INDEX:XSHG:000001':'上证指数','EQUITY:US:AAPL':'Apple','EQUITY:US:MSFT':'Microsoft','ETF:US:SPY':'SPDR S&P 500 ETF','INDEX:US:SP500':'标普500','FX:SPOT:USD:CNH':'美元 / 离岸人民币','FX:SPOT:EUR:USD':'欧元 / 美元'};
export const instrumentName = (id:string) => names[id] || id;
export const issueText = (code:string) => ({UNSUPPORTED:'暂不支持',NOT_CONFIGURED:'来源未配置',DISABLED:'来源未启用',UNVERIFIED:'来源尚未验证',PENDING:'等待请求预算 / 验证',CAPACITY_EXCEEDED:'订阅容量已满',NO_DATA:'来源暂无数据',PARSE_FAILED:'来源解析失败',UPSTREAM_UNAVAILABLE:'来源暂不可用',RATE_LIMITED:'来源限流',ACCESS_DENIED:'来源拒绝访问',STALE:'验证过期',FRESH:'已验证',UNKNOWN:'状态未知',MARKET_CLOSED:'市场休市'} as Record<string,string>)[code] || code;
export class MarketHttpError extends Error { constructor(public status:number){super(status===401?'行情服务鉴权失败，请检查服务端配置':status===503?'行情服务未启用':status===429?'连接请求过多，请稍后重试':`行情请求失败（${status}）`);} }
export async function marketRequest<T>(path:string,signal:AbortSignal,method='GET'):Promise<T> {
  const response=await fetch('/market-api/v1/market/realtime/'+path,{method,signal,cache:'no-store',redirect:'error'});
  if(!response.ok)throw new MarketHttpError(response.status);
  const body=await response.json();
  if(path==='ws-ticket' && (typeof body?.ticket!=='string' || !/^[A-Za-z0-9_-]{20,200}$/.test(body.ticket)))throw new Error('行情票据格式无效');
  if(path==='instruments' && (!Array.isArray(body?.items) || body.items.some((i:Instrument)=>!i || typeof i.instrument_id!=='string' || !Array.isArray(i.capabilities))))throw new Error('资产目录格式无效');
  if(path.startsWith('search?') && (typeof body?.status!=='string' || !Array.isArray(body.items) || body.items.some((i:Instrument)=>!i || typeof i.instrument_id!=='string' || typeof i.name!=='string' || !['EQUITY','ETF','INDEX'].includes(i.asset_type) || typeof i.venue!=='string')))throw new Error('证券搜索结果格式无效');
  if(path.startsWith('intraday?')) validateIntraday(body);
  return body as T;
}
export function validSequence(previous:{id:string;sequence:number}|null,message:{connection_id:string;sequence:number;type:string}):boolean {
  if(typeof message.connection_id!=='string' || !Number.isSafeInteger(message.sequence))return false;
  return previous ? message.connection_id===previous.id && message.sequence===previous.sequence+1 : message.type==='hello' && message.sequence===1;
}

export function validateIntraday(value:IntradayResponse):void {
  if(!value || typeof value.status!=='string')throw new Error('分时行情格式无效');
  const data=value.data;if(!data){if(value.status==='OK')throw new Error('分时行情缺少数据');return;}
  if(typeof data.instrument_id!=='string' || typeof data.currency!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.trading_date) || !Array.isArray(data.points) || !data.points.length)throw new Error('分时行情格式无效');
  new Intl.DateTimeFormat('zh-CN',{timeZone:data.timezone});
  let previous=-Infinity;
  for(const point of data.points){
    const time=Date.parse(point.time);
    if(!Number.isFinite(time) || time<=previous || typeof point.price!=='string' || !/^\d+(?:\.\d+)?$/.test(point.price) || !Number.isFinite(Number(point.price)) || Number(point.price)<=0)throw new Error('分时价格或时间无效');
    previous=time;
  }
}

export function matchInstrumentCode(input:string,catalog:Instrument[]):Instrument[] {
  const code=input.trim().toUpperCase();if(!code)return [];
  return catalog.filter(i=>{
    const parts=i.instrument_id.split(':');
    if(i.asset_type==='FX')return [i.instrument_id,parts.slice(-2).join('/'),parts.slice(-2).join('')].includes(code);
    const local=parts.at(-1)!;const market=({XSHG:'SH',XSHE:'SZ',XHKG:'HK',US:'US'} as Record<string,string>)[i.venue];
    return [i.instrument_id,local,...(market?[market+local,market+':'+local,local+'.'+market]:[])].includes(code);
  });
}

export type SearchResponse={status:string;items:Instrument[]};
export function rememberInstruments(items:Instrument[]):Instrument[] {
  for(const item of items)if(item.name)names[item.instrument_id]=item.name;
  return items;
}

export function watchlistReturn(q: QuoteView['quote'] | undefined, result: IntradayResponse | undefined): number | null {
  const data = result?.data, price = q?.last_price || q?.index_value;
  if (!q || !data || !price?.value || !price.source_time || result?.error || !['FRESH','MARKET_CLOSED'].includes(result?.freshness || '') || data.instrument_id !== q.instrument_id || data.currency !== q.currency) return null;
  const close = Number(data.previous_close), current = Number(price.value), time = new Date(price.source_time);
  if (!data.previous_close || !Number.isFinite(close) || close <= 0 || !Number.isFinite(current) || !Number.isFinite(time.getTime())) return null;
  const date = new Intl.DateTimeFormat('en-CA', {timeZone:data.timezone, year:'numeric', month:'2-digit', day:'2-digit'}).format(time);
  return date === data.trading_date ? current / close - 1 : null;
}
