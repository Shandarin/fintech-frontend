import type { Asset, DocumentItem, MacroIndicator, PersistedState } from '../types';
export const ASSETS: Asset[] = [];
export const DOCUMENTS: DocumentItem[] = [];
export const MACROS: MacroIndicator[] = [];
export const SNAPSHOT = '';
export const DATES: string[] = [];
export function initialState(): PersistedState {
  return {schema:1,sessionUserId:null,users:[],annotations:[],rules:[],alerts:[],features:[],sources:[],issues:[],watchlist:[],widgets:['trend','state','heatmap','alerts'],prefs:{positiveGreen:true,compact:false,notifications:true,live:false},imports:[],checkpoints:[],audit:[],modelVersion:'',apiLimit:60};
}
