# RegimeLab frontend conventions

Independent frontend repository; do not introduce backend services here.
- React + TypeScript + Vite; no UI framework, chart dependency or external font request.
- `src/data/mock.ts` is synthetic data, never label it as live market data.
- `src/lib/analytics.ts` contains pure, tested local computations.
- `src/state/AppContext.tsx` owns mock writes, roles, audit, persistence and demo events.
- `src/services/mockApi.ts` is a local API simulator, NOT a real HTTP/GraphQL server.
- Real requests must report errors. Never silently replace a failed real response with mock data.
- Do not put tokens or secrets in `VITE_` variables or local mock settings.
- Heuristic regime scores are NOT calibrated probabilities or real GMM/HMM inference.
- Preserve keyboard navigation, modal focus, responsive layouts and visible mock notices.
- Frontend permissions are demonstration logic, never a production authorization boundary.
- Build: npm run build. Tests: npm test. Portable preview: npm run build:portable.
- After changing code, rebuild dist and RegimeLab-preview.html before release.
- Check actual npm lockfile into the repository after a successful install; never invent one.
