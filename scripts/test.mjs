import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const ts = require(process.env.TS_MODULE || 'typescript');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '.test-build');
fs.rmSync(out, { recursive: true, force: true });
for (const relative of ['src/types.ts','src/lib/analytics.ts','src/lib/files.ts','src/data/mock.ts','src/services/mockApi.ts']) {
  const compiled = ts.transpileModule(fs.readFileSync(path.join(root, relative), 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
  const target = path.join(out, relative.replace(/\.ts$/, '.js'));
  fs.mkdirSync(path.dirname(target), { recursive: true });fs.writeFileSync(target, compiled);
}
fs.writeFileSync(path.join(out, 'package.json'), '{"type":"commonjs"}');
const result = spawnSync(process.execPath, ['--test','tests/domain.test.cjs'], { cwd: root, stdio: 'inherit' });
process.exit(result.status ?? 1);
