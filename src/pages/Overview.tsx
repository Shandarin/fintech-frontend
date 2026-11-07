import React, { useEffect, useMemo, useState } from 'react';
import { Button, Info, Modal, PageHead } from '../components/ui';
import { Sparkline, TimeChart, CHART_COLORS } from '../components/charts';
import { Icon } from '../components/Icon';
import { downloadFile } from '../lib/files';
import { pages } from '../services/pagedApi';
import { requestJson } from '../services/httpClient';
import { DocDetail } from '../features/documents/Documents';
import { numberZh, signedPercent } from '../lib/format';
import { OVERVIEW_DOCUMENT_TYPE_LABELS } from '../features/documents/model';
import { hasQuoteValue } from '../features/market/quotes';
import { MARKET_SHORTCUTS } from '../config/navigation';
import { useApp } from '../state/AppContext';
import { DashboardWidget } from '../features/dashboard/DashboardWidget';
import { addDashboardWidget, DASHBOARD_WIDGETS, DEFAULT_DASHBOARD_WIDGETS, moveDashboardWidget, removeDashboardWidget, sanitizeDashboardWidgets, shiftDashboardWidget, type DashboardWidgetId } from '../features/dashboard/widgets';

const benchmarks = ['沪深300', '标普500', 'COMEX黄金期货', '美元指数DXY'];
type Price = { business_date: string; value: string; daily_return: number | null };
type Prediction = { business_date: string; asset_id: string; state_id: number; state_name: string; probabilities: number[] };
type Document = { record_id: string; title: string; business_date: string; date_known: number; metric: string };
const validPrice = (row: Price) => row && typeof row.business_date === 'string' && hasQuoteValue(row);

