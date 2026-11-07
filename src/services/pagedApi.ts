import { requestJson } from './httpClient';

export async function pages<T>(path: string, signal: AbortSignal, params: Record<string, string> = {}) {
  const rows: T[] = [];
  const query = new URLSearchParams({ ...params, limit: '1000' });
  const seen = new Set<string>();
  for (;;) {
    const result = await requestJson('', path + '?' + query, { signal });
    const page = result.body as { items?: T[]; next_cursor?: string };
    if (result.status !== 200 || !Array.isArray(page?.items)) throw new Error('无法读取 ' + path + '（HTTP ' + result.status + '）');
    rows.push(...page.items);
    if (!page.next_cursor) return rows;
    if (seen.has(page.next_cursor)) throw new Error('接口返回了重复的分页游标');
    seen.add(page.next_cursor);
    query.set('cursor', page.next_cursor);
  }
}


