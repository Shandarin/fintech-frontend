# Source build. Requires network access to npm and the container registry.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
# No lockfile is fabricated in this deliverable. After the first npm install,
# commit package-lock.json and switch this layer to COPY package*.json / npm ci.
RUN npm install --no-audit --no-fund
COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

FROM nginx:1.28-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=5 \
  CMD wget -q -O - http://127.0.0.1/healthz || exit 1
