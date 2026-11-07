export type AssetRow = { asset_id: string; metadata: string };
export type MarketAsset = { id: string; group: string; metric: string };

/** Parse one raw catalog record. Invalid metadata fails closed. */
export function assetFromApi(item: AssetRow): MarketAsset | null {
  if (!item || typeof item.asset_id !== 'string' || !item.asset_id.trim() || typeof item.metadata !== 'string') throw new Error('Invalid asset metadata');
  const meta = JSON.parse(item.metadata) as Record<string, unknown>;
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) throw new Error('Invalid asset metadata');
  if (!['close', 'yield'].includes(String(meta.字段)) || meta.大类 === '示例') return null;
  return { id: item.asset_id, group: typeof meta.大类 === 'string' ? meta.大类 : '', metric: String(meta.字段) };
}
export function normaliseAssets(rows: AssetRow[]): MarketAsset[] {
  return rows.flatMap(row => assetFromApi(row) || []);
}
