import { RetryNotice, LoadingStatus } from '../components/RequestStatus';
import React, { useEffect, useMemo, useState } from 'react';
import { AssetNews } from '../features/documents/Documents';
import { hasQuoteValue, normaliseQuoteRows } from '../features/market/quotes';
import { Button, Card, Field, IconButton } from '../components/ui';
import { Icon } from '../components/Icon';
import MarketChart, { type Quote } from '../components/MarketChart';
import { pages } from '../services/pagedApi';
import { downloadCsv } from '../lib/files';
import { useApp } from '../state/AppContext';
import { normaliseAssets, type AssetRow, type MarketAsset } from '../features/market/assets';

type Session = { session_id: string; start_date: string; end_date: string; result_count: number; model_id: string };
type StateRow = { business_date: string; state_name: string; state_id: number };

const classes: Record<string, string> = { 中国权益: 'equity', 全球权益: 'equity', 全球债券: 'bond', 外汇: 'fx', 大宗商品: 'commodity' };
const assetFromLocation = () => new URLSearchParams(location.hash.split('?')[1] || '').get('asset') || '';
const hasValue = hasQuoteValue;

export default function HistoricalQuotes(): React.ReactElement {
  const app = useApp();
  const [catalog, setCatalog] = useState<MarketAsset[]>([]);
  const [asset, setAsset] = useState(assetFromLocation);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('');
  const [watchedOnly, setWatchedOnly] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [quoteResult, setQuoteResult] = useState<{ asset: string; rows: Quote[] }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [session, setSession] = useState('');
  const [states, setStates] = useState<StateRow[]>([]);
  const [overlayError, setOverlayError] = useState('');
  const [overlayReload, setOverlayReload] = useState(0);
  const assets = useMemo(() => catalog.filter(item => !app.user ||
    app.user.allowedClasses.some(kind => kind === classes[item.group]) ||
    (item.group === '另类' && app.user.role !== 'viewer')), [catalog, app.user]);
  const current = asset ? assets.find(item => item.id === asset) : assets.find(item => item.id === '沪深300') || assets[0];
  const id = current?.id;
  const metric = current?.metric;
  const groups = Array.from(new Set(assets.map(item => item.group).filter(Boolean)));
  const filtered = assets.filter(item => (!group || item.group === group) &&
    (!watchedOnly || app.state.watchlist.includes(item.id)) && item.id.toLowerCase().includes(query.trim().toLowerCase()));
  const rows = quoteResult && quoteResult.asset === id ? quoteResult.rows : [];
  const last = [...rows].reverse().find(hasValue);
  const dailyReturn = last?.daily_return;
  const change = dailyReturn != null && Number.isFinite(dailyReturn) ? dailyReturn * 100 : null;
  const label = metric === 'yield' ? '债券收益率' : '收盘价';

  useEffect(() => {
    const sync = () => { setAsset(assetFromLocation()); setSession(''); };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setCatalogLoading(true);
    setCatalogError('');
    pages<AssetRow>('market-api/v1/assets', controller.signal).then(items => {
      const next = normaliseAssets(items);
      if (!controller.signal.aborted) { setCatalog(next); setGroup(value => next.some(item => item.group === value) ? value : ''); }
    }).catch(() => {
      if (!controller.signal.aborted) { setCatalog([]); setCatalogError('资产目录暂时无法加载'); }
    }).finally(() => { if (!controller.signal.aborted) setCatalogLoading(false); });
    return () => controller.abort();
  }, [reload]);

  useEffect(() => {
    if (!id || !metric) { setLoading(false); setError(''); setQuoteResult(undefined); return; }
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setQuoteResult(undefined);
    const path = metric === 'yield' ? 'market' : 'market/daily-return';
    pages<Quote>('market-api/v1/' + path, controller.signal, { dataset: 'main', asset_id: id, metric }).then(data => {
      if (!controller.signal.aborted) setQuoteResult({ asset: id, rows: normaliseQuoteRows(data) });
    }).catch(() => { if (!controller.signal.aborted) setError('行情暂时无法加载'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id, metric, reload]);

  useEffect(() => {
    setSessions([]);
    setStates([]);
    setOverlayError('');
    if (id !== '沪深300') return;
    const controller = new AbortController();
    Promise.all([
      pages<Session>('api/v1/stream/sessions', controller.signal),
      pages<{ model_id: string; asset_id: string }>('api/v1/models', controller.signal),
    ]).then(([available, models]) => {
      if (controller.signal.aborted) return;
      if (models.some(model => !model || typeof model.model_id !== 'string' || typeof model.asset_id !== 'string')) throw new Error('Invalid model metadata');
      const eligible = available.filter(item => {
        if (!item || typeof item.result_count !== 'number') throw new Error('Invalid replay metadata');
        return item.result_count > 0 && models.some(model => model.asset_id === id && model.model_id === item.model_id);
      });
      if (eligible.some(item => typeof item.session_id !== 'string' || typeof item.start_date !== 'string' || typeof item.end_date !== 'string')) throw new Error('Invalid replay metadata');
      setSessions(eligible.sort((a, b) => b.end_date.localeCompare(a.end_date)));
    }).catch(() => { if (!controller.signal.aborted) setOverlayError('回放状态暂时无法加载'); });
    return () => controller.abort();
  }, [id, overlayReload]);

  useEffect(() => {
    setStates([]);
    if (!session || id !== '沪深300') return;
    const controller = new AbortController();
    setOverlayError('');
    pages<StateRow>('api/v1/regimes', controller.signal, { session_id: session }).then(data => {
      if (data.some(row => !row || typeof row.business_date !== 'string' || typeof row.state_name !== 'string' ||
        !Number.isInteger(row.state_id) || row.state_id < 0)) throw new Error('Invalid replay state');
      if (!controller.signal.aborted) setStates(data);
    }).catch(() => { if (!controller.signal.aborted) setOverlayError('回放状态暂时无法加载'); });
    return () => controller.abort();
  }, [session, id, overlayReload]);

  function selectAsset(next: string) {
    setAsset(next);
    setSession('');
    const parameters = new URLSearchParams(location.hash.split('?')[1] || '');
    parameters.set('tab', 'history');
    parameters.set('asset', next);
    history.replaceState(null, '', '#/data?' + parameters);
  }

  function toggleWatch() {
    if (!id) return;
    app.update(state => ({ ...state, watchlist: state.watchlist.includes(id) ? state.watchlist.filter(value => value !== id) : [...state.watchlist, id] }), undefined, 'self');
  }

  return <>
    {catalogError && <RetryNotice message={catalogError} onRetry={() => setReload(value => value + 1)}/>}
    {catalogLoading && !assets.length && <LoadingStatus message="正在加载"/>}
    {!!assets.length && <div className="market-layout">
      <aside className="market-asset-panel" aria-label="资产列表">
        <div className="market-list-switch" role="group" aria-label="资产范围">
          <button type="button" className={!watchedOnly ? 'selected' : ''} aria-pressed={!watchedOnly} onClick={() => setWatchedOnly(false)}>全部</button>
          <button type="button" className={watchedOnly ? 'selected' : ''} aria-pressed={watchedOnly} onClick={() => setWatchedOnly(true)}>自选</button>
        </div>
        <label className="market-asset-search"><Icon name="search" size={17} /><input type="search" aria-label="搜索资产" placeholder="搜索资产" value={query} onChange={event => setQuery(event.target.value)} /></label>
        {groups.length > 1 && <select className="market-group-select" aria-label="资产类别" value={group} onChange={event => setGroup(event.target.value)}>
          <option value="">全部类别</option>{groups.map(name => <option key={name} value={name}>{name}</option>)}
        </select>}
        <div className="market-asset-list">
          {Array.from(new Set(filtered.map(item => item.group))).map(name => <section key={name}>
            {!group && name && <h2 className="market-asset-group">{name}</h2>}
            {filtered.filter(item => item.group === name).map(item => <button type="button" key={item.id} className={`market-asset-item ${id === item.id ? 'selected' : ''}`} aria-current={id === item.id ? 'true' : undefined} onClick={() => selectAsset(item.id)}>
              <span>{item.id}</span>{id === item.id && <Icon name="chevron" size={15} />}
            </button>)}
          </section>)}
        </div>
      </aside>
      <div className="market-detail">
        {error && <RetryNotice message={error} onRetry={() => setReload(value => value + 1)}/>}
        {loading && <LoadingStatus message="正在加载行情"/>}
        {last && id && <Card className="market-quote-card">
          <div className="quote-heading">
            <div>
              <div className="quote-title-row"><h2>{id}</h2><IconButton icon="star" label={app.state.watchlist.includes(id) ? '移出自选' : '加入自选'} className={app.state.watchlist.includes(id) ? 'market-star-selected' : ''} aria-pressed={app.state.watchlist.includes(id)} onClick={toggleWatch} /></div>
              <div className="quote-latest"><strong>{Number(last.value).toLocaleString('zh-CN', { maximumFractionDigits: metric === 'yield' || current?.group === '外汇' ? 4 : 2 })}{metric === 'yield' && <small>%</small>}</strong>
                {change !== null && <span className={`quote-change ${change > 0 ? 'positive' : change < 0 ? 'negative' : ''}`}>{change > 0 ? '+' : ''}{change.toFixed(2)}%</span>}
              </div>
              <div className="quote-asof">{label} · <time dateTime={last.business_date}>{last.business_date}</time></div>
            </div>
            <div className="quote-tools"><div className="quote-actions"><Button icon="download" onClick={() => downloadCsv(`${id}-历史行情.csv`, ['日期', label, '日收益率'], rows.map(row => [row.business_date, row.value, row.daily_return]))}>导出全部</Button><Button icon="refresh" busy={catalogLoading || loading} onClick={() => setReload(value => value + 1)}>刷新</Button></div>
          {sessions.length > 0 && <div className="quote-overlay-control"><Field label="状态叠加"><select value={session} onChange={event => setSession(event.target.value)}><option value="">不叠加</option>{sessions.map((item, index) => <option key={item.session_id} value={item.session_id}>{item.start_date} 至 {item.end_date}{sessions.some((other, otherIndex) => otherIndex !== index && other.start_date === item.start_date && other.end_date === item.end_date) ? ` · ${index + 1}` : ''}</option>)}</select></Field></div>}
            </div>
          </div>
          {overlayError && <div className="quote-overlay-feedback"><RetryNotice message={overlayError} onRetry={() => setOverlayReload(value => value + 1)}/></div>}
          <div className="market-chart-wrap"><MarketChart key={id} asset={id} rows={rows} states={states} label={label} /></div>
        </Card>}
        {id && <AssetNews key={id} asset={id} />}
      </div>
    </div>}
  </>;
}
