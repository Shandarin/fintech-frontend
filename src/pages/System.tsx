import React from 'react';
import { useApp } from '../state/AppContext';
import { Button, PageHead } from '../components/ui';

// Service telemetry requires a server contract; never populate it with fixed
// service statuses, latencies, throughput or simulated checkpoints.
export default function System() {
  const app = useApp();
  return <PageHead title="服务状态" actions={<Button onClick={() => app.navigate('api')}>API 访问</Button>}/>;
}
