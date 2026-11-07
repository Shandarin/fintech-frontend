import type { Route } from '../types';

export const ROUTES: Route[] = ['overview', 'data', 'features', 'regimes', 'alerts', 'quality', 'lineage', 'system', 'api', 'settings'];
export const NAV: { route: Route; name: string; icon: string; group: 'market' | 'tools' }[] = [
  { route: 'overview', name: '市场总览', icon: 'grid', group: 'market' },
  { route: 'data', name: '行情中心', icon: 'chart', group: 'market' },
  { route: 'features', name: '市场研究', icon: 'activity', group: 'market' },
  { route: 'regimes', name: '市场回放', icon: 'play', group: 'market' },
  { route: 'quality', name: '数据管理', icon: 'database', group: 'tools' },
  { route: 'lineage', name: '数据溯源', icon: 'branch', group: 'tools' },
  { route: 'api', name: 'API 访问', icon: 'code', group: 'tools' },
  { route: 'settings', name: '显示设置', icon: 'settings', group: 'tools' },
];
export const MARKET_SHORTCUTS = [
  { title: '历史行情', icon: 'chart', href: '#/data?tab=history', color: 'orange' },
  { title: '宏观指标', icon: 'globe', href: '#/data?tab=macro', color: 'olive' },
  { title: '经济日历', icon: 'calendar', href: '#/data?tab=calendar', color: 'gold' },
  { title: '资讯研报', icon: 'book', href: '#/data?tab=news', color: 'plum' },
];
export const SEARCH_DESTINATIONS = [
  ...NAV.map(item => ({ name: item.name, icon: item.icon, href: `#/${item.route}` })),
  ...MARKET_SHORTCUTS.filter(item => item.href !== '#/data?tab=history').map(item => ({ name: item.title, icon: item.icon, href: item.href })),
];
