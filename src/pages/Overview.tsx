import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Info, PageHead } from '../components/ui';
import { Sparkline, TimeChart, CHART_COLORS } from '../components/charts';
import { Icon } from '../components/Icon';
import { downloadFile } from '../lib/files';
import { pages } from '../services/pagedApi';
import { requestJson } from '../services/httpClient';
import { DocDetail } from './MarketResearch';

const benchmarks = ['沪深300', '标普500', 'COMEX黄金期货', '美元指数DXY'];
const quickLinks = [
  { title: '历史行情', icon: 'chart', href: '#/data?tab=history', color: 'orange' },
  { title: '宏观指标', icon: 'globe', href: '#/data?tab=macro', color: 'olive' },
  { title: '经济日历', icon: 'calendar', href: '#/data?tab=calendar', color: 'gold' },
  { title: '资讯研报', icon: 'book', href: '#/data?tab=news', color: 'plum' },
];
type Price = { business_date: string; value: string; daily_return: number | null };
type Prediction = { business_date: string; asset_id: string; state_id: number; state_name: string; probabilities: number[] };
type Document = { record_id: string; title: string; business_date: string; date_known: number; metric: string };
const documentTypes: Record<string, string> = { news: '新闻', social: '讨论', markdown: '资金摘要', wechat_index: '公众号', pdf: '研报' };
const validPrice = (row: Price) => row && typeof row.business_date === 'string' && row.value != null && String(row.value).trim() !== '' && Number.isFinite(Number(row.value));
const formatted = (value: string | number) => Number(value).toLocaleString('zh-CN', { maximumFractionDigits: 2 });
const changeLabel = (value: number) => `${value > 0 ? '+' : ''}${(value * 100).toFixed(2)}%`;

