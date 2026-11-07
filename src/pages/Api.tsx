import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, Field, Info, Modal, Notice, PageHead } from '../components/ui';
import { Icon } from '../components/Icon';
import { requestJson } from '../services/httpClient';
import { downloadFile } from '../lib/files';
import './tools-pages.css';

type Endpoint = {label:string; base:string; path:string};
const ENDPOINTS:Endpoint[] = [
  {label:'资产目录',base:'/market-api/v1',path:'/assets?limit=1000'},
  {label:'宏观指标',base:'/market-api/v1',path:'/indicators?dataset=main&limit=1000'},
  {label:'经济日历',base:'/market-api/v1',path:'/economic-calendar?dataset=main&limit=1000'},
  {label:'资讯研报',base:'/market-api/v1',path:'/documents?dataset=main&limit=1000'},
  {label:'数据来源',base:'/market-api/v1',path:'/sources?limit=1000'},
  {label:'导入批次',base:'/market-api/v1',path:'/runs?dataset=main&limit=1000'},
  {label:'质量检查',base:'/market-api/v1',path:'/quality?dataset=main&limit=1000'},
  {label:'模型目录',base:'/api/v1',path:'/models?limit=1000'},
  {label:'回放会话',base:'/api/v1',path:'/stream/sessions?limit=1000'},
];
function hasContent(body:unknown):boolean {
  if (body == null || body === '') return false;
  if (Array.isArray(body)) return body.length > 0;
  if (typeof body === 'object') {
    const value = body as Record<string,unknown>;
    if (Array.isArray(value.items)) return value.items.length > 0;
    if (Array.isArray(value.data)) return value.data.length > 0;
    return Object.keys(value).length > 0;
  }
  return true;
}

export default function Api() {
  const [method, setMethod] = useState('GET');
  const [base, setBase] = useState(ENDPOINTS[0].base);
  const [path, setPath] = useState(ENDPOINTS[0].path);
  const [payload, setPayload] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{status:number; body:unknown; duration:number}>();
  const [confirmWrite, setConfirmWrite] = useState(false);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  const clearResult = () => { setResult(undefined); setError(''); };
  const run = async () => {
    let body:unknown;
    try { if (method !== 'GET' && payload.trim()) body = JSON.parse(payload); }
    catch { setConfirmWrite(false); setError('请求体不是有效的 JSON'); return; }
    if (!base.trim() || !path.trim()) { setConfirmWrite(false); setError('请填写服务地址和请求路径'); return; }
    setConfirmWrite(false); setBusy(true); clearResult();
    const abort = new AbortController(); controller.current = abort;
    const start = performance.now();
    try {
      const response = await requestJson(base.trim(),path.trim(),{method,body,signal:abort.signal});
      if (abort.signal.aborted) return;
      setResult({status:response.status,body:response.body,duration:Math.round(performance.now()-start)});
      if (response.status >= 400) setError('请求失败（HTTP ' + response.status + '）');
    } catch (e) {
      if (!abort.signal.aborted) setError(e instanceof Error ? e.message : '请求失败');
    } finally { if (!abort.signal.aborted) setBusy(false); }
  };
  const responseText = result && hasContent(result.body) ? JSON.stringify(result.body,null,2) : '';
  return <>
    <PageHead title="API 访问" actions={<Info label="请求说明">请求直接发送至所填服务地址；接口响应由服务端决定。请勿在公开配置中填写密钥。</Info>}/>
    <div className="api-console-layout">
      <Card title="接口目录" className="api-catalog"><div className="api-catalog-list">
        {ENDPOINTS.map(endpoint => <button type="button" key={endpoint.base+endpoint.path} disabled={busy} className={base === endpoint.base && path === endpoint.path && method === 'GET' ? 'active' : ''} onClick={() => {setBase(endpoint.base);setPath(endpoint.path);setMethod('GET');setPayload('');clearResult();}}>
          <span className="api-method">GET</span><span>{endpoint.label}</span><Icon name="chevron" size={14}/>
        </button>)}
      </div></Card>
      <div className="api-request-column">
        <Card title="请求" className="api-request-card"><form onSubmit={e => {e.preventDefault();if (method === 'GET') void run();else setConfirmWrite(true);}}>
          <Field label="服务地址"><input value={base} onChange={e => {setBase(e.target.value);clearResult();}} disabled={busy} required autoComplete="off" spellCheck={false}/></Field>
          <div className="api-request-line">
            <Field label="方法"><select aria-label="HTTP 方法" value={method} onChange={e => {setMethod(e.target.value);clearResult();}} disabled={busy}><option>GET</option><option>POST</option><option>PATCH</option><option>DELETE</option></select></Field>
            <Field label="请求路径"><input value={path} onChange={e => {setPath(e.target.value);clearResult();}} disabled={busy} required autoComplete="off" spellCheck={false}/></Field>
          </div>
          {method !== 'GET' && <Field label="JSON 请求体"><textarea className="code-input" rows={8} value={payload} onChange={e => {setPayload(e.target.value);clearResult();}} disabled={busy} spellCheck={false}/></Field>}
          <div className="api-request-actions"><Button type="submit" variant="primary" icon="play" busy={busy} disabled={!base.trim() || !path.trim()}>发送请求</Button></div>
        </form></Card>
        {error && <Notice tone="warning">{error}</Notice>}
        {result && <div className="api-response-status" role="status"><Badge tone={result.status >= 200 && result.status < 300 ? 'green' : 'red'}>HTTP {result.status}</Badge><span>{result.duration.toLocaleString()} ms</span>{responseText && <Button variant="ghost" icon="download" onClick={() => downloadFile('api-response.json',responseText,'application/json')}>导出响应</Button>}</div>}
        {responseText && <Card title="响应"><pre className="code-block api-response-code">{responseText}</pre></Card>}
      </div>
    </div>
    {confirmWrite && <Modal title={`发送 ${method} 请求？`} onClose={() => setConfirmWrite(false)} footer={<><Button onClick={() => setConfirmWrite(false)}>取消</Button><Button variant="danger" onClick={() => void run()}>确认发送</Button></>}>
      <p>此请求可能修改或删除服务端数据，提交后可能无法撤销。</p><code className="request-confirm-url">{base.replace(/\/$/,'')}/{path.replace(/^\//,'')}</code>
    </Modal>}
  </>;
}
