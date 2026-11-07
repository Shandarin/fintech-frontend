import React, { useEffect, useState } from 'react';
import { PageHead, Tabs } from '../components/ui';
import HistoricalQuotes from './HistoricalQuotes';
import EconomicCalendar from './EconomicCalendar';
import { Documents } from '../features/documents/Documents';
import { Indicators } from '../features/indicators/Indicators';

const sections = [
  { id: 'history', label: '行情' },
  { id: 'macro', label: '宏观' },
  { id: 'calendar', label: '经济日历' },
  { id: 'news', label: '资讯研报' },
];

function selectedSection() {
  const value = new URLSearchParams(location.hash.split('?')[1] || '').get('tab');
  return sections.some(section => section.id === value) ? value! : 'history';
}

export default function MarketData(): React.ReactElement {
  const [tab, setTab] = useState(selectedSection);

  useEffect(() => {
    const sync = () => setTab(selectedSection());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  function changeSection(next: string) {
    setTab(next);
    const query = new URLSearchParams(location.hash.split('?')[1] || '');
    query.set('tab', next);
    location.hash = `/data?${query}`;
  }

  return <div className="market-page">
    <PageHead title="行情中心" />
    <Tabs items={sections} value={tab} onChange={changeSection} />
    <div className="market-section">
      {tab === 'history' && <HistoricalQuotes />}
      {tab === 'macro' && <Indicators />}
      {tab === 'calendar' && <EconomicCalendar />}
      {tab === 'news' && <Documents />}
    </div>
  </div>;
}
