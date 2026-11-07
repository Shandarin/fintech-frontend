import React, { useEffect, useRef, useState } from 'react';
import type { Route } from '../types';
import { useApp } from '../state/AppContext';
import { Brand, Icon } from './Icon';
import { Button, IconButton, Modal, SearchBox } from './ui';
import { pages } from '../services/pagedApi';

export const NAV: { route: Route; name: string; icon: string; group: string }[] = [
  { route: 'overview', name: '市场总览', icon: 'grid', group: 'market' },
  { route: 'data', name: '行情中心', icon: 'chart', group: 'market' },
  { route: 'features', name: '市场研究', icon: 'activity', group: 'market' },
  { route: 'regimes', name: '市场回放', icon: 'play', group: 'market' },
  { route: 'quality', name: '数据管理', icon: 'database', group: 'tools' },
  { route: 'lineage', name: '数据溯源', icon: 'branch', group: 'tools' },
  { route: 'api', name: 'API 访问', icon: 'code', group: 'tools' },
  { route: 'settings', name: '显示设置', icon: 'settings', group: 'tools' },
];
const destinations = [
  ...NAV.map(n => ({ ...n, href: `#/${n.route}` })),
  { name: '宏观指标', icon: 'globe', href: '#/data?tab=macro' },
  { name: '经济日历', icon: 'calendar', href: '#/data?tab=calendar' },
  { name: '资讯研报', icon: 'book', href: '#/data?tab=news' },
];
type SearchAsset = { asset_id: string; metadata: string };

