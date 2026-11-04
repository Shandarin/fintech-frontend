import { requestJson } from './httpClient';
export interface MarketRecord {
  record_id: string; entity_id: string; metric: string; business_date: string;
  value: string; unit: string; source_id: string; source_locator: string;
}
export interface MarketPage { dataset: string; items: MarketRecord[]; next_cursor: string }
export async function fetchMarket(base: string, params: URLSearchParams, signal?: AbortSignal): Promise<MarketPage> {
  if (!base.trim()) throw new Error('请配置 VITE_API_BASE_URL 后重新构建。');
  const result = await requestJson(base, '/market?' + params, { signal });
  if (result.status < 200 || result.status >= 300) throw new Error('行情请求失败：HTTP ' + result.status);
  const body = result.body as Partial<MarketPage> | null;
  if (!body || body.dataset !== 'demo' || typeof body.next_cursor !== 'string' || !Array.isArray(body.items) || body.items.some(row =>
    !row || ['record_id','entity_id','metric','business_date','value','unit','source_id','source_locator'].some(key => typeof row[key as keyof MarketRecord] !== 'string')
  )) throw new Error('后端行情响应格式不符合约定。');
  return body as MarketPage;
}
