# 沪深 300 回放联调

后端基线为 f74dcda。以下命令在拥有 Docker 权限的 WSL 终端执行。

~~~bash
cd /home/dev/projects/FinanceTech/.runtime/hs300-backend
export COMPOSE_PROJECT_NAME=hs300-replay
./ft stream import /home/dev/projects/FinanceTech/.runtime/modeling/bundles/20261101T141956611752Z-242c7770.zip
./ft stream up
curl -fsS http://localhost:8080/api/v1/stream/status
curl -fsS http://localhost:8080/api/v1/models
~~~

确认 ready 为 true，模型列表包含文件名中的模型 ID。在前端目录执行 npm ci、npm run build、npm run preview，打开 http://localhost:5173/#/regimes 。也可以从前端目录运行 docker compose -f deploy/replay.compose.yml up -d --build，并访问 http://localhost:3000/#/regimes 。如后端使用自定义网络，将 REPLAY_NETWORK 设置为 API 所在的 Compose 网络。

进入“真实回放”，点击“启动回放”。等待 COMPLETED 和结果 30/30。任选一个交易日期，记录会话 ID，用 /api/v1/regimes 和 /api/v1/features 查询，参数为 session_id、from 和 to，两个日期均填所选日期。比对页面收盘价、六项特征和三项归属概率（页面概率为百分数）。用 pandas.read_parquet 读取包内 snapshot.parquet，按 business_date 选同一日核对 close。刷新页面并断开、恢复浏览器网络后，确认会话一致、日期未重复、历史完整。

## 本机已初始化后的复启动

此机已导入模型，并保留隔离卷和镜像。用有 Docker 权限的 WSL 用户运行：

~~~bash
cd /home/dev/projects/FinanceTech/.runtime/hs300-backend
export COMPOSE_PROJECT_NAME=hs300-replay COMPOSE_FILE=docker-compose.yml:compose.local-replay.yml STREAM_ENABLED=true
docker compose up -d --no-build --no-deps --wait mysql redis clickhouse kafka minio
docker compose --profile streaming up -d --no-build --no-deps api flink-jobmanager flink-taskmanager stream-controller model-inference
./ft stream status
~~~

本机覆盖配置为控制器和推理服务设置了 no_proxy，使集群内的 Flink 请求直连。构建期间使用了项目级代理和本地 wheel 缓存。上述复启动复用已构建镜像。

可选自动验收需要 Playwright、浏览器、pandas、pyarrow；在前端目录运行 python tests/hs300_replay.py /绝对路径/模型包.zip --channel msedge。脚本会创建一场新回放并用原始快照对账。
