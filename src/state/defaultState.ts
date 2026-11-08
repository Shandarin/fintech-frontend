import type { PersistedState } from '../types';
import { DEFAULT_DASHBOARD_WIDGETS, DEFAULT_BENCHMARKS } from '../features/dashboard/widgets';

export function initialState(): PersistedState {
  return {schema:1,sessionUserId:null,users:[],annotations:[],rules:[],alerts:[],features:[],sources:[],issues:[],watchlist:[],benchmarks:[...DEFAULT_BENCHMARKS],widgets:[...DEFAULT_DASHBOARD_WIDGETS],prefs:{positiveGreen:false,compact:false,notifications:true,live:false},imports:[],checkpoints:[],audit:[],modelVersion:'',apiLimit:60};
}
