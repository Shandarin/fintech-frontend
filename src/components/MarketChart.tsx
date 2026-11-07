import RecordSource from './RecordSource';
import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock.js';

export type Quote = { record_id?:string; business_date: string; value: string | null; daily_return?: number | null };
type Prediction = { business_date: string; state_name: string; state_id: number };
const colors = ['#366dbc', '#b88716', '#9653a5'];
const timestamp = (date: string) => Date.parse(date + 'T00:00:00Z');

export default function MarketChart({ rows, states, label, asset }: { asset?:string; rows: Quote[]; states: Prediction[]; label: string }): React.ReactElement {
  const [picked,setPicked] = useState('');
  const selected = rows.find(row => row.business_date === picked) || rows.at(-1);
  const host = useRef<HTMLDivElement>(null);
  const ref = useRef<Highcharts.Chart | null>(null);
  useEffect(() => {
    if (!host.current) return;
    const style = getComputedStyle(host.current);
    const prices = rows.map((r): [number, number | null] => [timestamp(r.business_date), r.value == null ? null : Number(r.value)]);
    const returns = rows.filter(r => r.daily_return != null).map(r => [timestamp(r.business_date), Number(r.daily_return) * 100]);
    const chart = Highcharts.stockChart(host.current, {
      chart: { height: 455, animation: false },
      lang: { locale: 'zh-CN', rangeSelectorZoom: '区间', rangeSelectorFrom: '起始', rangeSelectorTo: '结束' },
      time: { timezone: 'UTC' },
      rangeSelector: { selected: 2, inputDateFormat: '%Y-%m-%d', inputEditDateFormat: '%Y-%m-%d',
        buttons: [{ type: 'month', count: 1, text: '1月' }, { type: 'month', count: 6, text: '6月' },
          { type: 'year', count: 1, text: '1年' }, { type: 'all', text: '全部' }] },
      navigator: { enabled: true, height: 48, maskFill: 'rgba(97,109,225,0.23)',
        series: { type: 'areaspline', color: '#313841', fillOpacity: 0.08, lineWidth: 1 } },
      scrollbar: { enabled: true },
      yAxis: [{ title: { text: label }, height: returns.length ? '66%' : '100%', opposite: true },
        { title: { text: '日收益率 (%)' }, top: '72%', height: '28%', visible: !!returns.length, offset: 0 }],
      tooltip: { shared: true, split: false, xDateFormat: '%Y-%m-%d' },
      plotOptions: { series: { animation: false, dataGrouping: { enabled: false } } },
      series: [
        { type: 'line', name: label, data: prices, cursor:'pointer', point:{events:{click(){setPicked(new Date(this.x).toISOString().slice(0,10));}}}, color: '#3574bb', lineWidth: 1.5,
          tooltip: { valueDecimals: 4, valueSuffix: label === '债券收益率' ? '%' : '' } },
        ...(returns.length ? [{ type: 'column' as const, name: '日收益率', yAxis: 1,
          data: returns, showInNavigator: false, borderWidth: 0,
          color: style.getPropertyValue('--positive').trim() || '#13805c',
          negativeColor: style.getPropertyValue('--negative').trim() || '#bd4545',
          tooltip: { valueDecimals: 2, valueSuffix: '%' } }] : []),
        { type: 'scatter', id: 'regimes', name: '回放状态', data: [], showInNavigator: false,
          marker: { radius: 4 }, tooltip: { pointFormat: '{point.name}' } },
      ],
    });
    ref.current = chart;
    return () => { ref.current = null; chart.destroy(); };
  }, [rows, label]);
  useEffect(() => {
    const series = ref.current?.series.find(s => s.options.id === 'regimes');
    const prices = new Map(rows.map(r => [r.business_date, Number(r.value)]));
    series?.setData(states.filter(s => prices.has(s.business_date)).map(s => ({
      x: timestamp(s.business_date), y: prices.get(s.business_date), name: s.state_name, color: colors[s.state_id % colors.length],
    })));
  }, [rows, states, label]);
  return <><div ref={host} role="group" aria-label={label + '历史行情图'} />
    {selected && <div><span>{selected.business_date} · 点击曲线上的数据点可查看该日来源 </span><RecordSource key={selected.record_id || selected.business_date} domain={asset ? 'market' : 'indicator'} recordId={selected.record_id} asset={asset} day={selected.business_date}/></div>}
    {!!states.length && <p>回放状态 {Array.from(new Map(states.map(s => [s.state_id,s])).values()).map(s =>
      <span key={s.state_id} style={{ marginInlineStart: 10 }}><b style={{color:colors[s.state_id % colors.length]}}>●</b> {s.state_name}</span>)}</p>}</>;
}
