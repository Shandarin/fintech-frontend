import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Asset, PersistedState, Route, StreamEvent, User } from '../types';
import { initialState } from '../data/workspace';
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
  reset: () => void;
}
const Context = createContext<Store | null>(null);
const routes: Route[] = ['overview', 'data', 'features', 'regimes', 'alerts', 'quality', 'lineage', 'system', 'api', 'settings'];
const routeFromHash = (): Route => {
  const value = location.hash.replace(/^#\/?/, '').split('?')[0];
  return routes.includes(value as Route) ? value as Route : 'overview';
};
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(readState);
  const [route, setRoute] = useState<Route>(routeFromHash);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [range, setDateRange] = useState({ from: '', to: '' });
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('');
  const [activeAlert, openAlert] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState('');
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const storageWarned = useRef(false);
  const counter = useRef(0);
  const dismissToast = useCallback((id: string) => {
    clearTimeout(timers.current.get(id)); timers.current.delete(id);
    setToasts(current => current.filter(toast => toast.id !== id));
  }, []);
  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = `notice-${++counter.current}`;
    setToasts(current => [...current.slice(-3), { id, message, tone }]);
    timers.current.set(id, setTimeout(() => dismissToast(id), 4500));
  }, [dismissToast]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (!writeState(state) && !storageWarned.current) {
      storageWarned.current = true; notify('显示设置仅在当前会话保留', 'info');
    }
    document.body.classList.toggle('red-positive', !state.prefs.positiveGreen);
    document.body.classList.toggle('compact-density', state.prefs.compact);
  }, [state, notify]);
  useEffect(() => {
    const fn = () => { setRoute(routeFromHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', fn); return () => window.removeEventListener('hashchange', fn);
  }, []);
  const navigate = useCallback((next: Route) => { location.hash = `/${next}`; setRoute(next); window.scrollTo(0, 0); }, []);
  const update = useCallback((fn: (s: PersistedState) => PersistedState, _action?: string, permission: 'write' | 'admin' | 'self' = 'self') => {
    if (permission !== 'self') { notify('此操作需要服务端授权', 'error'); return false; }
    setState(previous => {
      const next = fn(previous);
      return { ...initialState(), prefs: { ...initialState().prefs, positiveGreen: next.prefs.positiveGreen, compact: next.prefs.compact }, widgets: next.widgets, watchlist: next.watchlist };
    });
    return true;
  }, [notify]);
  const reset = useCallback(() => { setState(initialState()); notify('已恢复默认显示设置'); }, [notify]);
  const refresh = useCallback(() => setLastUpdate(new Date().toISOString()), []);
  return <Context.Provider value={{ state, user: null, assets: [], route, navigate, update, notify, toasts, dismissToast, from: range.from, to: range.to, setRange: (from, to) => { if (from <= to) setDateRange({ from, to }); }, selectedAsset, setSelectedAsset, selectedFeature, setSelectedFeature, activeAlert, openAlert, events: [], clearEvents: () => {}, lastUpdate, refresh, reset }}>{children}</Context.Provider>;
}
export function useApp() { const context = useContext(Context); if (!context) throw new Error('AppProvider missing'); return context; }
