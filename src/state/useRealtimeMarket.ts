import {useEffect,useMemo,useRef,useState} from 'react';
import {validWatch,marketRequest,rememberInstruments,MarketHttpError,validSequence,type Instrument,type QuoteView,type ItemError,type IntradayResponse} from '../services/realtimeMarket';

import {useApp} from './AppContext';

export function useRealtimeMarket(active:boolean,showIntraday:boolean) {
  const [revision,setRevision]=useState(0);
  const retry=()=>setRevision(value=>value+1);
  const {state,update}=useApp();
  const watch=useMemo(()=>validWatch(state.watchlist),[state.watchlist]);
  const setWatch=(ids:string[])=>update(s=>({...s,watchlist:validWatch(ids)}));
  const [selected,setSelected]=useState(watch[0]||'');
  const [catalog,setCatalog]=useState<Instrument[]>([]),[quotes,setQuotes]=useState<Record<string,QuoteView>>({});
  const [errors,setErrors]=useState<Record<string,string>>({}),[status,setStatus]=useState('未连接'),[failure,setFailure]=useState('');
  const [intraday,setIntraday]=useState<IntradayResponse|null>(null),[intradayError,setIntradayError]=useState('');
  const socket=useRef<WebSocket|null>(null),desired=useRef(watch),requestId=useRef(0),latestRequest=useRef('');
  desired.current=watch;
  const send=()=>{if(socket.current?.readyState===WebSocket.OPEN){latestRequest.current=String(++requestId.current);socket.current.send(JSON.stringify({action:'set_subscriptions',request_id:latestRequest.current,instrument_ids:desired.current}));}};
  useEffect(()=>{if(!watch.includes(selected))setSelected(watch[0]||'');send();},[watch]);
  useEffect(()=>{
    setQuotes({});setErrors({});setCatalog([]);setFailure('');
    if(!active){setStatus('未连接');return;}
    const controller=new AbortController();let stopped=false,timer:ReturnType<typeof setTimeout>,retry=0,lastSeen=Date.now(),sequence:{id:string;sequence:number}|null=null;
    let pendingRetry:ReturnType<typeof setTimeout>|undefined;
    const connect=async()=>{
      setStatus(retry?'正在重连':'正在连接');
      try {
        const instruments=await marketRequest<{items:Instrument[]}>('instruments',controller.signal);
        for(const id of desired.current.filter(id=>!instruments.items.some(i=>i.instrument_id===id))){
          const restored=await marketRequest<{status:string;items:Instrument[]}>('search?'+new URLSearchParams({q:id}),controller.signal);
          if(restored.status==='PENDING')throw new Error('正在恢复自选资产，等待来源请求预算');
          instruments.items.push(...restored.items);
        }
        const ticket=await marketRequest<{ticket:string}>('ws-ticket',controller.signal,'POST');
        if(stopped)return;setCatalog(rememberInstruments(instruments.items));
        const url=new URL('/market-ws/v1/market',location.href);url.protocol=location.protocol==='https:'?'wss:':'ws:';url.searchParams.set('ticket',ticket.ticket);
        const ws=new WebSocket(url);socket.current=ws;sequence=null;lastSeen=Date.now();
        ws.onmessage=event=>{
          if(stopped)return;
          try {
            const m=JSON.parse(event.data);
            if(!validSequence(sequence,m)){setFailure('消息序号中断，正在重新同步');ws.close();return;}
            sequence={id:m.connection_id,sequence:m.sequence};lastSeen=Date.now();
            if(m.type==='hello'){retry=0;setStatus('已连接');setFailure('');send();}
            if(m.type==='subscription_ack' && m.request_id===latestRequest.current){
              const rejected:ItemError[]=m.rejected;setErrors(Object.fromEntries(rejected.map(e=>[e.instrument_id,e.code])));
              if(pendingRetry)clearTimeout(pendingRetry);
              if(rejected.some(e=>['PENDING','UNVERIFIED'].includes(e.code)))pendingRetry=setTimeout(send,15000);
            }
            if((m.type==='snapshot' && m.request_id===latestRequest.current) || m.type==='quote_update') {
              setQuotes(Object.fromEntries((m.items as QuoteView[]).filter(v=>v.quote && desired.current.includes(v.quote.instrument_id)).map(v=>[v.quote.instrument_id,v])));
            }
            if(m.type==='error')setFailure('订阅请求被拒绝：'+m.code);
          }catch{setFailure('行情协议解析失败，正在重新连接');ws.close();}
        };
        ws.onclose=()=>{if(stopped)return;socket.current=null;setStatus('连接中断');timer=setTimeout(connect,Math.min(60000,7000*2**retry++));};
        ws.onerror=()=>ws.close();
      }catch(e){
        if(stopped)return;setStatus('连接失败');setFailure(e instanceof Error?e.message:'行情连接失败');
        if(!(e instanceof MarketHttpError && [401,403,503].includes(e.status)))timer=setTimeout(connect,Math.min(60000,7000*2**retry++));
      }
    };
    void connect();
    const health=setInterval(()=>{if(socket.current && Date.now()-lastSeen>45000)socket.current.close();},5000);
    return ()=>{stopped=true;controller.abort();clearTimeout(timer);clearTimeout(pendingRetry);clearInterval(health);socket.current?.close();socket.current=null;};
  },[active,revision]);
  useEffect(()=>{
    setIntraday(null);setIntradayError('');
    if(!active || !showIntraday || !selected)return;
    const controller=new AbortController();let timer:ReturnType<typeof setTimeout>;
    const refresh=async()=>{
      try{
        const result=await marketRequest<IntradayResponse>('intraday?'+new URLSearchParams({instrument_id:selected}),controller.signal);
        if(controller.signal.aborted)return;setIntraday(result);setIntradayError('');
        if(!['UNSUPPORTED','DISABLED'].includes(result.status))timer=setTimeout(refresh,result.status==='PENDING'?5000:60000);
      }catch(e){if(!controller.signal.aborted){setIntradayError(e instanceof Error?e.message:'分时行情读取失败');if(!(e instanceof MarketHttpError && [401,403,503].includes(e.status)))timer=setTimeout(refresh,30000);}}
    };
    void refresh();return ()=>{controller.abort();clearTimeout(timer);};
  },[active,showIntraday,selected,revision]);
  return {connected:status==='已连接',retry,watch,setWatch,remember:(items:Instrument[])=>setCatalog(current=>[...new Map([...current,...rememberInstruments(items)].map(i=>[i.instrument_id,i])).values()]),selected,setSelected,catalog,quotes,errors,status,failure,intraday,intradayError};
}
export type RealtimeMarket=ReturnType<typeof useRealtimeMarket>;
