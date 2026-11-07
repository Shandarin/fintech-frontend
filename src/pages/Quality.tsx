import React, { useEffect, useState } from 'react';
import { Button, Card, Empty, Notice, PageHead, SearchBox } from '../components/ui';
import { pages } from '../services/pagedApi';

type Source = { source_id: string; relative_path: string; kind: string };
type Run = { run_id: number; source_id: string; status: string; input_records: number; accepted_records: number; rejected_records: number; finished_at: string | null };
type Issue = { id: number; run_id: number; rule_id: string; severity: string; affected: number; details: string };

const rules: Record<string,string> = {
  provider_missing_asset: '供应方缺少资产行情', unknown_release_timezone_and_unit: '发布时间的时区和单位待确认',
  empty_body: '正文为空', unknown_indicator_semantics_and_unit: '指标含义和单位待确认', article_index_without_body: '文章仅有索引',
};
const kinds: Record<string,string> = { news:'新闻', markdown:'资金摘要', wechat:'公众号', assets:'资产目录', market:'行情', indicator:'指标', economic:'经济日历', social:'科技社交', turnover:'商品期货成交额' };

export function ImportRecords({ quality = false }: {quality?: boolean}): React.ReactElement {
  const [data,setData] = useState<{sources:Source[]; runs:Run[]; issues:Issue[]}>();
  const [error,setError] = useState('');
  const [refresh,setRefresh] = useState(0);
  const [query,setQuery] = useState('');
  const [page,setPage] = useState(0);
  useEffect(() => {
    const c = new AbortController();
    setError(''); setData(undefined);
    const params = {dataset:'main'};
    Promise.all([
      pages<Source>('market-api/v1/sources',c.signal),
      pages<Run>('market-api/v1/runs',c.signal,params),
      pages<Issue>('market-api/v1/quality',c.signal,params),
    ]).then(([sources,runs,issues]) => { if (!c.signal.aborted) setData({sources,runs,issues}); })
      .catch(e => { if (!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  }, [refresh]);
  const sources = new Map(data?.sources.map(s => [s.source_id,s]));
  const runs = new Map(data?.runs.map(r => [r.run_id,r]));
  const issues = new Map<number,Issue[]>();
  for (const i of data?.issues || []) issues.set(i.run_id,[...(issues.get(i.run_id) || []),i]);
  const sourceName = (run?: Run) => run && (sources.get(run.source_id)?.relative_path || run.source_id);
  const visible = (data?.runs || []).filter(r => sourceName(r)?.toLowerCase().includes(query.trim().toLowerCase()) || String(r.run_id) === query.trim());
  const pageCount = Math.max(1,Math.ceil(visible.length/20));
  const current = Math.min(page,pageCount-1);
  return <Card title={quality ? '导入质量结果' : '数据来源与导入批次'} action={<Button icon="refresh" onClick={() => setRefresh(n => n+1)}>刷新</Button>}><div className="card-inner">
    {error ? <Notice tone="warning">{error}</Notice> : !data ? <p role="status">正在读取导入记录…</p> : quality ? <>
    <p>{runs.size.toLocaleString()} 个批次 · 接收 {data.runs.reduce((n,r) => n+r.accepted_records,0).toLocaleString()} 条 · 拒收 {data.runs.reduce((n,r) => n+r.rejected_records,0).toLocaleString()} 条 · {data.issues.length} 项质量提示</p>
    {data.issues.length ? <div className="table-scroll"><table className="data-table"><thead><tr><th>质量提示</th><th>来源文件</th><th>批次</th><th>级别</th><th>涉及记录</th></tr></thead><tbody>
      {data.issues.map(i => <tr key={i.id}><td>{rules[i.rule_id] || i.rule_id}</td><td>{sourceName(runs.get(i.run_id)) || '来源未知'}</td><td>{i.run_id}</td><td>{i.severity === 'warning' ? '提醒' : i.severity}</td><td>{i.affected.toLocaleString()}</td></tr>)}
    </tbody></table></div> : <Empty title="暂无质量提示"/>}</> : <>
    <SearchBox value={query} onChange={v => {setQuery(v);setPage(0);}} placeholder="搜索来源文件或批次编号"/>
    <p>{new Set(visible.map(r => r.source_id)).size.toLocaleString()} 个来源 · {visible.length.toLocaleString()} 个导入批次</p>
    <div className="table-scroll"><table className="data-table"><thead><tr><th>来源文件</th><th>类型</th><th>批次</th><th>导入状态</th><th>接收 / 拒收</th><th>质量提示</th></tr></thead><tbody>
      {visible.slice(current*20,(current+1)*20).map(r => { const kind = sources.get(r.source_id)?.kind || ''; return <tr key={r.run_id}><td>{sourceName(r)}</td><td>{kinds[kind] || kind}</td><td>{r.run_id}</td><td>{r.status === 'SUCCESS' ? '成功' : r.status}</td><td>{r.accepted_records.toLocaleString()} / {r.rejected_records.toLocaleString()}</td><td>{issues.get(r.run_id)?.map(i => rules[i.rule_id] || i.rule_id).join('、') || '—'}</td></tr>; })}
    </tbody></table></div>{!visible.length && <Empty/>}
    <div className="table-footer"><span>第 {current+1} / {pageCount} 页</span><div><Button disabled={!current} onClick={() => setPage(current-1)}>上一页</Button><Button disabled={current+1>=pageCount} onClick={() => setPage(current+1)}>下一页</Button></div></div></>}
  </div></Card>;
}

export default function Quality(): React.ReactElement {
  return <><PageHead title="数据质量"/><ImportRecords quality/></>;
}
