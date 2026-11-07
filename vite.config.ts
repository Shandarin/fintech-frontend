import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const proxy = {
  '/market-api/': { target: 'http://127.0.0.1:8082', rewrite: (path: string) => path.replace(/^\/market-api\//, '/api/') },
  '/api/': { target: 'http://127.0.0.1:8080' },
  '/ws/': { target: 'ws://127.0.0.1:8080', ws: true },
};
export default defineConfig({ plugins: [react()], base: './', server: { port: 5173, proxy }, preview: { port: 5173, proxy }, build: { target: 'es2022' } });
