import React, { useEffect, useState } from 'react';
import { Button, Card, Notice } from '../components/ui';
import { requestJson } from '../services/httpClient';

type Event = { IndicatorName: string; IndicatorFact?: string | number; id: string };
type Page = { date: string; items: {record_id:string; payload:string}[]; next_cursor: string };
const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const shift = (day: string, offset: number) => { const date = new Date(day+'T12:00:00'); date.setDate(date.getDate()+offset); return dayKey(date); };
const actual = (value: Event['IndicatorFact']) => {
  if (value == null || String(value).trim() === '') return '';
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric.toLocaleString('zh-CN',{maximumFractionDigits:2}) : String(value).replace(/^(?:—|-|--|null|N\/A)$/i,'');
};

export default function EconomicCalendar(): React.ReactElement {
  const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const [date, setDate] = useState('');
  const [result, setResult] = useState<{day:string; events:Event[]}[]>();
  const [error, setError] = useState('');
  const weekday = new Date(date+'T12:00:00').getDay();
  const monday = date ? shift(date,-((weekday+6)%7)) : '';
  useEffect(() => {
    const c = new AbortController();
    requestJson('/market-api/v1','economic-calendar?dataset=main&limit=1',{signal:c.signal})
      .then(response => {
        const page = response.body as Page;
        if (response.status !== 200 || !Array.isArray(page?.items)) throw new Error('经济日历读取失败');
        if (!c.signal.aborted) {
          if (page.date) setDate(current => current || page.date);
          else setError('暂无经济日历数据');
        }
      }).catch(e => { if (!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  }, []);
  useEffect(() => {
    const c = new AbortController();
    if (!monday) return;
    setResult(undefined); setError('');
    async function loadDay(day: string) {
      const query = new URLSearchParams({dataset:'main',limit:'1000',date:day});
      const events: Event[] = [];
      do {
        const response = await requestJson('/market-api/v1','economic-calendar?'+query,{signal:c.signal});
        const page = response.body as Page;
        if (response.status !== 200 || !Array.isArray(page?.items)) throw new Error('经济日历读取失败');
        events.push(...page.items.map(r => ({...JSON.parse(r.payload),id:r.record_id})));
        query.set('cursor',page.next_cursor);
      } while (query.get('cursor'));
      return {day,events};
    }
    Promise.all(Array.from({length:7},(_,i) => loadDay(shift(monday,i))))
      .then(days => { if (!c.signal.aborted) setResult(days); })
      .catch(e => { if (!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  }, [monday]);
  return <Card title="经济日历"><div className="card-inner">
    <div className="filter-row"><Button onClick={() => setDate(shift(date || today,-7))}>上周</Button>
      <label>事件日期 <input type="date" value={date} onChange={e => { if(e.target.value) setDate(e.target.value); }}/></label>
      <Button onClick={() => setDate(today)}>今天</Button><Button onClick={() => setDate(shift(date || today,7))}>下周</Button>
      {monday && <span>{monday} — {shift(monday,6)}</span>}</div>
    {error ? <Notice tone="warning">{error}</Notice> : !result ? <p role="status">正在读取经济事件…</p> :
      <>{!result.some(day => day.events.length) && <p role="status">本周暂无经济事件，请选择其他日期。</p>}<div className="economic-week-scroll"><div className="economic-week">{result.map(({day,events},i) =>
        <section key={day} className={`economic-day${day === today ? ' economic-day-today' : ''}`} aria-label={day}>
          <h3 aria-current={day === today ? 'date' : undefined}>{Number(day.slice(8))}号 星期{'一二三四五六日'[i]}</h3>
          <ul>{events.map(event => <li key={event.id}><span>{event.IndicatorName}</span>{actual(event.IndicatorFact) !== '' && <strong>{actual(event.IndicatorFact)}</strong>}</li>)}</ul>
        </section>)}</div></div></>}
  </div></Card>;
}