export default function Overview(): React.ReactElement {
  const [revision, setRevision] = useState(0);
  const [quotes, setQuotes] = useState<Record<string, Price[]>>({});
  const [history, setHistory] = useState<Prediction[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, setPending] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [period, setPeriod] = useState(90);
  useEffect(() => {
    const c = new AbortController();
    setQuotes({}); setHistory([]); setDocuments([]); setErrors([]); setPending(benchmarks.length + 2);
    const completed = () => { if (!c.signal.aborted) setPending(v => Math.max(0, v - 1)); };
    const failed = (name: string) => { if (!c.signal.aborted) setErrors(previous => [...previous, name]); };
    async function load(name: string) {
      const latest = await requestJson('/market-api/v1', 'market/latest?' + new URLSearchParams({ asset_id: name, dataset: 'main' }), { signal: c.signal });
      if (latest.status !== 200) throw new Error('行情读取失败');
      const end = (latest.body as { business_date?: string } | null)?.business_date;
      if (!end) return [];
      const start = new Date(end + 'T00:00:00Z');
      if (!Number.isFinite(start.getTime())) throw new Error('行情日期无效');
      start.setUTCDate(start.getUTCDate() - 90);
      const rows = await pages<Price>('market-api/v1/market/daily-return', c.signal, { asset_id: name, dataset: 'main', from: start.toISOString().slice(0, 10), to: end });
      return rows.filter(validPrice).sort((a, b) => a.business_date.localeCompare(b.business_date));
    }
    for (const name of benchmarks) {
      load(name).then(rows => { if (!c.signal.aborted) setQuotes(old => ({ ...old, [name]: rows })); }).catch(() => failed(name)).finally(completed);
    }
    async function loadHistory() {
      const [models, sessions] = await Promise.all([
        pages<{ model_id: string; asset_id: string }>('api/v1/models', c.signal),
        pages<{ model_id: string; session_id: string; status: string }>('api/v1/stream/sessions', c.signal),
      ]);
      const session = sessions.find(s => s.status === 'COMPLETED' && models.some(m => m.asset_id === '沪深300' && m.model_id === s.model_id));
      return session ? pages<Prediction>('api/v1/regimes', c.signal, { session_id: session.session_id }) : [];
    }
    loadHistory().then(rows => {
      if (!c.signal.aborted) setHistory(rows.filter(row => row?.business_date && row.state_name && Number.isInteger(row.state_id) && row.state_id >= 0).sort((a, b) => a.business_date.localeCompare(b.business_date)));
    }).catch(() => failed('市场状态')).finally(completed);
    requestJson('/market-api/v1', 'documents?' + new URLSearchParams({ dataset: 'main', limit: '6', cursor: '' }), { signal: c.signal }).then(response => {
      const body = response.body as { items?: Document[] };
      if (response.status !== 200 || !Array.isArray(body?.items)) throw new Error('资讯读取失败');
      if (!c.signal.aborted) setDocuments(body.items.filter(row => row.record_id && row.title));
    }).catch(() => failed('资讯研报')).finally(completed);
    return () => c.abort();
  }, [revision]);
  const available = benchmarks.filter(name => quotes[name]?.length);
  const chart = useMemo(() => {
    const comparable = benchmarks.filter(name => quotes[name]?.length).map((name, i) => ({ name, color: CHART_COLORS[i], byDay: new Map(quotes[name].map(row => [row.business_date, Number(row.value)])) }));
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
  const exportReport = () => downloadFile('FinTech-市场快照.json', JSON.stringify({ quotes: Object.fromEntries(available.map(name => [name, quotes[name].at(-1)])), ...(latest ? { replay: latest } : {}), ...(documents.length ? { documents } : {}) }, null, 2), 'application/json');
  const timestamp = available.map(name => quotes[name].at(-1)!.business_date).sort().at(-1);
  return <>
    <div className="overview-heading"><div><PageHead title="市场总览"/></div><div className="head-actions">{hasData && <Button icon="download" onClick={exportReport}>导出快照</Button>}<a className="btn btn-primary" href="#/data?tab=history">查看行情<Icon name="arrow" size={16}/></a></div></div>
    <nav className="market-shortcuts" aria-label="市场快捷入口">{quickLinks.map(link => <a key={link.title} href={link.href}><span className={`shortcut-icon shortcut-${link.color}`}><Icon name={link.icon} size={23}/></span><strong>{link.title}</strong><Icon name="arrow" size={17}/></a>)}</nav>
    {pending > 0 && <div className="load-track" role="status" aria-label="正在获取市场数据"><span/></div>}
    {errors.length > 0 && <div className="load-error" role="status"><Icon name="info" size={16}/><span>{hasData ? '部分数据暂时无法加载' : '数据暂时无法加载'}</span><Info label="查看未加载的数据">{Array.from(new Set(errors)).join('、')}</Info><Button variant="ghost" icon="refresh" onClick={() => setRevision(v => v + 1)} busy={pending > 0}>重试</Button></div>}
    {available.length > 0 && <section className="benchmark-section" aria-label="主要市场指数">
      <div className="section-heading"><h2>主要市场</h2>{timestamp && <time dateTime={timestamp}>{timestamp}</time>}</div>
      <div className="benchmark-strip">{available.map(name => {
        const rows = quotes[name], last = rows.at(-1)!;
        const hasChange = typeof last.daily_return === 'number' && Number.isFinite(last.daily_return);
        return <a className="benchmark" href={`#/data?tab=history&asset=${encodeURIComponent(name)}`} key={name}>
          <span className="benchmark-name">{name}<Icon name="chevron" size={14}/></span><div className="benchmark-value"><strong>{formatted(last.value)}</strong>{rows.length > 1 && <Sparkline values={rows.map(row => Number(row.value))} positive={hasChange ? last.daily_return! >= 0 : Number(last.value) >= Number(rows[0].value)}/>}</div>
          <div className="benchmark-meta">{hasChange && <span className={last.daily_return! > 0 ? 'positive' : last.daily_return! < 0 ? 'negative' : ''}>{changeLabel(last.daily_return!)}</span>}<time dateTime={last.business_date}>{last.business_date}</time></div>
        </a>;
      })}</div>
    </section>}
    {(chart.series.length > 0 || latest) && <div className={`overview-grid ${!chart.series.length || !latest ? 'overview-grid-single' : ''}`}>
      {chart.series.length > 0 && <Card title="市场表现" subtitle="以所选区间首个共同交易日为基准，比较各资产的累计收益率。" className="performance-card" action={<div className="segments" aria-label="走势区间">{[{ value: 30, label: '1个月' }, { value: 90, label: '3个月' }].map(p => <button key={p.value} type="button" className={period === p.value ? 'active' : ''} aria-pressed={period === p.value} onClick={() => setPeriod(p.value)}>{p.label}</button>)}</div>}>
        <div className="card-inner"><div className="chart-legend">{chart.series.map(series => <span key={series.name}><i style={{ background: series.color }}/>{series.name}</span>)}</div><TimeChart labels={chart.days} series={chart.series} height={300}/></div>
      </Card>}
      {latest && <Card title="沪深300 市场状态" className="market-state-card" action={<Info label="市场状态来源">最近一次已完成回放的模型输出，{latest.business_date}。</Info>}><div className="card-inner"><time dateTime={latest.business_date}>{latest.business_date}</time><h2 className="current-state">{latest.state_name}</h2>{hasProbability && <div className="state-confidence"><span>状态归属概率</span><strong>{(probability * 100).toFixed(1)}<small>%</small></strong><div className="probability-track"><i style={{ width: `${Math.max(0, Math.min(100, probability * 100))}%` }}/></div></div>}<div className="state-timeline" aria-label="历史状态变化">{history.map(row => <span key={row.business_date} title={`${row.business_date} · ${row.state_name}`} style={{ background: CHART_COLORS[row.state_id % CHART_COLORS.length] }}/>)}</div><a className="text-link" href="#/regimes">查看回放<Icon name="arrow" size={16}/></a></div></Card>}
    </div>}
    {documents.length > 0 && <section className="home-news"><div className="section-heading"><h2>最新资讯</h2><a className="text-link" href="#/data?tab=news">全部资讯<Icon name="arrow" size={15}/></a></div><div className="home-news-grid">{documents.map((doc, i) => <button type="button" key={doc.record_id} className={i === 0 ? 'news-item news-item-lead' : 'news-item'} onClick={() => setSelectedDocument(doc.record_id)}><div className="news-meta"><span>{documentTypes[doc.metric] || doc.metric}</span>{!!doc.date_known && <time dateTime={doc.business_date}>{doc.business_date}</time>}</div><h3>{doc.title}</h3><Icon name="arrow" size={18}/></button>)}</div></section>}
    <section className="research-directory"><div className="section-heading"><h2>研究与工具</h2></div><div className="directory-grid">
      <a href="#/features" className="directory-feature"><span className="directory-icon"><Icon name="activity" size={28}/></span><strong>市场研究</strong><span className="directory-action">查看特征<Icon name="arrow" size={16}/></span></a>
      <a href="#/regimes" className="directory-feature"><span className="directory-icon"><Icon name="play" size={28}/></span><strong>历史回放</strong><span className="directory-action">打开回放<Icon name="arrow" size={16}/></span></a>
      <div className="directory-tools"><a href="#/quality"><Icon name="database" size={19}/><span>数据管理</span><Icon name="chevron" size={15}/></a><a href="#/lineage"><Icon name="branch" size={19}/><span>数据溯源</span><Icon name="chevron" size={15}/></a><a href="#/api"><Icon name="code" size={19}/><span>API 访问</span><Icon name="chevron" size={15}/></a></div>
    </div></section>
    {selectedDocument && <DocDetail id={selectedDocument} onClose={() => setSelectedDocument('')}/>}
  </>;
}
