import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card, Info, Modal, Notice, PageHead, SearchBox, Tabs } from '../components/ui';
import { pages } from '../services/pagedApi';
import './tools-pages.css';

type Source = { source_id:string; relative_path:string; kind:string };
type Run = { run_id:number; source_id:string; status:string; input_records?:number; accepted_records?:number; rejected_records?:number; finished_at:string };
type Issue = { id:number; run_id?:number; rule_id:string; severity:string; affected?:number; details:string };
type Records = {sources:Source[]; runs:Run[]; issues:Issue[]};
const isRecord = (value:unknown):value is Record<string,unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
const textValue = (value:unknown) => typeof value === 'string' ? value : '';
const isFiniteNumber = (value:unknown):value is number => typeof value === 'number' && Number.isFinite(value);
const optionalNumber = (value:unknown) => isFiniteNumber(value) ? value : undefined;
const numberLabel = (value:unknown) => isFiniteNumber(value) ? value.toLocaleString() : '';
function sourceRecord(value:unknown):Source | undefined {
  if (!isRecord(value) || !textValue(value.source_id).trim()) return;
  return {source_id:textValue(value.source_id),relative_path:textValue(value.relative_path),kind:textValue(value.kind)};
}
function runRecord(value:unknown):Run | undefined {
  if (!isRecord(value) || !isFiniteNumber(value.run_id)) return;
  return {run_id:value.run_id,source_id:textValue(value.source_id),status:textValue(value.status),input_records:optionalNumber(value.input_records),accepted_records:optionalNumber(value.accepted_records),rejected_records:optionalNumber(value.rejected_records),finished_at:textValue(value.finished_at)};
}
function issueRecord(value:unknown):Issue | undefined {
  if (!isRecord(value) || !isFiniteNumber(value.id)) return;
  return {id:value.id,run_id:optionalNumber(value.run_id),rule_id:textValue(value.rule_id),severity:textValue(value.severity),affected:optionalNumber(value.affected),details:textValue(value.details)};
}
function validRecords<T>(rows:unknown[], parse:(value:unknown) => T | undefined):T[] {
  return rows.flatMap(value => { const row = parse(value); return row === undefined ? [] : [row]; });
}
function completeTotal(rows:Run[], key:'accepted_records'|'rejected_records'):number | undefined {
  if (!rows.length || rows.some(row => !isFiniteNumber(row[key]))) return;
  const total = rows.reduce((sum,row) => sum + row[key]!, 0);
  return isFiniteNumber(total) ? total : undefined;
}
const rules:Record<string,string> = {
  provider_missing_asset:'供应方缺少资产行情', unknown_release_timezone_and_unit:'时区和单位待确认',
  empty_body:'正文为空', unknown_indicator_semantics_and_unit:'指标含义和单位待确认', article_index_without_body:'文章仅有索引',
};
const kinds:Record<string,string> = {news:'新闻',markdown:'资金摘要',wechat:'公众号',assets:'资产目录',market:'行情',indicator:'指标',economic:'经济日历',social:'科技社交',turnover:'商品期货成交额'};
const severityLabels:Record<string,string> = {warning:'提醒',error:'异常',info:'提示'};
const runLabels:Record<string,string> = {SUCCESS:'已完成',FAILED:'失败',RUNNING:'导入中',PARTIAL:'部分完成'};
const fileName = (path:string) => path.split(/[\\/]/).filter(Boolean).at(-1) || path;

