import { isFiniteNumber, isRecord } from '../../lib/validation';

export type Source = { source_id:string; relative_path:string; kind:string };
export type Run = { run_id:number; source_id:string; status:string; input_records?:number; accepted_records?:number; rejected_records?:number; finished_at:string };
export type Issue = { id:number; run_id?:number; rule_id:string; severity:string; affected?:number; details:string };
export type Records = {sources:Source[]; runs:Run[]; issues:Issue[]};
const textValue = (value:unknown) => typeof value === 'string' ? value : '';
const optionalNumber = (value:unknown) => isFiniteNumber(value) ? value : undefined;
export const numberLabel = (value:unknown) => isFiniteNumber(value) ? value.toLocaleString() : '';
export function sourceRecord(value:unknown):Source | undefined {
  if (!isRecord(value) || !textValue(value.source_id).trim()) return;
  return {source_id:textValue(value.source_id),relative_path:textValue(value.relative_path),kind:textValue(value.kind)};
}
export function runRecord(value:unknown):Run | undefined {
  if (!isRecord(value) || !isFiniteNumber(value.run_id)) return;
  return {run_id:value.run_id,source_id:textValue(value.source_id),status:textValue(value.status),input_records:optionalNumber(value.input_records),accepted_records:optionalNumber(value.accepted_records),rejected_records:optionalNumber(value.rejected_records),finished_at:textValue(value.finished_at)};
}
export function issueRecord(value:unknown):Issue | undefined {
  if (!isRecord(value) || !isFiniteNumber(value.id)) return;
  return {id:value.id,run_id:optionalNumber(value.run_id),rule_id:textValue(value.rule_id),severity:textValue(value.severity),affected:optionalNumber(value.affected),details:textValue(value.details)};
}
export function validRecords<T>(rows:unknown[], parse:(value:unknown) => T | undefined):T[] {
  return rows.flatMap(value => { const row = parse(value); return row === undefined ? [] : [row]; });
}
export function completeTotal(rows:Run[], key:'accepted_records'|'rejected_records'):number | undefined {
  if (!rows.length || rows.some(row => !isFiniteNumber(row[key]))) return;
  const total = rows.reduce((sum,row) => sum + row[key]!, 0);
  return isFiniteNumber(total) ? total : undefined;
}
export const rules:Record<string,string> = {
  provider_missing_asset:'供应方缺少资产行情', unknown_release_timezone_and_unit:'时区和单位待确认',
  empty_body:'正文为空', unknown_indicator_semantics_and_unit:'指标含义和单位待确认', article_index_without_body:'文章仅有索引',
};
export const kinds:Record<string,string> = {news:'新闻',markdown:'资金摘要',wechat:'公众号',assets:'资产目录',market:'行情',indicator:'指标',economic:'经济日历',social:'科技社交',turnover:'商品期货成交额'};
export const severityLabels:Record<string,string> = {warning:'提醒',error:'异常',info:'提示'};
export const runLabels:Record<string,string> = {SUCCESS:'已完成',FAILED:'失败',RUNNING:'导入中',PARTIAL:'部分完成'};
export const fileName = (path:string) => path.split(/[\\/]/).filter(Boolean).at(-1) || path;

