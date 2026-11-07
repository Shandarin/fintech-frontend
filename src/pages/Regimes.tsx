import React, { useState } from 'react';
import { PageHead, Tabs } from '../components/ui';
import LiveReplay from './LiveReplay';

const sections = ['历史回放','模型与评估'].map(label => ({id: label, label}));
export default function Regimes() {
  const [section,setSection] = useState('历史回放');
  return <><PageHead title="市场状态"/><Tabs items={sections} value={section} onChange={setSection}/><LiveReplay section={section}/></>;
}
