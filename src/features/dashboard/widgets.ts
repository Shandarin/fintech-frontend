/** Dashboard configuration contains presentation choices only, never financial records. */
export const DASHBOARD_WIDGETS = [
  { id: 'monitoring', title: '监控动态', icon: 'activity', span: 'narrow' },
  { id: 'realtime-watchlist', title: '实时自选', icon: 'star', span: 'wide' },
  { id: 'intraday', title: '当天走势', icon: 'activity', span: 'wide' },
  { id: 'benchmarks', title: '指数行情', icon: 'chart', span: 'wide' },
  { id: 'performance', title: '市场表现', icon: 'activity', span: 'wide' },
  { id: 'regime', title: '沪深300 市场状态', icon: 'layers', span: 'narrow' },
  { id: 'documents', title: '最新资讯', icon: 'book', span: 'wide' },
  { id: 'shortcuts', title: '快捷入口', icon: 'grid', span: 'narrow' },
  { id: 'tools', title: '研究与工具', icon: 'settings', span: 'full' },
] as const;

export type DashboardWidgetId = (typeof DASHBOARD_WIDGETS)[number]['id'];
export const DEFAULT_DASHBOARD_WIDGETS: DashboardWidgetId[] = ['benchmarks', 'performance', 'regime', 'documents', 'shortcuts'];
const known = new Set<string>(DASHBOARD_WIDGETS.map(widget => widget.id));

export function sanitizeDashboardWidgets(value: unknown): DashboardWidgetId[] {
  if (!Array.isArray(value)) return [...DEFAULT_DASHBOARD_WIDGETS];
  const seen = new Set<string>();
  return value.filter((id): id is DashboardWidgetId => {
    if (typeof id !== 'string' || !known.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export function addDashboardWidget(current: readonly string[], widget: string): DashboardWidgetId[] {
  const list = sanitizeDashboardWidgets(current);
  return known.has(widget) && !list.includes(widget as DashboardWidgetId) ? [...list, widget as DashboardWidgetId] : list;
}
export function removeDashboardWidget(current: readonly string[], widget: string): DashboardWidgetId[] {
  return sanitizeDashboardWidgets(current).filter(id => id !== widget);
}
export function moveDashboardWidget(current: readonly string[], widget: string, target: string): DashboardWidgetId[] {
  const list = sanitizeDashboardWidgets(current);
  const from = list.indexOf(widget as DashboardWidgetId), to = list.indexOf(target as DashboardWidgetId);
  if (from < 0 || to < 0 || from === to) return list;
  const reordered = [...list];
  reordered.splice(from, 1);
  reordered.splice(to, 0, widget as DashboardWidgetId);
  return reordered;
}
export function shiftDashboardWidget(current: readonly string[], widget: string, delta: -1 | 1): DashboardWidgetId[] {
  const list = sanitizeDashboardWidgets(current);
  const index = list.indexOf(widget as DashboardWidgetId);
  if (index < 0 || index + delta < 0 || index + delta >= list.length) return list;
  const reordered = [...list];
  [reordered[index], reordered[index + delta]] = [reordered[index + delta], reordered[index]];
  return reordered;
}


export const DEFAULT_BENCHMARKS = ['沪深300', '标普500', 'COMEX黄金期货', '美元指数DXY'];
export const benchmarkSpan = (count: number): 'narrow' | 'wide' | 'full' => count <= 2 ? 'narrow' : count <= 5 ? 'wide' : 'full';
export function closeReturn(rows: readonly {value: string; daily_return: number | null}[]): number | null {
  const last = rows.at(-1), previous = rows.at(-2);
  if (typeof last?.daily_return === 'number' && Number.isFinite(last.daily_return)) return last.daily_return;
  if (!last || !previous || !Number.isFinite(Number(last.value)) || !Number.isFinite(Number(previous.value)) || Number(previous.value) === 0) return null;
  return Number(last.value) / Number(previous.value) - 1;
}

/** Full-width cards separate independently stacked wide/narrow columns. */
export function dashboardColumns(ids: readonly DashboardWidgetId[], span: (id: DashboardWidgetId) => 'wide' | 'narrow' | 'full') {
  const sections: {full?:DashboardWidgetId;wide:DashboardWidgetId[];narrow:DashboardWidgetId[]}[] = [];
  for(const id of ids) {
    const size=span(id);
    if(size==='full'){sections.push({full:id,wide:[],narrow:[]});continue;}
    if(!sections.length || sections.at(-1)!.full)sections.push({wide:[],narrow:[]});
    sections.at(-1)![size].push(id);
  }
  return sections;
}
