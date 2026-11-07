import React, { useEffect, useState } from 'react';
import { RetryNotice, LoadingStatus } from '../../components/RequestStatus';
import { Button, Card, Field, Info } from '../../components/ui';
import MarketChart from '../../components/MarketChart';
import { hasQuoteValue, normaliseQuoteRows, type Quote } from '../market/quotes';
import { pages } from '../../services/pagedApi';
import { downloadCsv } from '../../lib/files';

type Indicator = { id: string; column_name: string; unit: string };
const turnover: Indicator = { id: 'commodity.turnover', column_name: '商品期货日成交额', unit: '万亿元' };
const noStates: never[] = [];
const hasValue = hasQuoteValue;
const seriesName = (indicator: Indicator) => indicator.column_name || indicator.id;

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
    {(catalogError || error) && <RetryNotice message={error || catalogError} onRetry={() => setReload(value => value + 1)}/>}
    {(catalogLoading || loading) && <LoadingStatus message="正在加载指标"/>}
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

