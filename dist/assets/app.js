/* React / ReactDOM / Scheduler 19.1.1 production runtime. MIT license; see THIRD_PARTY_NOTICES.md. */
(function(){
var Zr={exports:{}},wa={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cg;function I0(){if(Cg)return wa;Cg=1;var u=Symbol.for("react.transitional.element"),l=Symbol.for("react.fragment");function a(s,r,o){var h=null;if(o!==void 0&&(h=""+o),r.key!==void 0&&(h=""+r.key),"key"in r){o={};for(var d in r)d!=="key"&&(o[d]=r[d])}else o=r;return r=o.ref,{$$typeof:u,type:s,key:h,ref:r!==void 0?r:null,props:o}}return wa.Fragment=l,wa.jsx=a,wa.jsxs=a,wa}var Rg;function F0(){return Rg||(Rg=1,Zr.exports=I0()),Zr.exports}var X=F0(),Jr={exports:{}},fe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kg;function P0(){if(kg)return fe;kg=1;var u=Symbol.for("react.transitional.element"),l=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),o=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),S=Symbol.iterator;function N(A){return A===null||typeof A!="object"?null:(A=S&&A[S]||A["@@iterator"],typeof A=="function"?A:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,T={};function w(A,Y,W){this.props=A,this.context=Y,this.refs=T,this.updater=W||E}w.prototype.isReactComponent={},w.prototype.setState=function(A,Y){if(typeof A!="object"&&typeof A!="function"&&A!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,A,Y,"setState")},w.prototype.forceUpdate=function(A){this.updater.enqueueForceUpdate(this,A,"forceUpdate")};function k(){}k.prototype=w.prototype;function L(A,Y,W){this.props=A,this.context=Y,this.refs=T,this.updater=W||E}var H=L.prototype=new k;H.constructor=L,D(H,w.prototype),H.isPureReactComponent=!0;var Q=Array.isArray,G={H:null,A:null,T:null,S:null,V:null},K=Object.prototype.hasOwnProperty;function ee(A,Y,W,J,ne,ye){return W=ye.ref,{$$typeof:u,type:A,key:Y,ref:W!==void 0?W:null,props:ye}}function V(A,Y){return ee(A.type,Y,void 0,void 0,void 0,A.props)}function z(A){return typeof A=="object"&&A!==null&&A.$$typeof===u}function F(A){var Y={"=":"=0",":":"=2"};return"$"+A.replace(/[=:]/g,function(W){return Y[W]})}var se=/\/+/g;function U(A,Y){return typeof A=="object"&&A!==null&&A.key!=null?F(""+A.key):Y.toString(36)}function te(){}function xe(A){switch(A.status){case"fulfilled":return A.value;case"rejected":throw A.reason;default:switch(typeof A.status=="string"?A.then(te,te):(A.status="pending",A.then(function(Y){A.status==="pending"&&(A.status="fulfilled",A.value=Y)},function(Y){A.status==="pending"&&(A.status="rejected",A.reason=Y)})),A.status){case"fulfilled":return A.value;case"rejected":throw A.reason}}throw A}function qe(A,Y,W,J,ne){var ye=typeof A;(ye==="undefined"||ye==="boolean")&&(A=null);var ce=!1;if(A===null)ce=!0;else switch(ye){case"bigint":case"string":case"number":ce=!0;break;case"object":switch(A.$$typeof){case u:case l:ce=!0;break;case b:return ce=A._init,qe(ce(A._payload),Y,W,J,ne)}}if(ce)return ne=ne(A),ce=J===""?"."+U(A,0):J,Q(ne)?(W="",ce!=null&&(W=ce.replace(se,"$&/")+"/"),qe(ne,Y,W,"",function(vn){return vn})):ne!=null&&(z(ne)&&(ne=V(ne,W+(ne.key==null||A&&A.key===ne.key?"":(""+ne.key).replace(se,"$&/")+"/")+ce)),Y.push(ne)),1;ce=0;var yt=J===""?".":J+":";if(Q(A))for(var De=0;De<A.length;De++)J=A[De],ye=yt+U(J,De),ce+=qe(J,Y,W,ye,ne);else if(De=N(A),typeof De=="function")for(A=De.call(A),De=0;!(J=A.next()).done;)J=J.value,ye=yt+U(J,De++),ce+=qe(J,Y,W,ye,ne);else if(ye==="object"){if(typeof A.then=="function")return qe(xe(A),Y,W,J,ne);throw Y=String(A),Error("Objects are not valid as a React child (found: "+(Y==="[object Object]"?"object with keys {"+Object.keys(A).join(", ")+"}":Y)+"). If you meant to render a collection of children, use an array instead.")}return ce}function B(A,Y,W){if(A==null)return A;var J=[],ne=0;return qe(A,J,"","",function(ye){return Y.call(W,ye,ne++)}),J}function Z(A){if(A._status===-1){var Y=A._result;Y=Y(),Y.then(function(W){(A._status===0||A._status===-1)&&(A._status=1,A._result=W)},function(W){(A._status===0||A._status===-1)&&(A._status=2,A._result=W)}),A._status===-1&&(A._status=0,A._result=Y)}if(A._status===1)return A._result.default;throw A._result}var ae=typeof reportError=="function"?reportError:function(A){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Y=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof A=="object"&&A!==null&&typeof A.message=="string"?String(A.message):String(A),error:A});if(!window.dispatchEvent(Y))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",A);return}console.error(A)};function Oe(){}return fe.Children={map:B,forEach:function(A,Y,W){B(A,function(){Y.apply(this,arguments)},W)},count:function(A){var Y=0;return B(A,function(){Y++}),Y},toArray:function(A){return B(A,function(Y){return Y})||[]},only:function(A){if(!z(A))throw Error("React.Children.only expected to receive a single React element child.");return A}},fe.Component=w,fe.Fragment=a,fe.Profiler=r,fe.PureComponent=L,fe.StrictMode=s,fe.Suspense=m,fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=G,fe.__COMPILER_RUNTIME={__proto__:null,c:function(A){return G.H.useMemoCache(A)}},fe.cache=function(A){return function(){return A.apply(null,arguments)}},fe.cloneElement=function(A,Y,W){if(A==null)throw Error("The argument must be a React element, but you passed "+A+".");var J=D({},A.props),ne=A.key,ye=void 0;if(Y!=null)for(ce in Y.ref!==void 0&&(ye=void 0),Y.key!==void 0&&(ne=""+Y.key),Y)!K.call(Y,ce)||ce==="key"||ce==="__self"||ce==="__source"||ce==="ref"&&Y.ref===void 0||(J[ce]=Y[ce]);var ce=arguments.length-2;if(ce===1)J.children=W;else if(1<ce){for(var yt=Array(ce),De=0;De<ce;De++)yt[De]=arguments[De+2];J.children=yt}return ee(A.type,ne,void 0,void 0,ye,J)},fe.createContext=function(A){return A={$$typeof:h,_currentValue:A,_currentValue2:A,_threadCount:0,Provider:null,Consumer:null},A.Provider=A,A.Consumer={$$typeof:o,_context:A},A},fe.createElement=function(A,Y,W){var J,ne={},ye=null;if(Y!=null)for(J in Y.key!==void 0&&(ye=""+Y.key),Y)K.call(Y,J)&&J!=="key"&&J!=="__self"&&J!=="__source"&&(ne[J]=Y[J]);var ce=arguments.length-2;if(ce===1)ne.children=W;else if(1<ce){for(var yt=Array(ce),De=0;De<ce;De++)yt[De]=arguments[De+2];ne.children=yt}if(A&&A.defaultProps)for(J in ce=A.defaultProps,ce)ne[J]===void 0&&(ne[J]=ce[J]);return ee(A,ye,void 0,void 0,null,ne)},fe.createRef=function(){return{current:null}},fe.forwardRef=function(A){return{$$typeof:d,render:A}},fe.isValidElement=z,fe.lazy=function(A){return{$$typeof:b,_payload:{_status:-1,_result:A},_init:Z}},fe.memo=function(A,Y){return{$$typeof:p,type:A,compare:Y===void 0?null:Y}},fe.startTransition=function(A){var Y=G.T,W={};G.T=W;try{var J=A(),ne=G.S;ne!==null&&ne(W,J),typeof J=="object"&&J!==null&&typeof J.then=="function"&&J.then(Oe,ae)}catch(ye){ae(ye)}finally{G.T=Y}},fe.unstable_useCacheRefresh=function(){return G.H.useCacheRefresh()},fe.use=function(A){return G.H.use(A)},fe.useActionState=function(A,Y,W){return G.H.useActionState(A,Y,W)},fe.useCallback=function(A,Y){return G.H.useCallback(A,Y)},fe.useContext=function(A){return G.H.useContext(A)},fe.useDebugValue=function(){},fe.useDeferredValue=function(A,Y){return G.H.useDeferredValue(A,Y)},fe.useEffect=function(A,Y,W){var J=G.H;if(typeof W=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return J.useEffect(A,Y)},fe.useId=function(){return G.H.useId()},fe.useImperativeHandle=function(A,Y,W){return G.H.useImperativeHandle(A,Y,W)},fe.useInsertionEffect=function(A,Y){return G.H.useInsertionEffect(A,Y)},fe.useLayoutEffect=function(A,Y){return G.H.useLayoutEffect(A,Y)},fe.useMemo=function(A,Y){return G.H.useMemo(A,Y)},fe.useOptimistic=function(A,Y){return G.H.useOptimistic(A,Y)},fe.useReducer=function(A,Y,W){return G.H.useReducer(A,Y,W)},fe.useRef=function(A){return G.H.useRef(A)},fe.useState=function(A){return G.H.useState(A)},fe.useSyncExternalStore=function(A,Y,W){return G.H.useSyncExternalStore(A,Y,W)},fe.useTransition=function(){return G.H.useTransition()},fe.version="19.1.1",fe}var Lg;function Tf(){return Lg||(Lg=1,Jr.exports=P0()),Jr.exports}var me=Tf();var Wr={exports:{}},Ea={},Ir={exports:{}},Fr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bg;function u1(){return Bg||(Bg=1,(function(u){function l(B,Z){var ae=B.length;B.push(Z);e:for(;0<ae;){var Oe=ae-1>>>1,A=B[Oe];if(0<r(A,Z))B[Oe]=Z,B[ae]=A,ae=Oe;else break e}}function a(B){return B.length===0?null:B[0]}function s(B){if(B.length===0)return null;var Z=B[0],ae=B.pop();if(ae!==Z){B[0]=ae;e:for(var Oe=0,A=B.length,Y=A>>>1;Oe<Y;){var W=2*(Oe+1)-1,J=B[W],ne=W+1,ye=B[ne];if(0>r(J,ae))ne<A&&0>r(ye,J)?(B[Oe]=ye,B[ne]=ae,Oe=ne):(B[Oe]=J,B[W]=ae,Oe=W);else if(ne<A&&0>r(ye,ae))B[Oe]=ye,B[ne]=ae,Oe=ne;else break e}}return Z}function r(B,Z){var ae=B.sortIndex-Z.sortIndex;return ae!==0?ae:B.id-Z.id}if(u.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var o=performance;u.unstable_now=function(){return o.now()}}else{var h=Date,d=h.now();u.unstable_now=function(){return h.now()-d}}var m=[],p=[],b=1,S=null,N=3,E=!1,D=!1,T=!1,w=!1,k=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,H=typeof setImmediate<"u"?setImmediate:null;function Q(B){for(var Z=a(p);Z!==null;){if(Z.callback===null)s(p);else if(Z.startTime<=B)s(p),Z.sortIndex=Z.expirationTime,l(m,Z);else break;Z=a(p)}}function G(B){if(T=!1,Q(B),!D)if(a(m)!==null)D=!0,K||(K=!0,U());else{var Z=a(p);Z!==null&&qe(G,Z.startTime-B)}}var K=!1,ee=-1,V=5,z=-1;function F(){return w?!0:!(u.unstable_now()-z<V)}function se(){if(w=!1,K){var B=u.unstable_now();z=B;var Z=!0;try{e:{D=!1,T&&(T=!1,L(ee),ee=-1),E=!0;var ae=N;try{t:{for(Q(B),S=a(m);S!==null&&!(S.expirationTime>B&&F());){var Oe=S.callback;if(typeof Oe=="function"){S.callback=null,N=S.priorityLevel;var A=Oe(S.expirationTime<=B);if(B=u.unstable_now(),typeof A=="function"){S.callback=A,Q(B),Z=!0;break t}S===a(m)&&s(m),Q(B)}else s(m);S=a(m)}if(S!==null)Z=!0;else{var Y=a(p);Y!==null&&qe(G,Y.startTime-B),Z=!1}}break e}finally{S=null,N=ae,E=!1}Z=void 0}}finally{Z?U():K=!1}}}var U;if(typeof H=="function")U=function(){H(se)};else if(typeof MessageChannel<"u"){var te=new MessageChannel,xe=te.port2;te.port1.onmessage=se,U=function(){xe.postMessage(null)}}else U=function(){k(se,0)};function qe(B,Z){ee=k(function(){B(u.unstable_now())},Z)}u.unstable_IdlePriority=5,u.unstable_ImmediatePriority=1,u.unstable_LowPriority=4,u.unstable_NormalPriority=3,u.unstable_Profiling=null,u.unstable_UserBlockingPriority=2,u.unstable_cancelCallback=function(B){B.callback=null},u.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<B?Math.floor(1e3/B):5},u.unstable_getCurrentPriorityLevel=function(){return N},u.unstable_next=function(B){switch(N){case 1:case 2:case 3:var Z=3;break;default:Z=N}var ae=N;N=Z;try{return B()}finally{N=ae}},u.unstable_requestPaint=function(){w=!0},u.unstable_runWithPriority=function(B,Z){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var ae=N;N=B;try{return Z()}finally{N=ae}},u.unstable_scheduleCallback=function(B,Z,ae){var Oe=u.unstable_now();switch(typeof ae=="object"&&ae!==null?(ae=ae.delay,ae=typeof ae=="number"&&0<ae?Oe+ae:Oe):ae=Oe,B){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=ae+A,B={id:b++,callback:Z,priorityLevel:B,startTime:ae,expirationTime:A,sortIndex:-1},ae>Oe?(B.sortIndex=ae,l(p,B),a(m)===null&&B===a(p)&&(T?(L(ee),ee=-1):T=!0,qe(G,ae-Oe))):(B.sortIndex=A,l(m,B),D||E||(D=!0,K||(K=!0,U()))),B},u.unstable_shouldYield=F,u.unstable_wrapCallback=function(B){var Z=N;return function(){var ae=N;N=Z;try{return B.apply(this,arguments)}finally{N=ae}}}})(Fr)),Fr}var qg;function c1(){return qg||(qg=1,Ir.exports=u1()),Ir.exports}var Pr={exports:{}},it={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jg;function r1(){if(jg)return it;jg=1;var u=Tf();function l(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)p+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function a(){}var s={d:{f:a,r:function(){throw Error(l(522))},D:a,C:a,L:a,m:a,X:a,S:a,M:a},p:0,findDOMNode:null},r=Symbol.for("react.portal");function o(m,p,b){var S=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:r,key:S==null?null:""+S,children:m,containerInfo:p,implementation:b}}var h=u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,it.createPortal=function(m,p){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(l(299));return o(m,p,null,b)},it.flushSync=function(m){var p=h.T,b=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=b,s.d.f()}},it.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},it.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},it.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var b=p.as,S=d(b,p.crossOrigin),N=typeof p.integrity=="string"?p.integrity:void 0,E=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;b==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:S,integrity:N,fetchPriority:E}):b==="script"&&s.d.X(m,{crossOrigin:S,integrity:N,fetchPriority:E,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},it.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var b=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},it.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var b=p.as,S=d(b,p.crossOrigin);s.d.L(m,b,{crossOrigin:S,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},it.preloadModule=function(m,p){if(typeof m=="string")if(p){var b=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},it.requestFormReset=function(m){s.d.r(m)},it.unstable_batchedUpdates=function(m,p){return m(p)},it.useFormState=function(m,p,b){return h.H.useFormState(m,p,b)},it.useFormStatus=function(){return h.H.useHostTransitionStatus()},it.version="19.1.1",it}var Hg;function f1(){if(Hg)return Pr.exports;Hg=1;function u(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u)}catch(l){console.error(l)}}return u(),Pr.exports=r1(),Pr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $g;function o1(){if($g)return Ea;$g=1;var u=c1(),l=Tf(),a=f1();function s(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function h(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(o(e)!==e)throw Error(s(188))}function m(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(s(188));return t!==e?null:e}for(var n=e,i=t;;){var c=n.return;if(c===null)break;var f=c.alternate;if(f===null){if(i=c.return,i!==null){n=i;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===n)return d(c),e;if(f===i)return d(c),t;f=f.sibling}throw Error(s(188))}if(n.return!==i.return)n=c,i=f;else{for(var g=!1,y=c.child;y;){if(y===n){g=!0,n=c,i=f;break}if(y===i){g=!0,i=c,n=f;break}y=y.sibling}if(!g){for(y=f.child;y;){if(y===n){g=!0,n=f,i=c;break}if(y===i){g=!0,i=f,n=c;break}y=y.sibling}if(!g)throw Error(s(189))}}if(n.alternate!==i)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var b=Object.assign,S=Symbol.for("react.element"),N=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),w=Symbol.for("react.profiler"),k=Symbol.for("react.provider"),L=Symbol.for("react.consumer"),H=Symbol.for("react.context"),Q=Symbol.for("react.forward_ref"),G=Symbol.for("react.suspense"),K=Symbol.for("react.suspense_list"),ee=Symbol.for("react.memo"),V=Symbol.for("react.lazy"),z=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),se=Symbol.iterator;function U(e){return e===null||typeof e!="object"?null:(e=se&&e[se]||e["@@iterator"],typeof e=="function"?e:null)}var te=Symbol.for("react.client.reference");function xe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===te?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case D:return"Fragment";case w:return"Profiler";case T:return"StrictMode";case G:return"Suspense";case K:return"SuspenseList";case z:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case H:return(e.displayName||"Context")+".Provider";case L:return(e._context.displayName||"Context")+".Consumer";case Q:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ee:return t=e.displayName||null,t!==null?t:xe(e.type)||"Memo";case V:t=e._payload,e=e._init;try{return xe(e(t))}catch{}}return null}var qe=Array.isArray,B=l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ae={pending:!1,data:null,method:null,action:null},Oe=[],A=-1;function Y(e){return{current:e}}function W(e){0>A||(e.current=Oe[A],Oe[A]=null,A--)}function J(e,t){A++,Oe[A]=e.current,e.current=t}var ne=Y(null),ye=Y(null),ce=Y(null),yt=Y(null);function De(e,t){switch(J(ce,t),J(ye,e),J(ne,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?ag(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=ag(t),e=sg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}W(ne),J(ne,e)}function vn(){W(ne),W(ye),W(ce)}function ku(e){e.memoizedState!==null&&J(yt,e);var t=ne.current,n=sg(t,e.type);t!==n&&(J(ye,e),J(ne,n))}function za(e){ye.current===e&&(W(ne),W(ye)),yt.current===e&&(W(yt),ya._currentValue=ae)}var Lu=Object.prototype.hasOwnProperty,zu=u.unstable_scheduleCallback,Uu=u.unstable_cancelCallback,Mp=u.unstable_shouldYield,xp=u.unstable_requestPaint,Vt=u.unstable_now,Dp=u.unstable_getCurrentPriorityLevel,qf=u.unstable_ImmediatePriority,jf=u.unstable_UserBlockingPriority,Ua=u.unstable_NormalPriority,Cp=u.unstable_LowPriority,Hf=u.unstable_IdlePriority,Rp=u.log,kp=u.unstable_setDisableYieldValue,Oi=null,vt=null;function bn(e){if(typeof Rp=="function"&&kp(e),vt&&typeof vt.setStrictMode=="function")try{vt.setStrictMode(Oi,e)}catch{}}var bt=Math.clz32?Math.clz32:Up,Lp=Math.log,zp=Math.LN2;function Up(e){return e>>>=0,e===0?32:31-(Lp(e)/zp|0)|0}var Ba=256,qa=4194304;function Xn(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ja(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var c=0,f=e.suspendedLanes,g=e.pingedLanes;e=e.warmLanes;var y=i&134217727;return y!==0?(i=y&~f,i!==0?c=Xn(i):(g&=y,g!==0?c=Xn(g):n||(n=y&~e,n!==0&&(c=Xn(n))))):(y=i&~f,y!==0?c=Xn(y):g!==0?c=Xn(g):n||(n=i&~e,n!==0&&(c=Xn(n)))),c===0?0:t!==0&&t!==c&&(t&f)===0&&(f=c&-c,n=t&-t,f>=n||f===32&&(n&4194048)!==0)?t:c}function Ni(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Bp(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $f(){var e=Ba;return Ba<<=1,(Ba&4194048)===0&&(Ba=256),e}function Yf(){var e=qa;return qa<<=1,(qa&62914560)===0&&(qa=4194304),e}function Bu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function _i(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function qp(e,t,n,i,c,f){var g=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var y=e.entanglements,v=e.expirationTimes,x=e.hiddenUpdates;for(n=g&~n;0<n;){var q=31-bt(n),$=1<<q;y[q]=0,v[q]=-1;var C=x[q];if(C!==null)for(x[q]=null,q=0;q<C.length;q++){var R=C[q];R!==null&&(R.lane&=-536870913)}n&=~$}i!==0&&Gf(e,i,0),f!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=f&~(g&~t))}function Gf(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-bt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&4194090}function Kf(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-bt(n),c=1<<i;c&t|e[i]&t&&(e[i]|=t),n&=~c}}function qu(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ju(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Vf(){var e=Z.p;return e!==0?e:(e=window.event,e===void 0?32:Og(e.type))}function jp(e,t){var n=Z.p;try{return Z.p=e,t()}finally{Z.p=n}}var Sn=Math.random().toString(36).slice(2),nt="__reactFiber$"+Sn,rt="__reactProps$"+Sn,Sl="__reactContainer$"+Sn,Hu="__reactEvents$"+Sn,Hp="__reactListeners$"+Sn,$p="__reactHandles$"+Sn,Qf="__reactResources$"+Sn,Mi="__reactMarker$"+Sn;function $u(e){delete e[nt],delete e[rt],delete e[Hu],delete e[Hp],delete e[$p]}function Tl(e){var t=e[nt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Sl]||n[nt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fg(e);e!==null;){if(n=e[nt])return n;e=fg(e)}return t}e=n,n=e.parentNode}return null}function wl(e){if(e=e[nt]||e[Sl]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function xi(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function El(e){var t=e[Qf];return t||(t=e[Qf]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ze(e){e[Mi]=!0}var Xf=new Set,Zf={};function Zn(e,t){Al(e,t),Al(e+"Capture",t)}function Al(e,t){for(Zf[e]=t,e=0;e<t.length;e++)Xf.add(t[e])}var Yp=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Jf={},Wf={};function Gp(e){return Lu.call(Wf,e)?!0:Lu.call(Jf,e)?!1:Yp.test(e)?Wf[e]=!0:(Jf[e]=!0,!1)}function Ha(e,t,n){if(Gp(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function $a(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Pt(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}var Yu,If;function Ol(e){if(Yu===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Yu=t&&t[1]||"",If=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yu+e+If}var Gu=!1;function Ku(e,t){if(!e||Gu)return"";Gu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var $=function(){throw Error()};if(Object.defineProperty($.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct($,[])}catch(R){var C=R}Reflect.construct(e,[],$)}else{try{$.call()}catch(R){C=R}e.call($.prototype)}}else{try{throw Error()}catch(R){C=R}($=e())&&typeof $.catch=="function"&&$.catch(function(){})}}catch(R){if(R&&C&&typeof R.stack=="string")return[R.stack,C.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=i.DetermineComponentFrameRoot(),g=f[0],y=f[1];if(g&&y){var v=g.split(`
`),x=y.split(`
`);for(c=i=0;i<v.length&&!v[i].includes("DetermineComponentFrameRoot");)i++;for(;c<x.length&&!x[c].includes("DetermineComponentFrameRoot");)c++;if(i===v.length||c===x.length)for(i=v.length-1,c=x.length-1;1<=i&&0<=c&&v[i]!==x[c];)c--;for(;1<=i&&0<=c;i--,c--)if(v[i]!==x[c]){if(i!==1||c!==1)do if(i--,c--,0>c||v[i]!==x[c]){var q=`
`+v[i].replace(" at new "," at ");return e.displayName&&q.includes("<anonymous>")&&(q=q.replace("<anonymous>",e.displayName)),q}while(1<=i&&0<=c);break}}}finally{Gu=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Ol(n):""}function Kp(e){switch(e.tag){case 26:case 27:case 5:return Ol(e.type);case 16:return Ol("Lazy");case 13:return Ol("Suspense");case 19:return Ol("SuspenseList");case 0:case 15:return Ku(e.type,!1);case 11:return Ku(e.type.render,!1);case 1:return Ku(e.type,!0);case 31:return Ol("Activity");default:return""}}function Ff(e){try{var t="";do t+=Kp(e),e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}function xt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Pf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Vp(e){var t=Pf(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var c=n.get,f=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return c.call(this)},set:function(g){i=""+g,f.call(this,g)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(g){i=""+g},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ya(e){e._valueTracker||(e._valueTracker=Vp(e))}function eo(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=Pf(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Ga(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Qp=/[\n"\\]/g;function Dt(e){return e.replace(Qp,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Vu(e,t,n,i,c,f,g,y){e.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?e.type=g:e.removeAttribute("type"),t!=null?g==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+xt(t)):e.value!==""+xt(t)&&(e.value=""+xt(t)):g!=="submit"&&g!=="reset"||e.removeAttribute("value"),t!=null?Qu(e,g,xt(t)):n!=null?Qu(e,g,xt(n)):i!=null&&e.removeAttribute("value"),c==null&&f!=null&&(e.defaultChecked=!!f),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.name=""+xt(y):e.removeAttribute("name")}function to(e,t,n,i,c,f,g,y){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),t!=null||n!=null){if(!(f!=="submit"&&f!=="reset"||t!=null))return;n=n!=null?""+xt(n):"",t=t!=null?""+xt(t):n,y||t===e.value||(e.value=t),e.defaultValue=t}i=i??c,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=y?e.checked:!!i,e.defaultChecked=!!i,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(e.name=g)}function Qu(e,t,n){t==="number"&&Ga(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Nl(e,t,n,i){if(e=e.options,t){t={};for(var c=0;c<n.length;c++)t["$"+n[c]]=!0;for(n=0;n<e.length;n++)c=t.hasOwnProperty("$"+e[n].value),e[n].selected!==c&&(e[n].selected=c),c&&i&&(e[n].defaultSelected=!0)}else{for(n=""+xt(n),t=null,c=0;c<e.length;c++){if(e[c].value===n){e[c].selected=!0,i&&(e[c].defaultSelected=!0);return}t!==null||e[c].disabled||(t=e[c])}t!==null&&(t.selected=!0)}}function no(e,t,n){if(t!=null&&(t=""+xt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+xt(n):""}function lo(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(s(92));if(qe(i)){if(1<i.length)throw Error(s(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=xt(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i)}function _l(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Xp=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function io(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||Xp.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function ao(e,t,n){if(t!=null&&typeof t!="object")throw Error(s(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var c in t)i=t[c],t.hasOwnProperty(c)&&n[c]!==i&&io(e,c,i)}else for(var f in t)t.hasOwnProperty(f)&&io(e,f,t[f])}function Xu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zp=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Jp=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ka(e){return Jp.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Zu=null;function Ju(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ml=null,xl=null;function so(e){var t=wl(e);if(t&&(e=t.stateNode)){var n=e[rt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Vu(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Dt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var c=i[rt]||null;if(!c)throw Error(s(90));Vu(i,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&eo(i)}break e;case"textarea":no(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&Nl(e,!!n.multiple,t,!1)}}}var Wu=!1;function uo(e,t,n){if(Wu)return e(t,n);Wu=!0;try{var i=e(t);return i}finally{if(Wu=!1,(Ml!==null||xl!==null)&&(xs(),Ml&&(t=Ml,e=xl,xl=Ml=null,so(t),e)))for(t=0;t<e.length;t++)so(e[t])}}function Di(e,t){var n=e.stateNode;if(n===null)return null;var i=n[rt]||null;if(i===null)return null;n=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(s(231,t,typeof n));return n}var en=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Iu=!1;if(en)try{var Ci={};Object.defineProperty(Ci,"passive",{get:function(){Iu=!0}}),window.addEventListener("test",Ci,Ci),window.removeEventListener("test",Ci,Ci)}catch{Iu=!1}var Tn=null,Fu=null,Va=null;function co(){if(Va)return Va;var e,t=Fu,n=t.length,i,c="value"in Tn?Tn.value:Tn.textContent,f=c.length;for(e=0;e<n&&t[e]===c[e];e++);var g=n-e;for(i=1;i<=g&&t[n-i]===c[f-i];i++);return Va=c.slice(e,1<i?1-i:void 0)}function Qa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Xa(){return!0}function ro(){return!1}function ft(e){function t(n,i,c,f,g){this._reactName=n,this._targetInst=c,this.type=i,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var y in e)e.hasOwnProperty(y)&&(n=e[y],this[y]=n?n(f):f[y]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Xa:ro,this.isPropagationStopped=ro,this}return b(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Xa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Xa)},persist:function(){},isPersistent:Xa}),t}var Jn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Za=ft(Jn),Ri=b({},Jn,{view:0,detail:0}),Wp=ft(Ri),Pu,ec,ki,Ja=b({},Ri,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ki&&(ki&&e.type==="mousemove"?(Pu=e.screenX-ki.screenX,ec=e.screenY-ki.screenY):ec=Pu=0,ki=e),Pu)},movementY:function(e){return"movementY"in e?e.movementY:ec}}),fo=ft(Ja),Ip=b({},Ja,{dataTransfer:0}),Fp=ft(Ip),Pp=b({},Ri,{relatedTarget:0}),tc=ft(Pp),ey=b({},Jn,{animationName:0,elapsedTime:0,pseudoElement:0}),ty=ft(ey),ny=b({},Jn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ly=ft(ny),iy=b({},Jn,{data:0}),oo=ft(iy),ay={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cy(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=uy[e])?!!t[e]:!1}function nc(){return cy}var ry=b({},Ri,{key:function(e){if(e.key){var t=ay[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?sy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nc,charCode:function(e){return e.type==="keypress"?Qa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),fy=ft(ry),oy=b({},Ja,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ho=ft(oy),hy=b({},Ri,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nc}),dy=ft(hy),gy=b({},Jn,{propertyName:0,elapsedTime:0,pseudoElement:0}),my=ft(gy),py=b({},Ja,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),yy=ft(py),vy=b({},Jn,{newState:0,oldState:0}),by=ft(vy),Sy=[9,13,27,32],lc=en&&"CompositionEvent"in window,Li=null;en&&"documentMode"in document&&(Li=document.documentMode);var Ty=en&&"TextEvent"in window&&!Li,go=en&&(!lc||Li&&8<Li&&11>=Li),mo=" ",po=!1;function yo(e,t){switch(e){case"keyup":return Sy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vo(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Dl=!1;function wy(e,t){switch(e){case"compositionend":return vo(t);case"keypress":return t.which!==32?null:(po=!0,mo);case"textInput":return e=t.data,e===mo&&po?null:e;default:return null}}function Ey(e,t){if(Dl)return e==="compositionend"||!lc&&yo(e,t)?(e=co(),Va=Fu=Tn=null,Dl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return go&&t.locale!=="ko"?null:t.data;default:return null}}var Ay={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ay[e.type]:t==="textarea"}function So(e,t,n,i){Ml?xl?xl.push(i):xl=[i]:Ml=i,t=zs(t,"onChange"),0<t.length&&(n=new Za("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var zi=null,Ui=null;function Oy(e){eg(e,0)}function Wa(e){var t=xi(e);if(eo(t))return e}function To(e,t){if(e==="change")return t}var wo=!1;if(en){var ic;if(en){var ac="oninput"in document;if(!ac){var Eo=document.createElement("div");Eo.setAttribute("oninput","return;"),ac=typeof Eo.oninput=="function"}ic=ac}else ic=!1;wo=ic&&(!document.documentMode||9<document.documentMode)}function Ao(){zi&&(zi.detachEvent("onpropertychange",Oo),Ui=zi=null)}function Oo(e){if(e.propertyName==="value"&&Wa(Ui)){var t=[];So(t,Ui,e,Ju(e)),uo(Oy,t)}}function Ny(e,t,n){e==="focusin"?(Ao(),zi=t,Ui=n,zi.attachEvent("onpropertychange",Oo)):e==="focusout"&&Ao()}function _y(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Wa(Ui)}function My(e,t){if(e==="click")return Wa(t)}function xy(e,t){if(e==="input"||e==="change")return Wa(t)}function Dy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var St=typeof Object.is=="function"?Object.is:Dy;function Bi(e,t){if(St(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var c=n[i];if(!Lu.call(t,c)||!St(e[c],t[c]))return!1}return!0}function No(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function _o(e,t){var n=No(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=No(n)}}function Mo(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Mo(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function xo(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ga(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ga(e.document)}return t}function sc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Cy=en&&"documentMode"in document&&11>=document.documentMode,Cl=null,uc=null,qi=null,cc=!1;function Do(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;cc||Cl==null||Cl!==Ga(i)||(i=Cl,"selectionStart"in i&&sc(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),qi&&Bi(qi,i)||(qi=i,i=zs(uc,"onSelect"),0<i.length&&(t=new Za("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Cl)))}function Wn(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Rl={animationend:Wn("Animation","AnimationEnd"),animationiteration:Wn("Animation","AnimationIteration"),animationstart:Wn("Animation","AnimationStart"),transitionrun:Wn("Transition","TransitionRun"),transitionstart:Wn("Transition","TransitionStart"),transitioncancel:Wn("Transition","TransitionCancel"),transitionend:Wn("Transition","TransitionEnd")},rc={},Co={};en&&(Co=document.createElement("div").style,"AnimationEvent"in window||(delete Rl.animationend.animation,delete Rl.animationiteration.animation,delete Rl.animationstart.animation),"TransitionEvent"in window||delete Rl.transitionend.transition);function In(e){if(rc[e])return rc[e];if(!Rl[e])return e;var t=Rl[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Co)return rc[e]=t[n];return e}var Ro=In("animationend"),ko=In("animationiteration"),Lo=In("animationstart"),Ry=In("transitionrun"),ky=In("transitionstart"),Ly=In("transitioncancel"),zo=In("transitionend"),Uo=new Map,fc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");fc.push("scrollEnd");function Ht(e,t){Uo.set(e,t),Zn(t,[e])}var Bo=new WeakMap;function Ct(e,t){if(typeof e=="object"&&e!==null){var n=Bo.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Ff(t)},Bo.set(e,t),t)}return{value:e,source:t,stack:Ff(t)}}var Rt=[],kl=0,oc=0;function Ia(){for(var e=kl,t=oc=kl=0;t<e;){var n=Rt[t];Rt[t++]=null;var i=Rt[t];Rt[t++]=null;var c=Rt[t];Rt[t++]=null;var f=Rt[t];if(Rt[t++]=null,i!==null&&c!==null){var g=i.pending;g===null?c.next=c:(c.next=g.next,g.next=c),i.pending=c}f!==0&&qo(n,c,f)}}function Fa(e,t,n,i){Rt[kl++]=e,Rt[kl++]=t,Rt[kl++]=n,Rt[kl++]=i,oc|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function hc(e,t,n,i){return Fa(e,t,n,i),Pa(e)}function Ll(e,t){return Fa(e,null,null,t),Pa(e)}function qo(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var c=!1,f=e.return;f!==null;)f.childLanes|=n,i=f.alternate,i!==null&&(i.childLanes|=n),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(c=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,c&&t!==null&&(c=31-bt(n),e=f.hiddenUpdates,i=e[c],i===null?e[c]=[t]:i.push(t),t.lane=n|536870912),f):null}function Pa(e){if(50<ra)throw ra=0,vr=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var zl={};function zy(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tt(e,t,n,i){return new zy(e,t,n,i)}function dc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function tn(e,t){var n=e.alternate;return n===null?(n=Tt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function jo(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function es(e,t,n,i,c,f){var g=0;if(i=e,typeof e=="function")dc(e)&&(g=1);else if(typeof e=="string")g=B0(e,n,ne.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case z:return e=Tt(31,n,t,c),e.elementType=z,e.lanes=f,e;case D:return Fn(n.children,c,f,t);case T:g=8,c|=24;break;case w:return e=Tt(12,n,t,c|2),e.elementType=w,e.lanes=f,e;case G:return e=Tt(13,n,t,c),e.elementType=G,e.lanes=f,e;case K:return e=Tt(19,n,t,c),e.elementType=K,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case k:case H:g=10;break e;case L:g=9;break e;case Q:g=11;break e;case ee:g=14;break e;case V:g=16,i=null;break e}g=29,n=Error(s(130,e===null?"null":typeof e,"")),i=null}return t=Tt(g,n,t,c),t.elementType=e,t.type=i,t.lanes=f,t}function Fn(e,t,n,i){return e=Tt(7,e,i,t),e.lanes=n,e}function gc(e,t,n){return e=Tt(6,e,null,t),e.lanes=n,e}function mc(e,t,n){return t=Tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ul=[],Bl=0,ts=null,ns=0,kt=[],Lt=0,Pn=null,nn=1,ln="";function el(e,t){Ul[Bl++]=ns,Ul[Bl++]=ts,ts=e,ns=t}function Ho(e,t,n){kt[Lt++]=nn,kt[Lt++]=ln,kt[Lt++]=Pn,Pn=e;var i=nn;e=ln;var c=32-bt(i)-1;i&=~(1<<c),n+=1;var f=32-bt(t)+c;if(30<f){var g=c-c%5;f=(i&(1<<g)-1).toString(32),i>>=g,c-=g,nn=1<<32-bt(t)+c|n<<c|i,ln=f+e}else nn=1<<f|n<<c|i,ln=e}function pc(e){e.return!==null&&(el(e,1),Ho(e,1,0))}function yc(e){for(;e===ts;)ts=Ul[--Bl],Ul[Bl]=null,ns=Ul[--Bl],Ul[Bl]=null;for(;e===Pn;)Pn=kt[--Lt],kt[Lt]=null,ln=kt[--Lt],kt[Lt]=null,nn=kt[--Lt],kt[Lt]=null}var ut=null,Ue=null,be=!1,tl=null,Qt=!1,vc=Error(s(519));function nl(e){var t=Error(s(418,""));throw $i(Ct(t,e)),vc}function $o(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[nt]=e,t[rt]=i,n){case"dialog":ge("cancel",t),ge("close",t);break;case"iframe":case"object":case"embed":ge("load",t);break;case"video":case"audio":for(n=0;n<oa.length;n++)ge(oa[n],t);break;case"source":ge("error",t);break;case"img":case"image":case"link":ge("error",t),ge("load",t);break;case"details":ge("toggle",t);break;case"input":ge("invalid",t),to(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0),Ya(t);break;case"select":ge("invalid",t);break;case"textarea":ge("invalid",t),lo(t,i.value,i.defaultValue,i.children),Ya(t)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||ig(t.textContent,n)?(i.popover!=null&&(ge("beforetoggle",t),ge("toggle",t)),i.onScroll!=null&&ge("scroll",t),i.onScrollEnd!=null&&ge("scrollend",t),i.onClick!=null&&(t.onclick=Us),t=!0):t=!1,t||nl(e)}function Yo(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 13:Qt=!1;return;case 27:case 3:Qt=!0;return;default:ut=ut.return}}function ji(e){if(e!==ut)return!1;if(!be)return Yo(e),be=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Lr(e.type,e.memoizedProps)),n=!n),n&&Ue&&nl(e),Yo(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(n=e.data,n==="/$"){if(t===0){Ue=Yt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++;e=e.nextSibling}Ue=null}}else t===27?(t=Ue,Bn(e.type)?(e=qr,qr=null,Ue=e):Ue=t):Ue=ut?Yt(e.stateNode.nextSibling):null;return!0}function Hi(){Ue=ut=null,be=!1}function Go(){var e=tl;return e!==null&&(dt===null?dt=e:dt.push.apply(dt,e),tl=null),e}function $i(e){tl===null?tl=[e]:tl.push(e)}var bc=Y(null),ll=null,an=null;function wn(e,t,n){J(bc,t._currentValue),t._currentValue=n}function sn(e){e._currentValue=bc.current,W(bc)}function Sc(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function Tc(e,t,n,i){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var f=c.dependencies;if(f!==null){var g=c.child;f=f.firstContext;e:for(;f!==null;){var y=f;f=c;for(var v=0;v<t.length;v++)if(y.context===t[v]){f.lanes|=n,y=f.alternate,y!==null&&(y.lanes|=n),Sc(f.return,n,e),i||(g=null);break e}f=y.next}}else if(c.tag===18){if(g=c.return,g===null)throw Error(s(341));g.lanes|=n,f=g.alternate,f!==null&&(f.lanes|=n),Sc(g,n,e),g=null}else g=c.child;if(g!==null)g.return=c;else for(g=c;g!==null;){if(g===e){g=null;break}if(c=g.sibling,c!==null){c.return=g.return,g=c;break}g=g.return}c=g}}function Yi(e,t,n,i){e=null;for(var c=t,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var g=c.alternate;if(g===null)throw Error(s(387));if(g=g.memoizedProps,g!==null){var y=c.type;St(c.pendingProps.value,g.value)||(e!==null?e.push(y):e=[y])}}else if(c===yt.current){if(g=c.alternate,g===null)throw Error(s(387));g.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(ya):e=[ya])}c=c.return}e!==null&&Tc(t,e,n,i),t.flags|=262144}function ls(e){for(e=e.firstContext;e!==null;){if(!St(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function il(e){ll=e,an=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function lt(e){return Ko(ll,e)}function is(e,t){return ll===null&&il(e),Ko(e,t)}function Ko(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},an===null){if(e===null)throw Error(s(308));an=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else an=an.next=t;return n}var Uy=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},By=u.unstable_scheduleCallback,qy=u.unstable_NormalPriority,Ve={$$typeof:H,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function wc(){return{controller:new Uy,data:new Map,refCount:0}}function Gi(e){e.refCount--,e.refCount===0&&By(qy,function(){e.controller.abort()})}var Ki=null,Ec=0,ql=0,jl=null;function jy(e,t){if(Ki===null){var n=Ki=[];Ec=0,ql=Or(),jl={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Ec++,t.then(Vo,Vo),t}function Vo(){if(--Ec===0&&Ki!==null){jl!==null&&(jl.status="fulfilled");var e=Ki;Ki=null,ql=0,jl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Hy(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(c){n.push(c)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var c=0;c<n.length;c++)(0,n[c])(t)},function(c){for(i.status="rejected",i.reason=c,c=0;c<n.length;c++)(0,n[c])(void 0)}),i}var Qo=B.S;B.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&jy(e,t),Qo!==null&&Qo(e,t)};var al=Y(null);function Ac(){var e=al.current;return e!==null?e:Me.pooledCache}function as(e,t){t===null?J(al,al.current):J(al,t.pool)}function Xo(){var e=Ac();return e===null?null:{parent:Ve._currentValue,pool:e}}var Vi=Error(s(460)),Zo=Error(s(474)),ss=Error(s(542)),Oc={then:function(){}};function Jo(e){return e=e.status,e==="fulfilled"||e==="rejected"}function us(){}function Wo(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(us,us),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Fo(e),e;default:if(typeof t.status=="string")t.then(us,us);else{if(e=Me,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var c=t;c.status="fulfilled",c.value=i}},function(i){if(t.status==="pending"){var c=t;c.status="rejected",c.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Fo(e),e}throw Qi=t,Vi}}var Qi=null;function Io(){if(Qi===null)throw Error(s(459));var e=Qi;return Qi=null,e}function Fo(e){if(e===Vi||e===ss)throw Error(s(483))}var En=!1;function Nc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function _c(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function An(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function On(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Se&2)!==0){var c=i.pending;return c===null?t.next=t:(t.next=c.next,c.next=t),i.pending=t,t=Pa(e),qo(e,null,n),t}return Fa(e,i,t,n),Pa(e)}function Xi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Kf(e,n)}}function Mc(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var c=null,f=null;if(n=n.firstBaseUpdate,n!==null){do{var g={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};f===null?c=f=g:f=f.next=g,n=n.next}while(n!==null);f===null?c=f=t:f=f.next=t}else c=f=t;n={baseState:i.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var xc=!1;function Zi(){if(xc){var e=jl;if(e!==null)throw e}}function Ji(e,t,n,i){xc=!1;var c=e.updateQueue;En=!1;var f=c.firstBaseUpdate,g=c.lastBaseUpdate,y=c.shared.pending;if(y!==null){c.shared.pending=null;var v=y,x=v.next;v.next=null,g===null?f=x:g.next=x,g=v;var q=e.alternate;q!==null&&(q=q.updateQueue,y=q.lastBaseUpdate,y!==g&&(y===null?q.firstBaseUpdate=x:y.next=x,q.lastBaseUpdate=v))}if(f!==null){var $=c.baseState;g=0,q=x=v=null,y=f;do{var C=y.lane&-536870913,R=C!==y.lane;if(R?(pe&C)===C:(i&C)===C){C!==0&&C===ql&&(xc=!0),q!==null&&(q=q.next={lane:0,tag:y.tag,payload:y.payload,callback:null,next:null});e:{var ue=e,le=y;C=t;var Ae=n;switch(le.tag){case 1:if(ue=le.payload,typeof ue=="function"){$=ue.call(Ae,$,C);break e}$=ue;break e;case 3:ue.flags=ue.flags&-65537|128;case 0:if(ue=le.payload,C=typeof ue=="function"?ue.call(Ae,$,C):ue,C==null)break e;$=b({},$,C);break e;case 2:En=!0}}C=y.callback,C!==null&&(e.flags|=64,R&&(e.flags|=8192),R=c.callbacks,R===null?c.callbacks=[C]:R.push(C))}else R={lane:C,tag:y.tag,payload:y.payload,callback:y.callback,next:null},q===null?(x=q=R,v=$):q=q.next=R,g|=C;if(y=y.next,y===null){if(y=c.shared.pending,y===null)break;R=y,y=R.next,R.next=null,c.lastBaseUpdate=R,c.shared.pending=null}}while(!0);q===null&&(v=$),c.baseState=v,c.firstBaseUpdate=x,c.lastBaseUpdate=q,f===null&&(c.shared.lanes=0),kn|=g,e.lanes=g,e.memoizedState=$}}function Po(e,t){if(typeof e!="function")throw Error(s(191,e));e.call(t)}function eh(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Po(n[e],t)}var Hl=Y(null),cs=Y(0);function th(e,t){e=dn,J(cs,e),J(Hl,t),dn=e|t.baseLanes}function Dc(){J(cs,dn),J(Hl,Hl.current)}function Cc(){dn=cs.current,W(Hl),W(cs)}var Nn=0,oe=null,we=null,Ye=null,rs=!1,$l=!1,sl=!1,fs=0,Wi=0,Yl=null,$y=0;function je(){throw Error(s(321))}function Rc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!St(e[n],t[n]))return!1;return!0}function kc(e,t,n,i,c,f){return Nn=f,oe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,B.H=e===null||e.memoizedState===null?qh:jh,sl=!1,f=n(i,c),sl=!1,$l&&(f=lh(t,n,i,c)),nh(e),f}function nh(e){B.H=ps;var t=we!==null&&we.next!==null;if(Nn=0,Ye=we=oe=null,rs=!1,Wi=0,Yl=null,t)throw Error(s(300));e===null||Je||(e=e.dependencies,e!==null&&ls(e)&&(Je=!0))}function lh(e,t,n,i){oe=e;var c=0;do{if($l&&(Yl=null),Wi=0,$l=!1,25<=c)throw Error(s(301));if(c+=1,Ye=we=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}B.H=Zy,f=t(n,i)}while($l);return f}function Yy(){var e=B.H,t=e.useState()[0];return t=typeof t.then=="function"?Ii(t):t,e=e.useState()[0],(we!==null?we.memoizedState:null)!==e&&(oe.flags|=1024),t}function Lc(){var e=fs!==0;return fs=0,e}function zc(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Uc(e){if(rs){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}rs=!1}Nn=0,Ye=we=oe=null,$l=!1,Wi=fs=0,Yl=null}function ot(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?oe.memoizedState=Ye=e:Ye=Ye.next=e,Ye}function Ge(){if(we===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=we.next;var t=Ye===null?oe.memoizedState:Ye.next;if(t!==null)Ye=t,we=e;else{if(e===null)throw oe.alternate===null?Error(s(467)):Error(s(310));we=e,e={memoizedState:we.memoizedState,baseState:we.baseState,baseQueue:we.baseQueue,queue:we.queue,next:null},Ye===null?oe.memoizedState=Ye=e:Ye=Ye.next=e}return Ye}function Bc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ii(e){var t=Wi;return Wi+=1,Yl===null&&(Yl=[]),e=Wo(Yl,e,t),t=oe,(Ye===null?t.memoizedState:Ye.next)===null&&(t=t.alternate,B.H=t===null||t.memoizedState===null?qh:jh),e}function os(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ii(e);if(e.$$typeof===H)return lt(e)}throw Error(s(438,String(e)))}function qc(e){var t=null,n=oe.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=oe.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(c){return c.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Bc(),oe.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=F;return t.index++,n}function un(e,t){return typeof t=="function"?t(e):t}function hs(e){var t=Ge();return jc(t,we,e)}function jc(e,t,n){var i=e.queue;if(i===null)throw Error(s(311));i.lastRenderedReducer=n;var c=e.baseQueue,f=i.pending;if(f!==null){if(c!==null){var g=c.next;c.next=f.next,f.next=g}t.baseQueue=c=f,i.pending=null}if(f=e.baseState,c===null)e.memoizedState=f;else{t=c.next;var y=g=null,v=null,x=t,q=!1;do{var $=x.lane&-536870913;if($!==x.lane?(pe&$)===$:(Nn&$)===$){var C=x.revertLane;if(C===0)v!==null&&(v=v.next={lane:0,revertLane:0,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),$===ql&&(q=!0);else if((Nn&C)===C){x=x.next,C===ql&&(q=!0);continue}else $={lane:0,revertLane:x.revertLane,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},v===null?(y=v=$,g=f):v=v.next=$,oe.lanes|=C,kn|=C;$=x.action,sl&&n(f,$),f=x.hasEagerState?x.eagerState:n(f,$)}else C={lane:$,revertLane:x.revertLane,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},v===null?(y=v=C,g=f):v=v.next=C,oe.lanes|=$,kn|=$;x=x.next}while(x!==null&&x!==t);if(v===null?g=f:v.next=y,!St(f,e.memoizedState)&&(Je=!0,q&&(n=jl,n!==null)))throw n;e.memoizedState=f,e.baseState=g,e.baseQueue=v,i.lastRenderedState=f}return c===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Hc(e){var t=Ge(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var i=n.dispatch,c=n.pending,f=t.memoizedState;if(c!==null){n.pending=null;var g=c=c.next;do f=e(f,g.action),g=g.next;while(g!==c);St(f,t.memoizedState)||(Je=!0),t.memoizedState=f,t.baseQueue===null&&(t.baseState=f),n.lastRenderedState=f}return[f,i]}function ih(e,t,n){var i=oe,c=Ge(),f=be;if(f){if(n===void 0)throw Error(s(407));n=n()}else n=t();var g=!St((we||c).memoizedState,n);g&&(c.memoizedState=n,Je=!0),c=c.queue;var y=uh.bind(null,i,c,e);if(Fi(2048,8,y,[e]),c.getSnapshot!==t||g||Ye!==null&&Ye.memoizedState.tag&1){if(i.flags|=2048,Gl(9,ds(),sh.bind(null,i,c,n,t),null),Me===null)throw Error(s(349));f||(Nn&124)!==0||ah(i,t,n)}return n}function ah(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=oe.updateQueue,t===null?(t=Bc(),oe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function sh(e,t,n,i){t.value=n,t.getSnapshot=i,ch(t)&&rh(e)}function uh(e,t,n){return n(function(){ch(t)&&rh(e)})}function ch(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!St(e,n)}catch{return!0}}function rh(e){var t=Ll(e,2);t!==null&&Nt(t,e,2)}function $c(e){var t=ot();if(typeof e=="function"){var n=e;if(e=n(),sl){bn(!0);try{n()}finally{bn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:un,lastRenderedState:e},t}function fh(e,t,n,i){return e.baseState=n,jc(e,we,typeof i=="function"?i:un)}function Gy(e,t,n,i,c){if(ms(e))throw Error(s(485));if(e=t.action,e!==null){var f={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){f.listeners.push(g)}};B.T!==null?n(!0):f.isTransition=!1,i(f),n=t.pending,n===null?(f.next=t.pending=f,oh(t,f)):(f.next=n.next,t.pending=n.next=f)}}function oh(e,t){var n=t.action,i=t.payload,c=e.state;if(t.isTransition){var f=B.T,g={};B.T=g;try{var y=n(c,i),v=B.S;v!==null&&v(g,y),hh(e,t,y)}catch(x){Yc(e,t,x)}finally{B.T=f}}else try{f=n(c,i),hh(e,t,f)}catch(x){Yc(e,t,x)}}function hh(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){dh(e,t,i)},function(i){return Yc(e,t,i)}):dh(e,t,n)}function dh(e,t,n){t.status="fulfilled",t.value=n,gh(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,oh(e,n)))}function Yc(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,gh(t),t=t.next;while(t!==i)}e.action=null}function gh(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function mh(e,t){return t}function ph(e,t){if(be){var n=Me.formState;if(n!==null){e:{var i=oe;if(be){if(Ue){t:{for(var c=Ue,f=Qt;c.nodeType!==8;){if(!f){c=null;break t}if(c=Yt(c.nextSibling),c===null){c=null;break t}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){Ue=Yt(c.nextSibling),i=c.data==="F!";break e}}nl(i)}i=!1}i&&(t=n[0])}}return n=ot(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mh,lastRenderedState:t},n.queue=i,n=zh.bind(null,oe,i),i.dispatch=n,i=$c(!1),f=Xc.bind(null,oe,!1,i.queue),i=ot(),c={state:t,dispatch:null,action:e,pending:null},i.queue=c,n=Gy.bind(null,oe,c,f,n),c.dispatch=n,i.memoizedState=e,[t,n,!1]}function yh(e){var t=Ge();return vh(t,we,e)}function vh(e,t,n){if(t=jc(e,t,mh)[0],e=hs(un)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Ii(t)}catch(g){throw g===Vi?ss:g}else i=t;t=Ge();var c=t.queue,f=c.dispatch;return n!==t.memoizedState&&(oe.flags|=2048,Gl(9,ds(),Ky.bind(null,c,n),null)),[i,f,e]}function Ky(e,t){e.action=t}function bh(e){var t=Ge(),n=we;if(n!==null)return vh(t,n,e);Ge(),t=t.memoizedState,n=Ge();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Gl(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=oe.updateQueue,t===null&&(t=Bc(),oe.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function ds(){return{destroy:void 0,resource:void 0}}function Sh(){return Ge().memoizedState}function gs(e,t,n,i){var c=ot();i=i===void 0?null:i,oe.flags|=e,c.memoizedState=Gl(1|t,ds(),n,i)}function Fi(e,t,n,i){var c=Ge();i=i===void 0?null:i;var f=c.memoizedState.inst;we!==null&&i!==null&&Rc(i,we.memoizedState.deps)?c.memoizedState=Gl(t,f,n,i):(oe.flags|=e,c.memoizedState=Gl(1|t,f,n,i))}function Th(e,t){gs(8390656,8,e,t)}function wh(e,t){Fi(2048,8,e,t)}function Eh(e,t){return Fi(4,2,e,t)}function Ah(e,t){return Fi(4,4,e,t)}function Oh(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Nh(e,t,n){n=n!=null?n.concat([e]):null,Fi(4,4,Oh.bind(null,t,e),n)}function Gc(){}function _h(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&Rc(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Mh(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&Rc(t,i[1]))return i[0];if(i=e(),sl){bn(!0);try{e()}finally{bn(!1)}}return n.memoizedState=[i,t],i}function Kc(e,t,n){return n===void 0||(Nn&1073741824)!==0?e.memoizedState=t:(e.memoizedState=n,e=Cd(),oe.lanes|=e,kn|=e,n)}function xh(e,t,n,i){return St(n,t)?n:Hl.current!==null?(e=Kc(e,n,i),St(e,t)||(Je=!0),e):(Nn&42)===0?(Je=!0,e.memoizedState=n):(e=Cd(),oe.lanes|=e,kn|=e,t)}function Dh(e,t,n,i,c){var f=Z.p;Z.p=f!==0&&8>f?f:8;var g=B.T,y={};B.T=y,Xc(e,!1,t,n);try{var v=c(),x=B.S;if(x!==null&&x(y,v),v!==null&&typeof v=="object"&&typeof v.then=="function"){var q=Hy(v,i);Pi(e,t,q,Ot(e))}else Pi(e,t,i,Ot(e))}catch($){Pi(e,t,{then:function(){},status:"rejected",reason:$},Ot())}finally{Z.p=f,B.T=g}}function Vy(){}function Vc(e,t,n,i){if(e.tag!==5)throw Error(s(476));var c=Ch(e).queue;Dh(e,c,t,ae,n===null?Vy:function(){return Rh(e),n(i)})}function Ch(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ae,baseState:ae,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:un,lastRenderedState:ae},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:un,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Rh(e){var t=Ch(e).next.queue;Pi(e,t,{},Ot())}function Qc(){return lt(ya)}function kh(){return Ge().memoizedState}function Lh(){return Ge().memoizedState}function Qy(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Ot();e=An(n);var i=On(t,e,n);i!==null&&(Nt(i,t,n),Xi(i,t,n)),t={cache:wc()},e.payload=t;return}t=t.return}}function Xy(e,t,n){var i=Ot();n={lane:i,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},ms(e)?Uh(t,n):(n=hc(e,t,n,i),n!==null&&(Nt(n,e,i),Bh(n,t,i)))}function zh(e,t,n){var i=Ot();Pi(e,t,n,i)}function Pi(e,t,n,i){var c={lane:i,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(ms(e))Uh(t,c);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=t.lastRenderedReducer,f!==null))try{var g=t.lastRenderedState,y=f(g,n);if(c.hasEagerState=!0,c.eagerState=y,St(y,g))return Fa(e,t,c,0),Me===null&&Ia(),!1}catch{}finally{}if(n=hc(e,t,c,i),n!==null)return Nt(n,e,i),Bh(n,t,i),!0}return!1}function Xc(e,t,n,i){if(i={lane:2,revertLane:Or(),action:i,hasEagerState:!1,eagerState:null,next:null},ms(e)){if(t)throw Error(s(479))}else t=hc(e,n,i,2),t!==null&&Nt(t,e,2)}function ms(e){var t=e.alternate;return e===oe||t!==null&&t===oe}function Uh(e,t){$l=rs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Bh(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Kf(e,n)}}var ps={readContext:lt,use:os,useCallback:je,useContext:je,useEffect:je,useImperativeHandle:je,useLayoutEffect:je,useInsertionEffect:je,useMemo:je,useReducer:je,useRef:je,useState:je,useDebugValue:je,useDeferredValue:je,useTransition:je,useSyncExternalStore:je,useId:je,useHostTransitionStatus:je,useFormState:je,useActionState:je,useOptimistic:je,useMemoCache:je,useCacheRefresh:je},qh={readContext:lt,use:os,useCallback:function(e,t){return ot().memoizedState=[e,t===void 0?null:t],e},useContext:lt,useEffect:Th,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,gs(4194308,4,Oh.bind(null,t,e),n)},useLayoutEffect:function(e,t){return gs(4194308,4,e,t)},useInsertionEffect:function(e,t){gs(4,2,e,t)},useMemo:function(e,t){var n=ot();t=t===void 0?null:t;var i=e();if(sl){bn(!0);try{e()}finally{bn(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=ot();if(n!==void 0){var c=n(t);if(sl){bn(!0);try{n(t)}finally{bn(!1)}}}else c=t;return i.memoizedState=i.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},i.queue=e,e=e.dispatch=Xy.bind(null,oe,e),[i.memoizedState,e]},useRef:function(e){var t=ot();return e={current:e},t.memoizedState=e},useState:function(e){e=$c(e);var t=e.queue,n=zh.bind(null,oe,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Gc,useDeferredValue:function(e,t){var n=ot();return Kc(n,e,t)},useTransition:function(){var e=$c(!1);return e=Dh.bind(null,oe,e.queue,!0,!1),ot().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=oe,c=ot();if(be){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),Me===null)throw Error(s(349));(pe&124)!==0||ah(i,t,n)}c.memoizedState=n;var f={value:n,getSnapshot:t};return c.queue=f,Th(uh.bind(null,i,f,e),[e]),i.flags|=2048,Gl(9,ds(),sh.bind(null,i,f,n,t),null),n},useId:function(){var e=ot(),t=Me.identifierPrefix;if(be){var n=ln,i=nn;n=(i&~(1<<32-bt(i)-1)).toString(32)+n,t="«"+t+"R"+n,n=fs++,0<n&&(t+="H"+n.toString(32)),t+="»"}else n=$y++,t="«"+t+"r"+n.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:Qc,useFormState:ph,useActionState:ph,useOptimistic:function(e){var t=ot();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Xc.bind(null,oe,!0,n),n.dispatch=t,[e,t]},useMemoCache:qc,useCacheRefresh:function(){return ot().memoizedState=Qy.bind(null,oe)}},jh={readContext:lt,use:os,useCallback:_h,useContext:lt,useEffect:wh,useImperativeHandle:Nh,useInsertionEffect:Eh,useLayoutEffect:Ah,useMemo:Mh,useReducer:hs,useRef:Sh,useState:function(){return hs(un)},useDebugValue:Gc,useDeferredValue:function(e,t){var n=Ge();return xh(n,we.memoizedState,e,t)},useTransition:function(){var e=hs(un)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Ii(e),t]},useSyncExternalStore:ih,useId:kh,useHostTransitionStatus:Qc,useFormState:yh,useActionState:yh,useOptimistic:function(e,t){var n=Ge();return fh(n,we,e,t)},useMemoCache:qc,useCacheRefresh:Lh},Zy={readContext:lt,use:os,useCallback:_h,useContext:lt,useEffect:wh,useImperativeHandle:Nh,useInsertionEffect:Eh,useLayoutEffect:Ah,useMemo:Mh,useReducer:Hc,useRef:Sh,useState:function(){return Hc(un)},useDebugValue:Gc,useDeferredValue:function(e,t){var n=Ge();return we===null?Kc(n,e,t):xh(n,we.memoizedState,e,t)},useTransition:function(){var e=Hc(un)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Ii(e),t]},useSyncExternalStore:ih,useId:kh,useHostTransitionStatus:Qc,useFormState:bh,useActionState:bh,useOptimistic:function(e,t){var n=Ge();return we!==null?fh(n,we,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:qc,useCacheRefresh:Lh},Kl=null,ea=0;function ys(e){var t=ea;return ea+=1,Kl===null&&(Kl=[]),Wo(Kl,e,t)}function ta(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function vs(e,t){throw t.$$typeof===S?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Hh(e){var t=e._init;return t(e._payload)}function $h(e){function t(_,O){if(e){var M=_.deletions;M===null?(_.deletions=[O],_.flags|=16):M.push(O)}}function n(_,O){if(!e)return null;for(;O!==null;)t(_,O),O=O.sibling;return null}function i(_){for(var O=new Map;_!==null;)_.key!==null?O.set(_.key,_):O.set(_.index,_),_=_.sibling;return O}function c(_,O){return _=tn(_,O),_.index=0,_.sibling=null,_}function f(_,O,M){return _.index=M,e?(M=_.alternate,M!==null?(M=M.index,M<O?(_.flags|=67108866,O):M):(_.flags|=67108866,O)):(_.flags|=1048576,O)}function g(_){return e&&_.alternate===null&&(_.flags|=67108866),_}function y(_,O,M,j){return O===null||O.tag!==6?(O=gc(M,_.mode,j),O.return=_,O):(O=c(O,M),O.return=_,O)}function v(_,O,M,j){var I=M.type;return I===D?q(_,O,M.props.children,j,M.key):O!==null&&(O.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===V&&Hh(I)===O.type)?(O=c(O,M.props),ta(O,M),O.return=_,O):(O=es(M.type,M.key,M.props,null,_.mode,j),ta(O,M),O.return=_,O)}function x(_,O,M,j){return O===null||O.tag!==4||O.stateNode.containerInfo!==M.containerInfo||O.stateNode.implementation!==M.implementation?(O=mc(M,_.mode,j),O.return=_,O):(O=c(O,M.children||[]),O.return=_,O)}function q(_,O,M,j,I){return O===null||O.tag!==7?(O=Fn(M,_.mode,j,I),O.return=_,O):(O=c(O,M),O.return=_,O)}function $(_,O,M){if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return O=gc(""+O,_.mode,M),O.return=_,O;if(typeof O=="object"&&O!==null){switch(O.$$typeof){case N:return M=es(O.type,O.key,O.props,null,_.mode,M),ta(M,O),M.return=_,M;case E:return O=mc(O,_.mode,M),O.return=_,O;case V:var j=O._init;return O=j(O._payload),$(_,O,M)}if(qe(O)||U(O))return O=Fn(O,_.mode,M,null),O.return=_,O;if(typeof O.then=="function")return $(_,ys(O),M);if(O.$$typeof===H)return $(_,is(_,O),M);vs(_,O)}return null}function C(_,O,M,j){var I=O!==null?O.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return I!==null?null:y(_,O,""+M,j);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case N:return M.key===I?v(_,O,M,j):null;case E:return M.key===I?x(_,O,M,j):null;case V:return I=M._init,M=I(M._payload),C(_,O,M,j)}if(qe(M)||U(M))return I!==null?null:q(_,O,M,j,null);if(typeof M.then=="function")return C(_,O,ys(M),j);if(M.$$typeof===H)return C(_,O,is(_,M),j);vs(_,M)}return null}function R(_,O,M,j,I){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return _=_.get(M)||null,y(O,_,""+j,I);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case N:return _=_.get(j.key===null?M:j.key)||null,v(O,_,j,I);case E:return _=_.get(j.key===null?M:j.key)||null,x(O,_,j,I);case V:var he=j._init;return j=he(j._payload),R(_,O,M,j,I)}if(qe(j)||U(j))return _=_.get(M)||null,q(O,_,j,I,null);if(typeof j.then=="function")return R(_,O,M,ys(j),I);if(j.$$typeof===H)return R(_,O,M,is(O,j),I);vs(O,j)}return null}function ue(_,O,M,j){for(var I=null,he=null,P=O,ie=O=0,Ie=null;P!==null&&ie<M.length;ie++){P.index>ie?(Ie=P,P=null):Ie=P.sibling;var ve=C(_,P,M[ie],j);if(ve===null){P===null&&(P=Ie);break}e&&P&&ve.alternate===null&&t(_,P),O=f(ve,O,ie),he===null?I=ve:he.sibling=ve,he=ve,P=Ie}if(ie===M.length)return n(_,P),be&&el(_,ie),I;if(P===null){for(;ie<M.length;ie++)P=$(_,M[ie],j),P!==null&&(O=f(P,O,ie),he===null?I=P:he.sibling=P,he=P);return be&&el(_,ie),I}for(P=i(P);ie<M.length;ie++)Ie=R(P,_,ie,M[ie],j),Ie!==null&&(e&&Ie.alternate!==null&&P.delete(Ie.key===null?ie:Ie.key),O=f(Ie,O,ie),he===null?I=Ie:he.sibling=Ie,he=Ie);return e&&P.forEach(function(Yn){return t(_,Yn)}),be&&el(_,ie),I}function le(_,O,M,j){if(M==null)throw Error(s(151));for(var I=null,he=null,P=O,ie=O=0,Ie=null,ve=M.next();P!==null&&!ve.done;ie++,ve=M.next()){P.index>ie?(Ie=P,P=null):Ie=P.sibling;var Yn=C(_,P,ve.value,j);if(Yn===null){P===null&&(P=Ie);break}e&&P&&Yn.alternate===null&&t(_,P),O=f(Yn,O,ie),he===null?I=Yn:he.sibling=Yn,he=Yn,P=Ie}if(ve.done)return n(_,P),be&&el(_,ie),I;if(P===null){for(;!ve.done;ie++,ve=M.next())ve=$(_,ve.value,j),ve!==null&&(O=f(ve,O,ie),he===null?I=ve:he.sibling=ve,he=ve);return be&&el(_,ie),I}for(P=i(P);!ve.done;ie++,ve=M.next())ve=R(P,_,ie,ve.value,j),ve!==null&&(e&&ve.alternate!==null&&P.delete(ve.key===null?ie:ve.key),O=f(ve,O,ie),he===null?I=ve:he.sibling=ve,he=ve);return e&&P.forEach(function(J0){return t(_,J0)}),be&&el(_,ie),I}function Ae(_,O,M,j){if(typeof M=="object"&&M!==null&&M.type===D&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case N:e:{for(var I=M.key;O!==null;){if(O.key===I){if(I=M.type,I===D){if(O.tag===7){n(_,O.sibling),j=c(O,M.props.children),j.return=_,_=j;break e}}else if(O.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===V&&Hh(I)===O.type){n(_,O.sibling),j=c(O,M.props),ta(j,M),j.return=_,_=j;break e}n(_,O);break}else t(_,O);O=O.sibling}M.type===D?(j=Fn(M.props.children,_.mode,j,M.key),j.return=_,_=j):(j=es(M.type,M.key,M.props,null,_.mode,j),ta(j,M),j.return=_,_=j)}return g(_);case E:e:{for(I=M.key;O!==null;){if(O.key===I)if(O.tag===4&&O.stateNode.containerInfo===M.containerInfo&&O.stateNode.implementation===M.implementation){n(_,O.sibling),j=c(O,M.children||[]),j.return=_,_=j;break e}else{n(_,O);break}else t(_,O);O=O.sibling}j=mc(M,_.mode,j),j.return=_,_=j}return g(_);case V:return I=M._init,M=I(M._payload),Ae(_,O,M,j)}if(qe(M))return ue(_,O,M,j);if(U(M)){if(I=U(M),typeof I!="function")throw Error(s(150));return M=I.call(M),le(_,O,M,j)}if(typeof M.then=="function")return Ae(_,O,ys(M),j);if(M.$$typeof===H)return Ae(_,O,is(_,M),j);vs(_,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,O!==null&&O.tag===6?(n(_,O.sibling),j=c(O,M),j.return=_,_=j):(n(_,O),j=gc(M,_.mode,j),j.return=_,_=j),g(_)):n(_,O)}return function(_,O,M,j){try{ea=0;var I=Ae(_,O,M,j);return Kl=null,I}catch(P){if(P===Vi||P===ss)throw P;var he=Tt(29,P,null,_.mode);return he.lanes=j,he.return=_,he}finally{}}}var Vl=$h(!0),Yh=$h(!1),zt=Y(null),Xt=null;function _n(e){var t=e.alternate;J(Qe,Qe.current&1),J(zt,e),Xt===null&&(t===null||Hl.current!==null||t.memoizedState!==null)&&(Xt=e)}function Gh(e){if(e.tag===22){if(J(Qe,Qe.current),J(zt,e),Xt===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Xt=e)}}else Mn()}function Mn(){J(Qe,Qe.current),J(zt,zt.current)}function cn(e){W(zt),Xt===e&&(Xt=null),W(Qe)}var Qe=Y(0);function bs(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||Br(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Zc(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:b({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Jc={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Ot(),c=An(i);c.payload=t,n!=null&&(c.callback=n),t=On(e,c,i),t!==null&&(Nt(t,e,i),Xi(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Ot(),c=An(i);c.tag=1,c.payload=t,n!=null&&(c.callback=n),t=On(e,c,i),t!==null&&(Nt(t,e,i),Xi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ot(),i=An(n);i.tag=2,t!=null&&(i.callback=t),t=On(e,i,n),t!==null&&(Nt(t,e,n),Xi(t,e,n))}};function Kh(e,t,n,i,c,f,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,f,g):t.prototype&&t.prototype.isPureReactComponent?!Bi(n,i)||!Bi(c,f):!0}function Vh(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Jc.enqueueReplaceState(t,t.state,null)}function ul(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=b({},n));for(var c in e)n[c]===void 0&&(n[c]=e[c])}return n}var Ss=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Qh(e){Ss(e)}function Xh(e){console.error(e)}function Zh(e){Ss(e)}function Ts(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Jh(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Wc(e,t,n){return n=An(n),n.tag=3,n.payload={element:null},n.callback=function(){Ts(e,t)},n}function Wh(e){return e=An(e),e.tag=3,e}function Ih(e,t,n,i){var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var f=i.value;e.payload=function(){return c(f)},e.callback=function(){Jh(t,n,i)}}var g=n.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(e.callback=function(){Jh(t,n,i),typeof c!="function"&&(Ln===null?Ln=new Set([this]):Ln.add(this));var y=i.stack;this.componentDidCatch(i.value,{componentStack:y!==null?y:""})})}function Jy(e,t,n,i,c){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Yi(t,n,c,!0),n=zt.current,n!==null){switch(n.tag){case 13:return Xt===null?Sr():n.alternate===null&&Be===0&&(Be=3),n.flags&=-257,n.flags|=65536,n.lanes=c,i===Oc?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),wr(e,i,c)),!1;case 22:return n.flags|=65536,i===Oc?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),wr(e,i,c)),!1}throw Error(s(435,n.tag))}return wr(e,i,c),Sr(),!1}if(be)return t=zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=c,i!==vc&&(e=Error(s(422),{cause:i}),$i(Ct(e,n)))):(i!==vc&&(t=Error(s(423),{cause:i}),$i(Ct(t,n))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,i=Ct(i,n),c=Wc(e.stateNode,i,c),Mc(e,c),Be!==4&&(Be=2)),!1;var f=Error(s(520),{cause:i});if(f=Ct(f,n),ca===null?ca=[f]:ca.push(f),Be!==4&&(Be=2),t===null)return!0;i=Ct(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=c&-c,n.lanes|=e,e=Wc(n.stateNode,i,e),Mc(n,e),!1;case 1:if(t=n.type,f=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ln===null||!Ln.has(f))))return n.flags|=65536,c&=-c,n.lanes|=c,c=Wh(c),Ih(c,e,n,i),Mc(n,c),!1}n=n.return}while(n!==null);return!1}var Fh=Error(s(461)),Je=!1;function Fe(e,t,n,i){t.child=e===null?Yh(t,null,n,i):Vl(t,e.child,n,i)}function Ph(e,t,n,i,c){n=n.render;var f=t.ref;if("ref"in i){var g={};for(var y in i)y!=="ref"&&(g[y]=i[y])}else g=i;return il(t),i=kc(e,t,n,g,f,c),y=Lc(),e!==null&&!Je?(zc(e,t,c),rn(e,t,c)):(be&&y&&pc(t),t.flags|=1,Fe(e,t,i,c),t.child)}function ed(e,t,n,i,c){if(e===null){var f=n.type;return typeof f=="function"&&!dc(f)&&f.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=f,td(e,t,f,i,c)):(e=es(n.type,null,i,t,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}if(f=e.child,!ir(e,c)){var g=f.memoizedProps;if(n=n.compare,n=n!==null?n:Bi,n(g,i)&&e.ref===t.ref)return rn(e,t,c)}return t.flags|=1,e=tn(f,i),e.ref=t.ref,e.return=t,t.child=e}function td(e,t,n,i,c){if(e!==null){var f=e.memoizedProps;if(Bi(f,i)&&e.ref===t.ref)if(Je=!1,t.pendingProps=i=f,ir(e,c))(e.flags&131072)!==0&&(Je=!0);else return t.lanes=e.lanes,rn(e,t,c)}return Ic(e,t,n,i,c)}function nd(e,t,n){var i=t.pendingProps,c=i.children,f=e!==null?e.memoizedState:null;if(i.mode==="hidden"){if((t.flags&128)!==0){if(i=f!==null?f.baseLanes|n:n,e!==null){for(c=t.child=e.child,f=0;c!==null;)f=f|c.lanes|c.childLanes,c=c.sibling;t.childLanes=f&~i}else t.childLanes=0,t.child=null;return ld(e,t,i,n)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&as(t,f!==null?f.cachePool:null),f!==null?th(t,f):Dc(),Gh(t);else return t.lanes=t.childLanes=536870912,ld(e,t,f!==null?f.baseLanes|n:n,n)}else f!==null?(as(t,f.cachePool),th(t,f),Mn(),t.memoizedState=null):(e!==null&&as(t,null),Dc(),Mn());return Fe(e,t,c,n),t.child}function ld(e,t,n,i){var c=Ac();return c=c===null?null:{parent:Ve._currentValue,pool:c},t.memoizedState={baseLanes:n,cachePool:c},e!==null&&as(t,null),Dc(),Gh(t),e!==null&&Yi(e,t,i,!0),null}function ws(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Ic(e,t,n,i,c){return il(t),n=kc(e,t,n,i,void 0,c),i=Lc(),e!==null&&!Je?(zc(e,t,c),rn(e,t,c)):(be&&i&&pc(t),t.flags|=1,Fe(e,t,n,c),t.child)}function id(e,t,n,i,c,f){return il(t),t.updateQueue=null,n=lh(t,i,n,c),nh(e),i=Lc(),e!==null&&!Je?(zc(e,t,f),rn(e,t,f)):(be&&i&&pc(t),t.flags|=1,Fe(e,t,n,f),t.child)}function ad(e,t,n,i,c){if(il(t),t.stateNode===null){var f=zl,g=n.contextType;typeof g=="object"&&g!==null&&(f=lt(g)),f=new n(i,f),t.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Jc,t.stateNode=f,f._reactInternals=t,f=t.stateNode,f.props=i,f.state=t.memoizedState,f.refs={},Nc(t),g=n.contextType,f.context=typeof g=="object"&&g!==null?lt(g):zl,f.state=t.memoizedState,g=n.getDerivedStateFromProps,typeof g=="function"&&(Zc(t,n,g,i),f.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(g=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),g!==f.state&&Jc.enqueueReplaceState(f,f.state,null),Ji(t,i,f,c),Zi(),f.state=t.memoizedState),typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){f=t.stateNode;var y=t.memoizedProps,v=ul(n,y);f.props=v;var x=f.context,q=n.contextType;g=zl,typeof q=="object"&&q!==null&&(g=lt(q));var $=n.getDerivedStateFromProps;q=typeof $=="function"||typeof f.getSnapshotBeforeUpdate=="function",y=t.pendingProps!==y,q||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y||x!==g)&&Vh(t,f,i,g),En=!1;var C=t.memoizedState;f.state=C,Ji(t,i,f,c),Zi(),x=t.memoizedState,y||C!==x||En?(typeof $=="function"&&(Zc(t,n,$,i),x=t.memoizedState),(v=En||Kh(t,n,v,i,C,x,g))?(q||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=x),f.props=i,f.state=x,f.context=g,i=v):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{f=t.stateNode,_c(e,t),g=t.memoizedProps,q=ul(n,g),f.props=q,$=t.pendingProps,C=f.context,x=n.contextType,v=zl,typeof x=="object"&&x!==null&&(v=lt(x)),y=n.getDerivedStateFromProps,(x=typeof y=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(g!==$||C!==v)&&Vh(t,f,i,v),En=!1,C=t.memoizedState,f.state=C,Ji(t,i,f,c),Zi();var R=t.memoizedState;g!==$||C!==R||En||e!==null&&e.dependencies!==null&&ls(e.dependencies)?(typeof y=="function"&&(Zc(t,n,y,i),R=t.memoizedState),(q=En||Kh(t,n,q,i,C,R,v)||e!==null&&e.dependencies!==null&&ls(e.dependencies))?(x||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(i,R,v),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(i,R,v)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=R),f.props=i,f.state=R,f.context=v,i=q):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),i=!1)}return f=i,ws(e,t),i=(t.flags&128)!==0,f||i?(f=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:f.render(),t.flags|=1,e!==null&&i?(t.child=Vl(t,e.child,null,c),t.child=Vl(t,null,n,c)):Fe(e,t,n,c),t.memoizedState=f.state,e=t.child):e=rn(e,t,c),e}function sd(e,t,n,i){return Hi(),t.flags|=256,Fe(e,t,n,i),t.child}var Fc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Pc(e){return{baseLanes:e,cachePool:Xo()}}function er(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Ut),e}function ud(e,t,n){var i=t.pendingProps,c=!1,f=(t.flags&128)!==0,g;if((g=f)||(g=e!==null&&e.memoizedState===null?!1:(Qe.current&2)!==0),g&&(c=!0,t.flags&=-129),g=(t.flags&32)!==0,t.flags&=-33,e===null){if(be){if(c?_n(t):Mn(),be){var y=Ue,v;if(v=y){e:{for(v=y,y=Qt;v.nodeType!==8;){if(!y){y=null;break e}if(v=Yt(v.nextSibling),v===null){y=null;break e}}y=v}y!==null?(t.memoizedState={dehydrated:y,treeContext:Pn!==null?{id:nn,overflow:ln}:null,retryLane:536870912,hydrationErrors:null},v=Tt(18,null,null,0),v.stateNode=y,v.return=t,t.child=v,ut=t,Ue=null,v=!0):v=!1}v||nl(t)}if(y=t.memoizedState,y!==null&&(y=y.dehydrated,y!==null))return Br(y)?t.lanes=32:t.lanes=536870912,null;cn(t)}return y=i.children,i=i.fallback,c?(Mn(),c=t.mode,y=Es({mode:"hidden",children:y},c),i=Fn(i,c,n,null),y.return=t,i.return=t,y.sibling=i,t.child=y,c=t.child,c.memoizedState=Pc(n),c.childLanes=er(e,g,n),t.memoizedState=Fc,i):(_n(t),tr(t,y))}if(v=e.memoizedState,v!==null&&(y=v.dehydrated,y!==null)){if(f)t.flags&256?(_n(t),t.flags&=-257,t=nr(e,t,n)):t.memoizedState!==null?(Mn(),t.child=e.child,t.flags|=128,t=null):(Mn(),c=i.fallback,y=t.mode,i=Es({mode:"visible",children:i.children},y),c=Fn(c,y,n,null),c.flags|=2,i.return=t,c.return=t,i.sibling=c,t.child=i,Vl(t,e.child,null,n),i=t.child,i.memoizedState=Pc(n),i.childLanes=er(e,g,n),t.memoizedState=Fc,t=c);else if(_n(t),Br(y)){if(g=y.nextSibling&&y.nextSibling.dataset,g)var x=g.dgst;g=x,i=Error(s(419)),i.stack="",i.digest=g,$i({value:i,source:null,stack:null}),t=nr(e,t,n)}else if(Je||Yi(e,t,n,!1),g=(n&e.childLanes)!==0,Je||g){if(g=Me,g!==null&&(i=n&-n,i=(i&42)!==0?1:qu(i),i=(i&(g.suspendedLanes|n))!==0?0:i,i!==0&&i!==v.retryLane))throw v.retryLane=i,Ll(e,i),Nt(g,e,i),Fh;y.data==="$?"||Sr(),t=nr(e,t,n)}else y.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=v.treeContext,Ue=Yt(y.nextSibling),ut=t,be=!0,tl=null,Qt=!1,e!==null&&(kt[Lt++]=nn,kt[Lt++]=ln,kt[Lt++]=Pn,nn=e.id,ln=e.overflow,Pn=t),t=tr(t,i.children),t.flags|=4096);return t}return c?(Mn(),c=i.fallback,y=t.mode,v=e.child,x=v.sibling,i=tn(v,{mode:"hidden",children:i.children}),i.subtreeFlags=v.subtreeFlags&65011712,x!==null?c=tn(x,c):(c=Fn(c,y,n,null),c.flags|=2),c.return=t,i.return=t,i.sibling=c,t.child=i,i=c,c=t.child,y=e.child.memoizedState,y===null?y=Pc(n):(v=y.cachePool,v!==null?(x=Ve._currentValue,v=v.parent!==x?{parent:x,pool:x}:v):v=Xo(),y={baseLanes:y.baseLanes|n,cachePool:v}),c.memoizedState=y,c.childLanes=er(e,g,n),t.memoizedState=Fc,i):(_n(t),n=e.child,e=n.sibling,n=tn(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(g=t.deletions,g===null?(t.deletions=[e],t.flags|=16):g.push(e)),t.child=n,t.memoizedState=null,n)}function tr(e,t){return t=Es({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Es(e,t){return e=Tt(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function nr(e,t,n){return Vl(t,e.child,null,n),e=tr(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cd(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Sc(e.return,t,n)}function lr(e,t,n,i,c){var f=e.memoizedState;f===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:c}:(f.isBackwards=t,f.rendering=null,f.renderingStartTime=0,f.last=i,f.tail=n,f.tailMode=c)}function rd(e,t,n){var i=t.pendingProps,c=i.revealOrder,f=i.tail;if(Fe(e,t,i.children,n),i=Qe.current,(i&2)!==0)i=i&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&cd(e,n,t);else if(e.tag===19)cd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}switch(J(Qe,i),c){case"forwards":for(n=t.child,c=null;n!==null;)e=n.alternate,e!==null&&bs(e)===null&&(c=n),n=n.sibling;n=c,n===null?(c=t.child,t.child=null):(c=n.sibling,n.sibling=null),lr(t,!1,c,n,f);break;case"backwards":for(n=null,c=t.child,t.child=null;c!==null;){if(e=c.alternate,e!==null&&bs(e)===null){t.child=c;break}e=c.sibling,c.sibling=n,n=c,c=e}lr(t,!0,n,null,f);break;case"together":lr(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function rn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),kn|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Yi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=tn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=tn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ir(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&ls(e)))}function Wy(e,t,n){switch(t.tag){case 3:De(t,t.stateNode.containerInfo),wn(t,Ve,e.memoizedState.cache),Hi();break;case 27:case 5:ku(t);break;case 4:De(t,t.stateNode.containerInfo);break;case 10:wn(t,t.type,t.memoizedProps.value);break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(_n(t),t.flags|=128,null):(n&t.child.childLanes)!==0?ud(e,t,n):(_n(t),e=rn(e,t,n),e!==null?e.sibling:null);_n(t);break;case 19:var c=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Yi(e,t,n,!1),i=(n&t.childLanes)!==0),c){if(i)return rd(e,t,n);t.flags|=128}if(c=t.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),J(Qe,Qe.current),i)break;return null;case 22:case 23:return t.lanes=0,nd(e,t,n);case 24:wn(t,Ve,e.memoizedState.cache)}return rn(e,t,n)}function fd(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Je=!0;else{if(!ir(e,n)&&(t.flags&128)===0)return Je=!1,Wy(e,t,n);Je=(e.flags&131072)!==0}else Je=!1,be&&(t.flags&1048576)!==0&&Ho(t,ns,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var i=t.elementType,c=i._init;if(i=c(i._payload),t.type=i,typeof i=="function")dc(i)?(e=ul(i,e),t.tag=1,t=ad(null,t,i,e,n)):(t.tag=0,t=Ic(null,t,i,e,n));else{if(i!=null){if(c=i.$$typeof,c===Q){t.tag=11,t=Ph(null,t,i,e,n);break e}else if(c===ee){t.tag=14,t=ed(null,t,i,e,n);break e}}throw t=xe(i)||i,Error(s(306,t,""))}}return t;case 0:return Ic(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,c=ul(i,t.pendingProps),ad(e,t,i,c,n);case 3:e:{if(De(t,t.stateNode.containerInfo),e===null)throw Error(s(387));i=t.pendingProps;var f=t.memoizedState;c=f.element,_c(e,t),Ji(t,i,null,n);var g=t.memoizedState;if(i=g.cache,wn(t,Ve,i),i!==f.cache&&Tc(t,[Ve],n,!0),Zi(),i=g.element,f.isDehydrated)if(f={element:i,isDehydrated:!1,cache:g.cache},t.updateQueue.baseState=f,t.memoizedState=f,t.flags&256){t=sd(e,t,i,n);break e}else if(i!==c){c=Ct(Error(s(424)),t),$i(c),t=sd(e,t,i,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ue=Yt(e.firstChild),ut=t,be=!0,tl=null,Qt=!0,n=Yh(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hi(),i===c){t=rn(e,t,n);break e}Fe(e,t,i,n)}t=t.child}return t;case 26:return ws(e,t),e===null?(n=gg(t.type,null,t.pendingProps,null))?t.memoizedState=n:be||(n=t.type,e=t.pendingProps,i=Bs(ce.current).createElement(n),i[nt]=t,i[rt]=e,et(i,n,e),Ze(i),t.stateNode=i):t.memoizedState=gg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ku(t),e===null&&be&&(i=t.stateNode=og(t.type,t.pendingProps,ce.current),ut=t,Qt=!0,c=Ue,Bn(t.type)?(qr=c,Ue=Yt(i.firstChild)):Ue=c),Fe(e,t,t.pendingProps.children,n),ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&be&&((c=i=Ue)&&(i=A0(i,t.type,t.pendingProps,Qt),i!==null?(t.stateNode=i,ut=t,Ue=Yt(i.firstChild),Qt=!1,c=!0):c=!1),c||nl(t)),ku(t),c=t.type,f=t.pendingProps,g=e!==null?e.memoizedProps:null,i=f.children,Lr(c,f)?i=null:g!==null&&Lr(c,g)&&(t.flags|=32),t.memoizedState!==null&&(c=kc(e,t,Yy,null,null,n),ya._currentValue=c),ws(e,t),Fe(e,t,i,n),t.child;case 6:return e===null&&be&&((e=n=Ue)&&(n=O0(n,t.pendingProps,Qt),n!==null?(t.stateNode=n,ut=t,Ue=null,e=!0):e=!1),e||nl(t)),null;case 13:return ud(e,t,n);case 4:return De(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Vl(t,null,i,n):Fe(e,t,i,n),t.child;case 11:return Ph(e,t,t.type,t.pendingProps,n);case 7:return Fe(e,t,t.pendingProps,n),t.child;case 8:return Fe(e,t,t.pendingProps.children,n),t.child;case 12:return Fe(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,wn(t,t.type,i.value),Fe(e,t,i.children,n),t.child;case 9:return c=t.type._context,i=t.pendingProps.children,il(t),c=lt(c),i=i(c),t.flags|=1,Fe(e,t,i,n),t.child;case 14:return ed(e,t,t.type,t.pendingProps,n);case 15:return td(e,t,t.type,t.pendingProps,n);case 19:return rd(e,t,n);case 31:return i=t.pendingProps,n=t.mode,i={mode:i.mode,children:i.children},e===null?(n=Es(i,n),n.ref=t.ref,t.child=n,n.return=t,t=n):(n=tn(e.child,i),n.ref=t.ref,t.child=n,n.return=t,t=n),t;case 22:return nd(e,t,n);case 24:return il(t),i=lt(Ve),e===null?(c=Ac(),c===null&&(c=Me,f=wc(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=n),c=f),t.memoizedState={parent:i,cache:c},Nc(t),wn(t,Ve,c)):((e.lanes&n)!==0&&(_c(e,t),Ji(t,null,null,n),Zi()),c=e.memoizedState,f=t.memoizedState,c.parent!==i?(c={parent:i,cache:i},t.memoizedState=c,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=c),wn(t,Ve,i)):(i=f.cache,wn(t,Ve,i),i!==c.cache&&Tc(t,[Ve],n,!0))),Fe(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function fn(e){e.flags|=4}function od(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!bg(t)){if(t=zt.current,t!==null&&((pe&4194048)===pe?Xt!==null:(pe&62914560)!==pe&&(pe&536870912)===0||t!==Xt))throw Qi=Oc,Zo;e.flags|=8192}}function As(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Yf():536870912,e.lanes|=t,Jl|=t)}function na(e,t){if(!be)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function ke(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var c=e.child;c!==null;)n|=c.lanes|c.childLanes,i|=c.subtreeFlags&65011712,i|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)n|=c.lanes|c.childLanes,i|=c.subtreeFlags,i|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function Iy(e,t,n){var i=t.pendingProps;switch(yc(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ke(t),null;case 1:return ke(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),sn(Ve),vn(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ji(t)?fn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Go())),ke(t),null;case 26:return n=t.memoizedState,e===null?(fn(t),n!==null?(ke(t),od(t,n)):(ke(t),t.flags&=-16777217)):n?n!==e.memoizedState?(fn(t),ke(t),od(t,n)):(ke(t),t.flags&=-16777217):(e.memoizedProps!==i&&fn(t),ke(t),t.flags&=-16777217),null;case 27:za(t),n=ce.current;var c=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==i&&fn(t);else{if(!i){if(t.stateNode===null)throw Error(s(166));return ke(t),null}e=ne.current,ji(t)?$o(t):(e=og(c,i,n),t.stateNode=e,fn(t))}return ke(t),null;case 5:if(za(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&fn(t);else{if(!i){if(t.stateNode===null)throw Error(s(166));return ke(t),null}if(e=ne.current,ji(t))$o(t);else{switch(c=Bs(ce.current),e){case 1:e=c.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:e=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":e=c.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":e=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":e=c.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof i.is=="string"?c.createElement("select",{is:i.is}):c.createElement("select"),i.multiple?e.multiple=!0:i.size&&(e.size=i.size);break;default:e=typeof i.is=="string"?c.createElement(n,{is:i.is}):c.createElement(n)}}e[nt]=t,e[rt]=i;e:for(c=t.child;c!==null;){if(c.tag===5||c.tag===6)e.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===t)break e;for(;c.sibling===null;){if(c.return===null||c.return===t)break e;c=c.return}c.sibling.return=c.return,c=c.sibling}t.stateNode=e;e:switch(et(e,n,i),n){case"button":case"input":case"select":case"textarea":e=!!i.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&fn(t)}}return ke(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&fn(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(s(166));if(e=ce.current,ji(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,c=ut,c!==null)switch(c.tag){case 27:case 5:i=c.memoizedProps}e[nt]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||ig(e.nodeValue,n)),e||nl(t)}else e=Bs(e).createTextNode(i),e[nt]=t,t.stateNode=e}return ke(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=ji(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(s(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[nt]=t}else Hi(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ke(t),c=!1}else c=Go(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return t.flags&256?(cn(t),t):(cn(t),null)}if(cn(t),(t.flags&128)!==0)return t.lanes=n,t;if(n=i!==null,e=e!==null&&e.memoizedState!==null,n){i=t.child,c=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(c=i.alternate.memoizedState.cachePool.pool);var f=null;i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(f=i.memoizedState.cachePool.pool),f!==c&&(i.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),As(t,t.updateQueue),ke(t),null;case 4:return vn(),e===null&&xr(t.stateNode.containerInfo),ke(t),null;case 10:return sn(t.type),ke(t),null;case 19:if(W(Qe),c=t.memoizedState,c===null)return ke(t),null;if(i=(t.flags&128)!==0,f=c.rendering,f===null)if(i)na(c,!1);else{if(Be!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=bs(e),f!==null){for(t.flags|=128,na(c,!1),e=f.updateQueue,t.updateQueue=e,As(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)jo(n,e),n=n.sibling;return J(Qe,Qe.current&1|2),t.child}e=e.sibling}c.tail!==null&&Vt()>_s&&(t.flags|=128,i=!0,na(c,!1),t.lanes=4194304)}else{if(!i)if(e=bs(f),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,As(t,e),na(c,!0),c.tail===null&&c.tailMode==="hidden"&&!f.alternate&&!be)return ke(t),null}else 2*Vt()-c.renderingStartTime>_s&&n!==536870912&&(t.flags|=128,i=!0,na(c,!1),t.lanes=4194304);c.isBackwards?(f.sibling=t.child,t.child=f):(e=c.last,e!==null?e.sibling=f:t.child=f,c.last=f)}return c.tail!==null?(t=c.tail,c.rendering=t,c.tail=t.sibling,c.renderingStartTime=Vt(),t.sibling=null,e=Qe.current,J(Qe,i?e&1|2:e&1),t):(ke(t),null);case 22:case 23:return cn(t),Cc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(ke(t),t.subtreeFlags&6&&(t.flags|=8192)):ke(t),n=t.updateQueue,n!==null&&As(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&W(al),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),sn(Ve),ke(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function Fy(e,t){switch(yc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return sn(Ve),vn(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return za(t),null;case 13:if(cn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return W(Qe),null;case 4:return vn(),null;case 10:return sn(t.type),null;case 22:case 23:return cn(t),Cc(),e!==null&&W(al),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return sn(Ve),null;case 25:return null;default:return null}}function hd(e,t){switch(yc(t),t.tag){case 3:sn(Ve),vn();break;case 26:case 27:case 5:za(t);break;case 4:vn();break;case 13:cn(t);break;case 19:W(Qe);break;case 10:sn(t.type);break;case 22:case 23:cn(t),Cc(),e!==null&&W(al);break;case 24:sn(Ve)}}function la(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var c=i.next;n=c;do{if((n.tag&e)===e){i=void 0;var f=n.create,g=n.inst;i=f(),g.destroy=i}n=n.next}while(n!==c)}}catch(y){Ne(t,t.return,y)}}function xn(e,t,n){try{var i=t.updateQueue,c=i!==null?i.lastEffect:null;if(c!==null){var f=c.next;i=f;do{if((i.tag&e)===e){var g=i.inst,y=g.destroy;if(y!==void 0){g.destroy=void 0,c=t;var v=n,x=y;try{x()}catch(q){Ne(c,v,q)}}}i=i.next}while(i!==f)}}catch(q){Ne(t,t.return,q)}}function dd(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{eh(t,n)}catch(i){Ne(e,e.return,i)}}}function gd(e,t,n){n.props=ul(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){Ne(e,t,i)}}function ia(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(c){Ne(e,t,c)}}function Zt(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(c){Ne(e,t,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(c){Ne(e,t,c)}else n.current=null}function md(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(c){Ne(e,e.return,c)}}function ar(e,t,n){try{var i=e.stateNode;b0(i,e.type,n,t),i[rt]=t}catch(c){Ne(e,e.return,c)}}function pd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Bn(e.type)||e.tag===4}function sr(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||pd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Bn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ur(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Us));else if(i!==4&&(i===27&&Bn(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(ur(e,t,n),e=e.sibling;e!==null;)ur(e,t,n),e=e.sibling}function Os(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&Bn(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Os(e,t,n),e=e.sibling;e!==null;)Os(e,t,n),e=e.sibling}function yd(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,c=t.attributes;c.length;)t.removeAttributeNode(c[0]);et(t,i,n),t[nt]=e,t[rt]=n}catch(f){Ne(e,e.return,f)}}var on=!1,He=!1,cr=!1,vd=typeof WeakSet=="function"?WeakSet:Set,We=null;function Py(e,t){if(e=e.containerInfo,Rr=Gs,e=xo(e),sc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var c=i.anchorOffset,f=i.focusNode;i=i.focusOffset;try{n.nodeType,f.nodeType}catch{n=null;break e}var g=0,y=-1,v=-1,x=0,q=0,$=e,C=null;t:for(;;){for(var R;$!==n||c!==0&&$.nodeType!==3||(y=g+c),$!==f||i!==0&&$.nodeType!==3||(v=g+i),$.nodeType===3&&(g+=$.nodeValue.length),(R=$.firstChild)!==null;)C=$,$=R;for(;;){if($===e)break t;if(C===n&&++x===c&&(y=g),C===f&&++q===i&&(v=g),(R=$.nextSibling)!==null)break;$=C,C=$.parentNode}$=R}n=y===-1||v===-1?null:{start:y,end:v}}else n=null}n=n||{start:0,end:0}}else n=null;for(kr={focusedElem:e,selectionRange:n},Gs=!1,We=t;We!==null;)if(t=We,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,We=e;else for(;We!==null;){switch(t=We,f=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,n=t,c=f.memoizedProps,f=f.memoizedState,i=n.stateNode;try{var ue=ul(n.type,c,n.elementType===n.type);e=i.getSnapshotBeforeUpdate(ue,f),i.__reactInternalSnapshotBeforeUpdate=e}catch(le){Ne(n,n.return,le)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Ur(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ur(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,We=e;break}We=t.return}}function bd(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Dn(e,n),i&4&&la(5,n);break;case 1:if(Dn(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(g){Ne(n,n.return,g)}else{var c=ul(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(c,t,e.__reactInternalSnapshotBeforeUpdate)}catch(g){Ne(n,n.return,g)}}i&64&&dd(n),i&512&&ia(n,n.return);break;case 3:if(Dn(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{eh(e,t)}catch(g){Ne(n,n.return,g)}}break;case 27:t===null&&i&4&&yd(n);case 26:case 5:Dn(e,n),t===null&&i&4&&md(n),i&512&&ia(n,n.return);break;case 12:Dn(e,n);break;case 13:Dn(e,n),i&4&&wd(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=c0.bind(null,n),N0(e,n))));break;case 22:if(i=n.memoizedState!==null||on,!i){t=t!==null&&t.memoizedState!==null||He,c=on;var f=He;on=i,(He=t)&&!f?Cn(e,n,(n.subtreeFlags&8772)!==0):Dn(e,n),on=c,He=f}break;case 30:break;default:Dn(e,n)}}function Sd(e){var t=e.alternate;t!==null&&(e.alternate=null,Sd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&$u(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ce=null,ht=!1;function hn(e,t,n){for(n=n.child;n!==null;)Td(e,t,n),n=n.sibling}function Td(e,t,n){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(Oi,n)}catch{}switch(n.tag){case 26:He||Zt(n,t),hn(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:He||Zt(n,t);var i=Ce,c=ht;Bn(n.type)&&(Ce=n.stateNode,ht=!1),hn(e,t,n),da(n.stateNode),Ce=i,ht=c;break;case 5:He||Zt(n,t);case 6:if(i=Ce,c=ht,Ce=null,hn(e,t,n),Ce=i,ht=c,Ce!==null)if(ht)try{(Ce.nodeType===9?Ce.body:Ce.nodeName==="HTML"?Ce.ownerDocument.body:Ce).removeChild(n.stateNode)}catch(f){Ne(n,t,f)}else try{Ce.removeChild(n.stateNode)}catch(f){Ne(n,t,f)}break;case 18:Ce!==null&&(ht?(e=Ce,rg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Ta(e)):rg(Ce,n.stateNode));break;case 4:i=Ce,c=ht,Ce=n.stateNode.containerInfo,ht=!0,hn(e,t,n),Ce=i,ht=c;break;case 0:case 11:case 14:case 15:He||xn(2,n,t),He||xn(4,n,t),hn(e,t,n);break;case 1:He||(Zt(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&gd(n,t,i)),hn(e,t,n);break;case 21:hn(e,t,n);break;case 22:He=(i=He)||n.memoizedState!==null,hn(e,t,n),He=i;break;default:hn(e,t,n)}}function wd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ta(e)}catch(n){Ne(t,t.return,n)}}function e0(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new vd),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new vd),t;default:throw Error(s(435,e.tag))}}function rr(e,t){var n=e0(e);t.forEach(function(i){var c=r0.bind(null,e,i);n.has(i)||(n.add(i),i.then(c,c))})}function wt(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var c=n[i],f=e,g=t,y=g;e:for(;y!==null;){switch(y.tag){case 27:if(Bn(y.type)){Ce=y.stateNode,ht=!1;break e}break;case 5:Ce=y.stateNode,ht=!1;break e;case 3:case 4:Ce=y.stateNode.containerInfo,ht=!0;break e}y=y.return}if(Ce===null)throw Error(s(160));Td(f,g,c),Ce=null,ht=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)Ed(t,e),t=t.sibling}var $t=null;function Ed(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:wt(t,e),Et(e),i&4&&(xn(3,e,e.return),la(3,e),xn(5,e,e.return));break;case 1:wt(t,e),Et(e),i&512&&(He||n===null||Zt(n,n.return)),i&64&&on&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var c=$t;if(wt(t,e),Et(e),i&512&&(He||n===null||Zt(n,n.return)),i&4){var f=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){e:{i=e.type,n=e.memoizedProps,c=c.ownerDocument||c;t:switch(i){case"title":f=c.getElementsByTagName("title")[0],(!f||f[Mi]||f[nt]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(i),c.head.insertBefore(f,c.querySelector("head > title"))),et(f,i,n),f[nt]=e,Ze(f),i=f;break e;case"link":var g=yg("link","href",c).get(i+(n.href||""));if(g){for(var y=0;y<g.length;y++)if(f=g[y],f.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&f.getAttribute("rel")===(n.rel==null?null:n.rel)&&f.getAttribute("title")===(n.title==null?null:n.title)&&f.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){g.splice(y,1);break t}}f=c.createElement(i),et(f,i,n),c.head.appendChild(f);break;case"meta":if(g=yg("meta","content",c).get(i+(n.content||""))){for(y=0;y<g.length;y++)if(f=g[y],f.getAttribute("content")===(n.content==null?null:""+n.content)&&f.getAttribute("name")===(n.name==null?null:n.name)&&f.getAttribute("property")===(n.property==null?null:n.property)&&f.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&f.getAttribute("charset")===(n.charSet==null?null:n.charSet)){g.splice(y,1);break t}}f=c.createElement(i),et(f,i,n),c.head.appendChild(f);break;default:throw Error(s(468,i))}f[nt]=e,Ze(f),i=f}e.stateNode=i}else vg(c,e.type,e.stateNode);else e.stateNode=pg(c,i,e.memoizedProps);else f!==i?(f===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):f.count--,i===null?vg(c,e.type,e.stateNode):pg(c,i,e.memoizedProps)):i===null&&e.stateNode!==null&&ar(e,e.memoizedProps,n.memoizedProps)}break;case 27:wt(t,e),Et(e),i&512&&(He||n===null||Zt(n,n.return)),n!==null&&i&4&&ar(e,e.memoizedProps,n.memoizedProps);break;case 5:if(wt(t,e),Et(e),i&512&&(He||n===null||Zt(n,n.return)),e.flags&32){c=e.stateNode;try{_l(c,"")}catch(R){Ne(e,e.return,R)}}i&4&&e.stateNode!=null&&(c=e.memoizedProps,ar(e,c,n!==null?n.memoizedProps:c)),i&1024&&(cr=!0);break;case 6:if(wt(t,e),Et(e),i&4){if(e.stateNode===null)throw Error(s(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(R){Ne(e,e.return,R)}}break;case 3:if(Hs=null,c=$t,$t=qs(t.containerInfo),wt(t,e),$t=c,Et(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ta(t.containerInfo)}catch(R){Ne(e,e.return,R)}cr&&(cr=!1,Ad(e));break;case 4:i=$t,$t=qs(e.stateNode.containerInfo),wt(t,e),Et(e),$t=i;break;case 12:wt(t,e),Et(e);break;case 13:wt(t,e),Et(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(mr=Vt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,rr(e,i)));break;case 22:c=e.memoizedState!==null;var v=n!==null&&n.memoizedState!==null,x=on,q=He;if(on=x||c,He=q||v,wt(t,e),He=q,on=x,Et(e),i&8192)e:for(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,c&&(n===null||v||on||He||cl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){v=n=t;try{if(f=v.stateNode,c)g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{y=v.stateNode;var $=v.memoizedProps.style,C=$!=null&&$.hasOwnProperty("display")?$.display:null;y.style.display=C==null||typeof C=="boolean"?"":(""+C).trim()}}catch(R){Ne(v,v.return,R)}}}else if(t.tag===6){if(n===null){v=t;try{v.stateNode.nodeValue=c?"":v.memoizedProps}catch(R){Ne(v,v.return,R)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,rr(e,n))));break;case 19:wt(t,e),Et(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,rr(e,i)));break;case 30:break;case 21:break;default:wt(t,e),Et(e)}}function Et(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(pd(i)){n=i;break}i=i.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var c=n.stateNode,f=sr(e);Os(e,f,c);break;case 5:var g=n.stateNode;n.flags&32&&(_l(g,""),n.flags&=-33);var y=sr(e);Os(e,y,g);break;case 3:case 4:var v=n.stateNode.containerInfo,x=sr(e);ur(e,x,v);break;default:throw Error(s(161))}}catch(q){Ne(e,e.return,q)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ad(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Ad(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Dn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)bd(e,t.alternate,t),t=t.sibling}function cl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xn(4,t,t.return),cl(t);break;case 1:Zt(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&gd(t,t.return,n),cl(t);break;case 27:da(t.stateNode);case 26:case 5:Zt(t,t.return),cl(t);break;case 22:t.memoizedState===null&&cl(t);break;case 30:cl(t);break;default:cl(t)}e=e.sibling}}function Cn(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,c=e,f=t,g=f.flags;switch(f.tag){case 0:case 11:case 15:Cn(c,f,n),la(4,f);break;case 1:if(Cn(c,f,n),i=f,c=i.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(x){Ne(i,i.return,x)}if(i=f,c=i.updateQueue,c!==null){var y=i.stateNode;try{var v=c.shared.hiddenCallbacks;if(v!==null)for(c.shared.hiddenCallbacks=null,c=0;c<v.length;c++)Po(v[c],y)}catch(x){Ne(i,i.return,x)}}n&&g&64&&dd(f),ia(f,f.return);break;case 27:yd(f);case 26:case 5:Cn(c,f,n),n&&i===null&&g&4&&md(f),ia(f,f.return);break;case 12:Cn(c,f,n);break;case 13:Cn(c,f,n),n&&g&4&&wd(c,f);break;case 22:f.memoizedState===null&&Cn(c,f,n),ia(f,f.return);break;case 30:break;default:Cn(c,f,n)}t=t.sibling}}function fr(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Gi(n))}function or(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Gi(e))}function Jt(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Od(e,t,n,i),t=t.sibling}function Od(e,t,n,i){var c=t.flags;switch(t.tag){case 0:case 11:case 15:Jt(e,t,n,i),c&2048&&la(9,t);break;case 1:Jt(e,t,n,i);break;case 3:Jt(e,t,n,i),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Gi(e)));break;case 12:if(c&2048){Jt(e,t,n,i),e=t.stateNode;try{var f=t.memoizedProps,g=f.id,y=f.onPostCommit;typeof y=="function"&&y(g,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(v){Ne(t,t.return,v)}}else Jt(e,t,n,i);break;case 13:Jt(e,t,n,i);break;case 23:break;case 22:f=t.stateNode,g=t.alternate,t.memoizedState!==null?f._visibility&2?Jt(e,t,n,i):aa(e,t):f._visibility&2?Jt(e,t,n,i):(f._visibility|=2,Ql(e,t,n,i,(t.subtreeFlags&10256)!==0)),c&2048&&fr(g,t);break;case 24:Jt(e,t,n,i),c&2048&&or(t.alternate,t);break;default:Jt(e,t,n,i)}}function Ql(e,t,n,i,c){for(c=c&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var f=e,g=t,y=n,v=i,x=g.flags;switch(g.tag){case 0:case 11:case 15:Ql(f,g,y,v,c),la(8,g);break;case 23:break;case 22:var q=g.stateNode;g.memoizedState!==null?q._visibility&2?Ql(f,g,y,v,c):aa(f,g):(q._visibility|=2,Ql(f,g,y,v,c)),c&&x&2048&&fr(g.alternate,g);break;case 24:Ql(f,g,y,v,c),c&&x&2048&&or(g.alternate,g);break;default:Ql(f,g,y,v,c)}t=t.sibling}}function aa(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,c=i.flags;switch(i.tag){case 22:aa(n,i),c&2048&&fr(i.alternate,i);break;case 24:aa(n,i),c&2048&&or(i.alternate,i);break;default:aa(n,i)}t=t.sibling}}var sa=8192;function Xl(e){if(e.subtreeFlags&sa)for(e=e.child;e!==null;)Nd(e),e=e.sibling}function Nd(e){switch(e.tag){case 26:Xl(e),e.flags&sa&&e.memoizedState!==null&&j0($t,e.memoizedState,e.memoizedProps);break;case 5:Xl(e);break;case 3:case 4:var t=$t;$t=qs(e.stateNode.containerInfo),Xl(e),$t=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=sa,sa=16777216,Xl(e),sa=t):Xl(e));break;default:Xl(e)}}function _d(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ua(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];We=i,xd(i,e)}_d(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Md(e),e=e.sibling}function Md(e){switch(e.tag){case 0:case 11:case 15:ua(e),e.flags&2048&&xn(9,e,e.return);break;case 3:ua(e);break;case 12:ua(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ns(e)):ua(e);break;default:ua(e)}}function Ns(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];We=i,xd(i,e)}_d(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:xn(8,t,t.return),Ns(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ns(t));break;default:Ns(t)}e=e.sibling}}function xd(e,t){for(;We!==null;){var n=We;switch(n.tag){case 0:case 11:case 15:xn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Gi(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,We=i;else e:for(n=e;We!==null;){i=We;var c=i.sibling,f=i.return;if(Sd(i),i===n){We=null;break e}if(c!==null){c.return=f,We=c;break e}We=f}}}var t0={getCacheForType:function(e){var t=lt(Ve),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n}},n0=typeof WeakMap=="function"?WeakMap:Map,Se=0,Me=null,de=null,pe=0,Te=0,At=null,Rn=!1,Zl=!1,hr=!1,dn=0,Be=0,kn=0,rl=0,dr=0,Ut=0,Jl=0,ca=null,dt=null,gr=!1,mr=0,_s=1/0,Ms=null,Ln=null,Pe=0,zn=null,Wl=null,Il=0,pr=0,yr=null,Dd=null,ra=0,vr=null;function Ot(){if((Se&2)!==0&&pe!==0)return pe&-pe;if(B.T!==null){var e=ql;return e!==0?e:Or()}return Vf()}function Cd(){Ut===0&&(Ut=(pe&536870912)===0||be?$f():536870912);var e=zt.current;return e!==null&&(e.flags|=32),Ut}function Nt(e,t,n){(e===Me&&(Te===2||Te===9)||e.cancelPendingCommit!==null)&&(Fl(e,0),Un(e,pe,Ut,!1)),_i(e,n),((Se&2)===0||e!==Me)&&(e===Me&&((Se&2)===0&&(rl|=n),Be===4&&Un(e,pe,Ut,!1)),Wt(e))}function Rd(e,t,n){if((Se&6)!==0)throw Error(s(327));var i=!n&&(t&124)===0&&(t&e.expiredLanes)===0||Ni(e,t),c=i?a0(e,t):Tr(e,t,!0),f=i;do{if(c===0){Zl&&!i&&Un(e,t,0,!1);break}else{if(n=e.current.alternate,f&&!l0(n)){c=Tr(e,t,!1),f=!1;continue}if(c===2){if(f=t,e.errorRecoveryDisabledLanes&f)var g=0;else g=e.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){t=g;e:{var y=e;c=ca;var v=y.current.memoizedState.isDehydrated;if(v&&(Fl(y,g).flags|=256),g=Tr(y,g,!1),g!==2){if(hr&&!v){y.errorRecoveryDisabledLanes|=f,rl|=f,c=4;break e}f=dt,dt=c,f!==null&&(dt===null?dt=f:dt.push.apply(dt,f))}c=g}if(f=!1,c!==2)continue}}if(c===1){Fl(e,0),Un(e,t,0,!0);break}e:{switch(i=e,f=c,f){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:Un(i,t,Ut,!Rn);break e;case 2:dt=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(c=mr+300-Vt(),10<c)){if(Un(i,t,Ut,!Rn),ja(i,0,!0)!==0)break e;i.timeoutHandle=ug(kd.bind(null,i,n,dt,Ms,gr,t,Ut,rl,Jl,Rn,f,2,-0,0),c);break e}kd(i,n,dt,Ms,gr,t,Ut,rl,Jl,Rn,f,0,-0,0)}}break}while(!0);Wt(e)}function kd(e,t,n,i,c,f,g,y,v,x,q,$,C,R){if(e.timeoutHandle=-1,$=t.subtreeFlags,($&8192||($&16785408)===16785408)&&(pa={stylesheets:null,count:0,unsuspend:q0},Nd(t),$=H0(),$!==null)){e.cancelPendingCommit=$(Hd.bind(null,e,t,f,n,i,c,g,y,v,q,1,C,R)),Un(e,f,g,!x);return}Hd(e,t,f,n,i,c,g,y,v)}function l0(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var c=n[i],f=c.getSnapshot;c=c.value;try{if(!St(f(),c))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Un(e,t,n,i){t&=~dr,t&=~rl,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var c=t;0<c;){var f=31-bt(c),g=1<<f;i[f]=-1,c&=~g}n!==0&&Gf(e,n,t)}function xs(){return(Se&6)===0?(fa(0),!1):!0}function br(){if(de!==null){if(Te===0)var e=de.return;else e=de,an=ll=null,Uc(e),Kl=null,ea=0,e=de;for(;e!==null;)hd(e.alternate,e),e=e.return;de=null}}function Fl(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,T0(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),br(),Me=e,de=n=tn(e.current,null),pe=t,Te=0,At=null,Rn=!1,Zl=Ni(e,t),hr=!1,Jl=Ut=dr=rl=kn=Be=0,dt=ca=null,gr=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var c=31-bt(i),f=1<<c;t|=e[c],i&=~f}return dn=t,Ia(),n}function Ld(e,t){oe=null,B.H=ps,t===Vi||t===ss?(t=Io(),Te=3):t===Zo?(t=Io(),Te=4):Te=t===Fh?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,At=t,de===null&&(Be=1,Ts(e,Ct(t,e.current)))}function zd(){var e=B.H;return B.H=ps,e===null?ps:e}function Ud(){var e=B.A;return B.A=t0,e}function Sr(){Be=4,Rn||(pe&4194048)!==pe&&zt.current!==null||(Zl=!0),(kn&134217727)===0&&(rl&134217727)===0||Me===null||Un(Me,pe,Ut,!1)}function Tr(e,t,n){var i=Se;Se|=2;var c=zd(),f=Ud();(Me!==e||pe!==t)&&(Ms=null,Fl(e,t)),t=!1;var g=Be;e:do try{if(Te!==0&&de!==null){var y=de,v=At;switch(Te){case 8:br(),g=6;break e;case 3:case 2:case 9:case 6:zt.current===null&&(t=!0);var x=Te;if(Te=0,At=null,Pl(e,y,v,x),n&&Zl){g=0;break e}break;default:x=Te,Te=0,At=null,Pl(e,y,v,x)}}i0(),g=Be;break}catch(q){Ld(e,q)}while(!0);return t&&e.shellSuspendCounter++,an=ll=null,Se=i,B.H=c,B.A=f,de===null&&(Me=null,pe=0,Ia()),g}function i0(){for(;de!==null;)Bd(de)}function a0(e,t){var n=Se;Se|=2;var i=zd(),c=Ud();Me!==e||pe!==t?(Ms=null,_s=Vt()+500,Fl(e,t)):Zl=Ni(e,t);e:do try{if(Te!==0&&de!==null){t=de;var f=At;t:switch(Te){case 1:Te=0,At=null,Pl(e,t,f,1);break;case 2:case 9:if(Jo(f)){Te=0,At=null,qd(t);break}t=function(){Te!==2&&Te!==9||Me!==e||(Te=7),Wt(e)},f.then(t,t);break e;case 3:Te=7;break e;case 4:Te=5;break e;case 7:Jo(f)?(Te=0,At=null,qd(t)):(Te=0,At=null,Pl(e,t,f,7));break;case 5:var g=null;switch(de.tag){case 26:g=de.memoizedState;case 5:case 27:var y=de;if(!g||bg(g)){Te=0,At=null;var v=y.sibling;if(v!==null)de=v;else{var x=y.return;x!==null?(de=x,Ds(x)):de=null}break t}}Te=0,At=null,Pl(e,t,f,5);break;case 6:Te=0,At=null,Pl(e,t,f,6);break;case 8:br(),Be=6;break e;default:throw Error(s(462))}}s0();break}catch(q){Ld(e,q)}while(!0);return an=ll=null,B.H=i,B.A=c,Se=n,de!==null?0:(Me=null,pe=0,Ia(),Be)}function s0(){for(;de!==null&&!Mp();)Bd(de)}function Bd(e){var t=fd(e.alternate,e,dn);e.memoizedProps=e.pendingProps,t===null?Ds(e):de=t}function qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=id(n,t,t.pendingProps,t.type,void 0,pe);break;case 11:t=id(n,t,t.pendingProps,t.type.render,t.ref,pe);break;case 5:Uc(t);default:hd(n,t),t=de=jo(t,dn),t=fd(n,t,dn)}e.memoizedProps=e.pendingProps,t===null?Ds(e):de=t}function Pl(e,t,n,i){an=ll=null,Uc(t),Kl=null,ea=0;var c=t.return;try{if(Jy(e,c,t,n,pe)){Be=1,Ts(e,Ct(n,e.current)),de=null;return}}catch(f){if(c!==null)throw de=c,f;Be=1,Ts(e,Ct(n,e.current)),de=null;return}t.flags&32768?(be||i===1?e=!0:Zl||(pe&536870912)!==0?e=!1:(Rn=e=!0,(i===2||i===9||i===3||i===6)&&(i=zt.current,i!==null&&i.tag===13&&(i.flags|=16384))),jd(t,e)):Ds(t)}function Ds(e){var t=e;do{if((t.flags&32768)!==0){jd(t,Rn);return}e=t.return;var n=Iy(t.alternate,t,dn);if(n!==null){de=n;return}if(t=t.sibling,t!==null){de=t;return}de=t=e}while(t!==null);Be===0&&(Be=5)}function jd(e,t){do{var n=Fy(e.alternate,e);if(n!==null){n.flags&=32767,de=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){de=e;return}de=e=n}while(e!==null);Be=6,de=null}function Hd(e,t,n,i,c,f,g,y,v){e.cancelPendingCommit=null;do Cs();while(Pe!==0);if((Se&6)!==0)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(f=t.lanes|t.childLanes,f|=oc,qp(e,n,f,g,y,v),e===Me&&(de=Me=null,pe=0),Wl=t,zn=e,Il=n,pr=f,yr=c,Dd=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,f0(Ua,function(){return Vd(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=B.T,B.T=null,c=Z.p,Z.p=2,g=Se,Se|=4;try{Py(e,t,n)}finally{Se=g,Z.p=c,B.T=i}}Pe=1,$d(),Yd(),Gd()}}function $d(){if(Pe===1){Pe=0;var e=zn,t=Wl,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=B.T,B.T=null;var i=Z.p;Z.p=2;var c=Se;Se|=4;try{Ed(t,e);var f=kr,g=xo(e.containerInfo),y=f.focusedElem,v=f.selectionRange;if(g!==y&&y&&y.ownerDocument&&Mo(y.ownerDocument.documentElement,y)){if(v!==null&&sc(y)){var x=v.start,q=v.end;if(q===void 0&&(q=x),"selectionStart"in y)y.selectionStart=x,y.selectionEnd=Math.min(q,y.value.length);else{var $=y.ownerDocument||document,C=$&&$.defaultView||window;if(C.getSelection){var R=C.getSelection(),ue=y.textContent.length,le=Math.min(v.start,ue),Ae=v.end===void 0?le:Math.min(v.end,ue);!R.extend&&le>Ae&&(g=Ae,Ae=le,le=g);var _=_o(y,le),O=_o(y,Ae);if(_&&O&&(R.rangeCount!==1||R.anchorNode!==_.node||R.anchorOffset!==_.offset||R.focusNode!==O.node||R.focusOffset!==O.offset)){var M=$.createRange();M.setStart(_.node,_.offset),R.removeAllRanges(),le>Ae?(R.addRange(M),R.extend(O.node,O.offset)):(M.setEnd(O.node,O.offset),R.addRange(M))}}}}for($=[],R=y;R=R.parentNode;)R.nodeType===1&&$.push({element:R,left:R.scrollLeft,top:R.scrollTop});for(typeof y.focus=="function"&&y.focus(),y=0;y<$.length;y++){var j=$[y];j.element.scrollLeft=j.left,j.element.scrollTop=j.top}}Gs=!!Rr,kr=Rr=null}finally{Se=c,Z.p=i,B.T=n}}e.current=t,Pe=2}}function Yd(){if(Pe===2){Pe=0;var e=zn,t=Wl,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=B.T,B.T=null;var i=Z.p;Z.p=2;var c=Se;Se|=4;try{bd(e,t.alternate,t)}finally{Se=c,Z.p=i,B.T=n}}Pe=3}}function Gd(){if(Pe===4||Pe===3){Pe=0,xp();var e=zn,t=Wl,n=Il,i=Dd;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Pe=5:(Pe=0,Wl=zn=null,Kd(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(Ln=null),ju(n),t=t.stateNode,vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(Oi,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=B.T,c=Z.p,Z.p=2,B.T=null;try{for(var f=e.onRecoverableError,g=0;g<i.length;g++){var y=i[g];f(y.value,{componentStack:y.stack})}}finally{B.T=t,Z.p=c}}(Il&3)!==0&&Cs(),Wt(e),c=e.pendingLanes,(n&4194090)!==0&&(c&42)!==0?e===vr?ra++:(ra=0,vr=e):ra=0,fa(0)}}function Kd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Gi(t)))}function Cs(e){return $d(),Yd(),Gd(),Vd()}function Vd(){if(Pe!==5)return!1;var e=zn,t=pr;pr=0;var n=ju(Il),i=B.T,c=Z.p;try{Z.p=32>n?32:n,B.T=null,n=yr,yr=null;var f=zn,g=Il;if(Pe=0,Wl=zn=null,Il=0,(Se&6)!==0)throw Error(s(331));var y=Se;if(Se|=4,Md(f.current),Od(f,f.current,g,n),Se=y,fa(0,!1),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(Oi,f)}catch{}return!0}finally{Z.p=c,B.T=i,Kd(e,t)}}function Qd(e,t,n){t=Ct(n,t),t=Wc(e.stateNode,t,2),e=On(e,t,2),e!==null&&(_i(e,2),Wt(e))}function Ne(e,t,n){if(e.tag===3)Qd(e,e,n);else for(;t!==null;){if(t.tag===3){Qd(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ln===null||!Ln.has(i))){e=Ct(n,e),n=Wh(2),i=On(t,n,2),i!==null&&(Ih(n,i,t,e),_i(i,2),Wt(i));break}}t=t.return}}function wr(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new n0;var c=new Set;i.set(t,c)}else c=i.get(t),c===void 0&&(c=new Set,i.set(t,c));c.has(n)||(hr=!0,c.add(n),e=u0.bind(null,e,t,n),t.then(e,e))}function u0(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Me===e&&(pe&n)===n&&(Be===4||Be===3&&(pe&62914560)===pe&&300>Vt()-mr?(Se&2)===0&&Fl(e,0):dr|=n,Jl===pe&&(Jl=0)),Wt(e)}function Xd(e,t){t===0&&(t=Yf()),e=Ll(e,t),e!==null&&(_i(e,t),Wt(e))}function c0(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Xd(e,n)}function r0(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,c=e.memoizedState;c!==null&&(n=c.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(s(314))}i!==null&&i.delete(t),Xd(e,n)}function f0(e,t){return zu(e,t)}var Rs=null,ei=null,Er=!1,ks=!1,Ar=!1,fl=0;function Wt(e){e!==ei&&e.next===null&&(ei===null?Rs=ei=e:ei=ei.next=e),ks=!0,Er||(Er=!0,h0())}function fa(e,t){if(!Ar&&ks){Ar=!0;do for(var n=!1,i=Rs;i!==null;){if(e!==0){var c=i.pendingLanes;if(c===0)var f=0;else{var g=i.suspendedLanes,y=i.pingedLanes;f=(1<<31-bt(42|e)+1)-1,f&=c&~(g&~y),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(n=!0,Id(i,f))}else f=pe,f=ja(i,i===Me?f:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(f&3)===0||Ni(i,f)||(n=!0,Id(i,f));i=i.next}while(n);Ar=!1}}function o0(){Zd()}function Zd(){ks=Er=!1;var e=0;fl!==0&&(S0()&&(e=fl),fl=0);for(var t=Vt(),n=null,i=Rs;i!==null;){var c=i.next,f=Jd(i,t);f===0?(i.next=null,n===null?Rs=c:n.next=c,c===null&&(ei=n)):(n=i,(e!==0||(f&3)!==0)&&(ks=!0)),i=c}fa(e)}function Jd(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,c=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var g=31-bt(f),y=1<<g,v=c[g];v===-1?((y&n)===0||(y&i)!==0)&&(c[g]=Bp(y,t)):v<=t&&(e.expiredLanes|=y),f&=~y}if(t=Me,n=pe,n=ja(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(Te===2||Te===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Uu(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Ni(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Uu(i),ju(n)){case 2:case 8:n=jf;break;case 32:n=Ua;break;case 268435456:n=Hf;break;default:n=Ua}return i=Wd.bind(null,e),n=zu(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Uu(i),e.callbackPriority=2,e.callbackNode=null,2}function Wd(e,t){if(Pe!==0&&Pe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Cs()&&e.callbackNode!==n)return null;var i=pe;return i=ja(e,e===Me?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Rd(e,i,t),Jd(e,Vt()),e.callbackNode!=null&&e.callbackNode===n?Wd.bind(null,e):null)}function Id(e,t){if(Cs())return null;Rd(e,t,!0)}function h0(){w0(function(){(Se&6)!==0?zu(qf,o0):Zd()})}function Or(){return fl===0&&(fl=$f()),fl}function Fd(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ka(""+e)}function Pd(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function d0(e,t,n,i,c){if(t==="submit"&&n&&n.stateNode===c){var f=Fd((c[rt]||null).action),g=i.submitter;g&&(t=(t=g[rt]||null)?Fd(t.formAction):g.getAttribute("formAction"),t!==null&&(f=t,g=null));var y=new Za("action","action",null,i,c);e.push({event:y,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(fl!==0){var v=g?Pd(c,g):new FormData(c);Vc(n,{pending:!0,data:v,method:c.method,action:f},null,v)}}else typeof f=="function"&&(y.preventDefault(),v=g?Pd(c,g):new FormData(c),Vc(n,{pending:!0,data:v,method:c.method,action:f},f,v))},currentTarget:c}]})}}for(var Nr=0;Nr<fc.length;Nr++){var _r=fc[Nr],g0=_r.toLowerCase(),m0=_r[0].toUpperCase()+_r.slice(1);Ht(g0,"on"+m0)}Ht(Ro,"onAnimationEnd"),Ht(ko,"onAnimationIteration"),Ht(Lo,"onAnimationStart"),Ht("dblclick","onDoubleClick"),Ht("focusin","onFocus"),Ht("focusout","onBlur"),Ht(Ry,"onTransitionRun"),Ht(ky,"onTransitionStart"),Ht(Ly,"onTransitionCancel"),Ht(zo,"onTransitionEnd"),Al("onMouseEnter",["mouseout","mouseover"]),Al("onMouseLeave",["mouseout","mouseover"]),Al("onPointerEnter",["pointerout","pointerover"]),Al("onPointerLeave",["pointerout","pointerover"]),Zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var oa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),p0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(oa));function eg(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],c=i.event;i=i.listeners;e:{var f=void 0;if(t)for(var g=i.length-1;0<=g;g--){var y=i[g],v=y.instance,x=y.currentTarget;if(y=y.listener,v!==f&&c.isPropagationStopped())break e;f=y,c.currentTarget=x;try{f(c)}catch(q){Ss(q)}c.currentTarget=null,f=v}else for(g=0;g<i.length;g++){if(y=i[g],v=y.instance,x=y.currentTarget,y=y.listener,v!==f&&c.isPropagationStopped())break e;f=y,c.currentTarget=x;try{f(c)}catch(q){Ss(q)}c.currentTarget=null,f=v}}}}function ge(e,t){var n=t[Hu];n===void 0&&(n=t[Hu]=new Set);var i=e+"__bubble";n.has(i)||(tg(t,e,2,!1),n.add(i))}function Mr(e,t,n){var i=0;t&&(i|=4),tg(n,e,i,t)}var Ls="_reactListening"+Math.random().toString(36).slice(2);function xr(e){if(!e[Ls]){e[Ls]=!0,Xf.forEach(function(n){n!=="selectionchange"&&(p0.has(n)||Mr(n,!1,e),Mr(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ls]||(t[Ls]=!0,Mr("selectionchange",!1,t))}}function tg(e,t,n,i){switch(Og(t)){case 2:var c=G0;break;case 8:c=K0;break;default:c=Gr}n=c.bind(null,t,n,e),c=void 0,!Iu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(c=!0),i?c!==void 0?e.addEventListener(t,n,{capture:!0,passive:c}):e.addEventListener(t,n,!0):c!==void 0?e.addEventListener(t,n,{passive:c}):e.addEventListener(t,n,!1)}function Dr(e,t,n,i,c){var f=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var g=i.tag;if(g===3||g===4){var y=i.stateNode.containerInfo;if(y===c)break;if(g===4)for(g=i.return;g!==null;){var v=g.tag;if((v===3||v===4)&&g.stateNode.containerInfo===c)return;g=g.return}for(;y!==null;){if(g=Tl(y),g===null)return;if(v=g.tag,v===5||v===6||v===26||v===27){i=f=g;continue e}y=y.parentNode}}i=i.return}uo(function(){var x=f,q=Ju(n),$=[];e:{var C=Uo.get(e);if(C!==void 0){var R=Za,ue=e;switch(e){case"keypress":if(Qa(n)===0)break e;case"keydown":case"keyup":R=fy;break;case"focusin":ue="focus",R=tc;break;case"focusout":ue="blur",R=tc;break;case"beforeblur":case"afterblur":R=tc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":R=fo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":R=Fp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":R=dy;break;case Ro:case ko:case Lo:R=ty;break;case zo:R=my;break;case"scroll":case"scrollend":R=Wp;break;case"wheel":R=yy;break;case"copy":case"cut":case"paste":R=ly;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":R=ho;break;case"toggle":case"beforetoggle":R=by}var le=(t&4)!==0,Ae=!le&&(e==="scroll"||e==="scrollend"),_=le?C!==null?C+"Capture":null:C;le=[];for(var O=x,M;O!==null;){var j=O;if(M=j.stateNode,j=j.tag,j!==5&&j!==26&&j!==27||M===null||_===null||(j=Di(O,_),j!=null&&le.push(ha(O,j,M))),Ae)break;O=O.return}0<le.length&&(C=new R(C,ue,null,n,q),$.push({event:C,listeners:le}))}}if((t&7)===0){e:{if(C=e==="mouseover"||e==="pointerover",R=e==="mouseout"||e==="pointerout",C&&n!==Zu&&(ue=n.relatedTarget||n.fromElement)&&(Tl(ue)||ue[Sl]))break e;if((R||C)&&(C=q.window===q?q:(C=q.ownerDocument)?C.defaultView||C.parentWindow:window,R?(ue=n.relatedTarget||n.toElement,R=x,ue=ue?Tl(ue):null,ue!==null&&(Ae=o(ue),le=ue.tag,ue!==Ae||le!==5&&le!==27&&le!==6)&&(ue=null)):(R=null,ue=x),R!==ue)){if(le=fo,j="onMouseLeave",_="onMouseEnter",O="mouse",(e==="pointerout"||e==="pointerover")&&(le=ho,j="onPointerLeave",_="onPointerEnter",O="pointer"),Ae=R==null?C:xi(R),M=ue==null?C:xi(ue),C=new le(j,O+"leave",R,n,q),C.target=Ae,C.relatedTarget=M,j=null,Tl(q)===x&&(le=new le(_,O+"enter",ue,n,q),le.target=M,le.relatedTarget=Ae,j=le),Ae=j,R&&ue)t:{for(le=R,_=ue,O=0,M=le;M;M=ti(M))O++;for(M=0,j=_;j;j=ti(j))M++;for(;0<O-M;)le=ti(le),O--;for(;0<M-O;)_=ti(_),M--;for(;O--;){if(le===_||_!==null&&le===_.alternate)break t;le=ti(le),_=ti(_)}le=null}else le=null;R!==null&&ng($,C,R,le,!1),ue!==null&&Ae!==null&&ng($,Ae,ue,le,!0)}}e:{if(C=x?xi(x):window,R=C.nodeName&&C.nodeName.toLowerCase(),R==="select"||R==="input"&&C.type==="file")var I=To;else if(bo(C))if(wo)I=xy;else{I=_y;var he=Ny}else R=C.nodeName,!R||R.toLowerCase()!=="input"||C.type!=="checkbox"&&C.type!=="radio"?x&&Xu(x.elementType)&&(I=To):I=My;if(I&&(I=I(e,x))){So($,I,n,q);break e}he&&he(e,C,x),e==="focusout"&&x&&C.type==="number"&&x.memoizedProps.value!=null&&Qu(C,"number",C.value)}switch(he=x?xi(x):window,e){case"focusin":(bo(he)||he.contentEditable==="true")&&(Cl=he,uc=x,qi=null);break;case"focusout":qi=uc=Cl=null;break;case"mousedown":cc=!0;break;case"contextmenu":case"mouseup":case"dragend":cc=!1,Do($,n,q);break;case"selectionchange":if(Cy)break;case"keydown":case"keyup":Do($,n,q)}var P;if(lc)e:{switch(e){case"compositionstart":var ie="onCompositionStart";break e;case"compositionend":ie="onCompositionEnd";break e;case"compositionupdate":ie="onCompositionUpdate";break e}ie=void 0}else Dl?yo(e,n)&&(ie="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(ie="onCompositionStart");ie&&(go&&n.locale!=="ko"&&(Dl||ie!=="onCompositionStart"?ie==="onCompositionEnd"&&Dl&&(P=co()):(Tn=q,Fu="value"in Tn?Tn.value:Tn.textContent,Dl=!0)),he=zs(x,ie),0<he.length&&(ie=new oo(ie,e,null,n,q),$.push({event:ie,listeners:he}),P?ie.data=P:(P=vo(n),P!==null&&(ie.data=P)))),(P=Ty?wy(e,n):Ey(e,n))&&(ie=zs(x,"onBeforeInput"),0<ie.length&&(he=new oo("onBeforeInput","beforeinput",null,n,q),$.push({event:he,listeners:ie}),he.data=P)),d0($,e,x,n,q)}eg($,t)})}function ha(e,t,n){return{instance:e,listener:t,currentTarget:n}}function zs(e,t){for(var n=t+"Capture",i=[];e!==null;){var c=e,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=Di(e,n),c!=null&&i.unshift(ha(e,c,f)),c=Di(e,t),c!=null&&i.push(ha(e,c,f))),e.tag===3)return i;e=e.return}return[]}function ti(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ng(e,t,n,i,c){for(var f=t._reactName,g=[];n!==null&&n!==i;){var y=n,v=y.alternate,x=y.stateNode;if(y=y.tag,v!==null&&v===i)break;y!==5&&y!==26&&y!==27||x===null||(v=x,c?(x=Di(n,f),x!=null&&g.unshift(ha(n,x,v))):c||(x=Di(n,f),x!=null&&g.push(ha(n,x,v)))),n=n.return}g.length!==0&&e.push({event:t,listeners:g})}var y0=/\r\n?/g,v0=/\u0000|\uFFFD/g;function lg(e){return(typeof e=="string"?e:""+e).replace(y0,`
`).replace(v0,"")}function ig(e,t){return t=lg(t),lg(e)===t}function Us(){}function Ee(e,t,n,i,c,f){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||_l(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&_l(e,""+i);break;case"className":$a(e,"class",i);break;case"tabIndex":$a(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":$a(e,n,i);break;case"style":ao(e,i,f);break;case"data":if(t!=="object"){$a(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ka(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(n==="formAction"?(t!=="input"&&Ee(e,t,"name",c.name,c,null),Ee(e,t,"formEncType",c.formEncType,c,null),Ee(e,t,"formMethod",c.formMethod,c,null),Ee(e,t,"formTarget",c.formTarget,c,null)):(Ee(e,t,"encType",c.encType,c,null),Ee(e,t,"method",c.method,c,null),Ee(e,t,"target",c.target,c,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ka(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Us);break;case"onScroll":i!=null&&ge("scroll",e);break;case"onScrollEnd":i!=null&&ge("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(n=i.__html,n!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Ka(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":ge("beforetoggle",e),ge("toggle",e),Ha(e,"popover",i);break;case"xlinkActuate":Pt(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Pt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Pt(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Pt(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Pt(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Pt(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Pt(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Pt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Pt(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Ha(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Zp.get(n)||n,Ha(e,n,i))}}function Cr(e,t,n,i,c,f){switch(n){case"style":ao(e,i,f);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(n=i.__html,n!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=n}}break;case"children":typeof i=="string"?_l(e,i):(typeof i=="number"||typeof i=="bigint")&&_l(e,""+i);break;case"onScroll":i!=null&&ge("scroll",e);break;case"onScrollEnd":i!=null&&ge("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Us);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Zf.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(c=n.endsWith("Capture"),t=n.slice(2,c?n.length-7:void 0),f=e[rt]||null,f=f!=null?f[n]:null,typeof f=="function"&&e.removeEventListener(t,f,c),typeof i=="function")){typeof f!="function"&&f!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,c);break e}n in e?e[n]=i:i===!0?e.setAttribute(n,""):Ha(e,n,i)}}}function et(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ge("error",e),ge("load",e);var i=!1,c=!1,f;for(f in n)if(n.hasOwnProperty(f)){var g=n[f];if(g!=null)switch(f){case"src":i=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,t));default:Ee(e,t,f,g,n,null)}}c&&Ee(e,t,"srcSet",n.srcSet,n,null),i&&Ee(e,t,"src",n.src,n,null);return;case"input":ge("invalid",e);var y=f=g=c=null,v=null,x=null;for(i in n)if(n.hasOwnProperty(i)){var q=n[i];if(q!=null)switch(i){case"name":c=q;break;case"type":g=q;break;case"checked":v=q;break;case"defaultChecked":x=q;break;case"value":f=q;break;case"defaultValue":y=q;break;case"children":case"dangerouslySetInnerHTML":if(q!=null)throw Error(s(137,t));break;default:Ee(e,t,i,q,n,null)}}to(e,f,y,v,x,g,c,!1),Ya(e);return;case"select":ge("invalid",e),i=g=f=null;for(c in n)if(n.hasOwnProperty(c)&&(y=n[c],y!=null))switch(c){case"value":f=y;break;case"defaultValue":g=y;break;case"multiple":i=y;default:Ee(e,t,c,y,n,null)}t=f,n=g,e.multiple=!!i,t!=null?Nl(e,!!i,t,!1):n!=null&&Nl(e,!!i,n,!0);return;case"textarea":ge("invalid",e),f=c=i=null;for(g in n)if(n.hasOwnProperty(g)&&(y=n[g],y!=null))switch(g){case"value":i=y;break;case"defaultValue":c=y;break;case"children":f=y;break;case"dangerouslySetInnerHTML":if(y!=null)throw Error(s(91));break;default:Ee(e,t,g,y,n,null)}lo(e,i,c,f),Ya(e);return;case"option":for(v in n)if(n.hasOwnProperty(v)&&(i=n[v],i!=null))switch(v){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Ee(e,t,v,i,n,null)}return;case"dialog":ge("beforetoggle",e),ge("toggle",e),ge("cancel",e),ge("close",e);break;case"iframe":case"object":ge("load",e);break;case"video":case"audio":for(i=0;i<oa.length;i++)ge(oa[i],e);break;case"image":ge("error",e),ge("load",e);break;case"details":ge("toggle",e);break;case"embed":case"source":case"link":ge("error",e),ge("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(x in n)if(n.hasOwnProperty(x)&&(i=n[x],i!=null))switch(x){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,t));default:Ee(e,t,x,i,n,null)}return;default:if(Xu(t)){for(q in n)n.hasOwnProperty(q)&&(i=n[q],i!==void 0&&Cr(e,t,q,i,n,void 0));return}}for(y in n)n.hasOwnProperty(y)&&(i=n[y],i!=null&&Ee(e,t,y,i,n,null))}function b0(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,g=null,y=null,v=null,x=null,q=null;for(R in n){var $=n[R];if(n.hasOwnProperty(R)&&$!=null)switch(R){case"checked":break;case"value":break;case"defaultValue":v=$;default:i.hasOwnProperty(R)||Ee(e,t,R,null,i,$)}}for(var C in i){var R=i[C];if($=n[C],i.hasOwnProperty(C)&&(R!=null||$!=null))switch(C){case"type":f=R;break;case"name":c=R;break;case"checked":x=R;break;case"defaultChecked":q=R;break;case"value":g=R;break;case"defaultValue":y=R;break;case"children":case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(137,t));break;default:R!==$&&Ee(e,t,C,R,i,$)}}Vu(e,g,y,v,x,q,f,c);return;case"select":R=g=y=C=null;for(f in n)if(v=n[f],n.hasOwnProperty(f)&&v!=null)switch(f){case"value":break;case"multiple":R=v;default:i.hasOwnProperty(f)||Ee(e,t,f,null,i,v)}for(c in i)if(f=i[c],v=n[c],i.hasOwnProperty(c)&&(f!=null||v!=null))switch(c){case"value":C=f;break;case"defaultValue":y=f;break;case"multiple":g=f;default:f!==v&&Ee(e,t,c,f,i,v)}t=y,n=g,i=R,C!=null?Nl(e,!!n,C,!1):!!i!=!!n&&(t!=null?Nl(e,!!n,t,!0):Nl(e,!!n,n?[]:"",!1));return;case"textarea":R=C=null;for(y in n)if(c=n[y],n.hasOwnProperty(y)&&c!=null&&!i.hasOwnProperty(y))switch(y){case"value":break;case"children":break;default:Ee(e,t,y,null,i,c)}for(g in i)if(c=i[g],f=n[g],i.hasOwnProperty(g)&&(c!=null||f!=null))switch(g){case"value":C=c;break;case"defaultValue":R=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==f&&Ee(e,t,g,c,i,f)}no(e,C,R);return;case"option":for(var ue in n)if(C=n[ue],n.hasOwnProperty(ue)&&C!=null&&!i.hasOwnProperty(ue))switch(ue){case"selected":e.selected=!1;break;default:Ee(e,t,ue,null,i,C)}for(v in i)if(C=i[v],R=n[v],i.hasOwnProperty(v)&&C!==R&&(C!=null||R!=null))switch(v){case"selected":e.selected=C&&typeof C!="function"&&typeof C!="symbol";break;default:Ee(e,t,v,C,i,R)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var le in n)C=n[le],n.hasOwnProperty(le)&&C!=null&&!i.hasOwnProperty(le)&&Ee(e,t,le,null,i,C);for(x in i)if(C=i[x],R=n[x],i.hasOwnProperty(x)&&C!==R&&(C!=null||R!=null))switch(x){case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(s(137,t));break;default:Ee(e,t,x,C,i,R)}return;default:if(Xu(t)){for(var Ae in n)C=n[Ae],n.hasOwnProperty(Ae)&&C!==void 0&&!i.hasOwnProperty(Ae)&&Cr(e,t,Ae,void 0,i,C);for(q in i)C=i[q],R=n[q],!i.hasOwnProperty(q)||C===R||C===void 0&&R===void 0||Cr(e,t,q,C,i,R);return}}for(var _ in n)C=n[_],n.hasOwnProperty(_)&&C!=null&&!i.hasOwnProperty(_)&&Ee(e,t,_,null,i,C);for($ in i)C=i[$],R=n[$],!i.hasOwnProperty($)||C===R||C==null&&R==null||Ee(e,t,$,C,i,R)}var Rr=null,kr=null;function Bs(e){return e.nodeType===9?e:e.ownerDocument}function ag(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function sg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Lr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var zr=null;function S0(){var e=window.event;return e&&e.type==="popstate"?e===zr?!1:(zr=e,!0):(zr=null,!1)}var ug=typeof setTimeout=="function"?setTimeout:void 0,T0=typeof clearTimeout=="function"?clearTimeout:void 0,cg=typeof Promise=="function"?Promise:void 0,w0=typeof queueMicrotask=="function"?queueMicrotask:typeof cg<"u"?function(e){return cg.resolve(null).then(e).catch(E0)}:ug;function E0(e){setTimeout(function(){throw e})}function Bn(e){return e==="head"}function rg(e,t){var n=t,i=0,c=0;do{var f=n.nextSibling;if(e.removeChild(n),f&&f.nodeType===8)if(n=f.data,n==="/$"){if(0<i&&8>i){n=i;var g=e.ownerDocument;if(n&1&&da(g.documentElement),n&2&&da(g.body),n&4)for(n=g.head,da(n),g=n.firstChild;g;){var y=g.nextSibling,v=g.nodeName;g[Mi]||v==="SCRIPT"||v==="STYLE"||v==="LINK"&&g.rel.toLowerCase()==="stylesheet"||n.removeChild(g),g=y}}if(c===0){e.removeChild(f),Ta(t);return}c--}else n==="$"||n==="$?"||n==="$!"?c++:i=n.charCodeAt(0)-48;else i=0;n=f}while(n);Ta(t)}function Ur(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Ur(n),$u(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function A0(e,t,n,i){for(;e.nodeType===1;){var c=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Mi])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=Yt(e.nextSibling),e===null)break}return null}function O0(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Yt(e.nextSibling),e===null))return null;return e}function Br(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function N0(e,t){var n=e.ownerDocument;if(e.data!=="$?"||n.readyState==="complete")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var qr=null;function fg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}function og(e,t,n){switch(t=Bs(n),e){case"html":if(e=t.documentElement,!e)throw Error(s(452));return e;case"head":if(e=t.head,!e)throw Error(s(453));return e;case"body":if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function da(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);$u(e)}var Bt=new Map,hg=new Set;function qs(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var gn=Z.d;Z.d={f:_0,r:M0,D:x0,C:D0,L:C0,m:R0,X:L0,S:k0,M:z0};function _0(){var e=gn.f(),t=xs();return e||t}function M0(e){var t=wl(e);t!==null&&t.tag===5&&t.type==="form"?Rh(t):gn.r(e)}var ni=typeof document>"u"?null:document;function dg(e,t,n){var i=ni;if(i&&typeof t=="string"&&t){var c=Dt(t);c='link[rel="'+e+'"][href="'+c+'"]',typeof n=="string"&&(c+='[crossorigin="'+n+'"]'),hg.has(c)||(hg.add(c),e={rel:e,crossOrigin:n,href:t},i.querySelector(c)===null&&(t=i.createElement("link"),et(t,"link",e),Ze(t),i.head.appendChild(t)))}}function x0(e){gn.D(e),dg("dns-prefetch",e,null)}function D0(e,t){gn.C(e,t),dg("preconnect",e,t)}function C0(e,t,n){gn.L(e,t,n);var i=ni;if(i&&e&&t){var c='link[rel="preload"][as="'+Dt(t)+'"]';t==="image"&&n&&n.imageSrcSet?(c+='[imagesrcset="'+Dt(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(c+='[imagesizes="'+Dt(n.imageSizes)+'"]')):c+='[href="'+Dt(e)+'"]';var f=c;switch(t){case"style":f=li(e);break;case"script":f=ii(e)}Bt.has(f)||(e=b({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Bt.set(f,e),i.querySelector(c)!==null||t==="style"&&i.querySelector(ga(f))||t==="script"&&i.querySelector(ma(f))||(t=i.createElement("link"),et(t,"link",e),Ze(t),i.head.appendChild(t)))}}function R0(e,t){gn.m(e,t);var n=ni;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",c='link[rel="modulepreload"][as="'+Dt(i)+'"][href="'+Dt(e)+'"]',f=c;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=ii(e)}if(!Bt.has(f)&&(e=b({rel:"modulepreload",href:e},t),Bt.set(f,e),n.querySelector(c)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(ma(f)))return}i=n.createElement("link"),et(i,"link",e),Ze(i),n.head.appendChild(i)}}}function k0(e,t,n){gn.S(e,t,n);var i=ni;if(i&&e){var c=El(i).hoistableStyles,f=li(e);t=t||"default";var g=c.get(f);if(!g){var y={loading:0,preload:null};if(g=i.querySelector(ga(f)))y.loading=5;else{e=b({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Bt.get(f))&&jr(e,n);var v=g=i.createElement("link");Ze(v),et(v,"link",e),v._p=new Promise(function(x,q){v.onload=x,v.onerror=q}),v.addEventListener("load",function(){y.loading|=1}),v.addEventListener("error",function(){y.loading|=2}),y.loading|=4,js(g,t,i)}g={type:"stylesheet",instance:g,count:1,state:y},c.set(f,g)}}}function L0(e,t){gn.X(e,t);var n=ni;if(n&&e){var i=El(n).hoistableScripts,c=ii(e),f=i.get(c);f||(f=n.querySelector(ma(c)),f||(e=b({src:e,async:!0},t),(t=Bt.get(c))&&Hr(e,t),f=n.createElement("script"),Ze(f),et(f,"link",e),n.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(c,f))}}function z0(e,t){gn.M(e,t);var n=ni;if(n&&e){var i=El(n).hoistableScripts,c=ii(e),f=i.get(c);f||(f=n.querySelector(ma(c)),f||(e=b({src:e,async:!0,type:"module"},t),(t=Bt.get(c))&&Hr(e,t),f=n.createElement("script"),Ze(f),et(f,"link",e),n.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(c,f))}}function gg(e,t,n,i){var c=(c=ce.current)?qs(c):null;if(!c)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=li(n.href),n=El(c).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=li(n.href);var f=El(c).hoistableStyles,g=f.get(e);if(g||(c=c.ownerDocument||c,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,g),(f=c.querySelector(ga(e)))&&!f._p&&(g.instance=f,g.state.loading=5),Bt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Bt.set(e,n),f||U0(c,e,n,g.state))),t&&i===null)throw Error(s(528,""));return g}if(t&&i!==null)throw Error(s(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=ii(n),n=El(c).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function li(e){return'href="'+Dt(e)+'"'}function ga(e){return'link[rel="stylesheet"]['+e+"]"}function mg(e){return b({},e,{"data-precedence":e.precedence,precedence:null})}function U0(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),et(t,"link",n),Ze(t),e.head.appendChild(t))}function ii(e){return'[src="'+Dt(e)+'"]'}function ma(e){return"script[async]"+e}function pg(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Dt(n.href)+'"]');if(i)return t.instance=i,Ze(i),i;var c=b({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Ze(i),et(i,"style",c),js(i,n.precedence,e),t.instance=i;case"stylesheet":c=li(n.href);var f=e.querySelector(ga(c));if(f)return t.state.loading|=4,t.instance=f,Ze(f),f;i=mg(n),(c=Bt.get(c))&&jr(i,c),f=(e.ownerDocument||e).createElement("link"),Ze(f);var g=f;return g._p=new Promise(function(y,v){g.onload=y,g.onerror=v}),et(f,"link",i),t.state.loading|=4,js(f,n.precedence,e),t.instance=f;case"script":return f=ii(n.src),(c=e.querySelector(ma(f)))?(t.instance=c,Ze(c),c):(i=n,(c=Bt.get(f))&&(i=b({},n),Hr(i,c)),e=e.ownerDocument||e,c=e.createElement("script"),Ze(c),et(c,"link",i),e.head.appendChild(c),t.instance=c);case"void":return null;default:throw Error(s(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,js(i,n.precedence,e));return t.instance}function js(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=i.length?i[i.length-1]:null,f=c,g=0;g<i.length;g++){var y=i[g];if(y.dataset.precedence===t)f=y;else if(f!==c)break}f?f.parentNode.insertBefore(e,f.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function jr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Hr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Hs=null;function yg(e,t,n){if(Hs===null){var i=new Map,c=Hs=new Map;c.set(n,i)}else c=Hs,i=c.get(n),i||(i=new Map,c.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),c=0;c<n.length;c++){var f=n[c];if(!(f[Mi]||f[nt]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var g=f.getAttribute(t)||"";g=e+g;var y=i.get(g);y?y.push(f):i.set(g,[f])}}return i}function vg(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function B0(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function bg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var pa=null;function q0(){}function j0(e,t,n){if(pa===null)throw Error(s(475));var i=pa;if(t.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var c=li(n.href),f=e.querySelector(ga(c));if(f){e=f._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(i.count++,i=$s.bind(i),e.then(i,i)),t.state.loading|=4,t.instance=f,Ze(f);return}f=e.ownerDocument||e,n=mg(n),(c=Bt.get(c))&&jr(n,c),f=f.createElement("link"),Ze(f);var g=f;g._p=new Promise(function(y,v){g.onload=y,g.onerror=v}),et(f,"link",n),t.instance=f}i.stylesheets===null&&(i.stylesheets=new Map),i.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(i.count++,t=$s.bind(i),e.addEventListener("load",t),e.addEventListener("error",t))}}function H0(){if(pa===null)throw Error(s(475));var e=pa;return e.stylesheets&&e.count===0&&$r(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&$r(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}function $s(){if(this.count--,this.count===0){if(this.stylesheets)$r(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ys=null;function $r(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ys=new Map,t.forEach($0,e),Ys=null,$s.call(e))}function $0(e,t){if(!(t.state.loading&4)){var n=Ys.get(e);if(n)var i=n.get(null);else{n=new Map,Ys.set(e,n);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var g=c[f];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(n.set(g.dataset.precedence,g),i=g)}i&&n.set(null,i)}c=t.instance,g=c.getAttribute("data-precedence"),f=n.get(g)||i,f===i&&n.set(null,c),n.set(g,c),this.count++,i=$s.bind(this),c.addEventListener("load",i),c.addEventListener("error",i),f?f.parentNode.insertBefore(c,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),t.state.loading|=4}}var ya={$$typeof:H,Provider:null,Consumer:null,_currentValue:ae,_currentValue2:ae,_threadCount:0};function Y0(e,t,n,i,c,f,g,y){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Bu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bu(0),this.hiddenUpdates=Bu(null),this.identifierPrefix=i,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=y,this.incompleteTransitions=new Map}function Sg(e,t,n,i,c,f,g,y,v,x,q,$){return e=new Y0(e,t,n,g,y,v,x,$),t=1,f===!0&&(t|=24),f=Tt(3,null,null,t),e.current=f,f.stateNode=e,t=wc(),t.refCount++,e.pooledCache=t,t.refCount++,f.memoizedState={element:i,isDehydrated:n,cache:t},Nc(f),e}function Tg(e){return e?(e=zl,e):zl}function wg(e,t,n,i,c,f){c=Tg(c),i.context===null?i.context=c:i.pendingContext=c,i=An(t),i.payload={element:n},f=f===void 0?null:f,f!==null&&(i.callback=f),n=On(e,i,t),n!==null&&(Nt(n,e,t),Xi(n,e,t))}function Eg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Yr(e,t){Eg(e,t),(e=e.alternate)&&Eg(e,t)}function Ag(e){if(e.tag===13){var t=Ll(e,67108864);t!==null&&Nt(t,e,67108864),Yr(e,67108864)}}var Gs=!0;function G0(e,t,n,i){var c=B.T;B.T=null;var f=Z.p;try{Z.p=2,Gr(e,t,n,i)}finally{Z.p=f,B.T=c}}function K0(e,t,n,i){var c=B.T;B.T=null;var f=Z.p;try{Z.p=8,Gr(e,t,n,i)}finally{Z.p=f,B.T=c}}function Gr(e,t,n,i){if(Gs){var c=Kr(i);if(c===null)Dr(e,t,i,Ks,n),Ng(e,i);else if(Q0(c,e,t,n,i))i.stopPropagation();else if(Ng(e,i),t&4&&-1<V0.indexOf(e)){for(;c!==null;){var f=wl(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var g=Xn(f.pendingLanes);if(g!==0){var y=f;for(y.pendingLanes|=2,y.entangledLanes|=2;g;){var v=1<<31-bt(g);y.entanglements[1]|=v,g&=~v}Wt(f),(Se&6)===0&&(_s=Vt()+500,fa(0))}}break;case 13:y=Ll(f,2),y!==null&&Nt(y,f,2),xs(),Yr(f,2)}if(f=Kr(i),f===null&&Dr(e,t,i,Ks,n),f===c)break;c=f}c!==null&&i.stopPropagation()}else Dr(e,t,i,null,n)}}function Kr(e){return e=Ju(e),Vr(e)}var Ks=null;function Vr(e){if(Ks=null,e=Tl(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=h(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ks=e,null}function Og(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Dp()){case qf:return 2;case jf:return 8;case Ua:case Cp:return 32;case Hf:return 268435456;default:return 32}default:return 32}}var Qr=!1,qn=null,jn=null,Hn=null,va=new Map,ba=new Map,$n=[],V0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ng(e,t){switch(e){case"focusin":case"focusout":qn=null;break;case"dragenter":case"dragleave":jn=null;break;case"mouseover":case"mouseout":Hn=null;break;case"pointerover":case"pointerout":va.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ba.delete(t.pointerId)}}function Sa(e,t,n,i,c,f){return e===null||e.nativeEvent!==f?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:f,targetContainers:[c]},t!==null&&(t=wl(t),t!==null&&Ag(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,c!==null&&t.indexOf(c)===-1&&t.push(c),e)}function Q0(e,t,n,i,c){switch(t){case"focusin":return qn=Sa(qn,e,t,n,i,c),!0;case"dragenter":return jn=Sa(jn,e,t,n,i,c),!0;case"mouseover":return Hn=Sa(Hn,e,t,n,i,c),!0;case"pointerover":var f=c.pointerId;return va.set(f,Sa(va.get(f)||null,e,t,n,i,c)),!0;case"gotpointercapture":return f=c.pointerId,ba.set(f,Sa(ba.get(f)||null,e,t,n,i,c)),!0}return!1}function _g(e){var t=Tl(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=h(n),t!==null){e.blockedOn=t,jp(e.priority,function(){if(n.tag===13){var i=Ot();i=qu(i);var c=Ll(n,i);c!==null&&Nt(c,n,i),Yr(n,i)}});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Kr(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Zu=i,n.target.dispatchEvent(i),Zu=null}else return t=wl(n),t!==null&&Ag(t),e.blockedOn=n,!1;t.shift()}return!0}function Mg(e,t,n){Vs(e)&&n.delete(t)}function X0(){Qr=!1,qn!==null&&Vs(qn)&&(qn=null),jn!==null&&Vs(jn)&&(jn=null),Hn!==null&&Vs(Hn)&&(Hn=null),va.forEach(Mg),ba.forEach(Mg)}function Qs(e,t){e.blockedOn===t&&(e.blockedOn=null,Qr||(Qr=!0,u.unstable_scheduleCallback(u.unstable_NormalPriority,X0)))}var Xs=null;function xg(e){Xs!==e&&(Xs=e,u.unstable_scheduleCallback(u.unstable_NormalPriority,function(){Xs===e&&(Xs=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],c=e[t+2];if(typeof i!="function"){if(Vr(i||n)===null)continue;break}var f=wl(n);f!==null&&(e.splice(t,3),t-=3,Vc(f,{pending:!0,data:c,method:n.method,action:i},i,c))}}))}function Ta(e){function t(v){return Qs(v,e)}qn!==null&&Qs(qn,e),jn!==null&&Qs(jn,e),Hn!==null&&Qs(Hn,e),va.forEach(t),ba.forEach(t);for(var n=0;n<$n.length;n++){var i=$n[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<$n.length&&(n=$n[0],n.blockedOn===null);)_g(n),n.blockedOn===null&&$n.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var c=n[i],f=n[i+1],g=c[rt]||null;if(typeof f=="function")g||xg(n);else if(g){var y=null;if(f&&f.hasAttribute("formAction")){if(c=f,g=f[rt]||null)y=g.formAction;else if(Vr(c)!==null)continue}else y=g.action;typeof y=="function"?n[i+1]=y:(n.splice(i,3),i-=3),xg(n)}}}function Xr(e){this._internalRoot=e}Zs.prototype.render=Xr.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current,i=Ot();wg(n,i,e,t,null,null)},Zs.prototype.unmount=Xr.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;wg(e.current,2,null,e,null,null),xs(),t[Sl]=null}};function Zs(e){this._internalRoot=e}Zs.prototype.unstable_scheduleHydration=function(e){if(e){var t=Vf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<$n.length&&t!==0&&t<$n[n].priority;n++);$n.splice(n,0,e),n===0&&_g(e)}};var Dg=l.version;if(Dg!=="19.1.1")throw Error(s(527,Dg,"19.1.1"));Z.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=m(t),e=e!==null?p(e):null,e=e===null?null:e.stateNode,e};var Z0={bundleType:0,version:"19.1.1",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.1.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Js=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Js.isDisabled&&Js.supportsFiber)try{Oi=Js.inject(Z0),vt=Js}catch{}}return Ea.createRoot=function(e,t){if(!r(e))throw Error(s(299));var n=!1,i="",c=Qh,f=Xh,g=Zh,y=null;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(f=t.onCaughtError),t.onRecoverableError!==void 0&&(g=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(y=t.unstable_transitionCallbacks)),t=Sg(e,1,!1,null,null,n,i,c,f,g,y,null),e[Sl]=t.current,xr(e),new Xr(t)},Ea.hydrateRoot=function(e,t,n){if(!r(e))throw Error(s(299));var i=!1,c="",f=Qh,g=Xh,y=Zh,v=null,x=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(c=n.identifierPrefix),n.onUncaughtError!==void 0&&(f=n.onUncaughtError),n.onCaughtError!==void 0&&(g=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError),n.unstable_transitionCallbacks!==void 0&&(v=n.unstable_transitionCallbacks),n.formState!==void 0&&(x=n.formState)),t=Sg(e,1,!0,t,n??null,i,c,f,g,y,v,x),t.context=Tg(null),n=t.current,i=Ot(),i=qu(i),c=An(i),c.callback=null,On(n,c,i),n=i,t.current.lanes=n,_i(t,n),Wt(t),e[Sl]=t.current,xr(e),new Zs(t)},Ea.version="19.1.1",Ea}var Yg;function h1(){if(Yg)return Wr.exports;Yg=1;function u(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u)}catch(l){console.error(l)}}return u(),Wr.exports=o1(),Wr.exports}var d1=h1();
window.React=me;window.ReactDOM=d1;window.__ReactDOMPortals=f1();
})();

;(function(){'use strict';
var modules={"src/App.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = __importDefault(require("react"));
const AppContext_1 = require("./state/AppContext");
const Shell_1 = require("./components/Shell");
const Overview_1 = __importDefault(require("./pages/Overview"));
const MarketData_1 = __importDefault(require("./pages/MarketData"));
const Features_1 = __importDefault(require("./pages/Features"));
const Regimes_1 = __importDefault(require("./pages/Regimes"));
const Alerts_1 = __importStar(require("./pages/Alerts"));
const Quality_1 = __importDefault(require("./pages/Quality"));
const Lineage_1 = __importDefault(require("./pages/Lineage"));
const System_1 = __importDefault(require("./pages/System"));
const Api_1 = __importDefault(require("./pages/Api"));
const Settings_1 = __importStar(require("./pages/Settings"));
const storage_1 = require("./lib/storage");
const PAGES = { overview: Overview_1.default, data: MarketData_1.default, features: Features_1.default, regimes: Regimes_1.default, alerts: Alerts_1.default, quality: Quality_1.default, lineage: Lineage_1.default, system: System_1.default, api: Api_1.default, settings: Settings_1.default };
class ErrorBoundary extends react_1.default.Component {
    state = { error: null };
    static getDerivedStateFromError(error) { return { error: error.message }; }
    render() { if (this.state.error)
        return react_1.default.createElement("div", { className: "error-page" },
            react_1.default.createElement("h1", null, "\u5DE5\u4F5C\u533A\u6682\u65F6\u65E0\u6CD5\u663E\u793A"),
            react_1.default.createElement("p", null, "\u53EF\u80FD\u662F\u65E7\u7684\u6D4F\u89C8\u5668\u6F14\u793A\u72B6\u6001\u4E0E\u5F53\u524D\u7248\u672C\u4E0D\u517C\u5BB9\u3002"),
            react_1.default.createElement("pre", null, this.state.error),
            react_1.default.createElement("button", { type: "button", onClick: () => { try {
                    localStorage.removeItem(storage_1.STORAGE_KEY);
                }
                catch { } location.reload(); } }, "\u91CD\u7F6E\u6F14\u793A\u72B6\u6001\u5E76\u91CD\u65B0\u8F7D\u5165")); return this.props.children; }
}
function Workspace() { const { user, route, activeAlert } = (0, AppContext_1.useApp)(); if (!user)
    return react_1.default.createElement(Settings_1.Login, null); const Page = PAGES[route]; return react_1.default.createElement(Shell_1.Shell, null,
    react_1.default.createElement(Page, null),
    activeAlert && react_1.default.createElement(Alerts_1.AlertDetail, { key: activeAlert })); }
function App() { return react_1.default.createElement(ErrorBoundary, null,
    react_1.default.createElement(AppContext_1.AppProvider, null,
        react_1.default.createElement(Workspace, null))); }

},
"src/components/charts.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHART_COLORS = void 0;
exports.Sparkline = Sparkline;
exports.TimeChart = TimeChart;
exports.Heatmap = Heatmap;
exports.CorrelationMatrix = CorrelationMatrix;
exports.RegimeLegend = RegimeLegend;
exports.Scatter = Scatter;
const react_1 = __importStar(require("react"));
const analytics_1 = require("../lib/analytics");
const ui_1 = require("./ui");
exports.CHART_COLORS = ['#13805c', '#3574bb', '#bb8b1c', '#8967b5', '#c46540', '#238f9b'];
function Sparkline({ values, positive = true, color, height = 35 }) { const min = Math.min(...values), max = Math.max(...values); const points = values.map((v, i) => `${i / Math.max(1, values.length - 1) * 100},${height - 4 - (v - min) / (max - min || 1) * (height - 8)}`).join(' '); return react_1.default.createElement("svg", { className: "sparkline", viewBox: `0 0 100 ${height}`, height: height, "aria-hidden": "true" },
    react_1.default.createElement("polyline", { points: points, stroke: color || (positive ? 'var(--positive)' : 'var(--negative)'), fill: "none", strokeWidth: "1.7", strokeLinejoin: "round", strokeLinecap: "round" })); }
function TimeChart({ labels, series, height = 248, unit = '%', area = true, zero = false, compact = false }) {
    const outer = (0, react_1.useRef)(null);
    const [width, setWidth] = (0, react_1.useState)(720), [hover, setHover] = (0, react_1.useState)(null);
    const gid = (0, react_1.useId)().replace(/:/g, '');
    (0, react_1.useEffect)(() => { const el = outer.current; if (!el)
        return; const ro = new ResizeObserver(() => setWidth(Math.max(200, el.clientWidth))); ro.observe(el); return () => ro.disconnect(); }, []);
    const vals = series.flatMap(s => s.values).filter(Number.isFinite);
    if (!labels.length || !vals.length)
        return react_1.default.createElement(ui_1.Empty, { title: "\u6240\u9009\u533A\u95F4\u6CA1\u6709\u6570\u636E", description: "\u9009\u62E9\u81F3\u5C11\u5305\u542B\u4E24\u4E2A\u5DE5\u4F5C\u65E5\u7684\u65F6\u95F4\u8303\u56F4\u3002" });
    const left = compact ? 34 : 50, right = 18, top = 18, bottom = 28, w = width - left - right, h = height - top - bottom;
    let min = Math.min(...vals, ...(zero ? [0] : [])), max = Math.max(...vals, ...(zero ? [0] : []));
    const pad = (max - min || 2) * 0.14;
    min -= pad;
    max += pad;
    const x = (i) => left + i / Math.max(1, labels.length - 1) * w;
    const y = (v) => top + (max - v) / (max - min || 1) * h;
    const lines = series.map((s, k) => ({ ...s, color: s.color || exports.CHART_COLORS[k % exports.CHART_COLORS.length], path: s.values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(' ') }));
    const pointer = (e) => { const rect = e.currentTarget.getBoundingClientRect(); setHover(Math.max(0, Math.min(labels.length - 1, Math.round(((e.clientX - rect.left) / rect.width * width - left) / w * (labels.length - 1))))); };
    return react_1.default.createElement("div", { ref: outer, className: "time-chart", style: { height } },
        react_1.default.createElement("svg", { width: "100%", height: height, viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `${series.map(s => s.name).join('、')}时间序列图；左右方向键查看数据`, tabIndex: 0, onKeyDown: e => { if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                setHover(i => Math.max(0, Math.min(labels.length - 1, (i ?? 0) + (e.key === 'ArrowRight' ? 1 : -1))));
            } }, onPointerMove: pointer, onPointerLeave: () => setHover(null) },
            react_1.default.createElement("defs", null,
                react_1.default.createElement("linearGradient", { id: gid, x1: "0", y1: "0", x2: "0", y2: "1" },
                    react_1.default.createElement("stop", { offset: "0%", stopColor: lines[0]?.color, stopOpacity: "0.08" }),
                    react_1.default.createElement("stop", { offset: "100%", stopColor: lines[0]?.color, stopOpacity: "0" }))),
            Array.from({ length: 5 }, (_, i) => { const v = min + (max - min) * i / 4; return react_1.default.createElement("g", { key: i },
                react_1.default.createElement("line", { x1: left, y1: y(v), x2: width - right, y2: y(v), stroke: "var(--grid)", strokeDasharray: "3 4" }),
                react_1.default.createElement("text", { x: left - 9, y: y(v) + 4, textAnchor: "end", className: "axis-label" },
                    (0, analytics_1.number)(v, Math.abs(v) > 100 ? 0 : 1),
                    unit === '%' ? '%' : '')); }),
            area && lines[0] && react_1.default.createElement("path", { d: `${lines[0].path} L${x(labels.length - 1)} ${top + h} L${left} ${top + h} Z`, fill: `url(#${gid})` }),
            lines.map(s => react_1.default.createElement("path", { key: s.name, d: s.path, fill: "none", stroke: s.color, strokeWidth: "2.2", strokeLinejoin: "round", strokeLinecap: "round" })),
            Array.from({ length: Math.min(width < 430 ? 4 : 6, labels.length) }, (_, i) => i).map((_, i, all) => { const j = Math.round(i / Math.max(1, all.length - 1) * (labels.length - 1)); return react_1.default.createElement("text", { key: i, x: x(j), y: height - 4, textAnchor: i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle', className: "axis-label" }, labels[j]?.slice(5)); }),
            hover !== null && react_1.default.createElement("g", null,
                react_1.default.createElement("line", { x1: x(hover), x2: x(hover), y1: top, y2: top + h, stroke: "#9caeae", strokeDasharray: "4 3" }),
                lines.map(s => Number.isFinite(s.values[hover]) && react_1.default.createElement("circle", { key: s.name, cx: x(hover), cy: y(s.values[hover]), r: "4", fill: s.color, stroke: "white", strokeWidth: "2" })))),
        hover !== null && react_1.default.createElement("div", { className: "chart-tooltip", style: { left: Math.min(Math.max(0, x(hover) + 15), width - 178), top: 22 } },
            react_1.default.createElement("strong", null, labels[hover]),
            lines.map(s => react_1.default.createElement("div", { key: s.name },
                react_1.default.createElement("span", null,
                    react_1.default.createElement("i", { style: { background: s.color } }),
                    s.name),
                react_1.default.createElement("b", null,
                    (0, analytics_1.number)(s.values[hover] ?? 0, 2),
                    unit)))));
}
function Heatmap({ assets, from, to, onSelect, small = false }) {
    const dates = assets[0] ? (0, analytics_1.sliceDates)(assets[0].prices, from, to).map(p => p.date) : [];
    const cols = Math.min(small ? 16 : 24, dates.length);
    if (!cols || !assets.length)
        return react_1.default.createElement(ui_1.Empty, null);
    const idx = Array.from({ length: cols }, (_, i) => Math.floor(i / Math.max(1, cols - 1) * (dates.length - 1)));
    return react_1.default.createElement("div", { className: "heatmap-scroll" },
        react_1.default.createElement("div", { className: `regime-heatmap ${small ? 'heatmap-small' : ''}`, style: { gridTemplateColumns: `110px repeat(${cols}, minmax(${small ? 10 : 18}px, 1fr))` } },
            react_1.default.createElement("span", { className: "heatmap-corner" }, "\u8D44\u4EA7 / \u65E5\u671F"),
            idx.map((j, i) => react_1.default.createElement("span", { key: i, className: "heatmap-date" }, i % (small ? 5 : 4) === 0 || i === cols - 1 ? dates[j].slice(5) : '')),
            assets.map(asset => react_1.default.createElement(react_1.default.Fragment, { key: asset.id },
                react_1.default.createElement("span", { className: "heatmap-rowlabel" }, asset.name),
                idx.map((j, i) => { const { regime, confidence } = (0, analytics_1.sampleRegime)(asset.prices.filter(p => p.date <= dates[j])); return react_1.default.createElement("button", { type: "button", key: i, "aria-label": `${asset.name} ${dates[j]} ${analytics_1.REGIMES[regime].label}`, title: `${asset.name} · ${dates[j]}\n${analytics_1.REGIMES[regime].label} · ${confidence.toFixed(1)}%`, className: `heat-cell heat-${regime}`, onClick: () => onSelect(asset, dates[j]) }); })))));
}
function CorrelationMatrix({ assets, from, to, onSelect }) { const rs = assets.map(a => (0, analytics_1.returns)((0, analytics_1.sliceDates)(a.prices, from, to))); return react_1.default.createElement("div", { className: "matrix-wrap" },
    react_1.default.createElement("table", { className: "matrix" },
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null),
                " ",
                assets.map(a => react_1.default.createElement("th", { key: a.id }, a.name.replace(' / ', '/'))))),
        react_1.default.createElement("tbody", null, assets.map((a, i) => react_1.default.createElement("tr", { key: a.id },
            react_1.default.createElement("th", null, a.name),
            assets.map((b, j) => { const value = i === j ? 1 : (0, analytics_1.correlation)(rs[i], rs[j]); return react_1.default.createElement("td", { key: b.id },
                react_1.default.createElement("button", { type: "button", onClick: () => onSelect?.(a, b, value), title: `${a.name} / ${b.name}：${(0, analytics_1.number)(value)}`, style: { background: value > 0 ? `rgba(29, 139, 121, ${0.08 + value * .73})` : `rgba(201, 112, 126, ${0.08 + Math.abs(value) * .66})`, color: Math.abs(value) > .58 ? 'white' : 'var(--ink)' } }, (0, analytics_1.number)(value))); })))))); }
function RegimeLegend() { return react_1.default.createElement("div", { className: "legend" }, Object.keys(analytics_1.REGIMES).map(r => react_1.default.createElement("span", { key: r },
    react_1.default.createElement("i", { style: { background: analytics_1.REGIMES[r].color } }),
    analytics_1.REGIMES[r].label))); }
function Scatter({ points, xLabel, yLabel }) {
    const maxX = Math.max(1, ...points.map(p => Math.abs(p.x))) * 1.1, maxY = Math.max(1, ...points.map(p => Math.abs(p.y))) * 1.1;
    return react_1.default.createElement("svg", { viewBox: "0 0 740 350", className: "scatter", role: "img", "aria-label": "PCA\u4E8C\u7EF4\u6563\u70B9\u56FE\uFF0C\u989C\u8272\u4E3A\u5408\u6210\u72B6\u6001\u6807\u7B7E" },
        react_1.default.createElement("rect", { x: "58", y: "18", width: "648", height: "285", fill: "var(--surface-soft)", rx: "8" }),
        [-2, -1, 0, 1, 2].map(i => react_1.default.createElement("g", { key: i },
            react_1.default.createElement("line", { x1: "58", x2: "706", y1: 160 - i * 60, y2: 160 - i * 60, stroke: "var(--grid)", strokeDasharray: "4 4" }),
            react_1.default.createElement("line", { y1: "18", y2: "303", x1: 382 + i * 130, x2: 382 + i * 130, stroke: "var(--grid)", strokeDasharray: "4 4" }))),
        points.map((p, i) => react_1.default.createElement("circle", { key: i, cx: 382 + p.x / maxX * 305, cy: 160 - p.y / maxY * 130, r: "4.5", fill: analytics_1.REGIMES[p.regime].color, opacity: ".67" },
            react_1.default.createElement("title", null,
                p.label,
                " \u00B7 ",
                analytics_1.REGIMES[p.regime].label,
                " \u00B7 (",
                (0, analytics_1.number)(p.x),
                ", ",
                (0, analytics_1.number)(p.y),
                ")"))),
        react_1.default.createElement("text", { x: "382", y: "338", textAnchor: "middle", className: "axis-label" }, xLabel),
        react_1.default.createElement("text", { transform: "translate(20 165) rotate(-90)", textAnchor: "middle", className: "axis-label" }, yLabel));
}

},
"src/components/DateRange.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = DateRange;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const mock_1 = require("../data/mock");
const analytics_1 = require("../lib/analytics");
const ui_1 = require("./ui");
function DateRange() {
    const { from, to, setRange } = (0, AppContext_1.useApp)();
    const [open, setOpen] = (0, react_1.useState)(false), [a, setA] = (0, react_1.useState)(from), [b, setB] = (0, react_1.useState)(to);
    const presets = [['1M', 30], ['3M', 90], ['6M', 180], ['1Y', 365]];
    const error = !a || !b ? '请选择起止日期' : a > b ? '开始日期不能晚于结束日期' : a < mock_1.DATES[0] || b > mock_1.SNAPSHOT ? `可用样本范围：${mock_1.DATES[0]} 至 ${mock_1.SNAPSHOT}` : '';
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "date-range" },
            react_1.default.createElement("div", { className: "segments" }, presets.map(([label, n]) => react_1.default.createElement("button", { type: "button", key: label, onClick: () => setRange((0, analytics_1.daysBefore)(mock_1.SNAPSHOT, n) < mock_1.DATES[0] ? mock_1.DATES[0] : (0, analytics_1.daysBefore)(mock_1.SNAPSHOT, n), mock_1.SNAPSHOT), className: to === mock_1.SNAPSHOT && from === ((0, analytics_1.daysBefore)(mock_1.SNAPSHOT, n) < mock_1.DATES[0] ? mock_1.DATES[0] : (0, analytics_1.daysBefore)(mock_1.SNAPSHOT, n)) ? 'active' : '' }, label))),
            react_1.default.createElement(ui_1.Button, { icon: "calendar", onClick: () => { setA(from); setB(to); setOpen(true); }, className: "date-button" },
                from.slice(5),
                " \u2014 ",
                to.slice(5))),
        open && react_1.default.createElement(ui_1.Modal, { title: "\u9009\u62E9\u7814\u7A76\u533A\u95F4", onClose: () => setOpen(false), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setOpen(false) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !!error, onClick: () => { setRange(a, b); setOpen(false); } }, "\u5E94\u7528\u65E5\u671F\u8303\u56F4")) },
            react_1.default.createElement("div", { className: "form-grid" },
                react_1.default.createElement(ui_1.Field, { label: "\u5F00\u59CB\u65E5\u671F" },
                    react_1.default.createElement("input", { type: "date", min: mock_1.DATES[0], max: mock_1.SNAPSHOT, value: a, onChange: e => setA(e.target.value) })),
                react_1.default.createElement(ui_1.Field, { label: "\u7ED3\u675F\u65E5\u671F" },
                    react_1.default.createElement("input", { type: "date", min: mock_1.DATES[0], max: mock_1.SNAPSHOT, value: b, onChange: e => setB(e.target.value) }))),
            error && react_1.default.createElement(ui_1.Notice, { tone: "warning" }, error),
            react_1.default.createElement("p", { className: "muted small" }, "\u65E5\u671F\u8303\u56F4\u5F71\u54CD\u8D70\u52BF\u56FE\u3001\u7279\u5F81\u5206\u6790\u4E0E\u76F8\u5173\u6027\u8BA1\u7B97\u3002\u6837\u672C\u4F7F\u7528\u5DE5\u4F5C\u65E5\u5408\u6210\u5E8F\u5217\uFF0C\u5E76\u975E\u771F\u5B9E\u4EA4\u6613\u6240\u65E5\u5386\u3002")));
}

},
"src/components/Icon.tsx":function(module,exports,require){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = Icon;
exports.Brand = Brand;
const react_1 = __importDefault(require("react"));
const paths = {
    grid: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1.5" }),
        react_1.default.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1.5" }),
        react_1.default.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1.5" }),
        react_1.default.createElement("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1.5" })),
    database: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("ellipse", { cx: "12", cy: "5", rx: "8", ry: "3" }),
        react_1.default.createElement("path", { d: "M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7" })),
    chart: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M4 3v17h17M7 14l4-5 4 3 6-8" })),
    spark: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z" })),
    activity: react_1.default.createElement("path", { d: "M2 12h5l3-8 4 16 3-8h5" }),
    bell: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" })),
    shield: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" }),
        react_1.default.createElement("path", { d: "m8 12 3 3 5-6" })),
    branch: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: "8", y: "2", width: "8", height: "6", rx: "1" }),
        react_1.default.createElement("rect", { x: "2", y: "16", width: "7", height: "6", rx: "1" }),
        react_1.default.createElement("rect", { x: "15", y: "16", width: "7", height: "6", rx: "1" }),
        react_1.default.createElement("path", { d: "M12 8v4H5v4m7-4h7v4" })),
    server: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: "3", y: "3", width: "18", height: "7", rx: "2" }),
        react_1.default.createElement("rect", { x: "3", y: "14", width: "18", height: "7", rx: "2" }),
        react_1.default.createElement("path", { d: "M7 6.5h.01M7 17.5h.01M12 6.5h5M12 17.5h5" })),
    code: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" })),
    settings: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M4 7h16M4 17h16" }),
        react_1.default.createElement("circle", { cx: "9", cy: "7", r: "3", fill: "currentColor", stroke: "none" }),
        react_1.default.createElement("circle", { cx: "15", cy: "17", r: "3", fill: "currentColor", stroke: "none" })),
    search: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("circle", { cx: "10.5", cy: "10.5", r: "7" }),
        react_1.default.createElement("path", { d: "m16 16 5 5" })),
    arrow: react_1.default.createElement("path", { d: "M5 12h14m-6-6 6 6-6 6" }), chevron: react_1.default.createElement("path", { d: "m9 5 7 7-7 7" }), down: react_1.default.createElement("path", { d: "m6 9 6 6 6-6" }),
    close: react_1.default.createElement("path", { d: "m6 6 12 12M6 18 18 6" }), plus: react_1.default.createElement("path", { d: "M12 5v14M5 12h14" }), minus: react_1.default.createElement("path", { d: "M5 12h14" }),
    refresh: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M20 7v5h-5M4 17v-5h5" }),
        react_1.default.createElement("path", { d: "M5 8a8 8 0 0 1 13-3l2 3M4 16l2 3a8 8 0 0 0 13-3" })),
    download: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" })),
    upload: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5" })),
    calendar: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
        react_1.default.createElement("path", { d: "M7 2v6M17 2v6M3 11h18" })),
    filter: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M3 5h18l-7 8v7l-4-2v-5L3 5Z" })),
    check: react_1.default.createElement("path", { d: "m5 12 4 4L19 6" }), more: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("circle", { cx: "5", cy: "12", r: "1" }),
        react_1.default.createElement("circle", { cx: "12", cy: "12", r: "1" }),
        react_1.default.createElement("circle", { cx: "19", cy: "12", r: "1" })),
    external: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M13 3h8v8m-12 4L21 3M10 3H4v17h17v-6" })),
    star: react_1.default.createElement("path", { d: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" }),
    play: react_1.default.createElement("path", { d: "m8 4 12 8-12 8V4Z" }), pause: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M8 4v16M16 4v16" })),
    stop: react_1.default.createElement("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1" }),
    rewind: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m15 5-7 7 7 7M4 5v14" })), next: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m8 5 7 7-7 7M19 5v14" })),
    info: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        react_1.default.createElement("path", { d: "M12 11v6M12 7h.01" })),
    warning: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m12 3 10 18H2L12 3Z" }),
        react_1.default.createElement("path", { d: "M12 9v5M12 17h.01" })),
    clock: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        react_1.default.createElement("path", { d: "M12 6v6l4 2" })),
    file: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M14 2H5v20h14V7l-5-5Z" }),
        react_1.default.createElement("path", { d: "M14 2v6h5M8 12h8M8 16h6" })),
    edit: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m15 4 5 5-11 11H4v-5L15 4Zm-2 2 5 5" })),
    trash: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M9 10v7M15 10v7" })),
    user: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("circle", { cx: "12", cy: "8", r: "4" }),
        react_1.default.createElement("path", { d: "M4 22v-3c0-7 16-7 16 0v3" })),
    users: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("circle", { cx: "9", cy: "8", r: "3" }),
        react_1.default.createElement("path", { d: "M3 21v-4c0-5 12-5 12 0v4M16 4a3 3 0 0 1 0 6M18 14c3 0 3 3 3 7" })),
    logout: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M10 3H4v18h6M9 12h12m-5-5 5 5-5 5" })),
    grip: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M8 5h.01M8 12h.01M8 19h.01M16 5h.01M16 12h.01M16 19h.01", strokeWidth: "4" })),
    lock: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: "5", y: "10", width: "14", height: "11", rx: "2" }),
        react_1.default.createElement("path", { d: "M8 10V6a4 4 0 0 1 8 0v4M12 14v3" })),
    globe: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        react_1.default.createElement("ellipse", { cx: "12", cy: "12", rx: "4", ry: "9" }),
        react_1.default.createElement("path", { d: "M3 12h18" })),
    book: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-3-2-7-2-10 1Zm0 0v16" })),
    copy: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: "8", y: "8", width: "13", height: "13", rx: "2" }),
        react_1.default.createElement("path", { d: "M16 8V3H3v13h5" })),
    wifi: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "M2 8a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8 16a5 5 0 0 1 8 0" }),
        react_1.default.createElement("circle", { cx: "12", cy: "20", r: "1" })),
    layers: react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { d: "m12 2 10 6-10 6L2 8l10-6ZM2 12l10 6 10-6M2 16l10 6 10-6" })),
    arrowup: react_1.default.createElement("path", { d: "M12 20V4m-6 6 6-6 6 6" }), arrowdown: react_1.default.createElement("path", { d: "M12 4v16m-6-6 6 6 6-6" }),
};
function Icon({ name, size = 18, className = '', ...rest }) {
    return react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.65", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", className: className, ...rest }, paths[name] || paths.grid);
}
function Brand({ large = false }) { return react_1.default.createElement("div", { className: `brand ${large ? 'brand-large' : ''}` },
    react_1.default.createElement("div", { className: "brand-symbol" },
        react_1.default.createElement("svg", { viewBox: "0 0 32 32", fill: "none" },
            react_1.default.createElement("path", { d: "M7 24V15M13 24V8M19 24V12M25 24V5", stroke: "currentColor", strokeWidth: "2.8", strokeLinecap: "round" }))),
    react_1.default.createElement("div", null,
        react_1.default.createElement("strong", null, "FinTech"))); }

},
"src/components/Shell.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAV = void 0;
exports.Shell = Shell;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const Icon_1 = require("./Icon");
const ui_1 = require("./ui");
const analytics_1 = require("../lib/analytics");
exports.NAV = [
    { route: 'overview', name: '市场总览', icon: 'grid', group: '研究工作台' },
    { route: 'data', name: '市场数据', icon: 'database', group: '研究工作台' },
    { route: 'features', name: '特征实验室', icon: 'chart', group: '研究工作台' },
    { route: 'regimes', name: '市场状态', icon: 'activity', group: '研究工作台' },
    { route: 'alerts', name: '预警中心', icon: 'bell', group: '研究工作台' },
    { route: 'quality', name: '数据质量', icon: 'shield', group: '数据治理' },
    { route: 'lineage', name: '数据溯源', icon: 'branch', group: '数据治理' },
    { route: 'system', name: '服务监控', icon: 'server', group: '平台管理' },
    { route: 'api', name: 'API 工作台', icon: 'code', group: '平台管理' },
    { route: 'settings', name: '团队与设置', icon: 'settings', group: '平台管理' },
];
function Shell({ children }) {
    const app = (0, AppContext_1.useApp)();
    const { state, user, route, navigate, assets, lastUpdate } = app;
    const [search, setSearch] = (0, react_1.useState)(false), [query, setQuery] = (0, react_1.useState)(''), [menu, setMenu] = (0, react_1.useState)(null), [help, setHelp] = (0, react_1.useState)(false), [mobile, setMobile] = (0, react_1.useState)(false);
    const alerts = state.alerts.filter(a => assets.some(asset => asset.id === a.assetId));
    const unread = alerts.filter(a => a.status === 'new');
    (0, react_1.useEffect)(() => { const key = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearch(true);
    } if (e.key === 'Escape')
        setMenu(null); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
    const go = (r) => { navigate(r); setMobile(false); setSearch(false); setMenu(null); };
    return react_1.default.createElement("div", { className: "app-shell" },
        mobile && react_1.default.createElement("button", { type: "button", className: "sidebar-shade", "aria-label": "\u5173\u95ED\u5BFC\u822A", onClick: () => setMobile(false) }),
        react_1.default.createElement("aside", { className: `sidebar ${mobile ? 'sidebar-open' : ''}` },
            react_1.default.createElement("button", { className: "brand-home", type: "button", onClick: () => go('overview'), "aria-label": "\u8FD4\u56DE\u5E02\u573A\u603B\u89C8" },
                react_1.default.createElement(Icon_1.Brand, null)),
            react_1.default.createElement("div", { className: "workspace" },
                react_1.default.createElement("div", { className: "workspace-mark" }, "R"),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("strong", null, "\u91D1\u878D\u79D1\u6280\u7814\u7A76\u7EC4"),
                    react_1.default.createElement("span", null, "Research workspace")),
                react_1.default.createElement(Icon_1.Icon, { name: "down", size: 14 })),
            react_1.default.createElement("nav", { "aria-label": "\u4E3B\u8981\u5BFC\u822A" }, exports.NAV.map((n, i) => react_1.default.createElement(react_1.default.Fragment, { key: n.route },
                (i === 0 || exports.NAV[i - 1].group !== n.group) && react_1.default.createElement("p", { className: "nav-group" }, n.group),
                react_1.default.createElement("button", { type: "button", onClick: () => go(n.route), className: `nav-item ${route === n.route ? 'active' : ''}`, "aria-current": route === n.route ? 'page' : undefined },
                    react_1.default.createElement(Icon_1.Icon, { name: n.icon, size: 19 }),
                    react_1.default.createElement("span", null, n.name),
                    n.route === 'alerts' && unread.length > 0 && react_1.default.createElement("b", { className: "nav-counter" }, unread.length))))),
            react_1.default.createElement("div", { className: "sidebar-bottom" },
                react_1.default.createElement("div", { className: "lab-note" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Icon_1.Icon, { name: "layers", size: 17 }),
                        react_1.default.createElement("b", null, "\u8BA9\u6570\u636E\u6210\u4E3A\u6D1E\u5BDF")),
                    react_1.default.createElement("p", null, "\u4ECE\u6570\u636E\u5230\u7279\u5F81\uFF0C\u518D\u5230\u53EF\u89E3\u91CA\u7684\u5E02\u573A\u72B6\u6001\u3002"),
                    react_1.default.createElement("button", { type: "button", onClick: () => setHelp(true) },
                        "\u63A2\u7D22\u5DE5\u4F5C\u53F0",
                        react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 15 }))),
                react_1.default.createElement("button", { type: "button", className: "help-link", onClick: () => setHelp(true) },
                    react_1.default.createElement(Icon_1.Icon, { name: "book", size: 16 }),
                    "\u4F7F\u7528\u6307\u5357",
                    react_1.default.createElement("span", null, "v1.0")))),
        react_1.default.createElement("div", { className: "main-shell" },
            react_1.default.createElement("header", { className: "topbar" },
                react_1.default.createElement("div", { className: "breadcrumbs" },
                    react_1.default.createElement(ui_1.IconButton, { icon: "grid", label: "\u5C55\u5F00\u5BFC\u822A", className: "mobile-nav", onClick: () => setMobile(!mobile) }),
                    react_1.default.createElement("span", null, "\u7814\u7A76\u5DE5\u4F5C\u53F0"),
                    react_1.default.createElement(Icon_1.Icon, { name: "chevron", size: 13 }),
                    react_1.default.createElement("b", null, exports.NAV.find(n => n.route === route)?.name)),
                react_1.default.createElement("button", { type: "button", className: "global-search", onClick: () => { setQuery(''); setSearch(true); } },
                    react_1.default.createElement(Icon_1.Icon, { name: "search", size: 17 }),
                    react_1.default.createElement("span", null, "\u641C\u7D22\u8D44\u4EA7\u3001\u7279\u5F81\u6216\u529F\u80FD"),
                    react_1.default.createElement("kbd", null, "\u2318 K")),
                react_1.default.createElement("div", { className: "topbar-right" },
                    react_1.default.createElement(ui_1.Badge, { tone: "amber", dot: true }, "\u6A21\u62DF\u6570\u636E"),
                    react_1.default.createElement("div", { className: "popover-anchor" },
                        react_1.default.createElement(ui_1.IconButton, { icon: "bell", label: `通知，${unread.length}条待处理`, onClick: () => setMenu(menu === 'notifications' ? null : 'notifications') }),
                        unread.length > 0 && react_1.default.createElement("i", { className: "notification-dot" }),
                        menu === 'notifications' && react_1.default.createElement("div", { className: "popover notification-popover" },
                            react_1.default.createElement("div", { className: "popover-title" },
                                react_1.default.createElement("b", null, "\u9884\u8B66\u901A\u77E5"),
                                react_1.default.createElement(ui_1.Badge, { tone: "red" },
                                    unread.length,
                                    " \u5F85\u5904\u7406")),
                            unread.length ? unread.slice(0, 5).map(a => react_1.default.createElement("button", { type: "button", className: "notification-item", key: a.id, onClick: () => { app.openAlert(a.id); setMenu(null); } },
                                react_1.default.createElement("i", { className: `severity-dot ${a.severity}` }),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement("strong", null, a.title),
                                    react_1.default.createElement("span", null,
                                        (0, analytics_1.timeLabel)(a.createdAt),
                                        " \u00B7 \u5408\u6210\u6570\u636E")),
                                react_1.default.createElement(Icon_1.Icon, { name: "chevron", size: 15 }))) : react_1.default.createElement("p", { className: "muted padded" }, "\u6240\u6709\u9884\u8B66\u5747\u5DF2\u5904\u7406\u3002"),
                            react_1.default.createElement(ui_1.Button, { variant: "ghost", onClick: () => go('alerts'), className: "full-width" },
                                "\u67E5\u770B\u5168\u90E8\u9884\u8B66",
                                react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 15 })))),
                    react_1.default.createElement("div", { className: "topbar-divider" }),
                    react_1.default.createElement("div", { className: "popover-anchor" },
                        react_1.default.createElement("button", { type: "button", className: "profile-button", onClick: () => setMenu(menu === 'user' ? null : 'user'), "aria-label": "\u7528\u6237\u83DC\u5355" },
                            react_1.default.createElement("span", { className: "avatar" }, user?.name.slice(-2)),
                            react_1.default.createElement(Icon_1.Icon, { name: "down", size: 13 })),
                        menu === 'user' && react_1.default.createElement("div", { className: "popover user-popover" },
                            react_1.default.createElement("strong", null,
                                user?.name,
                                " ",
                                react_1.default.createElement(ui_1.Badge, null, user ? analytics_1.ROLE_LABELS[user.role] : '')),
                            react_1.default.createElement("p", null, user?.email),
                            react_1.default.createElement("div", { className: "menu-divider" }),
                            react_1.default.createElement("small", null, "\u5207\u6362\u6F14\u793A\u8EAB\u4EFD\uFF08\u975E\u751F\u4EA7\u8BA4\u8BC1\uFF09"),
                            state.users.filter(u => u.active && u.id.startsWith('u-')).map(u => react_1.default.createElement("button", { type: "button", key: u.id, onClick: () => { app.login(u.id); setMenu(null); } },
                                react_1.default.createElement(Icon_1.Icon, { name: "user", size: 16 }),
                                analytics_1.ROLE_LABELS[u.role],
                                react_1.default.createElement("span", null, u.id === user?.id && react_1.default.createElement(Icon_1.Icon, { name: "check", size: 15 })))),
                            react_1.default.createElement("div", { className: "menu-divider" }),
                            react_1.default.createElement("button", { type: "button", onClick: () => { app.logout(); setMenu(null); } },
                                react_1.default.createElement(Icon_1.Icon, { name: "logout", size: 16 }),
                                "\u9000\u51FA\u6F14\u793A\u8D26\u53F7"))))),
            react_1.default.createElement("main", { id: "main-content", className: "content", key: route }, children),
            react_1.default.createElement("footer", { className: "app-footer" },
                react_1.default.createElement("span", null,
                    "FinTech ",
                    react_1.default.createElement("i", null),
                    " \u5408\u6210\u6570\u636E\u4EC5\u7528\u4E8E\u4EA7\u54C1\u6F14\u793A"),
                react_1.default.createElement("span", null,
                    react_1.default.createElement("i", { className: `live-dot ${state.prefs.live ? '' : 'off'}` }),
                    state.prefs.live ? '模拟推送运行中' : '模拟推送已暂停',
                    react_1.default.createElement("em", null,
                        "\u6700\u8FD1\u5237\u65B0 ",
                        new Date(lastUpdate).toLocaleTimeString('zh-CN', { hour12: false }))))),
        react_1.default.createElement("div", { className: "toast-stack", "aria-live": "polite" }, app.toasts.map(t => react_1.default.createElement("div", { key: t.id, className: `toast toast-${t.tone}`, role: "status" },
            react_1.default.createElement(Icon_1.Icon, { name: t.tone === 'error' ? 'warning' : t.tone === 'success' ? 'check' : 'info', size: 18 }),
            react_1.default.createElement("span", null, t.message),
            react_1.default.createElement(ui_1.IconButton, { icon: "close", label: "\u5173\u95ED\u901A\u77E5", onClick: () => app.dismissToast(t.id) })))),
        search && react_1.default.createElement(ui_1.Modal, { title: "\u641C\u7D22\u5DE5\u4F5C\u53F0", onClose: () => setSearch(false) },
            react_1.default.createElement(ui_1.SearchBox, { value: query, onChange: setQuery, placeholder: "\u8F93\u5165\u9875\u9762\u3001\u8D44\u4EA7\u540D\u79F0\u3001\u4EE3\u7801\u6216\u7279\u5F81\u2026" }),
            react_1.default.createElement("div", { className: "command-results" },
                exports.NAV.filter(n => !query || n.name.toLowerCase().includes(query.toLowerCase())).map(n => react_1.default.createElement("button", { type: "button", key: n.route, onClick: () => go(n.route) },
                    react_1.default.createElement(Icon_1.Icon, { name: n.icon }),
                    react_1.default.createElement("span", null, n.name),
                    react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 15 }))),
                assets.filter(a => !query || `${a.name} ${a.symbol}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6).map(a => react_1.default.createElement("button", { type: "button", key: a.id, onClick: () => { app.setSelectedAsset(a.id); go('data'); } },
                    react_1.default.createElement(Icon_1.Icon, { name: "chart" }),
                    react_1.default.createElement("span", null,
                        a.name,
                        react_1.default.createElement("small", null, a.symbol)),
                    react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 15 }))),
                state.features.filter(f => !query || `${f.name} ${f.id}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4).map(f => react_1.default.createElement("button", { type: "button", key: f.id, onClick: () => { app.setSelectedFeature(f.id); go('features'); } },
                    react_1.default.createElement(Icon_1.Icon, { name: "spark" }),
                    react_1.default.createElement("span", null,
                        f.name,
                        react_1.default.createElement("small", null, f.version)),
                    react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 15 }))))),
        help && react_1.default.createElement(ui_1.Modal, { title: "\u4ECE\u884C\u60C5\u5230\u6D1E\u5BDF\uFF0C\u4E00\u6761\u7814\u7A76\u8DEF\u5F84", onClose: () => setHelp(false), wide: true },
            react_1.default.createElement("div", { className: "guide-grid" }, [['01', '看市场', '在总览切换日期，比较多资产走势；星标关注的资产。'], ['02', '找特征', '查看收益、波动率、相关性和PCA，理解当前状态的依据。'], ['03', '识状态', '点击状态热力图单元格，回放历史并追溯原始数据。'], ['04', '设预警', '创建阈值规则，用合成样本测试，再确认和处理命中预警。']].map(([n, t, d]) => react_1.default.createElement("div", { key: n },
                react_1.default.createElement("span", null, n),
                react_1.default.createElement("h3", null, t),
                react_1.default.createElement("p", null, d)))),
            react_1.default.createElement("div", { className: "notice" }, "\u6F14\u793A\u8FB9\u754C\uFF1A\u767B\u5F55\u4E0E\u6743\u9650\u4E3A\u6D4F\u89C8\u5668\u7AEF\u6A21\u62DF\uFF1B\u6CA1\u6709\u771F\u5B9E\u4EA4\u6613\u3001Kafka/Flink\u4F5C\u4E1A\u6216\u670D\u52A1\u5668\u538B\u6D4B\u3002\u9ED8\u8BA4\u5206\u6790\u5E08\u53EF\u7F16\u8F91\u89C4\u5219\uFF0C\u7BA1\u7406\u5458\u53EF\u7BA1\u7406\u6570\u636E\u6E90\u548C\u56E2\u961F\uFF0C\u89C2\u5BDF\u5458\u53EA\u53EF\u67E5\u770B\u80A1\u7968\u4E0E\u503A\u5238\u3002"),
            react_1.default.createElement("p", { className: "muted small" }, "\u5FEB\u6377\u952E Ctrl / \u2318 + K \u641C\u7D22\uFF1BEsc \u5173\u95ED\u5F39\u7A97\uFF1B\u56FE\u8868\u652F\u6301\u9F20\u6807\u67E5\u770B\u6570\u503C\uFF0C\u65F6\u95F4\u5E8F\u5217\u652F\u6301\u5DE6\u53F3\u65B9\u5411\u952E\u3002\u8BBE\u7F6E\u3001\u89C4\u5219\u548C\u6F14\u793A\u64CD\u4F5C\u4FDD\u5B58\u5728\u672C\u6D4F\u89C8\u5668\u3002")));
}

},
"src/components/ui.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
exports.IconButton = IconButton;
exports.Badge = Badge;
exports.Card = Card;
exports.PageHead = PageHead;
exports.Tabs = Tabs;
exports.Empty = Empty;
exports.Notice = Notice;
exports.Field = Field;
exports.Toggle = Toggle;
exports.Modal = Modal;
exports.Stat = Stat;
exports.SearchBox = SearchBox;
exports.ProgressBar = ProgressBar;
const react_1 = __importStar(require("react"));
const Icon_1 = require("./Icon");
function Button({ children, icon, variant = 'secondary', busy = false, className = '', ...props }) { return react_1.default.createElement("button", { type: "button", ...props, disabled: props.disabled || busy, className: `btn btn-${variant} ${className}`, "aria-busy": busy },
    (icon || busy) && react_1.default.createElement(Icon_1.Icon, { name: busy ? 'refresh' : icon, size: 16, className: busy ? 'spin' : '' }),
    " ",
    children); }
function IconButton({ icon, label, ...props }) { return react_1.default.createElement("button", { type: "button", ...props, className: `icon-btn ${props.className || ''}`, title: label, "aria-label": label },
    react_1.default.createElement(Icon_1.Icon, { name: icon })); }
function Badge({ children, tone = 'neutral', dot = false }) { return react_1.default.createElement("span", { className: `badge badge-${tone}` },
    dot && react_1.default.createElement("span", { className: "status-dot" }),
    children); }
function Card({ title, subtitle, action, children, className = '', ...props }) { return react_1.default.createElement("section", { className: `card ${className}`, ...props },
    title && react_1.default.createElement("div", { className: "card-head" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, title),
            subtitle && react_1.default.createElement("p", null, subtitle)),
        action),
    children); }
function PageHead({ title, actions }) { return react_1.default.createElement("div", { className: "page-head" },
    react_1.default.createElement("h1", null, title),
    react_1.default.createElement("div", { className: "head-actions" }, actions)); }
function Tabs({ items, value, onChange }) { return react_1.default.createElement("div", { className: "tabs", role: "tablist" }, items.map(item => react_1.default.createElement("button", { type: "button", role: "tab", "aria-selected": value === item.id, key: item.id, onClick: () => onChange(item.id), className: value === item.id ? 'active' : '' },
    item.label,
    item.count !== undefined && react_1.default.createElement("span", null, item.count)))); }
function Empty({ title = '暂无符合条件的数据', description = '试试调整筛选条件或扩大日期范围。', action }) { return react_1.default.createElement("div", { className: "empty" },
    react_1.default.createElement("div", { className: "empty-icon" },
        react_1.default.createElement(Icon_1.Icon, { name: "search", size: 26 })),
    react_1.default.createElement("h3", null, title),
    react_1.default.createElement("p", null, description),
    action); }
function Notice({ children, tone = 'info' }) { return react_1.default.createElement("div", { className: `notice notice-${tone}` },
    react_1.default.createElement(Icon_1.Icon, { name: tone === 'warning' ? 'warning' : tone === 'success' ? 'check' : 'info', size: 17 }),
    react_1.default.createElement("div", null, children)); }
function Field({ label, hint, error, children }) { return react_1.default.createElement("label", { className: "field" },
    react_1.default.createElement("span", { className: "field-label" }, label),
    children,
    hint && react_1.default.createElement("small", null, hint),
    error && react_1.default.createElement("small", { className: "field-error" }, error)); }
function Toggle({ checked, onChange, label, disabled = false }) { return react_1.default.createElement("button", { type: "button", role: "switch", "aria-checked": checked, "aria-label": label, disabled: disabled, onClick: () => onChange(!checked), className: `toggle ${checked ? 'on' : ''}` },
    react_1.default.createElement("span", null)); }
function Modal({ title, children, onClose, footer, wide = false, drawer = false }) {
    const ref = (0, react_1.useRef)(null), id = (0, react_1.useId)();
    const closeRef = (0, react_1.useRef)(onClose);
    closeRef.current = onClose;
    (0, react_1.useEffect)(() => {
        const prev = document.activeElement;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => ref.current?.querySelector('input, textarea, select, button, [tabindex="0"]')?.focus(), 30);
        const handler = (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                closeRef.current();
            }
            if (e.key === 'Tab') {
                const nodes = Array.from(ref.current?.querySelectorAll('button:not([disabled]),input:not([disabled]),textarea,select,[tabindex="0"]') || []).filter(n => n.offsetParent !== null);
                const first = nodes[0], last = nodes.at(-1);
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
                else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };
        document.addEventListener('keydown', handler);
        return () => { clearTimeout(timer); document.removeEventListener('keydown', handler); document.body.style.overflow = overflow; prev?.focus(); };
    }, []);
    return react_1.default.createElement("div", { className: `modal-backdrop ${drawer ? 'drawer-backdrop' : ''}`, onMouseDown: e => { if (e.currentTarget === e.target)
            onClose(); } },
        react_1.default.createElement("div", { ref: ref, role: "dialog", "aria-modal": "true", "aria-labelledby": id, className: `modal ${wide ? 'modal-wide' : ''} ${drawer ? 'drawer' : ''}` },
            react_1.default.createElement("header", null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h2", { id: id }, title)),
                react_1.default.createElement(IconButton, { icon: "close", label: "\u5173\u95ED\u5F39\u7A97", onClick: onClose })),
            react_1.default.createElement("div", { className: "modal-content" }, children),
            footer && react_1.default.createElement("footer", null, footer)));
}
function Stat({ label, value, detail, icon, tone = '' }) { return react_1.default.createElement("div", { className: `stat-card ${tone}` },
    react_1.default.createElement("div", { className: "stat-label" },
        label,
        icon && react_1.default.createElement(Icon_1.Icon, { name: icon, size: 17 })),
    react_1.default.createElement("div", { className: "stat-value" }, value),
    detail && react_1.default.createElement("div", { className: "stat-detail" }, detail)); }
function SearchBox({ value, onChange, placeholder = '搜索…' }) { return react_1.default.createElement("div", { className: "search-box" },
    react_1.default.createElement(Icon_1.Icon, { name: "search", size: 17 }),
    react_1.default.createElement("input", { "aria-label": placeholder, placeholder: placeholder, value: value, onChange: e => onChange(e.target.value) }),
    value && react_1.default.createElement("button", { type: "button", "aria-label": "\u6E05\u7A7A\u641C\u7D22", onClick: () => onChange('') },
        react_1.default.createElement(Icon_1.Icon, { name: "close", size: 14 }))); }
function ProgressBar({ value, color = 'var(--accent)' }) { return react_1.default.createElement("div", { className: "progress" },
    react_1.default.createElement("span", { style: { width: `${Math.max(0, Math.min(100, value))}%`, background: color } })); }

},
"src/data/mock.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MACROS = exports.DOCUMENTS = exports.DEMO_USERS = exports.ASSETS = exports.DATES = exports.MOCK_NOTICE = exports.SNAPSHOT = void 0;
exports.initialState = initialState;
const analytics_1 = require("../lib/analytics");
exports.SNAPSHOT = '2026-10-09';
exports.MOCK_NOTICE = '全部行情、新闻、模型和运行指标均为合成演示数据，不构成投资建议。';
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function dates() { const out = []; const date = new Date(`${exports.SNAPSHOT}T00:00:00Z`); while (out.length < 260) {
    if (![0, 6].includes(date.getUTCDay()))
        out.unshift(date.toISOString().slice(0, 10));
    date.setUTCDate(date.getUTCDate() - 1);
} return out; }
exports.DATES = dates();
const definitions = [
    ['csi300', '沪深 300', '000300.SH', 'equity', 'CNY', 3650, 0.82],
    ['csi500', '中证 500', '000905.SH', 'equity', 'CNY', 5380, 1.05],
    ['sp500', '标普 500', 'SPX', 'equity', 'USD', 5150, 0.67],
    ['nasdaq', '纳斯达克 100', 'NDX', 'equity', 'USD', 17800, 1.06],
    ['cn-bond', '中债国债指数', 'CBA00601', 'bond', 'CNY', 233, 0.09],
    ['us-bond', '美债 7–10 年', 'UST7-10', 'bond', 'USD', 96, 0.17],
    ['gold', '上期黄金', 'AU.SHF', 'commodity', 'CNY', 563, 0.64],
    ['oil', '布伦特原油', 'BRENT', 'commodity', 'USD', 76, 1.1],
    ['commodity', '南华商品指数', 'NHCI', 'commodity', 'CNY', 2380, 0.56],
    ['dxy', '美元指数', 'DXY', 'fx', 'USD', 102, 0.22],
    ['usdcnh', '美元 / 离岸人民币', 'USD/CNH', 'fx', 'CNH', 7.12, 0.11],
    ['eurusd', '欧元 / 美元', 'EUR/USD', 'fx', 'USD', 1.082, 0.21],
];
const common = rng(20261009);
const factors = exports.DATES.map((_, i) => Math.sin(i / 12) * 0.3 + (common() - 0.48) * 1.15);
exports.ASSETS = definitions.map(([id, name, symbol, category, currency, initial, amplitude], k) => {
    const random = rng(26001 + k * 137);
    let value = initial;
    const prices = exports.DATES.map((date, i) => {
        const cycle = i < 55 ? 0.13 : i < 95 ? -0.02 : i < 145 ? -0.13 : i < 190 ? 0.06 : i < 225 ? -0.015 : 0.19;
        const exposure = category === 'bond' ? -0.28 : category === 'fx' ? (id === 'eurusd' ? 0.3 : -0.35) : id === 'gold' ? 0.52 : 1;
        const move = (cycle * exposure + factors[i] * exposure * 0.66 + (random() - 0.5) * 0.95) * amplitude;
        value *= 1 + move / 100;
        return { date, close: +value.toFixed(category === 'fx' ? 4 : 2), volume: Math.round((0.65 + random()) * (category === 'equity' ? 4.5e8 : 7e6)) };
    });
    return { id, name, symbol, category, currency, source: category === 'equity' || category === 'bond' ? 'source-market' : 'source-cross', prices };
});
exports.DEMO_USERS = [
    { id: 'u-admin', name: '林序', email: 'admin@regimelab.example', role: 'admin', allowedClasses: ['equity', 'bond', 'commodity', 'fx'], active: true },
    { id: 'u-analyst', name: '陈知行', email: 'analyst@regimelab.example', role: 'analyst', allowedClasses: ['equity', 'bond', 'commodity', 'fx'], active: true },
    { id: 'u-viewer', name: '访客', email: 'viewer@regimelab.example', role: 'viewer', allowedClasses: ['equity', 'bond'], active: true },
];
exports.DOCUMENTS = [
    { id: 'doc-1', title: '多资产观察：风险偏好回暖，结构分化仍在延续', type: '研报', topic: '资产配置', sentiment: '积极', time: '2026-10-09 14:35', source: '演示研究组', summary: '合成样本中，权益动量小幅改善，股债相关性继续走低。短期需要区分趋势恢复与局部反弹。', paragraphs: ['本篇是用于演示检索与资料阅读的虚构研报，不来源于真实机构。', '在当前合成数据窗口内，权益与商品的归一化走势出现分化。平台将从收益分布、趋势、相关性和流动性四个维度提供观察视角。', '当前状态标签只解释演示数据，不能用于实际交易。状态判断应结合数据质量、发布时间及模型版本，避免把关联性解释为因果。'] },
    { id: 'doc-2', title: '宏观样例：制造业景气指标边际改善', type: '新闻', topic: '宏观经济', sentiment: '积极', time: '2026-10-09 13:48', source: '合成资讯流', summary: '示例PMI环比改善0.3点，需求修复信号仍需更多数据验证。', paragraphs: ['这是一条虚构资讯，用来演示宏观事件检索、发布时间展示与舆情特征提取。', '本系统不会将观测期等同于发布时间；历史回放只应使用当时已知的数据。'] },
    { id: 'doc-3', title: '大宗观察：能源价格波动加大，贵金属相对稳健', type: '研报', topic: '大宗商品', sentiment: '谨慎', time: '2026-10-09 12:20', source: '演示研究组', summary: '示例能源价格波动高于贵金属，组合风险应关注资产之间的共振而非单点价格。', paragraphs: ['本材料仅为前端功能演示编写。', '通过状态热力图，可以观察商品资产是否同步进入高波动状态，并追溯相关特征。'] },
    { id: 'doc-4', title: '示例企业发布三季度经营数据预告', type: '公告', topic: '公司公告', sentiment: '中性', time: '2026-10-09 10:05', source: '示例公告库', summary: '演示公告涵盖经营概况、需求变化与现金流提示，未对应任何真实上市公司。', paragraphs: ['公司名称与经营数据均为虚构。本公告用于非结构化数据存储和版本追溯的演示。'] },
    { id: 'doc-5', title: '讨论热度样本：投资者对权益趋势的关注上升', type: '社交', topic: '市场情绪', sentiment: '中性', time: '2026-10-09 09:42', source: '合成舆情样本', summary: '话题热度仅为模拟统计，不代表真实用户观点。', paragraphs: ['这是一条合成社交样本，不包含真实用户信息。', '情绪因子与价格变化不构成必然的因果联系。'] },
    { id: 'doc-6', title: '利率观察：期限结构变化与股债联动', type: '研报', topic: '固定收益', sentiment: '中性', time: '2026-10-08 16:15', source: '演示研究组', summary: '使用低频利率样本和日频资产收益比较不同市场状态的跨资产特征。', paragraphs: ['全部文字和数据均为演示内容。', '页面展示的相关系数由合成价格序列计算，不是现实市场估计结果。'] },
];
exports.MACROS = [
    { id: 'pmi', name: '制造业 PMI', value: 50.8, previous: 50.5, unit: '点', period: '2026-09', releasedAt: '2026-09-30 09:30', source: '合成宏观样本', history: [49.6, 49.8, 50.1, 49.7, 50.3, 50.4, 50.2, 50.5, 50.8] },
    { id: 'cpi', name: 'CPI 同比', value: 1.2, previous: 0.9, unit: '%', period: '2026-08', releasedAt: '2026-09-10 09:30', source: '合成宏观样本', history: [0.4, 0.6, 0.5, 0.7, 0.8, 0.6, 1.0, 0.9, 1.2] },
    { id: 'm2', name: 'M2 同比', value: 8.3, previous: 8.1, unit: '%', period: '2026-08', releasedAt: '2026-09-15 17:00', source: '合成宏观样本', history: [7.1, 7.3, 7.2, 7.6, 7.8, 7.9, 8.0, 8.1, 8.3] },
    { id: 'shibor', name: 'Shibor 3M', value: 1.72, previous: 1.75, unit: '%', period: '2026-10-09', releasedAt: '2026-10-09 11:00', source: '合成宏观样本', history: [1.94, 1.91, 1.89, 1.85, 1.88, 1.81, 1.79, 1.75, 1.72] },
];
function initialState() {
    const at = '2026-10-09T07:00:00Z';
    return {
        annotations: [], schema: 1, sessionUserId: 'u-analyst', users: exports.DEMO_USERS.map(u => ({ ...u, allowedClasses: [...u.allowedClasses] })),
        rules: [
            { id: 'r-vol', name: '权益波动率超过阈值', assetId: 'all', metric: 'volatility20', operator: 'gt', threshold: 5, severity: 'high', cooldown: 30, enabled: true, createdAt: at },
            { id: 'r-mom', name: '趋势动量持续改善', assetId: 'csi300', metric: 'momentum20', operator: 'gt', threshold: 1, severity: 'low', cooldown: 60, enabled: true, createdAt: at },
            { id: 'r-dd', name: '最大回撤观察', assetId: 'all', metric: 'drawdown', operator: 'gt', threshold: 8, severity: 'medium', cooldown: 60, enabled: true, createdAt: at },
            { id: 'r-state', name: '状态归属度不足', assetId: 'all', metric: 'confidence', operator: 'lt', threshold: 50, severity: 'medium', cooldown: 120, enabled: false, createdAt: at },
        ],
        alerts: ['csi500', 'nasdaq', 'oil', 'csi300', 'commodity'].map((id, i) => {
            const asset = exports.ASSETS.find(a => a.id === id);
            const value = (0, analytics_1.metrics)(asset.prices).volatility20;
            return { id: `al-seed-${i}`, ruleId: 'r-vol', title: `${asset.name} · 波动率观察`, assetId: id, severity: i < 2 ? 'high' : i < 4 ? 'medium' : 'low', status: i < 3 ? 'new' : i === 3 ? 'acknowledged' : 'resolved', createdAt: `2026-10-09T0${6 - i}:4${i}:00Z`, updatedAt: at, metric: 'volatility20', value, threshold: 5, operator: 'gt', note: i === 4 ? '已完成样本复核。' : '', owner: i > 2 ? '陈知行' : '', snapshotDate: exports.SNAPSHOT };
        }),
        features: [
            { id: 'return1d', name: '单日收益率', category: '分布特征', description: '价格相对前一个观测日的变化率', formula: '(close_t / close_t-1 - 1) × 100', window: 1, unit: '%', version: 'v1.2', enabled: true, importance: 0.12 },
            { id: 'volatility20', name: '20日年化波动率', category: '分布特征', description: '20日收益率的样本标准差，按252日年化', formula: 'std(returns, 20) × √252', window: 20, unit: '%', version: 'v2.1', enabled: true, importance: 0.24 },
            { id: 'momentum20', name: '20日动量', category: '动量与趋势', description: '20个观测日的累计价格变化', formula: '(close_t / close_t-20 - 1) × 100', window: 20, unit: '%', version: 'v1.3', enabled: true, importance: 0.29 },
            { id: 'drawdown', name: '区间最大回撤', category: '风险相关', description: '历史峰值至后续低点的最大跌幅', formula: 'max((running_peak - close) / running_peak)', window: 260, unit: '%', version: 'v1.1', enabled: true, importance: 0.16 },
            { id: 'corr', name: '股债相关系数', category: '相关性结构', description: '两资产20日收益率的Pearson相关系数', formula: 'corr(equity_returns, bond_returns, 20)', window: 20, unit: '', version: 'v1.0', enabled: true, importance: 0.11 },
            { id: 'sentiment', name: '舆情热度', category: '另类数据', description: '合成新闻主题的标准化计数；预置示例', formula: 'zscore(topic_count, 30)', window: 30, unit: 'z-score', version: 'v0.9', enabled: false, importance: 0.08 },
        ],
        sources: [
            { id: 'source-market', name: '多资产行情样本', type: '行情', status: 'online', frequency: '1d', records: 1560, completeness: 99.7, consistency: 100, timeliness: 99.8, updatedAt: '2026-10-09 15:00' },
            { id: 'source-cross', name: '跨资产行情样本', type: '行情', status: 'online', frequency: '1d', records: 1560, completeness: 100, consistency: 99.4, timeliness: 100, updatedAt: '2026-10-09 15:00' },
            { id: 'source-macro', name: '宏观指标样本', type: '宏观', status: 'delayed', frequency: '日 / 月', records: 36, completeness: 98.6, consistency: 100, timeliness: 95.2, updatedAt: '2026-10-09 11:00' },
            { id: 'source-news', name: '合成舆情流', type: '舆情', status: 'online', frequency: '模拟流', records: 3, completeness: 100, consistency: 99.8, timeliness: 99.2, updatedAt: '2026-10-09 14:35' },
            { id: 'source-docs', name: '演示研报与公告', type: '研报', status: 'online', frequency: '按篇', records: 3, completeness: 100, consistency: 100, timeliness: 100, updatedAt: '2026-10-09 14:35' },
        ],
        issues: [
            { id: 'q1', sourceId: 'source-macro', dimension: '时效性', severity: 'medium', title: '宏观指标更新延迟', description: '样例 Shibor 批次超过配置的新鲜度阈值。此问题为预置演示场景，不是对真实数据源的检测。', suggestion: '检查发布时间与抓取时间，确认工作日历后重试适配器。不要用未来发布值填充历史窗口。', status: 'open', detectedAt: at },
            { id: 'q2', sourceId: 'source-market', dimension: '完整性', severity: 'low', title: '历史交易量字段缺失', description: '预置批次有少量交易量字段为空。价格字段保持完整。', suggestion: '保留缺失标识，回源补采。无法补齐时标记质量标志，禁止静默填零。', status: 'open', detectedAt: at },
            { id: 'q3', sourceId: 'source-cross', dimension: '一致性', severity: 'medium', title: '汇率单位映射需要复核', description: '示例源字段单位与UDM目录单位存在一处冲突。', suggestion: '将原始单位与标准单位分开记录，在清洗层明确转换规则并增加校验。', status: 'open', detectedAt: at },
            { id: 'q4', sourceId: 'source-news', dimension: '一致性', severity: 'low', title: '重复新闻已完成去重', description: '演示场景已按内容哈希完成幂等去重。', suggestion: '保留首条记录与所有来源标识。', status: 'resolved', detectedAt: at },
        ],
        watchlist: ['csi300', 'sp500', 'gold', 'cn-bond'], widgets: ['trend', 'state', 'heatmap', 'alerts'],
        prefs: { positiveGreen: true, compact: false, notifications: true, live: true }, imports: [],
        checkpoints: [
            { id: 'cp-1042', type: 'Checkpoint', status: 'completed', at, size: '18.4 MB', duration: 168 },
            { id: 'sp-0081', type: 'Savepoint', status: 'completed', at: '2026-10-08T09:00:00Z', size: '19.1 MB', duration: 214 },
        ],
        audit: [{ id: 'au-start', action: '演示工作区已初始化', actor: 'System', at }], modelVersion: 'gmm-demo-2.1', apiLimit: 60,
    };
}

},
"src/lib/analytics.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uid = exports.compactNumber = exports.signed = exports.number = exports.sliceDates = exports.returns = exports.pct = exports.stdev = exports.mean = exports.METRICS = exports.REGIMES = exports.ROLE_LABELS = exports.CLASS_LABELS = void 0;
exports.maxDrawdown = maxDrawdown;
exports.correlation = correlation;
exports.sampleRegime = sampleRegime;
exports.metrics = metrics;
exports.normalized = normalized;
exports.ruleMatches = ruleMatches;
exports.validateRule = validateRule;
exports.canWrite = canWrite;
exports.canAdmin = canAdmin;
exports.visibleAssets = visibleAssets;
exports.timeLabel = timeLabel;
exports.daysBefore = daysBefore;
exports.calculatePca = calculatePca;
exports.CLASS_LABELS = { equity: '股票', bond: '债券', commodity: '商品', fx: '汇率' };
exports.ROLE_LABELS = { admin: '管理员', analyst: '分析师', viewer: '观察员' };
exports.REGIMES = {
    bull: { label: '温和上行', color: '#13805c', description: '动量改善，资产表现偏强' },
    range: { label: '区间震荡', color: '#bb8b1c', description: '方向不明，关注结构分化' },
    bear: { label: '承压下行', color: '#c83f49', description: '波动放大，风险偏好走弱' },
};
exports.METRICS = {
    return1d: { label: '单日收益率', unit: '%', description: '当前收盘价相对前一日的变化率' },
    volatility20: { label: '20日年化波动率', unit: '%', description: '过去20日简单收益率样本标准差 × √252' },
    momentum20: { label: '20日动量', unit: '%', description: '当前收盘价相对20个观测日前的变化率' },
    drawdown: { label: '区间最大回撤', unit: '%', description: '自起始日至选定日期的最大峰谷损失（正数）' },
    confidence: { label: '状态归属度', unit: '%', description: '演示分类器的归属分数；非经校准的模型概率' },
};
const mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
exports.mean = mean;
const stdev = (xs) => xs.length < 2 ? 0 : Math.sqrt(xs.reduce((s, x) => s + (x - (0, exports.mean)(xs)) ** 2, 0) / (xs.length - 1));
exports.stdev = stdev;
const pct = (a, b) => b === 0 ? 0 : (a / b - 1) * 100;
exports.pct = pct;
const returns = (ps) => ps.slice(1).map((p, i) => (0, exports.pct)(p.close, ps[i].close));
exports.returns = returns;
function maxDrawdown(xs) {
    let peak = 0, dd = 0;
    for (const x of xs) {
        if (!Number.isFinite(x) || x <= 0)
            continue;
        peak = Math.max(peak, x);
        dd = Math.max(dd, (peak - x) / peak * 100);
    }
    return dd;
}
function correlation(a, b) {
    const n = Math.min(a.length, b.length);
    if (n < 2)
        return 0;
    const x = a.slice(-n), y = b.slice(-n), xm = (0, exports.mean)(x), ym = (0, exports.mean)(y);
    let cov = 0, vx = 0, vy = 0;
    for (let i = 0; i < n; i++) {
        cov += (x[i] - xm) * (y[i] - ym);
        vx += (x[i] - xm) ** 2;
        vy += (y[i] - ym) ** 2;
    }
    return vx && vy ? Math.max(-1, Math.min(1, cov / Math.sqrt(vx * vy))) : 0;
}
function sampleRegime(points) {
    const last = points.at(-1)?.close ?? 1, prev = points.at(-21)?.close ?? points[0]?.close ?? 1;
    const m = (0, exports.pct)(last, prev), v = (0, exports.stdev)((0, exports.returns)(points).slice(-20));
    const weights = { bull: Math.exp(Math.min(4, m / 4)), range: Math.exp(1.15 - Math.min(2, Math.abs(m) / 8)), bear: Math.exp(Math.min(4, -m / 4 + Math.max(0, v - 1.2) / 2)) };
    const sum = weights.bull + weights.range + weights.bear;
    const probabilities = { bull: weights.bull / sum * 100, range: weights.range / sum * 100, bear: weights.bear / sum * 100 };
    const regime = Object.keys(probabilities).reduce((a, b) => probabilities[a] >= probabilities[b] ? a : b);
    return { regime, probabilities, confidence: probabilities[regime] };
}
function metrics(points) {
    const last = points.at(-1)?.close ?? 0;
    return {
        return1d: points.length < 2 ? 0 : (0, exports.pct)(last, points.at(-2).close),
        volatility20: (0, exports.stdev)((0, exports.returns)(points).slice(-20)) * Math.sqrt(252),
        momentum20: points.length < 2 ? 0 : (0, exports.pct)(last, points.at(-21)?.close ?? points[0].close),
        drawdown: maxDrawdown(points.map(p => p.close)), confidence: sampleRegime(points).confidence,
    };
}
const sliceDates = (points, from, to) => points.filter(p => p.date >= from && p.date <= to);
exports.sliceDates = sliceDates;
function normalized(points) { return points.length ? points.map(p => (0, exports.pct)(p.close, points[0].close)) : []; }
function ruleMatches(rule, asset, asOf) {
    if (!rule.enabled || (rule.assetId !== 'all' && rule.assetId !== asset.id))
        return false;
    const ps = asOf ? asset.prices.filter(p => p.date <= asOf) : asset.prices;
    if (ps.length < 2)
        return false;
    const value = metrics(ps)[rule.metric];
    return rule.operator === 'gt' ? value > rule.threshold : value < rule.threshold;
}
function validateRule(rule) {
    if (!rule.name.trim())
        return '请输入规则名称';
    if (rule.name.trim().length > 48)
        return '规则名称不能超过48个字符';
    if (!Number.isFinite(rule.threshold))
        return '阈值必须是有效数字';
    if (!Number.isInteger(rule.cooldown) || rule.cooldown < 1 || rule.cooldown > 1440)
        return '冷却时间需为1–1440分钟的整数';
    return null;
}
function canWrite(user) { return !!user?.active && user.role !== 'viewer'; }
function canAdmin(user) { return !!user?.active && user.role === 'admin'; }
function visibleAssets(assets, user) { return !user?.active ? [] : assets.filter(a => user.allowedClasses.includes(a.category)); }
const number = (n, decimals = 2) => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
exports.number = number;
const signed = (n, decimals = 2) => `${n >= 0 ? '+' : ''}${(0, exports.number)(n, decimals)}%`;
exports.signed = signed;
const compactNumber = (n) => n >= 1e8 ? `${(0, exports.number)(n / 1e8, 2)} 亿` : n >= 1e4 ? `${(0, exports.number)(n / 1e4, 1)} 万` : (0, exports.number)(n, 0);
exports.compactNumber = compactNumber;
function timeLabel(value) { const d = new Date(value); return Number.isNaN(d.getTime()) ? value : d.toLocaleString('zh-CN', { hour12: false, month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
exports.uid = uid;
/** UTC date-only arithmetic avoids local timezone drift. */
function daysBefore(date, days) { const d = new Date(`${date}T00:00:00Z`); d.setUTCDate(d.getUTCDate() - days); return d.toISOString().slice(0, 10); }
/** Small local PCA demonstration, not a fitted production market-state model. */
function calculatePca(samples) {
    if (samples.length < 3)
        return { points: [], variance: [0, 0], loadings: [] };
    const d = samples[0].values.length;
    const averages = Array.from({ length: d }, (_, j) => (0, exports.mean)(samples.map(s => s.values[j])));
    const deviations = Array.from({ length: d }, (_, j) => (0, exports.stdev)(samples.map(s => s.values[j])) || 1);
    const standardized = samples.map(s => s.values.map((v, j) => (v - averages[j]) / deviations[j]));
    const cov = Array.from({ length: d }, (_, i) => Array.from({ length: d }, (_, j) => standardized.reduce((sum, s) => sum + s[i] * s[j], 0) / (samples.length - 1)));
    const total = cov.reduce((s, r, i) => s + r[i], 0);
    const eigen = (matrix) => {
        let v = Array.from({ length: d }, (_, i) => 1 / (i + 1));
        for (let k = 0; k < 80; k++) {
            const w = matrix.map(row => row.reduce((s, c, j) => s + c * v[j], 0));
            const norm = Math.hypot(...w) || 1;
            v = w.map(x => x / norm);
        }
        const lambda = v.reduce((s, x, i) => s + x * matrix[i].reduce((s2, c, j) => s2 + c * v[j], 0), 0);
        return { v, lambda: Math.max(0, lambda) };
    };
    const a = eigen(cov);
    const b = eigen(cov.map((row, i) => row.map((v, j) => v - a.lambda * a.v[i] * a.v[j])));
    return { points: standardized.map((s, i) => ({ x: s.reduce((v, x, j) => v + x * a.v[j], 0), y: s.reduce((v, x, j) => v + x * b.v[j], 0), label: samples[i].label, regime: samples[i].regime })), variance: [total ? a.lambda / total * 100 : 0, total ? b.lambda / total * 100 : 0], loadings: [a.v, b.v] };
}

},
"src/lib/files.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvCell = csvCell;
exports.downloadFile = downloadFile;
exports.downloadCsv = downloadCsv;
exports.parseCsv = parseCsv;
/** Quote CSV correctly and neutralize spreadsheet formula injection in text fields. */
function csvCell(value) {
    const s = String(value ?? '');
    const safe = /^[=+@\t\r]/.test(s) || (/^-/.test(s) && !/^-?\d+(\.\d+)?$/.test(s)) ? `'${s}` : s;
    return `"${safe.replace(/"/g, '""')}"`;
}
function downloadFile(name, content, mime = 'text/plain;charset=utf-8') {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function downloadCsv(name, headers, rows) { downloadFile(name, '\ufeff' + [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n'), 'text/csv;charset=utf-8'); }
/** RFC4180-style parser: supports quoted commas, escaped quotes and newlines. */
function parseCsv(text) {
    if (text.length > 1024 * 1024)
        throw new Error('演示导入上限为1MB');
    const input = text.replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], cell = '', quoted = false;
    for (let i = 0; i < input.length; i++) {
        const c = input[i];
        if (c === '"') {
            if (quoted && input[i + 1] === '"') {
                cell += '"';
                i++;
            }
            else if (quoted || cell === '')
                quoted = !quoted;
            else
                throw new Error('CSV引号格式无效');
        }
        else if (!quoted && c === ',') {
            row.push(cell.trim());
            cell = '';
        }
        else if (!quoted && (c === '\n' || c === '\r')) {
            if (c === '\r' && input[i + 1] === '\n')
                i++;
            row.push(cell.trim());
            if (row.some(x => x !== ''))
                rows.push(row);
            row = [];
            cell = '';
        }
        else
            cell += c;
    }
    if (quoted)
        throw new Error('CSV存在未闭合的引号');
    row.push(cell.trim());
    if (row.some(x => x !== ''))
        rows.push(row);
    if (rows.length < 2)
        throw new Error('CSV必须包含表头和至少一行数据');
    const headers = rows.shift();
    if (headers.some(x => !x) || new Set(headers).size !== headers.length)
        throw new Error('表头不能为空或重复');
    const bad = rows.findIndex(r => r.length !== headers.length);
    if (bad !== -1)
        throw new Error(`第${bad + 2}行列数与表头不一致`);
    if (rows.length > 2000)
        throw new Error('演示导入最多2000行');
    return { headers, rows };
}

},
"src/lib/storage.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_KEY = void 0;
exports.readState = readState;
exports.writeState = writeState;
const mock_1 = require("../data/mock");
exports.STORAGE_KEY = 'regimelab.demo.v1';
function readState() {
    try {
        const raw = localStorage.getItem(exports.STORAGE_KEY);
        if (!raw)
            return (0, mock_1.initialState)();
        const s = JSON.parse(raw);
        if (s.schema !== 1 || !Array.isArray(s.users) || !Array.isArray(s.rules) || !Array.isArray(s.alerts))
            return (0, mock_1.initialState)();
        const base = (0, mock_1.initialState)();
        return { ...base, ...s, prefs: { ...base.prefs, ...s.prefs } };
    }
    catch {
        return (0, mock_1.initialState)();
    }
}
function writeState(state) {
    try {
        localStorage.setItem(exports.STORAGE_KEY, JSON.stringify(state));
        return true;
    }
    catch {
        return false;
    }
}

},
"src/main.tsx":function(module,exports,require){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("./App"));
require("./styles.css");
const root = document.getElementById('root');
if (!root)
    throw new Error('Missing #root element');
(0, client_1.createRoot)(root).render(react_1.default.createElement(App_1.default, null));

},
"src/pages/Alerts.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetail = AlertDetail;
exports.default = Alerts;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const charts_1 = require("../components/charts");
const Icon_1 = require("../components/Icon");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
const mock_1 = require("../data/mock");
const severityText = { high: '高风险', medium: '需关注', low: '信息提示' };
const statusText = { new: '待确认', acknowledged: '已确认', resolved: '已处理' };
function AlertDetail() {
    const app = (0, AppContext_1.useApp)();
    const alert = app.state.alerts.find(a => a.id === app.activeAlert), asset = app.assets.find(a => a.id === alert?.assetId);
    const [note, setNote] = (0, react_1.useState)(alert?.note || '');
    if (!alert || !asset)
        return react_1.default.createElement(ui_1.Modal, { title: "\u9884\u8B66\u4E0D\u53EF\u8BBF\u95EE", onClose: () => app.openAlert(null) },
            react_1.default.createElement(ui_1.Notice, { tone: "warning" }, "\u9884\u8B66\u4E0D\u5B58\u5728\u6216\u5F53\u524D\u89D2\u8272\u6CA1\u6709\u5BF9\u5E94\u8D44\u4EA7\u7684\u8BBF\u95EE\u6743\u9650\u3002"));
    const change = (status) => { if (app.update(s => ({ ...s, alerts: s.alerts.map(a => a.id === alert.id ? { ...a, status, owner: app.user?.name || '', updatedAt: new Date().toISOString(), note } : a) }), `${statusText[status]}预警 ${alert.id}`))
        app.notify(`预警${statusText[status]}`); };
    return react_1.default.createElement(ui_1.Modal, { title: "\u9884\u8B66\u8BE6\u60C5\u4E0E\u89E6\u53D1\u4F9D\u636E", drawer: true, onClose: () => app.openAlert(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Button, { icon: "check", disabled: !(0, analytics_1.canWrite)(app.user) || alert.status !== 'new', onClick: () => change('acknowledged') }, "\u786E\u8BA4\u9884\u8B66"),
            react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !(0, analytics_1.canWrite)(app.user) || alert.status === 'resolved', onClick: () => change('resolved') }, "\u6807\u8BB0\u5DF2\u5904\u7406")) },
        react_1.default.createElement("div", { className: "alert-detail-heading" },
            react_1.default.createElement("div", null,
                react_1.default.createElement(ui_1.Badge, { tone: alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'amber' : 'blue' }, severityText[alert.severity]),
                react_1.default.createElement(ui_1.Badge, null, statusText[alert.status])),
            react_1.default.createElement("h2", null, alert.title),
            react_1.default.createElement("p", null,
                (0, analytics_1.timeLabel)(alert.createdAt),
                " \u00B7 \u5408\u6210\u6570\u636E\u89E6\u53D1")),
        react_1.default.createElement("div", { className: "trigger-equation" },
            react_1.default.createElement("span", null, analytics_1.METRICS[alert.metric].label),
            react_1.default.createElement("strong", null,
                (0, analytics_1.number)(alert.value),
                react_1.default.createElement("small", null, analytics_1.METRICS[alert.metric].unit)),
            react_1.default.createElement("p", null,
                "\u89C4\u5219\u6761\u4EF6\uFF1A",
                alert.operator === 'gt' ? '>' : '<',
                " ",
                alert.threshold,
                analytics_1.METRICS[alert.metric].unit)),
        react_1.default.createElement("dl", { className: "key-values" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "\u5173\u8054\u8D44\u4EA7"),
                react_1.default.createElement("dd", null,
                    asset.name,
                    " \u00B7 ",
                    asset.symbol)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "\u89C4\u5219ID"),
                react_1.default.createElement("dd", { className: "mono" }, alert.ruleId)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "\u884C\u60C5\u5FEB\u7167\u65E5\u671F"),
                react_1.default.createElement("dd", null, alert.snapshotDate)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "\u5904\u7406\u4EBA"),
                react_1.default.createElement("dd", null, alert.owner || '尚未分配')),
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "\u6700\u8FD1\u66F4\u65B0"),
                react_1.default.createElement("dd", null, (0, analytics_1.timeLabel)(alert.updatedAt)))),
        react_1.default.createElement("div", { className: "detail-links" },
            react_1.default.createElement(ui_1.Button, { icon: "chart", onClick: () => { app.setSelectedAsset(asset.id); app.setSelectedFeature(alert.metric); app.openAlert(null); app.navigate('features'); } }, "\u67E5\u770B\u76F8\u5173\u7279\u5F81"),
            react_1.default.createElement(ui_1.Button, { icon: "branch", onClick: () => { app.setSelectedAsset(asset.id); app.setSelectedFeature(alert.metric); app.openAlert(null); app.navigate('lineage'); } }, "\u8FFD\u6EAF\u539F\u59CB\u6570\u636E")),
        react_1.default.createElement(ui_1.Field, { label: "\u5904\u7406\u8BF4\u660E" },
            react_1.default.createElement("textarea", { rows: 4, value: note, disabled: !(0, analytics_1.canWrite)(app.user), maxLength: 1000, placeholder: "\u8BB0\u5F55\u590D\u6838\u7ED3\u679C\u3001\u5904\u7406\u63AA\u65BD\u6216\u540E\u7EED\u5173\u6CE8\u4E8B\u9879\u2026", onChange: e => setNote(e.target.value) })),
        react_1.default.createElement(ui_1.Button, { disabled: !(0, analytics_1.canWrite)(app.user) || note === alert.note, onClick: () => change(alert.status) }, "\u4FDD\u5B58\u8BF4\u660E"),
        react_1.default.createElement(ui_1.Notice, null, "\u9884\u7F6E\u5386\u53F2\u9884\u8B66\u7528\u4E8E\u6F14\u793A\u6D41\u7A0B\u3002\u65B0\u9884\u8B66\u7531\u5B9E\u9645\u5408\u6210\u6307\u6807\u4E0E\u89C4\u5219\u6761\u4EF6\u6BD4\u8F83\u4EA7\u751F\uFF1B\u4E0D\u8FDE\u63A5\u4EFB\u4F55\u4EA4\u6613\u7CFB\u7EDF\u3002"));
}
function Alerts() {
    const app = (0, AppContext_1.useApp)(), { state, assets, user } = app;
    const [tab, setTab] = (0, react_1.useState)('inbox'), [query, setQuery] = (0, react_1.useState)(''), [status, setStatus] = (0, react_1.useState)('all'), [severity, setSeverity] = (0, react_1.useState)('all'), [selected, setSelected] = (0, react_1.useState)([]), [editing, setEditing] = (0, react_1.useState)(null), [error, setError] = (0, react_1.useState)(''), [deleting, setDeleting] = (0, react_1.useState)(null);
    const [btRule, setBtRule] = (0, react_1.useState)(state.rules[0]?.id || ''), [btAsset, setBtAsset] = (0, react_1.useState)(assets[0]?.id || ''), [horizon, setHorizon] = (0, react_1.useState)(5), [riskThreshold, setRiskThreshold] = (0, react_1.useState)(1), [backtest, setBacktest] = (0, react_1.useState)(null), [btBusy, setBtBusy] = (0, react_1.useState)(false);
    const alerts = state.alerts.filter(a => assets.some(x => x.id === a.assetId));
    const filtered = alerts.filter(a => (status === 'all' || a.status === status) && (severity === 'all' || a.severity === severity) && `${a.title} ${a.id}`.toLowerCase().includes(query.toLowerCase()));
    const counts = { new: alerts.filter(a => a.status === 'new').length, high: alerts.filter(a => a.severity === 'high' && a.status !== 'resolved').length, resolved: alerts.filter(a => a.status === 'resolved').length };
    const save = () => { if (!editing)
        return; const err = (0, analytics_1.validateRule)(editing); if (err) {
        setError(err);
        return;
    } const existed = state.rules.some(r => r.id === editing.id); if (app.update(s => ({ ...s, rules: existed ? s.rules.map(r => r.id === editing.id ? { ...editing, name: editing.name.trim() } : r) : [{ ...editing, name: editing.name.trim() }, ...s.rules] }), `${existed ? '更新' : '新建'}规则 ${editing.name}`)) {
        setEditing(null);
        app.notify('预警规则已保存');
    } };
    const newRule = () => { setError(''); setEditing({ id: (0, analytics_1.uid)('rule'), name: '', assetId: 'all', metric: 'volatility20', operator: 'gt', threshold: 8, severity: 'medium', cooldown: 30, enabled: true, createdAt: new Date().toISOString() }); };
    const testRule = () => { if (!editing)
        return; const err = (0, analytics_1.validateRule)(editing); if (err) {
        setError(err);
        return;
    } const matches = assets.filter(a => (0, analytics_1.ruleMatches)({ ...editing, enabled: true }, a)); setError(''); app.notify(matches.length ? `样本测试命中：${matches.map(a => a.name).join('、')}。未创建预警。` : '样本测试未命中。未创建预警。', 'info'); };
    const batchAck = () => { const allowed = filtered.filter(a => selected.includes(a.id) && a.status === 'new').map(a => a.id); if (!allowed.length)
        return; app.update(s => ({ ...s, alerts: s.alerts.map(a => allowed.includes(a.id) ? { ...a, status: 'acknowledged', owner: user?.name || '', updatedAt: new Date().toISOString() } : a) }), `批量确认 ${allowed.length} 条预警`); setSelected([]); app.notify(`已确认 ${allowed.length} 条预警`); };
    const runBacktest = () => {
        const rule = state.rules.find(r => r.id === btRule), asset = assets.find(a => a.id === btAsset);
        if (!rule || !asset || !Number.isInteger(horizon) || horizon < 1 || horizon > 20 || !Number.isFinite(riskThreshold) || riskThreshold <= 0) {
            app.notify('请检查规则、资产与回测参数', 'error');
            return;
        }
        if (rule.assetId !== 'all' && rule.assetId !== asset.id) {
            app.notify('该规则绑定了其他资产，请选择匹配资产。', 'error');
            return;
        }
        setBtBusy(true);
        setTimeout(() => {
            const result = { tp: 0, fp: 0, fn: 0, tn: 0, rule: rule.name, asset: asset.name, horizon, threshold: riskThreshold, dates: [], signals: [] };
            let n = 0;
            for (let i = 20; i < asset.prices.length - horizon; i++) {
                const date = asset.prices[i].date;
                if (date < app.from || date > app.to || asset.prices[i + horizon].date > app.to)
                    continue;
                const signal = (0, analytics_1.ruleMatches)({ ...rule, enabled: true }, { ...asset, prices: asset.prices.slice(0, i + 1) });
                const event = (0, analytics_1.maxDrawdown)(asset.prices.slice(i, i + horizon + 1).map(p => p.close)) >= riskThreshold;
                if (signal && event)
                    result.tp++;
                else if (signal)
                    result.fp++;
                else if (event)
                    result.fn++;
                else
                    result.tn++;
                if (signal)
                    n++;
                result.dates.push(date);
                result.signals.push(n);
            }
            setBacktest(result);
            setBtBusy(false);
            app.notify('已完成合成样本逐日条件评价；未调用模型服务。');
        }, 500);
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u9884\u8B66\u4E2D\u5FC3", actions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "activity", disabled: !(0, analytics_1.canWrite)(user), onClick: app.evaluateRules }, "\u68C0\u6D4B\u5F53\u524D\u89C4\u5219"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "plus", disabled: !(0, analytics_1.canWrite)(user), onClick: newRule }, "\u521B\u5EFA\u9884\u8B66\u89C4\u5219")) }),
        react_1.default.createElement("div", { className: "stats-grid" },
            react_1.default.createElement(ui_1.Stat, { label: "\u5F85\u786E\u8BA4\u9884\u8B66", value: counts.new, detail: "\u9700\u8981\u7814\u7A76\u4EBA\u5458\u590D\u6838", icon: "bell" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u672A\u5904\u7406\u9AD8\u98CE\u9669", value: counts.high, detail: "\u6309\u6F14\u793A\u89C4\u5219\u7684\u98CE\u9669\u7EA7\u522B", icon: "warning" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u542F\u7528\u7684\u89C4\u5219", value: react_1.default.createElement(react_1.default.Fragment, null,
                    state.rules.filter(r => r.enabled).length,
                    react_1.default.createElement("small", null,
                        "/ ",
                        state.rules.length)), detail: "\u51B7\u5374\u65F6\u95F4\u4E0E\u53BB\u91CD\u751F\u6548", icon: "settings" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u5DF2\u5904\u7406\u9884\u8B66", value: counts.resolved, detail: "\u5904\u7406\u8BB0\u5F55\u4FDD\u5B58\u5728\u672C\u6D4F\u89C8\u5668", icon: "check" })),
        react_1.default.createElement(ui_1.Tabs, { items: [{ id: 'inbox', label: '预警列表', count: alerts.length }, { id: 'rules', label: '规则管理', count: state.rules.length }, { id: 'backtest', label: '样本回测' }], value: tab, onChange: setTab }),
        tab === 'inbox' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "section-toolbar" },
                react_1.default.createElement("div", { className: "filter-row" },
                    react_1.default.createElement(ui_1.SearchBox, { value: query, onChange: setQuery, placeholder: "\u641C\u7D22\u9884\u8B66\u540D\u79F0\u6216\u7F16\u53F7" }),
                    react_1.default.createElement("select", { "aria-label": "\u9884\u8B66\u5904\u7406\u72B6\u6001", value: status, onChange: e => { setStatus(e.target.value); setSelected([]); } },
                        react_1.default.createElement("option", { value: "all" }, "\u5168\u90E8\u72B6\u6001"),
                        react_1.default.createElement("option", { value: "new" }, "\u5F85\u786E\u8BA4"),
                        react_1.default.createElement("option", { value: "acknowledged" }, "\u5DF2\u786E\u8BA4"),
                        react_1.default.createElement("option", { value: "resolved" }, "\u5DF2\u5904\u7406")),
                    react_1.default.createElement("select", { "aria-label": "\u9884\u8B66\u98CE\u9669\u7B49\u7EA7", value: severity, onChange: e => setSeverity(e.target.value) },
                        react_1.default.createElement("option", { value: "all" }, "\u5168\u90E8\u7B49\u7EA7"),
                        Object.entries(severityText).map(([id, label]) => react_1.default.createElement("option", { key: id, value: id }, label)))),
                react_1.default.createElement("div", { className: "row-actions" },
                    selected.length > 0 && react_1.default.createElement(ui_1.Button, { disabled: !(0, analytics_1.canWrite)(user), onClick: batchAck },
                        "\u6279\u91CF\u786E\u8BA4 (",
                        selected.length,
                        ")"),
                    react_1.default.createElement(ui_1.Button, { icon: "download", onClick: () => (0, files_1.downloadCsv)('预警记录-演示.csv', ['预警ID', '标题', '级别', '状态', '触发值', '阈值', '快照日期', '处理人', '说明'], filtered.map(a => [a.id, a.title, severityText[a.severity], statusText[a.status], a.value, a.threshold, a.snapshotDate, a.owner, a.note])) }, "\u5BFC\u51FA"))),
            react_1.default.createElement(ui_1.Card, { className: "table-card" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null,
                                    react_1.default.createElement("input", { type: "checkbox", "aria-label": "\u5168\u9009\u7B5B\u9009\u9884\u8B66", disabled: !(0, analytics_1.canWrite)(user) || !filtered.length, checked: !!filtered.length && filtered.every(a => selected.includes(a.id)), onChange: e => setSelected(e.target.checked ? filtered.map(a => a.id) : []) })),
                                react_1.default.createElement("th", null, "\u4FE1\u53F7 / \u89E6\u53D1\u65F6\u95F4"),
                                react_1.default.createElement("th", null, "\u98CE\u9669\u7EA7\u522B"),
                                react_1.default.createElement("th", null, "\u89E6\u53D1\u503C"),
                                react_1.default.createElement("th", null, "\u5904\u7406\u72B6\u6001"),
                                react_1.default.createElement("th", null, "\u5904\u7406\u4EBA"),
                                react_1.default.createElement("th", null))),
                        react_1.default.createElement("tbody", null, filtered.map(a => react_1.default.createElement("tr", { key: a.id },
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("input", { type: "checkbox", "aria-label": `选择${a.title}`, disabled: !(0, analytics_1.canWrite)(user), checked: selected.includes(a.id), onChange: e => setSelected(s => e.target.checked ? [...s, a.id] : s.filter(id => id !== a.id)) })),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("button", { type: "button", className: "asset-name", onClick: () => app.openAlert(a.id) },
                                    react_1.default.createElement("strong", null, a.title),
                                    react_1.default.createElement("small", null,
                                        (0, analytics_1.timeLabel)(a.createdAt),
                                        " \u00B7 ",
                                        a.id))),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, { tone: a.severity === 'high' ? 'red' : a.severity === 'medium' ? 'amber' : 'blue', dot: true }, severityText[a.severity])),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("span", { className: "mono" },
                                    (0, analytics_1.number)(a.value),
                                    "%"),
                                react_1.default.createElement("small", { className: "block muted" },
                                    "\u6761\u4EF6 ",
                                    a.operator === 'gt' ? '>' : '<',
                                    " ",
                                    a.threshold,
                                    "%")),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, { tone: a.status === 'new' ? 'amber' : a.status === 'resolved' ? 'green' : 'neutral' }, statusText[a.status])),
                            react_1.default.createElement("td", null, a.owner || '—'),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Button, { variant: "ghost", onClick: () => app.openAlert(a.id) },
                                    "\u8BE6\u60C5",
                                    react_1.default.createElement(Icon_1.Icon, { name: "chevron", size: 14 })))))))),
                !filtered.length && react_1.default.createElement(ui_1.Empty, { title: "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u9884\u8B66", description: "\u8C03\u6574\u7B5B\u9009\uFF0C\u6216\u521B\u5EFA\u89C4\u5219\u540E\u70B9\u51FB\u201C\u68C0\u6D4B\u5F53\u524D\u89C4\u5219\u201D\u3002" }),
                react_1.default.createElement("div", { className: "table-footer" },
                    react_1.default.createElement("span", null,
                        "\u5171 ",
                        filtered.length,
                        " \u6761 \u00B7 \u5FEB\u7167\u622A\u81F3 ",
                        mock_1.SNAPSHOT),
                    react_1.default.createElement("span", null, "\u9884\u8B66\u4E3A\u6F14\u793A\u6570\u636E\uFF0C\u4E0D\u8FDE\u63A5\u4EA4\u6613\u7CFB\u7EDF")))),
        tab === 'rules' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Notice, null, "\u89C4\u5219\u4EE5\u5F53\u524D\u5408\u6210\u65E5\u9891\u6837\u672C\u4E3A\u8F93\u5165\uFF0C\u652F\u6301\u9608\u503C\u3001\u4F5C\u7528\u8D44\u4EA7\u3001\u98CE\u9669\u7B49\u7EA7\u4E0E\u51B7\u5374\u53BB\u91CD\u3002\u201C\u68C0\u6D4B\u5F53\u524D\u89C4\u5219\u201D\u6267\u884C\u6761\u4EF6\u6BD4\u8F83\uFF1B\u9884\u8B66\u4E0D\u4F1A\u81EA\u52A8\u4E0B\u5355\u3002"),
            react_1.default.createElement("div", { className: "rules-grid" }, state.rules.map(r => react_1.default.createElement(ui_1.Card, { key: r.id, className: `rule-card ${!r.enabled ? 'rule-disabled' : ''}`, title: r.name, subtitle: r.assetId === 'all' ? '当前角色可访问的全部资产' : assets.find(a => a.id === r.assetId)?.name || '受限资产', action: react_1.default.createElement(ui_1.Toggle, { checked: r.enabled, disabled: !(0, analytics_1.canWrite)(user), label: `启用规则${r.name}`, onChange: enabled => app.update(s => ({ ...s, rules: s.rules.map(x => x.id === r.id ? { ...x, enabled } : x) }), `切换规则 ${r.name}`) }) },
                react_1.default.createElement("div", { className: "rule-condition" },
                    react_1.default.createElement("span", null, analytics_1.METRICS[r.metric].label),
                    react_1.default.createElement("strong", null,
                        r.operator === 'gt' ? '>' : '<',
                        " ",
                        r.threshold,
                        react_1.default.createElement("small", null, "%"))),
                react_1.default.createElement("div", { className: "rule-meta" },
                    react_1.default.createElement(ui_1.Badge, { tone: r.severity === 'high' ? 'red' : r.severity === 'medium' ? 'amber' : 'blue' }, severityText[r.severity]),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement(Icon_1.Icon, { name: "clock", size: 14 }),
                        r.cooldown,
                        " \u5206\u949F\u51B7\u5374")),
                react_1.default.createElement("div", { className: "rule-footer" },
                    react_1.default.createElement("small", { className: "mono muted" }, r.id),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(ui_1.IconButton, { icon: "edit", label: `编辑规则${r.name}`, disabled: !(0, analytics_1.canWrite)(user), onClick: () => { setEditing({ ...r }); setError(''); } }),
                        react_1.default.createElement(ui_1.IconButton, { icon: "trash", label: `删除规则${r.name}`, disabled: !(0, analytics_1.canWrite)(user), onClick: () => setDeleting(r.id) })))))),
            !state.rules.length && react_1.default.createElement(ui_1.Empty, { title: "\u5C1A\u672A\u521B\u5EFA\u89C4\u5219", action: react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !(0, analytics_1.canWrite)(user), onClick: newRule }, "\u65B0\u5EFA\u89C4\u5219") })),
        tab === 'backtest' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Notice, null, "\u8FD9\u91CC\u5B9E\u9645\u8BA1\u7B97\u5408\u6210\u6837\u672C\u7684\u9010\u65E5\u6761\u4EF6\u8BC4\u4EF7\uFF0C\u4E0D\u662F\u5B9E\u76D8\u3001\u4EA4\u6613\u7B56\u7565\u6216\u540E\u7AEF\u538B\u6D4B\u3002\u53C2\u8003\u4E8B\u4EF6\uFF1A\u672A\u6765N\u65E5\u7A97\u53E3\u5185\u6700\u5927\u56DE\u64A4\u8D85\u8FC7\u9608\u503C\u3002\u672A\u6765\u6570\u636E\u4EC5\u7528\u4E8E\u751F\u6210\u8BC4\u4EF7\u6807\u7B7E\uFF0C\u4E0D\u53C2\u4E0E\u5F53\u65E5\u89E6\u53D1\u6761\u4EF6\u3002"),
            react_1.default.createElement(ui_1.Card, { title: "\u6837\u672C\u8BC4\u4EF7\u8BBE\u7F6E", subtitle: `研究区间沿用全局范围 ${app.from} — ${app.to}` },
                react_1.default.createElement("div", { className: "backtest-controls" },
                    react_1.default.createElement(ui_1.Field, { label: "\u9884\u8B66\u89C4\u5219" },
                        react_1.default.createElement("select", { value: btRule, onChange: e => setBtRule(e.target.value) }, state.rules.map(r => react_1.default.createElement("option", { key: r.id, value: r.id }, r.name)))),
                    react_1.default.createElement(ui_1.Field, { label: "\u76EE\u6807\u8D44\u4EA7" },
                        react_1.default.createElement("select", { value: btAsset, onChange: e => setBtAsset(e.target.value) }, assets.map(a => react_1.default.createElement("option", { key: a.id, value: a.id }, a.name)))),
                    react_1.default.createElement(ui_1.Field, { label: "\u672A\u6765\u7A97\u53E3\uFF08\u89C2\u6D4B\u65E5\uFF09" },
                        react_1.default.createElement("input", { type: "number", min: 1, max: 20, value: horizon, onChange: e => setHorizon(Number(e.target.value)) })),
                    react_1.default.createElement(ui_1.Field, { label: "\u56DE\u64A4\u4E8B\u4EF6\u9608\u503C\uFF08%\uFF09" },
                        react_1.default.createElement("input", { type: "number", min: 0.1, step: 0.1, value: riskThreshold, onChange: e => setRiskThreshold(Number(e.target.value)) })),
                    react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "play", busy: btBusy, disabled: !state.rules.length, onClick: runBacktest }, "\u8FD0\u884C\u6837\u672C\u56DE\u6D4B"))),
            backtest && react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: "stats-grid" },
                    react_1.default.createElement(ui_1.Stat, { label: "\u7CBE\u786E\u7387 Precision", value: backtest.tp + backtest.fp ? `${(0, analytics_1.number)(backtest.tp / (backtest.tp + backtest.fp) * 100, 1)}%` : '—', detail: `TP ${backtest.tp} / 触发 ${backtest.tp + backtest.fp}` }),
                    react_1.default.createElement(ui_1.Stat, { label: "\u53EC\u56DE\u7387 Recall", value: backtest.tp + backtest.fn ? `${(0, analytics_1.number)(backtest.tp / (backtest.tp + backtest.fn) * 100, 1)}%` : '—', detail: `TP ${backtest.tp} / 事件 ${backtest.tp + backtest.fn}` }),
                    react_1.default.createElement(ui_1.Stat, { label: "\u8BEF\u62A5 / \u6F0F\u62A5", value: `${backtest.fp} / ${backtest.fn}`, detail: "\u6309\u89C2\u6D4B\u65E5\u7EDF\u8BA1\uFF0C\u4E0D\u5408\u5E76\u91CD\u53E0\u4E8B\u4EF6" }),
                    react_1.default.createElement(ui_1.Stat, { label: "\u6709\u6548\u8BC4\u4EF7\u6837\u672C", value: backtest.dates.length, detail: "\u6392\u9664\u672A\u6765\u7A97\u53E3\u4E0D\u5B8C\u6574\u7684\u89C2\u6D4B\u65E5" })),
                react_1.default.createElement(ui_1.Card, { title: "\u7D2F\u8BA1\u89E6\u53D1\u89C2\u6D4B\u65E5", subtitle: `${backtest.asset} · ${backtest.rule} · 未来${backtest.horizon}日回撤 ≥ ${backtest.threshold}%` },
                    react_1.default.createElement("div", { className: "card-inner" }, backtest.dates.length ? react_1.default.createElement(charts_1.TimeChart, { labels: backtest.dates, series: [{ name: '累计触发', values: backtest.signals }], unit: "\u6B21" }) : react_1.default.createElement(ui_1.Empty, { title: "\u533A\u95F4\u5185\u6CA1\u6709\u8DB3\u591F\u6837\u672C", description: "\u8BF7\u6269\u5927\u533A\u95F4\u6216\u51CF\u5C0F\u672A\u6765\u7A97\u53E3\u3002" }))),
                react_1.default.createElement("p", { className: "muted small" }, "\u6B64\u8BC4\u4EF7\u5FFD\u7565\u901A\u77E5\u51B7\u5374\uFF0C\u4EC5\u8861\u91CF\u6BCF\u65E5\u89C4\u5219\u6761\u4EF6\uFF1B\u540C\u4E00\u4E8B\u4EF6\u53EF\u8986\u76D6\u591A\u4E2A\u91CD\u53E0\u7A97\u53E3\u3002\u96F6\u5206\u6BCD\u663E\u793A\u201C\u2014\u201D\uFF0C\u4E0D\u865A\u6784100%\u6307\u6807\u3002\u672A\u8003\u8651\u4EA4\u6613\u8D39\u7528\u6216\u6536\u76CA\u3002"))),
        editing && react_1.default.createElement(ui_1.Modal, { title: `${state.rules.some(r => r.id === editing.id) ? '编辑' : '创建'}预警规则`, onClose: () => setEditing(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "play", onClick: testRule }, "\u6D4B\u8BD5\u5F53\u524D\u6837\u672C"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", onClick: save }, "\u4FDD\u5B58\u89C4\u5219")) },
            react_1.default.createElement(ui_1.Field, { label: "\u89C4\u5219\u540D\u79F0" },
                react_1.default.createElement("input", { value: editing.name, maxLength: 48, placeholder: "\u4F8B\u5982\uFF1A\u6CE2\u52A8\u7387\u663E\u8457\u4E0A\u5347", onChange: e => setEditing({ ...editing, name: e.target.value }) })),
            react_1.default.createElement(ui_1.Field, { label: "\u4F5C\u7528\u8D44\u4EA7" },
                react_1.default.createElement("select", { value: editing.assetId, onChange: e => setEditing({ ...editing, assetId: e.target.value }) },
                    react_1.default.createElement("option", { value: "all" }, "\u5168\u90E8\u53EF\u8BBF\u95EE\u8D44\u4EA7"),
                    assets.map(a => react_1.default.createElement("option", { key: a.id, value: a.id }, a.name)))),
            react_1.default.createElement(ui_1.Field, { label: "\u76D1\u6D4B\u6307\u6807" },
                react_1.default.createElement("select", { value: editing.metric, onChange: e => setEditing({ ...editing, metric: e.target.value }) }, Object.entries(analytics_1.METRICS).map(([id, m]) => react_1.default.createElement("option", { key: id, value: id },
                    m.label,
                    " (",
                    m.unit,
                    ")")))),
            react_1.default.createElement("div", { className: "form-grid" },
                react_1.default.createElement(ui_1.Field, { label: "\u6BD4\u8F83\u6761\u4EF6" },
                    react_1.default.createElement("select", { value: editing.operator, onChange: e => setEditing({ ...editing, operator: e.target.value }) },
                        react_1.default.createElement("option", { value: "gt" }, "\u5927\u4E8E (>)"),
                        react_1.default.createElement("option", { value: "lt" }, "\u5C0F\u4E8E (<)"))),
                react_1.default.createElement(ui_1.Field, { label: "\u9608\u503C\uFF08%\uFF09" },
                    react_1.default.createElement("input", { type: "number", step: "any", value: Number.isFinite(editing.threshold) ? editing.threshold : '', onChange: e => setEditing({ ...editing, threshold: e.target.value === '' ? NaN : Number(e.target.value) }) })),
                react_1.default.createElement(ui_1.Field, { label: "\u98CE\u9669\u7B49\u7EA7" },
                    react_1.default.createElement("select", { value: editing.severity, onChange: e => setEditing({ ...editing, severity: e.target.value }) }, Object.entries(severityText).map(([id, value]) => react_1.default.createElement("option", { key: id, value: id }, value)))),
                react_1.default.createElement(ui_1.Field, { label: "\u51B7\u5374\u65F6\u95F4\uFF08\u5206\u949F\uFF09" },
                    react_1.default.createElement("input", { type: "number", min: 1, max: 1440, value: editing.cooldown, onChange: e => setEditing({ ...editing, cooldown: Number(e.target.value) }) }))),
            error && react_1.default.createElement(ui_1.Notice, { tone: "warning" }, error),
            react_1.default.createElement("p", { className: "muted small" }, "\u89E6\u53D1\u8BB0\u5F55\u4EE5\u201C\u89C4\u5219ID + \u8D44\u4EA7ID\u201D\u53BB\u91CD\uFF0C\u5E76\u9075\u5B88\u51B7\u5374\u65F6\u95F4\u3002\u6D4B\u8BD5\u4E0D\u4F1A\u521B\u5EFA\u9884\u8B66\u3002")),
        deleting && react_1.default.createElement(ui_1.Modal, { title: "\u5220\u9664\u8FD9\u6761\u9884\u8B66\u89C4\u5219\uFF1F", onClose: () => setDeleting(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setDeleting(null) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "danger", onClick: () => { app.update(s => ({ ...s, rules: s.rules.filter(r => r.id !== deleting) }), '删除预警规则'); setDeleting(null); app.notify('规则已删除，历史预警记录保留'); } }, "\u786E\u8BA4\u5220\u9664")) },
            react_1.default.createElement("p", null, "\u5220\u9664\u540E\u4E0D\u518D\u53C2\u4E0E\u68C0\u6D4B\u3002\u5DF2\u4EA7\u751F\u7684\u5386\u53F2\u9884\u8B66\u4ECD\u4FDD\u7559\u89E6\u53D1\u6761\u4EF6\u5FEB\u7167\uFF0C\u4FBF\u4E8E\u5BA1\u8BA1\u3002")));
}

},
"src/pages/Api.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Api;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const Icon_1 = require("../components/Icon");
const mockApi_1 = require("../services/mockApi");
const httpClient_1 = require("../services/httpClient");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
const ENDPOINTS = [['GET', '/assets', '资产与行情查询'], ['GET', '/features', '特征快照查询'], ['GET', '/states', '状态查询'], ['GET', '/alerts', '预警查询'], ['GET', '/rules', '规则查询'], ['POST', '/rules', '创建预警规则']];
const SAMPLE_RULE = JSON.stringify({ name: 'API创建的演示规则', assetId: 'all', metric: 'volatility20', operator: 'gt', threshold: 8, severity: 'medium', cooldown: 30, enabled: true }, null, 2);
function Api() {
    const app = (0, AppContext_1.useApp)();
    const [tab, setTab] = (0, react_1.useState)('rest'), [method, setMethod] = (0, react_1.useState)('GET'), [path, setPath] = (0, react_1.useState)('/assets'), [payload, setPayload] = (0, react_1.useState)(SAMPLE_RULE), [query, setQuery] = (0, react_1.useState)(mockApi_1.WORKSPACE_QUERY), [busy, setBusy] = (0, react_1.useState)(false), [response, setResponse] = (0, react_1.useState)(''), [status, setStatus] = (0, react_1.useState)(null), [ms, setMs] = (0, react_1.useState)(0), [mode, setMode] = (0, react_1.useState)('mock'), [base, setBase] = (0, react_1.useState)(({ VITE_API_BASE_URL: '/api', VITE_WS_URL: '' }).VITE_API_BASE_URL || '/api'), [eventType, setEventType] = (0, react_1.useState)('all');
    const run = async () => {
        setBusy(true);
        const start = performance.now();
        try {
            let body = undefined;
            const reqMethod = tab === 'graphql' ? 'POST' : method, reqPath = tab === 'graphql' ? '/graphql' : path;
            if (tab === 'graphql')
                body = { query };
            else if (method !== 'GET')
                body = JSON.parse(payload);
            if (mode === 'mock') {
                await new Promise(r => setTimeout(r, 180));
                const result = (0, mockApi_1.mockRequest)(reqMethod, reqPath, body, app.state, app.user);
                setStatus(result.status);
                setResponse(JSON.stringify(result.body, null, 2));
                if (result.nextState)
                    app.update(() => result.nextState, '通过模拟API创建规则');
            }
            else {
                if (!base.trim())
                    throw new Error('请输入API Base URL');
                const result = await (0, httpClient_1.requestJson)(base, reqPath, { method: reqMethod, body });
                setStatus(result.status);
                setResponse(JSON.stringify(result.body, null, 2));
            }
        }
        catch (e) {
            setStatus(0);
            setResponse(JSON.stringify({ error: e instanceof Error ? e.message : '请求失败', note: '错误不会被静默替换成模拟成功结果。' }, null, 2));
        }
        finally {
            setMs(Math.round(performance.now() - start));
            setBusy(false);
        }
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "API \u5DE5\u4F5C\u53F0", actions: react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u9ED8\u8BA4\u4EC5\u672C\u5730\u6A21\u62DF") }),
        react_1.default.createElement(ui_1.Tabs, { items: [{ id: 'rest', label: 'RESTful API' }, { id: 'graphql', label: 'GraphQL' }, { id: 'websocket', label: 'WebSocket 事件' }, { id: 'docs', label: '接口文档' }], value: tab, onChange: v => { setTab(v); setResponse(''); setStatus(null); } }),
        ['rest', 'graphql'].includes(tab) && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "api-mode-bar" },
                react_1.default.createElement(ui_1.Field, { label: "\u8BF7\u6C42\u73AF\u5883" },
                    react_1.default.createElement("select", { value: mode, onChange: e => { setMode(e.target.value); setResponse(''); } },
                        react_1.default.createElement("option", { value: "mock" }, "\u672C\u5730\u6A21\u62DF\uFF08\u4E0D\u53D1\u8D77\u7F51\u7EDC\u8BF7\u6C42\uFF09"),
                        react_1.default.createElement("option", { value: "real" }, "\u771F\u5B9EAPI\u6D4B\u8BD5\uFF08\u624B\u52A8\u6267\u884C\uFF09"))),
                mode === 'real' && react_1.default.createElement(ui_1.Field, { label: "API Base URL" },
                    react_1.default.createElement("input", { value: base, onChange: e => setBase(e.target.value), placeholder: "https://api.example.com/api" })),
                react_1.default.createElement("span", { className: "muted small" },
                    "\u5F53\u524D\u8EAB\u4EFD\uFF1A",
                    app.user?.name,
                    " \u00B7 \u9650\u6D41 ",
                    app.state.apiLimit,
                    " \u6B21/\u5206\u949F\uFF08\u6A21\u62DF\uFF09")),
            mode === 'real' && react_1.default.createElement(ui_1.Notice, { tone: "warning" }, "\u70B9\u51FB\u53D1\u9001\u540E\u624D\u4F1A\u8BBF\u95EE\u6B64\u5730\u5740\u3002\u4E0D\u4F1A\u643A\u5E26\u6F14\u793A\u8EAB\u4EFD\u6216\u4EFB\u4F55JWT\uFF1B\u771F\u5B9E\u670D\u52A1\u5E94\u8FD4\u56DE401\u76F4\u81F3\u5B8C\u6210\u8BA4\u8BC1\u63A5\u5165\u3002\u524D\u7AEF\u8DE8\u57DF\u9700\u8981\u540E\u7AEF\u914D\u7F6ECORS\u3002"),
            react_1.default.createElement("div", { className: "api-layout" },
                react_1.default.createElement(ui_1.Card, { title: tab === 'rest' ? '接口目录' : '查询模板', subtitle: tab === 'rest' ? '点击接口填入请求' : '仅支持预设工作台查询' },
                    react_1.default.createElement("div", { className: "endpoint-list" }, tab === 'rest' ? ENDPOINTS.map(([m, p, label]) => react_1.default.createElement("button", { type: "button", key: m + p, className: m === method && p === path ? 'active' : '', onClick: () => { setMethod(m); setPath(p); setPayload(SAMPLE_RULE); } },
                        react_1.default.createElement("span", { className: `method method-${m}` }, m),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("code", null, p),
                            react_1.default.createElement("small", null, label)))) : react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("button", { type: "button", className: "active", onClick: () => setQuery(mockApi_1.WORKSPACE_QUERY) },
                            react_1.default.createElement(Icon_1.Icon, { name: "branch" }),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("strong", null, "WorkspaceSnapshot"),
                                react_1.default.createElement("small", null, "\u8D44\u4EA7 + \u72B6\u6001 + \u672A\u8BFB\u9884\u8B66"))),
                        react_1.default.createElement("p", { className: "small muted padded" }, "\u6A21\u62DF\u5668\u4E0D\u5305\u542B\u5B8C\u6574GraphQL\u89E3\u6790\u4E0E\u9A8C\u8BC1\u3002\u4FEE\u6539\u6210\u5176\u4ED6\u67E5\u8BE2\u4F1A\u8FD4\u56DE400\uFF0C\u907F\u514D\u4F2A\u88C5\u4E3A\u771F\u5B9EGraphQL\u5F15\u64CE\u3002")))),
                react_1.default.createElement(ui_1.Card, { title: "\u8BF7\u6C42\u4E0E\u54CD\u5E94", action: react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "play", busy: busy, onClick: run },
                        "\u53D1\u9001",
                        mode === 'mock' ? '模拟' : '真实',
                        "\u8BF7\u6C42") },
                    react_1.default.createElement("div", { className: "card-inner" },
                        tab === 'rest' ? react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("div", { className: "request-line" },
                                react_1.default.createElement("select", { "aria-label": "HTTP\u65B9\u6CD5", value: method, onChange: e => setMethod(e.target.value) },
                                    react_1.default.createElement("option", null, "GET"),
                                    react_1.default.createElement("option", null, "POST"),
                                    react_1.default.createElement("option", null, "PATCH"),
                                    react_1.default.createElement("option", null, "DELETE")),
                                react_1.default.createElement("input", { "aria-label": "API\u8DEF\u5F84", value: path, onChange: e => setPath(e.target.value) })),
                            method !== 'GET' && react_1.default.createElement(ui_1.Field, { label: "JSON \u8BF7\u6C42\u4F53" },
                                react_1.default.createElement("textarea", { className: "code-input", rows: 10, value: payload, onChange: e => setPayload(e.target.value), spellCheck: false }))) : react_1.default.createElement(ui_1.Field, { label: "GraphQL Query" },
                            react_1.default.createElement("textarea", { className: "code-input", rows: 8, value: query, onChange: e => setQuery(e.target.value), spellCheck: false })),
                        react_1.default.createElement("div", { className: "response-title" },
                            react_1.default.createElement("strong", null, "\u54CD\u5E94\u7ED3\u679C"),
                            status !== null && react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(ui_1.Badge, { tone: status >= 200 && status < 300 ? 'green' : 'red' }, status || 'Network error'),
                                react_1.default.createElement("span", null,
                                    ms,
                                    " ms ",
                                    mode === 'mock' ? '（含人为延时，非性能测量）' : '（浏览器请求）')),
                            react_1.default.createElement(ui_1.Button, { variant: "ghost", disabled: !response, icon: "download", onClick: () => (0, files_1.downloadFile)('api-response.json', response, 'application/json') }, "\u5BFC\u51FA")),
                        react_1.default.createElement("pre", { className: "code-block response-block" }, response || '// 选择接口并发送请求，查看结构化结果。\n// 模拟模式支持 200 / 201 / 400 / 401 / 403 / 404 / 429 响应。'))))),
        tab === 'websocket' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Notice, null, "\u8FD9\u662F\u6D4F\u89C8\u5668\u5B9A\u65F6\u5668\u4EA7\u751F\u7684\u6A21\u62DF\u4E8B\u4EF6\u6D41\uFF0C\u672A\u5EFA\u7ACB\u771F\u5B9EWebSocket\u8FDE\u63A5\u3002\u4E8B\u4EF6\u4F7F\u7528\u9884\u7559\u4E3B\u9898\u548Cpayload\u7ED3\u6784\uFF1B\u5386\u53F2\u4EF7\u683C\u4E0D\u4F1A\u56E0\u6A21\u62DF\u6D88\u606F\u800C\u88AB\u7BE1\u6539\u3002"),
            react_1.default.createElement(ui_1.Card, { title: "\u4E8B\u4EF6\u8BA2\u9605\u63A7\u5236\u53F0", subtitle: "\u6A21\u62DF market.tick / regime.updated / alert.created", action: react_1.default.createElement("div", { className: "row-actions" },
                    react_1.default.createElement(ui_1.Badge, { dot: true, tone: app.state.prefs.live ? 'green' : 'neutral' }, app.state.prefs.live ? '模拟流已启用' : '模拟流已暂停'),
                    react_1.default.createElement(ui_1.Toggle, { checked: app.state.prefs.live, label: "\u5207\u6362\u6A21\u62DF\u4E8B\u4EF6\u63A8\u9001", onChange: live => app.update(s => ({ ...s, prefs: { ...s.prefs, live } }), undefined, 'self') })) },
                react_1.default.createElement("div", { className: "section-toolbar padded" },
                    react_1.default.createElement("select", { "aria-label": "\u8BA2\u9605\u4E3B\u9898\u7B5B\u9009", value: eventType, onChange: e => setEventType(e.target.value) },
                        react_1.default.createElement("option", { value: "all" }, "\u5168\u90E8\u4E3B\u9898"),
                        react_1.default.createElement("option", null, "market.tick"),
                        react_1.default.createElement("option", null, "regime.updated"),
                        react_1.default.createElement("option", null, "alert.created")),
                    react_1.default.createElement(ui_1.Button, { icon: "trash", onClick: app.clearEvents }, "\u6E05\u7A7A\u4E8B\u4EF6\u8BB0\u5F55")),
                react_1.default.createElement("div", { className: "event-console" },
                    app.events.filter(e => (eventType === 'all' || e.type === eventType) && (!e.payload.assetId || app.assets.some(a => a.id === e.payload.assetId))).map(e => react_1.default.createElement("div", { key: e.id, className: "event-row" },
                        react_1.default.createElement("span", null, (0, analytics_1.timeLabel)(e.at)),
                        react_1.default.createElement("b", { className: `event-type ${e.type === 'alert.created' ? 'event-alert' : ''}` }, e.type),
                        react_1.default.createElement("code", null, JSON.stringify(e.payload)))),
                    !app.events.length && react_1.default.createElement("p", { className: "console-empty" }, app.state.prefs.live ? '等待模拟事件… 每5秒生成一个行情事件。' : '模拟事件已暂停，启用后开始接收。')),
                react_1.default.createElement("div", { className: "card-footnote" }, "\u4FDD\u7559\u6700\u8FD160\u6761\u4E8B\u4EF6\u3002\u70B9\u51FB\u9884\u8B66\u4E2D\u5FC3\u201C\u68C0\u6D4B\u5F53\u524D\u89C4\u5219\u201D\u53EF\u751F\u6210 alert.created \u4E8B\u4EF6\u3002"))),
        tab === 'docs' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Card, { title: "\u63A5\u53E3\u5951\u7EA6\u6982\u89C8", subtitle: "\u5B8C\u6574OpenAPI\u8349\u6848\u4F4D\u4E8E docs/openapi.yaml\uFF1B\u4EE5\u4E0B\u4E3A\u5B9E\u9645\u6A21\u62DF\u5668\u652F\u6301\u7684\u63A5\u53E3" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u65B9\u6CD5"),
                                react_1.default.createElement("th", null, "\u8DEF\u5F84"),
                                react_1.default.createElement("th", null, "\u804C\u8D23"),
                                react_1.default.createElement("th", null, "\u6743\u9650 / \u884C\u4E3A"))),
                        react_1.default.createElement("tbody", null,
                            ENDPOINTS.map(([method, path, desc]) => react_1.default.createElement("tr", { key: method + path },
                                react_1.default.createElement("td", null,
                                    react_1.default.createElement("span", { className: `method method-${method}` }, method)),
                                react_1.default.createElement("td", { className: "mono" }, path),
                                react_1.default.createElement("td", null, desc),
                                react_1.default.createElement("td", null, method === 'GET' ? '已登录；按资产范围过滤' : '分析师 / 管理员；参数验证'))),
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("td", null,
                                    react_1.default.createElement("span", { className: "method method-POST" }, "POST")),
                                react_1.default.createElement("td", { className: "mono" }, "/graphql"),
                                react_1.default.createElement("td", null, "\u5DE5\u4F5C\u53F0\u805A\u5408\u67E5\u8BE2"),
                                react_1.default.createElement("td", null, "\u9884\u8BBEWorkspaceSnapshot\u67E5\u8BE2")))))),
            react_1.default.createElement("div", { className: "two-col" },
                react_1.default.createElement(ui_1.Card, { title: "\u9274\u6743\u4E0E\u9519\u8BEF\u7EA6\u5B9A" },
                    react_1.default.createElement("div", { className: "card-inner" },
                        react_1.default.createElement("pre", { className: "code-block" }, JSON.stringify({ requestId: 'req-...', mock: true, error: { code: 'FORBIDDEN_ASSET', message: '当前角色不可访问该资产' } }, null, 2)),
                        react_1.default.createElement("p", { className: "small muted" }, "\u5B9E\u9645\u9879\u76EE\u7528JWT/OAuth2\u5728\u670D\u52A1\u7AEF\u9A8C\u8BC1\u8EAB\u4EFD\u3002\u8FD9\u91CC\u7684\u89D2\u8272\u9009\u62E9\u53EA\u6F14\u793AUI\u884C\u4E3A\uFF0C\u4E0D\u63D0\u4F9B\u8EAB\u4EFD\u5B89\u5168\u3002"))),
                react_1.default.createElement(ui_1.Card, { title: "\u5B9E\u65F6\u4E8B\u4EF6\u7EA6\u5B9A" },
                    react_1.default.createElement("div", { className: "card-inner" },
                        react_1.default.createElement("pre", { className: "code-block" }, JSON.stringify({ id: 'evt-...', type: 'regime.updated', at: 'ISO-8601', payload: { assetId: 'csi300', regime: 'bull', snapshotDate: '2026-10-09', mock: true } }, null, 2)),
                        react_1.default.createElement("p", { className: "small muted" }, "\u771F\u5B9E\u8FDE\u63A5\u9700\u8865\u9F50\u6388\u6743\u3001\u91CD\u8FDE\u9000\u907F\u3001\u8BA2\u9605\u786E\u8BA4\u3001\u5FC3\u8DF3\u3001\u5E8F\u53F7\u53BB\u91CD\u548C\u65AD\u7EBF\u5FEB\u7167\u8865\u53D6\u3002"))))));
}

},
"src/pages/Features.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Features;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const charts_1 = require("../components/charts");
const DateRange_1 = require("../components/DateRange");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
function featureValues(a, id, dates, window = 20) {
    return dates.map(date => { const ps = a.prices.filter(p => p.date <= date); if (id in analytics_1.METRICS)
        return (0, analytics_1.metrics)(ps)[id]; if (id === 'corr')
        return (0, analytics_1.correlation)((0, analytics_1.returns)(ps).slice(-window), (0, analytics_1.returns)(ps).slice(-window - 1, -1)); if (id === 'sentiment')
        return Math.sin(ps.length / 8) * 1.5; return NaN; });
}
function Features() {
    const app = (0, AppContext_1.useApp)(), { assets, state, user, from, to } = app;
    const [tab, setTab] = (0, react_1.useState)('analysis'), [query, setQuery] = (0, react_1.useState)(''), [editing, setEditing] = (0, react_1.useState)(null), [error, setError] = (0, react_1.useState)('');
    const [pair, setPair] = (0, react_1.useState)(null), [deleteId, setDeleteId] = (0, react_1.useState)(null);
    const asset = assets.find(a => a.id === app.selectedAsset) || assets[0];
    const feature = state.features.find(f => f.id === app.selectedFeature) || state.features[0];
    const dates = asset ? (0, analytics_1.sliceDates)(asset.prices, from, to).map(p => p.date) : [];
    const bond = assets.find(a => a.id === 'cn-bond');
    const values = asset ? feature.id === 'corr' && bond ? dates.map(date => (0, analytics_1.correlation)((0, analytics_1.returns)(asset.prices.filter(p => p.date <= date)).slice(-20), (0, analytics_1.returns)(bond.prices.filter(p => p.date <= date)).slice(-20))) : featureValues(asset, feature.id, dates, feature.window) : [];
    const finite = values.filter(Number.isFinite), last = finite.at(-1) || 0;
    const bins = Array.from({ length: 12 }, () => 0);
    const min = Math.min(...finite), max = Math.max(...finite);
    for (const v of finite)
        bins[Math.min(11, Math.floor((v - min) / (max - min || 1) * 12))]++;
    const pca = (0, react_1.useMemo)(() => {
        const samples = assets.flatMap(a => a.prices.filter((p, i) => p.date >= from && p.date <= to && i >= 20 && i % 5 === 0).map(p => { const ps = a.prices.filter(x => x.date <= p.date), m = (0, analytics_1.metrics)(ps); return { values: [m.return1d, m.momentum20, m.volatility20], label: `${a.name} ${p.date}`, regime: (0, analytics_1.sampleRegime)(ps).regime }; }));
        return (0, analytics_1.calculatePca)(samples);
    }, [assets, from, to]);
    const save = () => {
        if (!editing)
            return;
        if (!editing.name.trim() || !editing.formula.trim()) {
            setError('请填写特征名称和公式说明');
            return;
        }
        if (!Number.isInteger(editing.window) || editing.window < 1 || editing.window > 3650) {
            setError('窗口需为1–3650的整数');
            return;
        }
        const existing = state.features.some(f => f.id === editing.id);
        const dup = state.features.some(f => f.id !== editing.id && f.name.trim() === editing.name.trim());
        if (dup) {
            setError('特征名称不能重复');
            return;
        }
        if (app.update(s => ({ ...s, features: existing ? s.features.map(f => f.id === editing.id ? { ...editing, version: `v${(0, analytics_1.number)(Number(f.version.slice(1)) + 0.1, 1)}` } : f) : [...s.features, editing] }), `${existing ? '更新' : '创建'}特征定义 ${editing.name}`)) {
            setEditing(null);
            app.notify('特征定义已保存；自定义公式不会在浏览器执行。');
        }
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u7279\u5F81\u5B9E\u9A8C\u5BA4", actions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "download", onClick: () => { (0, files_1.downloadCsv)('特征序列-模拟数据.csv', ['日期', '资产', '特征', '数值', '单位', '数据性质'], dates.map((date, i) => [date, asset?.name, feature.name, Number.isFinite(values[i]) ? values[i].toFixed(4) : '未计算', feature.unit, '合成数据'])); app.notify('已导出当前特征序列'); } }, "\u5BFC\u51FA\u7279\u5F81"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "plus", disabled: !(0, analytics_1.canWrite)(user), onClick: () => { setError(''); setEditing({ id: (0, analytics_1.uid)('custom'), name: '', category: '动量与趋势', formula: '', description: '', window: 20, unit: '%', version: 'v1.0', enabled: false, importance: 0 }); } }, "\u65B0\u5EFA\u7279\u5F81\u5B9A\u4E49")) }),
        react_1.default.createElement(ui_1.Tabs, { items: [{ id: 'analysis', label: '特征分析' }, { id: 'correlation', label: '相关性矩阵' }, { id: 'pca', label: 'PCA 降维' }, { id: 'catalog', label: '特征目录', count: state.features.length }], value: tab, onChange: setTab }),
        tab !== 'catalog' && react_1.default.createElement("div", { className: "section-toolbar" },
            react_1.default.createElement("div", { className: "filter-row" },
                react_1.default.createElement("select", { "aria-label": "\u7279\u5F81\u8D44\u4EA7", value: asset?.id || '', onChange: e => app.setSelectedAsset(e.target.value) }, assets.map(a => react_1.default.createElement("option", { key: a.id, value: a.id }, a.name))),
                tab === 'analysis' && react_1.default.createElement("select", { "aria-label": "\u9009\u62E9\u7279\u5F81", value: feature.id, onChange: e => app.setSelectedFeature(e.target.value) }, state.features.map(f => react_1.default.createElement("option", { key: f.id, value: f.id }, f.name)))),
            react_1.default.createElement(DateRange_1.DateRange, null)),
        tab === 'analysis' && react_1.default.createElement(react_1.default.Fragment, null,
            !finite.length ? react_1.default.createElement(ui_1.Notice, { tone: "warning" }, "\u5F53\u524D\u81EA\u5B9A\u4E49\u7279\u5F81\u53EA\u6709\u76EE\u5F55\u5B9A\u4E49\uFF0C\u5C1A\u672A\u8FDE\u63A5\u7279\u5F81\u8BA1\u7B97\u670D\u52A1\uFF0C\u4E0D\u80FD\u5C55\u793A\u8BA1\u7B97\u7ED3\u679C\u3002") : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: "stats-grid" },
                    react_1.default.createElement(ui_1.Stat, { label: "\u5F53\u524D\u7279\u5F81\u503C", value: react_1.default.createElement(react_1.default.Fragment, null,
                            (0, analytics_1.number)(last),
                            react_1.default.createElement("small", null, feature.unit)), icon: "activity", detail: `截至 ${to}` }),
                    react_1.default.createElement(ui_1.Stat, { label: "\u533A\u95F4\u5747\u503C", value: (0, analytics_1.number)((0, analytics_1.mean)(finite)), icon: "chart", detail: `${dates.length} 个日频观测` }),
                    react_1.default.createElement(ui_1.Stat, { label: "\u6837\u672C\u6807\u51C6\u5DEE", value: (0, analytics_1.number)((0, analytics_1.stdev)(finite)), icon: "layers", detail: "\u6240\u9009\u7814\u7A76\u533A\u95F4" }),
                    react_1.default.createElement(ui_1.Stat, { label: "\u7279\u5F81\u7248\u672C", value: feature.version, icon: "branch", detail: `${feature.window} 日窗口 · ${feature.category}` })),
                react_1.default.createElement("div", { className: "two-col analysis-grid" },
                    react_1.default.createElement(ui_1.Card, { title: `${feature.name} · 时间序列`, subtitle: feature.description, action: react_1.default.createElement(ui_1.Badge, { tone: "green" }, "\u672C\u5730\u8BA1\u7B97") },
                        react_1.default.createElement("div", { className: "card-inner" },
                            react_1.default.createElement(charts_1.TimeChart, { labels: dates, series: [{ name: feature.name, values }], unit: feature.unit, height: 260 })),
                        react_1.default.createElement("div", { className: "formula-line" },
                            react_1.default.createElement("code", null, feature.formula),
                            react_1.default.createElement(ui_1.Button, { variant: "ghost", icon: "branch", onClick: () => app.navigate('lineage') }, "\u8FFD\u6EAF\u6765\u6E90"))),
                    react_1.default.createElement(ui_1.Card, { title: "\u7279\u5F81\u5206\u5E03", subtitle: "\u5F53\u524D\u533A\u95F4\u7684\u9891\u6570\u5206\u5E03" },
                        react_1.default.createElement("div", { className: "histogram" }, bins.map((v, i) => react_1.default.createElement("div", { className: "histogram-bin", key: i, title: `${(0, analytics_1.number)(min + i / 12 * (max - min))} ～ ${(0, analytics_1.number)(min + (i + 1) / 12 * (max - min))}：${v}个观测` },
                            react_1.default.createElement("span", { style: { height: `${Math.max(2, v / Math.max(1, ...bins) * 100)}%` } })))),
                        react_1.default.createElement("div", { className: "hist-axis" },
                            react_1.default.createElement("span", null, (0, analytics_1.number)(min)),
                            react_1.default.createElement("span", null, (0, analytics_1.number)((min + max) / 2)),
                            react_1.default.createElement("span", null, (0, analytics_1.number)(max))),
                        react_1.default.createElement("div", { className: "distribution-info" },
                            react_1.default.createElement("span", null,
                                "\u89C2\u6D4B\u6570\u91CF",
                                react_1.default.createElement("strong", null, finite.length)),
                            react_1.default.createElement("span", null,
                                "\u6700\u5927\u503C",
                                react_1.default.createElement("strong", null, (0, analytics_1.number)(max))),
                            react_1.default.createElement("span", null,
                                "\u6700\u5C0F\u503C",
                                react_1.default.createElement("strong", null, (0, analytics_1.number)(min))))))),
            react_1.default.createElement(ui_1.Card, { title: "\u6A21\u578B\u8F93\u5165\u4E0E\u89E3\u91CA", subtitle: "\u7528\u4E8E\u5C55\u793A\u6A21\u578B\u53EF\u89E3\u91CA\u6027\u7684\u9884\u7F6E\u91CD\u8981\u6027\u5FEB\u7167\uFF0C\u4E0D\u662F\u5B9E\u65F6\u8BAD\u7EC3\u7ED3\u679C", action: react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u793A\u4F8B\u6A21\u578B\u6743\u91CD") },
                react_1.default.createElement("div", { className: "importance-grid" }, state.features.filter(f => f.importance > 0).sort((a, b) => b.importance - a.importance).map(f => react_1.default.createElement("button", { type: "button", className: `importance-item ${f.id === feature.id ? 'active' : ''}`, key: f.id, onClick: () => app.setSelectedFeature(f.id) },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, f.name),
                        react_1.default.createElement("span", null,
                            (0, analytics_1.number)(f.importance * 100, 0),
                            "%")),
                    react_1.default.createElement(ui_1.ProgressBar, { value: f.importance * 100 / .35 }),
                    react_1.default.createElement("small", null,
                        f.category,
                        " \u00B7 ",
                        f.version)))))),
        tab === 'correlation' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Card, { title: "\u8DE8\u8D44\u4EA7\u76F8\u5173\u6027", subtitle: "\u6240\u9009\u65F6\u95F4\u533A\u95F4\u7684\u65E5\u6536\u76CA\u7387 Pearson \u76F8\u5173\u7CFB\u6570 \u00B7 \u70B9\u51FB\u5355\u5143\u683C\u6BD4\u8F83\u8D44\u4EA7", action: react_1.default.createElement("div", { className: "correlation-scale" },
                    react_1.default.createElement("span", null, "\u22121"),
                    react_1.default.createElement("i", null),
                    react_1.default.createElement("span", null, "+1")) },
                react_1.default.createElement("div", { className: "card-inner" },
                    react_1.default.createElement(charts_1.CorrelationMatrix, { assets: assets, from: from, to: to, onSelect: (a, b, value) => setPair({ a, b, value }) }))),
            react_1.default.createElement(ui_1.Notice, null, "\u77E9\u9635\u7531\u5408\u6210\u4EF7\u683C\u5E8F\u5217\u73B0\u573A\u8BA1\u7B97\uFF1B\u76F8\u5173\u6027\u4E0D\u662F\u56E0\u679C\u5173\u7CFB\u3002\u5355\u4E2A\u5E38\u91CF\u5E8F\u5217\u6216\u4E0D\u8DB3\u4E24\u4E2A\u89C2\u6D4B\u65F6\uFF0C\u6F14\u793A\u503C\u8FD4\u56DE0\u3002")),
        tab === 'pca' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "two-col pca-grid" },
                react_1.default.createElement(ui_1.Card, { title: "\u5E02\u573A\u7279\u5F81\u7684\u4E8C\u7EF4\u6295\u5F71", subtitle: "\u672C\u5730\u6807\u51C6\u5316 + \u534F\u65B9\u5DEE\u77E9\u9635\u7279\u5F81\u5206\u89E3\uFF1B\u6BCF5\u4E2A\u89C2\u6D4B\u65E5\u91C7\u6837", action: react_1.default.createElement(charts_1.RegimeLegend, null) }, pca.points.length ? react_1.default.createElement(charts_1.Scatter, { points: pca.points, xLabel: `PC1 · 解释方差 ${(0, analytics_1.number)(pca.variance[0], 1)}%`, yLabel: `PC2 · 解释方差 ${(0, analytics_1.number)(pca.variance[1], 1)}%` }) : react_1.default.createElement(ui_1.Empty, { title: "\u89C2\u6D4B\u4E0D\u8DB3", description: "\u8BF7\u6269\u5927\u7814\u7A76\u533A\u95F4\u3002" })),
                react_1.default.createElement(ui_1.Card, { title: "\u964D\u7EF4\u8BF4\u660E", subtitle: "\u63A2\u7D22\u6027\u5206\u6790\uFF0C\u4E0D\u7528\u4E8E\u8BAD\u7EC3\u8BC4\u4EF7" },
                    react_1.default.createElement("div", { className: "pca-summary" },
                        react_1.default.createElement("strong", null,
                            (0, analytics_1.number)(pca.variance[0] + pca.variance[1], 1),
                            react_1.default.createElement("small", null, "%")),
                        react_1.default.createElement("p", null, "\u524D\u4E24\u4E2A\u4E3B\u6210\u5206\u7D2F\u8BA1\u89E3\u91CA\u65B9\u5DEE")),
                    react_1.default.createElement("div", { className: "pca-bars" }, pca.variance.map((v, i) => react_1.default.createElement("div", { key: i },
                        react_1.default.createElement("span", null,
                            "PC",
                            i + 1,
                            react_1.default.createElement("b", null,
                                (0, analytics_1.number)(v, 1),
                                "%")),
                        react_1.default.createElement(ui_1.ProgressBar, { value: v })))),
                    react_1.default.createElement("dl", { className: "key-values" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u8F93\u5165\u7279\u5F81"),
                            react_1.default.createElement("dd", null, "\u65E5\u6536\u76CA / 20\u65E5\u52A8\u91CF / \u6CE2\u52A8\u7387")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u6837\u672C\u70B9"),
                            react_1.default.createElement("dd", null, pca.points.length)),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u9884\u5904\u7406"),
                            react_1.default.createElement("dd", null, "Z-score \u6807\u51C6\u5316")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u6295\u5F71\u65B9\u6CD5"),
                            react_1.default.createElement("dd", null, "\u534F\u65B9\u5DEE + \u5E42\u8FED\u4EE3"))))),
            react_1.default.createElement(ui_1.Notice, null, "\u6B64\u9875\u9762\u5728\u6240\u9009\u6837\u672C\u4E0A\u505A\u63A2\u7D22\u6027PCA\u3002\u6B63\u5F0F\u6837\u672C\u5916\u8BC4\u4F30\u65F6\uFF0C\u6807\u51C6\u5316\u4E0EPCA\u5E94\u4EC5\u5728\u8BAD\u7EC3\u96C6\u62DF\u5408\uFF1B\u6563\u70B9\u989C\u8272\u6765\u81EA\u672C\u5730\u6F14\u793A\u5206\u7C7B\u5668\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5E02\u573A\u6807\u7B7E\u3002"),
            react_1.default.createElement(ui_1.Card, { title: "\u4E3B\u6210\u5206\u8F7D\u8377" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u8F93\u5165\u7279\u5F81"),
                                react_1.default.createElement("th", null, "PC1 \u8F7D\u8377"),
                                react_1.default.createElement("th", null, "PC2 \u8F7D\u8377"))),
                        react_1.default.createElement("tbody", null, ['单日收益率', '20日动量', '20日年化波动率'].map((name, i) => react_1.default.createElement("tr", { key: name },
                            react_1.default.createElement("td", null, name),
                            react_1.default.createElement("td", { className: "mono" }, (0, analytics_1.number)(pca.loadings[0]?.[i] || 0, 3)),
                            react_1.default.createElement("td", { className: "mono" }, (0, analytics_1.number)(pca.loadings[1]?.[i] || 0, 3))))))))),
        tab === 'catalog' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "section-toolbar" },
                react_1.default.createElement(ui_1.SearchBox, { value: query, onChange: setQuery, placeholder: "\u641C\u7D22\u7279\u5F81\u540D\u79F0\u3001\u5206\u7C7B\u6216\u7248\u672C" }),
                react_1.default.createElement("span", { className: "muted small" }, "\u76EE\u5F55\u5F00\u5173\u4E0E\u81EA\u5B9A\u4E49\u5B9A\u4E49\u4EC5\u4FDD\u5B58\u914D\u7F6E\uFF0C\u4E0D\u6539\u53D8\u9884\u7F6E\u6F14\u793A\u6A21\u578B\u3002")),
            react_1.default.createElement(ui_1.Card, { className: "table-card" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u7279\u5F81\u540D\u79F0 / ID"),
                                react_1.default.createElement("th", null, "\u5206\u7C7B"),
                                react_1.default.createElement("th", null, "\u7A97\u53E3"),
                                react_1.default.createElement("th", null, "\u7248\u672C"),
                                react_1.default.createElement("th", null, "\u72B6\u6001"),
                                react_1.default.createElement("th", null, "\u64CD\u4F5C"))),
                        react_1.default.createElement("tbody", null, state.features.filter(f => `${f.name} ${f.category} ${f.version}`.includes(query)).map(f => react_1.default.createElement("tr", { key: f.id },
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("button", { type: "button", className: "asset-name", onClick: () => { app.setSelectedFeature(f.id); setTab('analysis'); } },
                                    react_1.default.createElement("strong", null, f.name),
                                    react_1.default.createElement("small", { className: "mono" }, f.id))),
                            react_1.default.createElement("td", null, f.category),
                            react_1.default.createElement("td", null,
                                f.window,
                                "d"),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, null, f.version)),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Toggle, { label: `启用特征${f.name}`, checked: f.enabled, disabled: !(0, analytics_1.canWrite)(user), onChange: enabled => app.update(s => ({ ...s, features: s.features.map(x => x.id === f.id ? { ...x, enabled } : x) }), `调整特征 ${f.name}`) })),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("div", { className: "row-actions" },
                                    react_1.default.createElement(ui_1.IconButton, { icon: "edit", label: `编辑${f.name}`, disabled: !(0, analytics_1.canWrite)(user), onClick: () => { setEditing({ ...f }); setError(''); } }),
                                    react_1.default.createElement(ui_1.IconButton, { icon: "trash", label: `删除${f.name}`, disabled: !(0, analytics_1.canWrite)(user) || !f.id.startsWith('custom'), title: !f.id.startsWith('custom') ? '内置计算特征不可删除' : undefined, onClick: () => setDeleteId(f.id) })))))))),
                !state.features.some(f => `${f.name} ${f.category} ${f.version}`.includes(query)) && react_1.default.createElement(ui_1.Empty, null))),
        editing && react_1.default.createElement(ui_1.Modal, { title: `${state.features.some(f => f.id === editing.id) ? '编辑' : '创建'}特征定义`, onClose: () => setEditing(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setEditing(null) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", onClick: save }, "\u4FDD\u5B58\u5B9A\u4E49")) },
            react_1.default.createElement("div", { className: "form-grid" },
                react_1.default.createElement(ui_1.Field, { label: "\u7279\u5F81\u540D\u79F0" },
                    react_1.default.createElement("input", { value: editing.name, maxLength: 48, onChange: e => setEditing({ ...editing, name: e.target.value }) })),
                react_1.default.createElement(ui_1.Field, { label: "\u5206\u7C7B" },
                    react_1.default.createElement("select", { value: editing.category, onChange: e => setEditing({ ...editing, category: e.target.value }) }, ['分布特征', '动量与趋势', '相关性结构', '风险相关', '另类数据'].map(c => react_1.default.createElement("option", { key: c }, c)))),
                react_1.default.createElement(ui_1.Field, { label: "\u8BA1\u7B97\u7A97\u53E3\uFF08\u89C2\u6D4B\u65E5\uFF09" },
                    react_1.default.createElement("input", { type: "number", min: 1, max: 3650, value: editing.window, onChange: e => setEditing({ ...editing, window: Number(e.target.value) }) })),
                react_1.default.createElement(ui_1.Field, { label: "\u5355\u4F4D" },
                    react_1.default.createElement("input", { value: editing.unit, maxLength: 15, onChange: e => setEditing({ ...editing, unit: e.target.value }) }))),
            react_1.default.createElement(ui_1.Field, { label: "\u516C\u5F0F\u8BF4\u660E", hint: "\u4FDD\u5B58\u4E3A\u6587\u6863\uFF0C\u4E0D\u6267\u884C\u4EFB\u610F\u4EE3\u7801\u3002\u5DF2\u6709\u5185\u7F6E\u7279\u5F81\u7684\u8BA1\u7B97\u903B\u8F91\u4ECD\u7531\u524D\u7AEF\u51FD\u6570\u56FA\u5B9A\u5B9E\u73B0\u3002" },
                react_1.default.createElement("textarea", { rows: 3, value: editing.formula, onChange: e => setEditing({ ...editing, formula: e.target.value }) })),
            react_1.default.createElement(ui_1.Field, { label: "\u4E1A\u52A1\u89E3\u91CA" },
                react_1.default.createElement("textarea", { rows: 2, value: editing.description, onChange: e => setEditing({ ...editing, description: e.target.value }) })),
            error && react_1.default.createElement(ui_1.Notice, { tone: "warning" }, error)),
        pair && react_1.default.createElement(ui_1.Modal, { title: `${pair.a.name} × ${pair.b.name}`, wide: true, onClose: () => setPair(null) },
            react_1.default.createElement("div", { className: "pair-summary" },
                react_1.default.createElement(ui_1.Stat, { label: "Pearson\u76F8\u5173\u7CFB\u6570", value: (0, analytics_1.number)(pair.value, 3), detail: "\u57FA\u4E8E\u6240\u9009\u533A\u95F4\u5408\u6210\u65E5\u6536\u76CA\u7387" }),
                react_1.default.createElement(ui_1.Stat, { label: "\u914D\u5BF9\u89C2\u6D4B", value: Math.max(0, (0, analytics_1.sliceDates)(pair.a.prices, from, to).length - 1), detail: `${from} — ${to}` })),
            react_1.default.createElement(charts_1.TimeChart, { labels: (0, analytics_1.sliceDates)(pair.a.prices, from, to).map(p => p.date), series: [{ name: pair.a.name, values: (0, analytics_1.normalized)((0, analytics_1.sliceDates)(pair.a.prices, from, to)) }, ...(pair.a.id !== pair.b.id ? [{ name: pair.b.name, values: (0, analytics_1.normalized)((0, analytics_1.sliceDates)(pair.b.prices, from, to)) }] : [])], height: 280 }),
            react_1.default.createElement(ui_1.Notice, null, "\u8D70\u52BF\u56FE\u4E3A\u5F52\u4E00\u5316\u7D2F\u8BA1\u6536\u76CA\uFF0C\u76F8\u5173\u7CFB\u6570\u4F7F\u7528\u7684\u662F\u65E5\u6536\u76CA\u7387\uFF0C\u4E24\u8005\u53E3\u5F84\u4E0D\u540C\u3002")),
        deleteId && react_1.default.createElement(ui_1.Modal, { title: "\u5220\u9664\u81EA\u5B9A\u4E49\u7279\u5F81\uFF1F", onClose: () => setDeleteId(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setDeleteId(null) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "danger", onClick: () => { app.update(s => ({ ...s, features: s.features.filter(f => f.id !== deleteId) }), '删除自定义特征'); setDeleteId(null); } }, "\u786E\u8BA4\u5220\u9664")) },
            react_1.default.createElement("p", null, "\u4EC5\u5220\u9664\u6B64\u6D4F\u89C8\u5668\u4E2D\u7684\u81EA\u5B9A\u4E49\u76EE\u5F55\u8BB0\u5F55\u3002")));
}

},
"src/pages/Lineage.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Lineage;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const Icon_1 = require("../components/Icon");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
const NODES = [
    { id: 'ods', layer: 'ODS', title: '原始数据', subtitle: '保留来源与原始口径', icon: 'file', storage: 'MinIO', color: 'blue' },
    { id: 'dwd', layer: 'DWD', title: '清洗标准化', subtitle: '统一时间、编码与单位', icon: 'database', storage: 'ClickHouse', color: 'purple' },
    { id: 'dws', layer: 'DWS', title: '特征计算', subtitle: '日窗口与版本快照', icon: 'chart', storage: 'Flink → Redis', color: 'green' },
    { id: 'ads', layer: 'ADS', title: '状态与服务', subtitle: '模型画像与预警应用', icon: 'activity', storage: 'Model / API', color: 'amber' },
];
function Lineage() {
    const app = (0, AppContext_1.useApp)(), { state, assets, to } = app;
    const [node, setNode] = (0, react_1.useState)('dws'), [raw, setRaw] = (0, react_1.useState)(false);
    const asset = assets.find(a => a.id === app.selectedAsset) || assets[0], feature = state.features.find(f => f.id === app.selectedFeature) || state.features[0];
    const points = asset?.prices.filter(p => p.date <= to) || [], p = points.at(-1), value = (0, analytics_1.metrics)(points)[feature.id];
    const source = state.sources.find(s => s.id === asset?.source);
    const selectedNode = NODES.find(n => n.id === node);
    const rawSample = { mock: true, asset_id: asset?.id, symbol: asset?.symbol, event_time: p?.date, available_at: `${p?.date}T15:00:00+08:00`, ingested_at: `${p?.date}T15:00:03+08:00`, close: p?.close, volume: p?.volume, currency: asset?.currency, source_id: source?.id, schema_version: 'udm.v1', quality_flags: ['synthetic', 'demonstration'] };
    const manifest = { mock: true, notice: '示例溯源清单，不代表真实ETL运行记录', asset: asset?.id, feature: { id: feature.id, version: feature.version, formula: feature.formula }, snapshot: p?.date, lineage: NODES.map((n, i) => ({ id: n.id, layer: n.layer, storage: n.storage, upstream: i ? [NODES[i - 1].id] : [], downstream: i < 3 ? [NODES[i + 1].id] : [] })), source: rawSample, model: state.modelVersion };
    const snippets = {
        ods: JSON.stringify(rawSample, null, 2),
        dwd: `-- 示意转换规则，非实际执行的SQL\nSELECT\n  map_instrument(raw.symbol) AS asset_id,\n  toDate(raw.event_time) AS event_date,\n  raw.available_at,\n  normalize_unit(raw.price, raw.currency) AS close,\n  raw.source_id, raw.version\nFROM ods.market_raw AS raw\nWHERE raw.event_time <= :as_of\n-- 去重键：(asset_id, event_time, source_id, version)`,
        dws: JSON.stringify({ mock: true, feature_id: feature.id, feature_version: feature.version, asset_id: asset?.id, event_date: p?.date, window: `${feature.window}d`, expression: feature.formula, value: Number.isFinite(value) ? Number(value.toFixed(4)) : null, note: Number.isFinite(value) ? '当前值由合成样本本地计算' : '目录元数据，尚无计算值', checkpoint: 'cp-1042 (示例)' }, null, 2),
        ads: JSON.stringify({ mock: true, asset_id: asset?.id, snapshot_date: p?.date, regime: (0, analytics_1.sampleRegime)(points).regime, display_model: state.modelVersion, actual_engine: 'frontend-demo-heuristic', downstream: ['GET /states', 'GraphQL workspace', 'regime.updated', 'Alert rules'] }, null, 2),
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u6570\u636E\u6EAF\u6E90", actions: react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "download", onClick: () => (0, files_1.downloadFile)('lineage-manifest-demo.json', JSON.stringify(manifest, null, 2), 'application/json') }, "\u5BFC\u51FA\u6EAF\u6E90\u6E05\u5355") }),
        react_1.default.createElement("div", { className: "section-toolbar" },
            react_1.default.createElement("div", { className: "filter-row" },
                react_1.default.createElement("select", { "aria-label": "\u6EAF\u6E90\u8D44\u4EA7", value: asset?.id || '', onChange: e => app.setSelectedAsset(e.target.value) }, assets.map(a => react_1.default.createElement("option", { key: a.id, value: a.id }, a.name))),
                react_1.default.createElement("select", { "aria-label": "\u6EAF\u6E90\u7279\u5F81", value: feature.id, onChange: e => app.setSelectedFeature(e.target.value) }, state.features.map(f => react_1.default.createElement("option", { key: f.id, value: f.id }, f.name))),
                react_1.default.createElement(ui_1.Badge, null, feature.version)),
            react_1.default.createElement("span", { className: "muted small" },
                "\u5FEB\u7167 ",
                p?.date,
                " \u00B7 \u793A\u4F8B\u5904\u7406\u5173\u7CFB")),
        react_1.default.createElement(ui_1.Card, { title: "\u7AEF\u5230\u7AEF\u5904\u7406\u94FE\u8DEF", action: react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u67B6\u6784\u4E0E\u6EAF\u6E90\u6F14\u793A") },
            react_1.default.createElement("div", { className: "lineage-canvas" },
                react_1.default.createElement("div", { className: "lineage-flow" }, NODES.map((n, i) => react_1.default.createElement(react_1.default.Fragment, { key: n.id },
                    react_1.default.createElement("button", { type: "button", className: `lineage-node ${node === n.id ? 'active' : ''}`, onClick: () => setNode(n.id) },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(ui_1.Badge, { tone: n.color }, n.layer),
                            react_1.default.createElement(Icon_1.Icon, { name: n.icon, size: 22 })),
                        react_1.default.createElement("h3", null, n.title),
                        react_1.default.createElement("p", null, n.subtitle),
                        react_1.default.createElement("span", null, n.storage)),
                    i < NODES.length - 1 && react_1.default.createElement("div", { className: "lineage-edge" },
                        react_1.default.createElement("span", null, i === 0 ? '适配 / 清洗' : i === 1 ? '窗口聚合' : '状态识别'),
                        react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 24 }))))),
                react_1.default.createElement("div", { className: "lineage-under" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Icon_1.Icon, { name: "branch", size: 17 }),
                        react_1.default.createElement("b", null, "\u7EDF\u4E00\u5143\u6570\u636E"),
                        react_1.default.createElement("span", null, "MySQL \u00B7 \u7279\u5F81\u7248\u672C / \u89C4\u5219 / \u6570\u636E\u76EE\u5F55")),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Icon_1.Icon, { name: "wifi", size: 17 }),
                        react_1.default.createElement("b", null, "\u4E8B\u4EF6\u4F20\u8F93"),
                        react_1.default.createElement("span", null, "Kafka \u00B7 \u6570\u636E / \u7279\u5F81 / \u72B6\u6001 / \u9884\u8B66"))))),
        react_1.default.createElement("div", { className: "two-col lineage-details" },
            react_1.default.createElement(ui_1.Card, { title: `${selectedNode.layer} · ${selectedNode.title}`, subtitle: "\u70B9\u51FB\u4E0A\u65B9\u8282\u70B9\u67E5\u770B\u5404\u9636\u6BB5\u8BB0\u5F55", action: react_1.default.createElement(ui_1.Button, { variant: "ghost", icon: "file", onClick: () => setRaw(true) }, "\u539F\u59CB\u6837\u672C") },
                react_1.default.createElement("pre", { className: "code-block lineage-code" }, snippets[node])),
            react_1.default.createElement(ui_1.Card, { title: "\u8282\u70B9\u5143\u6570\u636E", subtitle: "\u7248\u672C\u3001\u4F9D\u8D56\u4E0E\u53EF\u5F97\u6027" },
                react_1.default.createElement("dl", { className: "key-values" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u6570\u636E\u5C42"),
                        react_1.default.createElement("dd", null, selectedNode.layer)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u6570\u636E\u6E90"),
                        react_1.default.createElement("dd", null, source?.name || '未指定')),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u6A21\u5F0F\u7248\u672C"),
                        react_1.default.createElement("dd", { className: "mono" }, "udm.v1")),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u7279\u5F81\u7248\u672C"),
                        react_1.default.createElement("dd", { className: "mono" }, feature.version)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u6A21\u578B\u5143\u6570\u636E"),
                        react_1.default.createElement("dd", { className: "mono" }, state.modelVersion)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u65F6\u95F4\u4E0A\u754C"),
                        react_1.default.createElement("dd", null, to)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u539F\u59CB\u6570\u636E"),
                        react_1.default.createElement("dd", null,
                            react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "synthetic")))),
                react_1.default.createElement("div", { className: "card-inner" },
                    react_1.default.createElement(ui_1.Button, { className: "full-width", icon: "shield", onClick: () => app.navigate('quality') }, "\u68C0\u67E5\u6570\u636E\u8D28\u91CF")))),
        react_1.default.createElement(ui_1.Notice, null, "\u8FD9\u662F\u524D\u7AEF\u4E2D\u7684\u793A\u4F8B\u6EAF\u6E90\u6A21\u578B\uFF0C\u4E0D\u4F1A\u8BBF\u95EEMinIO\u3001ClickHouse\u6216Kafka\u3002\u6240\u793A\u5206\u5C42\u4E0E\u7EC4\u4EF6\u5BF9\u5E94\u8D5B\u9898\u67B6\u6784\uFF0C\u6B63\u5F0F\u63A5\u5165\u9700\u8981\u540E\u7AEF\u8FD4\u56DE\u771F\u5B9E\u8FD0\u884CID\u3001\u6765\u6E90\u7248\u672C\u3001\u5904\u7406\u89C4\u5219\u548C\u65F6\u95F4\u6233\u3002"),
        raw && react_1.default.createElement(ui_1.Modal, { title: "\u539F\u59CB\u6570\u636E\u5FEB\u7167 \u00B7 \u793A\u4F8B", onClose: () => setRaw(false) },
            react_1.default.createElement("pre", { className: "code-block" }, JSON.stringify(rawSample, null, 2)),
            react_1.default.createElement("p", { className: "muted small" }, "event_time \u662F\u6570\u636E\u6240\u5C5E\u65F6\u95F4\uFF1Bavailable_at \u662F\u53EF\u7528\u65F6\u95F4\uFF1Bingested_at \u662F\u91C7\u96C6\u65F6\u95F4\u3002\u8FD9\u91CC\u7684\u65F6\u95F4\u6233\u4E3A\u6F14\u793A\u751F\u6210\u3002")));
}

},
"src/pages/MarketData.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarketData;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const mock_1 = require("../data/mock");
const ui_1 = require("../components/ui");
const charts_1 = require("../components/charts");
const DateRange_1 = require("../components/DateRange");
const Icon_1 = require("../components/Icon");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
function MarketData() {
    const app = (0, AppContext_1.useApp)(), { state, assets, from, to, user } = app;
    const [tab, setTab] = (0, react_1.useState)('quotes'), [query, setQuery] = (0, react_1.useState)(''), [category, setCategory] = (0, react_1.useState)('all'), [onlyWatched, setOnlyWatched] = (0, react_1.useState)(false), [sort, setSort] = (0, react_1.useState)({ field: 'name', asc: true }), [page, setPage] = (0, react_1.useState)(0);
    const [document, setDocument] = (0, react_1.useState)(null), [docType, setDocType] = (0, react_1.useState)('all');
    const [importOpen, setImportOpen] = (0, react_1.useState)(false), [imported, setImported] = (0, react_1.useState)(null), [importError, setImportError] = (0, react_1.useState)(''), [preview, setPreview] = (0, react_1.useState)(null);
    const [sourceDetail, setSourceDetail] = (0, react_1.useState)(null);
    const selected = assets.find(a => a.id === app.selectedAsset) || assets[0];
    const filtered = (0, react_1.useMemo)(() => assets.filter(a => (category === 'all' || a.category === category) && (!onlyWatched || state.watchlist.includes(a.id)) && `${a.name} ${a.symbol}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => { const psA = a.prices.filter(p => p.date <= to), psB = b.prices.filter(p => p.date <= to); let v = sort.field === 'name' ? a.name.localeCompare(b.name) : sort.field === 'close' ? (psA.at(-1)?.close || 0) - (psB.at(-1)?.close || 0) : (0, analytics_1.metrics)(psA).return1d - (0, analytics_1.metrics)(psB).return1d; return sort.asc ? v : -v; }), [assets, category, onlyWatched, state.watchlist, query, sort, to]);
    const effectivePage = Math.min(page, Math.max(0, Math.ceil(filtered.length / 8) - 1));
    const star = (a) => app.update(s => ({ ...s, watchlist: s.watchlist.includes(a.id) ? s.watchlist.filter(id => id !== a.id) : [...s.watchlist, a.id] }), undefined, 'self');
    const sortBy = (field) => setSort(s => ({ field, asc: s.field === field ? !s.asc : field === 'name' }));
    const exportQuotes = () => { const headers = ['数据性质', '资产', '代码', '类型', '日期', '收盘价', '成交量']; (0, files_1.downloadCsv)('市场行情-模拟数据.csv', headers, filtered.flatMap(a => (0, analytics_1.sliceDates)(a.prices, from, to).map(p => ['合成数据', a.name, a.symbol, analytics_1.CLASS_LABELS[a.category], p.date, p.close, p.volume]))); app.notify('已导出筛选区间的合成行情 CSV'); };
    const saveImport = () => {
        if (!imported)
            return;
        const ok = app.update(s => ({ ...s, imports: [imported, ...s.imports], sources: [...s.sources, { id: imported.id, name: imported.name, type: '导入', status: 'online', frequency: '手动导入', records: imported.rows.length, completeness: 100 * imported.rows.flat().filter(Boolean).length / Math.max(1, imported.rows.length * imported.headers.length), consistency: 100, timeliness: 100, updatedAt: new Date().toLocaleString('zh-CN', { hour12: false }) }] }), `导入CSV ${imported.name}`, 'admin');
        if (ok) {
            setImportOpen(false);
            setImported(null);
            setTab('sources');
            app.notify('CSV已保存到本地数据源预览，未加入模型计算。');
        }
    };
    const renderRows = (a) => { const ps = a.prices.filter(p => p.date <= to), m = (0, analytics_1.metrics)(ps); return react_1.default.createElement("tr", { key: a.id, className: a.id === selected?.id ? 'selected-row' : '' },
        react_1.default.createElement("td", null,
            react_1.default.createElement("button", { type: "button", "aria-label": `${state.watchlist.includes(a.id) ? '取消关注' : '关注'}${a.name}`, className: `star-button ${state.watchlist.includes(a.id) ? 'starred' : ''}`, onClick: () => star(a) },
                react_1.default.createElement(Icon_1.Icon, { name: "star", size: 16 }))),
        react_1.default.createElement("td", null,
            react_1.default.createElement("button", { type: "button", className: "asset-name", onClick: () => app.setSelectedAsset(a.id) },
                react_1.default.createElement("strong", null, a.name),
                react_1.default.createElement("small", null, a.symbol))),
        react_1.default.createElement("td", null,
            react_1.default.createElement(ui_1.Badge, null, analytics_1.CLASS_LABELS[a.category])),
        react_1.default.createElement("td", { className: "numeric" },
            (0, analytics_1.number)(ps.at(-1)?.close || 0, a.category === 'fx' ? 4 : 2),
            react_1.default.createElement("small", { className: "currency" }, a.currency)),
        react_1.default.createElement("td", { className: `numeric ${m.return1d >= 0 ? 'positive' : 'negative'}` }, (0, analytics_1.signed)(m.return1d)),
        react_1.default.createElement("td", { className: "numeric" },
            (0, analytics_1.number)(m.volatility20),
            "%"),
        react_1.default.createElement("td", { className: "mini-trend" },
            react_1.default.createElement(charts_1.Sparkline, { values: ps.slice(-30).map(p => p.close), positive: (ps.at(-1)?.close || 0) >= (ps.at(-30)?.close || 0) })),
        react_1.default.createElement("td", null,
            react_1.default.createElement(ui_1.IconButton, { icon: "chevron", label: `查看${a.name}`, onClick: () => app.setSelectedAsset(a.id) }))); };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u5E02\u573A\u6570\u636E", actions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "upload", disabled: !(0, analytics_1.canAdmin)(user), title: !(0, analytics_1.canAdmin)(user) ? '管理员可导入数据' : '', onClick: () => { setImported(null); setImportError(''); setImportOpen(true); } }, "\u5BFC\u5165 CSV"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "download", onClick: exportQuotes }, "\u5BFC\u51FA\u884C\u60C5")) }),
        react_1.default.createElement(ui_1.Tabs, { items: [{ id: 'quotes', label: '多资产行情', count: assets.length }, { id: 'macro', label: '宏观指标', count: mock_1.MACROS.length }, { id: 'news', label: '舆情与研报', count: mock_1.DOCUMENTS.length }, { id: 'sources', label: '数据源', count: state.sources.length }], value: tab, onChange: v => { setTab(v); setQuery(''); } }),
        tab === 'quotes' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "section-toolbar" },
                react_1.default.createElement("div", { className: "filter-row" },
                    react_1.default.createElement(ui_1.SearchBox, { value: query, onChange: v => { setQuery(v); setPage(0); }, placeholder: "\u641C\u7D22\u8D44\u4EA7\u540D\u79F0\u6216\u4EE3\u7801" }),
                    react_1.default.createElement("select", { "aria-label": "\u8D44\u4EA7\u7C7B\u522B", value: category, onChange: e => { setCategory(e.target.value); setPage(0); } },
                        react_1.default.createElement("option", { value: "all" }, "\u5168\u90E8\u8D44\u4EA7\u7C7B\u578B"),
                        Object.entries(analytics_1.CLASS_LABELS).filter(([id]) => user?.allowedClasses.includes(id)).map(([id, label]) => react_1.default.createElement("option", { key: id, value: id }, label))),
                    react_1.default.createElement("button", { type: "button", className: `btn ${onlyWatched ? 'btn-active' : 'btn-secondary'}`, onClick: () => { setOnlyWatched(!onlyWatched); setPage(0); } },
                        react_1.default.createElement(Icon_1.Icon, { name: "star", size: 15 }),
                        "\u6211\u7684\u5173\u6CE8")),
                react_1.default.createElement(DateRange_1.DateRange, null)),
            react_1.default.createElement(ui_1.Card, { className: "table-card" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", { className: "w-star" }),
                                react_1.default.createElement("th", null,
                                    react_1.default.createElement("button", { type: "button", onClick: () => sortBy('name') },
                                        "\u8D44\u4EA7\u540D\u79F0 ",
                                        react_1.default.createElement(Icon_1.Icon, { name: "down", size: 12 }))),
                                react_1.default.createElement("th", null, "\u7C7B\u578B"),
                                react_1.default.createElement("th", { className: "numeric" },
                                    react_1.default.createElement("button", { type: "button", onClick: () => sortBy('close') },
                                        "\u6536\u76D8\u4EF7 ",
                                        react_1.default.createElement(Icon_1.Icon, { name: "down", size: 12 }))),
                                react_1.default.createElement("th", { className: "numeric" },
                                    react_1.default.createElement("button", { type: "button", onClick: () => sortBy('return') },
                                        "\u65E5\u6DA8\u8DCC ",
                                        react_1.default.createElement(Icon_1.Icon, { name: "down", size: 12 }))),
                                react_1.default.createElement("th", { className: "numeric" }, "\u5E74\u5316\u6CE2\u52A8\u7387"),
                                react_1.default.createElement("th", null, "\u8FD130\u65E5\u8D8B\u52BF"),
                                react_1.default.createElement("th", null))),
                        react_1.default.createElement("tbody", null, filtered.slice(effectivePage * 8, effectivePage * 8 + 8).map(renderRows)))),
                !filtered.length && react_1.default.createElement(ui_1.Empty, null),
                react_1.default.createElement("div", { className: "table-footer" },
                    react_1.default.createElement("span", null,
                        "\u663E\u793A ",
                        filtered.length ? effectivePage * 8 + 1 : 0,
                        "\u2013",
                        Math.min((effectivePage + 1) * 8, filtered.length),
                        " / ",
                        filtered.length,
                        " \u9879 \u00B7 \u6536\u76D8\u622A\u81F3 ",
                        to),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(ui_1.Button, { disabled: effectivePage === 0, onClick: () => setPage(p => Math.max(0, p - 1)) }, "\u4E0A\u4E00\u9875"),
                        react_1.default.createElement("span", null,
                            effectivePage + 1,
                            " / ",
                            Math.max(1, Math.ceil(filtered.length / 8))),
                        react_1.default.createElement(ui_1.Button, { disabled: (effectivePage + 1) * 8 >= filtered.length, onClick: () => setPage(p => p + 1) }, "\u4E0B\u4E00\u9875")))),
            selected && react_1.default.createElement("div", { className: "two-col chart-detail" },
                react_1.default.createElement(ui_1.Card, { title: `${selected.name} · 历史走势`, subtitle: `${selected.symbol} · ${selected.currency} · 合成日频数据`, action: react_1.default.createElement("select", { "aria-label": "\u67E5\u770B\u8D44\u4EA7", value: selected.id, onChange: e => app.setSelectedAsset(e.target.value) }, assets.map(a => react_1.default.createElement("option", { key: a.id, value: a.id }, a.name))) },
                    react_1.default.createElement("div", { className: "card-inner" },
                        react_1.default.createElement(charts_1.TimeChart, { labels: (0, analytics_1.sliceDates)(selected.prices, from, to).map(p => p.date), series: [{ name: selected.name, values: (0, analytics_1.sliceDates)(selected.prices, from, to).map(p => p.close) }], unit: "" }))),
                react_1.default.createElement(ui_1.Card, { title: "\u6570\u636E\u6863\u6848", subtitle: "\u7EDF\u4E00\u6570\u636E\u6A21\u578B \u00B7 UDM" },
                    react_1.default.createElement("dl", { className: "key-values" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u8D44\u4EA7\u6807\u8BC6"),
                            react_1.default.createElement("dd", { className: "mono" }, selected.id)),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u539F\u59CB\u6570\u636E\u6E90"),
                            react_1.default.createElement("dd", null, state.sources.find(s => s.id === selected.source)?.name)),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u9891\u7387 / \u7248\u672C"),
                            react_1.default.createElement("dd", null, "1d / mock-v1")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u8BB0\u5F55\u6570"),
                            react_1.default.createElement("dd", null,
                                selected.prices.length,
                                " \u4E2A\u89C2\u6D4B\u65E5")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u6570\u636E\u53E3\u5F84"),
                            react_1.default.createElement("dd", null, "\u672A\u590D\u6743\u5408\u6210\u4EF7\u683C")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u6700\u8FD1\u53EF\u7528\u65F6\u95F4"),
                            react_1.default.createElement("dd", null,
                                mock_1.SNAPSHOT,
                                " 15:00"))),
                    react_1.default.createElement("div", { className: "card-inner" },
                        react_1.default.createElement(ui_1.Button, { className: "full-width", icon: "branch", onClick: () => { app.setSelectedFeature('volatility20'); app.navigate('lineage'); } }, "\u67E5\u770B\u6570\u636E\u6EAF\u6E90"))))),
        tab === 'macro' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Notice, null, "\u6240\u6709\u5B8F\u89C2\u6570\u503C\u4E0E\u53D1\u5E03\u65E5\u671F\u5747\u4E3A\u6F14\u793A\u8BBE\u5B9A\u3002\u4E25\u683C\u533A\u5206\u201C\u89C2\u6D4B\u671F\u201D\u548C\u201C\u9996\u6B21\u53EF\u7528\u65F6\u95F4\u201D\uFF0C\u6CA1\u6709\u771F\u5B9E\u5B8F\u89C2\u6570\u636E\u63A5\u5165\u3002"),
            react_1.default.createElement("div", { className: "macro-grid" }, mock_1.MACROS.map(m => react_1.default.createElement(ui_1.Card, { key: m.id, title: m.name, subtitle: `观测期 ${m.period}`, action: react_1.default.createElement(ui_1.Badge, null, "\u5408\u6210\u6837\u672C") },
                react_1.default.createElement("div", { className: "macro-value" },
                    react_1.default.createElement("strong", null,
                        (0, analytics_1.number)(m.value, m.id === 'shibor' ? 2 : 1),
                        react_1.default.createElement("small", null, m.unit)),
                    react_1.default.createElement("span", { className: m.value >= m.previous ? 'positive' : 'negative' },
                        m.value >= m.previous ? '+' : '',
                        (0, analytics_1.number)(m.value - m.previous),
                        " \u8F83\u524D\u503C")),
                react_1.default.createElement("div", { className: "macro-spark" },
                    react_1.default.createElement(charts_1.Sparkline, { values: m.history, positive: m.value >= m.previous, height: 64 })),
                react_1.default.createElement("div", { className: "macro-footer" },
                    react_1.default.createElement("span", null,
                        "\u524D\u503C ",
                        m.previous,
                        m.unit),
                    react_1.default.createElement("span", null,
                        "\u53D1\u5E03\u4E8E ",
                        m.releasedAt))))),
            react_1.default.createElement(ui_1.Card, { title: "\u65F6\u95F4\u4E0E\u7248\u672C\u53E3\u5F84", subtitle: "\u7528\u4E8E\u5386\u53F2\u56DE\u653E\u7684\u53EF\u5F97\u6027\u7BA1\u7406" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u6307\u6807"),
                                react_1.default.createElement("th", null, "\u89C2\u6D4B\u671F"),
                                react_1.default.createElement("th", null, "\u9996\u6B21\u53EF\u7528\u65F6\u95F4"),
                                react_1.default.createElement("th", null, "\u6837\u672C\u7248\u672C"),
                                react_1.default.createElement("th", null, "\u4FEE\u8BA2\u72B6\u6001"))),
                        react_1.default.createElement("tbody", null, mock_1.MACROS.map(m => react_1.default.createElement("tr", { key: m.id },
                            react_1.default.createElement("td", null, m.name),
                            react_1.default.createElement("td", null, m.period),
                            react_1.default.createElement("td", null, m.releasedAt),
                            react_1.default.createElement("td", { className: "mono" },
                                m.id,
                                "-mock-v1"),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, { tone: "green" }, "\u9996\u53D1\u7248\u672C"))))))))),
        tab === 'news' && react_1.default.createElement(react_1.default.Fragment, null, !(0, analytics_1.canWrite)(user) ? react_1.default.createElement(ui_1.Card, null,
            react_1.default.createElement(ui_1.Empty, { title: "\u7814\u62A5\u4E0E\u8206\u60C5\u9700\u8981\u7814\u7A76\u6743\u9650", description: "\u5F53\u524D\u89C2\u5BDF\u5458\u4EC5\u6709\u80A1\u7968\u3001\u503A\u5238\u884C\u60C5\u4E0E\u72B6\u6001\u6570\u636E\u7684\u8BBF\u95EE\u6743\u9650\u3002\u53EF\u5728\u5934\u50CF\u83DC\u5355\u5207\u6362\u6F14\u793A\u89D2\u8272\u3002" })) : react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "section-toolbar" },
                react_1.default.createElement(ui_1.SearchBox, { value: query, onChange: setQuery, placeholder: "\u641C\u7D22\u8D44\u8BAF\u6807\u9898\u3001\u4E3B\u9898\u6216\u6765\u6E90" }),
                react_1.default.createElement("div", { className: "segments" }, ['all', '新闻', '研报', '公告', '社交'].map(t => react_1.default.createElement("button", { type: "button", key: t, className: docType === t ? 'active' : '', onClick: () => setDocType(t) }, t === 'all' ? '全部资料' : t)))),
            react_1.default.createElement("div", { className: "document-grid" }, mock_1.DOCUMENTS.filter(d => (docType === 'all' || d.type === docType) && `${d.title} ${d.topic} ${d.source}`.includes(query)).map(d => react_1.default.createElement("button", { type: "button", className: "document-card card", key: d.id, onClick: () => setDocument(d) },
                react_1.default.createElement("div", { className: "document-top" },
                    react_1.default.createElement("span", { className: "document-type-icon" },
                        react_1.default.createElement(Icon_1.Icon, { name: d.type === '研报' ? 'file' : 'globe', size: 23 })),
                    react_1.default.createElement(ui_1.Badge, { tone: d.sentiment === '积极' ? 'green' : d.sentiment === '谨慎' ? 'amber' : 'neutral' }, d.sentiment)),
                react_1.default.createElement("div", { className: "document-meta" },
                    d.type,
                    react_1.default.createElement("i", null),
                    d.topic,
                    react_1.default.createElement("span", null, "\u6A21\u62DF\u8D44\u6599")),
                react_1.default.createElement("h3", null, d.title),
                react_1.default.createElement("p", null, d.summary),
                react_1.default.createElement("div", { className: "document-bottom" },
                    react_1.default.createElement("span", null, d.time),
                    react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 17 }))))),
            !mock_1.DOCUMENTS.some(d => (docType === 'all' || d.type === docType) && `${d.title} ${d.topic} ${d.source}`.includes(query)) && react_1.default.createElement(ui_1.Empty, null))),
        tab === 'sources' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "section-toolbar" },
                react_1.default.createElement("span", { className: "muted" }, "\u591A\u6E90\u9002\u914D\u5668\u76EE\u5F55 \u00B7 \u6240\u6709\u8FDE\u63A5\u72B6\u6001\u5747\u4E3A\u6F14\u793A"),
                react_1.default.createElement(ui_1.Button, { icon: "refresh", onClick: app.refresh }, "\u5237\u65B0\u76EE\u5F55")),
            react_1.default.createElement(ui_1.Card, { className: "table-card" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u6570\u636E\u6E90"),
                                react_1.default.createElement("th", null, "\u7C7B\u522B"),
                                react_1.default.createElement("th", null, "\u9891\u7387"),
                                react_1.default.createElement("th", { className: "numeric" }, "\u6837\u672C\u8BB0\u5F55"),
                                react_1.default.createElement("th", null, "\u72B6\u6001"),
                                react_1.default.createElement("th", null, "\u66F4\u65B0\u65F6\u95F4"),
                                react_1.default.createElement("th", null, "\u64CD\u4F5C"))),
                        react_1.default.createElement("tbody", null, state.sources.map(s => react_1.default.createElement("tr", { key: s.id },
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("strong", null, s.name),
                                react_1.default.createElement("small", { className: "block mono muted" }, s.id)),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, null, s.type)),
                            react_1.default.createElement("td", null, s.frequency),
                            react_1.default.createElement("td", { className: "numeric" }, (0, analytics_1.compactNumber)(s.records)),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, { dot: true, tone: s.status === 'online' ? 'green' : s.status === 'delayed' ? 'amber' : 'neutral' }, s.status === 'online' ? '已就绪' : s.status === 'delayed' ? '更新延迟' : '已暂停')),
                            react_1.default.createElement("td", null, s.updatedAt),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("div", { className: "row-actions" },
                                    react_1.default.createElement(ui_1.IconButton, { icon: "file", label: `预览${s.name}`, onClick: () => { const file = state.imports.find(f => f.id === s.id); if (file)
                                            setPreview(file);
                                        else
                                            setSourceDetail(s.id); } }),
                                    react_1.default.createElement(ui_1.Toggle, { checked: s.status !== 'paused', disabled: !(0, analytics_1.canAdmin)(user), label: `启用${s.name}`, onChange: enabled => app.update(prev => ({ ...prev, sources: prev.sources.map(x => x.id === s.id ? { ...x, status: enabled ? 'online' : 'paused' } : x) }), `${enabled ? '启用' : '暂停'}演示数据源 ${s.name}`, 'admin') }))))))))),
            react_1.default.createElement(ui_1.Notice, null, "\u5F00\u5173\u53EA\u6A21\u62DF\u6570\u636E\u6E90\u751F\u547D\u5468\u671F\uFF0C\u4E0D\u4F1A\u505C\u6B62\u5386\u53F2\u6837\u672C\u67E5\u8BE2\u3002\u5BFC\u5165\u7684 CSV \u4EC5\u4FDD\u5B58\u5728\u672C\u6D4F\u89C8\u5668\u7684\u539F\u59CB\u6570\u636E\u9884\u89C8\u4E2D\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u53C2\u4E0E\u72B6\u6001\u8BC6\u522B\u3002")),
        document && react_1.default.createElement(ui_1.Modal, { title: document.type === '研报' ? '研报阅读' : '资讯详情', drawer: true, onClose: () => setDocument(null), footer: react_1.default.createElement(ui_1.Button, { icon: "download", onClick: () => (0, files_1.downloadFile)(`${document.id}-模拟资料.txt`, `【虚构演示资料】\n${document.title}\n${document.time}\n\n${document.paragraphs.join('\n\n')}`) }, "\u5BFC\u51FA\u6587\u672C") },
            react_1.default.createElement("div", { className: "article" },
                react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u865A\u6784\u8D44\u6599 \u00B7 \u975E\u771F\u5B9E\u7814\u7A76\u62A5\u544A"),
                react_1.default.createElement("h2", null, document.title),
                react_1.default.createElement("p", { className: "article-meta" },
                    document.source,
                    " \u00B7 ",
                    document.time,
                    " \u00B7 ",
                    document.topic),
                react_1.default.createElement("blockquote", null, document.summary),
                document.paragraphs.map((p, i) => react_1.default.createElement("p", { key: i }, p)),
                react_1.default.createElement("h3", null, "\u5173\u8054\u7814\u7A76\u8DEF\u5F84"),
                react_1.default.createElement(ui_1.Button, { icon: "chart", onClick: () => { setDocument(null); app.navigate('features'); } }, "\u67E5\u770B\u76F8\u5173\u7279\u5F81"))),
        importOpen && react_1.default.createElement(ui_1.Modal, { title: "\u5BFC\u5165\u672C\u5730 CSV \u6837\u672C", wide: true, onClose: () => setImportOpen(false), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setImportOpen(false) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !imported || !!importError, onClick: saveImport },
                    "\u786E\u8BA4\u5BFC\u5165 ",
                    imported ? `${imported.rows.length} 行` : '')) },
            react_1.default.createElement(ui_1.Notice, null, "\u4EC5\u5728\u672C\u6D4F\u89C8\u5668\u8BFB\u53D6\u548C\u4FDD\u5B58\uFF0C\u4E0D\u4E0A\u4F20\u5230\u670D\u52A1\u5668\u3002\u4E0A\u96501MB / 2000\u884C\uFF1B\u8868\u5934\u4E0D\u80FD\u4E3A\u7A7A\u6216\u91CD\u590D\u3002"),
            react_1.default.createElement(ui_1.Field, { label: "\u9009\u62E9 CSV \u6587\u4EF6" },
                react_1.default.createElement("input", { type: "file", accept: ".csv,text/csv", onChange: async (e) => { const f = e.target.files?.[0]; if (!f)
                        return; setImportError(''); setImported(null); try {
                        if (f.size > 1024 * 1024)
                            throw new Error('文件超过1MB');
                        const csv = (0, files_1.parseCsv)(await f.text());
                        setImported({ id: (0, analytics_1.uid)('source-import'), name: f.name, ...csv, importedAt: new Date().toISOString() });
                    }
                    catch (err) {
                        setImportError(err instanceof Error ? err.message : '无法读取文件');
                    } } })),
            react_1.default.createElement(ui_1.Button, { variant: "ghost", icon: "download", onClick: () => (0, files_1.downloadCsv)('sample-template.csv', ['asset_id', 'event_time', 'available_at', 'close', 'source'], [['demo-index', '2026-10-08', '2026-10-08T15:00:00+08:00', 100, 'local-demo'], ['demo-index', '2026-10-09', '2026-10-09T15:00:00+08:00', 102, 'local-demo']]) }, "\u4E0B\u8F7D\u5BFC\u5165\u6A21\u677F"),
            importError && react_1.default.createElement(ui_1.Notice, { tone: "warning" }, importError),
            imported && react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", { className: "small muted" },
                    imported.name,
                    " \u00B7 ",
                    imported.rows.length,
                    " \u884C \u00B7 \u524D5\u884C\u9884\u89C8"),
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null, imported.headers.map(h => react_1.default.createElement("th", { key: h }, h)))),
                        react_1.default.createElement("tbody", null, imported.rows.slice(0, 5).map((r, i) => react_1.default.createElement("tr", { key: i }, r.map((c, j) => react_1.default.createElement("td", { key: j }, c))))))))),
        preview && react_1.default.createElement(ui_1.Modal, { title: `原始数据 · ${preview.name}`, wide: true, onClose: () => setPreview(null), footer: react_1.default.createElement(ui_1.Button, { icon: "download", onClick: () => (0, files_1.downloadCsv)(preview.name, preview.headers, preview.rows) }, "\u5BFC\u51FA\u6B64\u6570\u636E\u6E90") },
            react_1.default.createElement("p", { className: "muted" },
                "\u5171 ",
                preview.rows.length,
                " \u884C\uFF0C\u6700\u591A\u5C55\u793A\u524D100\u884C\u3002\u672A\u6267\u884C\u81EA\u52A8\u6E05\u6D17\u6216\u6A21\u578B\u8BA1\u7B97\u3002"),
            react_1.default.createElement("div", { className: "table-scroll" },
                react_1.default.createElement("table", { className: "data-table" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null, preview.headers.map(h => react_1.default.createElement("th", { key: h }, h)))),
                    react_1.default.createElement("tbody", null, preview.rows.slice(0, 100).map((r, i) => react_1.default.createElement("tr", { key: i }, r.map((c, j) => react_1.default.createElement("td", { key: j }, c)))))))),
        sourceDetail && react_1.default.createElement(ui_1.Modal, { title: "\u9002\u914D\u5668\u4E0E\u7EDF\u4E00\u6570\u636E\u6A21\u578B", onClose: () => setSourceDetail(null) },
            react_1.default.createElement(ui_1.Notice, null, "\u793A\u4F8B\u6620\u5C04\u89C4\u5219\uFF0C\u672A\u8C03\u7528\u5916\u90E8\u6570\u636E\u6E90\u3002"),
            react_1.default.createElement("pre", { className: "code-block" }, JSON.stringify({ source_id: sourceDetail, adapter: 'MockSourceAdapter', schema_version: 'udm.v1', fields: { instrument: 'asset_id', timestamp: 'event_time', publish_time: 'available_at', received_time: 'ingested_at', price: 'close' }, quality_flags: ['complete', 'consistent', 'timely'], storage: { raw: 'ODS / MinIO', standardized: 'DWD / ClickHouse' } }, null, 2)),
            react_1.default.createElement(ui_1.Button, { icon: "branch", onClick: () => { setSourceDetail(null); app.navigate('lineage'); } }, "\u67E5\u770B\u5904\u7406\u6EAF\u6E90")));
}

},
"src/pages/Overview.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Overview;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const charts_1 = require("../components/charts");
const Icon_1 = require("../components/Icon");
const DateRange_1 = require("../components/DateRange");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
const mock_1 = require("../data/mock");
const WIDGETS = [{ id: 'trend', title: '跨资产走势', width: 'wide' }, { id: 'state', title: '当前市场状态', width: 'narrow' }, { id: 'heatmap', title: '市场状态热力图', width: 'wide' }, { id: 'alerts', title: '最新预警', width: 'narrow' }];
function Overview() {
    const app = (0, AppContext_1.useApp)();
    const { assets, state, from, to } = app;
    const [metric, setMetric] = (0, react_1.useState)('normalized'), [visible, setVisible] = (0, react_1.useState)(['csi300', 'gold', 'cn-bond']), [customize, setCustomize] = (0, react_1.useState)(false), [widgets, setWidgets] = (0, react_1.useState)(state.widgets), [drag, setDrag] = (0, react_1.useState)(null);
    const watched = [...assets.filter(a => state.watchlist.includes(a.id)), ...assets.filter(a => !state.watchlist.includes(a.id))].slice(0, 4);
    const chartAssets = assets.filter(a => visible.includes(a.id));
    const chartDates = assets[0] ? (0, analytics_1.sliceDates)(assets[0].prices, from, to).map(p => p.date) : [];
    const lead = assets.find(a => a.id === 'csi300') || assets[0];
    const regime = (0, analytics_1.sampleRegime)(lead?.prices.filter(p => p.date <= to) || []);
    const alerts = state.alerts.filter(a => assets.some(asset => asset.id === a.assetId));
    const snapshot = (0, react_1.useMemo)(() => assets.map(a => ({ asset: a, m: (0, analytics_1.metrics)(a.prices.filter(p => p.date <= to)) })), [assets, to]);
    const goHeatmap = (a, date) => { app.setSelectedAsset(a.id); app.navigate('regimes'); app.notify(`已定位 ${a.name}；点击热力图可查看 ${date} 的状态详情。`, 'info'); };
    const reorder = (id, target) => { const next = [...widgets]; const fromIndex = next.indexOf(id), targetIndex = next.indexOf(target); if (fromIndex < 0 || targetIndex < 0)
        return; next.splice(fromIndex, 1); next.splice(targetIndex, 0, id); setWidgets(next); };
    const exportReport = () => { (0, files_1.downloadFile)('FinTech-市场快照-模拟数据.json', JSON.stringify({ notice: '合成演示数据，不构成投资建议', range: { from, to }, snapshotDate: mock_1.SNAPSHOT, state: regime, assets: snapshot.map(s => ({ id: s.asset.id, name: s.asset.name, metrics: s.m })), alerts }, null, 2), 'application/json'); app.notify('已导出市场快照 JSON'); };
    const content = (id) => {
        if (id === 'trend')
            return react_1.default.createElement(ui_1.Card, { className: "trend-card", title: "\u8DE8\u8D44\u4EA7\u8868\u73B0", action: react_1.default.createElement("div", { className: "segments subtle" },
                    react_1.default.createElement("button", { type: "button", className: metric === 'normalized' ? 'active' : '', onClick: () => setMetric('normalized') }, "\u7D2F\u8BA1\u6536\u76CA"),
                    react_1.default.createElement("button", { type: "button", className: metric === 'vol' ? 'active' : '', onClick: () => setMetric('vol') }, "\u6CE2\u52A8\u7387")) },
                react_1.default.createElement("div", { className: "asset-chart-tabs" }, assets.filter(a => ['csi300', 'sp500', 'gold', 'cn-bond', 'dxy'].includes(a.id)).map((a, i) => react_1.default.createElement("button", { type: "button", key: a.id, className: visible.includes(a.id) ? 'selected' : '', onClick: () => setVisible(v => v.includes(a.id) ? v.filter(id => id !== a.id) : [...v, a.id]) },
                    react_1.default.createElement("i", { style: { background: charts_1.CHART_COLORS[i] } }),
                    a.name,
                    visible.includes(a.id) && react_1.default.createElement(Icon_1.Icon, { name: "check", size: 12 })))),
                chartAssets.length ? react_1.default.createElement(charts_1.TimeChart, { labels: chartDates, height: 250, series: chartAssets.map(a => ({ name: a.name, color: charts_1.CHART_COLORS[assets.filter(x => ['csi300', 'sp500', 'gold', 'cn-bond', 'dxy'].includes(x.id)).findIndex(x => x.id === a.id)], values: metric === 'normalized' ? (0, analytics_1.normalized)((0, analytics_1.sliceDates)(a.prices, from, to)) : chartDates.map(date => (0, analytics_1.metrics)(a.prices.filter(p => p.date <= date)).volatility20) })) }) : react_1.default.createElement(ui_1.Empty, { title: "\u9009\u62E9\u81F3\u5C11\u4E00\u4E2A\u8D44\u4EA7", description: "\u70B9\u51FB\u4E0A\u65B9\u8D44\u4EA7\u6807\u7B7E\u52A0\u5165\u5BF9\u6BD4\u3002" }),
                react_1.default.createElement("div", { className: "chart-foot" },
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("i", { className: "live-dot" }),
                        "\u7814\u7A76\u533A\u95F4 ",
                        from,
                        " \u2014 ",
                        to),
                    react_1.default.createElement("button", { type: "button", onClick: () => app.navigate('data') },
                        "\u63A2\u7D22\u5168\u90E8\u8D44\u4EA7",
                        react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 14 }))));
        if (id === 'state')
            return react_1.default.createElement("section", { className: "state-hero" },
                react_1.default.createElement("div", { className: "state-top" },
                    react_1.default.createElement("span", null, "\u5F53\u524D\u5E02\u573A\u72B6\u6001"),
                    react_1.default.createElement(ui_1.Badge, { tone: "translucent" },
                        state.modelVersion.includes('gmm') ? 'GMM' : state.modelVersion.includes('hmm') ? 'HMM' : 'KMeans',
                        " \u5FEB\u7167 \u00B7 \u6F14\u793A")),
                react_1.default.createElement("div", { className: "regime-illustration" },
                    react_1.default.createElement("div", { className: "orbit orbit-one" }),
                    react_1.default.createElement("div", { className: "orbit orbit-two" }),
                    react_1.default.createElement("div", { className: "orbit orbit-three" }),
                    react_1.default.createElement("span", { className: "orbit-core" },
                        react_1.default.createElement(Icon_1.Icon, { name: "activity", size: 34 })),
                    react_1.default.createElement("i", { className: "orbit-dot" })),
                react_1.default.createElement("h2", null,
                    analytics_1.REGIMES[regime.regime].label,
                    react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 22 })),
                react_1.default.createElement("p", null, analytics_1.REGIMES[regime.regime].description),
                react_1.default.createElement("div", { className: "confidence-row" },
                    react_1.default.createElement("span", null,
                        "\u72B6\u6001\u5F52\u5C5E\u5EA6",
                        react_1.default.createElement("small", null, "\u6F14\u793A\u5206\u6570")),
                    react_1.default.createElement("strong", null,
                        (0, analytics_1.number)(regime.confidence, 1),
                        react_1.default.createElement("em", null, "%"))),
                react_1.default.createElement("div", { className: "probability-track" }, Object.keys(analytics_1.REGIMES).map(r => react_1.default.createElement("span", { key: r, title: `${analytics_1.REGIMES[r].label} ${(0, analytics_1.number)(regime.probabilities[r], 1)}%`, style: { width: `${regime.probabilities[r]}%`, background: r === 'bull' ? '#a6d7be' : r === 'range' ? '#e8d5a1' : '#cf9a9f' } }))),
                react_1.default.createElement("div", { className: "state-foot" },
                    react_1.default.createElement("span", null,
                        "\u53C2\u8003\u8D44\u4EA7\uFF1A",
                        lead?.name || '暂无'),
                    react_1.default.createElement("button", { type: "button", onClick: () => app.navigate('regimes') },
                        "\u67E5\u770B\u72B6\u6001\u4F9D\u636E",
                        react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 14 }))));
        if (id === 'heatmap')
            return react_1.default.createElement(ui_1.Card, { title: "\u5E02\u573A\u72B6\u6001\u70ED\u529B\u56FE", action: react_1.default.createElement(ui_1.Button, { variant: "ghost", onClick: () => app.navigate('regimes'), icon: "external" }, "\u5B8C\u6574\u89C6\u56FE") },
                react_1.default.createElement("div", { className: "card-inner" },
                    react_1.default.createElement(charts_1.Heatmap, { assets: assets.filter(a => ['csi300', 'sp500', 'cn-bond', 'gold', 'oil', 'dxy'].includes(a.id)), from: from, to: to, onSelect: goHeatmap, small: true }),
                    react_1.default.createElement("div", { className: "heatmap-footer" },
                        react_1.default.createElement(charts_1.RegimeLegend, null),
                        react_1.default.createElement("span", { className: "muted small" }, "\u5C40\u90E8\u6F14\u793A\u5206\u7C7B\u5668"))));
        if (id === 'alerts')
            return react_1.default.createElement(ui_1.Card, { title: "\u6700\u65B0\u9884\u8B66", action: react_1.default.createElement(ui_1.Badge, { tone: "red" },
                    alerts.filter(a => a.status === 'new').length,
                    " \u5F85\u5904\u7406") },
                react_1.default.createElement("div", { className: "overview-alerts" },
                    alerts.filter(a => a.status !== 'resolved').slice(0, 3).map(a => react_1.default.createElement("button", { type: "button", key: a.id, onClick: () => app.openAlert(a.id), className: "overview-alert" },
                        react_1.default.createElement("span", { className: `alert-icon alert-icon-${a.severity}` },
                            react_1.default.createElement(Icon_1.Icon, { name: a.severity === 'high' ? 'activity' : 'bell', size: 17 })),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("strong", null, a.title),
                            react_1.default.createElement("p", null,
                                (0, analytics_1.timeLabel)(a.createdAt),
                                react_1.default.createElement("span", null, a.status === 'new' ? '待确认' : '已确认'))),
                        react_1.default.createElement(Icon_1.Icon, { name: "chevron", size: 15 }))),
                    !alerts.some(a => a.status !== 'resolved') && react_1.default.createElement(ui_1.Empty, { title: "\u6682\u65F6\u6CA1\u6709\u5F85\u5904\u7406\u9884\u8B66", description: "\u524D\u5F80\u9884\u8B66\u4E2D\u5FC3\u521B\u5EFA\u5E76\u6D4B\u8BD5\u89C4\u5219\u3002" })),
                react_1.default.createElement("div", { className: "card-bottom" },
                    react_1.default.createElement(ui_1.Button, { variant: "ghost", className: "full-width", onClick: () => app.navigate('alerts') },
                        "\u8FDB\u5165\u9884\u8B66\u4E2D\u5FC3",
                        react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 15 }))));
        return null;
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u5E02\u573A\u603B\u89C8", actions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "settings", onClick: () => { setWidgets(state.widgets); setCustomize(true); } }, "\u81EA\u5B9A\u4E49\u770B\u677F"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "download", onClick: exportReport }, "\u5BFC\u51FA\u5FEB\u7167")) }),
        react_1.default.createElement("div", { className: "overview-toolbar" },
            react_1.default.createElement("div", { className: "overview-status" },
                react_1.default.createElement("span", { className: "live-dot" }),
                react_1.default.createElement("b", null, "\u591A\u8D44\u4EA7\u76D1\u6D4B"),
                react_1.default.createElement("span", { className: "muted" },
                    assets.length,
                    " \u9879\u8D44\u4EA7"),
                react_1.default.createElement("span", { className: "v-divider" }),
                react_1.default.createElement("span", null,
                    "\u6837\u672C\u622A\u81F3 ",
                    mock_1.SNAPSHOT)),
            react_1.default.createElement(DateRange_1.DateRange, null)),
        react_1.default.createElement("div", { className: "market-stats" }, watched.map(a => { const points = a.prices.filter(p => p.date <= to), m = (0, analytics_1.metrics)(points); return react_1.default.createElement("button", { type: "button", className: "market-stat", key: a.id, onClick: () => { app.setSelectedAsset(a.id); app.navigate('data'); } },
            react_1.default.createElement("div", { className: "market-stat-label" },
                react_1.default.createElement("span", null, a.name),
                react_1.default.createElement("small", null, a.symbol)),
            react_1.default.createElement("div", { className: "market-stat-body" },
                react_1.default.createElement("strong", null, (0, analytics_1.number)(points.at(-1)?.close || 0, a.category === 'fx' ? 4 : 2)),
                react_1.default.createElement(charts_1.Sparkline, { values: points.slice(-30).map(p => p.close), positive: m.return1d >= 0 })),
            react_1.default.createElement("div", { className: "market-stat-bottom" },
                react_1.default.createElement("span", { className: m.return1d >= 0 ? 'positive' : 'negative' },
                    m.return1d >= 0 ? '↗' : '↘',
                    " ",
                    (0, analytics_1.signed)(m.return1d)),
                react_1.default.createElement("small", null, "\u8F83\u524D\u4E00\u89C2\u6D4B\u65E5"))); })),
        state.widgets.length ? react_1.default.createElement("div", { className: "dashboard-grid" }, state.widgets.map(id => react_1.default.createElement("div", { className: `widget widget-${WIDGETS.find(w => w.id === id)?.width || 'wide'}`, key: id }, content(id)))) : react_1.default.createElement(ui_1.Card, null,
            react_1.default.createElement(ui_1.Empty, { title: "\u8FD9\u5F20\u770B\u677F\u8FD8\u6CA1\u6709\u7EC4\u4EF6", description: "\u6DFB\u52A0\u8D70\u52BF\u56FE\u3001\u72B6\u6001\u5361\u7247\u3001\u70ED\u529B\u56FE\u6216\u9884\u8B66\u5217\u8868\u3002", action: react_1.default.createElement(ui_1.Button, { variant: "primary", onClick: () => { setWidgets(state.widgets); setCustomize(true); } }, "\u6DFB\u52A0\u7EC4\u4EF6") })),
        react_1.default.createElement("div", { className: "insight-strip" },
            react_1.default.createElement("div", { className: "insight-symbol" },
                react_1.default.createElement(Icon_1.Icon, { name: "spark", size: 20 })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("strong", null, "\u7814\u7A76\u63D0\u793A"),
                react_1.default.createElement("p", null, "\u72B6\u6001\u662F\u7406\u89E3\u5E02\u573A\u7684\u89C6\u89D2\uFF0C\u800C\u975E\u786E\u5B9A\u6027\u7684\u9884\u6D4B\u3002\u7ED3\u5408\u7279\u5F81\u3001\u6570\u636E\u8D28\u91CF\u4E0E\u5386\u53F2\u8868\u73B0\u590D\u6838\u6BCF\u4E00\u4E2A\u4FE1\u53F7\u3002")),
            react_1.default.createElement(ui_1.Button, { variant: "ghost", icon: "arrow", onClick: () => app.navigate('features') }, "\u524D\u5F80\u7279\u5F81\u5B9E\u9A8C\u5BA4")),
        customize && react_1.default.createElement(ui_1.Modal, { title: "\u8BA9\u770B\u677F\u66F4\u9002\u5408\u4F60\u7684\u7814\u7A76", onClose: () => setCustomize(false), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setWidgets(WIDGETS.map(w => w.id)) }, "\u6062\u590D\u9ED8\u8BA4\u5E03\u5C40"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", onClick: () => { app.update(s => ({ ...s, widgets }), '调整个人看板', 'self'); setCustomize(false); app.notify('看板布局已保存'); } }, "\u4FDD\u5B58\u770B\u677F")) },
            react_1.default.createElement("p", { className: "muted" }, "\u52FE\u9009\u9700\u8981\u7684\u7EC4\u4EF6\uFF1B\u62D6\u52A8\u5DF2\u9009\u7EC4\u4EF6\u8C03\u6574\u987A\u5E8F\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u4E0A\u4E0B\u7BAD\u5934\u3002"),
            react_1.default.createElement("div", { className: "widget-options" }, [...widgets, ...WIDGETS.map(w => w.id).filter(id => !widgets.includes(id))].map(id => react_1.default.createElement("div", { key: id, className: `widget-option ${drag === id ? 'dragging' : ''}`, draggable: widgets.includes(id), onDragStart: () => setDrag(id), onDragEnd: () => setDrag(null), onDragOver: e => e.preventDefault(), onDrop: e => { e.preventDefault(); if (drag)
                    reorder(drag, id); setDrag(null); } },
                react_1.default.createElement(Icon_1.Icon, { name: "grip", size: 16 }),
                react_1.default.createElement("label", null,
                    react_1.default.createElement("input", { type: "checkbox", checked: widgets.includes(id), onChange: e => setWidgets(w => e.target.checked ? [...w, id] : w.filter(x => x !== id)) }),
                    WIDGETS.find(w => w.id === id)?.title),
                react_1.default.createElement(ui_1.IconButton, { icon: "arrowup", label: "\u5411\u4E0A\u79FB\u52A8", disabled: !widgets.includes(id) || widgets.indexOf(id) === 0, onClick: () => reorder(id, widgets[widgets.indexOf(id) - 1]) }),
                react_1.default.createElement(ui_1.IconButton, { icon: "arrowdown", label: "\u5411\u4E0B\u79FB\u52A8", disabled: !widgets.includes(id) || widgets.indexOf(id) === widgets.length - 1, onClick: () => reorder(id, widgets[widgets.indexOf(id) + 1]) })))),
            react_1.default.createElement("p", { className: "small muted" }, "\u5E03\u5C40\u53EA\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\uFF0C\u6B63\u5F0F\u63A5\u5165\u540E\u53EF\u4FDD\u5B58\u5230\u7528\u6237\u914D\u7F6E\u670D\u52A1\u3002")));
}

},
"src/pages/Quality.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Quality;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const Icon_1 = require("../components/Icon");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
function Quality() {
    const app = (0, AppContext_1.useApp)(), { state, user } = app;
    const [status, setStatus] = (0, react_1.useState)('open'), [issue, setIssue] = (0, react_1.useState)(null), [checking, setChecking] = (0, react_1.useState)(false), [checkedAt, setCheckedAt] = (0, react_1.useState)('');
    const open = state.issues.filter(i => i.status === 'open');
    const run = () => { setChecking(true); setTimeout(() => { setCheckedAt(new Date().toLocaleTimeString('zh-CN', { hour12: false })); setChecking(false); app.notify(`模拟检查完成：${state.sources.length}个数据源，${open.length}项待处理问题。`); }, 900); };
    const repair = () => { if (!issue)
        return; const key = issue.dimension === '完整性' ? 'completeness' : issue.dimension === '一致性' ? 'consistency' : 'timeliness'; if (app.update(s => ({ ...s, issues: s.issues.map(i => i.id === issue.id ? { ...i, status: 'resolved' } : i), sources: s.sources.map(src => src.id === issue.sourceId ? { ...src, [key]: 100, status: src.status === 'delayed' ? 'online' : src.status } : src) }), `模拟修复数据问题 ${issue.id}`, 'admin')) {
        setIssue(null);
        app.notify('演示问题已标记修复；没有修改真实数据。');
    } };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u6570\u636E\u8D28\u91CF", actions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "download", onClick: () => (0, files_1.downloadFile)('数据质量报告-模拟.json', JSON.stringify({ mock: true, notice: '所有内置指标为演示快照；未连接实际数据源', checkedAt: checkedAt || '预置快照', sources: state.sources, issues: state.issues }, null, 2), 'application/json') }, "\u5BFC\u51FA\u62A5\u544A"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "refresh", busy: checking, onClick: run }, "\u8FD0\u884C\u6A21\u62DF\u68C0\u67E5")) }),
        react_1.default.createElement("div", { className: "stats-grid" },
            react_1.default.createElement(ui_1.Stat, { label: "\u5B8C\u6574\u6027 \u00B7 \u793A\u4F8B", value: react_1.default.createElement(react_1.default.Fragment, null,
                    (0, analytics_1.number)((0, analytics_1.mean)(state.sources.map(s => s.completeness)), 1),
                    react_1.default.createElement("small", null, "%")), detail: "\u5404\u6570\u636E\u6E90\u5B8C\u6574\u6027\u7B80\u5355\u5E73\u5747", icon: "layers" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u4E00\u81F4\u6027 \u00B7 \u793A\u4F8B", value: react_1.default.createElement(react_1.default.Fragment, null,
                    (0, analytics_1.number)((0, analytics_1.mean)(state.sources.map(s => s.consistency)), 1),
                    react_1.default.createElement("small", null, "%")), detail: "\u6620\u5C04\u4E0E\u8DE8\u6E90\u89C4\u5219\u6F14\u793A\u5FEB\u7167", icon: "shield" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u65F6\u6548\u6027 \u00B7 \u793A\u4F8B", value: react_1.default.createElement(react_1.default.Fragment, null,
                    (0, analytics_1.number)((0, analytics_1.mean)(state.sources.map(s => s.timeliness)), 1),
                    react_1.default.createElement("small", null, "%")), detail: "\u6309\u6765\u6E90\u914D\u7F6E\u7684\u65B0\u9C9C\u5EA6\u89C4\u5219", icon: "clock" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u5F85\u5904\u7406\u95EE\u9898", value: open.length, detail: checkedAt ? `最近模拟检查 ${checkedAt}` : '预置问题场景', icon: "warning" })),
        react_1.default.createElement(ui_1.Notice, null, "\u5185\u7F6E\u8D28\u91CF\u767E\u5206\u6BD4\u4E3A\u9884\u7F6E\u6F14\u793A\u6307\u6807\uFF0C\u4E0D\u662F\u5BF9\u4EF7\u683C\u6570\u7EC4\u6267\u884C\u5B8C\u6574\u5BA1\u8BA1\u540E\u7684\u6D4B\u91CF\u503C\u3002CSV\u5BFC\u5165\u7684\u5B8C\u6574\u6027\u6839\u636E\u5B9E\u9645\u7A7A\u503C\u6BD4\u4F8B\u8BA1\u7B97\u3002"),
        react_1.default.createElement(ui_1.Card, { title: "\u6570\u636E\u6E90\u5065\u5EB7\u5EA6", subtitle: "ODS \u2192 DWD \u6570\u636E\u8D28\u91CF\u6982\u89C8", action: react_1.default.createElement(ui_1.Badge, { tone: "green", dot: true }, "\u6F14\u793A\u5FEB\u7167") },
            react_1.default.createElement("div", { className: "table-scroll" },
                react_1.default.createElement("table", { className: "data-table" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", null, "\u6570\u636E\u6E90"),
                            react_1.default.createElement("th", null, "\u5B8C\u6574\u6027"),
                            react_1.default.createElement("th", null, "\u4E00\u81F4\u6027"),
                            react_1.default.createElement("th", null, "\u65F6\u6548\u6027"),
                            react_1.default.createElement("th", null, "\u72B6\u6001"))),
                    react_1.default.createElement("tbody", null, state.sources.map(s => react_1.default.createElement("tr", { key: s.id },
                        react_1.default.createElement("td", null,
                            react_1.default.createElement("strong", null, s.name),
                            react_1.default.createElement("small", { className: "block muted" },
                                s.type,
                                " \u00B7 ",
                                s.frequency)),
                        ['completeness', 'consistency', 'timeliness'].map(k => react_1.default.createElement("td", { key: k },
                            react_1.default.createElement("div", { className: "quality-metric" },
                                react_1.default.createElement("span", { className: "mono" },
                                    (0, analytics_1.number)(s[k], 1),
                                    "%"),
                                react_1.default.createElement(ui_1.ProgressBar, { value: s[k], color: s[k] < 98 ? 'var(--amber)' : 'var(--accent)' })))),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement(ui_1.Badge, { tone: s.status === 'online' ? 'green' : s.status === 'delayed' ? 'amber' : 'neutral', dot: true }, s.status === 'online' ? '已就绪' : s.status === 'delayed' ? '延迟' : '暂停')))))))),
        react_1.default.createElement("div", { className: "section-toolbar" },
            react_1.default.createElement("h2", { className: "section-title" }, "\u8D28\u91CF\u95EE\u9898\u5DE5\u4F5C\u6D41"),
            react_1.default.createElement(ui_1.Tabs, { items: [{ id: 'open', label: '待处理', count: open.length }, { id: 'resolved', label: '已修复', count: state.issues.length - open.length }, { id: 'all', label: '全部' }], value: status, onChange: setStatus })),
        react_1.default.createElement("div", { className: "issue-list" }, state.issues.filter(i => status === 'all' || i.status === status).map(i => react_1.default.createElement("div", { className: "issue-row card", key: i.id },
            react_1.default.createElement("span", { className: `issue-icon ${i.status === 'resolved' ? 'resolved' : ''}` },
                react_1.default.createElement(Icon_1.Icon, { name: i.status === 'resolved' ? 'check' : 'warning', size: 21 })),
            react_1.default.createElement("div", { className: "issue-body" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", null, i.title),
                    react_1.default.createElement(ui_1.Badge, { tone: i.status === 'resolved' ? 'green' : i.severity === 'medium' ? 'amber' : 'neutral' }, i.status === 'resolved' ? '已修复' : i.dimension)),
                react_1.default.createElement("p", null, i.description),
                react_1.default.createElement("small", null,
                    state.sources.find(s => s.id === i.sourceId)?.name,
                    " \u00B7 ",
                    (0, analytics_1.timeLabel)(i.detectedAt))),
            react_1.default.createElement(ui_1.Button, { icon: "spark", onClick: () => setIssue(i) }, i.status === 'resolved' ? '查看记录' : '修复建议')))),
        !state.issues.some(i => status === 'all' || i.status === status) && react_1.default.createElement(ui_1.Card, null,
            react_1.default.createElement(ui_1.Empty, { title: "\u6CA1\u6709\u5F85\u5904\u7406\u7684\u8D28\u91CF\u95EE\u9898", description: "\u6240\u6709\u6F14\u793A\u95EE\u9898\u5747\u5DF2\u5B8C\u6210\u5904\u7406\u3002" })),
        issue && react_1.default.createElement(ui_1.Modal, { title: "\u8D28\u91CF\u95EE\u9898\u4E0E\u4FEE\u590D\u5EFA\u8BAE", drawer: true, onClose: () => setIssue(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "branch", onClick: () => { setIssue(null); app.navigate('lineage'); } }, "\u67E5\u770B\u6570\u636E\u6EAF\u6E90"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !(0, analytics_1.canAdmin)(user) || issue.status === 'resolved', onClick: repair }, "\u5E94\u7528\u6A21\u62DF\u4FEE\u590D")) },
            react_1.default.createElement(ui_1.Badge, { tone: "amber" },
                issue.dimension,
                " \u00B7 ",
                issue.status === 'open' ? '待处理' : '已修复'),
            react_1.default.createElement("h2", { className: "detail-heading" }, issue.title),
            react_1.default.createElement("p", null, issue.description),
            react_1.default.createElement("h3", { className: "subheading" }, "\u89C4\u5219\u578B\u4FEE\u590D\u5EFA\u8BAE"),
            react_1.default.createElement("div", { className: "recommendation" },
                react_1.default.createElement(Icon_1.Icon, { name: "spark", size: 20 }),
                react_1.default.createElement("p", null, issue.suggestion)),
            react_1.default.createElement("dl", { className: "key-values" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("dt", null, "\u95EE\u9898\u7F16\u53F7"),
                    react_1.default.createElement("dd", { className: "mono" }, issue.id)),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("dt", null, "\u6570\u636E\u6E90"),
                    react_1.default.createElement("dd", null, state.sources.find(s => s.id === issue.sourceId)?.name)),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("dt", null, "\u68C0\u6D4B\u65F6\u95F4"),
                    react_1.default.createElement("dd", null, (0, analytics_1.timeLabel)(issue.detectedAt))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("dt", null, "\u5EFA\u8BAE\u6765\u6E90"),
                    react_1.default.createElement("dd", null, "\u9884\u7F6E\u89C4\u5219\u5E93\uFF0C\u672A\u8C03\u7528AI"))),
            react_1.default.createElement(ui_1.Notice, null, "\u201C\u5E94\u7528\u6A21\u62DF\u4FEE\u590D\u201D\u4EC5\u66F4\u65B0\u672C\u5730\u95EE\u9898\u72B6\u6001\u4E0E\u6F14\u793A\u8D28\u91CF\u6307\u6807\u3002\u771F\u5B9E\u5904\u7406\u5E94\u7ECF\u56DE\u6E90\u6821\u9A8C\u3001\u7248\u672C\u8BB0\u5F55\u548C\u4EBA\u5DE5\u590D\u6838\uFF0C\u4E0D\u80FD\u7528\u6309\u94AE\u4EE3\u66FF\u6570\u636E\u4FEE\u590D\u3002")));
}

},
"src/pages/Regimes.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Regimes;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const charts_1 = require("../components/charts");
const DateRange_1 = require("../components/DateRange");
const Icon_1 = require("../components/Icon");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
const MODELS = [
    { id: 'gmm-demo-2.1', name: 'GMM · 多资产状态', method: '高斯混合 / 无监督', version: 'v2.1', stability: '0.84', switch: '12', fit: '2025-10 → 2026-06', test: '2026-07 → 2026-09' },
    { id: 'hmm-demo-1.4', name: 'HMM · 状态连续性', method: '隐马尔可夫 / 无监督', version: 'v1.4', stability: '0.89', switch: '9', fit: '2025-10 → 2026-06', test: '2026-07 → 2026-09' },
    { id: 'kmeans-demo-1.0', name: 'KMeans · 基线', method: 'K均值 / 无监督', version: 'v1.0', stability: '0.76', switch: '18', fit: '2025-10 → 2026-06', test: '2026-07 → 2026-09' },
];
function Regimes() {
    const app = (0, AppContext_1.useApp)(), { assets, state, user, from, to } = app;
    const [tab, setTab] = (0, react_1.useState)('monitor'), [playing, setPlaying] = (0, react_1.useState)(false), [speed, setSpeed] = (0, react_1.useState)(1), [cursor, setCursor] = (0, react_1.useState)(999);
    const [inspect, setInspect] = (0, react_1.useState)(null), [annotationOpen, setAnnotationOpen] = (0, react_1.useState)(false), [note, setNote] = (0, react_1.useState)(''), [tag, setTag] = (0, react_1.useState)('range');
    const selected = assets.find(a => a.id === app.selectedAsset) || assets[0];
    const selectedPoints = (0, react_1.useMemo)(() => selected ? (0, analytics_1.sliceDates)(selected.prices, from, to) : [], [selected, from, to]);
    const at = Math.min(cursor, Math.max(0, selectedPoints.length - 1));
    const date = selectedPoints[at]?.date || to;
    const ps = selected?.prices.filter(p => p.date <= date) || [], stateNow = (0, analytics_1.sampleRegime)(ps), currentMetrics = (0, analytics_1.metrics)(ps);
    (0, react_1.useEffect)(() => { setPlaying(false); setCursor(Math.max(0, selectedPoints.length - 1)); }, [from, to, selected?.id]);
    (0, react_1.useEffect)(() => { if (!playing)
        return; if (at >= selectedPoints.length - 1) {
        setPlaying(false);
        return;
    } const timer = setTimeout(() => setCursor(c => c + 1), 850 / speed); return () => clearTimeout(timer); }, [playing, at, speed, selectedPoints.length]);
    const history = (0, react_1.useMemo)(() => selectedPoints.map(p => ({ ...p, state: (0, analytics_1.sampleRegime)(selected.prices.filter(x => x.date <= p.date)) })), [selected, selectedPoints]);
    let duration = 0;
    for (let i = at; i >= 0 && history[i]?.state.regime === stateNow.regime; i--)
        duration++;
    const transitions = history.slice(0, at + 1).reduce((s, row, i) => s + (i > 0 && row.state.regime !== history[i - 1].state.regime ? 1 : 0), 0);
    const exportStates = () => { (0, files_1.downloadCsv)('状态序列-演示.csv', ['日期', '资产', '状态', '归属度', '模型元数据', '说明'], history.map(p => [p.date, selected?.name, analytics_1.REGIMES[p.state.regime].label, p.state.confidence.toFixed(2), state.modelVersion, '本地演示分类器；非真实GMM/HMM推理'])); app.notify('已导出状态序列'); };
    const inspPoints = inspect?.asset.prices.filter(p => p.date <= inspect.date) || [];
    const inspState = (0, analytics_1.sampleRegime)(inspPoints), inspMetrics = (0, analytics_1.metrics)(inspPoints);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u5E02\u573A\u72B6\u6001", actions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { icon: "edit", disabled: !(0, analytics_1.canWrite)(user) || !selected, onClick: () => { setTag(stateNow.regime); setNote(''); setAnnotationOpen(true); } }, "\u6DFB\u52A0\u7814\u7A76\u6807\u6CE8"),
                react_1.default.createElement(ui_1.Button, { icon: "download", variant: "primary", onClick: exportStates }, "\u5BFC\u51FA\u72B6\u6001\u5E8F\u5217")) }),
        react_1.default.createElement(ui_1.Tabs, { items: [{ id: 'monitor', label: '状态监测' }, { id: 'profiles', label: '状态画像' }, { id: 'models', label: '模型与评估' }, { id: 'annotations', label: '研究标注', count: state.annotations.length }], value: tab, onChange: v => { setTab(v); setPlaying(false); } }),
        ['monitor', 'profiles'].includes(tab) && react_1.default.createElement("div", { className: "section-toolbar" },
            react_1.default.createElement("div", { className: "filter-row" },
                react_1.default.createElement("select", { "aria-label": "\u72B6\u6001\u53C2\u8003\u8D44\u4EA7", value: selected?.id || '', onChange: e => app.setSelectedAsset(e.target.value) }, assets.map(a => react_1.default.createElement("option", { key: a.id, value: a.id }, a.name))),
                react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u672C\u5730\u6F14\u793A\u5206\u7C7B\u5668")),
            react_1.default.createElement(DateRange_1.DateRange, null)),
        tab === 'monitor' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "replay-bar" },
                react_1.default.createElement("div", { className: "replay-title" },
                    react_1.default.createElement(Icon_1.Icon, { name: "clock", size: 18 }),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, "\u5386\u53F2\u56DE\u653E"),
                        react_1.default.createElement("small", null, "\u53EA\u4F7F\u7528\u56DE\u653E\u65E5\u53CA\u4E4B\u524D\u7684\u884C\u60C5"))),
                react_1.default.createElement("div", { className: "replay-controls" },
                    react_1.default.createElement(ui_1.IconButton, { icon: "rewind", label: "\u56DE\u5230\u533A\u95F4\u8D77\u70B9", onClick: () => { setPlaying(false); setCursor(0); } }),
                    react_1.default.createElement("button", { type: "button", "aria-label": playing ? '暂停回放' : '开始回放', className: "replay-play", disabled: selectedPoints.length < 2, onClick: () => { if (!playing && at >= selectedPoints.length - 1)
                            setCursor(0); setPlaying(!playing); } },
                        react_1.default.createElement(Icon_1.Icon, { name: playing ? 'pause' : 'play', size: 17 })),
                    react_1.default.createElement(ui_1.IconButton, { icon: "next", label: "\u56DE\u653E\u4E0B\u4E00\u65E5", disabled: at >= selectedPoints.length - 1, onClick: () => { setPlaying(false); setCursor(at + 1); } }),
                    react_1.default.createElement("select", { "aria-label": "\u56DE\u653E\u901F\u5EA6", value: speed, onChange: e => setSpeed(Number(e.target.value)) },
                        react_1.default.createElement("option", { value: 1 }, "1\u00D7"),
                        react_1.default.createElement("option", { value: 2 }, "2\u00D7"),
                        react_1.default.createElement("option", { value: 5 }, "5\u00D7"))),
                react_1.default.createElement("input", { "aria-label": "\u56DE\u653E\u65E5\u671F\u8FDB\u5EA6", type: "range", min: 0, max: Math.max(0, selectedPoints.length - 1), value: at, onChange: e => { setPlaying(false); setCursor(Number(e.target.value)); } }),
                react_1.default.createElement("strong", { className: "mono replay-date" }, date),
                react_1.default.createElement(ui_1.Badge, { tone: playing ? 'green' : 'neutral' }, playing ? '回放中' : '已暂停')),
            react_1.default.createElement("div", { className: "stats-grid" },
                react_1.default.createElement(ui_1.Stat, { label: "\u53C2\u8003\u8D44\u4EA7\u72B6\u6001", value: react_1.default.createElement("span", { className: `regime-text-${stateNow.regime}` }, analytics_1.REGIMES[stateNow.regime].label), detail: `${selected?.name || '暂无资产'} · ${date}`, icon: "activity" }),
                react_1.default.createElement(ui_1.Stat, { label: "\u72B6\u6001\u5F52\u5C5E\u5EA6", value: react_1.default.createElement(react_1.default.Fragment, null,
                        (0, analytics_1.number)(stateNow.confidence, 1),
                        react_1.default.createElement("small", null, "%")), detail: "\u6F14\u793A\u5206\u6570\uFF0C\u975E\u6821\u51C6\u7F6E\u4FE1\u6982\u7387", icon: "chart" }),
                react_1.default.createElement(ui_1.Stat, { label: "\u8FDE\u7EED\u72B6\u6001\u957F\u5EA6", value: react_1.default.createElement(react_1.default.Fragment, null,
                        duration,
                        react_1.default.createElement("small", null, "\u4E2A\u89C2\u6D4B\u65E5")), detail: "\u4EC5\u5728\u5F53\u524D\u7814\u7A76\u533A\u95F4\u5185\u7EDF\u8BA1", icon: "calendar" }),
                react_1.default.createElement(ui_1.Stat, { label: "\u533A\u95F4\u72B6\u6001\u5207\u6362", value: react_1.default.createElement(react_1.default.Fragment, null,
                        transitions,
                        react_1.default.createElement("small", null, "\u6B21")), detail: "\u622A\u81F3\u5F53\u524D\u56DE\u653E\u4F4D\u7F6E", icon: "branch" })),
            react_1.default.createElement(ui_1.Card, { title: "\u8DE8\u8D44\u4EA7\u72B6\u6001\u70ED\u529B\u56FE", action: react_1.default.createElement(charts_1.RegimeLegend, null) },
                react_1.default.createElement("div", { className: "card-inner" },
                    react_1.default.createElement(charts_1.Heatmap, { assets: assets, from: from, to: date, onSelect: (asset, date) => setInspect({ asset, date }) })),
                react_1.default.createElement("div", { className: "card-footnote" }, "\u7EFF\u8272\uFF1A\u6E29\u548C\u4E0A\u884C \u00B7 \u7C73\u9EC4\uFF1A\u533A\u95F4\u9707\u8361 \u00B7 \u7EA2\u8272\uFF1A\u627F\u538B\u4E0B\u884C\u3002")),
            react_1.default.createElement("div", { className: "two-col" },
                react_1.default.createElement(ui_1.Card, { title: "\u72B6\u6001\u65F6\u95F4\u8F74", subtitle: `${selected?.name || '参考资产'} · 合成价格与状态标签` },
                    react_1.default.createElement("div", { className: "card-inner" },
                        react_1.default.createElement(charts_1.TimeChart, { labels: selectedPoints.slice(0, at + 1).map(p => p.date), series: [{ name: selected?.name || '资产', values: selectedPoints.slice(0, at + 1).map(p => p.close) }], unit: "", height: 235 }),
                        react_1.default.createElement("div", { className: "regime-timeline" }, history.slice(0, at + 1).map(p => react_1.default.createElement("button", { type: "button", key: p.date, title: `${p.date} ${analytics_1.REGIMES[p.state.regime].label}`, style: { background: analytics_1.REGIMES[p.state.regime].color }, onClick: () => selected && setInspect({ asset: selected, date: p.date }), "aria-label": `查看${p.date}状态` }))))),
                react_1.default.createElement(ui_1.Card, { title: "\u5F53\u524D\u72B6\u6001\u7684\u4F9D\u636E", subtitle: "\u7279\u5F81\u503C\u7528\u4E8E\u89E3\u91CA\uFF0C\u4E0D\u4EE3\u8868\u56E0\u679C\u8D21\u732E" },
                    react_1.default.createElement("div", { className: "evidence-list" }, ['momentum20', 'volatility20', 'drawdown'].map(m => react_1.default.createElement("button", { type: "button", key: m, onClick: () => { app.setSelectedFeature(m); app.navigate('features'); } },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", null, analytics_1.METRICS[m].label),
                            react_1.default.createElement("b", null,
                                (0, analytics_1.number)(currentMetrics[m]),
                                "%")),
                        react_1.default.createElement("p", null, analytics_1.METRICS[m].description),
                        react_1.default.createElement(ui_1.ProgressBar, { value: Math.min(100, Math.abs(currentMetrics[m]) * 5) }))))))),
        tab === 'profiles' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "regime-profile-grid" }, Object.keys(analytics_1.REGIMES).map(r => { const rows = history.filter(p => p.state.regime === r); const daily = rows.map(p => (0, analytics_1.metrics)(selected.prices.filter(x => x.date <= p.date)).return1d); return react_1.default.createElement(ui_1.Card, { key: r, className: `profile-card profile-${r}`, title: analytics_1.REGIMES[r].label, subtitle: analytics_1.REGIMES[r].description, action: react_1.default.createElement(ui_1.Badge, null,
                    rows.length,
                    " \u65E5") },
                react_1.default.createElement("div", { className: "profile-big" },
                    (0, analytics_1.number)(history.length ? rows.length / history.length * 100 : 0, 1),
                    react_1.default.createElement("span", null, "%"),
                    react_1.default.createElement("small", null, "\u533A\u95F4\u5360\u6BD4")),
                react_1.default.createElement("dl", { className: "key-values" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u5E73\u5747\u65E5\u6536\u76CA"),
                        react_1.default.createElement("dd", { className: (0, analytics_1.mean)(daily) >= 0 ? 'positive' : 'negative' }, (0, analytics_1.signed)((0, analytics_1.mean)(daily)))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u5E73\u5747\u5F52\u5C5E\u5EA6"),
                        react_1.default.createElement("dd", null,
                            (0, analytics_1.number)((0, analytics_1.mean)(rows.map(p => p.state.confidence)), 1),
                            "%")),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u89C2\u5BDF\u5EFA\u8BAE"),
                        react_1.default.createElement("dd", null, r === 'bull' ? '关注动量与相关性' : r === 'bear' ? '复核波动与回撤' : '关注突破与分化')))); })),
            react_1.default.createElement(ui_1.Card, { title: "\u5404\u72B6\u6001\u4E0B\u7684\u8D44\u4EA7\u8868\u73B0", subtitle: "\u53C2\u8003\u8D44\u4EA7\u5212\u5206\u72B6\u6001\uFF0C\u540C\u65E5\u5408\u6210\u6536\u76CA\u6309\u72B6\u6001\u805A\u5408\uFF1B\u4E0D\u662F\u672A\u6765\u6536\u76CA\u6216\u7B56\u7565\u56DE\u6D4B" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u8D44\u4EA7"),
                                Object.keys(analytics_1.REGIMES).map(r => react_1.default.createElement("th", { key: r, className: "numeric" },
                                    analytics_1.REGIMES[r].label,
                                    " \u00B7 \u5E73\u5747\u65E5\u6536\u76CA")))),
                        react_1.default.createElement("tbody", null, assets.map(a => react_1.default.createElement("tr", { key: a.id },
                            react_1.default.createElement("td", null, a.name),
                            Object.keys(analytics_1.REGIMES).map(r => { const ds = history.filter(p => p.state.regime === r).map(p => p.date), value = (0, analytics_1.mean)(ds.map(d => (0, analytics_1.metrics)(a.prices.filter(p => p.date <= d)).return1d)); return react_1.default.createElement("td", { key: r, className: `numeric ${value >= 0 ? 'positive' : 'negative'}` }, ds.length ? (0, analytics_1.signed)(value) : '—'); })))))))),
        tab === 'models' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Notice, { tone: "warning" }, "\u4EE5\u4E0B\u6A21\u578B\u7248\u672C\u3001\u7A33\u5B9A\u6027\u4E0E\u5207\u6362\u6B21\u6570\u4E3A\u9884\u7F6E\u8BC4\u4F30\u5FEB\u7167\uFF0C\u672A\u8FD0\u884CGMM/HMM/KMeans\u8BAD\u7EC3\u3002\u201C\u4F7F\u7528\u6B64\u5FEB\u7167\u201D\u53EA\u5207\u6362\u6A21\u578B\u5143\u6570\u636E\uFF0C\u4E0D\u6539\u53D8\u6F14\u793A\u5206\u7C7B\u5668\u3002"),
            react_1.default.createElement("div", { className: "model-grid" }, MODELS.map(m => react_1.default.createElement(ui_1.Card, { key: m.id, className: state.modelVersion === m.id ? 'model-active' : '', title: m.name, subtitle: m.method, action: react_1.default.createElement(ui_1.Badge, { tone: state.modelVersion === m.id ? 'green' : 'neutral' }, state.modelVersion === m.id ? '当前展示' : m.version) },
                react_1.default.createElement("div", { className: "model-numbers" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, m.stability),
                        react_1.default.createElement("small", null, "\u7A33\u5B9A\u6027 \u00B7 \u9884\u7F6E")),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, m.switch),
                        react_1.default.createElement("small", null, "\u5207\u6362\u6B21\u6570 \u00B7 \u9884\u7F6E"))),
                react_1.default.createElement("dl", { className: "key-values" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u8BAD\u7EC3\u533A\u95F4\u793A\u4F8B"),
                        react_1.default.createElement("dd", null, m.fit)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u9A8C\u8BC1\u533A\u95F4\u793A\u4F8B"),
                        react_1.default.createElement("dd", null, m.test)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("dt", null, "\u72B6\u6001\u6570"),
                        react_1.default.createElement("dd", null, "3"))),
                react_1.default.createElement("div", { className: "card-inner" },
                    react_1.default.createElement(ui_1.Button, { className: "full-width", disabled: !(0, analytics_1.canAdmin)(user) || state.modelVersion === m.id, onClick: () => { app.update(s => ({ ...s, modelVersion: m.id }), `切换演示模型元数据 ${m.id}`, 'admin'); app.notify('已切换模型元数据；未执行模型训练或推理。'); } }, "\u4F7F\u7528\u6B64\u5FEB\u7167"))))),
            react_1.default.createElement(ui_1.Card, { title: "\u6B63\u5F0F\u8BC4\u4F30\u5E94\u68C0\u67E5\u4EC0\u4E48", subtitle: "\u5BF9\u5E94\u8D5B\u9898\u5BF9\u72B6\u6001\u89E3\u91CA\u3001\u6548\u679C\u8BBA\u8BC1\u4E0E\u7A33\u5B9A\u6027\u7684\u8981\u6C42" },
                react_1.default.createElement("div", { className: "guide-grid" }, [['01', '状态可解释性', '为状态命名提供特征画像与业务依据，避免只展示聚类编号。'], ['02', '样本外验证', '预处理和降维只在训练集拟合；使用时间切分验证模型。'], ['03', '连续性与延迟', '记录状态持续时间、切换频率与识别延迟，避免频繁抖动。'], ['04', '预警回测', '明确事件定义，报告误报、漏报与触发延迟，而不是只给准确率。']].map(([n, title, p]) => react_1.default.createElement("div", { key: n },
                    react_1.default.createElement("span", null, n),
                    react_1.default.createElement("h3", null, title),
                    react_1.default.createElement("p", null, p)))))),
        tab === 'annotations' && react_1.default.createElement(ui_1.Card, { title: "\u5386\u53F2\u7814\u7A76\u6807\u6CE8", subtitle: "\u4EBA\u5DE5\u5224\u65AD\u4E0E\u6F14\u793A\u72B6\u6001\u5206\u5F00\u4FDD\u5B58\uFF0C\u4E0D\u4F5C\u4E3A\u6A21\u578B\u771F\u5B9E\u6807\u7B7E" },
            react_1.default.createElement("div", { className: "table-scroll" },
                react_1.default.createElement("table", { className: "data-table" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", null, "\u65E5\u671F"),
                            react_1.default.createElement("th", null, "\u8D44\u4EA7"),
                            react_1.default.createElement("th", null, "\u4EBA\u5DE5\u6807\u7B7E"),
                            react_1.default.createElement("th", null, "\u7814\u7A76\u4F9D\u636E"),
                            react_1.default.createElement("th", null, "\u4F5C\u8005"),
                            react_1.default.createElement("th", null))),
                    react_1.default.createElement("tbody", null, state.annotations.filter(a => assets.some(x => x.id === a.assetId)).map(a => react_1.default.createElement("tr", { key: a.id },
                        react_1.default.createElement("td", null, a.date),
                        react_1.default.createElement("td", null, assets.find(x => x.id === a.assetId)?.name),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement(ui_1.Badge, { tone: a.regime === 'bull' ? 'green' : a.regime === 'bear' ? 'red' : 'amber' }, analytics_1.REGIMES[a.regime].label)),
                        react_1.default.createElement("td", { className: "wrap-cell" }, a.note),
                        react_1.default.createElement("td", null, a.author),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement(ui_1.IconButton, { icon: "trash", label: "\u5220\u9664\u6807\u6CE8", disabled: !(0, analytics_1.canWrite)(user), onClick: () => app.update(s => ({ ...s, annotations: s.annotations.filter(x => x.id !== a.id) }), '删除研究标注') }))))))),
            !state.annotations.some(a => assets.some(x => x.id === a.assetId)) && react_1.default.createElement(ui_1.Empty, { title: "\u8FD8\u6CA1\u6709\u7814\u7A76\u6807\u6CE8", description: "\u5728\u72B6\u6001\u76D1\u6D4B\u4E2D\u9009\u62E9\u65E5\u671F\uFF0C\u6DFB\u52A0\u4F60\u7684\u89C2\u5BDF\u4E0E\u4E8B\u4EF6\u4F9D\u636E\u3002" })),
        inspect && react_1.default.createElement(ui_1.Modal, { title: `${inspect.asset.name} · 状态解释`, drawer: true, onClose: () => setInspect(null), footer: react_1.default.createElement(ui_1.Button, { icon: "branch", onClick: () => { app.setSelectedAsset(inspect.asset.id); app.setSelectedFeature('momentum20'); setInspect(null); app.navigate('lineage'); } }, "\u4ECE\u72B6\u6001\u8FFD\u6EAF\u5230\u539F\u59CB\u6570\u636E") },
            react_1.default.createElement("div", { className: "state-inspect-head" },
                react_1.default.createElement(ui_1.Badge, { tone: "amber" },
                    "\u5408\u6210\u6570\u636E \u00B7 ",
                    inspect.date),
                react_1.default.createElement("h2", { style: { color: analytics_1.REGIMES[inspState.regime].color } }, analytics_1.REGIMES[inspState.regime].label),
                react_1.default.createElement("p", null, analytics_1.REGIMES[inspState.regime].description)),
            react_1.default.createElement("h3", { className: "subheading" }, "\u72B6\u6001\u5F52\u5C5E\u5206\u5E03"),
            react_1.default.createElement("div", { className: "probability-list" }, Object.keys(analytics_1.REGIMES).map(r => react_1.default.createElement("div", { key: r },
                react_1.default.createElement("span", null,
                    analytics_1.REGIMES[r].label,
                    react_1.default.createElement("b", null,
                        (0, analytics_1.number)(inspState.probabilities[r], 1),
                        "%")),
                react_1.default.createElement(ui_1.ProgressBar, { value: inspState.probabilities[r], color: analytics_1.REGIMES[r].color })))),
            react_1.default.createElement("h3", { className: "subheading" }, "\u5BF9\u5E94\u7279\u5F81\u5FEB\u7167"),
            react_1.default.createElement("dl", { className: "key-values" },
                ['return1d', 'momentum20', 'volatility20', 'drawdown'].map(m => react_1.default.createElement("div", { key: m },
                    react_1.default.createElement("dt", null, analytics_1.METRICS[m].label),
                    react_1.default.createElement("dd", null,
                        (0, analytics_1.number)(inspMetrics[m]),
                        "%"))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("dt", null, "\u6700\u5927\u53EF\u89C1\u65E5\u671F"),
                    react_1.default.createElement("dd", null, inspPoints.at(-1)?.date)),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("dt", null, "\u6A21\u578B\u5143\u6570\u636E"),
                    react_1.default.createElement("dd", { className: "mono" }, state.modelVersion))),
            react_1.default.createElement(ui_1.Notice, null, "\u6B64\u5904\u4F7F\u7528\u5F53\u65E5\u53CA\u4E4B\u524D\u7684\u4EF7\u683C\u8BA1\u7B97\u6F14\u793A\u5206\u6570\u3002GMM\u7B49\u6A21\u578B\u540D\u79F0\u4EC5\u4E3A\u670D\u52A1\u63A5\u5165\u524D\u7684\u5C55\u793A\u5FEB\u7167\uFF0C\u4E0D\u4EE3\u8868\u5DF2\u6267\u884C\u771F\u5B9E\u6A21\u578B\u3002")),
        annotationOpen && react_1.default.createElement(ui_1.Modal, { title: "\u6DFB\u52A0\u5386\u53F2\u7814\u7A76\u6807\u6CE8", onClose: () => setAnnotationOpen(false), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setAnnotationOpen(false) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !note.trim(), onClick: () => { if (!selected)
                        return; app.update(s => ({ ...s, annotations: [{ id: (0, analytics_1.uid)('ann'), assetId: selected.id, date, regime: tag, note: note.trim(), author: user?.name || '演示用户' }, ...s.annotations] }), '添加历史研究标注'); setAnnotationOpen(false); app.notify('研究标注已保存'); } }, "\u4FDD\u5B58\u6807\u6CE8")) },
            react_1.default.createElement(ui_1.Notice, null,
                "\u53C2\u8003\u8D44\u4EA7 ",
                selected?.name,
                " \u00B7 \u56DE\u653E\u65E5\u671F ",
                date,
                "\u3002\u6807\u6CE8\u4EC5\u8868\u8FBE\u4EBA\u5DE5\u7814\u7A76\u610F\u89C1\uFF0C\u4E0D\u66FF\u6362\u6A21\u578B\u72B6\u6001\u3002"),
            react_1.default.createElement(ui_1.Field, { label: "\u4EBA\u5DE5\u72B6\u6001\u6807\u7B7E" },
                react_1.default.createElement("select", { value: tag, onChange: e => setTag(e.target.value) }, Object.keys(analytics_1.REGIMES).map(r => react_1.default.createElement("option", { value: r, key: r }, analytics_1.REGIMES[r].label)))),
            react_1.default.createElement(ui_1.Field, { label: "\u4E8B\u4EF6\u6216\u7814\u7A76\u4F9D\u636E" },
                react_1.default.createElement("textarea", { value: note, maxLength: 1000, rows: 4, placeholder: "\u8BB0\u5F55\u6240\u4F9D\u636E\u7684\u4E8B\u4EF6\u3001\u7279\u5F81\u53D8\u5316\u4E0E\u4E0D\u786E\u5B9A\u6027\u2026", onChange: e => setNote(e.target.value) }))));
}

},
"src/pages/Settings.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = Login;
exports.default = Settings;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const Icon_1 = require("../components/Icon");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
function Login() {
    const app = (0, AppContext_1.useApp)();
    const [mode, setMode] = (0, react_1.useState)('login'), [email, setEmail] = (0, react_1.useState)('analyst@regimelab.example'), [name, setName] = (0, react_1.useState)(''), [code, setCode] = (0, react_1.useState)(''), [error, setError] = (0, react_1.useState)('');
    const submit = (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('请输入有效邮箱格式（仅演示，不会发送邮件）');
            return;
        }
        if (!/^\d{6}$/.test(code)) {
            setError('请输入任意6位数字作为演示验证码');
            return;
        }
        if (mode === 'login') {
            const user = app.state.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.active);
            if (!user) {
                setError('该演示账号不存在或已停用，可先注册或使用下方体验账号。');
                return;
            }
            app.login(user.id);
        }
        else {
            if (!name.trim()) {
                setError('请输入姓名');
                return;
            }
            if (app.state.users.some(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
                setError('此演示邮箱已存在');
                return;
            }
            const id = (0, analytics_1.uid)('user');
            app.update(s => ({ ...s, users: [...s.users, { id, name: name.trim(), email: email.trim(), role: 'viewer', allowedClasses: ['equity', 'bond'], active: true }], sessionUserId: id }), '注册本地演示账号', 'self');
            app.navigate('overview');
        }
    };
    return react_1.default.createElement("div", { className: "login-page" },
        react_1.default.createElement("div", { className: "login-art" },
            react_1.default.createElement(Icon_1.Brand, { large: true }),
            react_1.default.createElement("div", { className: "login-pitch" },
                react_1.default.createElement("h1", null, "\u5E02\u573A\u7814\u7A76\u5DE5\u4F5C\u53F0"),
                react_1.default.createElement("div", { className: "login-lines" },
                    react_1.default.createElement("svg", { viewBox: "0 0 600 180", fill: "none" },
                        react_1.default.createElement("path", { d: "M0 150 30 140 60 148 90 110 120 120 150 90 180 101 210 73 240 83 270 57 300 78 330 39 360 50 390 27 420 42 450 20 480 38 510 12 540 27 600 4", stroke: "#b4d9bc", strokeWidth: "3" }),
                        react_1.default.createElement("path", { d: "M0 160 60 148 120 158 180 138 240 147 300 114 360 129 420 108 480 117 540 84 600 100", stroke: "#819e95", strokeWidth: "2" })))),
            react_1.default.createElement("p", { className: "login-footnote" }, "FinTech \u00B7 \u91D1\u878D\u79D1\u6280\u7ADE\u8D5B\u524D\u7AEF\u6F14\u793A")),
        react_1.default.createElement("div", { className: "login-form-side" },
            react_1.default.createElement("div", { className: "login-form" },
                react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u6A21\u62DF\u73AF\u5883 \u00B7 \u4E0D\u8FDB\u884C\u771F\u5B9E\u8EAB\u4EFD\u8BA4\u8BC1"),
                react_1.default.createElement("h2", null, mode === 'login' ? '欢迎回到 FinTech' : '创建演示账号'),
                react_1.default.createElement(ui_1.Tabs, { value: mode, items: [{ id: 'login', label: '登录' }, { id: 'signup', label: '注册演示账号' }], onChange: v => { setMode(v); setError(''); } }),
                react_1.default.createElement("form", { onSubmit: submit },
                    mode === 'signup' && react_1.default.createElement(ui_1.Field, { label: "\u59D3\u540D" },
                        react_1.default.createElement("input", { value: name, autoComplete: "off", maxLength: 30, onChange: e => setName(e.target.value) })),
                    react_1.default.createElement(ui_1.Field, { label: "\u6F14\u793A\u90AE\u7BB1" },
                        react_1.default.createElement("input", { type: "email", value: email, autoComplete: "off", onChange: e => setEmail(e.target.value) })),
                    react_1.default.createElement(ui_1.Field, { label: "\u6F14\u793A\u9A8C\u8BC1\u7801", hint: "\u586B\u5199\u4EFB\u610F6\u4F4D\u6570\u5B57\uFF1B\u4E0D\u4F1A\u53D1\u9001\u6216\u6821\u9A8C\u771F\u5B9E\u90AE\u4EF6\u3002" },
                        react_1.default.createElement("input", { value: code, inputMode: "numeric", pattern: "[0-9]{6}", maxLength: 6, autoComplete: "off", placeholder: "\u4F8B\u5982 123456\uFF08\u4EC5\u6F14\u793A\uFF09", onChange: e => setCode(e.target.value) })),
                    error && react_1.default.createElement(ui_1.Notice, { tone: "warning" }, error),
                    react_1.default.createElement(ui_1.Button, { type: "submit", variant: "primary", className: "full-width" },
                        mode === 'login' ? '进入研究工作台' : '创建观察员演示账号',
                        react_1.default.createElement(Icon_1.Icon, { name: "arrow", size: 16 }))),
                react_1.default.createElement("div", { className: "demo-login-divider" },
                    react_1.default.createElement("span", null, "\u6216\u9009\u62E9\u8EAB\u4EFD\u76F4\u63A5\u4F53\u9A8C")),
                react_1.default.createElement("div", { className: "demo-roles" }, app.state.users.filter(u => ['u-admin', 'u-analyst', 'u-viewer'].includes(u.id) && u.active).map(u => react_1.default.createElement("button", { type: "button", key: u.id, onClick: () => app.login(u.id) },
                    react_1.default.createElement(Icon_1.Icon, { name: u.role === 'admin' ? 'shield' : u.role === 'analyst' ? 'chart' : 'user', size: 20 }),
                    react_1.default.createElement("strong", null, analytics_1.ROLE_LABELS[u.role])))),
                react_1.default.createElement("p", { className: "login-disclaimer" }, "\u8D26\u53F7\u53EA\u4FDD\u5B58\u5728\u672C\u6D4F\u89C8\u5668\u3002\u8BF7\u52FF\u586B\u5199\u771F\u5B9E\u5BC6\u7801\u3001\u4E2A\u4EBA\u654F\u611F\u4FE1\u606F\u6216\u751F\u4EA7\u51ED\u636E\u3002"))));
}
function Settings() {
    const app = (0, AppContext_1.useApp)(), { state, user } = app;
    const [tab, setTab] = (0, react_1.useState)('preferences'), [editing, setEditing] = (0, react_1.useState)(null), [error, setError] = (0, react_1.useState)(''), [resetOpen, setResetOpen] = (0, react_1.useState)(false), [displayName, setDisplayName] = (0, react_1.useState)(user?.name || '');
    const saveUser = () => {
        if (!editing)
            return;
        if (!editing.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editing.email.trim())) {
            setError('请输入姓名和有效邮箱格式');
            return;
        }
        if (!editing.allowedClasses.length) {
            setError('至少选择一种可访问资产类别');
            return;
        }
        if (state.users.some(u => u.id !== editing.id && u.email.toLowerCase() === editing.email.toLowerCase().trim())) {
            setError('邮箱已被其他演示账号使用');
            return;
        }
        const old = state.users.find(u => u.id === editing.id);
        if (old?.role === 'admin' && (editing.role !== 'admin' || !editing.active) && !state.users.some(u => u.id !== editing.id && u.role === 'admin' && u.active)) {
            setError('不能停用或降级最后一个管理员');
            return;
        }
        if (app.update(s => ({ ...s, users: old ? s.users.map(u => u.id === editing.id ? { ...editing, name: editing.name.trim(), email: editing.email.trim() } : u) : [...s.users, { ...editing, name: editing.name.trim(), email: editing.email.trim() }] }), `保存演示成员 ${editing.name}`, 'admin')) {
            setEditing(null);
            app.notify('演示成员与访问范围已保存');
        }
    };
    const pref = (key, value) => app.update(s => ({ ...s, prefs: { ...s.prefs, [key]: value } }), undefined, 'self');
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u56E2\u961F\u4E0E\u8BBE\u7F6E", actions: react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u6240\u6709\u6743\u9650\u5747\u4E3A\u524D\u7AEF\u6A21\u62DF") }),
        react_1.default.createElement(ui_1.Tabs, { value: tab, onChange: setTab, items: [{ id: 'preferences', label: '个人偏好' }, { id: 'team', label: '团队成员', count: state.users.length }, { id: 'permissions', label: '权限矩阵' }, { id: 'audit', label: '操作记录' }, { id: 'workspace', label: '工作区数据' }] }),
        tab === 'preferences' && react_1.default.createElement("div", { className: "settings-columns" },
            react_1.default.createElement(ui_1.Card, { title: "\u4E2A\u4EBA\u8D44\u6599", subtitle: "\u6B64\u8D44\u6599\u4EC5\u7528\u4E8E\u672C\u5730\u6F14\u793A" },
                react_1.default.createElement("div", { className: "card-inner" },
                    react_1.default.createElement("div", { className: "profile-header" },
                        react_1.default.createElement("span", { className: "avatar avatar-large" }, user?.name.slice(-2)),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("h3", null, user?.name),
                            react_1.default.createElement("p", null, user?.email),
                            react_1.default.createElement(ui_1.Badge, null, user ? analytics_1.ROLE_LABELS[user.role] : ''))),
                    react_1.default.createElement(ui_1.Field, { label: "\u663E\u793A\u540D\u79F0" },
                        react_1.default.createElement("input", { value: displayName, maxLength: 30, onChange: e => setDisplayName(e.target.value) })),
                    react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !displayName.trim(), onClick: () => { app.update(s => ({ ...s, users: s.users.map(u => u.id === user?.id ? { ...u, name: displayName.trim() } : u) }), '修改个人显示名称', 'self'); app.notify('个人资料已更新'); } }, "\u4FDD\u5B58\u8D44\u6599"))),
            react_1.default.createElement(ui_1.Card, { title: "\u7814\u7A76\u504F\u597D", subtitle: "\u66F4\u6539\u7ACB\u5373\u751F\u6548\u5E76\u4FDD\u5B58\u5728\u672C\u6D4F\u89C8\u5668" },
                react_1.default.createElement("div", { className: "preference-list" }, [
                    ['positiveGreen', '绿涨红跌', '关闭后切换为红涨绿跌；状态热力图保持语义颜色。'], ['compact', '紧凑表格', '降低表格行高，显示更多数据。'], ['live', '模拟实时推送', '每5秒生成一个示例行情事件。']
                ].map(([key, title, desc]) => react_1.default.createElement("div", { key: key },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, title),
                        react_1.default.createElement("p", null, desc)),
                    react_1.default.createElement(ui_1.Toggle, { label: title, checked: state.prefs[key], onChange: v => pref(key, v) })))))),
        tab === 'team' && react_1.default.createElement(react_1.default.Fragment, null, !(0, analytics_1.canAdmin)(user) ? react_1.default.createElement(ui_1.Card, null,
            react_1.default.createElement(EmptyPermission, null)) : react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "section-toolbar" },
                react_1.default.createElement("span", { className: "muted" }, "\u7BA1\u7406\u5458\u53EF\u7EF4\u62A4\u6F14\u793A\u6210\u5458\u3001\u89D2\u8272\u4E0E\u6570\u636E\u8BBF\u95EE\u8303\u56F4\u3002"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", icon: "plus", onClick: () => { setError(''); setEditing({ id: (0, analytics_1.uid)('user'), name: '', email: '', role: 'viewer', allowedClasses: ['equity', 'bond'], active: true }); } }, "\u6DFB\u52A0\u6F14\u793A\u6210\u5458")),
            react_1.default.createElement(ui_1.Card, { className: "table-card" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u6210\u5458"),
                                react_1.default.createElement("th", null, "\u89D2\u8272"),
                                react_1.default.createElement("th", null, "\u8D44\u4EA7\u8BBF\u95EE\u8303\u56F4"),
                                react_1.default.createElement("th", null, "\u72B6\u6001"),
                                react_1.default.createElement("th", null))),
                        react_1.default.createElement("tbody", null, state.users.map(u => react_1.default.createElement("tr", { key: u.id },
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("div", { className: "member-cell" },
                                    react_1.default.createElement("span", { className: "avatar" }, u.name.slice(-2)),
                                    react_1.default.createElement("div", null,
                                        react_1.default.createElement("strong", null, u.name),
                                        react_1.default.createElement("small", { className: "block muted" }, u.email)))),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, { tone: u.role === 'admin' ? 'purple' : u.role === 'analyst' ? 'green' : 'neutral' }, analytics_1.ROLE_LABELS[u.role])),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("div", { className: "badge-list" }, u.allowedClasses.map(c => react_1.default.createElement(ui_1.Badge, { key: c }, analytics_1.CLASS_LABELS[c])))),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, { dot: true, tone: u.active ? 'green' : 'neutral' }, u.active ? '已启用' : '已停用')),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Button, { variant: "ghost", icon: "edit", onClick: () => { setEditing({ ...u, allowedClasses: [...u.allowedClasses] }); setError(''); } }, "\u7F16\u8F91")))))))))),
        tab === 'permissions' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Notice, { tone: "warning" }, "\u9875\u9762\u7981\u7528\u3001\u6A21\u62DFAPI\u6743\u9650\u548C\u8D44\u4EA7\u8FC7\u6EE4\u4E0D\u662F\u5B89\u5168\u8FB9\u754C\u3002\u751F\u4EA7\u73AF\u5883\u5FC5\u987B\u7531JWT/OAuth2\u4E0E\u670D\u52A1\u7AEF\u6570\u636E\u6388\u6743\u5B9E\u65BD\uFF1B\u4EFB\u4F55\u7528\u6237\u90FD\u80FD\u4FEE\u6539\u6D4F\u89C8\u5668\u5185\u7684\u6A21\u62DF\u72B6\u6001\u3002"),
            react_1.default.createElement(ui_1.Card, { title: "\u89D2\u8272\u80FD\u529B\u77E9\u9635", subtitle: "\u9ED8\u8BA4\u89D2\u8272\u7684\u6F14\u793A\u884C\u4E3A" },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table permissions-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u80FD\u529B"),
                                react_1.default.createElement("th", null, "\u89C2\u5BDF\u5458"),
                                react_1.default.createElement("th", null, "\u5206\u6790\u5E08"),
                                react_1.default.createElement("th", null, "\u7BA1\u7406\u5458"))),
                        react_1.default.createElement("tbody", null, [
                            ['查看行情 / 状态 / 热力图', true, true, true], ['自定义个人看板 / 导出可见数据', true, true, true], ['研报 / 舆情资料', false, true, true], ['特征定义 / 预警规则 / 人工标注', false, true, true], ['确认与处理预警', false, true, true], ['导入CSV / 数据源开关 / 模拟修复', false, false, true], ['模型元数据 / 快照恢复 / 限流配置', false, false, true], ['团队成员与角色管理', false, false, true]
                        ].map(([name, ...roles]) => react_1.default.createElement("tr", { key: String(name) },
                            react_1.default.createElement("td", null, name),
                            roles.map((allowed, i) => react_1.default.createElement("td", { key: i }, allowed ? react_1.default.createElement("span", { className: "permission-yes" },
                                react_1.default.createElement(Icon_1.Icon, { name: "check", size: 17 }),
                                "\u5141\u8BB8") : react_1.default.createElement("span", { className: "muted" }, "\u2014")))))))))),
        tab === 'audit' && react_1.default.createElement(ui_1.Card, { title: "\u672C\u5730\u64CD\u4F5C\u8BB0\u5F55", subtitle: "\u4FDD\u7559\u6700\u8FD1100\u6761\uFF1B\u4E0D\u662F\u4E0D\u53EF\u7BE1\u6539\u7684\u5B89\u5168\u5BA1\u8BA1\u65E5\u5FD7" },
            react_1.default.createElement("div", { className: "table-scroll" },
                react_1.default.createElement("table", { className: "data-table" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", null, "\u64CD\u4F5C"),
                            react_1.default.createElement("th", null, "\u64CD\u4F5C\u8005"),
                            react_1.default.createElement("th", null, "\u65F6\u95F4"),
                            react_1.default.createElement("th", null, "\u8BB0\u5F55ID"))),
                    react_1.default.createElement("tbody", null, state.audit.map(a => react_1.default.createElement("tr", { key: a.id },
                        react_1.default.createElement("td", null, a.action),
                        react_1.default.createElement("td", null, a.actor),
                        react_1.default.createElement("td", null, (0, analytics_1.timeLabel)(a.at)),
                        react_1.default.createElement("td", { className: "mono muted small" }, a.id))))))),
        tab === 'workspace' && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "two-col" },
                react_1.default.createElement(ui_1.Card, { title: "\u6F14\u793A\u6570\u636E\u4E0E\u73AF\u5883", subtitle: "\u6B64\u7248\u672C\u4E0D\u4F9D\u8D56\u540E\u7AEF\u5373\u53EF\u8FD0\u884C" },
                    react_1.default.createElement("dl", { className: "key-values" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u6570\u636E\u6A21\u5F0F"),
                            react_1.default.createElement("dd", null, "\u672C\u5730\u5408\u6210\u6837\u672C")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u5B58\u50A8\u952E"),
                            react_1.default.createElement("dd", { className: "mono" }, "regimelab.demo.v1")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u72B6\u6001\u7248\u672C"),
                            react_1.default.createElement("dd", null, "schema 1")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u4E1A\u52A1\u72B6\u6001\u5927\u5C0F"),
                            react_1.default.createElement("dd", null,
                                (new Blob([JSON.stringify(state)]).size / 1024).toFixed(1),
                                " KB")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u5386\u53F2\u884C\u60C5"),
                            react_1.default.createElement("dd", null, "12\u4E2A\u6837\u672C\u6807\u7684 \u00D7 260\u4E2A\u5DE5\u4F5C\u65E5")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("dt", null, "\u771F\u5B9E\u57FA\u7840\u8BBE\u65BD"),
                            react_1.default.createElement("dd", null,
                                react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u5C1A\u672A\u8FDE\u63A5")))),
                    react_1.default.createElement("div", { className: "card-inner" },
                        react_1.default.createElement(ui_1.Button, { icon: "download", disabled: !(0, analytics_1.canAdmin)(user), onClick: () => (0, files_1.downloadFile)('FinTech-demo-workspace.json', JSON.stringify({ notice: '本地演示工作区；请勿包含真实敏感数据', ...state }, null, 2), 'application/json') }, "\u5BFC\u51FA\u5DE5\u4F5C\u533A\u72B6\u6001\uFF08\u7BA1\u7406\u5458\uFF09"))),
                react_1.default.createElement(ui_1.Card, { title: "\u91CD\u7F6E\u6F14\u793A\u5DE5\u4F5C\u533A", subtitle: "\u6E05\u9664\u672C\u5E94\u7528\u7684\u89C4\u5219\u3001\u6807\u6CE8\u3001\u5BFC\u5165\u6570\u636E\u4E0E\u4E2A\u4EBA\u8BBE\u7F6E" },
                    react_1.default.createElement("div", { className: "card-inner" },
                        react_1.default.createElement(ui_1.Notice, { tone: "warning" }, "\u91CD\u7F6E\u540E\u6062\u590D\u9ED8\u8BA4\u6A21\u62DF\u6570\u636E\uFF0C\u5176\u4ED6\u7F51\u7AD9\u548C\u5E94\u7528\u7684\u6D4F\u89C8\u5668\u6570\u636E\u4E0D\u53D7\u5F71\u54CD\u3002"),
                        react_1.default.createElement(ui_1.Button, { variant: "danger", icon: "refresh", onClick: () => setResetOpen(true) }, "\u91CD\u7F6E\u4E3A\u521D\u59CB\u6F14\u793A"),
                        react_1.default.createElement("p", { className: "small muted" }, "\u4E0D\u4F1A\u8BBF\u95EE\u6216\u5220\u9664\u4EFB\u4F55\u771F\u5B9E\u540E\u53F0\u6570\u636E\u3002\u6F14\u793A\u6210\u5458\u6062\u590D\u4E3A\u7BA1\u7406\u5458\u3001\u5206\u6790\u5E08\u4E0E\u89C2\u5BDF\u5458\u3002"))))),
        editing && react_1.default.createElement(ui_1.Modal, { title: state.users.some(u => u.id === editing.id) ? '编辑演示成员' : '添加演示成员', onClose: () => setEditing(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setEditing(null) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", onClick: saveUser }, "\u4FDD\u5B58\u6210\u5458")) },
            react_1.default.createElement("div", { className: "form-grid" },
                react_1.default.createElement(ui_1.Field, { label: "\u59D3\u540D" },
                    react_1.default.createElement("input", { maxLength: 30, value: editing.name, onChange: e => setEditing({ ...editing, name: e.target.value }) })),
                react_1.default.createElement(ui_1.Field, { label: "\u6F14\u793A\u90AE\u7BB1" },
                    react_1.default.createElement("input", { type: "email", value: editing.email, onChange: e => setEditing({ ...editing, email: e.target.value }) })),
                react_1.default.createElement(ui_1.Field, { label: "\u89D2\u8272" },
                    react_1.default.createElement("select", { value: editing.role, onChange: e => setEditing({ ...editing, role: e.target.value }) }, Object.entries(analytics_1.ROLE_LABELS).map(([r, label]) => react_1.default.createElement("option", { value: r, key: r }, label)))),
                react_1.default.createElement(ui_1.Field, { label: "\u8D26\u53F7\u72B6\u6001" },
                    react_1.default.createElement("select", { value: editing.active ? 'active' : 'disabled', onChange: e => setEditing({ ...editing, active: e.target.value === 'active' }) },
                        react_1.default.createElement("option", { value: "active" }, "\u542F\u7528"),
                        react_1.default.createElement("option", { value: "disabled" }, "\u505C\u7528")))),
            react_1.default.createElement("fieldset", { className: "checkbox-fieldset" },
                react_1.default.createElement("legend", null, "\u5141\u8BB8\u8BBF\u95EE\u7684\u8D44\u4EA7\u7C7B\u522B"),
                Object.entries(analytics_1.CLASS_LABELS).map(([id, label]) => react_1.default.createElement("label", { key: id },
                    react_1.default.createElement("input", { type: "checkbox", checked: editing.allowedClasses.includes(id), onChange: e => setEditing({ ...editing, allowedClasses: e.target.checked ? [...editing.allowedClasses, id] : editing.allowedClasses.filter(c => c !== id) }) }),
                    label))),
            error && react_1.default.createElement(ui_1.Notice, { tone: "warning" }, error),
            react_1.default.createElement("p", { className: "small muted" }, "\u4E0D\u4F1A\u53D1\u9001\u9080\u8BF7\u90AE\u4EF6\uFF1B\u6210\u5458\u4FE1\u606F\u4EC5\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u3002")),
        resetOpen && react_1.default.createElement(ui_1.Modal, { title: "\u786E\u8BA4\u91CD\u7F6E\u6F14\u793A\u5DE5\u4F5C\u533A\uFF1F", onClose: () => setResetOpen(false), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setResetOpen(false) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "danger", onClick: () => { app.reset(); setResetOpen(false); } }, "\u786E\u8BA4\u91CD\u7F6E")) },
            react_1.default.createElement("p", null, "\u5F53\u524D\u6D4F\u89C8\u5668\u4E2D\u7684\u89C4\u5219\u3001\u6807\u6CE8\u3001\u5BFC\u5165\u6587\u4EF6\u3001\u6210\u5458\u4E0E\u4E2A\u4EBA\u914D\u7F6E\u4F1A\u88AB\u9ED8\u8BA4\u6F14\u793A\u5185\u5BB9\u66FF\u6362\u3002")));
}
function EmptyPermission() { return react_1.default.createElement("div", { className: "empty" },
    react_1.default.createElement("div", { className: "empty-icon" },
        react_1.default.createElement(Icon_1.Icon, { name: "lock", size: 27 })),
    react_1.default.createElement("h3", null, "\u6B64\u9875\u9762\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"),
    react_1.default.createElement("p", null, "\u4E2A\u4EBA\u504F\u597D\u4E0E\u6743\u9650\u77E9\u9635\u4ECD\u53EF\u67E5\u770B\u3002\u53EF\u4EE5\u5728\u5934\u50CF\u83DC\u5355\u5207\u6362\u7BA1\u7406\u5458\u6F14\u793A\u8D26\u53F7\u3002")); }

},
"src/pages/System.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = System;
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../state/AppContext");
const ui_1 = require("../components/ui");
const Icon_1 = require("../components/Icon");
const analytics_1 = require("../lib/analytics");
const files_1 = require("../lib/files");
const SERVICES = [
    ['Data Service', '数据查询 / 标准化接口', 'REST · GraphQL', '1', '18 ms'], ['Feature Service', '特征目录 / 版本 / 快照', 'REST · Redis', '1', '12 ms'], ['Alert Service', '规则 / 检测 / 通知', 'REST · WebSocket', '1', '9 ms'],
    ['Model Worker', '状态识别 / 模型评估', 'Python · ML', '1', '420 ms'], ['Flink', '1d窗口 / 特征计算', 'Checkpoint / Savepoint', '2', '28 ms'], ['Kafka', '事件传输与消费', '分区 · Consumer Group', '3', '5 ms'],
    ['MySQL', '元数据 / 用户 / 配置', '关系型存储', '1', '6 ms'], ['ClickHouse', '行情 / 时序 / 分析', '列式时序数据', '1', '14 ms'], ['Redis + Caffeine', '热特征 / 本地缓存', '分布式 + 进程内缓存', '1', '3 ms'], ['MinIO', '原始资料 / 模型文件', '对象存储', '1', '21 ms'],
];
const TARGETS = [['端到端延迟', '< 100 ms', '76 ms'], ['数据吞吐量', '> 10万条/秒', '128,400 条/秒'], ['特征计算延迟', '< 50 ms', '28 ms'], ['状态识别延迟', '< 1 s', '420 ms'], ['热特征访问', '< 10 ms', '3 ms'], ['API 响应时间', '< 50 ms', '31 ms'], ['WebSocket 推送', '< 100 ms', '42 ms'], ['页面加载', '< 2 s', '1.2 s'], ['并发用户', '> 100', '150']];
function System() {
    const app = (0, AppContext_1.useApp)(), { state, user } = app;
    const [busy, setBusy] = (0, react_1.useState)(''), [restore, setRestore] = (0, react_1.useState)(null), [limit, setLimit] = (0, react_1.useState)(state.apiLimit);
    const checkpoint = (type) => { setBusy(type); setTimeout(() => { app.update(s => ({ ...s, checkpoints: [{ id: (0, analytics_1.uid)(type === 'Checkpoint' ? 'cp' : 'sp'), type, status: 'completed', at: new Date().toISOString(), size: type === 'Checkpoint' ? '18.4 MB' : '19.1 MB', duration: type === 'Checkpoint' ? 168 : 214 }, ...s.checkpoints].slice(0, 20) }), `创建模拟${type}`, 'admin'); setBusy(''); app.notify(`模拟${type}记录已生成；未提交Flink任务。`); }, 700); };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.PageHead, { title: "\u670D\u52A1\u76D1\u63A7", actions: react_1.default.createElement(ui_1.Button, { icon: "download", variant: "primary", onClick: () => (0, files_1.downloadFile)('system-demo-not-benchmark.json', JSON.stringify({ mock: true, verified: false, notice: '不是性能或压力测试报告，所有遥测数字均为预置示例。', targets: TARGETS.map(([metric, requirement, example]) => ({ metric, requirement, example, measured: false })), services: SERVICES, checkpoints: state.checkpoints }, null, 2), 'application/json') }, "\u5BFC\u51FA\u6A21\u62DF\u5FEB\u7167") }),
        react_1.default.createElement(ui_1.Notice, { tone: "warning" },
            react_1.default.createElement("strong", null, "\u672A\u8FDE\u63A5\u771F\u5B9E\u5FAE\u670D\u52A1\u3002"),
            "\u672C\u9875\u72B6\u6001\u3001\u5B9E\u4F8B\u6570\u3001\u5EF6\u8FDF\u4E0E\u541E\u5410\u91CF\u5747\u4E3A\u793A\u4F8B\uFF0C\u4E0D\u80FD\u8BC1\u660E\u6EE1\u8DB3\u8D5B\u9898\u6027\u80FD\u8981\u6C42\u3002Checkpoint / Savepoint\u64CD\u4F5C\u53EA\u751F\u6210\u672C\u5730\u8BB0\u5F55\u3002"),
        react_1.default.createElement("div", { className: "stats-grid" },
            react_1.default.createElement(ui_1.Stat, { label: "\u670D\u52A1\u5355\u5143 \u00B7 \u793A\u4F8B", value: "10", detail: "\u5FAE\u670D\u52A1 + \u8BA1\u7B97 + \u6570\u636E\u5E95\u5EA7", icon: "server" }),
            react_1.default.createElement(ui_1.Stat, { label: "API P95 \u00B7 \u793A\u4F8B", value: react_1.default.createElement(react_1.default.Fragment, null,
                    "31",
                    react_1.default.createElement("small", null, "ms")), detail: "\u672A\u6267\u884CAPI\u538B\u529B\u6D4B\u8BD5", icon: "activity" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u4E8B\u4EF6\u541E\u5410 \u00B7 \u793A\u4F8B", value: react_1.default.createElement(react_1.default.Fragment, null,
                    "12.84",
                    react_1.default.createElement("small", null, "\u4E07/\u79D2")), detail: "\u672A\u8FDE\u63A5Kafka\u6216Flink", icon: "wifi" }),
            react_1.default.createElement(ui_1.Stat, { label: "\u7F13\u5B58\u547D\u4E2D \u00B7 \u793A\u4F8B", value: react_1.default.createElement(react_1.default.Fragment, null,
                    "96.8",
                    react_1.default.createElement("small", null, "%")), detail: "Redis / Caffeine\u5C55\u793A\u5FEB\u7167", icon: "database" })),
        react_1.default.createElement("div", { className: "services-grid" }, SERVICES.map(([name, desc, tech, instances, latency]) => react_1.default.createElement(ui_1.Card, { key: name, className: "service-card" },
            react_1.default.createElement("div", { className: "service-top" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(Icon_1.Icon, { name: name.includes('Service') ? 'code' : name === 'Flink' ? 'activity' : 'server', size: 20 })),
                react_1.default.createElement(ui_1.Badge, { tone: "green", dot: true }, "\u6A21\u62DF\u5C31\u7EEA")),
            react_1.default.createElement("h3", null, name),
            react_1.default.createElement("p", null, desc),
            react_1.default.createElement("small", null, tech),
            react_1.default.createElement("div", { className: "service-foot" },
                react_1.default.createElement("span", null,
                    "\u526F\u672C ",
                    react_1.default.createElement("b", null, instances)),
                react_1.default.createElement("span", null,
                    "\u5EF6\u8FDF ",
                    react_1.default.createElement("b", null, latency)))))),
        react_1.default.createElement("div", { className: "two-col" },
            react_1.default.createElement(ui_1.Card, { title: "\u5BB9\u9519\u4E0E\u6062\u590D", subtitle: "Flink\u72B6\u6001\u7BA1\u7406\u4EA4\u4E92\u6F14\u793A", action: react_1.default.createElement("div", { className: "row-actions" },
                    react_1.default.createElement(ui_1.Button, { busy: busy === 'Checkpoint', disabled: !(0, analytics_1.canAdmin)(user) || !!busy, onClick: () => checkpoint('Checkpoint') }, "\u6A21\u62DF Checkpoint"),
                    react_1.default.createElement(ui_1.Button, { busy: busy === 'Savepoint', disabled: !(0, analytics_1.canAdmin)(user) || !!busy, onClick: () => checkpoint('Savepoint') }, "\u6A21\u62DF Savepoint")) },
                react_1.default.createElement("div", { className: "table-scroll" },
                    react_1.default.createElement("table", { className: "data-table" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "\u8BB0\u5F55"),
                                react_1.default.createElement("th", null, "\u751F\u6210\u65F6\u95F4"),
                                react_1.default.createElement("th", null, "\u5FEB\u7167\u5927\u5C0F"),
                                react_1.default.createElement("th", null, "\u72B6\u6001"),
                                react_1.default.createElement("th", null))),
                        react_1.default.createElement("tbody", null, state.checkpoints.map(c => react_1.default.createElement("tr", { key: c.id },
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("strong", null, c.type),
                                react_1.default.createElement("small", { className: "block mono muted" }, c.id)),
                            react_1.default.createElement("td", null, (0, analytics_1.timeLabel)(c.at)),
                            react_1.default.createElement("td", null,
                                c.size,
                                react_1.default.createElement("small", { className: "block muted" },
                                    "\u793A\u4F8B\u8017\u65F6 ",
                                    c.duration,
                                    " ms")),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Badge, { tone: c.status === 'restored' ? 'blue' : 'green' }, c.status === 'restored' ? '已模拟恢复' : '模拟完成')),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(ui_1.Button, { variant: "ghost", disabled: !(0, analytics_1.canAdmin)(user), onClick: () => setRestore(c.id) }, "\u6062\u590D")))))))),
            react_1.default.createElement(ui_1.Card, { title: "\u9650\u6D41\u914D\u7F6E", subtitle: "\u53EA\u63A7\u5236\u672C\u9875\u5E94\u7528\u7684\u6A21\u62DFAPI\u5DE5\u4F5C\u53F0" },
                react_1.default.createElement("div", { className: "card-inner" },
                    react_1.default.createElement(ui_1.Field, { label: "\u6BCF\u4E2A\u6F14\u793A\u8D26\u53F7\u6BCF\u5206\u949F\u6700\u5927\u8BF7\u6C42\u6570" },
                        react_1.default.createElement("input", { type: "number", min: 1, max: 1000, value: limit, disabled: !(0, analytics_1.canAdmin)(user), onChange: e => setLimit(Number(e.target.value)) })),
                    react_1.default.createElement(ui_1.Button, { variant: "primary", disabled: !(0, analytics_1.canAdmin)(user) || !Number.isInteger(limit) || limit < 1 || limit > 1000, onClick: () => { app.update(s => ({ ...s, apiLimit: limit }), `调整本地模拟API限流 ${limit}/分钟`, 'admin'); app.notify('模拟API限流已更新'); } }, "\u4FDD\u5B58\u9650\u6D41"),
                    react_1.default.createElement(ui_1.Notice, null, "\u6B63\u5F0F\u9650\u6D41\u5FC5\u987B\u5728\u7F51\u5173\u6216\u670D\u52A1\u7AEF\u6267\u884C\uFF1B\u6D4F\u89C8\u5668\u7AEF\u9650\u5236\u4E0D\u63D0\u4F9B\u5B89\u5168\u4FDD\u969C\u3002")))),
        react_1.default.createElement(ui_1.Card, { title: "\u8D5B\u9898\u6027\u80FD\u76EE\u6807\u5BF9\u7167", subtitle: "\u9700\u6C42\u76EE\u6807\u4E0EUI\u793A\u4F8B\u503C\u5206\u5F00\u5217\u793A\uFF1B\u6CA1\u6709\u4EFB\u4F55\u4E00\u9879\u88AB\u8BA4\u5B9A\u5DF2\u8FBE\u6807" },
            react_1.default.createElement("div", { className: "table-scroll" },
                react_1.default.createElement("table", { className: "data-table" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", null, "\u6027\u80FD\u7EF4\u5EA6"),
                            react_1.default.createElement("th", null, "\u8D5B\u9898\u76EE\u6807"),
                            react_1.default.createElement("th", null, "\u754C\u9762\u793A\u4F8B\u503C"),
                            react_1.default.createElement("th", null, "\u9A8C\u8BC1\u72B6\u6001"))),
                    react_1.default.createElement("tbody", null, TARGETS.map(([metric, target, value]) => react_1.default.createElement("tr", { key: metric },
                        react_1.default.createElement("td", null, metric),
                        react_1.default.createElement("td", { className: "mono" }, target),
                        react_1.default.createElement("td", { className: "mono muted" }, value),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement(ui_1.Badge, { tone: "amber" }, "\u5F85\u540E\u7AEF\u5B9E\u6D4B")))))))),
        restore && react_1.default.createElement(ui_1.Modal, { title: "\u6A21\u62DF\u4ECE\u5FEB\u7167\u6062\u590D", onClose: () => setRestore(null), footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => setRestore(null) }, "\u53D6\u6D88"),
                react_1.default.createElement(ui_1.Button, { variant: "primary", onClick: () => { app.update(s => ({ ...s, checkpoints: s.checkpoints.map(c => c.id === restore ? { ...c, status: 'restored' } : c) }), `模拟恢复快照 ${restore}`, 'admin'); setRestore(null); app.notify('已更新演示恢复记录；没有重启真实作业。'); } }, "\u786E\u8BA4\u6A21\u62DF\u6062\u590D")) },
            react_1.default.createElement("p", null,
                "\u5FEB\u7167\uFF1A",
                react_1.default.createElement("code", null, restore)),
            react_1.default.createElement(ui_1.Notice, null, "\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u8FDE\u63A5Flink\uFF0C\u4E5F\u4E0D\u4F1A\u56DE\u6EDA\u6D4F\u89C8\u5668\u5185\u7684\u4E1A\u52A1\u6570\u636E\u3002")));
}

},
"src/services/httpClient.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestJson = requestJson;
/** Future integration helper. UI does not silently substitute mock data on network errors. */
async function requestJson(base, path, options = {}) {
    const controller = new AbortController();
    const onAbort = () => controller.abort();
    if (options.signal?.aborted)
        controller.abort();
    else
        options.signal?.addEventListener('abort', onAbort, { once: true });
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
        const url = `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
        const response = await fetch(url, { method: options.method || 'GET', signal: controller.signal, headers: { Accept: 'application/json', ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}) }, body: options.body === undefined ? undefined : JSON.stringify(options.body), credentials: 'omit' });
        const text = await response.text();
        let body;
        try {
            body = JSON.parse(text);
        }
        catch {
            body = { rawText: text.slice(0, 20000) };
        }
        return { status: response.status, body };
    }
    finally {
        clearTimeout(timer);
        options.signal?.removeEventListener('abort', onAbort);
    }
}

},
"src/services/mockApi.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WORKSPACE_QUERY = void 0;
exports.resetRateLimits = resetRateLimits;
exports.mockRequest = mockRequest;
const mock_1 = require("../data/mock");
const analytics_1 = require("../lib/analytics");
exports.WORKSPACE_QUERY = 'query WorkspaceSnapshot { workspace { assets { id name symbol } states { assetId regime confidence } unreadAlertCount } }';
const requests = new Map();
function resetRateLimits() { requests.clear(); }
function mockRequest(method, path, payload, state, user, now = Date.now()) {
    const requestId = (0, analytics_1.uid)('req');
    const fail = (status, code, message) => ({ status, body: { requestId, mock: true, error: { code, message } } });
    const ok = (data, status = 200, nextState) => ({ status, body: { requestId, mock: true, data }, nextState });
    if (!user?.active)
        return fail(401, 'UNAUTHENTICATED', '请先进入演示账号');
    const recent = (requests.get(user.id) || []).filter(t => now - t < 60000);
    if (recent.length >= state.apiLimit)
        return fail(429, 'RATE_LIMITED', '模拟API超过每分钟请求限制，请稍后重试');
    requests.set(user.id, [...recent, now]);
    let url;
    try {
        url = new URL(path, 'https://mock.regimelab.example');
    }
    catch {
        return fail(400, 'BAD_PATH', '无效请求路径');
    }
    const route = url.pathname.replace(/^\/api(?=\/|$)/, ''), assets = (0, analytics_1.visibleAssets)(mock_1.ASSETS, user), assetId = url.searchParams.get('assetId');
    if (assetId && !assets.some(a => a.id === assetId))
        return fail(403, 'FORBIDDEN_ASSET', '当前角色不可访问该资产');
    const target = assetId ? assets.filter(a => a.id === assetId) : assets;
    if (method === 'GET' && route === '/assets')
        return ok(assets.filter(a => !url.searchParams.get('category') || a.category === url.searchParams.get('category')).map(a => ({ id: a.id, name: a.name, symbol: a.symbol, category: a.category, latest: a.prices.at(-1) })));
    if (method === 'GET' && route === '/features')
        return ok(target.map(a => ({ assetId: a.id, snapshotDate: a.prices.at(-1)?.date, metrics: (0, analytics_1.metrics)(a.prices) })));
    if (method === 'GET' && route === '/states')
        return ok(target.map(a => ({ assetId: a.id, ...(0, analytics_1.sampleRegime)(a.prices), engine: 'frontend-demo-heuristic', modelMetadata: state.modelVersion })));
    if (method === 'GET' && route === '/alerts')
        return ok(state.alerts.filter(a => target.some(x => x.id === a.assetId)));
    if (method === 'GET' && route === '/rules')
        return ok(state.rules.filter(r => r.assetId === 'all' || assets.some(a => a.id === r.assetId)));
    if (method === 'POST' && route === '/rules') {
        if (!(0, analytics_1.canWrite)(user))
            return fail(403, 'FORBIDDEN', '观察员不可创建规则');
        const p = payload;
        if (!p || typeof p.name !== 'string' || typeof p.threshold !== 'number' || typeof p.cooldown !== 'number')
            return fail(400, 'VALIDATION_ERROR', 'name / threshold / cooldown 字段缺失或类型错误');
        const error = (0, analytics_1.validateRule)({ name: p.name, threshold: p.threshold, cooldown: p.cooldown });
        if (error)
            return fail(400, 'VALIDATION_ERROR', error);
        if (!['return1d', 'volatility20', 'momentum20', 'drawdown', 'confidence'].includes(String(p.metric)) || !['gt', 'lt'].includes(String(p.operator)) || !['high', 'medium', 'low'].includes(String(p.severity)))
            return fail(400, 'VALIDATION_ERROR', 'metric/operator/severity 枚举值无效');
        if (p.assetId !== 'all' && !assets.some(a => a.id === p.assetId))
            return fail(403, 'FORBIDDEN_ASSET', '目标资产不可访问');
        const rule = { id: (0, analytics_1.uid)('rule-api'), name: p.name.trim(), threshold: p.threshold, cooldown: p.cooldown, metric: p.metric, operator: p.operator, severity: p.severity, assetId: String(p.assetId), enabled: p.enabled !== false, createdAt: new Date().toISOString() };
        return ok(rule, 201, { ...state, rules: [rule, ...state.rules] });
    }
    if (method === 'POST' && route === '/graphql') {
        const query = payload?.query;
        if (typeof query !== 'string' || query.replace(/\s/g, '') !== exports.WORKSPACE_QUERY.replace(/\s/g, ''))
            return fail(400, 'UNSUPPORTED_QUERY', '模拟GraphQL仅支持工作台预设查询；不是通用GraphQL解析器');
        return ok({ workspace: { assets: assets.map(({ id, name, symbol }) => ({ id, name, symbol })), states: assets.map(a => ({ assetId: a.id, regime: (0, analytics_1.sampleRegime)(a.prices).regime, confidence: (0, analytics_1.sampleRegime)(a.prices).confidence })), unreadAlertCount: state.alerts.filter(a => a.status === 'new' && assets.some(x => x.id === a.assetId)).length } });
    }
    return fail(404, 'NOT_FOUND', `模拟接口未定义：${method} ${route}`);
}

},
"src/state/AppContext.tsx":function(module,exports,require){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = AppProvider;
exports.useApp = useApp;
const react_1 = __importStar(require("react"));
const mock_1 = require("../data/mock");
const analytics_1 = require("../lib/analytics");
const storage_1 = require("../lib/storage");
const Context = (0, react_1.createContext)(null);
const routeFromHash = () => { const value = location.hash.replace(/^#\/?/, '').split('?')[0]; return ['overview', 'data', 'features', 'regimes', 'alerts', 'quality', 'lineage', 'system', 'api', 'settings'].includes(value) ? value : 'overview'; };
function AppProvider({ children }) {
    const [state, setState] = (0, react_1.useState)(storage_1.readState), [route, setRoute] = (0, react_1.useState)(routeFromHash);
    const [toasts, setToasts] = (0, react_1.useState)([]), [events, setEvents] = (0, react_1.useState)([]);
    const [range, setDateRange] = (0, react_1.useState)({ from: (0, analytics_1.daysBefore)(mock_1.SNAPSHOT, 90), to: mock_1.SNAPSHOT });
    const [selectedAsset, setSelectedAsset] = (0, react_1.useState)('csi300'), [selectedFeature, setSelectedFeature] = (0, react_1.useState)('volatility20');
    const [activeAlert, openAlert] = (0, react_1.useState)(null), [lastUpdate, setLastUpdate] = (0, react_1.useState)(new Date().toISOString());
    const current = (0, react_1.useRef)(state);
    current.current = state;
    const toastTimers = (0, react_1.useRef)([]);
    const storageWarned = (0, react_1.useRef)(false);
    const user = state.users.find(u => u.id === state.sessionUserId && u.active) || null;
    const assets = (0, react_1.useMemo)(() => (0, analytics_1.visibleAssets)(mock_1.ASSETS, user), [user]);
    const dismissToast = (0, react_1.useCallback)((id) => setToasts(v => v.filter(t => t.id !== id)), []);
    const notify = (0, react_1.useCallback)((message, tone = 'success') => { const id = (0, analytics_1.uid)('toast'); setToasts(t => [...t.slice(-3), { id, message, tone }]); toastTimers.current.push(setTimeout(() => dismissToast(id), 4500)); }, [dismissToast]);
    (0, react_1.useEffect)(() => () => toastTimers.current.forEach(clearTimeout), []);
    (0, react_1.useEffect)(() => { if (!(0, storage_1.writeState)(state) && !storageWarned.current) {
        storageWarned.current = true;
        notify('浏览器存储不可用，本次修改仅在当前会话中保留。', 'info');
    } document.body.classList.toggle('red-positive', !state.prefs.positiveGreen); document.body.classList.toggle('compact-density', state.prefs.compact); }, [state, notify]);
    (0, react_1.useEffect)(() => { const fn = () => { setRoute(routeFromHash()); window.scrollTo(0, 0); }; window.addEventListener('hashchange', fn); return () => window.removeEventListener('hashchange', fn); }, []);
    const navigate = (0, react_1.useCallback)((next) => { location.hash = `/${next}`; setRoute(next); window.scrollTo(0, 0); }, []);
    const update = (0, react_1.useCallback)((fn, action, permission = 'write') => {
        const u = current.current.users.find(x => x.id === current.current.sessionUserId) || null;
        if ((permission === 'write' && !(0, analytics_1.canWrite)(u)) || (permission === 'admin' && !(0, analytics_1.canAdmin)(u))) {
            notify('当前演示角色没有此操作权限。', 'error');
            return false;
        }
        setState(prev => { const next = fn(prev); return action ? { ...next, audit: [{ id: (0, analytics_1.uid)('audit'), action, actor: u?.name || '演示访客', at: new Date().toISOString() }, ...next.audit].slice(0, 100) } : next; });
        return true;
    }, [notify]);
    const refresh = (0, react_1.useCallback)(() => { setLastUpdate(new Date().toISOString()); notify('演示快照已刷新；未连接真实行情。'); }, [notify]);
    (0, react_1.useEffect)(() => {
        if (!state.prefs.live || !user)
            return;
        let n = 0;
        const timer = setInterval(() => {
            n++;
            const available = (0, analytics_1.visibleAssets)(mock_1.ASSETS, current.current.users.find(u => u.id === current.current.sessionUserId) || null);
            if (!available.length)
                return;
            const a = available[n % available.length];
            const now = new Date().toISOString();
            const event = { id: (0, analytics_1.uid)('evt'), type: n % 6 === 0 ? 'regime.updated' : 'market.tick', at: now, payload: n % 6 === 0 ? { assetId: a.id, regime: (0, analytics_1.sampleRegime)(a.prices).regime, mock: true, snapshotDate: mock_1.SNAPSHOT } : { assetId: a.id, symbol: a.symbol, close: a.prices.at(-1).close, mock: true, snapshotDate: mock_1.SNAPSHOT } };
            setEvents(prev => [event, ...prev].slice(0, 60));
            setLastUpdate(now);
        }, 5000);
        return () => clearInterval(timer);
    }, [state.prefs.live, user?.id]);
    const login = (id) => { if (!state.users.find(u => u.id === id && u.active)) {
        notify('演示账号不存在或已停用', 'error');
        return;
    } setState(s => ({ ...s, sessionUserId: id })); navigate('overview'); notify('已进入演示工作区（非真实身份认证）'); };
    const logout = () => { setState(s => ({ ...s, sessionUserId: null })); openAlert(null); };
    const reset = () => { setState((0, mock_1.initialState)()); setEvents([]); openAlert(null); navigate('overview'); notify('演示工作区已重置'); };
    const evaluateRules = () => {
        if (!(0, analytics_1.canWrite)(user)) {
            notify('观察员不能执行规则检测', 'error');
            return;
        }
        const now = new Date();
        const created = [];
        for (const r of state.rules)
            for (const a of assets) {
                if (!(0, analytics_1.ruleMatches)(r, a))
                    continue;
                const last = state.alerts.find(al => al.ruleId === r.id && al.assetId === a.id);
                if (last && now.getTime() - new Date(last.createdAt).getTime() < r.cooldown * 60000)
                    continue;
                created.push({ id: (0, analytics_1.uid)('al'), ruleId: r.id, title: `${a.name} · ${r.name}`, assetId: a.id, severity: r.severity, status: 'new', createdAt: now.toISOString(), updatedAt: now.toISOString(), metric: r.metric, value: (0, analytics_1.metrics)(a.prices)[r.metric], threshold: r.threshold, operator: r.operator, note: '', owner: '', snapshotDate: mock_1.SNAPSHOT });
            }
        if (!created.length) {
            notify('当前规则未命中，或匹配项仍在冷却期内。', 'info');
            return;
        }
        update(s => ({ ...s, alerts: [...created, ...s.alerts].slice(0, 200) }), `模拟规则检测生成 ${created.length} 条预警`);
        setEvents(prev => [...created.map(al => ({ id: (0, analytics_1.uid)('evt'), type: 'alert.created', at: al.createdAt, payload: { alertId: al.id, assetId: al.assetId, mock: true } })), ...prev].slice(0, 60));
        notify(`合成数据触发 ${created.length} 条预警，已按规则和资产去重。`);
    };
    return react_1.default.createElement(Context.Provider, { value: { state, user, assets, route, navigate, update, notify, toasts, dismissToast, from: range.from, to: range.to, setRange: (from, to) => { if (from <= to)
                setDateRange({ from, to }); }, selectedAsset, setSelectedAsset, selectedFeature, setSelectedFeature, activeAlert, openAlert, events, clearEvents: () => setEvents([]), lastUpdate, refresh, login, logout, reset, evaluateRules } }, children);
}
function useApp() { const c = (0, react_1.useContext)(Context); if (!c)
    throw new Error('AppProvider missing'); return c; }

},
"src/types.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

}};
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
})();