import React, { useEffect, useRef, useState } from 'react';
import RecordSource from '../components/RecordSource';
import { Badge, Button, Card, Field, Info, Modal, Notice } from '../components/ui';
import { Icon } from '../components/Icon';
import MarketChart, { type Quote } from '../components/MarketChart';
import { pages } from '../services/pagedApi';
import { requestJson } from '../services/httpClient';
import { downloadCsv } from '../lib/files';
import './market-pages.css';

type Indicator = { id: string; column_name: string; unit: string };
const turnover: Indicator = { id: 'commodity.turnover', column_name: '商品期货日成交额', unit: '万亿元' };
const noStates: never[] = [];
const hasValue = (row: Quote) => row.value != null && String(row.value).trim() !== '' && Number.isFinite(Number(row.value));
const seriesName = (indicator: Indicator) => indicator.column_name || indicator.id;

export function normaliseQuoteRows(rows: Quote[]): Quote[] {
  return rows.map(row => {
    if (!row || typeof row !== 'object' || typeof row.business_date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(row.business_date) || !Number.isFinite(Date.parse(row.business_date + 'T00:00:00Z'))) throw new Error('Invalid quote date');
    if ((row.value != null && typeof row.value !== 'string' && typeof row.value !== 'number') ||
      (row.record_id != null && typeof row.record_id !== 'string')) throw new Error('Invalid quote record');
    const value = row.value == null || String(row.value).trim() === '' ? null : String(row.value);
    if (value !== null && !Number.isFinite(Number(value))) throw new Error('Invalid quote value');
    if (row.daily_return != null && (typeof row.daily_return !== 'number' || !Number.isFinite(row.daily_return))) throw new Error('Invalid daily return');
    return { ...row, value };
  }).sort((a, b) => a.business_date.localeCompare(b.business_date));
}

function normaliseIndicators(rows: Indicator[]): Indicator[] {
  return rows.map(row => {
    if (!row || typeof row.id !== 'string' || !row.id.trim() ||
      (row.column_name != null && typeof row.column_name !== 'string') ||
      (row.unit != null && typeof row.unit !== 'string')) throw new Error('Invalid indicator metadata');
    return { id: row.id, column_name: row.column_name || '', unit: row.unit || '' };
  });
}

