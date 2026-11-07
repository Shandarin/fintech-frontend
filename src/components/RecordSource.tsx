import React, { useEffect, useId, useState } from 'react';
import { Button, Notice } from './ui';
import { requestJson } from '../services/httpClient';
import '../pages/tools-pages.css';

type Origin = { source_locator?: unknown; batch_id?: unknown; object_key?: unknown };
const isRecord = (value:unknown):value is Record<string,unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
const textValue = (value:unknown) => typeof value === 'string' ? value : '';
export default function RecordSource({ domain, recordId, asset, day, initialOpen = false }: {
  domain:'market'|'indicator'|'document'|'social'; recordId?:string; asset?:string; day?:string; initialOpen?:boolean;
}): React.ReactElement {
  const [open, setOpen] = useState(initialOpen);
  const [source, setSource] = useState<{file:string; location:string; batch:string}>();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  const contentId = useId();
  useEffect(() => {
    setSource(undefined); setError('');
    if (!open) return;
    const c = new AbortController();
    setBusy(true);
    async function read(path:string) {
      const response = await requestJson('/market-api/v1', path, {signal:c.signal});
      if (response.status !== 200) throw new Error('来源读取失败（HTTP ' + response.status + '）');
      return response.body;
    }
    async function load() {
      let id = recordId;
      if (!id && domain === 'market' && asset && day) {
        const query = new URLSearchParams({dataset:'main',asset_id:asset,metric:'close',from:day,to:day,limit:'2'});
        const page = await read('market?' + query) as {items?:unknown} | null;
        const items = Array.isArray(page?.items) ? page.items.filter((row:unknown):row is {record_id:string} => isRecord(row) && textValue(row.record_id).trim() !== '') : [];
        if (!items.length) return;
        if (items.length !== 1) throw new Error('当天存在多条收盘记录，无法确定来源');
        id = items[0].record_id;
      }
      if (!id) return;
      const body = await read('lineage/record/' + encodeURIComponent(id) + '?dataset=main&domain=' + domain) as {record?:Origin} | null;
      const record = body?.record;
      if (!isRecord(record)) return;
      const location = textValue(record.source_locator);
      const batch = textValue(record.batch_id) || (typeof record.batch_id === 'number' && Number.isFinite(record.batch_id) ? String(record.batch_id) : '');
      if (!location && !textValue(record.object_key) && !batch) return;
      // Keep the canonical record source even when the optional batch metadata
      // cannot be read. A metadata error remains visible instead of replacing it.
      let file = textValue(record.object_key);
      if (batch) {
        try {
          const runs = await read('runs/' + encodeURIComponent(batch));
          if (!Array.isArray(runs)) throw new Error('Invalid batch metadata');
          const run = runs.find(isRecord);
          if (runs.length && !run) throw new Error('Invalid batch metadata');
          if (run?.metadata != null && run.metadata !== '') {
            if (typeof run.metadata !== 'string') throw new Error('Invalid batch metadata');
            const metadata:unknown = JSON.parse(run.metadata);
            if (!isRecord(metadata)) throw new Error('Invalid batch metadata');
            if (textValue(metadata.path)) file = textValue(metadata.path);
          }
        } catch {
          if (!c.signal.aborted) setError('导入批次信息读取失败');
        }
      }
      if (!c.signal.aborted) setSource({file, location, batch});
    }
    load().catch(e => { if (!c.signal.aborted) setError(e instanceof Error ? e.message : '来源读取失败'); })
      .finally(() => { if (!c.signal.aborted) setBusy(false); });
    return () => c.abort();
  }, [open, domain, recordId, asset, day, retry]);
  return <div className="record-source">
    {!initialOpen && <Button icon="branch" variant="ghost" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen(v => !v)}>{open ? '收起来源' : '查看来源'}</Button>}
    {open && <div id={contentId} className="record-source-details">
      {busy && <span className="tools-loading" role="status">读取中…</span>}
      {error && <Notice tone="warning"><span>{error}</span><Button variant="ghost" onClick={() => setRetry(n => n + 1)}>重试</Button></Notice>}
      {source && <dl className="key-values">
        {source.file && <div><dt>原始文件</dt><dd>{source.file}</dd></div>}
        {source.location && <div><dt>文件内位置</dt><dd>{source.location}</dd></div>}
        {source.batch && <div><dt>导入批次</dt><dd>{source.batch}</dd></div>}
      </dl>}
    </div>}
  </div>;
}
