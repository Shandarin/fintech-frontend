# 2026-11-07 · 前端集中化重构验证（按本次上传代码重新生成）

| 检查 | 本轮结果 |
| --- | --- |
| 旧领域与 API 测试 | 24/24 通过（测试夹具移至 `tests/fixtures/`） |
| 新领域回归测试 | 8/8 通过；日期、精度、无数据、资产目录、文档、回放、质量、配色导航 |
| 领域纯 TypeScript 严格类型检查 | 通过（本次重新执行，覆盖 market、documents、replay、quality、格式化、校验、导航及色板模块） |
| `build:portable` | 通过（本次重新生成），合成 CSS 和 41 个源模块，内含真实 React 和 Highcharts |
| 编译后的 JS 语法检查 | 本次 `node --check dist/assets/app.js` 通过，CSS 已通过 PostCSS 解析 |
| 视觉 CSS 一致性 | 与输入版本 `RegimeLab-preview.html` 的 CSS 去注释与空白后完全一致 |
| HTTP/分页/行情文件、OpenAPI 与 Vite 代理 | 与输入版本逐字节相同 |
| 生产入口 | 不含任何 `tests/fixtures/` 模拟数据与 API 模块 |

**环境限制：**此运行环境不能联网安装锁文件缺失的依赖，`npm ci` 和标准 `npm run build` / 全项目 `npm run typecheck` 未能完成。已生成 `dist/` 便携静态预览和单文件预览，但它们不是正式 Vite 生产构建。运行环境未安装可启动的 Chromium 或 JSDOM，故未执行桌面/手机视觉回归、DOM 交互套件或真实后端联调。旧版本的 DOM 测试报告不能算作本轮通过。

在正常 Node.js 环境请运行：`npm ci && npm test && npm run typecheck && npm run build:portable && npm run build`。真实后端验证与浏览器测试应在部署或联调环境另行完成。

本次上传的代码与此前 `#F0520F` 输入版本的 100 个同名文件字节一致；上传包未包含旧的 `dist/`，另有仅供同步工具使用的 `RETURN_INSTRUCTIONS.txt`。本包按上传版本应用集中化重构，并重新生成 `dist/` 与单文件预览。保留了原包的 IDE 配置与历史测试记录以避免非必要删除；同步工具说明文件按其自身约定不回传。
