import React, { useState } from 'react';
import { useApp } from '../state/AppContext';
import { DATES, SNAPSHOT } from '../data/mock';
import { daysBefore } from '../lib/analytics';
import { Button, Field, Modal, Notice } from './ui';
export function DateRange() {
  const { from, to, setRange } = useApp(); const [open, setOpen] = useState(false), [a, setA] = useState(from), [b, setB] = useState(to);
  const presets: [string, number][] = [['1M', 30], ['3M', 90], ['6M', 180], ['1Y', 365]];
  const error = !a || !b ? '请选择起止日期' : a > b ? '开始日期不能晚于结束日期' : a < DATES[0] || b > SNAPSHOT ? `可用样本范围：${DATES[0]} 至 ${SNAPSHOT}` : '';
  return <><div className="date-range"><div className="segments">{presets.map(([label, n]) => <button type="button" key={label} onClick={() => setRange(daysBefore(SNAPSHOT, n) < DATES[0] ? DATES[0] : daysBefore(SNAPSHOT, n), SNAPSHOT)} className={to === SNAPSHOT && from === (daysBefore(SNAPSHOT, n) < DATES[0] ? DATES[0] : daysBefore(SNAPSHOT, n)) ? 'active' : ''}>{label}</button>)}</div><Button icon="calendar" onClick={() => { setA(from); setB(to); setOpen(true); }} className="date-button">{from.slice(5)} — {to.slice(5)}</Button></div>{open && <Modal title="选择研究区间" onClose={() => setOpen(false)} footer={<><Button onClick={() => setOpen(false)}>取消</Button><Button variant="primary" disabled={!!error} onClick={() => { setRange(a, b); setOpen(false); }}>应用日期范围</Button></>}><div className="form-grid"><Field label="开始日期"><input type="date" min={DATES[0]} max={SNAPSHOT} value={a} onChange={e => setA(e.target.value)}/></Field><Field label="结束日期"><input type="date" min={DATES[0]} max={SNAPSHOT} value={b} onChange={e => setB(e.target.value)}/></Field></div>{error && <Notice tone="warning">{error}</Notice>}<p className="muted small">日期范围影响走势图、特征分析与相关性计算。样本使用工作日合成序列，并非真实交易所日历。</p></Modal>}</>;
}
