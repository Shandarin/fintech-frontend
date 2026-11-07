import React, { useEffect, useState } from 'react';
import { Button, Notice } from './ui';
import { requestJson } from '../services/httpClient';

type Origin = { source_locator:string; batch_id:string; object_key:string };
export default function RecordSource({ domain, recordId, asset, day }: {
  domain:'market'|'indicator'|'document'|'social'; recordId?:string; asset?:string; day?:string;
}): React.ReactElement {
  const [open,setOpen] = useState(false);
  const [source,setSource] = useState<{file:string; location:string; batch:string}>();
  const [error,setError] = useState('');
  useEffect(() => {
    if (!open) return;
    const c = new AbortController();
    setError(''); setSource(undefined);
    async function read(path:string) {
      const r = await requestJson('/market-api/v1',path,{signal:c.signal});
      if (r.status !== 200) throw new Error('无法读取记录来源');
      return r.body;
    }
    async function load() {
      let id = recordId;
      if (!id && domain === 'market' && asset && day) {
        const query = new URLSearchParams({dataset:'main',asset_id:asset,metric:'close',from:day,to:day,limit:'2'});
        const page = await read('market?' + query) as {items:{record_id:string}[]};
        if (page.items.length !== 1) throw new Error('无法唯一确定当天的收盘记录');
        id = page.items[0].record_id;
      }
      if (!id) throw new Error('未找到对应的原始记录');
      const {record} = await read('lineage/record/' + encodeURIComponent(id) + '?dataset=main&domain=' + domain) as {record:Origin};
      const runs = await read('runs/' + encodeURIComponent(record.batch_id)) as {metadata:string}[];
      const file = runs[0] && JSON.parse(runs[0].metadata).path;
      if (!c.signal.aborted) setSource({file:file || record.object_key,location:record.source_locator,batch:record.batch_id});
    }
    load().catch(e => { if (!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  },[open,domain,recordId,asset,day]);
  return <div><Button onClick={() => setOpen(v => !v)}>{open ? '收起来源' : '查看来源'}</Button>
    {open && (error ? <Notice tone="warning">{error}</Notice> : source ? <dl className="key-values">
      <div><dt>原始文件</dt><dd>{source.file}</dd></div><div><dt>文件内位置</dt><dd>{source.location}</dd></div>
      <div><dt>导入批次</dt><dd>{source.batch}</dd></div></dl> : <p role="status">正在查询来源…</p>)}</div>;
}
