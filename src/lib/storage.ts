import type { PersistedState } from '../types';
import { initialState } from '../data/workspace';

// Presentation preferences are deliberately separate from the retired demo workspace.
// Never rehydrate market data, accounts, permissions, alerts or model outputs from it.
export const STORAGE_KEY = 'fintech.preferences.v2';
const LEGACY_KEY = 'regimelab.workspace.v1';
const widgetIds = new Set(['trend', 'state', 'heatmap', 'alerts']);
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
    if (Array.isArray(saved.widgets)) base.widgets = [...new Set<string>(saved.widgets.filter((id: unknown): id is string => typeof id === 'string' && widgetIds.has(id)))];
    // Old watchlist IDs identify synthetic assets, so only read the new key's entries.
    if (localStorage.getItem(STORAGE_KEY) && Array.isArray(saved.watchlist)) base.watchlist = [...new Set<string>(saved.watchlist.filter((id: unknown): id is string => typeof id === 'string'))];
  } catch { /* Unavailable or invalid browser storage must not prevent reading the market. */ }
  return base;
}
export function writeState(state: PersistedState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schema: 2, prefs: { positiveGreen: state.prefs.positiveGreen, compact: state.prefs.compact }, widgets: state.widgets, watchlist: state.watchlist }));
    return true;
  } catch { return false; }
}
