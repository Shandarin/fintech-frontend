import React, { useState } from 'react';
import { PageHead, Tabs } from '../components/ui';
import LiveReplay from './LiveReplay';

export default function Regimes(): React.ReactElement {
  const [section, setSection] = useState('历史回放');
  return <>
    <PageHead title="市场回放"/>
    <Tabs items={[{ id: '历史回放', label: '历史回放' }, { id: '模型详情', label: '模型详情' }]} value={section} onChange={setSection}/>
    <LiveReplay section={section}/>
  </>;
}
