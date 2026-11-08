import React from 'react';
import { Card, IconButton } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { DASHBOARD_WIDGETS, type DashboardWidgetId } from './widgets';

interface Props {
  id: DashboardWidgetId;
  editing: boolean;
  position: number;
  count: number;
  onRemove: (id: DashboardWidgetId) => void;
  onMove: (id: DashboardWidgetId, direction: -1 | 1) => void;
  onDropWidget: (source: DashboardWidgetId, target: DashboardWidgetId) => void;
  span?: 'narrow' | 'wide' | 'full';
  action?: React.ReactNode;
  children: React.ReactNode;
}
export function DashboardWidget({ id, editing, position, count, onRemove, onMove, onDropWidget, action, children, span }: Props) {
  const definition = DASHBOARD_WIDGETS.find(item => item.id === id)!;
  return <Card title={definition.title} className={`dashboard-widget dashboard-span-${span || definition.span} ${editing ? 'dashboard-editing' : ''}`}
    data-widget-id={id} draggable={editing}
    onDragStart={event => { if (!editing) return; event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', id); }}
    onDragOver={event => { if (editing) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; } }}
    onDrop={event => { if (!editing) return; event.preventDefault(); const source = event.dataTransfer.getData('text/plain') as DashboardWidgetId; onDropWidget(source, id); }}
    action={<div className="dashboard-card-actions">{!editing && action}{editing && <>
      <span className="dashboard-drag-handle" title="拖动卡片排序"><Icon name="grip" size={15}/></span>
      <IconButton icon="arrowup" label={`上移${definition.title}`} onClick={() => onMove(id, -1)} disabled={position === 0}/>
      <IconButton icon="arrowdown" label={`下移${definition.title}`} onClick={() => onMove(id, 1)} disabled={position === count - 1}/>
      <IconButton icon="close" label={`移除${definition.title}卡片`} onClick={() => onRemove(id)}/>
    </>}</div>}
  >{children}</Card>;
}
