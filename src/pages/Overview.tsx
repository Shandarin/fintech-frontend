import React, { useEffect, useState } from 'react';
import { useApp } from '../state/AppContext';
import { Button, Card, IconButton, Modal, PageHead, Stat } from '../components/ui';
import { TimeChart } from '../components/charts';
import { Icon } from '../components/Icon';
import { downloadFile } from '../lib/files';
import { pages } from '../services/pagedApi';
import { requestJson } from '../services/httpClient';

const WIDGETS = [{id:'trend',title:'跨资产走势',width:'wide'}, {id:'state',title:'沪深300 回放状态',width:'narrow'},
  {id:'heatmap',title:'状态变化',width:'wide'}, {id:'alerts',title:'最新预警',width:'narrow'}];
const benchmarks = [{name:'沪深300',group:'equity'}, {name:'标普500',group:'equity'}, {name:'COMEX黄金期货',group:'commodity'}, {name:'美元指数DXY',group:'fx'}];
type Price = {business_date:string; value:string; daily_return:number | null};
type Prediction = {business_date:string; asset_id:string; state_id:number; state_name:string; probabilities:number[]};
const palette = ['#366dbc','#b88716','#9653a5'];

export default function Overview(): React.ReactElement {
  const app = useApp();
  const {state,user} = app;
  const [customize,setCustomize] = useState(false), [widgets,setWidgets] = useState(state.widgets), [drag,setDrag] = useState<string|null>(null);
  const [quotes,setQuotes] = useState<Record<string,Price[]>>({});
  const [errors,setErrors] = useState<Record<string,string>>({});
  const [history,setHistory] = useState<Prediction[]>();
  const [modelError,setModelError] = useState('');
  const allowed = benchmarks.filter(b => !user || user.allowedClasses.some(c => c === b.group));
  useEffect(() => {
    const c = new AbortController();
    async function load(name:string) {
      const latest = await requestJson('/market-api/v1','market/latest?' + new URLSearchParams({asset_id:name,dataset:'main'}),{signal:c.signal});
      if (latest.status !== 200) throw new Error('行情读取失败');
      const end = (latest.body as {business_date?:string}).business_date;
      if (!end) return [];
      const start = new Date(end + 'T00:00:00Z');
      start.setUTCDate(start.getUTCDate()-90);
      return pages<Price>('market-api/v1/market/daily-return',c.signal,{asset_id:name,dataset:'main',from:start.toISOString().slice(0,10),to:end});
    }
    for (const {name} of allowed) load(name).then(rows => {
      if (!c.signal.aborted) setQuotes(old => ({...old,[name]:rows}));
    }).catch(() => { if (!c.signal.aborted) setErrors(old => ({...old,[name]:'行情读取失败'})); });
    return () => c.abort();
  }, [user]);
  useEffect(() => {
    const c = new AbortController();
    async function load() {
      const [models,sessions] = await Promise.all([
        pages<{model_id:string;asset_id:string}>('api/v1/models',c.signal),
        pages<{model_id:string;session_id:string;status:string}>('api/v1/stream/sessions',c.signal),
      ]);
      const session = sessions.find(s => s.status === 'COMPLETED' && models.some(m => m.asset_id === '沪深300' && m.model_id === s.model_id));
      return session ? pages<Prediction>('api/v1/regimes',c.signal,{session_id:session.session_id}) : [];
    }
    load().then(rows => { if (!c.signal.aborted) setHistory(rows); }).catch(() => { if (!c.signal.aborted) setModelError('回放数据读取失败'); });
    return () => c.abort();
  }, []);
  const latest = history?.at(-1);
  const pending = modelError || (history ? '暂无已完成的回放' : '正在读取回放…');
  const comparable = allowed.filter(b => quotes[b.name]?.length).map(b => ({name:b.name, byDay:new Map(quotes[b.name].map(r => [r.business_date,Number(r.value)]))}));
  const days = comparable.length ? [...comparable[0].byDay.keys()].filter(d => comparable.every(b => b.byDay.has(d))) : [];
  const series = comparable.map(b => ({name:b.name,values:days.map(d => (b.byDay.get(d)! / b.byDay.get(days[0])! - 1)*100)}));
  const alerts = state.alerts.filter(a => a.status !== 'resolved');
  const exportReport = () => downloadFile('市场总览.json',JSON.stringify({quotes:Object.fromEntries(allowed.map(b => [b.name,quotes[b.name]?.at(-1)])),replay:latest,alerts},null,2),'application/json');
  const reorder = (id: string, target: string) => { const next = [...widgets]; const fromIndex = next.indexOf(id), targetIndex = next.indexOf(target); if (fromIndex < 0 || targetIndex < 0) return; next.splice(fromIndex, 1); next.splice(targetIndex, 0, id); setWidgets(next); };
  const content = (id:string) => {
    if (id === 'trend') return <Card title="跨资产走势" subtitle="近 90 天 · 以首个共同交易日为基准的累计收益率"><div className="card-inner">
      {days.length ? <><p>{series.map(s => s.name).join(' · ')}</p><TimeChart labels={days} series={series}/></> : <p>{allowed.every(b => errors[b.name] || quotes[b.name]) ? '暂无可比较的行情' : '正在读取行情…'}</p>}</div></Card>;
    if (id === 'state') return <Card title="沪深300 回放状态" action={<Button onClick={() => app.navigate('regimes')}>查看回放</Button>}><div className="card-inner">
      {latest ? <><h2>{latest.state_name}</h2><p>{latest.business_date} · 状态归属概率 {(latest.probabilities[latest.state_id]*100).toFixed(1)}%</p></> : <p>{pending}</p>}</div></Card>;
    if (id === 'heatmap') return <Card title="沪深300 状态变化"><div className="card-inner">{history?.length ? <>
      <p>{history[0].business_date} 至 {latest!.business_date} · {history.length} 个交易日</p>
      <div style={{display:'flex',gap:2}}>{history.map(r => <span key={r.business_date} title={r.business_date+' · '+r.state_name} style={{flex:1,height:22,background:palette[r.state_id]}}/>)}</div>
      <p>{Array.from(new Map(history.map(r => [r.state_id,r.state_name]))).map(([id,name]) => <span key={id} style={{marginRight:14}}><b style={{color:palette[id]}}>● </b>{name}</span>)}</p></> : <p>{pending}</p>}</div></Card>;
    if (id === 'alerts') return <Card title="最新预警"><div className="card-inner">{alerts.length ? alerts.slice(0,3).map(a => <Button key={a.id} onClick={() => app.openAlert(a.id)}>{a.title}</Button>) : '暂无待处理预警'}</div></Card>;
    return null;
  };
  return <><PageHead title="市场总览" actions={<><Button onClick={() => {setWidgets(state.widgets);setCustomize(true);}}>自定义看板</Button><Button onClick={exportReport}>导出快照</Button></>}/>
    <div className="market-stats">{allowed.map(b => { const last=quotes[b.name]?.at(-1); return <Stat key={b.name} label={b.name} value={last ? Number(last.value).toLocaleString('zh-CN',{maximumFractionDigits:2}) : '—'} detail={last ? last.business_date + (last.daily_return != null ? ' · 日收益率 '+(last.daily_return*100).toFixed(2)+'%' : '') : errors[b.name] || (quotes[b.name] ? '暂无行情' : '读取中…')}/>; })}</div>
    <div className="dashboard-grid">{state.widgets.map(id => <div key={id} className={'widget widget-'+(WIDGETS.find(w=>w.id===id)?.width || 'wide')}>{content(id)}</div>)}</div>
    {customize && <Modal title="让看板更适合你的研究" onClose={() => setCustomize(false)} footer={<><Button onClick={() => setWidgets(WIDGETS.map(w => w.id))}>恢复默认布局</Button><Button variant="primary" onClick={() => { app.update(s => ({ ...s, widgets }), '调整个人看板', 'self'); setCustomize(false); app.notify('看板布局已保存'); }}>保存看板</Button></>}><p className="muted">勾选需要的组件；拖动已选组件调整顺序，也可以使用上下箭头。</p><div className="widget-options">{[...widgets, ...WIDGETS.map(w => w.id).filter(id => !widgets.includes(id))].map(id => <div key={id} className={`widget-option ${drag === id ? 'dragging' : ''}`} draggable={widgets.includes(id)} onDragStart={() => setDrag(id)} onDragEnd={() => setDrag(null)} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (drag) reorder(drag, id); setDrag(null); }}><Icon name="grip" size={16}/><label><input type="checkbox" checked={widgets.includes(id)} onChange={e => setWidgets(w => e.target.checked ? [...w, id] : w.filter(x => x !== id))}/>{WIDGETS.find(w => w.id === id)?.title}</label><IconButton icon="arrowup" label="向上移动" disabled={!widgets.includes(id) || widgets.indexOf(id) === 0} onClick={() => reorder(id, widgets[widgets.indexOf(id) - 1])}/><IconButton icon="arrowdown" label="向下移动" disabled={!widgets.includes(id) || widgets.indexOf(id) === widgets.length - 1} onClick={() => reorder(id, widgets[widgets.indexOf(id) + 1])}/></div>)}</div><p className="small muted">布局只保存在当前浏览器，正式接入后可保存到用户配置服务。</p></Modal>}
  </>;
}

