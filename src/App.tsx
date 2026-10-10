import React from 'react';
import { AppProvider, useApp } from './state/AppContext';
import { Shell } from './components/Shell';
import Overview from './pages/Overview';
import MarketData from './pages/MarketData';
import Features from './pages/Features';
import Regimes from './pages/Regimes';
import Alerts, { AlertDetail } from './pages/Alerts';
import Quality from './pages/Quality';
import Lineage from './pages/Lineage';
import System from './pages/System';
import Api from './pages/Api';
import Settings, { Login } from './pages/Settings';
import { STORAGE_KEY } from './lib/storage';
const PAGES = { overview: Overview, data: MarketData, features: Features, regimes: Regimes, alerts: Alerts, quality: Quality, lineage: Lineage, system: System, api: Api, settings: Settings };
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: string | null }> {
  state: { error: string | null } = { error: null };
  static getDerivedStateFromError(error: Error) { return { error: error.message }; }
  render() { if (this.state.error) return <div className="error-page"><h1>工作区暂时无法显示</h1><p>可能是旧的浏览器演示状态与当前版本不兼容。</p><pre>{this.state.error}</pre><button type="button" onClick={() => { try { localStorage.removeItem(STORAGE_KEY); } catch {} location.reload(); }}>重置演示状态并重新载入</button></div>; return this.props.children; }
}
function Workspace() { const { user, route, activeAlert } = useApp(); if (!user) return <Login/>; const Page = PAGES[route]; return <Shell><Page/>{activeAlert && <AlertDetail key={activeAlert}/>}</Shell>; }
export default function App() { return <ErrorBoundary><AppProvider><Workspace/></AppProvider></ErrorBoundary>; }
