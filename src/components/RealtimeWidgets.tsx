import React,{useEffect,useRef,useState} from 'react';
import Highcharts from 'highcharts/highstock.js';
import {PRIMARY_SERIES_COLOR} from '../styles/palette';
import {Button,IconButton,Field,Modal,Info} from './ui';
import {instrumentName,issueText,priceFields,matchInstrumentCode,marketRequest,watchlistReturn,type IntradayResponse,type SearchResponse,type QuoteView,type Intraday} from '../services/realtimeMarket';
import {signedPercent} from '../lib/format';
import {RetryNotice} from './RequestStatus';
import type {RealtimeMarket} from '../state/useRealtimeMarket';

export function AddWatchlist({market}:{market:RealtimeMarket}) {
  const [open,setOpen]=useState(false),[code,setCode]=useState(''),[error,setError]=useState('');
  const [found,setFound]=useState<SearchResponse|null>(null),[loading,setLoading]=useState(false),[adding,setAdding]=useState(false);
  const local=matchInstrumentCode(code,market.catalog);
  const matches=[...new Map([...local,...(found?.items||[])].map(i=>[i.instrument_id,i])).values()];
  useEffect(()=>{
    setFound(null);setError('');if(!open || !code.trim()){setLoading(false);return;}
    const controller=new AbortController();let timer:ReturnType<typeof setTimeout>;setLoading(true);
    const search=async()=>{
      try{
        const result=await marketRequest<SearchResponse>('search?'+new URLSearchParams({q:code.trim()}),controller.signal);
        if(controller.signal.aborted)return;
        setFound(result);market.remember(result.items);
        if(result.status==='PENDING'){timer=setTimeout(search,5000);return;}
        if(result.status!=='OK')setError(issueText(result.status));
      }catch(e){if(!controller.signal.aborted)setError(e instanceof Error?e.message:'搜索失败');}
      if(!controller.signal.aborted)setLoading(false);
    };
    timer=setTimeout(search,600);return()=>{controller.abort();clearTimeout(timer);};
  },[open,code]);
  const add=async(id:string)=>{
    if(market.watch.includes(id)){setError('已在自选列表中');return;}
    if(market.watch.length>=100){setError('自选列表最多添加 100 个资产');return;}
    setAdding(true);setError('');
    try{
      const result=await marketRequest<{items:QuoteView[];errors:{code:string}[]}>('quotes?'+new URLSearchParams({instrument_ids:id}),AbortSignal.timeout(12000));
      if(!result.items.some(item=>item.quote?.instrument_id===id)){setError(issueText(result.errors[0]?.code||'UNVERIFIED')+'，暂时无法添加');return;}
      market.setWatch([...market.watch,id]);market.setSelected(id);setOpen(false);setCode('');
    }catch(e){setError(e instanceof Error?e.message:'报价验证失败');}finally{setAdding(false);}
  };
  const submit=()=>{if(matches.length===1)void add(matches[0].instrument_id);else setError(matches.length?'请选择具体市场的资产':loading?'正在搜索，请稍候':'没有找到支持的证券');};
  return <><IconButton icon="plus" label="添加自选" onClick={()=>{setOpen(true);setError('');}}/>
    {open && <Modal title="添加自选" onClose={()=>{if(!adding){setOpen(false);setCode('');}}} footer={<Button variant="primary" disabled={!code.trim() || adding} busy={adding} onClick={submit}>添加</Button>}>
      <form onSubmit={e=>{e.preventDefault();if(!adding)submit();}}><Field label="代码或名称" error={error}><input value={code} disabled={adding} onChange={e=>setCode(e.target.value)} placeholder="例如 600036、招商银行、00700" autoComplete="off"/></Field></form>
      {loading && <p role="status">{found?.status==='PENDING'?'等待来源请求预算…':'正在搜索证券…'}</p>}
      {matches.length>0 && <div className="realtime-code-matches">{matches.map(i=><Button key={i.instrument_id} disabled={adding} onClick={()=>void add(i.instrument_id)}>{instrumentName(i.instrument_id)} · {i.venue} · {i.asset_type}</Button>)}</div>}
      {!loading && found?.status==='OK' && !matches.length && <p>没有找到支持的股票、ETF 或指数。</p>}
    </Modal>}
  </>;
}
function Status({market}:{market:RealtimeMarket}) {
  if(market.status==='已连接' && !market.failure)return null;
  return <p className="small muted" role="status">{market.status}{market.failure?' · '+market.failure:''}{market.status!=='已连接' && Object.keys(market.quotes).length?'；下方报价不代表当前状态':''}{market.status!=='已连接' && <Button variant="ghost" onClick={market.retry}>重试连接</Button>}</p>;
}
export function RealtimeWatchlist({market}:{market:RealtimeMarket}) {
  const [previousCloses,setPreviousCloses]=useState<Record<string,IntradayResponse>>({});
  const [closeErrors,setCloseErrors]=useState<Record<string,string>>({});
  useEffect(()=>{
    const controller=new AbortController(); let timer:ReturnType<typeof setTimeout>;
    setPreviousCloses({}); setCloseErrors({});
    const refresh=async()=>{
      await Promise.all(market.watch.map(async id=>{
        try {
          const result=await marketRequest<IntradayResponse>('intraday?'+new URLSearchParams({instrument_id:id}),controller.signal);
          if(!controller.signal.aborted){setPreviousCloses(current=>({...current,[id]:result}));setCloseErrors(current=>({...current,[id]:result.error || (result.data?'':issueText(result.status))}));}
        } catch(error) { if(!controller.signal.aborted){setPreviousCloses(current=>{const next={...current};delete next[id];return next;});setCloseErrors(current=>({...current,[id]:error instanceof Error?error.message:'昨收价读取失败'}));} }
      }));
      if(!controller.signal.aborted)timer=setTimeout(refresh,60000);
    };
    void refresh(); return ()=>{controller.abort();clearTimeout(timer);};
  },[market.watch,market.connected]);
  const [venue,setVenue]=useState('ALL');
  const [sort,setSort]=useState<'NONE'|'ASC'|'DESC'>('NONE');
  const venueOf=(id:string)=>market.catalog.find(i=>i.instrument_id===id)?.venue || id.split(':')[1];
  const venues=[...new Set(market.watch.map(venueOf))];
  const rows=market.watch.filter(id=>venue==='ALL' || !venues.includes(venue) || venueOf(id)===venue);
  if(sort!=='NONE')rows.sort((a,b)=>{
    const av=market.quotes[a]?.quote,bv=market.quotes[b]?.quote;
    const ap=av?priceFields(av)[0]?.price.value:null,bp=bv?priceFields(bv)[0]?.price.value:null;
    if(ap==null)return bp==null?0:1;if(bp==null)return -1;
    return (Number(ap)-Number(bp))*(sort==='ASC'?1:-1);
  });
  const venueName=(v:string)=>({XSHG:'沪市',XSHE:'深市',XHKG:'港股',US:'美股',OTC:'外汇',SPOT:'外汇'} as Record<string,string>)[v]||v;
  return <div className="realtime-table-panel">
    <Status market={market}/>
    <div className="realtime-table-scroll"><table className="realtime-table">
      <thead><tr><th scope="col"><select aria-label="自选市场" value={venues.includes(venue)?venue:'ALL'} onChange={e=>setVenue(e.target.value)}><option value="ALL">全部</option>{venues.map(v=><option key={v} value={v}>{venueName(v)}</option>)}</select></th>
        <th scope="col" aria-sort={sort==='ASC'?'ascending':sort==='DESC'?'descending':'none'}><button type="button" onClick={()=>setSort(sort==='ASC'?'DESC':'ASC')}>当前价 <span aria-hidden="true">{sort==='ASC'?'↑':sort==='DESC'?'↓':'↕'}</span></button></th>
        <th scope="col">涨跌幅</th><th scope="col">成交量</th><th scope="col">总市值</th><th scope="col">年初至今</th><th scope="col"><Info label="自选指标说明">涨跌幅按当前成交价或指数值相对上一交易日收盘价计算；缺少有效昨收价或交易日期不匹配时显示 —。成交量、市值及年初至今收益尚未提供。外汇参考汇率不是可成交报价。</Info></th>
      </tr></thead>
      <tbody>{rows.map(id=>{
        const view=market.quotes[id],q=view?.quote,fields=q?priceFields(q):[];
        const v=venueOf(id),tag=({XSHG:'SH',XSHE:'SZ',XHKG:'HK',US:'US',OTC:'FX',SPOT:'FX'} as Record<string,string>)[v]||v;
        const code=id.startsWith('FX:')?id.split(':').slice(-2).join('/'):id.split(':').at(-1);
        const error=market.errors[id]||view?.error;
        const change=watchlistReturn(q,previousCloses[id]);
        return <tr key={id} className={market.selected===id?'selected':''}>
          <th scope="row"><button type="button" className="realtime-asset" aria-pressed={market.selected===id} onClick={()=>market.setSelected(id)}><strong>{instrumentName(id)}</strong><span><b className={'realtime-market-tag tag-'+tag}>{tag}</b> {code}</span></button></th>
          <td className="realtime-current">{fields.length?fields.map(({label,price})=><div key={label}><strong>{price.value}</strong>{label!=='成交' && <small>{label}</small>}</div>):<span className="muted">—</span>}{error && <small className="realtime-row-error">{issueText(error)}</small>}</td>
          <td className={change===null?'muted':change>0?'realtime-change-up':change<0?'realtime-change-down':'muted'} title={change===null?(closeErrors[id] || '缺少同一交易日的报价或有效昨收价'):'昨收 '+previousCloses[id]?.data?.previous_close}>{change===null?'—':signedPercent(change)}</td><td className="muted">—</td><td className="muted">—</td><td className="muted">—</td>
          <td><div className="realtime-row-actions"><Info label={instrumentName(id)+'报价详情'}>{view?<>{q.provider} · {q.feed} · {issueText(view.freshness)}<br/>{fields.map(({label,price})=><span key={label}>{label}来源时间：{price.source_time?new Date(price.source_time).toLocaleString('zh-CN'):'未知'}<br/></span>)}来源状态：{view.source_health}<br/>数据等级：{q.data_tier}；延迟：{q.delay_seconds===null?'未知':q.delay_seconds+' 秒'}；市场状态：{q.market_status}</>:'等待报价'}</Info><IconButton icon="close" label={'移除'+instrumentName(id)} onClick={()=>market.setWatch(market.watch.filter(item=>item!==id))}/></div></td>
        </tr>;
      })}</tbody>
    </table></div>
    {!market.watch.length && <p className="realtime-empty">点击右上角 ＋ 添加自选。</p>}
  </div>;
}
function MinuteChart({data}:{data:Intraday}) {
  const host=useRef<HTMLDivElement>(null);
  const [point,setPoint]=useState(data.points.at(-1));
  useEffect(()=>{
    setPoint(data.points.at(-1));if(!host.current)return;
    const chart=Highcharts.chart(host.current,{
      chart:{height:300,animation:false},title:{text:undefined},credits:{enabled:false},legend:{enabled:false},
      time:{timezone:data.timezone},xAxis:{type:'datetime',dateTimeLabelFormats:{hour:'%H:%M',minute:'%H:%M'}},
      yAxis:{title:{text:data.currency},plotLines:data.previous_close?[{value:Number(data.previous_close),color:'#89949d',width:1,dashStyle:'Dash',label:{text:'昨收 '+data.previous_close}}]:[]},
      tooltip:{xDateFormat:'%Y-%m-%d %H:%M',valueSuffix:' '+data.currency},
      plotOptions:{series:{animation:false}},
      series:[{type:'line',name:data.price_kind==='INDEX_VALUE'?'指数值':'分钟价格',data:data.points.map(p=>[Date.parse(p.time),Number(p.price)]),color:PRIMARY_SERIES_COLOR,lineWidth:2,marker:{enabled:false},point:{events:{click(){setPoint(data.points.find(p=>Date.parse(p.time)===this.x));}}}}],
    });return ()=>chart.destroy();
  },[data]);
  return <><div ref={host} role="img" aria-label={`${instrumentName(data.instrument_id)} ${data.trading_date} 分时走势图`}/>
    <label className="field">查看分钟数据<select value={point?.time||''} onChange={e=>setPoint(data.points.find(p=>p.time===e.target.value))}>{data.points.map(p=><option key={p.time} value={p.time}>{new Date(p.time).toLocaleTimeString('zh-CN',{timeZone:data.timezone,hour:'2-digit',minute:'2-digit'})} · {p.price} {data.currency}</option>)}</select></label>
  </>;
}
export function IntradayWidget({market}:{market:RealtimeMarket}) {
  const result=market.intraday,data=result?.data;
  const today=data?new Intl.DateTimeFormat('en-CA',{timeZone:data.timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()):'';
  return <div className="card-inner">
    <div className="realtime-chart-toolbar"><label>自选资产 <select value={market.selected} onChange={e=>market.setSelected(e.target.value)} aria-label="走势资产">
      {!market.watch.length && <option value="">请先添加自选</option>}{market.watch.map(id=><option key={id} value={id}>{instrumentName(id)}</option>)}
    </select></label><Status market={market}/></div>
    <RetryNotice message={market.intradayError} onRetry={market.retry}/>
    {data ? <><p><strong>{data.trading_date===today?'今日':'最近来源交易日'} · {data.trading_date}</strong> · 腾讯 · {data.timezone} · {issueText(result.freshness||'UNKNOWN')}</p>
      {data.trading_date!==today && <Info label="交易日期说明">休市或来源尚未更新时显示最近来源交易日，不将旧数据标为今日行情。</Info>}
      {result.error && <p role="alert">{issueText(result.error)} · 保留最后有效曲线</p>}
      <MinuteChart data={data}/><Info label="分时数据口径">来源分钟价格，非逐笔成交，不插值补点。分时与实时报价的来源分别标注。</Info></>
      :<p>{!market.selected?'请在实时自选中添加资产。':result?issueText(result.status)+(result.status==='UNSUPPORTED'?'：当前分时接口仅支持目录中的 A 股、港股、ETF 和指数。':''):'正在读取分时数据…'}</p>}
  </div>;
}