export function Indicators(): React.ReactElement {
  const [catalog, setCatalog] = useState<Indicator[]>([]);
  const [catalogError, setCatalogError] = useState('');
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [id, setId] = useState('');
  const [namedRows, setNamedRows] = useState<Quote[]>([]);
  const [result, setResult] = useState<{ id: string; rows: Quote[] }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  const selected = catalog.find(item => item.id === id) || catalog[0];
  const selectedId = selected?.id;
  const rows = result && result.id === selectedId ? result.rows : [];
  const last = [...rows].reverse().find(hasValue);
  const unit = selected?.unit && selected.unit !== 'unknown' ? selected.unit : '';
  const sheetOf = (indicator: Indicator) => indicator.id === turnover.id ? '商品市场' : indicator.id.split('.')[0];
  const sheets = Array.from(new Set(catalog.map(sheetOf)));
  const sheet = selected ? sheetOf(selected) : '';

  useEffect(() => {
    const controller = new AbortController();
    setCatalogLoading(true);
    setCatalogError('');
    setResult(undefined);
    Promise.allSettled([
      pages<Indicator>('market-api/v1/indicators', controller.signal, { dataset: 'main' }),
      pages<Quote>('market-api/v1/indicators/' + encodeURIComponent(turnover.id) + '/observations', controller.signal, { dataset: 'main' }),
    ]).then(([directory, observations]) => {
      if (controller.signal.aborted) return;
      const available = directory.status === 'fulfilled' ? normaliseIndicators(directory.value) : [];
      const named = observations.status === 'fulfilled' ? normaliseQuoteRows(observations.value) : [];
      setNamedRows(named);
      // The named series is an existing API route; expose it only after actual observations arrive.
      setCatalog(named.some(hasValue) && !available.some(item => item.id === turnover.id) ? [turnover, ...available] : available);
      if (directory.status === 'rejected' || observations.status === 'rejected') setCatalogError('部分指标暂时无法加载');
    }).catch(() => {
      if (!controller.signal.aborted) { setCatalog([]); setNamedRows([]); setCatalogError('指标目录暂时无法加载'); }
    }).finally(() => { if (!controller.signal.aborted) setCatalogLoading(false); });
    return () => controller.abort();
  }, [reload]);

  useEffect(() => {
    if (!selectedId || catalogLoading) { setLoading(false); return; }
    if (selectedId === turnover.id) {
      setResult({ id: selectedId, rows: namedRows });
      setLoading(false);
      setError('');
      return;
    }
    const controller = new AbortController();
    setResult(undefined);
    setLoading(true);
    setError('');
    pages<Quote>('market-api/v1/indicators/' + encodeURIComponent(selectedId) + '/observations', controller.signal, { dataset: 'main' }).then(data => {
      if (!controller.signal.aborted) setResult({ id: selectedId, rows: normaliseQuoteRows(data) });
    }).catch(() => { if (!controller.signal.aborted) setError('指标暂时无法加载'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [selectedId, namedRows, catalogLoading, reload]);

  return <>
    <div className="market-controls">
      {selected && <div className="market-control-fields">
        {sheets.length > 1 && <Field label="分类"><select value={sheet} onChange={event => setId(catalog.find(item => sheetOf(item) === event.target.value)!.id)}>{sheets.map(name => <option key={name} value={name}>{name}</option>)}</select></Field>}
        {catalog.length > 1 && <Field label="指标"><select value={selected.id} onChange={event => setId(event.target.value)}>{catalog.filter(item => sheetOf(item) === sheet).map(item => <option key={item.id} value={item.id}>{seriesName(item)}</option>)}</select></Field>}
      </div>}
      <Button icon="refresh" busy={catalogLoading || loading} onClick={() => setReload(value => value + 1)}>刷新</Button>
    </div>
    {(catalogError || error) && <Notice tone="warning"><span>{error || catalogError}</span><Button variant="ghost" onClick={() => setReload(value => value + 1)}>重试</Button></Notice>}
    {(catalogLoading || loading) && <div className="market-loading" role="status"><Icon name="refresh" className="spin" size={16} />正在加载指标</div>}
    {last && selected && <Card className="market-quote-card">
      <div className="quote-heading">
        <div>
          <div className="quote-title-row"><h2>{seriesName(selected)}</h2>{selected.id !== turnover.id && <Info label="指标信息">数据列：{selected.id}{unit ? `；单位：${unit}` : '。原始序列未提供单位，请结合来源确认指标口径。'}</Info>}</div>
          <div className="quote-latest"><strong>{Number(last.value).toLocaleString('zh-CN', { maximumFractionDigits: 6 })}</strong>{unit && <span className="quote-unit">{unit}</span>}</div>
          <div className="quote-asof"><time dateTime={last.business_date}>{last.business_date}</time></div>
        </div>
        <Button icon="download" onClick={() => downloadCsv(`${seriesName(selected)}.csv`, ['日期', seriesName(selected), '单位'], rows.map(row => [row.business_date, row.value, unit]))}>导出全部</Button>
      </div>
      <div className="market-chart-wrap"><MarketChart key={selected.id} rows={rows} states={noStates} label={seriesName(selected) + (unit ? `（${unit}）` : '')} /></div>
    </Card>}
  </>;
}

type Doc = { record_id: string; entity_id: string; title: string; business_date: string; date_known: number; metric: string; payload: string };
type DocPage = { items: Doc[]; next_cursor: string };
type Payload = Record<string, string | number | null>;
const types: Record<string, string> = { news: '新闻', social: '社交', markdown: '资金摘要', wechat_index: '公众号', pdf: '研报' };
const counters: Record<string, string> = { view_count: '浏览', like_count: '点赞', reply_count: '回复', retweet_count: '转发', quote_count: '引用', bookmark_count: '收藏' };
const present = (value: unknown) => value != null && String(value).trim() !== '';
const parsePayload = (payload: string | null | undefined): Payload => {
  if (payload == null || payload.trim() === '') return {};
  const value = JSON.parse(payload);
  if (value === null) return {};
  if (typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid document payload');
  return Object.fromEntries(Object.entries(value).filter(([, field]) => field == null || typeof field === 'string' || typeof field === 'number')) as Payload;
};

function normaliseDocument(raw: unknown): Doc | null {
  if (raw == null) return null;
  if (typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Invalid document record');
  const item = raw as Record<string, unknown>;
  if (!Object.keys(item).length) return null;
  const text = (key: string) => {
    if (item[key] == null) return '';
    if (typeof item[key] !== 'string') throw new Error('Invalid document field');
    return item[key] as string;
  };
  const recordId = text('record_id');
  if (!recordId.trim()) throw new Error('Missing document identifier');
  return { record_id: recordId, title: text('title'), entity_id: text('entity_id'), business_date: text('business_date'),
    metric: text('metric'), payload: text('payload'), date_known: item.date_known === 1 || item.date_known === true ? 1 : 0 };
}

function normaliseDocumentPage(raw: unknown): DocPage {
  if (!raw || typeof raw !== 'object') throw new Error('Invalid documents response');
  const value = raw as { items?: unknown[]; next_cursor?: unknown };
  if (!Array.isArray(value.items) || (value.next_cursor != null && typeof value.next_cursor !== 'string')) throw new Error('Invalid documents response');
  return { items: value.items.map(normaliseDocument).filter((item): item is Doc => item !== null), next_cursor: typeof value.next_cursor === 'string' ? value.next_cursor : '' };
}

function SocialSnapshots({ postId }: { postId: string }): React.ReactElement | null {
  const [rows, setRows] = useState<{ record_id: string; fields: Payload }[]>([]);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setRows([]);
    setError('');
    pages<{ record_id: string; payload: string }>('market-api/v1/social/' + encodeURIComponent(postId) + '/snapshots', controller.signal, { dataset: 'main' }).then(data => {
      const parsed = data.map(row => {
        if (!row || typeof row.record_id !== 'string' || !row.record_id.trim()) throw new Error('Invalid social snapshot');
        return { record_id: row.record_id, fields: parsePayload(row.payload) };
      }).filter(row => Object.values(row.fields).some(present));
      if (!controller.signal.aborted) setRows(parsed);
    }).catch(() => { if (!controller.signal.aborted) setError('互动记录暂时无法加载'); });
    return () => controller.abort();
  }, [postId, reload]);
  if (error) return <Notice tone="warning"><span>{error}</span><Button variant="ghost" onClick={() => setReload(value => value + 1)}>重试</Button></Notice>;
  if (!rows.length) return null;
  const columns = Object.entries(counters).filter(([key]) => rows.some(row => present(row.fields[key])));
  const hasDate = rows.some(row => present(row.fields.last_snapshot_at));
  return <details className="document-snapshots"><summary>互动记录 <span>{rows.length}</span></summary>
    <div className="table-scroll"><table className="data-table"><thead><tr>{hasDate && <th>记录时间</th>}{columns.map(([key, label]) => <th key={key} className="numeric">{label}</th>)}<th>来源</th></tr></thead><tbody>{rows.map(row => <tr key={row.record_id}>{hasDate && <td>{row.fields.last_snapshot_at}</td>}{columns.map(([key]) => <td key={key} className="numeric">{row.fields[key]}</td>)}<td><RecordSource domain="social" recordId={row.record_id} /></td></tr>)}</tbody></table></div>
  </details>;
}

export function DocDetail({ id, onClose }: { id: string; onClose: () => void }): React.ReactElement | null {
  const [doc, setDoc] = useState<Doc>();
  const [fields, setFields] = useState<Payload>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  const [loadedId, setLoadedId] = useState('');
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const selectedDoc = doc?.record_id === id ? doc : undefined;
  useEffect(() => {
    const controller = new AbortController();
    setDoc(undefined);
    setFields({});
    setLoading(true);
    setError('');
    setLoadedId('');
    requestJson('/market-api/v1', 'documents/' + encodeURIComponent(id) + '?dataset=main', { signal: controller.signal }).then(response => {
      if (response.status !== 200 || !Array.isArray(response.body)) throw new Error('Invalid document response');
      const item = response.body.map(normaliseDocument).find(record => record?.record_id === id);
      if (!controller.signal.aborted && item) {
        const payload = parsePayload(item.payload);
        const meaningful = item.title.trim() || item.metric.trim() || item.entity_id.trim() ||
          (item.date_known && item.business_date) || Object.values(payload).some(present);
        if (meaningful) { setFields(payload); setDoc(item); }
      }
    }).catch(() => { if (!controller.signal.aborted) setError('资料暂时无法加载'); })
      .finally(() => { if (!controller.signal.aborted) { setLoadedId(id); setLoading(false); } });
    return () => controller.abort();
  }, [id, reload]);
  useEffect(() => {
    if (loadedId === id && !loading && !error && !selectedDoc) closeRef.current();
  }, [loadedId, id, loading, error, selectedDoc]);
  if (loadedId === id && !loading && !error && !selectedDoc) return null;
  return <Modal title={selectedDoc?.title || '资料详情'} drawer onClose={onClose}>
    {error && <Notice tone="warning"><span>{error}</span><Button variant="ghost" onClick={() => setReload(value => value + 1)}>重试</Button></Notice>}
    {loading && <div className="market-loading" role="status"><Icon name="refresh" className="spin" size={16} />正在加载</div>}
    {selectedDoc && <article className="document-reader">
      <div className="story-meta">{selectedDoc.metric && <Badge>{types[selectedDoc.metric] || selectedDoc.metric}</Badge>}{!!selectedDoc.date_known && selectedDoc.business_date && <time dateTime={selectedDoc.business_date}>{selectedDoc.business_date}</time>}{present(fields.author_display_name) && <span>{fields.author_display_name}</span>}</div>
      {present(fields.text) && <div className="document-body">{fields.text}</div>}
      <div className="document-origin"><RecordSource domain="document" recordId={selectedDoc.record_id} /></div>
      {selectedDoc.metric === 'social' && selectedDoc.entity_id && <SocialSnapshots key={selectedDoc.entity_id} postId={selectedDoc.entity_id} />}
    </article>}
  </Modal>;
}

export function Documents(): React.ReactElement {
  const [draft, setDraft] = useState('');
  const [code, setCode] = useState('');
  const [codes, setCodes] = useState<string[]>([]);
  const [catalogError, setCatalogError] = useState('');
  const [cursors, setCursors] = useState(['']);
  const [page, setPage] = useState<DocPage>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState('');
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setCatalogError('');
    pages<{ code: string }>('market-api/v1/news/securities', controller.signal, { dataset: 'main' }).then(data => {
      const available = data.map(row => {
        if (!row || typeof row.code !== 'string') throw new Error('Invalid security code');
        return row.code;
      }).filter(Boolean);
      if (!controller.signal.aborted) setCodes(Array.from(new Set(available)));
    }).catch(() => { if (!controller.signal.aborted) { setCodes([]); setCatalogError('证券目录暂时无法加载'); } });
    return () => controller.abort();
  }, [reload]);
  useEffect(() => {
    const controller = new AbortController();
    setPage(undefined);
    setLoading(true);
    setError('');
    const query = new URLSearchParams({ dataset: 'main', limit: '20', cursor: cursors.at(-1)! });
    if (code) query.set('code', code);
    requestJson('/market-api/v1', (code ? 'news/by-security?' : 'documents?') + query, { signal: controller.signal }).then(response => {
      if (response.status !== 200) throw new Error('Invalid documents response');
      const data = normaliseDocumentPage(response.body);
      if (!controller.signal.aborted) setPage(data);
    }).catch(() => { if (!controller.signal.aborted) setError('资讯暂时无法加载'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [cursors, code, reload]);
  const term = draft.trim().toUpperCase();
  const suggestions = codes.filter(value => value.includes(term)).slice(0, 40);
  function search(value: string) {
    setCode(value);
    setCursors(['']);
    setPage(undefined);
    setSelected('');
  }
  return <>
    <div className="market-controls">
      <form className="news-search-form" onSubmit={event => { event.preventDefault(); search(term); }}>
        <Field label="证券代码"><input type="search" list="news-security-codes" value={draft} onChange={event => setDraft(event.target.value)} /></Field>
        <datalist id="news-security-codes">{suggestions.map(value => <option key={value} value={value} />)}</datalist>
        <Button type="submit" icon="search" variant="primary">搜索</Button>
        {(code || draft) && <Button variant="ghost" onClick={() => { setDraft(''); search(''); }}>全部资料</Button>}
      </form>
      <Button icon="refresh" busy={loading} onClick={() => setReload(value => value + 1)}>刷新</Button>
    </div>
    {(error || catalogError) && <Notice tone="warning"><span>{error || catalogError}</span><Button variant="ghost" onClick={() => setReload(value => value + 1)}>重试</Button></Notice>}
    {loading && <div className="market-loading" role="status"><Icon name="refresh" className="spin" size={16} />正在加载资讯</div>}
    {page && page.items.length > 0 && <Card className="news-feed-card"><ul className="news-feed">{page.items.map(item => <li key={item.record_id}>
      <button type="button" className="news-story" onClick={() => setSelected(item.record_id)}>
        <div className="news-story-content"><div className="story-meta">{item.metric && <span className="story-type">{types[item.metric] || item.metric}</span>}{!!item.date_known && item.business_date && <time dateTime={item.business_date}>{item.business_date}</time>}</div><h2>{item.title || '阅读资料'}</h2></div>
        <Icon name="arrow" size={20} />
      </button>
    </li>)}</ul></Card>}
    {(cursors.length > 1 || page?.next_cursor) && <div className="news-pagination"><span aria-label={`当前第 ${cursors.length} 页`}>{cursors.length}</span><div><Button disabled={cursors.length === 1} onClick={() => setCursors(value => value.slice(0, -1))}>上一页</Button><Button disabled={loading || !page?.next_cursor} onClick={() => page?.next_cursor && setCursors(value => [...value, page.next_cursor])}>下一页</Button></div></div>}
    {selected && <DocDetail key={selected} id={selected} onClose={() => setSelected('')} />}
  </>;
}

export function AssetNews({ asset }: { asset: string }): React.ReactElement | null {
  const [rows, setRows] = useState<Pick<Doc, 'record_id' | 'business_date' | 'title'>[]>([]);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setRows([]);
    setError('');
    requestJson('/market-api/v1', 'market/news?' + new URLSearchParams({ asset_id: asset, dataset: 'main', limit: '10' }), { signal: controller.signal }).then(response => {
      if (response.status !== 200) throw new Error('Invalid news response');
      const data = normaliseDocumentPage(response.body);
      if (!controller.signal.aborted) setRows(data.items);
    }).catch(() => { if (!controller.signal.aborted) setError('相关资讯暂时无法加载'); });
    return () => controller.abort();
  }, [asset, reload]);
  if (error) return <Notice tone="warning"><span>{error}</span><Button variant="ghost" onClick={() => setReload(value => value + 1)}>重试</Button></Notice>;
  if (!rows.length) return null;
  return <Card title="相关资讯" className="asset-news-card"><ul className="asset-news-list">{rows.map(item => <li key={item.record_id}><button type="button" onClick={() => setSelected(item.record_id)}><strong>{item.title || '阅读资料'}</strong>{item.business_date && <time dateTime={item.business_date}>{item.business_date}</time>}<Icon name="chevron" size={15} /></button></li>)}</ul>{selected && <DocDetail id={selected} onClose={() => setSelected('')} />}</Card>;
}