export default function Overview(): React.ReactElement {
  const { state, update, notify } = useApp();
  const widgets = useMemo(() => sanitizeDashboardWidgets(state.widgets), [state.widgets]);
  const [editing, setEditing] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [revision, setRevision] = useState(0);
  const [quotes, setQuotes] = useState<Record<string, Price[]>>({});
  const [history, setHistory] = useState<Prediction[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, setPending] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [period, setPeriod] = useState(90);
  const wantQuotes = widgets.includes('benchmarks') || widgets.includes('performance');
  const wantHistory = widgets.includes('regime');
  const wantDocuments = widgets.includes('documents');

  const setWidgets = (fn: (current: readonly string[]) => DashboardWidgetId[]) => {
    update(s => ({ ...s, widgets: fn(s.widgets) }));
  };
  const addWidget = (id: DashboardWidgetId) => { setWidgets(current => addDashboardWidget(current, id)); notify('已添加卡片'); };
  const removeWidget = (id: DashboardWidgetId) => { setWidgets(current => removeDashboardWidget(current, id)); notify('已移除卡片，可重新添加', 'info'); };
  const shiftWidget = (id: DashboardWidgetId, direction: -1 | 1) => setWidgets(current => shiftDashboardWidget(current, id, direction));
  const dropWidget = (source: DashboardWidgetId, target: DashboardWidgetId) => setWidgets(current => moveDashboardWidget(current, source, target));

  useEffect(() => {
    const controller = new AbortController();
    setQuotes({}); setHistory([]); setDocuments([]); setErrors([]);
    const requests = (wantQuotes ? benchmarks.length : 0) + Number(wantHistory) + Number(wantDocuments);
    setPending(requests);
    const complete = () => { if (!controller.signal.aborted) setPending(value => Math.max(0, value - 1)); };
    const fail = (name: string) => { if (!controller.signal.aborted) setErrors(previous => [...previous, name]); };
    async function loadQuote(name: string): Promise<Price[]> {
      const latest = await requestJson('/market-api/v1', 'market/latest?' + new URLSearchParams({ asset_id: name, dataset: 'main' }), { signal: controller.signal });
      if (latest.status !== 200) throw new Error('行情读取失败');
      const end = (latest.body as { business_date?: string } | null)?.business_date;
      if (!end) return [];
      const start = new Date(end + 'T00:00:00Z');
      if (!Number.isFinite(start.getTime())) throw new Error('行情日期无效');
      start.setUTCDate(start.getUTCDate() - 90);
      const rows = await pages<Price>('market-api/v1/market/daily-return', controller.signal, { asset_id: name, dataset: 'main', from: start.toISOString().slice(0, 10), to: end });
      return rows.filter(validPrice).sort((a, b) => a.business_date.localeCompare(b.business_date));
    }
    if (wantQuotes) for (const name of benchmarks) {
      loadQuote(name).then(rows => { if (!controller.signal.aborted) setQuotes(previous => ({ ...previous, [name]: rows })); }).catch(() => fail(name)).finally(complete);
    }
    async function loadHistory(): Promise<Prediction[]> {
      const [models, sessions] = await Promise.all([
        pages<{ model_id: string; asset_id: string }>('api/v1/models', controller.signal),
        pages<{ model_id: string; session_id: string; status: string }>('api/v1/stream/sessions', controller.signal),
      ]);
      const session = sessions.find(row => row.status === 'COMPLETED' && models.some(model => model.asset_id === '沪深300' && model.model_id === row.model_id));
      return session ? pages<Prediction>('api/v1/regimes', controller.signal, { session_id: session.session_id }) : [];
    }
    if (wantHistory) loadHistory().then(rows => {
      if (!controller.signal.aborted) setHistory(rows.filter(row => row?.business_date && row.state_name && Number.isInteger(row.state_id) && row.state_id >= 0).sort((a, b) => a.business_date.localeCompare(b.business_date)));
    }).catch(() => fail('市场状态')).finally(complete);
    if (wantDocuments) requestJson('/market-api/v1', 'documents?' + new URLSearchParams({ dataset: 'main', limit: '6', cursor: '' }), { signal: controller.signal }).then(response => {
      const body = response.body as { items?: Document[] };
      if (response.status !== 200 || !Array.isArray(body?.items)) throw new Error('资讯读取失败');
      if (!controller.signal.aborted) setDocuments(body.items.filter(row => row.record_id && row.title));
    }).catch(() => fail('资讯研报')).finally(complete);
    return () => controller.abort();
  }, [revision, wantQuotes, wantHistory, wantDocuments]);

  const available = benchmarks.filter(name => quotes[name]?.length);
  const chart = useMemo(() => {
    const comparable = available.map((name, index) => ({ name, color: CHART_COLORS[index % CHART_COLORS.length], byDay: new Map(quotes[name].map(row => [row.business_date, Number(row.value)])) }));
    const allDays = comparable.length ? [...comparable[0].byDay.keys()].filter(day => comparable.every(series => series.byDay.has(day))).sort() : [];
    const end = allDays.at(-1);
    const start = end ? new Date(end + 'T00:00:00Z') : undefined;
    start?.setUTCDate(start.getUTCDate() - period);
    const days = start ? allDays.filter(day => day >= start.toISOString().slice(0, 10)) : [];
    const series = days.length ? comparable.filter(series => series.byDay.get(days[0]) !== 0).map(series => ({ name: series.name, color: series.color, values: days.map(day => (series.byDay.get(day)! / series.byDay.get(days[0])! - 1) * 100) })) : [];
    return { days, series };
  }, [quotes, period]);
  const latest = history.at(-1);
  const probability = latest?.probabilities?.[latest.state_id];
  const hasProbability = typeof probability === 'number' && Number.isFinite(probability) && probability >= 0 && probability <= 1;
  const hasData = available.length > 0 || history.length > 0 || documents.length > 0;
  const exportReport = () => downloadFile('FinTech-市场快照.json', JSON.stringify({ ...(available.length ? { quotes: Object.fromEntries(available.map(name => [name, quotes[name].at(-1)])) } : {}), ...(latest ? { replay: latest } : {}), ...(documents.length ? { documents } : {}) }, null, 2), 'application/json');
  const timestamp = available.map(name => quotes[name].at(-1)!.business_date).sort().at(-1);
  const cardVisible: Record<DashboardWidgetId, boolean> = {
    benchmarks: available.length > 0, performance: chart.series.length > 0, regime: !!latest,
    documents: documents.length > 0, shortcuts: true, tools: true,
  };
  const visible = widgets.filter(id => cardVisible[id]);
  const frameProps = (id: DashboardWidgetId) => ({ id, editing, position: widgets.indexOf(id), count: widgets.length, onRemove: removeWidget, onMove: shiftWidget, onDropWidget: dropWidget });
  return <>
    <div className="overview-heading dashboard-heading">
      <PageHead title="市场总览"/>
      <div className="head-actions">
        {hasData && <Button icon="download" onClick={exportReport}>导出快照</Button>}
        <Button variant={editing ? 'primary' : 'neutral'} icon={editing ? 'check' : 'edit'} onClick={() => setEditing(value => !value)} aria-expanded={editing} aria-controls="dashboard-editor">{editing ? '完成编辑' : '自定义看板'}</Button>
      </div>
    </div>
    {editing && <section className="dashboard-editor" id="dashboard-editor" aria-label="管理看板卡片">
      <div className="dashboard-editor-head"><strong>添加或移除卡片</strong><button type="button" className="dashboard-reset" onClick={() => setResetOpen(true)}>恢复默认布局</button></div>
      <div className="dashboard-picker">{DASHBOARD_WIDGETS.map(definition => {
        const active = widgets.includes(definition.id);
        return <button type="button" key={definition.id} className={`dashboard-picker-item ${active ? 'is-added' : ''}`} aria-pressed={active} aria-label={`${active ? '移除' : '添加'}${definition.title}卡片`} onClick={() => active ? removeWidget(definition.id) : addWidget(definition.id)}><Icon name={definition.icon} size={16}/><span>{definition.title}</span><Icon name={active ? 'check' : 'plus'} size={15}/></button>;
      })}</div>
    </section>}
    {pending > 0 && <div className="load-track dashboard-load-track" role="status" aria-label="正在获取看板数据"><span/></div>}
    {errors.length > 0 && <div className="load-error" role="status"><Icon name="info" size={16}/><span>{hasData ? '部分数据暂时无法加载' : '数据暂时无法加载'}</span><Info label="查看未加载的数据">{Array.from(new Set(errors)).join('、')}</Info><Button variant="ghost" icon="refresh" onClick={() => setRevision(value => value + 1)} busy={pending > 0}>重试</Button></div>}
    <div className="dashboard-grid" aria-label="我的市场看板">
      {widgets.map(id => {
        if (!cardVisible[id]) return null;
        switch (id) {
          case 'benchmarks': return <DashboardWidget key={id} {...frameProps(id)} action={timestamp && <time className="dashboard-asof" dateTime={timestamp}>{timestamp}</time>}>
            <div className="benchmark-strip">{available.map(name => {
              const rows = quotes[name], last = rows.at(-1)!;
              const hasChange = typeof last.daily_return === 'number' && Number.isFinite(last.daily_return);
              return <a className="benchmark" href={`#/data?tab=history&asset=${encodeURIComponent(name)}`} key={name}>
                <span className="benchmark-name">{name}<Icon name="chevron" size={14}/></span><div className="benchmark-value"><strong>{numberZh(last.value)}</strong>{rows.length > 1 && <Sparkline values={rows.map(row => Number(row.value))} positive={hasChange ? last.daily_return! >= 0 : Number(last.value) >= Number(rows[0].value)}/>}</div>
                <div className="benchmark-meta">{hasChange && <span className={last.daily_return! > 0 ? 'positive' : last.daily_return! < 0 ? 'negative' : ''}>{signedPercent(last.daily_return!)}</span>}<time dateTime={last.business_date}>{last.business_date}</time></div>
              </a>;
            })}</div>
          </DashboardWidget>;
          case 'performance': return <DashboardWidget key={id} {...frameProps(id)} action={<div className="segments" aria-label="走势区间">{[{ value: 30, label: '1个月' }, { value: 90, label: '3个月' }].map(p => <button key={p.value} type="button" className={period === p.value ? 'active' : ''} aria-pressed={period === p.value} onClick={() => setPeriod(p.value)}>{p.label}</button>)}</div>}>
            <div className="card-inner"><div className="dashboard-chart-title"><Info label="市场表现计算口径">以区间首个共同交易日为基准，比较各资产的累计收益率。</Info><div className="chart-legend">{chart.series.map(series => <span key={series.name}><i style={{ background: series.color }}/>{series.name}</span>)}</div></div><TimeChart labels={chart.days} series={chart.series} height={232}/></div>
          </DashboardWidget>;
          case 'regime': return latest && <DashboardWidget key={id} {...frameProps(id)} action={<Info label="市场状态来源">最近一次已完成回放的模型输出，{latest.business_date}。</Info>}>
            <div className="card-inner dashboard-state"><time dateTime={latest.business_date}>{latest.business_date}</time><h2 className="current-state">{latest.state_name}</h2>{hasProbability && <div className="state-confidence"><span>状态归属概率</span><strong>{(probability * 100).toFixed(1)}<small>%</small></strong><div className="probability-track"><i style={{ width: `${Math.max(0, Math.min(100, probability * 100))}%` }}/></div></div>}<div className="state-timeline" aria-label="历史状态变化">{history.map((row, index) => <span key={`${row.business_date}-${index}`} title={`${row.business_date} · ${row.state_name}`} style={{ background: CHART_COLORS[row.state_id % CHART_COLORS.length] }}/>)}</div><a className="text-link" href="#/regimes">查看回放<Icon name="arrow" size={16}/></a></div>
          </DashboardWidget>;
          case 'documents': return <DashboardWidget key={id} {...frameProps(id)} action={<a className="dashboard-inline-link" href="#/data?tab=news">全部资讯<Icon name="arrow" size={14}/></a>}>
            <div className="dashboard-news">{documents.map(doc => <button type="button" key={doc.record_id} className="dashboard-news-row" onClick={() => setSelectedDocument(doc.record_id)}><span className="dashboard-news-title">{doc.title}</span><span className="dashboard-news-meta">{OVERVIEW_DOCUMENT_TYPE_LABELS[doc.metric] || doc.metric}{!!doc.date_known && <time dateTime={doc.business_date}>{doc.business_date}</time>}</span></button>)}</div>
          </DashboardWidget>;
          case 'shortcuts': return <DashboardWidget key={id} {...frameProps(id)}><nav className="dashboard-quick-links" aria-label="市场快捷入口">{MARKET_SHORTCUTS.map(link => <a key={link.title} href={link.href}><span className={`shortcut-icon shortcut-${link.color}`}><Icon name={link.icon} size={17}/></span><span>{link.title}</span><Icon name="chevron" size={14}/></a>)}</nav></DashboardWidget>;
          case 'tools': return <DashboardWidget key={id} {...frameProps(id)}><nav className="dashboard-tools" aria-label="研究和数据工具"><a href="#/features"><Icon name="activity" size={17}/>市场研究</a><a href="#/regimes"><Icon name="play" size={17}/>历史回放</a><a href="#/quality"><Icon name="database" size={17}/>数据管理</a><a href="#/lineage"><Icon name="branch" size={17}/>数据溯源</a><a href="#/api"><Icon name="code" size={17}/>API 访问</a></nav></DashboardWidget>;
          default: return null;
        }
      })}
    </div>
    {pending === 0 && visible.length === 0 && <div className="dashboard-empty"><Icon name="grid" size={22}/><strong>{widgets.length ? '当前没有可展示的数据' : '看板尚未添加卡片'}</strong><button type="button" onClick={() => setEditing(true)}>管理卡片<Icon name="arrow" size={14}/></button></div>}
    {resetOpen && <Modal title="恢复默认看板？" onClose={() => setResetOpen(false)} footer={<><Button onClick={() => setResetOpen(false)}>取消</Button><Button variant="primary" onClick={() => { setWidgets(() => [...DEFAULT_DASHBOARD_WIDGETS]); setResetOpen(false); notify('已恢复默认卡片布局'); }}>恢复默认</Button></>}><p>当前的卡片选择与排序将替换为默认布局。不会修改任何市场数据。</p></Modal>}
    {selectedDocument && <DocDetail id={selectedDocument} onClose={() => setSelectedDocument('')}/>}
  </>;
}
