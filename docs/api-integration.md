# 与独立后端Repo对接

## 当前执行路径

页面 → AppContext（本地状态/角色）→ 合成数据/analytics纯函数。

API工作台 → mockRequest（本地函数），或用户显式选择真实请求 → httpClient。

整个界面不会因为填写了 VITE_API_BASE_URL 就自动变成生产系统，也不会在真实请求失败时回退显示模拟数据。

## 逐步替换，不改变仓库结构

1. 后端确认 `openapi.yaml` 的资产、特征、状态、规则和预警字段；扩展历史范围、分页、写入、认证、数据质量和版本管理接口。
2. 在 services/ 创建按业务职责划分的adapter，接入真实认证会话和统一错误处理。
3. 页面数据加载替换为adapter，写入必须等待服务端成功。保持明确的loading/error/empty状态；线上错误不返回假成功。
4. 将AppContext的模拟角色、权限矩阵和users替换为服务端身份声明；服务端对每个资产和操作重新授权。
5. 模型快照改为真实模型版本、训练区间、数据快照和评估结果。若后端不足样本，显示不可计算，不沿用演示分数。
6. 实时流接入授权WSS，补齐指数退避重连、订阅确认、心跳、事件ID去重和断线后的快照补取。现在定时器只模拟事件格式。
7. 逐步移除模拟源，在主界面显示可辨识的环境、数据来源与最后更新时间。

## URL约定

前后端独立部署：前端Pages地址调用HTTPS API网关，WebSocket使用WSS。开发跨域由后端限制允许的Origin，不使用任意通配符携带凭据。

本地整栈Compose：前端Nginx代理/api与/graphql到后端gateway。注意当前 `deploy/nginx.conf` 对这些路径明确返回501；必须替换为实际proxy_pass配置，不能只添加容器依赖。

VITE_变量会被编入浏览器可读的产物，不放私钥、模型厂商密钥或数据库密码。相对路径`/api`的含义是API根目录；避免拼成`/api/api/...`。

## 事件草案

```json
{
  "id": "event-unique-id",
  "type": "regime.updated",
  "at": "2026-10-09T07:00:00Z",
  "payload": {
    "assetId": "csi300",
    "regime": "bull",
    "snapshotDate": "2026-10-09",
    "modelVersion": "regime-v1",
    "mock": false
  }
}
```

预留 market.tick / regime.updated / alert.created。服务端序号、可回放游标、授权订阅等字段需实际协议协商，不把这个草案当作已经部署的事件总线。

## 双Repo发布

前端独立构建静态站点 → Pages；同时构建固定版本前端Docker镜像。
后端仓库锁定经过联合测试的镜像tag/digest → 整套docker-compose。联合验收需要测试前端版本与后端契约的兼容关系，不使用latest临时组合。
