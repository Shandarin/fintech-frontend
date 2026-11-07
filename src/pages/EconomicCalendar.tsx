import { RetryNotice, LoadingStatus } from '../components/RequestStatus';
import React, { useEffect, useState } from 'react';
import { Button, Card, Field, IconButton } from '../components/ui';
import { Icon } from '../components/Icon';
import { requestJson } from '../services/httpClient';

type Event = { IndicatorName: string; IndicatorFact?: string | number; id: string };
type Page = { date: string; items: { record_id: string; payload: string }[]; next_cursor: string };
type Day = { day: string; events: Event[] };
const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const shift = (day: string, offset: number) => { const date = new Date(day + 'T12:00:00'); date.setDate(date.getDate() + offset); return dayKey(date); };
const actual = (value: Event['IndicatorFact']) => {
  if (value == null || String(value).trim() === '') return '';
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric.toLocaleString('zh-CN', { maximumFractionDigits: 2 }) : String(value).trim().replace(/^(?:—|-|--|null|N\/A)$/i, '');
};

export default function EconomicCalendar(): React.ReactElement {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const [date, setDate] = useState('');
  const [result, setResult] = useState<Day[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialError, setInitialError] = useState('');
  const [error, setError] = useState('');
  const [initialize, setInitialize] = useState(0);
  const [reload, setReload] = useState(0);
  const weekday = date ? new Date(date + 'T12:00:00').getDay() : 0;
  const monday = date ? shift(date, -((weekday + 6) % 7)) : '';

  useEffect(() => {
    const controller = new AbortController();
    setInitialLoading(true);
    setInitialError('');
    requestJson('/market-api/v1', 'economic-calendar?dataset=main&limit=1', { signal: controller.signal }).then(response => {
      const page = response.body as Page;
      if (response.status !== 200 || !Array.isArray(page?.items)) throw new Error('Invalid calendar response');
      if (!controller.signal.aborted && /^\d{4}-\d{2}-\d{2}$/.test(page.date)) setDate(current => current || page.date);
    }).catch(() => { if (!controller.signal.aborted) setInitialError('经济日历暂时无法加载'); })
      .finally(() => { if (!controller.signal.aborted) setInitialLoading(false); });
    return () => controller.abort();
  }, [initialize]);

  useEffect(() => {
    if (!monday) return;
    const controller = new AbortController();
    setResult([]);
    setLoading(true);
    setError('');
    async function loadDay(day: string): Promise<Day> {
      const query = new URLSearchParams({ dataset: 'main', limit: '1000', date: day });
      const events: Event[] = [];
      const seen = new Set<string>();
      for (;;) {
        const response = await requestJson('/market-api/v1', 'economic-calendar?' + query, { signal: controller.signal });
        const page = response.body as Page;
        if (response.status !== 200 || !Array.isArray(page?.items) ||
          (page.next_cursor != null && typeof page.next_cursor !== 'string')) throw new Error('Invalid calendar response');
        for (const row of page.items) {
          const event = JSON.parse(row.payload) as Omit<Event, 'id'>;
          if (!event || typeof event !== 'object' || Array.isArray(event) || typeof row.record_id !== 'string' ||
            (event.IndicatorFact != null && typeof event.IndicatorFact !== 'string' && typeof event.IndicatorFact !== 'number')) throw new Error('Invalid calendar event');
          if (typeof event.IndicatorName === 'string' && event.IndicatorName.trim()) events.push({ ...event, id: row.record_id });
        }
        if (!page.next_cursor) break;
        if (seen.has(page.next_cursor)) throw new Error('Repeated calendar cursor');
        seen.add(page.next_cursor);
        query.set('cursor', page.next_cursor);
      }
      return { day, events };
    }
    Promise.allSettled(Array.from({ length: 7 }, (_, index) => loadDay(shift(monday, index)))).then(results => {
      if (controller.signal.aborted) return;
      const loaded = results.flatMap(item => item.status === 'fulfilled' ? [item.value] : []);
      setResult(loaded);
      if (loaded.length < 7) setError(loaded.length ? '部分日期暂时无法加载' : '经济日历暂时无法加载');
      setLoading(false);
    });
    return () => controller.abort();
  }, [monday, reload]);

  function retry() {
    if (date) { setInitialError(''); setReload(value => value + 1); }
    else setInitialize(value => value + 1);
  }

  const available = result.filter(day => day.events.length > 0);
  return <div className="market-calendar">
    <div className="calendar-controls">
      <div className="calendar-week-nav">
        <IconButton icon="chevron" label="上一周" className="calendar-prev" onClick={() => setDate(shift(date || today, -7))} />
        {monday && <strong>{monday.slice(0, 4)} 年 {Number(monday.slice(5, 7))} 月 {Number(monday.slice(8))} 日 — {Number(shift(monday, 6).slice(5, 7))} 月 {Number(shift(monday, 6).slice(8))} 日</strong>}
        <IconButton icon="chevron" label="下一周" onClick={() => setDate(shift(date || today, 7))} />
        <Button onClick={() => setDate(today)}>今天</Button>
      </div>
      <div className="calendar-date-controls">
        <Field label="日期"><input type="date" value={date} onChange={event => { if (event.target.value) setDate(event.target.value); }} /></Field>
        <IconButton icon="refresh" label="刷新经济日历" disabled={loading || initialLoading} onClick={retry} />
      </div>
    </div>
    {(error || initialError) && <RetryNotice message={error || initialError} onRetry={retry}/>}
    {(loading || initialLoading) && <LoadingStatus message="正在加载日历"/>}
    {available.length > 0 && <Card className="economic-agenda">
      {available.map(({ day, events }) => <section className={`agenda-day${day === today ? ' agenda-today' : ''}`} key={day} aria-label={day}>
        <header className="agenda-date"><time dateTime={day} aria-current={day === today ? 'date' : undefined}><span>周{'日一二三四五六'[new Date(day + 'T12:00:00').getDay()]}</span><strong>{Number(day.slice(8))}</strong><small>{Number(day.slice(5, 7))} 月</small></time></header>
        <ul className="agenda-events">{events.map(event => <li key={event.id}><span>{event.IndicatorName}</span>{actual(event.IndicatorFact) !== '' && <strong aria-label={'公布值 ' + actual(event.IndicatorFact)}>{actual(event.IndicatorFact)}</strong>}</li>)}</ul>
      </section>)}
    </Card>}
  </div>;
}
