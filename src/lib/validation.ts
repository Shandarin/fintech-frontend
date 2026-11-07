/** Strict guards for API records; no fabricated defaults for missing market data. */
export const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
export const isText = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';
export const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const DECIMAL = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;
export function isDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(value + 'T00:00:00Z');
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
}
export function numericText(value: unknown): string | undefined {
  if (isFiniteNumber(value)) return String(value);
  if (typeof value !== 'string' || !DECIMAL.test(value.trim()) || !Number.isFinite(Number(value))) return undefined;
  return value.trim();
}
