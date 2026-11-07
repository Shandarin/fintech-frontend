/** Build a self-contained browser preview from the same React/TypeScript source.
 * Standard deployment uses `npm run build` (Vite); this builder is a portable shell; data still requires the configured backend APIs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let ts;
try { ts = require('typescript'); }
catch (error) {
  if (process.env.TS_MODULE) ts = require(process.env.TS_MODULE);
  else throw new Error('Install dependencies with npm install before building. ' + error.message);
}
const files = new Set([path.join(root, 'src/main.tsx')]);
const modules = [];
const styles = new Set();
let errors = 0;
for (const p of files) {
  const id = path.relative(root, p).replaceAll('\\', '/');
  const source = fs.readFileSync(p, 'utf8').replaceAll('import.meta.env', "({VITE_API_BASE_URL:'',VITE_WS_URL:''})");
  const result = ts.transpileModule(source, {
    fileName: p,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.React, esModuleInterop: true, isolatedModules: true,
    },
  });
  for (const diagnostic of result.diagnostics || []) {
    if (diagnostic.category === ts.DiagnosticCategory.Error) {
      console.error(id + ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
      errors++;
    }
  }
  for (const [, dependency] of result.outputText.matchAll(/require\("([.][^"]+)"\)/g)) {
    if (dependency.endsWith('.css')) { styles.add(path.resolve(path.dirname(p), dependency)); continue; }
    const base = path.resolve(path.dirname(p), dependency);
    const file = [base + '.tsx', base + '.ts'].find(candidate => fs.existsSync(candidate));
    if (!file) throw new Error('Missing source module: ' + dependency);
    files.add(file);
  }
  modules.push(`${JSON.stringify(id)}:function(module,exports,require){\n${result.outputText}\n}`);
}
if (errors) process.exit(1);
const runtime = fs.readFileSync(path.join(root, 'vendor/react-runtime.js'), 'utf8');
const highstockInstall = path.join(root, 'node_modules/highcharts/highstock.js');
const charts = fs.readFileSync(fs.existsSync(highstockInstall) ? highstockInstall : path.join(root, 'vendor/highstock.js'), 'utf8');
const app = `${charts}\n${runtime}\n;(function(){'use strict';
var modules={${modules.join(',\n')}};
var cache={};
var external={'highcharts/highstock.js':window.Highcharts,'react':window.React,'react-dom/client':window.ReactDOM,'react-dom':window.__ReactDOMPortals};
function resolve(request,parent){
  if(Object.prototype.hasOwnProperty.call(external,request))return request;
  if(request.endsWith('.css'))return '__style__';
  if(!request.startsWith('.'))throw Error('Unbundled module: '+request);
  var parts=(parent.slice(0,parent.lastIndexOf('/')+1)+request).split('/'),clean=[];
  parts.forEach(function(p){if(p==='..')clean.pop();else if(p&&p!=='.')clean.push(p)});
  var p=clean.join('/');
  for(var name of [p,p+'.ts',p+'.tsx',p+'.js',p+'/index.ts',p+'/index.tsx'])if(modules[name])return name;
  throw Error('Missing module '+request+' in '+parent);
}
function load(id){
  if(id==='__style__')return {};
  if(Object.prototype.hasOwnProperty.call(external,id))return external[id];
  if(cache[id])return cache[id].exports;
  var module={exports:{}};cache[id]=module;
  modules[id](module,module.exports,function(r){return load(resolve(r,id))});
  return module.exports;
}
load('src/main.tsx');
})();`;
function resolveCss(file, visiting = new Set()) {
  if (visiting.has(file)) throw new Error('CSS @import loop at ' + file);
  visiting.add(file);
  const contents = fs.readFileSync(file, 'utf8');
  const expanded = contents.replace(/@import\s+(?:url\()?['"]([^'"]+\.css)['"]\)?\s*;/g, (_, name) => {
    const child = path.resolve(path.dirname(file), name);
    if (!child.startsWith(path.join(root, 'src') + path.sep)) throw new Error('CSS import outside src: ' + name);
    return resolveCss(child, new Set(visiting));
  });
  return `/* ${path.relative(root, file).replaceAll('\\','/')} */\n${expanded}`;
}
const css = [...styles].map(file => resolveCss(file)).join('\n');
const dist = path.join(root, 'dist');
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
fs.writeFileSync(path.join(dist, 'assets/app.js'), app);
fs.writeFileSync(path.join(dist, 'assets/style.css'), css);
if (fs.existsSync(path.join(root, 'public'))) fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
const head = '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#ffffff"><meta name="description" content="FinTech · 行情、市场研究与历史回放"><title>市场总览 · FinTech</title>';
fs.writeFileSync(path.join(dist, 'index.html'), `${head}<link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./assets/style.css"></head><body><div id="root"></div><script src="./assets/app.js"></script></body></html>`);
fs.writeFileSync(path.join(root, 'RegimeLab-preview.html'), `${head}<style>${css.replaceAll('</style', '<\\/style')}</style></head><body><div id="root"></div><script>${app.replaceAll('</script', '<\\/script')}</script></body></html>`);
console.log(`Built ${files.size} source modules → dist/ and RegimeLab-preview.html (${Math.round(app.length / 1024)} KB JavaScript).`);
