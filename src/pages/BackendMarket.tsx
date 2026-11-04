import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Empty, Field, Notice, PageHead } from '../components/ui';
import { downloadCsv } from '../lib/files';
import { fetchMarket } from '../services/market';
import type { MarketPage } from '../services/market';

export default function BackendMarket(): React.ReactElement {
  const base = import.meta.env.VITE_API_BASE_URL || '';
  const [filters, setFilters] = useState({ asset_id: '', from: '', to: '' });
  const [query, setQuery] = useState(filters), [cursors, setCursors] = useState(['']);
  const [data, setData] = useState<MarketPage | null>(null), [busy, setBusy] = useState(true);
  const [error, setError] = useState(''), [revision, setRevision] = useState(0), [updated, setUpdated] = useState('');
  const cursor = cursors[cursors.length - 1];
  useEffect(() => {
    const controller = new AbortController(); let active = true;
    setBusy(true); setError(''); setData(null); setUpdated('');
    const params = new URLSearchParams({ dataset: 'demo', limit: '100', cursor });
    Object.entries(query).forEach(([key, value]) => { if (value) params.set(key, value); });
    fetchMarket(base, params, controller.signal).then(result => {
      if (active) { setData(result); setUpdated(new Date().toLocaleString('zh-CN')); }
    }).catch(err => { if (active) setError(err instanceof Error ? err.message : '无法访问后端'); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; controller.abort(); };
  }, [base, query, cursor, revision]);
  return <><PageHead title="后端行情" actions={<><Badge tone="amber">后端 demo · 合成数据</Badge><Button icon="refresh" busy={busy} onClick={() => setRevision(n => n + 1)}>刷新</Button><Button icon="download" disabled={!data?.items.length || busy} onClick={() => downloadCsv('后端-demo-行情-当前页.csv', ['资产','指标','日期','数值','单位','来源','定位'], data!.items.map(row => [row.entity_id,row.metric,row.business_date,row.value,row.unit,row.source_id,row.source_locator]))}>导出当前页</Button></>}/>
    <Notice>本页通过网络读取后端 demo 数据集，不是实时行情。其他页面及本地演示视图仍使用模拟状态。未知单位原样展示，不补造价格、成交量或模型结果。</Notice>
    <form className="section-toolbar" onSubmit={event => { event.preventDefault(); if (filters.from && filters.to && filters.from > filters.to) return; setQuery({ ...filters }); setCursors(['']); }}>
      <div className="filter-row"><Field label="资产名称 / 标识"><input value={filters.asset_id} onChange={e => setFilters({ ...filters, asset_id: e.target.value })} placeholder="留空查询全部"/></Field><Field label="开始日期"><input type="date" value={filters.from} max={filters.to || undefined} onChange={e => setFilters({ ...filters, from: e.target.value })}/></Field><Field label="结束日期"><input type="date" value={filters.to} min={filters.from || undefined} onChange={e => setFilters({ ...filters, to: e.target.value })}/></Field><button type="submit" className="btn btn-primary" disabled={busy}>查询</button></div>
    </form>
    <div aria-live="polite">{busy && <Notice>正在请求后端行情…</Notice>}{error && <Notice tone="warning">{error}。请检查网络或隧道状态。<Button onClick={() => setRevision(n => n + 1)}>重试</Button></Notice>}</div>
    {!busy && !error && data && <Card className="table-card" title="市场观测记录" subtitle={'最近成功请求：' + updated}>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>资产</th><th>指标</th><th>业务日期</th><th>数值</th><th>单位</th><th>来源定位</th></tr></thead><tbody>{data.items.map(row => <tr key={row.record_id}><td>{row.entity_id}</td><td>{row.metric}</td><td>{row.business_date}</td><td className="numeric">{row.value}</td><td>{row.unit}</td><td title={row.source_id}>{row.source_locator}</td></tr>)}</tbody></table></div>
      {!data.items.length && <Empty title="后端未返回匹配记录" description="请调整资产或日期范围；不会使用本地模拟数据填充。"/>}
      <div className="table-footer"><span>第 {cursors.length} 页 · 本页 {data.items.length} 条</span><div><Button disabled={cursors.length === 1} onClick={() => setCursors(values => values.slice(0, -1))}>上一页</Button><Button disabled={!data.next_cursor || cursors.includes(data.next_cursor)} onClick={() => setCursors(values => [...values, data.next_cursor])}>下一页</Button></div></div>
    </Card>}
  </>;
}
