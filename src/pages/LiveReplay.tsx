import React, { useEffect, useState } from 'react';
import { Button, Card, Stat } from '../components/ui';
import { TimeChart } from '../components/charts';
import { requestJson } from '../services/httpClient';

const modelId = '20261101T141956611752Z-242c7770';
const sessionKey = 'hs300-replay-session';
type Session = { start_date: string; end_date: string; session_id: string; model_id: string; status: string; result_count: number; expected_results: number; warmup_count: number; warmup_required: number; error?: string };
type Model = {model_id:string; asset_id:string; training_end:string; replay_start:string; replay_end:string; feature_names:string[]; feature_version:string};
type Prediction = { state_id:number; business_date: string; close: string; state_name: string; probabilities: number[] };
type Features = { business_date: string; features: Record<string, number> };
type Page<T> = { items: T[]; next_cursor: string };

async function read<T>(path: string, signal?: AbortSignal, body?: unknown): Promise<T> {
  const result = await requestJson('/api/v1', path, { method: body === undefined ? 'GET' : 'POST', body, signal });
  if (result.status < 200 || result.status >= 300) throw new Error((result.body as { error?: { message?: string } })?.error?.message || 'HTTP ' + result.status);
  return result.body as T;
}

async function history<T>(endpoint: string, session: string, signal: AbortSignal) {
  const rows: T[] = [];
  let cursor = '';
  do {
    const params = new URLSearchParams({ session_id: session, limit: '1000' });
    if (cursor) params.set('cursor', cursor);
    const page = await read<Page<T>>(endpoint + '?' + params, signal);
    rows.push(...page.items);
    cursor = page.next_cursor;
  } while (cursor);
  return rows;
}

