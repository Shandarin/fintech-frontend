const { test } = require('node:test');
const assert = require('node:assert/strict');
const dashboard = require('../.test-build/src/features/dashboard/widgets.js');
const storage = require('../.test-build/src/lib/storage.js');

function localStore(initial = {}) {
  const values = new Map(Object.entries(initial));
  global.localStorage = {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => { values.set(key, String(value)); },
    removeItem: key => values.delete(key),
  };
  return values;
}
test('dashboard widgets: safe IDs, stable insertion and no duplicates', () => {
  assert.deepEqual(dashboard.sanitizeDashboardWidgets(['documents','bad',{},'documents','tools']),['documents','tools']);
  assert.deepEqual(dashboard.addDashboardWidget(['documents'], 'documents'),['documents']);
  assert.deepEqual(dashboard.addDashboardWidget(['documents'], 'tools'),['documents','tools']);
  assert.deepEqual(dashboard.removeDashboardWidget(['documents','tools'], 'documents'),['tools']);
  assert.deepEqual(dashboard.addDashboardWidget([], 'unregistered'),[]);
});
test('dashboard widgets: drag drop and accessible keyboard reordering', () => {
  const input = ['benchmarks','performance','regime','documents'];
  assert.deepEqual(dashboard.moveDashboardWidget(input,'documents','performance'),['benchmarks','documents','performance','regime']);
  assert.deepEqual(dashboard.shiftDashboardWidget(input,'performance',1),['benchmarks','regime','performance','documents']);
  assert.deepEqual(dashboard.shiftDashboardWidget(input,'performance',-1),['performance','benchmarks','regime','documents']);
  assert.deepEqual(dashboard.shiftDashboardWidget(input,'benchmarks',-1),input);
  assert.deepEqual(dashboard.moveDashboardWidget(input,'unknown','regime'),input);
});
test('dashboard preferences: ignore retired demo cards and preserve a deliberate empty dashboard', () => {
  localStore({ [storage.STORAGE_KEY]: JSON.stringify({schema:2,widgets:['trend','state','heatmap','alerts'],prefs:{compact:true,positiveGreen:true}}) });
  const migrated = storage.readState();
  assert.deepEqual(migrated.widgets,dashboard.DEFAULT_DASHBOARD_WIDGETS);
  assert.equal(migrated.prefs.compact,true);
  assert.equal(migrated.prefs.positiveGreen,true);
  migrated.widgets = [];
  assert.equal(storage.writeState(migrated),true);
  assert.deepEqual(storage.readState().widgets,[]);
  const saved = JSON.parse(global.localStorage.getItem(storage.STORAGE_KEY));
  assert.equal(saved.dashboardVersion,1);
  assert(!saved.users && !saved.alerts && !saved.sessionUserId);
});
test('dashboard preferences: selected IDs and order survive reload, malformed IDs ignored', () => {
  localStore();
  const starting = storage.readState();
  starting.widgets = ['tools','documents','benchmarks'];
  storage.writeState(starting);
  assert.deepEqual(storage.readState().widgets,['tools','documents','benchmarks']);
  global.localStorage.setItem(storage.STORAGE_KEY, JSON.stringify({dashboardVersion:1,widgets:['tools',null,'nope','tools','shortcuts']}));
  assert.deepEqual(storage.readState().widgets,['tools','shortcuts']);
});

test('index panel spans grow at three and six cards; returns use previous close', () => {
  assert.deepEqual([1,2,3,4,5,6,12].map(dashboard.benchmarkSpan), ['narrow','narrow','wide','wide','wide','full','full']);
  assert.equal(dashboard.closeReturn([{value:'100',daily_return:null},{value:'110',daily_return:null}]), 110/100-1);
  assert.equal(dashboard.closeReturn([{value:'0',daily_return:null},{value:'110',daily_return:null}]), null);
  assert.equal(dashboard.closeReturn([{value:'100',daily_return:null}]), null);
  localStore();
  const state = storage.readState(); state.benchmarks = ['上证指数','标普500'];
  storage.writeState(state); assert.deepEqual(storage.readState().benchmarks,state.benchmarks);
  state.benchmarks = []; storage.writeState(state); assert.deepEqual(storage.readState().benchmarks,[]);
});

test('wide and narrow cards stack independently while full-width cards keep their place',()=>{
  const {dashboardColumns}=require('../.test-build/src/features/dashboard/widgets.js');
  const sizes={benchmarks:'wide',monitoring:'narrow',documents:'wide',shortcuts:'narrow',tools:'full',intraday:'wide'};
  assert.deepEqual(dashboardColumns(Object.keys(sizes),id=>sizes[id]),[
    {wide:['benchmarks','documents'],narrow:['monitoring','shortcuts']},
    {full:'tools',wide:[],narrow:[]},{wide:['intraday'],narrow:[]}
  ]);
});
