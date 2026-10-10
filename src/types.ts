export type AssetClass = 'equity' | 'bond' | 'commodity' | 'fx';
export type Role = 'admin' | 'analyst' | 'viewer';
export type Regime = 'bull' | 'range' | 'bear';
export type Severity = 'high' | 'medium' | 'low';
export type Route = 'overview' | 'data' | 'features' | 'regimes' | 'alerts' | 'quality' | 'lineage' | 'system' | 'api' | 'settings';
export interface PricePoint { date: string; close: number; volume: number; }
export interface Asset { id: string; name: string; symbol: string; category: AssetClass; currency: string; source: string; prices: PricePoint[]; }
export interface User { id: string; name: string; email: string; role: Role; allowedClasses: AssetClass[]; active: boolean; }
export type Metric = 'return1d' | 'volatility20' | 'momentum20' | 'drawdown' | 'confidence';
export interface Rule { id: string; name: string; assetId: string; metric: Metric; operator: 'gt' | 'lt'; threshold: number; severity: Severity; cooldown: number; enabled: boolean; createdAt: string; }
export interface Alert { id: string; ruleId: string; title: string; assetId: string; severity: Severity; status: 'new' | 'acknowledged' | 'resolved'; createdAt: string; updatedAt: string; metric: Metric; value: number; threshold: number; operator: 'gt' | 'lt'; note: string; owner: string; snapshotDate: string; }
export interface Feature { id: string; name: string; category: string; description: string; formula: string; window: number; unit: string; version: string; enabled: boolean; importance: number; }
export interface DataSource { id: string; name: string; type: '行情' | '宏观' | '舆情' | '研报' | '导入'; status: 'online' | 'delayed' | 'paused'; frequency: string; records: number; completeness: number; consistency: number; timeliness: number; updatedAt: string; }
export interface QualityIssue { id: string; sourceId: string; dimension: '完整性' | '一致性' | '时效性'; severity: Severity; title: string; description: string; suggestion: string; status: 'open' | 'resolved'; detectedAt: string; }
export interface DocumentItem { id: string; title: string; type: '新闻' | '研报' | '公告' | '社交'; topic: string; sentiment: '积极' | '中性' | '谨慎'; time: string; source: string; summary: string; paragraphs: string[]; }
export interface MacroIndicator { id: string; name: string; value: number; previous: number; unit: string; period: string; releasedAt: string; source: string; history: number[]; }
export interface Checkpoint { id: string; type: 'Checkpoint' | 'Savepoint'; status: 'completed' | 'restored'; at: string; size: string; duration: number; }
export interface AuditEntry { id: string; action: string; actor: string; at: string; }
export interface ImportedDataset { id: string; name: string; headers: string[]; rows: string[][]; importedAt: string; }
export interface Preferences { positiveGreen: boolean; compact: boolean; notifications: boolean; live: boolean; }
export interface Annotation { id: string; assetId: string; date: string; regime: Regime; note: string; author: string; }
export interface PersistedState {
  annotations: Annotation[]; schema: 1; sessionUserId: string | null; users: User[]; rules: Rule[]; alerts: Alert[];
  features: Feature[]; sources: DataSource[]; issues: QualityIssue[]; watchlist: string[];
  widgets: string[]; prefs: Preferences; imports: ImportedDataset[]; checkpoints: Checkpoint[];
  audit: AuditEntry[]; modelVersion: string; apiLimit: number;
}
export interface StreamEvent { id: string; type: 'market.tick' | 'regime.updated' | 'alert.created'; at: string; payload: Record<string, unknown>; }
