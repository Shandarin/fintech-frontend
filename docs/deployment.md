# 前端部署与本地测试

本文以当前源码和配置为准。前端是独立仓库，所有业务数据均从现有后端读取。没有数据的区块自动隐藏；导航、查询与显示设置仍可使用。应用不提供演示身份或模拟数据。

## 1. 新机器准备

安装 Git、Node.js ≥22.12（含 npm）；使用容器时另装 Docker Desktop 或 Docker Engine 和 Compose。Windows 推荐在 WSL 2 / Ubuntu 中开发，并启用 Docker Desktop 的 WSL Integration。以下命令在前端仓库根目录运行，示例使用 Bash。

```bash
cd ~/projects/fintech-frontend
node --version
npm --version
npm ci
```

源码需从前端仓库单独获取，后端 FinanceTech 不包含此前端目录。仓库已有 package-lock.json，使用 npm ci 按锁文件安装依赖；首次安装需要访问 npm。

## 2. 本地启动与后端联调

```bash
npm run dev
```

访问 http://localhost:5173 。以终端实际输出为准，端口占用时 Vite 可能选择其他端口。停止服务按 Ctrl+C。

当前 vite.config.ts 同时为开发服务与构建预览配置以下代理：

| 浏览器路径 | 本机目标 | 用途 |
| --- | --- | --- |
| /market-api/ | http://127.0.0.1:8082/api/ | 市场数据、新闻、指标、经济日历等 |
| /api/ | http://127.0.0.1:8080/api/ | 回放等 API |
| /ws/ | ws://127.0.0.1:8080/ws/ | 回放 WebSocket |

后端新机器启动见 FinanceTech 的 docs/team-setup.md。市场数据后端需要发布到宿主机 8082，例如在其 .env 中设置 API_PORT=8082 后启动；回放后端需独立准备并使用 8080，不能让两个实例占用同一端口。正式数据页面使用 dataset=main，需要授权导入；仅运行后端默认 demo 不会生成 main 数据。真实回放还需要模型包与流处理服务，具体验收见 [沪深300回放联调](hs300-replay.md)，其中旧机器绝对路径必须替换，不能照搬。

可先检查市场数据服务：

```bash
curl -fsS http://localhost:8082/api/v1/health
curl -fsS 'http://localhost:8082/api/v1/indicators?dataset=main'
```

后端端口不同时，调整 vite.config.ts 的代理目标并重启 Vite。远程浏览器中的 localhost 指向访问者自己的机器，优先使用上述同源代理。

.env.example 提供可选 VITE_API_BASE_URL、VITE_WS_URL；仅对读取这些变量的代码有效，不能覆盖所有页面中固定的 /market-api 路径。VITE_ 配置会进入浏览器产物，禁止存放密钥；修改后需重启开发服务或重新构建。

## 3. 本地测试

安装依赖后执行：

```bash
npm test
npm run typecheck
npm run build
npm run preview
```

前三条分别检查纯函数/模拟 API 等单元测试、TypeScript 类型和生产构建。预览访问 http://localhost:5173；先停止占用该端口的开发服务，或以终端输出为准。preview 带有同样的本地代理，适合检查生产构建与后端联调，但不是正式托管服务。

浏览器手工验收：

- 打开总览、历史行情、研究资料、经济日历、数据质量及真实回放入口；检查页面、筛选和分页，无横向溢出或控制台异常。
- 在开发者工具 Network 中确认 /market-api 请求返回 JSON，数据源为 main；查看新闻、指标和经济日历是否与后端一致。
- 验证回放启动、日期切换与 WebSocket；关闭对应后端后确认页面显示错误，恢复后可重新加载。
- 缩小到手机宽度，验证导航、弹窗、键盘操作；确认空响应不出现占位数据，错误请求保留重试。

可选的便携版浏览器冒烟测试：

```bash
npm run build:portable
python3 -m venv .venv-browser
.venv-browser/bin/pip install playwright
.venv-browser/bin/python -m playwright install chromium
CHROMIUM_PATH=$(.venv-browser/bin/python -c 'from playwright.sync_api import sync_playwright; p=sync_playwright().start(); print(p.chromium.executable_path); p.stop()') .venv-browser/bin/python tests/browser_smoke.py
```

