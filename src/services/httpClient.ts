/** Future integration helper. UI does not silently substitute mock data on network errors. */
export async function requestJson(base: string, path: string, options: { method?: string; body?: unknown; signal?: AbortSignal; token?: string } = {}) {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (options.signal?.aborted) controller.abort();
  else options.signal?.addEventListener('abort', onAbort, { once: true });
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const url = `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    const response = await fetch(url, { method: options.method || 'GET', signal: controller.signal, headers: { Accept: 'application/json', ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}) }, body: options.body === undefined ? undefined : JSON.stringify(options.body), credentials: 'omit' });
    const text = await response.text(); let body: unknown; try { body = JSON.parse(text); } catch { body = { rawText: text.slice(0, 20000) }; }
    return { status: response.status, body };
  } finally { clearTimeout(timer); options.signal?.removeEventListener('abort', onAbort); }
}
