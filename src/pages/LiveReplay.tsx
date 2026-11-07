import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Button, Card, Field, Info, Stat } from '../components/ui';
import { TimeChart } from '../components/charts';
import { read } from '../services/replay';
import { ordered, modelFrom, sessionFrom, predictionFrom, observationFrom, featureLabels, featureTitle, statusTitle, type Session, type Model, type Snapshot } from '../features/replay/model';
import { pages } from '../services/pagedApi';
import { downloadCsv } from '../lib/files';
import { percent } from '../lib/format';
import { isFiniteNumber, isRecord, isDate } from '../lib/validation';
import { PRIMARY_SERIES_COLOR, STATE_COLORS } from '../styles/palette';
import { readSessionSelection as loadStored, writeSessionSelection as saveStored } from '../lib/sessionStorage';

const sessionKey = 'hs300-replay-session';
const modelKey = 'market-replay-model';
const stateColors = STATE_COLORS;
export default function LiveReplay({ section }: { section: string }): React.ReactElement {
  const [id, setId] = useState(() => loadStored(sessionKey));
  const [modelId, setModelId] = useState(() => loadStored(modelKey));
  const [models, setModels] = useState<Model[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [historyError, setHistoryError] = useState<{ sessionId: string; message: string }>();
  const [reload, setReload] = useState(0);
  const [snapshot, setSnapshot] = useState<Snapshot>();
  const [range, setRange] = useState<{ from?: string; to?: string }>({});
  const [date, setDate] = useState('');
  const [featureKey, setFeatureKey] = useState('momentum_20d');
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const selection = useRef({ modelId, id }); selection.current = { modelId, id };
  const createRequest = useRef<AbortController | undefined>(undefined);
  const sessionRevision = useRef(0);
  const pendingSessions = useRef(new Map<string, Session>());
  const model = models.find(item => item.model_id === modelId);
  const relevantSessions = sessions.filter(item => item.model_id === modelId);
  const session = relevantSessions.find(item => item.session_id === id);
  const isResearch = section === 'features';
  const isReplay = section === '历史回放';

  useEffect(() => () => { createRequest.current?.abort(); }, []);
  useEffect(() => { setRange({}); setDate(''); setActionError(''); }, [modelId, id]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let timer: ReturnType<typeof setTimeout>;
    async function refresh() {
      const revision = sessionRevision.current;
      try {
        const [status, available, list] = await Promise.all([
          read<unknown>('stream/status', signal),
          pages<unknown>('api/v1/models', signal),
          pages<unknown>('api/v1/stream/sessions', signal),
        ]);
        if (signal.aborted) return;
        if (!isRecord(status) || typeof status.ready !== 'boolean') throw new Error('Invalid stream status');
        const validModels = available.flatMap(item => modelFrom(item) || []);
        const validSessions = list.flatMap(item => sessionFrom(item) || []);
        setModels(validModels);
        setReady(status.ready === true);
        // Ignore a list requested before a newly acknowledged creation. Keep its real
        // POST response until a subsequent list has acknowledged that session as well.
        if (revision === sessionRevision.current) {
          for (const item of validSessions) pendingSessions.current.delete(item.session_id);
          setSessions([...new Map([...pendingSessions.current.values(), ...validSessions].map(item => [item.session_id, item])).values()]);
        }
        setModelId(current => validModels.some(item => item.model_id === current) ? current : (validModels.find(item => item.asset_id === '沪深300') || validModels[0])?.model_id || '');
        setError('');
      } catch {
        if (!signal.aborted && revision === sessionRevision.current) { setModels([]); setReady(false); setSessions([]); setError('回放服务暂时无法连接'); }
      } finally {
        if (!signal.aborted) timer = setTimeout(refresh, 5000);
      }
    }
    void refresh();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [reload]);

  useEffect(() => {
    if (!modelId || !models.some(item => item.model_id === modelId)) return;
    saveStored(modelKey, modelId);
    setId(current => sessions.some(item => item.session_id === current && item.model_id === modelId)
      ? current : sessions.find(item => item.model_id === modelId)?.session_id || '');
  }, [modelId, sessions, models]);

  useEffect(() => {
    saveStored(sessionKey, id);
    setSnapshot(undefined); setDate(''); setHistoryError(undefined);
    if (!id) return;
    const controller = new AbortController();
    const signal = controller.signal;
    let socket: WebSocket | undefined;
    let retry: ReturnType<typeof setTimeout>;
    let loading = false;
    let pending = false;
    async function sync() {
      if (loading) { pending = true; return; }
      loading = true;
      try {
        const [states, features, current] = await Promise.all([
          pages<unknown>('api/v1/regimes', signal, { session_id: id }),
          pages<unknown>('api/v1/features', signal, { session_id: id }),
          read<unknown>('stream/sessions/' + encodeURIComponent(id), signal),
        ]);
        if (signal.aborted) return;
        const updated = sessionFrom(current);
        if (!updated || updated.session_id !== id) throw new Error('Invalid session detail');
        setSnapshot({ sessionId: id, rows: ordered(states.flatMap(row => predictionFrom(row) || [])), observations: ordered(features.flatMap(row => observationFrom(row) || [])) });
        if (pendingSessions.current.has(id)) pendingSessions.current.set(id, updated);
        setSessions(old => old.map(item => item.session_id === id ? updated : item));
        setHistoryError(undefined);
      } catch (cause) {
        if (!signal.aborted) {
          setSnapshot(undefined); setHistoryError({ sessionId: id, message: '回放记录读取失败' });
          if (isRecord(cause) && cause.status === 404) {
            pendingSessions.current.delete(id);
            setSessions(old => old.filter(item => item.session_id !== id));
          }
        }
      } finally {
        loading = false;
        if (pending && !signal.aborted) { pending = false; void sync(); }
      }
    }
    function connect() {
      if (signal.aborted) return;
      const url = new URL('/ws/v1/regimes', location.href);
      url.protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      url.searchParams.set('session_id', id);
      try {
        socket = new WebSocket(url);
        socket.onopen = () => { void sync(); };
        socket.onmessage = () => { void sync(); };
        socket.onerror = () => { socket?.close(); };
        socket.onclose = () => { if (!signal.aborted) retry = setTimeout(connect, 2000); };
      } catch { if (!signal.aborted) retry = setTimeout(connect, 2000); }
    }
    void sync(); connect();
    // REST remains authoritative, including when a notification was missed.
    const fallback = setInterval(() => { void sync(); }, 5000);
    return () => { controller.abort(); clearTimeout(retry); clearInterval(fallback); if (socket) { socket.onclose = null; socket.close(); } };
  }, [id, reload]);

  const allRows = snapshot?.sessionId === id ? snapshot.rows : [];
  const observations = snapshot?.sessionId === id ? snapshot.observations : [];
  const from = range.from ?? session?.start_date ?? model?.replay_start ?? '';
  const to = range.to ?? session?.end_date ?? model?.replay_end ?? '';
  const invalidRange = Boolean(from) !== Boolean(to) || Boolean(from && to && (!isDate(from) || !isDate(to) || from > to || (model?.replay_start && from < model.replay_start) || (model?.replay_end && to > model.replay_end)));
  const rows = invalidRange || !model || !session ? [] : allRows.filter(row => (!from || row.business_date >= from) && (!to || row.business_date <= to));
  const featureRows = invalidRange || !model || !session ? [] : observations.filter(row => (!from || row.business_date >= from) && (!to || row.business_date <= to));
  const featureMap = useMemo(() => new Map(observations.map(row => [row.business_date, row.features])), [observations]);
  const featureKeys = [...new Set(featureRows.flatMap(row => Object.keys(row.features).filter(key => isFiniteNumber(row.features[key]))))];
  const selectedKey = featureKeys.includes(featureKey) ? featureKey : featureKeys[0] || '';
  const featureSeries = featureRows.filter(row => isFiniteNumber(row.features[selectedKey]));
  const featureValues = featureSeries.map(row => row.features[selectedKey]);
  const knownPercent = Object.hasOwn(featureLabels, selectedKey);
  const formatFeature = (value: number) => knownPercent ? percent(value) : value.toLocaleString('zh-CN', { maximumFractionDigits: 6 });
  const selected = rows.find(row => row.business_date === date) || rows.at(-1);
  const dayFeatures = selected ? featureMap.get(selected.business_date) : undefined;
  const probabilities = Array.isArray(selected?.probabilities) ? selected.probabilities : [];
  const selectedProbability = selected ? probabilities[selected.state_id] : undefined;
  const until = selected ? rows.filter(row => row.business_date <= selected.business_date) : [];
  const changes = until.filter((row, index) => !index || until[index - 1].state_id !== row.state_id);
  const since = changes.at(-1)?.business_date;
  const streak = since ? until.filter(row => row.business_date >= since).length : undefined;
  const running = sessions.some(item => ['QUEUED', 'RUNNING', 'PAUSED', 'DRAINING'].includes(item.status));
  const states = [...new Map(rows.map(row => [row.state_id, row.state_name])).entries()];
  const profileKeys = ['momentum_20d', 'volatility_20d', 'drawdown_60d'].filter(key => rows.some(row => isFiniteNumber(featureMap.get(row.business_date)?.[key])));

  async function create() {
    if (!model || !ready || busy || createRequest.current || running || invalidRange) return;
    const controller = new AbortController();
    createRequest.current = controller;
    const requestedModel = model.model_id;
    setBusy(true); setActionError('');
    try {
      const response = await read<unknown>('stream/sessions', controller.signal, { model_id: requestedModel, rate: 5, ...(from && to ? { from, to } : {}) });
      if (controller.signal.aborted) return;
      const item = sessionFrom(response);
      if (!item || item.model_id !== requestedModel) throw new Error('回放创建响应格式异常，请刷新记录确认');
      sessionRevision.current += 1;
      pendingSessions.current.set(item.session_id, item);
      setSessions(old => [item, ...old.filter(existing => existing.session_id !== item.session_id)]);
      if (selection.current.modelId === requestedModel) { setId(item.session_id); setDate(''); }
    } catch (cause) { if (!controller.signal.aborted) setActionError(cause instanceof Error ? cause.message : '回放启动失败'); }
    finally { createRequest.current = undefined; if (!controller.signal.aborted) setBusy(false); }
  }

  const visibleError = actionError || error || (historyError?.sessionId === id ? historyError.message : '');

  return <div className="research-page">
    {models.length > 0 && <div className="research-controls">
      <div className="research-controls-fields">
        <Field label="研究标的"><select value={modelId} disabled={busy} onChange={event => { setModelId(event.target.value); setRange({}); setDate(''); setActionError(''); }}>
          {models.map(item => <option key={item.model_id} value={item.model_id}>{item.asset_id}{models.filter(other => other.asset_id === item.asset_id).length > 1 ? ` · ${item.training_end ? item.training_end + ' · ' : ''}${item.model_id.slice(-8)}` : ''}</option>)}
        </select></Field>
        {(isReplay || isResearch) && relevantSessions.length > 0 && <Field label="回放记录"><select value={id} disabled={busy} onChange={event => { setId(event.target.value); setRange({}); setDate(''); setActionError(''); }}>
          {relevantSessions.map(item => <option key={item.session_id} value={item.session_id}>{item.start_date} — {item.end_date} · {statusTitle(item.status)}{relevantSessions.some(other => other.session_id !== item.session_id && other.start_date === item.start_date && other.end_date === item.end_date && other.status === item.status) ? ' · ' + item.session_id.slice(-8) : ''}</option>)}
        </select></Field>}
        {(isReplay || isResearch) && <><Field label="开始日期"><input type="date" value={from} min={model?.replay_start} max={model?.replay_end} disabled={busy} onChange={event => { setRange(current => ({ ...current, from: event.target.value })); setDate(''); }}/></Field>
          <Field label="结束日期"><input type="date" value={to} min={model?.replay_start} max={model?.replay_end} disabled={busy} onChange={event => { setRange(current => ({ ...current, to: event.target.value })); setDate(''); }}/></Field></>}
      </div>
      {isReplay && <Button variant="primary" icon="play" busy={busy} disabled={!model || !ready || running || invalidRange}
        title={!ready ? '回放服务尚未就绪' : running ? '已有回放任务正在执行' : undefined} onClick={() => { void create(); }}>启动回放</Button>}
    </div>}
    {invalidRange && (isReplay || isResearch) && <p role="alert" className="research-error">请选择模型可回放范围内的完整日期区间。</p>}
    {visibleError && <div className="research-error" role="alert"><span>{visibleError}</span><Button variant="ghost" icon="refresh" onClick={() => { setActionError(''); setReload(value => value + 1); }}>重试</Button></div>}

    {isReplay && session && <div className="replay-session-status" role="status">
      <Badge tone={session.status === 'FAILED' ? 'red' : session.status === 'COMPLETED' ? 'green' : 'amber'} dot>{statusTitle(session.status)}</Badge>
      {isFiniteNumber(session.result_count) && isFiniteNumber(session.expected_results) && <span>已回放 <strong>{session.result_count} / {session.expected_results}</strong> 个交易日</span>}
      {isFiniteNumber(session.warmup_count) && isFiniteNumber(session.warmup_required) && session.warmup_count < session.warmup_required && <span>预热 {session.warmup_count} / {session.warmup_required}</span>}
      {session.error && <span className="negative">{session.error}</span>}
      <Info label="回放记录详情"><span>{session.session_id} · {session.status}</span></Info>
    </div>}

    {isReplay && selected && <>
      <Card className="replay-main-card">
        <div className="replay-quote-head">
          <div><span className="research-eyebrow">{model?.asset_id}</span><h2 title={selected.close}>{Number(selected.close).toLocaleString('zh-CN', { maximumFractionDigits: 2 })}</h2><Badge tone="amber">{selected.state_name}</Badge></div>
          <Field label="交易日期"><select value={rows.some(row => row.business_date === date) ? date : ''} onChange={event => setDate(event.target.value)}>
            <option value="">最新交易日</option>{rows.map(row => <option key={row.business_date}>{row.business_date}</option>)}
          </select></Field>
        </div>
        <TimeChart labels={rows.map(row => row.business_date)} series={[{ name: '收盘', values: rows.map(row => Number(row.close)), color: PRIMARY_SERIES_COLOR }]} unit="" height={310}/>
        <div className="replay-state-strip" aria-label="每日市场状态">{rows.map(row => <span key={row.business_date} style={{ background: stateColors[row.state_id % stateColors.length] }} title={`${row.business_date} · ${row.state_name}`}/>)}</div>
        <div className="research-chart-foot"><div className="research-legend">{states.map(([stateId, name]) => <span key={stateId}><i style={{ background: stateColors[stateId % stateColors.length] }}/>{name}</span>)}</div><span>{selected.business_date}</span></div>
      </Card>
      <div className="stats-grid replay-stat-grid">
        <Stat label="当前状态" value={selected.state_name}/>
        {isFiniteNumber(selectedProbability) && <Stat label="状态归属概率" value={percent(selectedProbability)}/>}
        {streak !== undefined && <Stat label="连续交易日" value={streak}/>}
        <Stat label="区间状态切换" value={Math.max(0, changes.length - 1)}/>
      </div>
      <div className="two-col research-columns">
        {changes.length > 0 && <Card title="状态变化"><div className="table-scroll"><table className="data-table"><thead><tr><th>起始日期</th><th>市场状态</th></tr></thead><tbody>{changes.map(row => <tr key={row.business_date}><td>{row.business_date}</td><td><span className="research-state-label"><i style={{ background: stateColors[row.state_id % stateColors.length] }}/>{row.state_name}</span></td></tr>)}</tbody></table></div></Card>}
        {dayFeatures && Object.values(dayFeatures).some(isFiniteNumber) && <Card title="当日特征" action={<Info label="特征数值口径">后端返回的特征原值，未在浏览器重新估计。</Info>}>
          <dl className="key-values research-feature-values">{Object.entries(dayFeatures).filter(([, value]) => isFiniteNumber(value)).map(([key, value]) => <div key={key}><dt>{featureTitle(key)}</dt><dd>{value.toFixed(6)}</dd></div>)}</dl>
          {probabilities.some(isFiniteNumber) && <div className="replay-probabilities">{probabilities.map((value, index) => isFiniteNumber(value) && <span key={index}><i style={{ background: stateColors[index % stateColors.length] }}/>{states.find(([stateId]) => stateId === index)?.[1] || `状态 ${index}`} <b>{percent(value)}</b></span>)}</div>}
        </Card>}
      </div>
      {states.length > 0 && <Card title="区间表现" action={<Info label="区间表现口径">按市场状态汇总区间内的交易日；特征展示该状态完整观测的算术平均值。</Info>}>
        <div className="table-scroll"><table className="data-table"><thead><tr><th>市场状态</th><th className="numeric">交易日数</th>{profileKeys.map(key => <th key={key} className="numeric">{featureTitle(key)}</th>)}</tr></thead>
          <tbody>{states.map(([stateId, name]) => { const group = rows.filter(row => row.state_id === stateId); return <tr key={stateId}><td><span className="research-state-label"><i style={{ background: stateColors[stateId % stateColors.length] }}/>{name}</span></td><td className="numeric">{group.length}</td>{profileKeys.map(key => { const values = group.map(row => featureMap.get(row.business_date)?.[key]).filter(isFiniteNumber); return <td key={key} className="numeric">{values.length === group.length ? percent(values.reduce((sum, value) => sum + value, 0) / values.length) : null}</td>; })}</tr>; })}</tbody>
        </table></div>
      </Card>}
    </>}

    {isResearch && featureRows.length > 0 && featureKeys.length > 0 && <>
      <div className="research-feature-nav" role="group" aria-label="研究特征">{featureKeys.map(key => <button key={key} type="button" className={key === selectedKey ? 'selected' : ''} aria-pressed={key === selectedKey} onClick={() => setFeatureKey(key)}>{featureTitle(key)}</button>)}</div>
      {featureValues.length > 0 && <>
        <div className="stats-grid research-stat-grid">
          <Stat label="最新数值" value={formatFeature(featureValues.at(-1)!)} detail={featureSeries.at(-1)?.business_date}/>
          <Stat label="区间均值" value={formatFeature(featureValues.reduce((sum, value) => sum + value, 0) / featureValues.length)}/>
          <Stat label="区间最高" value={formatFeature(featureValues.reduce((maximum, value) => Math.max(maximum, value)))}/>
          <Stat label="区间最低" value={formatFeature(featureValues.reduce((minimum, value) => Math.min(minimum, value)))}/>
        </div>
        <Card title={featureTitle(selectedKey)} className="research-history-card" action={<div className="row-actions"><div className="research-view-switch" role="group" aria-label="特征展示方式"><button type="button" aria-pressed={view === 'chart'} className={view === 'chart' ? 'selected' : ''} onClick={() => setView('chart')}>走势</button><button type="button" aria-pressed={view === 'table'} className={view === 'table' ? 'selected' : ''} onClick={() => setView('table')}>明细</button></div><Button icon="download" variant="ghost" onClick={() => downloadCsv('市场研究-特征.csv', ['日期', '标的', '特征', '原始数值'], featureSeries.map(row => [row.business_date, model?.asset_id || '', featureTitle(selectedKey), row.features[selectedKey]]))}>导出</Button></div>}>
          {view === 'chart' ? <div className="card-inner"><TimeChart labels={featureSeries.map(row => row.business_date)} series={[{ name: featureTitle(selectedKey), values: featureValues.map(value => knownPercent ? value * 100 : value), color: PRIMARY_SERIES_COLOR }]} height={320} unit={knownPercent ? '%' : ''}/></div> : <div className="table-scroll research-detail-table"><table className="data-table"><thead><tr><th>交易日</th><th className="numeric">{featureTitle(selectedKey)}</th><th>市场状态</th></tr></thead><tbody>{featureSeries.map(row => <tr key={row.business_date}><td>{row.business_date}</td><td className="numeric">{formatFeature(row.features[selectedKey])}</td><td>{rows.find(state => state.business_date === row.business_date)?.state_name}</td></tr>)}</tbody></table></div>}
        </Card>
      </>}
    </>}

    {!isReplay && !isResearch && model && <Card title={model.asset_id} className="research-model-card">
      {(model.training_end || (model.replay_start && model.replay_end) || model.feature_version) && <dl className="key-values">{model.training_end && <div><dt>训练截止</dt><dd>{model.training_end}</dd></div>}{model.replay_start && model.replay_end && <div><dt>可回放区间</dt><dd>{model.replay_start} — {model.replay_end}</dd></div>}{model.feature_version && <div><dt>特征版本</dt><dd>{model.feature_version}</dd></div>}</dl>}
      {model.feature_names.length > 0 && <div className="research-model-features"><h4>模型特征</h4><div>{model.feature_names.map(key => <Badge key={key}>{featureTitle(key)}</Badge>)}</div></div>}
      <details className="research-model-details"><summary>模型标识</summary><code>{model.model_id}</code></details>
    </Card>}
  </div>;
}
