import React from 'react';
import { useApp } from '../state/AppContext';
import { Button, PageHead } from '../components/ui';
import LiveReplay from './LiveReplay';

export default function Features(): React.ReactElement {
  const { navigate } = useApp();
  return <>
    <PageHead title="市场研究" actions={<Button icon="play" onClick={() => navigate('regimes')}>市场回放</Button>}/>
    <LiveReplay section="features"/>
  </>;
}
