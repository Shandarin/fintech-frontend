# 前端模块集中化重构

## 目标与约束

基于最后的纯白背景、紧凑布局与 `#F0520F` 主题版本重构。**不修改 API、代理、请求体、后端契约或业务数据源**。视觉 CSS 在整理前后进行内容比对，仅移动与合并加载入口，不改变已生效的规则。

## 目录职责

| 位置 | 唯一职责 |
| --- | --- |
| `src/config/navigation.ts` | 所有路由、导航菜单、首页快捷入口及全局搜索目的地 |
| `src/styles/index.css` | 单一 CSS 入口，按 tokens → foundation → pages → density 的顺序加载 |
| `src/styles/tokens.css` | 白底、品牌色、橙色交互色、边界和密度变量 |
| `src/styles/palette.ts` | SVG、Highcharts 等 JS 绘图必须使用的共享颜色常量 |
| `src/features/market/` | 资产目录的验证与解析、行情数值和日期验证、图表数据适配 |
| `src/features/documents/` | 新闻记录与 payload 解析、资料抽屉、证券新闻与列表 |
| `src/features/indicators/` | 指标目录、观察值加载与图表展示 |
| `src/features/replay/model.ts` | 会话、模型、预测、特征的响应解析与状态标签 |
| `src/features/quality/model.ts` | 数据质量来源、批次和问题的纯解析逻辑 |
| `src/services/` | 保留 HTTP/分页接口；回放 API 请求单独归于 `replay.ts` |
| `src/lib/` | CSV、安全文件下载、数值格式化、响应值验证、会话存储 |
| `src/components/RequestStatus.tsx` | 失败重试与加载反馈的公共可访问组件 |
| `src/state/defaultState.ts` | 真实显示设置与 watchlist 的默认本地状态 |
| `tests/fixtures/` | 不属于生产应用的旧模拟数据、测试 API 与离线算法 |

## 合并和清理

- 原 `MarketResearch.tsx` 混放的指标与新闻功能拆分成 feature 模块，页面入口直接组合已有功能。
- 原本在首页、行情列表和搜索中重复定义的导航及资产过滤规则集中维护。
- Highcharts、SVG 图表、回放的颜色常量改为共享；保留原有具体颜色，无视觉改动。
- 日期、有限数值、字符串值校验合并，保留精度及 `null` 的语义，不把缺失值变为零。
- 多个页面重复的“加载”和“错误 + 重试” JSX 合为公共组件；成功但无数据仍不展示空卡片。
- 原五处 CSS 导入变为一个 `styles/index.css`；删除没有在应用引用的 `App.css`、`index.css`、Vite 默认图片、旧 SVG sprite、演示版后端行情页及失效构建块。
- 模拟 API、生成的示例行情、旧离线算法移动到单元测试目录，原 24 项测试仍可运行，应用打包图不含这些模块。

## 验证与使用

`npm ci && npm test && npm run build:portable && npm run build` 是标准环境下的完整检查。此轮运行环境无法获取缺失的 npm 包，所以使用系统 TypeScript 和随原交付已包含的 React/Highcharts 运行时构建单文件预览与 `dist/` 便携静态版本。未声称 Vite 正式构建通过。详情见 `verification.md`。
