import type { Asset, AssetClass, Metric, PricePoint, Regime, Rule, User } from '../types';
export const CLASS_LABELS: Record<AssetClass, string> = { equity: '股票', bond: '债券', commodity: '商品', fx: '汇率' };
export const ROLE_LABELS = { admin: '管理员', analyst: '分析师', viewer: '观察员' };
export const REGIMES: Record<Regime, { label: string; color: string; description: string }> = {
  bull: { label: '温和上行', color: '#198c7e', description: '动量改善，资产表现偏强' },
  range: { label: '区间震荡', color: '#cfac55', description: '方向不明，关注结构分化' },
  bear: { label: '承压下行', color: '#cc7480', description: '波动放大，风险偏好走弱' },
};
export const METRICS: Record<Metric, { label: string; unit: string; description: string }> = {
  return1d: { label: '单日收益率', unit: '%', description: '当前收盘价相对前一日的变化率' },
  volatility20: { label: '20日年化波动率', unit: '%', description: '过去20日简单收益率样本标准差 × √252' },
  momentum20: { label: '20日动量', unit: '%', description: '当前收盘价相对20个观测日前的变化率' },
  drawdown: { label: '区间最大回撤', unit: '%', description: '自起始日至选定日期的最大峰谷损失（正数）' },
  confidence: { label: '状态归属度', unit: '%', description: '演示分类器的归属分数；非经校准的模型概率' },
};
export const mean = (xs: number[]) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
export const stdev = (xs: number[]) => xs.length < 2 ? 0 : Math.sqrt(xs.reduce((s, x) => s + (x - mean(xs)) ** 2, 0) / (xs.length - 1));
export const pct = (a: number, b: number) => b === 0 ? 0 : (a / b - 1) * 100;
export const returns = (ps: PricePoint[]) => ps.slice(1).map((p, i) => pct(p.close, ps[i].close));
export function maxDrawdown(xs: number[]): number {
  let peak = 0, dd = 0;
  for (const x of xs) { if (!Number.isFinite(x) || x <= 0) continue; peak = Math.max(peak, x); dd = Math.max(dd, (peak - x) / peak * 100); }
  return dd;
}
export function correlation(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length); if (n < 2) return 0;
  const x = a.slice(-n), y = b.slice(-n), xm = mean(x), ym = mean(y);
  let cov = 0, vx = 0, vy = 0;
  for (let i = 0; i < n; i++) { cov += (x[i] - xm) * (y[i] - ym); vx += (x[i] - xm) ** 2; vy += (y[i] - ym) ** 2; }
  return vx && vy ? Math.max(-1, Math.min(1, cov / Math.sqrt(vx * vy))) : 0;
}
export function sampleRegime(points: PricePoint[]): { regime: Regime; probabilities: Record<Regime, number>; confidence: number } {
  const last = points.at(-1)?.close ?? 1, prev = points.at(-21)?.close ?? points[0]?.close ?? 1;
  const m = pct(last, prev), v = stdev(returns(points).slice(-20));
  const weights = { bull: Math.exp(Math.min(4, m / 4)), range: Math.exp(1.15 - Math.min(2, Math.abs(m) / 8)), bear: Math.exp(Math.min(4, -m / 4 + Math.max(0, v - 1.2) / 2)) };
  const sum = weights.bull + weights.range + weights.bear;
  const probabilities = { bull: weights.bull / sum * 100, range: weights.range / sum * 100, bear: weights.bear / sum * 100 };
  const regime = (Object.keys(probabilities) as Regime[]).reduce((a, b) => probabilities[a] >= probabilities[b] ? a : b);
  return { regime, probabilities, confidence: probabilities[regime] };
}
export function metrics(points: PricePoint[]): Record<Metric, number> {
  const last = points.at(-1)?.close ?? 0;
  return {
    return1d: points.length < 2 ? 0 : pct(last, points.at(-2)!.close),
    volatility20: stdev(returns(points).slice(-20)) * Math.sqrt(252),
    momentum20: points.length < 2 ? 0 : pct(last, points.at(-21)?.close ?? points[0].close),
    drawdown: maxDrawdown(points.map(p => p.close)), confidence: sampleRegime(points).confidence,
  };
}
export const sliceDates = (points: PricePoint[], from: string, to: string) => points.filter(p => p.date >= from && p.date <= to);
export function normalized(points: PricePoint[]): number[] { return points.length ? points.map(p => pct(p.close, points[0].close)) : []; }
export function ruleMatches(rule: Rule, asset: Asset, asOf?: string): boolean {
  if (!rule.enabled || (rule.assetId !== 'all' && rule.assetId !== asset.id)) return false;
  const ps = asOf ? asset.prices.filter(p => p.date <= asOf) : asset.prices;
  if (ps.length < 2) return false;
  const value = metrics(ps)[rule.metric]; return rule.operator === 'gt' ? value > rule.threshold : value < rule.threshold;
}
export function validateRule(rule: Pick<Rule, 'name' | 'threshold' | 'cooldown'>): string | null {
  if (!rule.name.trim()) return '请输入规则名称';
  if (rule.name.trim().length > 48) return '规则名称不能超过48个字符';
  if (!Number.isFinite(rule.threshold)) return '阈值必须是有效数字';
  if (!Number.isInteger(rule.cooldown) || rule.cooldown < 1 || rule.cooldown > 1440) return '冷却时间需为1–1440分钟的整数';
  return null;
}
export function canWrite(user: User | null): boolean { return !!user?.active && user.role !== 'viewer'; }
export function canAdmin(user: User | null): boolean { return !!user?.active && user.role === 'admin'; }
export function visibleAssets(assets: Asset[], user: User | null): Asset[] { return !user?.active ? [] : assets.filter(a => user.allowedClasses.includes(a.category)); }
export const number = (n: number, decimals = 2) => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
export const signed = (n: number, decimals = 2) => `${n >= 0 ? '+' : ''}${number(n, decimals)}%`;
export const compactNumber = (n: number) => n >= 1e8 ? `${number(n / 1e8, 2)} 亿` : n >= 1e4 ? `${number(n / 1e4, 1)} 万` : number(n, 0);
export function timeLabel(value: string) { const d = new Date(value); return Number.isNaN(d.getTime()) ? value : d.toLocaleString('zh-CN', { hour12: false, month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
export const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
/** UTC date-only arithmetic avoids local timezone drift. */
export function daysBefore(date: string, days: number) { const d = new Date(`${date}T00:00:00Z`); d.setUTCDate(d.getUTCDate() - days); return d.toISOString().slice(0, 10); }
export interface PcaResult { points: { x: number; y: number; label: string; regime: Regime }[]; variance: [number, number]; loadings: number[][]; }
/** Small local PCA demonstration, not a fitted production market-state model. */
export function calculatePca(samples: { values: number[]; label: string; regime: Regime }[]): PcaResult {
  if (samples.length < 3) return { points: [], variance: [0, 0], loadings: [] };
  const d = samples[0].values.length;
  const averages = Array.from({ length: d }, (_, j) => mean(samples.map(s => s.values[j])));
  const deviations = Array.from({ length: d }, (_, j) => stdev(samples.map(s => s.values[j])) || 1);
  const standardized = samples.map(s => s.values.map((v, j) => (v - averages[j]) / deviations[j]));
  const cov = Array.from({ length: d }, (_, i) => Array.from({ length: d }, (_, j) => standardized.reduce((sum, s) => sum + s[i] * s[j], 0) / (samples.length - 1)));
  const total = cov.reduce((s, r, i) => s + r[i], 0);
  const eigen = (matrix: number[][]) => {
    let v = Array.from({ length: d }, (_, i) => 1 / (i + 1));
    for (let k = 0; k < 80; k++) { const w = matrix.map(row => row.reduce((s, c, j) => s + c * v[j], 0)); const norm = Math.hypot(...w) || 1; v = w.map(x => x / norm); }
    const lambda = v.reduce((s, x, i) => s + x * matrix[i].reduce((s2, c, j) => s2 + c * v[j], 0), 0);
    return { v, lambda: Math.max(0, lambda) };
  };
  const a = eigen(cov); const b = eigen(cov.map((row, i) => row.map((v, j) => v - a.lambda * a.v[i] * a.v[j])));
  return { points: standardized.map((s, i) => ({ x: s.reduce((v, x, j) => v + x * a.v[j], 0), y: s.reduce((v, x, j) => v + x * b.v[j], 0), label: samples[i].label, regime: samples[i].regime })), variance: [total ? a.lambda / total * 100 : 0, total ? b.lambda / total * 100 : 0], loadings: [a.v, b.v] };
}
