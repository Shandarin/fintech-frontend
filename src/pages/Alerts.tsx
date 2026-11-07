import React from 'react';
import { useApp } from '../state/AppContext';
import { Button, PageHead } from '../components/ui';

// The uploaded application has no connected alert API. Keep old links safe
// without restoring the former browser-generated alerts or rule simulator.
export function AlertDetail() { return null; }
export default function Alerts() {
  const app = useApp();
  return <PageHead title="预警" actions={<Button onClick={() => app.navigate('data')}>查看行情</Button>}/>;
}
