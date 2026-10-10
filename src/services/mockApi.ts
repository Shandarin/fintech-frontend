import type { PersistedState, User } from '../types';
import { ASSETS } from '../data/mock';
import { canWrite, metrics, sampleRegime, uid, validateRule, visibleAssets } from '../lib/analytics';
export const WORKSPACE_QUERY = 'query WorkspaceSnapshot { workspace { assets { id name symbol } states { assetId regime confidence } unreadAlertCount } }';
export interface ApiResult { status: number; body: { requestId: string; mock: boolean; data?: unknown; error?: { code: string; message: string } }; nextState?: PersistedState; }
const requests = new Map<string, number[]>();
export function resetRateLimits() { requests.clear(); }
export function mockRequest(method: string, path: string, payload: unknown, state: PersistedState, user: User | null, now = Date.now()): ApiResult {
  const requestId = uid('req');
  const fail = (status: number, code: string, message: string): ApiResult => ({ status, body: { requestId, mock: true, error: { code, message } } });
  const ok = (data: unknown, status = 200, nextState?: PersistedState): ApiResult => ({ status, body: { requestId, mock: true, data }, nextState });
  if (!user?.active) return fail(401, 'UNAUTHENTICATED', '请先进入演示账号');
  const recent = (requests.get(user.id) || []).filter(t => now - t < 60000);
  if (recent.length >= state.apiLimit) return fail(429, 'RATE_LIMITED', '模拟API超过每分钟请求限制，请稍后重试');
  requests.set(user.id, [...recent, now]);
  let url: URL; try { url = new URL(path, 'https://mock.regimelab.example'); } catch { return fail(400, 'BAD_PATH', '无效请求路径'); }
  const route = url.pathname.replace(/^\/api(?=\/|$)/, ''), assets = visibleAssets(ASSETS, user), assetId = url.searchParams.get('assetId');
  if (assetId && !assets.some(a => a.id === assetId)) return fail(403, 'FORBIDDEN_ASSET', '当前角色不可访问该资产');
  const target = assetId ? assets.filter(a => a.id === assetId) : assets;
  if (method === 'GET' && route === '/assets') return ok(assets.filter(a => !url.searchParams.get('category') || a.category === url.searchParams.get('category')).map(a => ({ id: a.id, name: a.name, symbol: a.symbol, category: a.category, latest: a.prices.at(-1) })));
  if (method === 'GET' && route === '/features') return ok(target.map(a => ({ assetId: a.id, snapshotDate: a.prices.at(-1)?.date, metrics: metrics(a.prices) })));
  if (method === 'GET' && route === '/states') return ok(target.map(a => ({ assetId: a.id, ...sampleRegime(a.prices), engine: 'frontend-demo-heuristic', modelMetadata: state.modelVersion })));
  if (method === 'GET' && route === '/alerts') return ok(state.alerts.filter(a => target.some(x => x.id === a.assetId)));
  if (method === 'GET' && route === '/rules') return ok(state.rules.filter(r => r.assetId === 'all' || assets.some(a => a.id === r.assetId)));
  if (method === 'POST' && route === '/rules') {
    if (!canWrite(user)) return fail(403, 'FORBIDDEN', '观察员不可创建规则');
    const p = payload as Record<string, unknown> | null;
    if (!p || typeof p.name !== 'string' || typeof p.threshold !== 'number' || typeof p.cooldown !== 'number') return fail(400, 'VALIDATION_ERROR', 'name / threshold / cooldown 字段缺失或类型错误');
    const error = validateRule({ name: p.name, threshold: p.threshold, cooldown: p.cooldown }); if (error) return fail(400, 'VALIDATION_ERROR', error);
    if (!['return1d', 'volatility20', 'momentum20', 'drawdown', 'confidence'].includes(String(p.metric)) || !['gt', 'lt'].includes(String(p.operator)) || !['high', 'medium', 'low'].includes(String(p.severity))) return fail(400, 'VALIDATION_ERROR', 'metric/operator/severity 枚举值无效');
    if (p.assetId !== 'all' && !assets.some(a => a.id === p.assetId)) return fail(403, 'FORBIDDEN_ASSET', '目标资产不可访问');
    const rule = { id: uid('rule-api'), name: p.name.trim(), threshold: p.threshold, cooldown: p.cooldown, metric: p.metric as 'volatility20', operator: p.operator as 'gt', severity: p.severity as 'medium', assetId: String(p.assetId), enabled: p.enabled !== false, createdAt: new Date().toISOString() };
    return ok(rule, 201, { ...state, rules: [rule, ...state.rules] });
  }
  if (method === 'POST' && route === '/graphql') {
    const query = (payload as { query?: string })?.query;
    if (typeof query !== 'string' || query.replace(/\s/g, '') !== WORKSPACE_QUERY.replace(/\s/g, '')) return fail(400, 'UNSUPPORTED_QUERY', '模拟GraphQL仅支持工作台预设查询；不是通用GraphQL解析器');
    return ok({ workspace: { assets: assets.map(({ id, name, symbol }) => ({ id, name, symbol })), states: assets.map(a => ({ assetId: a.id, regime: sampleRegime(a.prices).regime, confidence: sampleRegime(a.prices).confidence })), unreadAlertCount: state.alerts.filter(a => a.status === 'new' && assets.some(x => x.id === a.assetId)).length } });
  }
  return fail(404, 'NOT_FOUND', `模拟接口未定义：${method} ${route}`);
}
