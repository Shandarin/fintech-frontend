import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Alert, Asset, PersistedState, Route, StreamEvent, User } from '../types';
import { ASSETS, SNAPSHOT, initialState } from '../data/mock';
import { canAdmin, canWrite, daysBefore, metrics, ruleMatches, sampleRegime, uid, visibleAssets } from '../lib/analytics';
import { readState, writeState } from '../lib/storage';
type Toast = { id: string; message: string; tone: 'success' | 'error' | 'info' };
interface Store {
  state: PersistedState; user: User | null; assets: Asset[]; route: Route; navigate: (route: Route) => void;
  update: (fn: (s: PersistedState) => PersistedState, action?: string, permission?: 'write' | 'admin' | 'self') => boolean;
  notify: (message: string, tone?: Toast['tone']) => void; toasts: Toast[]; dismissToast: (id: string) => void;
  from: string; to: string; setRange: (from: string, to: string) => void;
  selectedAsset: string; setSelectedAsset: (id: string) => void;
  selectedFeature: string; setSelectedFeature: (id: string) => void;
  activeAlert: string | null; openAlert: (id: string | null) => void;
  events: StreamEvent[]; clearEvents: () => void; lastUpdate: string; refresh: () => void;
  login: (id: string) => void; logout: () => void; reset: () => void; evaluateRules: () => void;
}
const Context = createContext<Store | null>(null);
const routeFromHash = (): Route => { const value = location.hash.replace(/^#\/?/, '').split('?')[0]; return ['overview', 'data', 'features', 'regimes', 'alerts', 'quality', 'lineage', 'system', 'api', 'settings'].includes(value) ? value as Route : 'overview'; };
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(readState), [route, setRoute] = useState<Route>(routeFromHash);
  const [toasts, setToasts] = useState<Toast[]>([]), [events, setEvents] = useState<StreamEvent[]>([]);
  const [range, setDateRange] = useState({ from: daysBefore(SNAPSHOT, 90), to: SNAPSHOT });
  const [selectedAsset, setSelectedAsset] = useState('csi300'), [selectedFeature, setSelectedFeature] = useState('volatility20');
  const [activeAlert, openAlert] = useState<string | null>(null), [lastUpdate, setLastUpdate] = useState(new Date().toISOString());
  const current = useRef(state); current.current = state; const toastTimers = useRef<ReturnType<typeof setTimeout>[]>([]); const storageWarned = useRef(false);
  const user = state.users.find(u => u.id === state.sessionUserId && u.active) || null;
  const assets = useMemo(() => visibleAssets(ASSETS, user), [user]);
  const dismissToast = useCallback((id: string) => setToasts(v => v.filter(t => t.id !== id)), []);
  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => { const id = uid('toast'); setToasts(t => [...t.slice(-3), { id, message, tone }]); toastTimers.current.push(setTimeout(() => dismissToast(id), 4500)); }, [dismissToast]);
  useEffect(() => () => toastTimers.current.forEach(clearTimeout), []);
  useEffect(() => { if (!writeState(state) && !storageWarned.current) { storageWarned.current = true; notify('浏览器存储不可用，本次修改仅在当前会话中保留。', 'info'); } document.body.classList.toggle('red-positive', !state.prefs.positiveGreen); document.body.classList.toggle('compact-density', state.prefs.compact); }, [state, notify]);
  useEffect(() => { const fn = () => { setRoute(routeFromHash()); window.scrollTo(0, 0); }; window.addEventListener('hashchange', fn); return () => window.removeEventListener('hashchange', fn); }, []);
  const navigate = useCallback((next: Route) => { location.hash = `/${next}`; setRoute(next); window.scrollTo(0, 0); }, []);
  const update = useCallback((fn: (s: PersistedState) => PersistedState, action?: string, permission: 'write' | 'admin' | 'self' = 'write') => {
    const u = current.current.users.find(x => x.id === current.current.sessionUserId) || null;
    if ((permission === 'write' && !canWrite(u)) || (permission === 'admin' && !canAdmin(u))) { notify('当前演示角色没有此操作权限。', 'error'); return false; }
    setState(prev => { const next = fn(prev); return action ? { ...next, audit: [{ id: uid('audit'), action, actor: u?.name || '演示访客', at: new Date().toISOString() }, ...next.audit].slice(0, 100) } : next; }); return true;
  }, [notify]);
  const refresh = useCallback(() => { setLastUpdate(new Date().toISOString()); notify('演示快照已刷新；未连接真实行情。'); }, [notify]);
  useEffect(() => {
    if (!state.prefs.live || !user) return;
    let n = 0;
    const timer = setInterval(() => {
      n++; const available = visibleAssets(ASSETS, current.current.users.find(u => u.id === current.current.sessionUserId) || null); if (!available.length) return;
      const a = available[n % available.length]; const now = new Date().toISOString();
      const event: StreamEvent = { id: uid('evt'), type: n % 6 === 0 ? 'regime.updated' : 'market.tick', at: now, payload: n % 6 === 0 ? { assetId: a.id, regime: sampleRegime(a.prices).regime, mock: true, snapshotDate: SNAPSHOT } : { assetId: a.id, symbol: a.symbol, close: a.prices.at(-1)!.close, mock: true, snapshotDate: SNAPSHOT } };
      setEvents(prev => [event, ...prev].slice(0, 60)); setLastUpdate(now);
    }, 5000); return () => clearInterval(timer);
  }, [state.prefs.live, user?.id]);
  const login = (id: string) => { if (!state.users.find(u => u.id === id && u.active)) { notify('演示账号不存在或已停用', 'error'); return; } setState(s => ({ ...s, sessionUserId: id })); navigate('overview'); notify('已进入演示工作区（非真实身份认证）'); };
  const logout = () => { setState(s => ({ ...s, sessionUserId: null })); openAlert(null); };
  const reset = () => { setState(initialState()); setEvents([]); openAlert(null); navigate('overview'); notify('演示工作区已重置'); };
  const evaluateRules = () => {
    if (!canWrite(user)) { notify('观察员不能执行规则检测', 'error'); return; }
    const now = new Date(); const created: Alert[] = [];
    for (const r of state.rules) for (const a of assets) {
      if (!ruleMatches(r, a)) continue;
      const last = state.alerts.find(al => al.ruleId === r.id && al.assetId === a.id);
      if (last && now.getTime() - new Date(last.createdAt).getTime() < r.cooldown * 60000) continue;
      created.push({ id: uid('al'), ruleId: r.id, title: `${a.name} · ${r.name}`, assetId: a.id, severity: r.severity, status: 'new', createdAt: now.toISOString(), updatedAt: now.toISOString(), metric: r.metric, value: metrics(a.prices)[r.metric], threshold: r.threshold, operator: r.operator, note: '', owner: '', snapshotDate: SNAPSHOT });
    }
    if (!created.length) { notify('当前规则未命中，或匹配项仍在冷却期内。', 'info'); return; }
    update(s => ({ ...s, alerts: [...created, ...s.alerts].slice(0, 200) }), `模拟规则检测生成 ${created.length} 条预警`);
    setEvents(prev => [...created.map(al => ({ id: uid('evt'), type: 'alert.created' as const, at: al.createdAt, payload: { alertId: al.id, assetId: al.assetId, mock: true } })), ...prev].slice(0, 60));
    notify(`合成数据触发 ${created.length} 条预警，已按规则和资产去重。`);
  };
  return <Context.Provider value={{ state, user, assets, route, navigate, update, notify, toasts, dismissToast, from: range.from, to: range.to, setRange: (from, to) => { if (from <= to) setDateRange({ from, to }); }, selectedAsset, setSelectedAsset, selectedFeature, setSelectedFeature, activeAlert, openAlert, events, clearEvents: () => setEvents([]), lastUpdate, refresh, login, logout, reset, evaluateRules }}>{children}</Context.Provider>;
}
export function useApp() { const c = useContext(Context); if (!c) throw new Error('AppProvider missing'); return c; }
