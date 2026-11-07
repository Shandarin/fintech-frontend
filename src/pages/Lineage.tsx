import React, { useState } from 'react';
import { Button, Card, Field, Info, PageHead } from '../components/ui';
import RecordSource from '../components/RecordSource';

type Domain = 'market' | 'indicator' | 'document' | 'social';
export default function Lineage() {
  const [domain, setDomain] = useState<Domain>('market');
  const [recordId, setRecordId] = useState('');
  const [selection, setSelection] = useState<{domain: Domain; recordId: string; request: number}>();
  return <>
    <PageHead title="数据溯源"/>
    <Card className="lineage-lookup-card">
      <form className="lineage-lookup" onSubmit={e => { e.preventDefault(); if (recordId.trim()) setSelection({ domain, recordId: recordId.trim(), request: Date.now() }); }}>
        <Field label="数据类型"><select value={domain} onChange={e => { setDomain(e.target.value as Domain); setSelection(undefined); }}><option value="market">行情</option><option value="indicator">宏观指标</option><option value="document">资讯研报</option><option value="social">社交数据</option></select></Field>
        <Field label="记录编号"><input value={recordId} autoComplete="off" onChange={e => { setRecordId(e.target.value); setSelection(undefined); }} required/></Field>
        <Button type="submit" variant="primary" icon="search" disabled={!recordId.trim()}>查询来源</Button>
        <Info label="如何查找来源">也可在行情、指标或研报详情中直接选择“查看来源”。</Info>
      </form>
    </Card>
    {selection && <RecordSource key={selection.request} domain={selection.domain} recordId={selection.recordId} initialOpen/>}
  </>;
}
