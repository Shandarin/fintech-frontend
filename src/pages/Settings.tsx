import React, { useState } from 'react';
import { useApp } from '../state/AppContext';
import { Button, Card, Info, Modal, PageHead, Toggle } from '../components/ui';

export default function Settings() {
  const app = useApp();
  const [resetOpen, setResetOpen] = useState(false);
  const setPreference = (key: 'compact' | 'positiveGreen', value: boolean) => {
    app.update(s => ({ ...s, prefs: { ...s.prefs, [key]: value } }), undefined, 'self');
  };
  return <>
    <PageHead title="显示设置"/>
    <div className="preferences-layout">
      <Card title="行情显示" className="preferences-card">
        <div className="preference-row preference-row-colors">
          <div className="preference-label">涨跌颜色</div>
          <div className="color-options" role="group" aria-label="涨跌颜色">
            <button type="button" className={!app.state.prefs.positiveGreen ? 'selected' : ''} aria-pressed={!app.state.prefs.positiveGreen} onClick={() => setPreference('positiveGreen', false)}>
              <span className="price-color price-color-red">涨</span><span className="price-color price-color-green">跌</span>红涨绿跌
            </button>
            <button type="button" className={app.state.prefs.positiveGreen ? 'selected' : ''} aria-pressed={app.state.prefs.positiveGreen} onClick={() => setPreference('positiveGreen', true)}>
              <span className="price-color price-color-green">涨</span><span className="price-color price-color-red">跌</span>绿涨红跌
            </button>
          </div>
        </div>
        <div className="preference-row"><div className="preference-label">紧凑布局</div><Toggle label="紧凑布局" checked={app.state.prefs.compact} onChange={v => setPreference('compact', v)}/></div>
      </Card>
      <div className="preferences-actions"><Button onClick={() => setResetOpen(true)}>恢复默认显示</Button><Info label="偏好保存位置">显示偏好保存在当前浏览器。</Info></div>
    </div>
    {resetOpen && <Modal title="恢复默认显示？" onClose={() => setResetOpen(false)} footer={<><Button onClick={() => setResetOpen(false)}>取消</Button><Button variant="primary" onClick={() => {
      app.update(s => ({ ...s, prefs: { ...s.prefs, positiveGreen: false, compact: false } }), undefined, 'self');
      setResetOpen(false); app.notify('已恢复默认显示');
    }}>恢复默认</Button></>}><p>涨跌颜色将恢复为红涨绿跌，布局恢复为标准间距。</p></Modal>}
  </>;
}
