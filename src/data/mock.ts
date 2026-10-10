import type { Asset, AssetClass, DocumentItem, MacroIndicator, PersistedState, User } from '../types';
import { metrics } from '../lib/analytics';
export const SNAPSHOT = '2026-10-09';
export const MOCK_NOTICE = '全部行情、新闻、模型和运行指标均为合成演示数据，不构成投资建议。';
function rng(seed: number) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function dates() { const out: string[] = []; const date = new Date(`${SNAPSHOT}T00:00:00Z`); while (out.length < 260) { if (![0, 6].includes(date.getUTCDay())) out.unshift(date.toISOString().slice(0, 10)); date.setUTCDate(date.getUTCDate() - 1); } return out; }
export const DATES = dates();
const definitions: [string, string, string, AssetClass, string, number, number][] = [
  ['csi300', '沪深 300', '000300.SH', 'equity', 'CNY', 3650, 0.82],
  ['csi500', '中证 500', '000905.SH', 'equity', 'CNY', 5380, 1.05],
  ['sp500', '标普 500', 'SPX', 'equity', 'USD', 5150, 0.67],
  ['nasdaq', '纳斯达克 100', 'NDX', 'equity', 'USD', 17800, 1.06],
  ['cn-bond', '中债国债指数', 'CBA00601', 'bond', 'CNY', 233, 0.09],
  ['us-bond', '美债 7–10 年', 'UST7-10', 'bond', 'USD', 96, 0.17],
  ['gold', '上期黄金', 'AU.SHF', 'commodity', 'CNY', 563, 0.64],
  ['oil', '布伦特原油', 'BRENT', 'commodity', 'USD', 76, 1.1],
  ['commodity', '南华商品指数', 'NHCI', 'commodity', 'CNY', 2380, 0.56],
  ['dxy', '美元指数', 'DXY', 'fx', 'USD', 102, 0.22],
  ['usdcnh', '美元 / 离岸人民币', 'USD/CNH', 'fx', 'CNH', 7.12, 0.11],
  ['eurusd', '欧元 / 美元', 'EUR/USD', 'fx', 'USD', 1.082, 0.21],
];
const common = rng(20261009); const factors = DATES.map((_, i) => Math.sin(i / 12) * 0.3 + (common() - 0.48) * 1.15);
export const ASSETS: Asset[] = definitions.map(([id, name, symbol, category, currency, initial, amplitude], k) => {
  const random = rng(26001 + k * 137); let value = initial;
  const prices = DATES.map((date, i) => {
    const cycle = i < 55 ? 0.13 : i < 95 ? -0.02 : i < 145 ? -0.13 : i < 190 ? 0.06 : i < 225 ? -0.015 : 0.19;
    const exposure = category === 'bond' ? -0.28 : category === 'fx' ? (id === 'eurusd' ? 0.3 : -0.35) : id === 'gold' ? 0.52 : 1;
    const move = (cycle * exposure + factors[i] * exposure * 0.66 + (random() - 0.5) * 0.95) * amplitude;
    value *= 1 + move / 100;
    return { date, close: +value.toFixed(category === 'fx' ? 4 : 2), volume: Math.round((0.65 + random()) * (category === 'equity' ? 4.5e8 : 7e6)) };
  });
  return { id, name, symbol, category, currency, source: category === 'equity' || category === 'bond' ? 'source-market' : 'source-cross', prices };
});
export const DEMO_USERS: User[] = [
  { id: 'u-admin', name: '林序', email: 'admin@regimelab.example', role: 'admin', allowedClasses: ['equity', 'bond', 'commodity', 'fx'], active: true },
  { id: 'u-analyst', name: '陈知行', email: 'analyst@regimelab.example', role: 'analyst', allowedClasses: ['equity', 'bond', 'commodity', 'fx'], active: true },
  { id: 'u-viewer', name: '访客', email: 'viewer@regimelab.example', role: 'viewer', allowedClasses: ['equity', 'bond'], active: true },
];
export const DOCUMENTS: DocumentItem[] = [
  { id: 'doc-1', title: '多资产观察：风险偏好回暖，结构分化仍在延续', type: '研报', topic: '资产配置', sentiment: '积极', time: '2026-10-09 14:35', source: '演示研究组', summary: '合成样本中，权益动量小幅改善，股债相关性继续走低。短期需要区分趋势恢复与局部反弹。', paragraphs: ['本篇是用于演示检索与资料阅读的虚构研报，不来源于真实机构。', '在当前合成数据窗口内，权益与商品的归一化走势出现分化。平台将从收益分布、趋势、相关性和流动性四个维度提供观察视角。', '当前状态标签只解释演示数据，不能用于实际交易。状态判断应结合数据质量、发布时间及模型版本，避免把关联性解释为因果。'] },
  { id: 'doc-2', title: '宏观样例：制造业景气指标边际改善', type: '新闻', topic: '宏观经济', sentiment: '积极', time: '2026-10-09 13:48', source: '合成资讯流', summary: '示例PMI环比改善0.3点，需求修复信号仍需更多数据验证。', paragraphs: ['这是一条虚构资讯，用来演示宏观事件检索、发布时间展示与舆情特征提取。', '本系统不会将观测期等同于发布时间；历史回放只应使用当时已知的数据。'] },
  { id: 'doc-3', title: '大宗观察：能源价格波动加大，贵金属相对稳健', type: '研报', topic: '大宗商品', sentiment: '谨慎', time: '2026-10-09 12:20', source: '演示研究组', summary: '示例能源价格波动高于贵金属，组合风险应关注资产之间的共振而非单点价格。', paragraphs: ['本材料仅为前端功能演示编写。', '通过状态热力图，可以观察商品资产是否同步进入高波动状态，并追溯相关特征。'] },
  { id: 'doc-4', title: '示例企业发布三季度经营数据预告', type: '公告', topic: '公司公告', sentiment: '中性', time: '2026-10-09 10:05', source: '示例公告库', summary: '演示公告涵盖经营概况、需求变化与现金流提示，未对应任何真实上市公司。', paragraphs: ['公司名称与经营数据均为虚构。本公告用于非结构化数据存储和版本追溯的演示。'] },
  { id: 'doc-5', title: '讨论热度样本：投资者对权益趋势的关注上升', type: '社交', topic: '市场情绪', sentiment: '中性', time: '2026-10-09 09:42', source: '合成舆情样本', summary: '话题热度仅为模拟统计，不代表真实用户观点。', paragraphs: ['这是一条合成社交样本，不包含真实用户信息。', '情绪因子与价格变化不构成必然的因果联系。'] },
  { id: 'doc-6', title: '利率观察：期限结构变化与股债联动', type: '研报', topic: '固定收益', sentiment: '中性', time: '2026-10-08 16:15', source: '演示研究组', summary: '使用低频利率样本和日频资产收益比较不同市场状态的跨资产特征。', paragraphs: ['全部文字和数据均为演示内容。', '页面展示的相关系数由合成价格序列计算，不是现实市场估计结果。'] },
];
export const MACROS: MacroIndicator[] = [
  { id: 'pmi', name: '制造业 PMI', value: 50.8, previous: 50.5, unit: '点', period: '2026-09', releasedAt: '2026-09-30 09:30', source: '合成宏观样本', history: [49.6, 49.8, 50.1, 49.7, 50.3, 50.4, 50.2, 50.5, 50.8] },
  { id: 'cpi', name: 'CPI 同比', value: 1.2, previous: 0.9, unit: '%', period: '2026-08', releasedAt: '2026-09-10 09:30', source: '合成宏观样本', history: [0.4, 0.6, 0.5, 0.7, 0.8, 0.6, 1.0, 0.9, 1.2] },
  { id: 'm2', name: 'M2 同比', value: 8.3, previous: 8.1, unit: '%', period: '2026-08', releasedAt: '2026-09-15 17:00', source: '合成宏观样本', history: [7.1, 7.3, 7.2, 7.6, 7.8, 7.9, 8.0, 8.1, 8.3] },
  { id: 'shibor', name: 'Shibor 3M', value: 1.72, previous: 1.75, unit: '%', period: '2026-10-09', releasedAt: '2026-10-09 11:00', source: '合成宏观样本', history: [1.94, 1.91, 1.89, 1.85, 1.88, 1.81, 1.79, 1.75, 1.72] },
];
export function initialState(): PersistedState {
  const at = '2026-10-09T07:00:00Z';
  return {
    annotations: [], schema: 1, sessionUserId: 'u-analyst', users: DEMO_USERS.map(u => ({ ...u, allowedClasses: [...u.allowedClasses] })),
    rules: [
      { id: 'r-vol', name: '权益波动率超过阈值', assetId: 'all', metric: 'volatility20', operator: 'gt', threshold: 5, severity: 'high', cooldown: 30, enabled: true, createdAt: at },
      { id: 'r-mom', name: '趋势动量持续改善', assetId: 'csi300', metric: 'momentum20', operator: 'gt', threshold: 1, severity: 'low', cooldown: 60, enabled: true, createdAt: at },
      { id: 'r-dd', name: '最大回撤观察', assetId: 'all', metric: 'drawdown', operator: 'gt', threshold: 8, severity: 'medium', cooldown: 60, enabled: true, createdAt: at },
      { id: 'r-state', name: '状态归属度不足', assetId: 'all', metric: 'confidence', operator: 'lt', threshold: 50, severity: 'medium', cooldown: 120, enabled: false, createdAt: at },
    ],
    alerts: ['csi500', 'nasdaq', 'oil', 'csi300', 'commodity'].map((id, i) => {
      const asset = ASSETS.find(a => a.id === id)!; const value = metrics(asset.prices).volatility20;
      return { id: `al-seed-${i}`, ruleId: 'r-vol', title: `${asset.name} · 波动率观察`, assetId: id, severity: i < 2 ? 'high' : i < 4 ? 'medium' : 'low', status: i < 3 ? 'new' : i === 3 ? 'acknowledged' : 'resolved', createdAt: `2026-10-09T0${6 - i}:4${i}:00Z`, updatedAt: at, metric: 'volatility20', value, threshold: 5, operator: 'gt', note: i === 4 ? '已完成样本复核。' : '', owner: i > 2 ? '陈知行' : '', snapshotDate: SNAPSHOT };
    }),
    features: [
      { id: 'return1d', name: '单日收益率', category: '分布特征', description: '价格相对前一个观测日的变化率', formula: '(close_t / close_t-1 - 1) × 100', window: 1, unit: '%', version: 'v1.2', enabled: true, importance: 0.12 },
      { id: 'volatility20', name: '20日年化波动率', category: '分布特征', description: '20日收益率的样本标准差，按252日年化', formula: 'std(returns, 20) × √252', window: 20, unit: '%', version: 'v2.1', enabled: true, importance: 0.24 },
      { id: 'momentum20', name: '20日动量', category: '动量与趋势', description: '20个观测日的累计价格变化', formula: '(close_t / close_t-20 - 1) × 100', window: 20, unit: '%', version: 'v1.3', enabled: true, importance: 0.29 },
      { id: 'drawdown', name: '区间最大回撤', category: '风险相关', description: '历史峰值至后续低点的最大跌幅', formula: 'max((running_peak - close) / running_peak)', window: 260, unit: '%', version: 'v1.1', enabled: true, importance: 0.16 },
      { id: 'corr', name: '股债相关系数', category: '相关性结构', description: '两资产20日收益率的Pearson相关系数', formula: 'corr(equity_returns, bond_returns, 20)', window: 20, unit: '', version: 'v1.0', enabled: true, importance: 0.11 },
      { id: 'sentiment', name: '舆情热度', category: '另类数据', description: '合成新闻主题的标准化计数；预置示例', formula: 'zscore(topic_count, 30)', window: 30, unit: 'z-score', version: 'v0.9', enabled: false, importance: 0.08 },
    ],
    sources: [
      { id: 'source-market', name: '多资产行情样本', type: '行情', status: 'online', frequency: '1d', records: 1560, completeness: 99.7, consistency: 100, timeliness: 99.8, updatedAt: '2026-10-09 15:00' },
      { id: 'source-cross', name: '跨资产行情样本', type: '行情', status: 'online', frequency: '1d', records: 1560, completeness: 100, consistency: 99.4, timeliness: 100, updatedAt: '2026-10-09 15:00' },
      { id: 'source-macro', name: '宏观指标样本', type: '宏观', status: 'delayed', frequency: '日 / 月', records: 36, completeness: 98.6, consistency: 100, timeliness: 95.2, updatedAt: '2026-10-09 11:00' },
      { id: 'source-news', name: '合成舆情流', type: '舆情', status: 'online', frequency: '模拟流', records: 3, completeness: 100, consistency: 99.8, timeliness: 99.2, updatedAt: '2026-10-09 14:35' },
      { id: 'source-docs', name: '演示研报与公告', type: '研报', status: 'online', frequency: '按篇', records: 3, completeness: 100, consistency: 100, timeliness: 100, updatedAt: '2026-10-09 14:35' },
    ],
    issues: [
      { id: 'q1', sourceId: 'source-macro', dimension: '时效性', severity: 'medium', title: '宏观指标更新延迟', description: '样例 Shibor 批次超过配置的新鲜度阈值。此问题为预置演示场景，不是对真实数据源的检测。', suggestion: '检查发布时间与抓取时间，确认工作日历后重试适配器。不要用未来发布值填充历史窗口。', status: 'open', detectedAt: at },
      { id: 'q2', sourceId: 'source-market', dimension: '完整性', severity: 'low', title: '历史交易量字段缺失', description: '预置批次有少量交易量字段为空。价格字段保持完整。', suggestion: '保留缺失标识，回源补采。无法补齐时标记质量标志，禁止静默填零。', status: 'open', detectedAt: at },
      { id: 'q3', sourceId: 'source-cross', dimension: '一致性', severity: 'medium', title: '汇率单位映射需要复核', description: '示例源字段单位与UDM目录单位存在一处冲突。', suggestion: '将原始单位与标准单位分开记录，在清洗层明确转换规则并增加校验。', status: 'open', detectedAt: at },
      { id: 'q4', sourceId: 'source-news', dimension: '一致性', severity: 'low', title: '重复新闻已完成去重', description: '演示场景已按内容哈希完成幂等去重。', suggestion: '保留首条记录与所有来源标识。', status: 'resolved', detectedAt: at },
    ],
    watchlist: ['csi300', 'sp500', 'gold', 'cn-bond'], widgets: ['trend', 'state', 'heatmap', 'alerts'],
    prefs: { positiveGreen: true, compact: false, notifications: true, live: true }, imports: [],
    checkpoints: [
      { id: 'cp-1042', type: 'Checkpoint', status: 'completed', at, size: '18.4 MB', duration: 168 },
      { id: 'sp-0081', type: 'Savepoint', status: 'completed', at: '2026-10-08T09:00:00Z', size: '19.1 MB', duration: 214 },
    ],
    audit: [{ id: 'au-start', action: '演示工作区已初始化', actor: 'System', at }], modelVersion: 'gmm-demo-2.1', apiLimit: 60,
  };
}
