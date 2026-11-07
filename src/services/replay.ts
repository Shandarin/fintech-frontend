import { requestJson } from './httpClient';

export async function read<T>(path: string, signal?: AbortSignal, body?: unknown): Promise<T> {
  const result = await requestJson('/api/v1', path, { method: body === undefined ? 'GET' : 'POST', body, signal });
  if (result.status < 200 || result.status >= 300) {
    throw Object.assign(new Error((result.body as { error?: { message?: string } })?.error?.message || 'HTTP ' + result.status), { status: result.status });
  }
  return result.body as T;
}

