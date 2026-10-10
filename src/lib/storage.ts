import type { PersistedState } from '../types';
import { initialState } from '../data/mock';
export const STORAGE_KEY = 'regimelab.demo.v1';
export function readState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return initialState();
    const s = JSON.parse(raw);
    if (s.schema !== 1 || !Array.isArray(s.users) || !Array.isArray(s.rules) || !Array.isArray(s.alerts)) return initialState();
    const base = initialState();
    return { ...base, ...s, prefs: { ...base.prefs, ...s.prefs } };
  } catch { return initialState(); }
}
export function writeState(state: PersistedState): boolean {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; } catch { return false; }
}
