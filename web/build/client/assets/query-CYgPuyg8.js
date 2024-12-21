var M=i=>{throw TypeError(i)};var D=(i,t,e)=>t.has(i)||M("Cannot "+e);var r=(i,t,e)=>(D(i,t,"read from private field"),e?e.call(i):t.get(i)),y=(i,t,e)=>t.has(i)?M("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),d=(i,t,e,s)=>(D(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e),l=(i,t,e)=>(D(i,t,"access private method"),e);import{R as O,r as P,n as E,a as k,s as T,t as x,c as Q,b as H,d as j,e as B,i as R}from"./QueryClientProvider-BDE6StR7.js";var m,b,o,n,U,v,u,f,G,L=(G=class extends O{constructor(t){super();y(this,u);y(this,m);y(this,b);y(this,o);y(this,n);y(this,U);y(this,v);d(this,v,!1),d(this,U,t.defaultOptions),this.setOptions(t.options),this.observers=[],d(this,o,t.cache),this.queryKey=t.queryKey,this.queryHash=t.queryHash,d(this,m,$(this.options)),this.state=t.state??r(this,m),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=r(this,n))==null?void 0:t.promise}setOptions(t){this.options={...r(this,U),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&r(this,o).remove(this)}setData(t,e){const s=P(this.state.data,t,this.options);return l(this,u,f).call(this,{data:s,type:"success",dataUpdatedAt:e==null?void 0:e.updatedAt,manual:e==null?void 0:e.manual}),s}setState(t,e){l(this,u,f).call(this,{type:"setState",state:t,setStateOptions:e})}cancel(t){var s,c;const e=(s=r(this,n))==null?void 0:s.promise;return(c=r(this,n))==null||c.cancel(t),e?e.then(E).catch(E):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(r(this,m))}isActive(){return this.observers.some(t=>k(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===T||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!x(this.state.dataUpdatedAt,t)}onFocus(){var e;const t=this.observers.find(s=>s.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(e=r(this,n))==null||e.continue()}onOnline(){var e;const t=this.observers.find(s=>s.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(e=r(this,n))==null||e.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),r(this,o).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(r(this,n)&&(r(this,v)?r(this,n).cancel({revert:!0}):r(this,n).cancelRetry()),this.scheduleGc()),r(this,o).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||l(this,u,f).call(this,{type:"invalidate"})}fetch(t,e){var q,A,w;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(e!=null&&e.cancelRefetch))this.cancel({silent:!0});else if(r(this,n))return r(this,n).continueRetry(),r(this,n).promise}if(t&&this.setOptions(t),!this.options.queryFn){const a=this.observers.find(h=>h.options.queryFn);a&&this.setOptions(a.options)}const s=new AbortController,c=a=>{Object.defineProperty(a,"signal",{enumerable:!0,get:()=>(d(this,v,!0),s.signal)})},I=()=>{const a=B(this.options,e),h={queryKey:this.queryKey,meta:this.meta};return c(h),d(this,v,!1),this.options.persister?this.options.persister(a,h,this):a(h)},p={fetchOptions:e,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:I};c(p),(q=this.options.behavior)==null||q.onFetch(p,this),d(this,b,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((A=p.fetchOptions)==null?void 0:A.meta))&&l(this,u,f).call(this,{type:"fetch",meta:(w=p.fetchOptions)==null?void 0:w.meta});const g=a=>{var h,S,F,C;R(a)&&a.silent||l(this,u,f).call(this,{type:"error",error:a}),R(a)||((S=(h=r(this,o).config).onError)==null||S.call(h,a,this),(C=(F=r(this,o).config).onSettled)==null||C.call(F,this.state.data,a,this)),this.scheduleGc()};return d(this,n,Q({initialPromise:e==null?void 0:e.initialPromise,fn:p.fetchFn,abort:s.abort.bind(s),onSuccess:a=>{var h,S,F,C;if(a===void 0){g(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(a)}catch(K){g(K);return}(S=(h=r(this,o).config).onSuccess)==null||S.call(h,a,this),(C=(F=r(this,o).config).onSettled)==null||C.call(F,a,this.state.error,this),this.scheduleGc()},onError:g,onFail:(a,h)=>{l(this,u,f).call(this,{type:"failed",failureCount:a,error:h})},onPause:()=>{l(this,u,f).call(this,{type:"pause"})},onContinue:()=>{l(this,u,f).call(this,{type:"continue"})},retry:p.options.retry,retryDelay:p.options.retryDelay,networkMode:p.options.networkMode,canRun:()=>!0})),r(this,n).start()}},m=new WeakMap,b=new WeakMap,o=new WeakMap,n=new WeakMap,U=new WeakMap,v=new WeakMap,u=new WeakSet,f=function(t){const e=s=>{switch(t.type){case"failed":return{...s,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...s,fetchStatus:"paused"};case"continue":return{...s,fetchStatus:"fetching"};case"fetch":return{...s,...W(s.data,this.options),fetchMeta:t.meta??null};case"success":return{...s,data:t.data,dataUpdateCount:s.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const c=t.error;return R(c)&&c.revert&&r(this,b)?{...r(this,b),fetchStatus:"idle"}:{...s,error:c,errorUpdateCount:s.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:s.fetchFailureCount+1,fetchFailureReason:c,fetchStatus:"idle",status:"error"};case"invalidate":return{...s,isInvalidated:!0};case"setState":return{...s,...t.state}}};this.state=e(this.state),H.batch(()=>{this.observers.forEach(s=>{s.onQueryUpdate()}),r(this,o).notify({query:this,type:"updated",action:t})})},G);function W(i,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:j(t.networkMode)?"fetching":"paused",...i===void 0&&{error:null,status:"pending"}}}function $(i){const t=typeof i.initialData=="function"?i.initialData():i.initialData,e=t!==void 0,s=e?typeof i.initialDataUpdatedAt=="function"?i.initialDataUpdatedAt():i.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:e?s??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:e?"success":"pending",fetchStatus:"idle"}}export{L as Q,W as f};