Linux 若缺少浏览器系统依赖，可按 Playwright 的提示安装依赖。脚本通过本机 HTTP 提供 RegimeLab-preview.html，使用空接口响应与明确失败检查便携版交互、跨刷新显示偏好和响应式布局，不验证真实金融数据或真实后端。它会更新测试结果文件；运行后检查 git diff，避免误提交本机结果。便携构建不替代对 npm run build 产物的验证。

## 4. 静态部署

```bash
npm ci
npm run build
```

将 dist/ 的内容部署到静态托管平台，站点根目录应直接包含 index.html。Cloudflare Pages 可使用构建命令 npm run build、输出目录 dist、Node ≥22.12。页面使用 Hash 路由。

静态平台不会执行 Vite 代理。需要在网关提供 /market-api/、/api/ 和 /ws/ 的转发，映射与第2节一致；HTTPS 页面对应使用 HTTPS/WSS。仅上传 dist 或填写 VITE_API_BASE_URL，不能自动接通所有真实页面。

已有 dist 时可本地查看静态文件：

```bash
node scripts/serve.mjs
```

访问 http://localhost:4173；该服务只监听本机，不提供 API 代理。dist 缺失时先构建。单文件 RegimeLab-preview.html 也可直接打开，但浏览器可能限制 file:// 存储。

## 5. Docker 部署

默认运行仓库中已有的 dist，不会自动把最新源码编译进去：

```bash
docker compose up -d --build
docker compose ps
curl -fsS http://localhost:3000/healthz
```

访问 http://localhost:3000 。该配置使用 Dockerfile.preview 和 deploy/nginx.conf，/api/ 与 /graphql 返回 501，未配置市场数据及 WebSocket 代理，适用于静态预览。

从源码构建：

```bash
docker compose -f docker-compose.yml -f compose.source.yml up -d --build
```

此配置仍使用默认预览 Nginx，不会自动连接后端。当前 Dockerfile 使用 npm install，并只复制部分 TypeScript 配置；容器构建与本机 npm ci 流程不同，发布前必须实际验证镜像构建。

仓库另有真实联调配置：

```bash
docker compose -f deploy/replay.compose.yml up -d --build
```

此配置依赖已存在的 financetech_internal、hs300-replay_internal 网络，以及 financetech-api-1:8080、hs300-replay-api-1:8080 两个后端容器。REPLAY_NETWORK 仅覆盖回放网络名，不能同时修改 Nginx 内的容器地址；命名不同需同步调整 deploy/replay.compose.yml 与 deploy/nginx.replay.conf。此入口绑定 127.0.0.1:3000，仅供本机访问。不能在新机器尚未准备后端网络时直接使用。

查看日志与停止（使用启动时同一组 Compose 文件）：

```bash
docker compose logs --tail 100 frontend
docker compose down
# 回放联调配置的停止方式：
docker compose -f deploy/replay.compose.yml down
```

## 6. 常见问题

| 现象 | 检查方式 |
| --- | --- |
| npm ci 失败 | 核对 Node 版本、npm 网络与锁文件；不要通过删除锁文件绕过问题 |
| 页面可打开，接口失败 | 检查后端端口、Vite/Nginx 代理和浏览器 Network 响应 |
| 正式数据为空 | 确认已导入 main；demo 数据集与 main 分开 |
| Docker 返回 501 | 默认配置没有接入后端，按联调配置准备网络和代理 |
| 更新源码后页面仍旧 | 默认 Docker 使用已有 dist；重新构建产物或使用源码构建模式 |
| 静态部署接口返回 HTML/404 | 静态平台未配置 API 代理，不能把首页回退当作 API 响应 |
| WebSocket 断开 | 检查 /ws/ 转发、Upgrade 请求头和 HTTPS/WSS 是否匹配 |

比赛源数据保持只读，不能复制进前端仓库或测试夹具。
