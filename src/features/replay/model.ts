import { isFiniteNumber, isRecord, isText, isDate, numericText } from '../../lib/validation';

const statusNames: Record<string, string> = {
  QUEUED: '排队中', RUNNING: '回放中', PAUSED: '已暂停', DRAINING: '收尾中',
  COMPLETED: '已完成', FAILED: '回放失败', CANCELLED: '已取消', STOPPED: '已停止',
};
export const featureLabels: Record<string, string> = {
  return_1d: '单日对数收益率', momentum_5d: '5 日动量', momentum_20d: '20 日动量',
  volatility_20d: '20 日年化波动率', ma_deviation_20d: '20 日均线偏离', drawdown_60d: '60 日回撤',
};
export type Session = {
  start_date: string; end_date: string; session_id: string; model_id: string; status: string;
  result_count?: number; expected_results?: number; warmup_count?: number; warmup_required?: number; error?: string;
};
export type Model = {
  model_id: string; asset_id: string; training_end?: string; replay_start?: string; replay_end?: string;
  feature_names: string[]; feature_version?: string;
};
export type Prediction = { state_id: number; business_date: string; close: string; state_name: string; probabilities: (number | null)[] };
export type Observation = { business_date: string; features: Record<string, number> };
export type Snapshot = { sessionId: string; rows: Prediction[]; observations: Observation[] };
export const featureTitle = (key: string) => Object.hasOwn(featureLabels, key) ? featureLabels[key] : key;
export const statusTitle = (key: string) => Object.hasOwn(statusNames, key) ? statusNames[key] : key;
export function modelFrom(value: unknown): Model | undefined {
  if (!isRecord(value) || !isText(value.model_id) || !isText(value.asset_id)) return undefined;
  return {
    model_id: value.model_id, asset_id: value.asset_id,
    training_end: isDate(value.training_end) ? value.training_end : undefined,
    replay_start: isDate(value.replay_start) ? value.replay_start : undefined,
    replay_end: isDate(value.replay_end) ? value.replay_end : undefined,
    feature_names: Array.isArray(value.feature_names) ? value.feature_names.filter(isText) : [],
    feature_version: isText(value.feature_version) ? value.feature_version : undefined,
  };
}
export function sessionFrom(value: unknown): Session | undefined {
  if (!isRecord(value) || !isText(value.session_id) || !isText(value.model_id) || !isText(value.status) ||
      !isDate(value.start_date) || !isDate(value.end_date) || value.start_date > value.end_date) return undefined;
  const count = (item: unknown) => isFiniteNumber(item) && Number.isInteger(item) && item >= 0 ? item : undefined;
  return {
    session_id: value.session_id, model_id: value.model_id, status: value.status,
    start_date: value.start_date, end_date: value.end_date,
    result_count: count(value.result_count), expected_results: count(value.expected_results),
    warmup_count: count(value.warmup_count), warmup_required: count(value.warmup_required),
    error: isText(value.error) ? value.error : undefined,
  };
}
export function predictionFrom(value: unknown): Prediction | undefined {
  if (!isRecord(value) || !isDate(value.business_date) || !isText(value.state_name) ||
      !isFiniteNumber(value.state_id) || !Number.isInteger(value.state_id) || value.state_id < 0) return undefined;
  const close = numericText(value.close);
  if (close === undefined) return undefined;
  return {
    business_date: value.business_date, close, state_id: value.state_id, state_name: value.state_name,
    // Preserve vector indices when an individual probability is missing or invalid.
    probabilities: Array.isArray(value.probabilities) ? value.probabilities.map(item =>
      isFiniteNumber(item) && item >= 0 && item <= 1 ? item : null) : [],
  };
}
export function observationFrom(value: unknown): Observation | undefined {
  if (!isRecord(value) || !isDate(value.business_date) || !isRecord(value.features)) return undefined;
  const features = Object.fromEntries(Object.entries(value.features).filter((entry): entry is [string, number] =>
    isFiniteNumber(entry[1]) && (!Object.hasOwn(featureLabels, entry[0]) || Number.isFinite(entry[1] * 100))));
  return Object.keys(features).length ? { business_date: value.business_date, features } : undefined;
}
export function ordered<T extends { business_date: string }>(rows: T[]): T[] {
  return [...new Map(rows.map(row => [row.business_date, row])).values()].sort((a, b) => a.business_date.localeCompare(b.business_date));
}
