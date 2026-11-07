import RecordSource from './RecordSource';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock.js';
import { Info } from './ui';
import { chartQuoteFrom, chartStateFrom, type Quote, type PredictionState } from '../features/market/quotes';
import { ACCENT_COLOR, PRIMARY_SERIES_COLOR, STATE_COLORS } from '../styles/palette';
export type { Quote } from '../features/market/quotes';

const timestamp = (date: string) => Date.parse(date + 'T00:00:00Z');

export default function MarketChart({ rows, states, label, asset }: { asset?: string; rows: Quote[]; states: PredictionState[]; label: string }): React.ReactElement {
  const [picked, setPicked] = useState('');
  const quotes = useMemo(() => [...new Map(rows.flatMap(row => chartQuoteFrom(row) || []).map(row => [row.business_date, row])).values()]
    .sort((left, right) => left.business_date.localeCompare(right.business_date)), [rows]);
  const pricesByDay = useMemo(() => new Map(quotes.filter(row => row.value !== null).map(row => [row.business_date, Number(row.value)])), [quotes]);
  const availableStates = useMemo(() => [...new Map(states.flatMap(row => chartStateFrom(row) || [])
    .filter(row => pricesByDay.has(row.business_date)).map(row => [row.business_date, row])).values()], [states, pricesByDay]);
  const pricedRows = quotes.filter(row => row.value !== null);
  const selected = pricedRows.find(row => row.business_date === picked) || pricedRows.at(-1);
  const hasPrices = pricesByDay.size > 0;
  const hasReturns = quotes.some(row => typeof row.daily_return === 'number');
  const host = useRef<HTMLDivElement>(null);
  const ref = useRef<Highcharts.Chart | null>(null);
  useEffect(() => {
    if (!host.current || !hasPrices) return;
    const style = getComputedStyle(host.current);
    const positive = style.getPropertyValue('--positive').trim() || '#13805c';
    const negative = style.getPropertyValue('--negative').trim() || '#bd4545';
    const prices = quotes.map((row): [number, number | null] => [timestamp(row.business_date), row.value === null ? null : Number(row.value)]);
    const returns = quotes.filter(row => typeof row.daily_return === 'number').map(row => [timestamp(row.business_date), Number(row.daily_return) * 100]);
    const chart = Highcharts.stockChart(host.current, {
      chart: { height: 455, animation: false, backgroundColor: 'transparent', spacing: [10, 6, 10, 6], style: { fontFamily: 'Arial, "PingFang SC", "Microsoft YaHei", sans-serif' } },
      credits: { enabled: false },
      accessibility: { enabled: false },
      lang: { locale: 'zh-CN', rangeSelectorZoom: '', rangeSelectorFrom: '起始', rangeSelectorTo: '结束' },
      time: { timezone: 'UTC' },
      rangeSelector: {
        selected: 2, inputDateFormat: '%Y-%m-%d', inputEditDateFormat: '%Y-%m-%d',
        buttonSpacing: 6, buttonTheme: { fill: '#f5f7f8', stroke: 'transparent', r: 6, style: { color: '#62717b', fontWeight: '500' }, states: { hover: { fill: '#f5f7f8', style: { color: ACCENT_COLOR } }, select: { fill: '#f5f7f8', style: { color: ACCENT_COLOR, fontWeight: '600' } } } },
        labelStyle: { color: '#62717b' }, inputStyle: { color: '#394650' },
        buttons: [{ type: 'month', count: 1, text: '1月' }, { type: 'month', count: 6, text: '6月' }, { type: 'year', count: 1, text: '1年' }, { type: 'all', text: '全部' }],
      },
      navigator: { enabled: true, height: 38, maskFill: 'rgba(234,107,23,0.10)', outlineColor: '#e0e6e9',
        handles: { backgroundColor: '#fff', borderColor: '#b8c8cf' },
        series: { type: 'areaspline', color: '#e5a276', fillOpacity: 0.06, lineWidth: 1 } },
      scrollbar: { enabled: false },
      xAxis: { lineColor: '#e0e6e9', tickColor: '#e0e6e9', labels: { style: { color: '#62717b', fontSize: '11px' } } },
      yAxis: [{ title: { text: label, style: { color: '#62717b', fontSize: '11px' } }, height: returns.length ? '66%' : '100%', opposite: true, gridLineColor: '#e8edf0', labels: { style: { color: '#62717b', fontSize: '11px' } } },
        { title: { text: '日收益率 (%)', style: { color: '#62717b', fontSize: '11px' } }, top: '72%', height: '28%', visible: !!returns.length, offset: 0, gridLineColor: '#e8edf0', labels: { style: { color: '#62717b', fontSize: '11px' } } }],
      tooltip: { shared: true, split: false, xDateFormat: '%Y-%m-%d', borderColor: '#e0e6e9', borderRadius: 8, backgroundColor: '#fff', shadow: false },
      plotOptions: { series: { animation: false, dataGrouping: { enabled: false } } },
      series: [
        { type: 'line', name: label, data: prices, cursor: 'pointer', point: { events: { click() { setPicked(new Date(this.x).toISOString().slice(0, 10)); } } }, color: PRIMARY_SERIES_COLOR, lineWidth: 2,
          tooltip: { valueDecimals: 4, valueSuffix: label === '债券收益率' ? '%' : '' } },
        ...(returns.length ? [{ type: 'column' as const, name: '日收益率', yAxis: 1, data: returns, showInNavigator: false, borderWidth: 0,
          color: positive, negativeColor: negative, tooltip: { valueDecimals: 2, valueSuffix: '%' } }] : []),
        { type: 'scatter', id: 'regimes', name: '回放状态', data: [], showInNavigator: false, marker: { radius: 4 }, tooltip: { pointFormat: '{point.name}' } },
      ],
    });
    ref.current = chart;
    return () => { ref.current = null; chart.destroy(); };
  }, [quotes, label, hasPrices]);
  useEffect(() => {
    const series = ref.current?.series.find(item => item.options.id === 'regimes');
    series?.setData(availableStates.map(state => ({
      x: timestamp(state.business_date), y: pricesByDay.get(state.business_date), name: state.state_name, color: STATE_COLORS[state.state_id % STATE_COLORS.length],
    })));
  }, [availableStates, pricesByDay, label]);
  return <div className="market-chart-view">
    {hasPrices && <>
      <div ref={host} role="img" aria-label={`${label}历史走势，${quotes[0].business_date}至${quotes.at(-1)?.business_date}。完整数值见图表数据。`}/>
      {selected && <div className="market-chart-source"><div>
        <label>交易日 <select aria-label="查看交易日来源" value={selected.business_date} onChange={event => setPicked(event.target.value)}>{pricedRows.map(row => <option key={row.business_date} value={row.business_date}>{row.business_date}</option>)}</select></label>
        <Info label="选择交易日">可选择日期或点击曲线，查看对应记录来源。</Info>
      </div>{(selected.record_id || asset) && <RecordSource key={selected.record_id || selected.business_date} domain={asset ? 'market' : 'indicator'} recordId={selected.record_id} asset={asset} day={selected.business_date}/>}</div>}
      {availableStates.length > 0 && <div className="market-chart-legend" aria-label="回放状态图例">{Array.from(new Map(availableStates.map(state => [state.state_id, state])).values()).map(state => <span key={state.state_id}><i style={{ background: STATE_COLORS[state.state_id % STATE_COLORS.length] }}/>{state.state_name}</span>)}</div>}
      <details className="chart-data-details"><summary>图表数据</summary><div><table className="data-table"><thead><tr><th>日期</th><th className="numeric">{label}</th>{hasReturns && <th className="numeric">日收益率</th>}</tr></thead><tbody>{quotes.map(row => <tr key={row.business_date}><td>{row.business_date}</td><td className="numeric">{row.value}</td>{hasReturns && <td className="numeric">{typeof row.daily_return === 'number' ? (row.daily_return * 100).toFixed(2) + '%' : null}</td>}</tr>)}</tbody></table></div></details>
    </>}
  </div>;
}
