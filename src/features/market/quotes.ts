import { isDate, isFiniteNumber, isRecord, numericText } from '../../lib/validation';

export type Quote = { record_id?: string; business_date: string; value: string | null; daily_return?: number | null };
export type PredictionState = { business_date: string; state_name: string; state_id: number };

export const hasQuoteValue = (row: Quote): boolean => row?.value != null && String(row.value).trim() !== '' && Number.isFinite(Number(row.value));

/** Used by the paginated market API. Fail on malformed rows instead of inventing prices. */
export function normaliseQuoteRows(rows: Quote[]): Quote[] {
  return rows.map(row => {
    if (!row || typeof row !== 'object' || typeof row.business_date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(row.business_date) || !Number.isFinite(Date.parse(row.business_date + 'T00:00:00Z'))) throw new Error('Invalid quote date');
    if ((row.value != null && typeof row.value !== 'string' && typeof row.value !== 'number') ||
      (row.record_id != null && typeof row.record_id !== 'string')) throw new Error('Invalid quote record');
    const value = row.value == null || String(row.value).trim() === '' ? null : String(row.value);
    if (value !== null && !Number.isFinite(Number(value))) throw new Error('Invalid quote value');
    const returnText = row.daily_return == null ? undefined : numericText(row.daily_return);
    if (row.daily_return != null && returnText === undefined) throw new Error('Invalid daily return');
    const daily_return = returnText === undefined ? row.daily_return : Number(returnText);
    return { ...row, value, daily_return };
  }).sort((a, b) => a.business_date.localeCompare(b.business_date));
}
/** Lenient chart adaptation: malformed individual records do not break a valid series. */
export function chartQuoteFrom(value: unknown): Quote | undefined {
  if (!isRecord(value) || !isDate(value.business_date)) return undefined;
  return {
    business_date: value.business_date, value: numericText(value.value) ?? null,
    record_id: typeof value.record_id === 'string' && value.record_id.trim() ? value.record_id : undefined,
    daily_return: typeof value.daily_return === 'number' && Number.isFinite(value.daily_return * 100) ? value.daily_return : undefined,
  };
}
export function chartStateFrom(value: unknown): PredictionState | undefined {
  if (!isRecord(value) || !isDate(value.business_date) || typeof value.state_name !== 'string' || !value.state_name.trim() ||
      !isFiniteNumber(value.state_id) || !Number.isInteger(value.state_id) || value.state_id < 0) return undefined;
  return { business_date: value.business_date, state_name: value.state_name, state_id: value.state_id };
}
