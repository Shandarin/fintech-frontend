import type { PersistedState } from '../types';
import { initialState } from '../state/defaultState';
import { sanitizeDashboardWidgets } from '../features/dashboard/widgets';

// Presentation preferences are deliberately separate from the retired demo workspace.
// Never rehydrate market data, accounts, permissions, alerts or model outputs from it.
export const STORAGE_KEY = 'fintech.preferences.v2';
const LEGACY_KEY = 'regimelab.workspace.v1';
export function readState(): PersistedState {
  const base = initialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object') return base;
    for (const key of ['positiveGreen', 'compact'] as const) {
      if (typeof saved.prefs?.[key] === 'boolean') base.prefs[key] = saved.prefs[key];
    }
    // Versions before dashboardVersion did not render their stored demo widget IDs.
    // Ignore them rather than converting retired demo panels into live market panels.
    if (saved.dashboardVersion === 1) base.widgets = sanitizeDashboardWidgets(saved.widgets);
    // Old watchlist IDs identify synthetic assets, so only read the new key's entries.
    if (localStorage.getItem(STORAGE_KEY) && Array.isArray(saved.watchlist)) base.watchlist = [...new Set<string>(saved.watchlist.filter((id: unknown): id is string => typeof id === 'string'))];
  } catch { /* Unavailable or invalid browser storage must not prevent reading the market. */ }
  return base;
}
export function writeState(state: PersistedState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schema: 2, dashboardVersion: 1, prefs: { positiveGreen: state.prefs.positiveGreen, compact: state.prefs.compact }, widgets: state.widgets, watchlist: state.watchlist }));
    return true;
  } catch { return false; }
}
