# FinTech frontend conventions

Independent React + TypeScript + Vite frontend repository. Do not introduce backend services, a UI framework or external font requests. Keep the existing Highcharts dependency.

- Use the existing `/market-api/v1`, `/api/v1` and `/ws/v1` contracts. Do not modify backend endpoints, response shapes or request bodies for a visual change.
- Only real API records may appear in the UI. Do not fill missing responses with fixtures, fabricated prices, heuristic model labels, user accounts or simulated successes.
- Legacy demo fixtures live only under `tests/fixtures/`; never import them from the application entry graph.
- A successful empty API result hides that data section. Keep navigation and useful input controls; show concise errors with retry for failed requests.
- `src/state/AppContext.tsx`, `src/state/defaultState.ts` and `src/lib/storage.ts` manage display preferences and watchlist IDs. Never restore old synthetic accounts, alerts, sources, permissions or model results.
- Keep the pure white background, compact density and #F0520F orange accent. Prefer hierarchy, spacing and clear action labels to explanatory microcopy. Put necessary supplementary information in accessible Info tooltips.
- Preserve labels, keyboard tabs, modal focus and reduced-motion behavior. Irreversible API writes must retain clear confirmation.
- Preserve real source/record references and numeric precision in downloads. Never interpret missing values as zero.
- Test: `npm test`. Build: `npm run build:portable` followed by `npm run build` before release. Both generated deliverables must use the same final source and all page CSS.
- The optional DOM suite is `tests/ui_contracts.cjs` (jsdom); browser checks are `tests/browser_smoke.py` (Playwright). Neither suite supplies synthetic financial records.
- Keep the real npm lockfile; do not invent it. Report verification limitations honestly, especially when the backend or a browser is unavailable.

- Navigation definitions live in `src/config/navigation.ts`; domain parsers in `src/features/`, numeric guards in `src/lib/validation.ts`, chart colors in `src/styles/palette.ts` and reusable request feedback in `src/components/RequestStatus.tsx`.
- Import application CSS once, through `src/styles/index.css`. Keep page CSS alongside the shared tokens and density layer, not in TSX module imports.
