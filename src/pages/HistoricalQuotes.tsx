import { AssetNews } from './MarketResearch';
import React, { useEffect, useState } from 'react';
import { Card, Notice } from '../components/ui';
import MarketChart, { type Quote } from '../components/MarketChart';
import { pages } from '../services/pagedApi';
import { useApp } from '../state/AppContext';

type AssetRow = { asset_id: string; metadata: string };
type Session = { session_id: string; start_date: string; end_date: string; result_count: number; model_id: string };
type StateRow = { business_date: string; state_name: string; state_id: number };

const groups: Record<string, string> = { 中国权益: 'equity', 全球权益: 'equity', 全球债券: 'bond', 外汇: 'fx', 大宗商品: 'commodity' };
export default function HistoricalQuotes(): React.ReactElement {
  const { user } = useApp();
  const [catalog, setCatalog] = useState<AssetRow[]>([]);
  const [asset, setAsset] = useState('沪深300');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState(''), [catalogError, setCatalogError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]), [session, setSession] = useState('');
  const [states, setStates] = useState<StateRow[]>([]), [overlayError, setOverlayError] = useState('');
  const assets = catalog.map(r => ({ id: r.asset_id, meta: JSON.parse(r.metadata) })).filter(({ meta }) =>
    ['close','yield'].includes(meta.字段) && meta.大类 !== '示例' &&
    (!user || user.allowedClasses.some(c => c === groups[meta.大类]) || (meta.大类 === '另类' && user?.role !== 'viewer')));
  const current = assets.find(a => a.id === asset) || assets[0];
  const id = current?.id, metric = current?.meta.字段;
  useEffect(() => {
    const c = new AbortController();
    pages<AssetRow>('market-api/v1/assets', c.signal).then(setCatalog).catch(e => { if (!c.signal.aborted) setCatalogError(e.message); });
    return () => c.abort();
  }, []);
  useEffect(() => {
    if (!id) return;
    const c = new AbortController();
    setLoading(true); setError(''); setQuotes([]);
    const path = metric === 'yield' ? 'market' : 'market/daily-return';
    pages<Quote>('market-api/v1/' + path, c.signal, { dataset:'main', asset_id:id, metric }).then(rows => {
      if (!c.signal.aborted) setQuotes(rows.sort((a,b) => a.business_date.localeCompare(b.business_date)));
    }).catch(e => { if (!c.signal.aborted) setError(e.message); }).finally(() => { if (!c.signal.aborted) setLoading(false); });
    return () => c.abort();
  }, [id, metric]);
  useEffect(() => {
    const c = new AbortController();
    if (id === '沪深300') Promise.all([pages<Session>('api/v1/stream/sessions', c.signal), pages<{model_id:string; asset_id:string}>('api/v1/models', c.signal)]).then(([s,m]) => {
      if (!c.signal.aborted) setSessions(s.filter(r => r.result_count && m.some(model => model.asset_id === id && model.model_id === r.model_id)));
    }).catch(e => { if (!c.signal.aborted) setOverlayError(e.message); });
    return () => c.abort();
  }, [id]);
  useEffect(() => {
    setStates([]);
    const c = new AbortController();
    if (session && id === '沪深300') pages<StateRow>('api/v1/regimes', c.signal, {session_id:session}).then(rows => {
      if (!c.signal.aborted) setStates(rows);
    }).catch(e => { if (!c.signal.aborted) setOverlayError(e.message); });
    return () => c.abort();
  }, [session, id]);
  const rows = quotes;
  const label = metric === 'yield' ? '债券收益率' : '收盘价';
  return <Card title="历史行情"><div className="card-inner">
    <div className="filter-row"><label>资产 <select value={id || ''} onChange={e => { setAsset(e.target.value); setSession(''); setOverlayError(''); }}>{assets.map(a => <option key={a.id}>{a.id}</option>)}</select></label>
    {id === '沪深300' && <label>回放状态 <select value={session} onChange={e => { setSession(e.target.value); setOverlayError(''); }}><option value="">不叠加</option>{sessions.map(s => <option key={s.session_id} value={s.session_id}>{s.start_date} 至 {s.end_date} · {s.session_id.slice(0,8)}</option>)}</select></label>}</div>
    {overlayError && <Notice tone="warning">回放服务：{overlayError}</Notice>}
    {catalogError || error ? <Notice tone="warning">{catalogError || error}</Notice> : loading ? <p role="status">正在读取历史行情…</p> : rows.length ? <>
    <p>{id} · {rows[0].business_date} 至 {rows.at(-1)!.business_date} · {rows.length.toLocaleString()} 条 · 期末{label} {rows.at(-1)!.value}</p>
    <MarketChart key={id} asset={id} rows={rows} states={states} label={label}/></> : <p>所选区间没有行情。</p>}
    {id && user?.role !== 'viewer' && <AssetNews key={id} asset={id}/>}
    </div></Card>;
}
