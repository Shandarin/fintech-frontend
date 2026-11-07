/** Session-only selections; storage errors must never block the screen. */
export function readSessionSelection(key: string): string {
  try { return sessionStorage.getItem(key) || ''; } catch { return ''; }
}
export function writeSessionSelection(key: string, value: string): void {
  try { sessionStorage.setItem(key, value); } catch { /* nonessential preference */ }
}
