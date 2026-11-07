import React from 'react';
import { AppProvider, useApp } from './state/AppContext';
import { Shell } from './components/Shell';
import Overview from './pages/Overview';
import MarketData from './pages/MarketData';
import Features from './pages/Features';
import Regimes from './pages/Regimes';
import Alerts,{AlertDetail} from './pages/Alerts';
import Quality from './pages/Quality';
import Lineage from './pages/Lineage';
import System from './pages/System';
import Api from './pages/Api';
import Settings from './pages/Settings';
const pages = {overview:Overview,data:MarketData,features:Features,regimes:Regimes,alerts:Alerts,quality:Quality,lineage:Lineage,system:System,api:Api,settings:Settings};
function Workspace() {
  const {route,activeAlert} = useApp();
  const Page = pages[route];
  return <Shell><Page/>{activeAlert && <AlertDetail key={activeAlert}/>}</Shell>;
}
export default function App() { return <AppProvider><Workspace/></AppProvider>; }
