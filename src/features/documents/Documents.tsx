import React, { useEffect, useRef, useState } from 'react';
import { RetryNotice, LoadingStatus } from '../../components/RequestStatus';
import RecordSource from '../../components/RecordSource';
import { Badge, Button, Card, Field, Modal } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { pages } from '../../services/pagedApi';
import { requestJson } from '../../services/httpClient';
import { DOCUMENT_TYPE_LABELS, SOCIAL_COUNTER_LABELS, present, parsePayload, normaliseDocument, normaliseDocumentPage, type Doc, type DocPage, type Payload } from './model';

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
  if (error) return <RetryNotice message={error} onRetry={() => setReload(value => value + 1)}/>;
  if (!rows.length) return null;
  const columns = Object.entries(SOCIAL_COUNTER_LABELS).filter(([key]) => rows.some(row => present(row.fields[key])));
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
    {error && <RetryNotice message={error} onRetry={() => setReload(value => value + 1)}/>}
    {loading && <LoadingStatus message="正在加载"/>}
    {selectedDoc && <article className="document-reader">
      <div className="story-meta">{selectedDoc.metric && <Badge>{DOCUMENT_TYPE_LABELS[selectedDoc.metric] || selectedDoc.metric}</Badge>}{!!selectedDoc.date_known && selectedDoc.business_date && <time dateTime={selectedDoc.business_date}>{selectedDoc.business_date}</time>}{present(fields.author_display_name) && <span>{fields.author_display_name}</span>}</div>
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
    {(error || catalogError) && <RetryNotice message={error || catalogError} onRetry={() => setReload(value => value + 1)}/>}
    {loading && <LoadingStatus message="正在加载资讯"/>}
    {page && page.items.length > 0 && <Card className="news-feed-card"><ul className="news-feed">{page.items.map(item => <li key={item.record_id}>
      <button type="button" className="news-story" onClick={() => setSelected(item.record_id)}>
        <div className="news-story-content"><div className="story-meta">{item.metric && <span className="story-type">{DOCUMENT_TYPE_LABELS[item.metric] || item.metric}</span>}{!!item.date_known && item.business_date && <time dateTime={item.business_date}>{item.business_date}</time>}</div><h2>{item.title || '阅读资料'}</h2></div>
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
  if (error) return <RetryNotice message={error} onRetry={() => setReload(value => value + 1)}/>;
  if (!rows.length) return null;
  return <Card title="相关资讯" className="asset-news-card"><ul className="asset-news-list">{rows.map(item => <li key={item.record_id}><button type="button" onClick={() => setSelected(item.record_id)}><strong>{item.title || '阅读资料'}</strong>{item.business_date && <time dateTime={item.business_date}>{item.business_date}</time>}<Icon name="chevron" size={15} /></button></li>)}</ul>{selected && <DocDetail id={selected} onClose={() => setSelected('')} />}</Card>;
}
