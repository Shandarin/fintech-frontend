import React, { useState } from 'react';
import { useApp } from '../state/AppContext';
import { Badge, Button, Card, Field, Modal, Notice, PageHead } from '../components/ui';
import { Icon } from '../components/Icon';
import { metrics, number, sampleRegime } from '../lib/analytics';
import type { Metric } from '../types';
import { downloadFile } from '../lib/files';
const NODES = [
  { id: 'ods', layer: 'ODS', title: '原始数据', subtitle: '保留来源与原始口径', icon: 'file', storage: 'MinIO', color: 'blue' },
  { id: 'dwd', layer: 'DWD', title: '清洗标准化', subtitle: '统一时间、编码与单位', icon: 'database', storage: 'ClickHouse', color: 'purple' },
  { id: 'dws', layer: 'DWS', title: '特征计算', subtitle: '日窗口与版本快照', icon: 'chart', storage: 'Flink → Redis', color: 'green' },
  { id: 'ads', layer: 'ADS', title: '状态与服务', subtitle: '模型画像与预警应用', icon: 'activity', storage: 'Model / API', color: 'amber' },
];
export default function Lineage() {
  const app = useApp(), { state, assets, to } = app; const [node, setNode] = useState('dws'), [raw, setRaw] = useState(false);
  const asset = assets.find(a => a.id === app.selectedAsset) || assets[0], feature = state.features.find(f => f.id === app.selectedFeature) || state.features[0];
  const points = asset?.prices.filter(p => p.date <= to) || [], p = points.at(-1), value = metrics(points)[feature.id as Metric];
  const source = state.sources.find(s => s.id === asset?.source); const selectedNode = NODES.find(n => n.id === node)!;
  const rawSample = { mock: true, asset_id: asset?.id, symbol: asset?.symbol, event_time: p?.date, available_at: `${p?.date}T15:00:00+08:00`, ingested_at: `${p?.date}T15:00:03+08:00`, close: p?.close, volume: p?.volume, currency: asset?.currency, source_id: source?.id, schema_version: 'udm.v1', quality_flags: ['synthetic', 'demonstration'] };
  const manifest = { mock: true, notice: '示例血缘清单，不代表真实ETL运行记录', asset: asset?.id, feature: { id: feature.id, version: feature.version, formula: feature.formula }, snapshot: p?.date, lineage: NODES.map((n, i) => ({ id: n.id, layer: n.layer, storage: n.storage, upstream: i ? [NODES[i - 1].id] : [], downstream: i < 3 ? [NODES[i + 1].id] : [] })), source: rawSample, model: state.modelVersion };
  const snippets: Record<string, string> = {
    ods: JSON.stringify(rawSample, null, 2),
    dwd: `-- 示意转换规则，非实际执行的SQL\nSELECT\n  map_instrument(raw.symbol) AS asset_id,\n  toDate(raw.event_time) AS event_date,\n  raw.available_at,\n  normalize_unit(raw.price, raw.currency) AS close,\n  raw.source_id, raw.version\nFROM ods.market_raw AS raw\nWHERE raw.event_time <= :as_of\n-- 去重键：(asset_id, event_time, source_id, version)`,
    dws: JSON.stringify({ mock: true, feature_id: feature.id, feature_version: feature.version, asset_id: asset?.id, event_date: p?.date, window: `${feature.window}d`, expression: feature.formula, value: Number.isFinite(value) ? Number(value.toFixed(4)) : null, note: Number.isFinite(value) ? '当前值由合成样本本地计算' : '目录元数据，尚无计算值', checkpoint: 'cp-1042 (示例)' }, null, 2),
    ads: JSON.stringify({ mock: true, asset_id: asset?.id, snapshot_date: p?.date, regime: sampleRegime(points).regime, display_model: state.modelVersion, actual_engine: 'frontend-demo-heuristic', downstream: ['GET /states', 'GraphQL workspace', 'regime.updated', 'Alert rules'] }, null, 2),
  };
  return <><PageHead title="数据血缘" actions={<Button variant="primary" icon="download" onClick={() => downloadFile('lineage-manifest-demo.json', JSON.stringify(manifest, null, 2), 'application/json')}>导出血缘清单</Button>}/><div className="section-toolbar"><div className="filter-row"><select aria-label="血缘资产" value={asset?.id || ''} onChange={e => app.setSelectedAsset(e.target.value)}>{assets.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select><select aria-label="血缘特征" value={feature.id} onChange={e => app.setSelectedFeature(e.target.value)}>{state.features.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}</select><Badge>{feature.version}</Badge></div><span className="muted small">快照 {p?.date} · 示例处理关系</span></div>
    <Card title="端到端处理链路" subtitle={`${asset?.name || '未选择资产'} / ${feature.name}`} action={<Badge tone="amber">架构与血缘演示</Badge>}><div className="lineage-canvas"><div className="lineage-flow">{NODES.map((n, i) => <React.Fragment key={n.id}><button type="button" className={`lineage-node ${node === n.id ? 'active' : ''}`} onClick={() => setNode(n.id)}><div><Badge tone={n.color}>{n.layer}</Badge><Icon name={n.icon} size={22}/></div><h3>{n.title}</h3><p>{n.subtitle}</p><span>{n.storage}</span></button>{i < NODES.length - 1 && <div className="lineage-edge"><span>{i === 0 ? '适配 / 清洗' : i === 1 ? '窗口聚合' : '状态识别'}</span><Icon name="arrow" size={24}/></div>}</React.Fragment>)}</div><div className="lineage-under"><div><Icon name="branch" size={17}/><b>统一元数据</b><span>MySQL · 特征版本 / 规则 / 数据目录</span></div><div><Icon name="wifi" size={17}/><b>事件传输</b><span>Kafka · 数据 / 特征 / 状态 / 预警</span></div></div></div></Card>
    <div className="two-col lineage-details"><Card title={`${selectedNode.layer} · ${selectedNode.title}`} subtitle="点击上方节点查看各阶段记录" action={<Button variant="ghost" icon="file" onClick={() => setRaw(true)}>原始样本</Button>}><pre className="code-block lineage-code">{snippets[node]}</pre></Card><Card title="节点元数据" subtitle="版本、依赖与可得性"><dl className="key-values"><div><dt>数据层</dt><dd>{selectedNode.layer}</dd></div><div><dt>数据源</dt><dd>{source?.name || '未指定'}</dd></div><div><dt>模式版本</dt><dd className="mono">udm.v1</dd></div><div><dt>特征版本</dt><dd className="mono">{feature.version}</dd></div><div><dt>模型元数据</dt><dd className="mono">{state.modelVersion}</dd></div><div><dt>时间上界</dt><dd>{to}</dd></div><div><dt>原始数据</dt><dd><Badge tone="amber">synthetic</Badge></dd></div></dl><div className="card-inner"><Button className="full-width" icon="shield" onClick={() => app.navigate('quality')}>检查数据质量</Button></div></Card></div><Notice>这是前端中的示例血缘模型，不会访问MinIO、ClickHouse或Kafka。所示分层与组件对应赛题架构，正式接入需要后端返回真实运行ID、来源版本、处理规则和时间戳。</Notice>
    {raw && <Modal title="原始数据快照 · 示例" onClose={() => setRaw(false)}><pre className="code-block">{JSON.stringify(rawSample, null, 2)}</pre><p className="muted small">event_time 是数据所属时间；available_at 是可用时间；ingested_at 是采集时间。这里的时间戳为演示生成。</p></Modal>}
  </>;
}
