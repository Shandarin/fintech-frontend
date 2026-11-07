import RecordSource from '../components/RecordSource';
import React, { useEffect, useState } from 'react';
import { Button, Card, Empty, Modal, Notice } from '../components/ui';
import MarketChart, { type Quote } from '../components/MarketChart';
import { pages } from '../services/pagedApi';
import { requestJson } from '../services/httpClient';

type Indicator = { id: string; column_name: string; unit: string };
const turnover: Indicator = { id: 'commodity.turnover', column_name: '商品期货日成交额', unit: '万亿元' };
const noStates: never[] = [];
const indicatorLabel = (i: Indicator) => i.id === turnover.id ? turnover.column_name : i.id.split('.')[0] + ' · ' + (i.column_name || i.id);

export function Indicators(): React.ReactElement {
  const [catalog, setCatalog] = useState<Indicator[]>([turnover]);
  const [catalogError, setCatalogError] = useState('');
  const [id, setId] = useState(turnover.id);
  const [rows, setRows] = useState<Quote[]>();
  const [error, setError] = useState('');
  useEffect(() => {
    const c = new AbortController();
    pages<Indicator>('market-api/v1/indicators', c.signal, {dataset:'main'}).then(data => {
      if (!c.signal.aborted) setCatalog([turnover, ...data.filter(i => i.id !== turnover.id)]);
    }).catch(e => { if (!c.signal.aborted) setCatalogError(e.message); });
    return () => c.abort();
  }, []);
  useEffect(() => {
    const c = new AbortController();
    setRows(undefined); setError('');
    pages<Quote>('market-api/v1/indicators/' + encodeURIComponent(id) + '/observations', c.signal, {dataset:'main'})
      .then(data => { if (!c.signal.aborted) setRows(data.sort((a,b) => a.business_date.localeCompare(b.business_date))); })
      .catch(e => { if (!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  }, [id]);
  const selected = catalog.find(i => i.id === id) || turnover;
  const unit = selected.unit && selected.unit !== 'unknown' ? selected.unit : '';
  const last = rows?.at(-1);
  const original = catalog.filter(i => i.id !== turnover.id);
  const sheetOf = (i: Indicator) => i.id.split('.')[0];
  const sheet = sheetOf(selected);
  const sheets = Array.from(new Set(original.map(sheetOf)));
  return <Card title="宏观指标"><div className="card-inner">
    <div className="filter-row"><label>数据 <select value={id === turnover.id ? 'named' : 'original'} onChange={e => setId(e.target.value === 'named' ? turnover.id : original[0].id)}>
      <option value="named">{turnover.column_name}</option>
      {!!original.length && <option value="original">未注明含义的原始序列（{original.length}）</option>}
    </select></label>
    {id !== turnover.id && <><label>工作表 <select value={sheet} onChange={e => setId(original.find(i => sheetOf(i) === e.target.value)!.id)}>
      {sheets.map(name => <option key={name}>{name}</option>)}</select></label>
      <label>数据列 <select value={id} onChange={e => setId(e.target.value)}>
        {original.filter(i => sheetOf(i) === sheet).map(i => <option key={i.id} value={i.id}>{i.column_name || i.id}</option>)}</select></label></>}</div>
    {id !== turnover.id && <p>来源：《指标集1_数据.xlsx》工作表 {sheet} 的“{selected.column_name}”列。原表未注明该列代表的指标及单位。</p>}
    {catalogError && <Notice tone="warning">{catalogError}</Notice>}
    {error ? <Notice tone="warning">{error}</Notice> : !rows ? <p role="status">正在读取指标…</p> : !last ? <p>暂无观测记录</p> : <>
      <p>{rows[0].business_date} 至 {last.business_date} · {rows.length.toLocaleString()} 条 · 期末值 {last.value == null ? '—' : Number(last.value).toLocaleString('zh-CN',{maximumFractionDigits:6})} {unit || '（单位待确认）'}</p>
      <MarketChart key={id} rows={rows} states={noStates} label={indicatorLabel(selected) + (unit ? '（' + unit + '）' : '')}/></>}
  </div></Card>;
}

type Doc = {record_id: string; entity_id:string; title: string; business_date: string; date_known: number; metric: string; payload: string};
type DocPage = { items: Doc[]; next_cursor: string };
const types: Record<string,string> = {news:'新闻', social:'社交', markdown:'资金摘要', wechat_index:'公众号索引', pdf:'研报'};
const counters = {view_count:'浏览', like_count:'点赞', reply_count:'回复', retweet_count:'转发', quote_count:'引用', bookmark_count:'收藏'};
type Snapshot = {record_id:string; payload:string};
function SocialSnapshots({postId}: {postId:string}) {
  const [rows,setRows] = useState<Snapshot[]>();
  const [error,setError] = useState('');
  useEffect(() => {
    const c = new AbortController();
    pages<Snapshot>('market-api/v1/social/' + encodeURIComponent(postId) + '/snapshots', c.signal, {dataset:'main'})
      .then(data => { if (!c.signal.aborted) setRows(data); })
      .catch(() => { if (!c.signal.aborted) setError('社交快照读取失败'); });
    return () => c.abort();
  }, [postId]);
  return <section><h3>社交快照明细</h3>{error ? <Notice tone="warning">{error}</Notice> : !rows ? <p role="status">正在读取快照…</p> :
    !rows.length ? <p>该帖子暂无快照。</p> : <><p>共 {rows.length} 条快照</p>{rows.map(row => {
      const fields = JSON.parse(row.payload) as Record<string,string | number | null>;
      return <div key={row.record_id}><dl className="key-values">
        <div><dt>快照时间</dt><dd>{fields.last_snapshot_at || '未记录'}</dd></div>
        {Object.entries(counters).map(([key,label]) => <div key={key}><dt>{label}</dt><dd>{fields[key] === '' || fields[key] == null ? '—' : fields[key]}</dd></div>)}
      </dl><RecordSource domain="social" recordId={row.record_id}/></div>;
    })}</>}</section>;
}
function DocDetail({ id, onClose }: {id: string; onClose: () => void}) {
  const [doc, setDoc] = useState<Doc>();
  const [fields, setFields] = useState<Record<string, string | number | null>>({});
  const [error, setError] = useState('');
  useEffect(() => {
    const c = new AbortController();
    requestJson('/market-api/v1', 'documents/' + encodeURIComponent(id) + '?dataset=main', {signal:c.signal}).then(result => {
      if (c.signal.aborted) return;
      if (result.status !== 200 || !Array.isArray(result.body) || !result.body[0]) throw new Error('文档详情读取失败');
      const row: Doc = result.body[0];
      const payload = JSON.parse(row.payload);
      setFields(payload);
      setDoc(row);
    }).catch(e => { if (!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  }, [id]);
  return <Modal title={doc?.title || '文档详情'} drawer onClose={onClose}>{error ? <Notice tone="warning">{error}</Notice> : !doc ? <p>正在加载…</p> : <>
    <p>{types[doc.metric] || doc.metric} · {doc.date_known ? doc.business_date : '日期未知'}</p>
    <RecordSource domain="document" recordId={doc.record_id}/>
    {doc.metric === 'social' && <dl className="key-values">{Object.entries({
      author_display_name:'作者', first_collected_at:'首次采集',
    }).map(([key,label]) => <div key={key}><dt>{label}</dt><dd>{fields[key] === '' || fields[key] == null ? '—' : fields[key]}</dd></div>)}</dl>}
    <div style={{whiteSpace:'pre-wrap', overflowWrap:'anywhere'}}>{fields.text || (doc.metric === 'wechat_index' ? '此条记录仅提供文章索引。' : '此条记录没有正文。')}</div>{doc.metric === 'social' && <SocialSnapshots key={doc.entity_id} postId={doc.entity_id}/>}</>}</Modal>;
}

export function Documents(): React.ReactElement {
  const [draft,setDraft] = useState('');
  const [code,setCode] = useState('');
  const [codes,setCodes] = useState<string[]>([]);
  const [catalogError,setCatalogError] = useState('');
  useEffect(() => {
    const c = new AbortController();
    pages<{code:string}>('market-api/v1/news/securities',c.signal,{dataset:'main'})
      .then(rows => { if (!c.signal.aborted) setCodes(rows.map(r => r.code)); })
      .catch(() => { if (!c.signal.aborted) setCatalogError('代码目录暂不可用，仍可输入完整代码查询。'); });
    return () => c.abort();
  }, []);
  const [cursors, setCursors] = useState(['']);
  const [page, setPage] = useState<DocPage>();
  const [error, setError] = useState('');
  const [selected, setSelected] = useState('');
  useEffect(() => {
    const c = new AbortController();
    setPage(undefined); setError('');
    const query = new URLSearchParams({dataset:'main', limit:'20', cursor:cursors.at(-1)!});
    if (code) query.set('code',code);
    requestJson('/market-api/v1', (code ? 'news/by-security?' : 'documents?') + query, {signal:c.signal}).then(result => {
      if (c.signal.aborted) return;
      const data = result.body as DocPage;
      if (result.status !== 200 || !Array.isArray(data?.items)) throw new Error('文档列表读取失败');
      setPage(data);
    }).catch(e => { if (!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  }, [cursors,code]);
  const term = draft.trim().toUpperCase();
  const suggestions = codes.filter(c => c.includes(term)).slice(0,40);
  function search(value:string) {
    setCode(value); setCursors(['']); setPage(undefined); setSelected('');
  }
  return <Card title="舆情与研报"><div className="card-inner">
    <form className="filter-row" onSubmit={e => { e.preventDefault(); search(term); }}>
      <label>证券代码 <input list="news-security-codes" placeholder="例如 SZ002594" value={draft} onChange={e => setDraft(e.target.value)}/></label>
      <datalist id="news-security-codes">{suggestions.map(c => <option key={c} value={c}/>)}</datalist>
      <button type="submit" className="btn btn-primary">查询新闻</button>
      {(code || draft) && <Button onClick={() => {setDraft('');search('');}}>查看全部资料</Button>}
    </form>
    {catalogError && <Notice tone="warning">{catalogError}</Notice>}
    <p>{code ? code + ' · 相关新闻，按日期从新到旧排列' : '全部资料'}{codes.length > 0 && ' · 可查询 ' + codes.length.toLocaleString() + ' 种证券代码'}</p>
    {error ? <Notice tone="warning">{error}</Notice> : !page ? <p role="status">正在读取文档…</p> : !page.items.length ? <p>未找到匹配记录</p> :
    <div className="table-scroll"><table className="data-table"><thead><tr><th>日期</th><th>类型</th><th>标题</th></tr></thead>
    <tbody>{page.items.map(d => <tr key={d.record_id}><td>{d.date_known ? d.business_date : '日期未知'}</td><td>{types[d.metric] || d.metric}</td><td>
      <button type="button" className="asset-name" onClick={() => setSelected(d.record_id)}>{d.title || '无标题'}</button></td></tr>)}</tbody></table></div>}
    <div className="table-footer"><span>第 {cursors.length} 页</span><div><Button disabled={cursors.length === 1} onClick={() => setCursors(c => c.slice(0,-1))}>上一页</Button>
    <Button disabled={!page?.next_cursor} onClick={() => page?.next_cursor && setCursors(c => [...c,page.next_cursor])}>下一页</Button></div></div>
    {selected && <DocDetail key={selected} id={selected} onClose={() => setSelected('')}/>}
  </div></Card>;
}

export function AssetNews({asset}: {asset: string}): React.ReactElement | null {
  const [rows,setRows] = useState<Pick<Doc,'record_id'|'business_date'|'title'>[]>([]);
  const [selected,setSelected] = useState('');
  const [error,setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    requestJson('/market-api/v1','market/news?' + new URLSearchParams({asset_id:asset,dataset:'main',limit:'10'}),{signal:controller.signal}).then(response => {
      if (controller.signal.aborted) return;
      const data = response.body as DocPage;
      if (response.status !== 200 || !Array.isArray(data?.items)) throw new Error('相关新闻读取失败');
      setRows(data.items);
    }).catch(e => { if (!controller.signal.aborted) setError(e.message); });
    return () => controller.abort();
  }, [asset]);
  if (error) return <Notice tone="warning">{error}</Notice>;
  if (!rows.length) return null;
  return <section><h3>相关新闻</h3><div className="table-scroll"><table className="data-table">
    <thead><tr><th>日期</th><th>标题</th></tr></thead><tbody>{rows.map(r => <tr key={r.record_id}><td>{r.business_date}</td>
    <td><button type="button" className="asset-name" onClick={() => setSelected(r.record_id)}>{r.title || '无标题'}</button></td></tr>)}</tbody>
    </table></div>{selected && <DocDetail id={selected} onClose={() => setSelected('')}/>}</section>;
}