export default function LiveReplay({ section }: {section:string}): React.ReactElement {
  const [id, setId] = useState(() => sessionStorage.getItem(sessionKey) || '');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [model,setModel] = useState<Model>();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [allRows, setRows] = useState<Prediction[]>([]);
  const [features, setFeatures] = useState<Map<string, Features>>(new Map());
  const [range, setRange] = useState<{from?:string; to?:string}>({});
  const [date, setDate] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let timer: ReturnType<typeof setTimeout>;
    async function refresh() {
      try {
        const [status, models, list] = await Promise.all([
          read<{ready: boolean}>('stream/status', signal),
          read<{items: Model[]}>('models', signal),
          read<{items: Session[]}>('stream/sessions', signal),
        ]);
        if (signal.aborted) return;
        setModel(models.items.find(m => m.model_id === modelId));
        setReady(status.ready && models.items.some(m => m.model_id === modelId));
        setSessions(list.items);
        setId(current => list.items.some(s => s.session_id === current && s.model_id === modelId) ? current : list.items.find(s => s.model_id === modelId)?.session_id || '');
        setError('');
      } catch (cause) { if (!signal.aborted) { setModel(undefined); setReady(false); setSessions([]); setId(''); setError(String(cause)); } }
      finally { if (!signal.aborted) timer = setTimeout(refresh, 5000); }
    }
    void refresh();
    return () => { controller.abort(); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    sessionStorage.setItem(sessionKey, id);
    setRows([]); setFeatures(new Map()); setDate(''); setHistoryError('');
    if (!id) return;
    const controller = new AbortController();
    const signal = controller.signal;
    let socket: WebSocket;
    let retry: ReturnType<typeof setTimeout>;
    let loading = false;
    let pending = false;
    // REST is authoritative. Coalesce notifications and replace the snapshot to handle duplicates and gaps.
    async function sync() {
      if (loading) { pending = true; return; }
      loading = true;
      try {
        const [states, observations, current] = await Promise.all([
          history<Prediction>('regimes', id, signal), history<Features>('features', id, signal),
          read<Session>('stream/sessions/' + encodeURIComponent(id), signal),
        ]);
        if (signal.aborted) return;
        setRows(states); setFeatures(new Map(observations.map(row => [row.business_date, row])));
        setSessions(old => old.map(s => s.session_id === id ? current : s));
        setHistoryError('');
      } catch (cause) { if (!signal.aborted) { setRows([]); setFeatures(new Map()); setHistoryError(String(cause)); } }
      finally {
        loading = false;
        if (pending && !signal.aborted) { pending = false; void sync(); }
      }
    }
    function connect() {
      const url = new URL('/ws/v1/regimes', location.href);
      url.protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      url.searchParams.set('session_id', id);
      socket = new WebSocket(url);
      socket.onopen = sync;
      socket.onmessage = sync;
      socket.onclose = () => { if (!signal.aborted) retry = setTimeout(connect, 2000); };
    }
    void sync(); connect();
    const fallback = setInterval(() => { if (socket.readyState !== WebSocket.OPEN) void sync(); }, 5000);
    return () => { controller.abort(); clearTimeout(retry); clearInterval(fallback); socket.close(); };
  }, [id]);

  async function create() {
    setBusy(true);
    try {
      const item = await read<Session>('stream/sessions', undefined, { model_id: modelId, rate: 5, ...(from && to ? {from,to} : {}) });
      setSessions(old => [item, ...old.filter(s => s.session_id !== item.session_id)]); setId(item.session_id);
    } catch (cause) { setError(String(cause)); }
    finally { setBusy(false); }
  }
  const session = sessions.find(s => s.session_id === id);
  const from = range.from ?? session?.start_date ?? '';
  const to = range.to ?? session?.end_date ?? '';
  const invalidRange = Boolean(from) !== Boolean(to) || Boolean(from && to && (from > to || (model && (from < model.replay_start || to > model.replay_end))));
  const rows = invalidRange ? [] : allRows.filter(row => (!from || row.business_date >= from) && (!to || row.business_date <= to));
  const selected = rows.find(row => row.business_date === date) || rows[rows.length - 1];
  const dayFeatures = selected && features.get(selected.business_date)?.features;
  const running = sessions.some(s => ['QUEUED','RUNNING','PAUSED','DRAINING'].includes(s.status));
  const titles: Record<string,string> = {return_1d:'单日对数收益率',momentum_5d:'5 日动量',momentum_20d:'20 日动量',volatility_20d:'20 日年化波动率',ma_deviation_20d:'20 日均线偏离',drawdown_60d:'60 日回撤'};
  const until = selected ? rows.filter(row => row.business_date <= selected.business_date) : [];
  const changes = until.filter((row,i) => !i || until[i-1].state_id !== row.state_id);
  const since = changes.at(-1)?.business_date;
  const streak = since ? until.filter(row => row.business_date >= since).length : null;
  const datePicker = <label>交易日期 <select value={rows.some(r => r.business_date === date) ? date : ''} onChange={e => setDate(e.target.value)}><option value="">最新交易日</option>{rows.map(r => <option key={r.business_date}>{r.business_date}</option>)}</select></label>;
  const percent = (n:number) => (100*n).toFixed(2)+'%';
  const sessionView = section === '历史回放';
  return <>
    {sessionView && <div className="section-toolbar"><div className="filter-row"><label>回放记录 <select value={id} onChange={e => { setRange({}); setId(e.target.value); }}>
      {!id && <option value=""/>}{sessions.filter(s => s.model_id === modelId).map(s => <option key={s.session_id} value={s.session_id}>{model?.asset_id} · {s.start_date} 至 {s.end_date}</option>)}
    </select></label>
      <label>开始日期 <input type="date" value={from} min={model?.replay_start} max={model?.replay_end} onChange={e => { setRange({...range, from:e.target.value}); setDate(''); }}/></label>
      <label>结束日期 <input type="date" value={to} min={model?.replay_start} max={model?.replay_end} onChange={e => { setRange({...range, to:e.target.value}); setDate(''); }}/></label>
      {datePicker}</div>
    {section === '历史回放' && <Button variant="primary" disabled={!ready || busy || running || invalidRange} onClick={create}>启动回放</Button>}</div>}
    {sessionView && invalidRange && <p role="alert">请选择模型可回放范围内的完整日期区间，开始日期不能晚于结束日期。</p>}
    {(error || (sessionView && historyError)) && <p role="alert">{error || historyError}</p>}
    {section === '历史回放' && <Card title="沪深 300 · 历史回放" subtitle={model && '模型 ID '+model.model_id}>
      <div className="card-inner">{session && <p role="status">{session.status} · 预热 {session.warmup_count}/{session.warmup_required} · 结果 {session.result_count}/{session.expected_results} {session.error}</p>}
      {selected && <><TimeChart labels={rows.map(r => r.business_date)} series={[{name:'收盘',values:rows.map(r => Number(r.close))}]} unit=""/><strong>{selected.business_date}</strong><p>收盘 {selected.close}</p><p>动量状态：{selected.state_name}</p>
      <div className="filter-row">{(['momentum_5d', 'momentum_20d'] as const).map(key => {const value = dayFeatures?.[key]; return typeof value === 'number' && Number.isFinite(value) ? <span key={key}>{titles[key]}：{percent(value)}</span> : null;})}</div></>}</div></Card>}
    {sessionView && <><div className="stats-grid">
      <Stat label="当日状态" value={selected?.state_name} detail={selected?.business_date}/>
      <Stat label="状态归属概率" value={selected && percent(selected.probabilities[selected.state_id])}/>
      <Stat label="连续观测日" value={streak} detail={since && '所选区间内自 '+since}/>
      <Stat label="区间状态切换" value={selected && changes.length-1}/>
    </div><div className="two-col"><Card title="状态时间轴" subtitle="截至所选日期，列出每段状态的起始日"><table className="data-table"><thead><tr><th>交易日期</th><th>状态</th></tr></thead><tbody>{changes.map(r => <tr key={r.business_date}><td>{r.business_date}</td><td>{r.state_name}</td></tr>)}</tbody></table></Card>
    <Card title="当前状态的依据"><div className="card-inner">{selected && <><p>状态归属概率（0 / 1 / 2） {selected.probabilities.map(percent).join(' / ')}</p>
    <dl>{Object.entries(features.get(selected.business_date)?.features || {}).map(([key,v]) => <div key={key}><dt>{titles[key] || key}</dt><dd>{v.toFixed(6)}</dd></div>)}</dl></>}</div></Card></div></>}
    {sessionView && <Card title="所选区间状态画像" subtitle={rows.length ? rows[0].business_date+' 至 '+rows[rows.length-1].business_date+' · 各状态内的算术平均值' : undefined}>
      <table className="data-table"><thead><tr>{['状态','交易日数','20 日动量','20 日年化波动率','60 日回撤'].map(s => <th key={s}>{s}</th>)}</tr></thead><tbody>{[0,1,2].map(i => {
        const group = rows.filter(r => r.state_id === i);
        return group.length > 0 && <tr key={i}><td>{group[0].state_name}</td><td>{group.length}</td>{['momentum_20d','volatility_20d','drawdown_60d'].map(k => {
          const values = group.map(r => features.get(r.business_date)?.features[k]).filter((v): v is number => v !== undefined && Number.isFinite(v));
          return <td key={k}>{values.length === group.length ? percent(values.reduce((a,b) => a+b,0)/values.length) : ''}</td>;
        })}</tr>;
      })}</tbody></table></Card>}
    {section === '模型与评估' && <div className="two-col"><Card title="模型信息"><div className="card-inner">{model && <><p>沪深 300 · 三状态 GMM</p><p>模型 ID {model.model_id}</p><p>训练截止 {model.training_end}</p><p>可回放区间 {model.replay_start} 至 {model.replay_end}</p><p>特征版本 {model.feature_version}</p><p>{model.feature_names.map(k => titles[k] || k).join('、')}</p></>}</div></Card><Card title="样本外评估"><table className="data-table"><thead><tr><th>评估区间</th><th>指标</th><th>结果</th></tr></thead><tbody/></table></Card></div>}
  </>;
}