export function ImportRecords({quality = false}:{quality?:boolean}):React.ReactElement {
  const [data, setData] = useState<Records>();
  const [errors, setErrors] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [detail, setDetail] = useState<Run | Issue>();
  useEffect(() => {
    const c = new AbortController();
    setErrors([]); setData(undefined); setDetail(undefined);
    Promise.allSettled([
      pages<unknown>('market-api/v1/sources', c.signal),
      pages<unknown>('market-api/v1/runs', c.signal, {dataset:'main'}),
      pages<unknown>('market-api/v1/quality', c.signal, {dataset:'main'}),
    ]).then(([sources, runs, issues]) => {
      if (c.signal.aborted) return;
      setData({sources:sources.status === 'fulfilled' ? validRecords(sources.value,sourceRecord) : [], runs:runs.status === 'fulfilled' ? validRecords(runs.value,runRecord) : [], issues:issues.status === 'fulfilled' ? validRecords(issues.value,issueRecord) : []});
      setErrors([sources,runs,issues].flatMap(r => r.status === 'rejected' ? [r.reason instanceof Error ? r.reason.message : '读取失败'] : []));
    });
    return () => c.abort();
  }, [refresh]);
  useEffect(() => { setPage(0); setQuery(''); setDetail(undefined); }, [quality]);
  const sources = useMemo(() => new Map(data?.sources.map(s => [s.source_id,s])), [data]);
  const runs = useMemo(() => new Map(data?.runs.map(r => [r.run_id,r])), [data]);
  const runFor = (id:number | undefined) => id === undefined ? undefined : runs.get(id);
  const sourcePath = (run?:Run) => run ? sources.get(run.source_id)?.relative_path || run.source_id : '';
  const issueTitle = (issue:Issue) => rules[issue.rule_id] || issue.rule_id || `质量记录 ${issue.id}`;
  const needle = query.trim().toLowerCase();
  const visibleRuns = (data?.runs || []).filter(r => `${sourcePath(r)} ${r.run_id}`.toLowerCase().includes(needle));
  const visibleIssues = (data?.issues || []).filter(i => `${issueTitle(i)} ${sourcePath(runFor(i.run_id))} ${i.run_id ?? ''}`.toLowerCase().includes(needle));
  const visibleSources = (data?.sources || []).filter(s => `${s.relative_path} ${kinds[s.kind] || s.kind}`.toLowerCase().includes(needle));
  const showRuns = !!data?.runs.length;
  const visibleCount = quality ? visibleIssues.length : showRuns ? visibleRuns.length : visibleSources.length;
  const pageCount = Math.max(1, Math.ceil(visibleCount / 20));
  const current = Math.min(page, pageCount - 1);
  const windowStart = current * 20;
  const pageEnd = windowStart + 20;
  const issueForRun = (id:number) => data?.issues.filter(i => i.run_id === id) || [];
  const accepted = completeTotal(data?.runs || [], 'accepted_records');
  const rejected = completeTotal(data?.runs || [], 'rejected_records');
  return <div className="import-records">
    <div className="tools-toolbar">
      <SearchBox value={query} onChange={value => {setQuery(value);setPage(0);}} placeholder={quality ? '搜索质量提示或来源' : '搜索来源或批次'}/>
      <Button icon="refresh" busy={!data} onClick={() => setRefresh(n => n + 1)}>刷新</Button>
    </div>
    {!!errors.length && <Notice tone="warning"><span>部分数据读取失败</span><Info label="查看读取错误">{errors.join('；')}</Info><Button variant="ghost" onClick={() => setRefresh(n => n + 1)}>重试</Button></Notice>}
    {!data && <p className="tools-loading" role="status">读取中…</p>}
    {quality && data && (data.runs.length > 0 || data.issues.length > 0) && <div className="quality-summary">
      {!!data.runs.length && <>
        <div><span>导入批次</span><strong>{data.runs.length.toLocaleString()}</strong></div>
        {accepted !== undefined && <div><span>已接收</span><strong>{accepted.toLocaleString()}</strong></div>}
        {rejected !== undefined && <div><span>未接收</span><strong>{rejected.toLocaleString()}</strong></div>}
      </>}
      {!!data.issues.length && <div><span>质量提示</span><strong>{data.issues.length.toLocaleString()}</strong></div>}
    </div>}
    {visibleCount > 0 && <Card className="table-card import-table-card">
      <div className="table-scroll"><table className="data-table">
        <thead>{quality ? <tr><th>质量提示</th><th>来源</th><th>级别</th><th className="numeric">涉及记录</th><th><span className="sr-only">操作</span></th></tr>
          : showRuns ? <tr><th>来源</th><th>类型</th><th>导入状态</th><th className="numeric">接收</th><th className="numeric">拒收</th><th><span className="sr-only">操作</span></th></tr>
          : <tr><th>来源</th><th>类型</th></tr>}</thead>
        <tbody>{quality ? visibleIssues.slice(windowStart,pageEnd).map(issue => <tr key={issue.id}>
          <td><button type="button" className="table-text-button" onClick={() => setDetail(issue)}>{issueTitle(issue)}</button></td>
          <td className="source-file" title={sourcePath(runFor(issue.run_id))}>{fileName(sourcePath(runFor(issue.run_id)))}</td>
          <td>{issue.severity && <Badge tone={issue.severity === 'error' ? 'red' : 'amber'}>{severityLabels[issue.severity] || issue.severity}</Badge>}</td>
          <td className="numeric">{numberLabel(issue.affected)}</td><td><Button variant="ghost" onClick={() => setDetail(issue)}>详情</Button></td>
        </tr>) : showRuns ? visibleRuns.slice(windowStart,pageEnd).map(run => <tr key={run.run_id}>
          <td className="source-file"><button type="button" className="table-text-button" title={sourcePath(run)} onClick={() => setDetail(run)}>{fileName(sourcePath(run)) || `批次 ${run.run_id}`}</button></td>
          <td>{kinds[sources.get(run.source_id)?.kind || ''] || sources.get(run.source_id)?.kind}</td>
          <td>{run.status && <Badge tone={run.status === 'SUCCESS' ? 'green' : run.status === 'FAILED' ? 'red' : 'amber'}>{runLabels[run.status] || run.status}</Badge>}</td>
          <td className="numeric">{numberLabel(run.accepted_records)}</td><td className="numeric">{numberLabel(run.rejected_records)}</td>
          <td><Button variant="ghost" onClick={() => setDetail(run)}>查看批次</Button></td>
        </tr>) : visibleSources.slice(windowStart,pageEnd).map(source => <tr key={source.source_id}><td className="source-file" title={source.relative_path || source.source_id}>{fileName(source.relative_path || source.source_id)}</td><td>{kinds[source.kind] || source.kind}</td></tr>)}</tbody>
      </table></div>
      <div className="table-footer"><span>{visibleCount.toLocaleString()} 项</span>{pageCount > 1 && <div><Button disabled={!current} onClick={() => setPage(current-1)}>上一页</Button><span>{current+1} / {pageCount}</span><Button disabled={current+1>=pageCount} onClick={() => setPage(current+1)}>下一页</Button></div>}</div>
    </Card>}
    {detail && <Modal title={'rule_id' in detail ? '质量详情' : '导入批次'} onClose={() => setDetail(undefined)}>
      <dl className="key-values">
        {sourcePath('rule_id' in detail ? runFor(detail.run_id) : detail) && <div><dt>来源</dt><dd>{sourcePath('rule_id' in detail ? runFor(detail.run_id) : detail)}</dd></div>}
        {detail.run_id !== undefined && <div><dt>批次</dt><dd>{detail.run_id}</dd></div>}
        {'rule_id' in detail ? <>{detail.rule_id && <div><dt>质量提示</dt><dd>{issueTitle(detail)}</dd></div>}{detail.affected !== undefined && <div><dt>涉及记录</dt><dd>{numberLabel(detail.affected)}</dd></div>}</>
          : <>{detail.status && <div><dt>状态</dt><dd>{runLabels[detail.status] || detail.status}</dd></div>}{detail.input_records !== undefined && <div><dt>输入记录</dt><dd>{numberLabel(detail.input_records)}</dd></div>}{detail.accepted_records !== undefined && detail.rejected_records !== undefined ? <div><dt>接收 / 拒收</dt><dd>{numberLabel(detail.accepted_records)} / {numberLabel(detail.rejected_records)}</dd></div> : <>{detail.accepted_records !== undefined && <div><dt>接收</dt><dd>{numberLabel(detail.accepted_records)}</dd></div>}{detail.rejected_records !== undefined && <div><dt>拒收</dt><dd>{numberLabel(detail.rejected_records)}</dd></div>}</>}{detail.finished_at && <div><dt>完成时间</dt><dd>{detail.finished_at}</dd></div>}</>}
      </dl>
      {'rule_id' in detail && detail.details && <pre className="source-detail-text">{detail.details}</pre>}
      {!('rule_id' in detail) && issueForRun(detail.run_id).length > 0 && <ul className="run-issues">{issueForRun(detail.run_id).map(issue => <li key={issue.id}><button type="button" onClick={() => setDetail(issue)}>{issueTitle(issue)}</button></li>)}</ul>}
    </Modal>}
  </div>;
}

export default function Quality():React.ReactElement {
  const [tab, setTab] = useState('sources');
  return <><PageHead title="数据管理"/><Tabs items={[{id:'sources',label:'数据来源'},{id:'quality',label:'质量检查'}]} value={tab} onChange={setTab}/><ImportRecords quality={tab === 'quality'}/></>;
}