export function Shell({ children }: { children: React.ReactNode }) {
  const app = useApp();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [catalog, setCatalog] = useState<SearchAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [notices, setNotices] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolTrigger = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const mainNav = NAV.filter(n => n.group === 'market');
  const toolNav = NAV.filter(n => n.group === 'tools');

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setQuery(''); setSearch(true);
      }
      if (e.key === 'Escape') { setToolsOpen(false); setMobile(false); }
    };
    const outside = (e: MouseEvent) => {
      if (!toolsRef.current?.contains(e.target as Node)) setToolsOpen(false);
    };
    const navigation = () => { setToolsOpen(false); setMobile(false); setSearch(false); };
    window.addEventListener('keydown', key);
    document.addEventListener('mousedown', outside);
    window.addEventListener('hashchange', navigation);
    return () => {
      window.removeEventListener('keydown', key);
      document.removeEventListener('mousedown', outside);
      window.removeEventListener('hashchange', navigation);
    };
  }, []);
  useEffect(() => {
    document.title = `${NAV.find(n => n.route === app.route)?.name || 'FinTech'} · FinTech`;
  }, [app.route]);
  useEffect(() => {
    if (!search) return;
    const c = new AbortController();
    setLoading(true); setSearchError(false); setCatalog([]);
    pages<SearchAsset>('market-api/v1/assets', c.signal).then(rows => {
      if (c.signal.aborted) return;
      setCatalog(rows.filter(row => {
        try {
          const meta = JSON.parse(row.metadata);
          return ['close', 'yield'].includes(meta.字段) && meta.大类 !== '示例';
        } catch { return false; }
      }));
    }).catch(() => { if (!c.signal.aborted) setSearchError(true); })
      .finally(() => { if (!c.signal.aborted) setLoading(false); });
    return () => c.abort();
  }, [search]);
  const closeMenus = () => { setMobile(false); setToolsOpen(false); setSearch(false); };
  const term = query.trim().toLowerCase();
  const links = destinations.filter(n => !term || n.name.toLowerCase().includes(term));
  const assetResults = term ? catalog.filter(a => a.asset_id.toLowerCase().includes(term)).slice(0, 12) : [];

  return <div className="app-shell">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>跳转到内容</a>
    <header className="site-header">
      <div className="header-inner">
        <a href="#/overview" className="brand-home" aria-label="FinTech 首页" onClick={closeMenus}><Brand/></a>
        <nav className="primary-nav" aria-label="主要导航">
          {mainNav.map(n => <a key={n.route} href={`#/${n.route}`} className={app.route === n.route ? 'active' : ''} aria-current={app.route === n.route ? 'page' : undefined}>{n.name}</a>)}
          <div className="tools-anchor" ref={toolsRef} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setToolsOpen(false); }}>
            <button ref={toolTrigger} type="button" className={`tools-trigger ${toolNav.some(n => n.route === app.route) ? 'active' : ''}`} aria-expanded={toolsOpen} aria-controls="tools-navigation" onClick={() => setToolsOpen(v => !v)} onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setToolsOpen(true); requestAnimationFrame(() => document.querySelector<HTMLElement>('#tools-navigation a')?.focus()); } }}>工具<Icon name="down" size={13}/></button>
            {toolsOpen && <div id="tools-navigation" className="tools-menu" onKeyDown={e => { if (e.key === 'Escape') { setToolsOpen(false); toolTrigger.current?.focus(); } }}>
              {toolNav.map(n => <a href={`#/${n.route}`} key={n.route} onClick={closeMenus} aria-current={app.route === n.route ? 'page' : undefined}><Icon name={n.icon} size={18}/><span>{n.name}</span><Icon name="chevron" size={13}/></a>)}
            </div>}
          </div>
        </nav>
        <div className="header-actions">
          <button type="button" className="global-search" aria-label="搜索资产与功能" onClick={() => { setQuery(''); setSearch(true); }}><Icon name="search" size={18}/><span>搜索资产与功能</span><kbd>⌘ / Ctrl K</kbd></button>
          <a className="header-settings" href="#/settings" aria-label="显示设置" title="显示设置"><Icon name="settings" size={19}/></a>
          <IconButton icon={mobile ? 'close' : 'menu'} label={mobile ? '关闭导航' : '展开导航'} className="mobile-nav" aria-expanded={mobile} aria-controls="mobile-navigation" onClick={() => setMobile(v => !v)}/>
        </div>
      </div>
      {mobile && <nav id="mobile-navigation" className="mobile-navigation" aria-label="移动导航">
        {NAV.map(n => <a href={`#/${n.route}`} key={n.route} onClick={closeMenus} aria-current={app.route === n.route ? 'page' : undefined}><Icon name={n.icon} size={18}/>{n.name}<Icon name="chevron" size={14}/></a>)}
      </nav>}
    </header>
    <div className="main-shell">
      <main id="main-content" tabIndex={-1} className="content" key={app.route}>{children}</main>
      <footer className="app-footer"><span>FinTech</span><div><a href="#/data?tab=calendar">经济日历</a><a href="#/quality">数据管理</a><button type="button" onClick={() => setNotices(true)}>第三方声明</button></div></footer>
    </div>
    <div className="toast-stack" aria-live="polite">{app.toasts.map(t => <div key={t.id} className={`toast toast-${t.tone}`} role="status"><Icon name={t.tone === 'error' ? 'warning' : t.tone === 'success' ? 'check' : 'info'} size={18}/><span>{t.message}</span><IconButton icon="close" label="关闭通知" onClick={() => app.dismissToast(t.id)}/></div>)}</div>
    {notices && <Modal title="第三方声明" onClose={() => setNotices(false)}><div className="license-credit"><strong>Highcharts Stock</strong><span>Highsoft AS</span><a href="https://www.highcharts.com/products/stock/" target="_blank" rel="noreferrer">产品与许可<Icon name="external" size={14}/></a></div></Modal>}
    {search && <Modal title="搜索" onClose={() => setSearch(false)}>
      <SearchBox inputRef={searchInput} value={query} onChange={setQuery} placeholder="资产名称、代码或功能"/>
      <div className="command-results">
        {assetResults.length > 0 && <><h3>资产</h3>{assetResults.map(a => <a key={a.asset_id} href={`#/data?tab=history&asset=${encodeURIComponent(a.asset_id)}`} onClick={closeMenus}><Icon name="chart"/><span>{a.asset_id}</span><Icon name="arrow" size={15}/></a>)}</>}
        {links.length > 0 && <><h3>功能</h3>{links.map(n => <a key={n.href} href={n.href} onClick={closeMenus}><Icon name={n.icon}/><span>{n.name}</span><Icon name="arrow" size={15}/></a>)}</>}
        {loading && term && <span className="loading-inline" role="status"><Icon name="refresh" className="spin" size={15}/>搜索中</span>}
        {searchError && term && <span className="search-status" role="status">资产搜索暂不可用</span>}
        {term && !loading && !searchError && !links.length && !assetResults.length && <p className="search-status" role="status">未找到匹配结果</p>}
      </div>
    </Modal>}
  </div>;
}
