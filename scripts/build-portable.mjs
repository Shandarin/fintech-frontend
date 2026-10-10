/** Build a self-contained browser preview from the same React/TypeScript source.
 * Standard deployment uses `npm run build` (Vite); this builder is for offline demos.
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
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(p) && !p.endsWith('.d.ts')) files.push(p);
  }
}
walk(path.join(root, 'src'));
const modules = [];
let errors = 0;
for (const p of files) {
  const id = path.relative(root, p).replaceAll('\\', '/');
  const source = fs.readFileSync(p, 'utf8').replaceAll('import.meta.env', "({VITE_API_BASE_URL:'/api',VITE_WS_URL:''})");
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
  modules.push(`${JSON.stringify(id)}:function(module,exports,require){\n${result.outputText}\n}`);
}
if (errors) process.exit(1);
const runtime = fs.readFileSync(path.join(root, 'vendor/react-runtime.js'), 'utf8');
const app = `${runtime}\n;(function(){'use strict';
var modules={${modules.join(',\n')}};
var cache={};
var external={'react':window.React,'react-dom/client':window.ReactDOM,'react-dom':window.__ReactDOMPortals};
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
const css = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');
const dist = path.join(root, 'dist');
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
fs.writeFileSync(path.join(dist, 'assets/app.js'), app);
fs.writeFileSync(path.join(dist, 'assets/style.css'), css);
if (fs.existsSync(path.join(root, 'public'))) fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
const head = '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="FinTech · 金融市场状态监控平台 · 合成数据交互演示"><title>FinTech · 市场状态监控</title>';
fs.writeFileSync(path.join(dist, 'index.html'), `${head}<link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./assets/style.css"></head><body><div id="root"></div><script src="./assets/app.js"></script></body></html>`);
fs.writeFileSync(path.join(root, 'RegimeLab-preview.html'), `${head}<style>${css.replaceAll('</style', '<\\/style')}</style></head><body><div id="root"></div><script>${app.replaceAll('</script', '<\\/script')}</script></body></html>`);
console.log(`Built ${files.length} source modules → dist/ and RegimeLab-preview.html (${Math.round(app.length / 1024)} KB JavaScript).`);
