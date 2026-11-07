export type Doc = { record_id: string; entity_id: string; title: string; business_date: string; date_known: number; metric: string; payload: string };
export type DocPage = { items: Doc[]; next_cursor: string };
export type Payload = Record<string, string | number | null>;
export const DOCUMENT_TYPE_LABELS: Record<string, string> = { news: '新闻', social: '社交', markdown: '资金摘要', wechat_index: '公众号', pdf: '研报' };
/** The home feed traditionally calls social entries 讨论, not 社交. */
export const OVERVIEW_DOCUMENT_TYPE_LABELS: Record<string, string> = { ...DOCUMENT_TYPE_LABELS, social: '讨论' };
export const SOCIAL_COUNTER_LABELS: Record<string, string> = { view_count: '浏览', like_count: '点赞', reply_count: '回复', retweet_count: '转发', quote_count: '引用', bookmark_count: '收藏' };
export const present = (value: unknown) => value != null && String(value).trim() !== '';
export const parsePayload = (payload: string | null | undefined): Payload => {
  if (payload == null || payload.trim() === '') return {};
  const value = JSON.parse(payload);
  if (value === null) return {};
  if (typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid document payload');
  return Object.fromEntries(Object.entries(value).filter(([, field]) => field == null || typeof field === 'string' || typeof field === 'number')) as Payload;
};

export function normaliseDocument(raw: unknown): Doc | null {
  if (raw == null) return null;
  if (typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Invalid document record');
  const item = raw as Record<string, unknown>;
  if (!Object.keys(item).length) return null;
  const text = (key: string) => {
    if (item[key] == null) return '';
    if (typeof item[key] !== 'string') throw new Error('Invalid document field');
    return item[key] as string;
  };
  const recordId = text('record_id');
  if (!recordId.trim()) throw new Error('Missing document identifier');
  return { record_id: recordId, title: text('title'), entity_id: text('entity_id'), business_date: text('business_date'),
    metric: text('metric'), payload: text('payload'), date_known: item.date_known === 1 || item.date_known === true ? 1 : 0 };
}

export function normaliseDocumentPage(raw: unknown): DocPage {
  if (!raw || typeof raw !== 'object') throw new Error('Invalid documents response');
  const value = raw as { items?: unknown[]; next_cursor?: unknown };
  if (!Array.isArray(value.items) || (value.next_cursor != null && typeof value.next_cursor !== 'string')) throw new Error('Invalid documents response');
  return { items: value.items.map(normaliseDocument).filter((item): item is Doc => item !== null), next_cursor: typeof value.next_cursor === 'string' ? value.next_cursor : '' };
}

