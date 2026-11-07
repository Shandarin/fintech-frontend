# FinTech

React + TypeScript 金融市场前端。提供行情、宏观指标、经济日历、资讯研报、模型特征与历史回放，保留独立前端仓库和现有后端契约。

## 启动

需要 Node.js ≥22.12 和 npm。

```bash
npm ci
npm run dev
```

打开 http://localhost:5173 。现有 Vite 代理保持不变：

| 前端路径 | 本机后端 | 用途 |
| --- | --- | --- |
| `/market-api/` | `http://127.0.0.1:8082/api/` | 市场数据、指标、日历、资讯与来源 |
| `/api/` | `http://127.0.0.1:8080/api/` | 模型、特征与回放 |
| `/ws/` | `ws://127.0.0.1:8080/ws/` | 回放通知 |

前端不创建行情、新闻、账户或模型样本。接口成功但没有数据时，不渲染对应的数据卡片、图表和空表格。接口失败保留简短的错误与重试入口，不回退到模拟数据。

静态托管不运行 Vite 代理，部署时仍需提供上述同源转发。详细环境说明见 [部署指南](docs/deployment.md) 和 [回放联调](docs/hs300-replay.md)。

## 页面

| 入口 | 功能 |
| --- | --- |
| 市场总览 | 可添加、移除和调整顺序的自定义卡片看板；仅渲染真实市场报价、表现、回放状态和资讯 |
| 行情中心 | 搜索资产、类别筛选、自选、历史行情、CSV 导出、状态叠加及记录来源 |
| 宏观 | 指标选择、观察值与来源、CSV 导出 |
| 经济日历 | 按周与日期浏览有事件的日期 |
| 资讯研报 | 证券代码筛选、资讯列表、资料详情、来源与社交互动记录 |
| 市场研究 | 后端模型和回放记录中的特征，区间统计、走势、明细和导出 |
| 市场回放 | 选择模型与区间、启动回放、REST/WebSocket 同步、状态与当日特征、模型详情 |
| 工具 | 数据管理、记录溯源、真实 API 访问、显示偏好 |

全局搜索支持 `Ctrl/Cmd + K`。页面支持稳定的 Hash 路由，例如：

```text
#/data?tab=history&asset=沪深300
#/data?tab=macro
#/data?tab=calendar
#/data?tab=news
```

原来的演示登录、角色切换、模拟预警、模拟服务遥测、模拟导入和假模型输出已从实际界面移除。旧预警与服务状态 URL 保留安全落地，不显示演示数据。原有离线计算和模拟器夹具已集中到 `tests/fixtures/`，与生产源码隔离。

看板卡片配置（包括顺序）、显示偏好和真实资产的自选列表均保存在 `fintech.preferences.v2`。首页点击“自定义看板”可添加、移除和重排卡片；拖动排序也有可用键盘操作的上下移动按钮。旧浏览器缓存只迁移有效的显示偏好，不恢复演示账号、预警、行情或权限。

## 构建与验证

```bash
npm test
npm run typecheck
npm run build:portable
npm run build
```

`build:portable` 生成根目录 `RegimeLab-preview.html`，通过 `src/styles/index.css` 解析并内联全部 CSS。缺少 npm 依赖时可用 `TS_MODULE` 指定本机已安装的 TypeScript，离线预览使用 `vendor/` 内的已包含运行时。该文件包含应用界面，数据仍需要真实后端，不提供离线样例。

`npm run build` 生成标准 Vite 产物到 `dist/`。先运行便携构建、再运行标准构建，可同时交付单文件预览和标准生产产物。

```bash
npm run preview
```

此预览沿用 Vite 的现有后端代理。`node scripts/serve.mjs` 仅提供静态文件，不提供 API 转发。

可选 UI 回归脚本：

- `tests/browser_smoke.py`：需要 Playwright 和 Chromium，检查桌面/手机布局、导航、空响应、错误状态、设置和写操作确认。只提供空接口响应或明确错误，不填入金融样例数据。
- `tests/ui_contracts.cjs`：需要独立安装的 `jsdom`，或通过 `JSDOM_MODULE` 指定其安装路径。检查真实 React 代码的 DOM/状态行为，不等同于浏览器视觉验收。
- `tests/hs300_replay.py`：需要运行中的真实后端及原始模型包，对账快照、接口和页面值。它会创建真实回放任务，应仅在相应测试环境运行。

本次代码集中化的架构变更见 [重构说明](docs/refactor.md)，实际检查与限制见 [验证记录](docs/verification.md)。

最新布局和看板功能说明见 [自定义市场看板](docs/dashboard-customization.md)。
