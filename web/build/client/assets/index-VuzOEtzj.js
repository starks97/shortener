var W=t=>{throw TypeError(t)};var _=(t,e,s)=>e.has(t)||W("Cannot "+s);var p=(t,e,s)=>(_(t,e,"read from private field"),s?s.call(t):e.get(t)),S=(t,e,s)=>e.has(t)?W("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),j=(t,e,s,i)=>(_(t,e,"write to private field"),i?i.call(t,s):e.set(t,s),s),$=(t,e,s)=>(_(t,e,"access private method"),s);import{R as rt,c as ot,b as nt}from"./QueryClientProvider-BDE6StR7.js";import{r as u}from"./jsx-runtime-CAOzMBF_.js";var v,f,P,x,C,tt,ee=(tt=class extends rt{constructor(e){super();S(this,x);S(this,v);S(this,f);S(this,P);this.mutationId=e.mutationId,j(this,f,e.mutationCache),j(this,v,[]),this.state=e.state||lt(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options=e,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(e){p(this,v).includes(e)||(p(this,v).push(e),this.clearGcTimeout(),p(this,f).notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){j(this,v,p(this,v).filter(s=>s!==e)),this.scheduleGc(),p(this,f).notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){p(this,v).length||(this.state.status==="pending"?this.scheduleGc():p(this,f).remove(this))}continue(){var e;return((e=p(this,P))==null?void 0:e.continue())??this.execute(this.state.variables)}async execute(e){var r,a,n,o,l,d,c,g,y,b,M,U,q,Y,Z,B,J,K,Q,V;j(this,P,ot({fn:()=>this.options.mutationFn?this.options.mutationFn(e):Promise.reject(new Error("No mutationFn found")),onFail:(h,N)=>{$(this,x,C).call(this,{type:"failed",failureCount:h,error:N})},onPause:()=>{$(this,x,C).call(this,{type:"pause"})},onContinue:()=>{$(this,x,C).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>p(this,f).canRun(this)}));const s=this.state.status==="pending",i=!p(this,P).canStart();try{if(!s){$(this,x,C).call(this,{type:"pending",variables:e,isPaused:i}),await((a=(r=p(this,f).config).onMutate)==null?void 0:a.call(r,e,this));const N=await((o=(n=this.options).onMutate)==null?void 0:o.call(n,e));N!==this.state.context&&$(this,x,C).call(this,{type:"pending",context:N,variables:e,isPaused:i})}const h=await p(this,P).start();return await((d=(l=p(this,f).config).onSuccess)==null?void 0:d.call(l,h,e,this.state.context,this)),await((g=(c=this.options).onSuccess)==null?void 0:g.call(c,h,e,this.state.context)),await((b=(y=p(this,f).config).onSettled)==null?void 0:b.call(y,h,null,this.state.variables,this.state.context,this)),await((U=(M=this.options).onSettled)==null?void 0:U.call(M,h,null,e,this.state.context)),$(this,x,C).call(this,{type:"success",data:h}),h}catch(h){try{throw await((Y=(q=p(this,f).config).onError)==null?void 0:Y.call(q,h,e,this.state.context,this)),await((B=(Z=this.options).onError)==null?void 0:B.call(Z,h,e,this.state.context)),await((K=(J=p(this,f).config).onSettled)==null?void 0:K.call(J,void 0,h,this.state.variables,this.state.context,this)),await((V=(Q=this.options).onSettled)==null?void 0:V.call(Q,void 0,h,e,this.state.context)),h}finally{$(this,x,C).call(this,{type:"error",error:h})}}finally{p(this,f).runNext(this)}}},v=new WeakMap,f=new WeakMap,P=new WeakMap,x=new WeakSet,C=function(e){const s=i=>{switch(e.type){case"failed":return{...i,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...i,isPaused:!0};case"continue":return{...i,isPaused:!1};case"pending":return{...i,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:e.isPaused,status:"pending",variables:e.variables,submittedAt:Date.now()};case"success":return{...i,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...i,data:void 0,error:e.error,failureCount:i.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"}}};this.state=s(this.state),nt.batch(()=>{p(this,v).forEach(i=>{i.onMutationUpdate(e)}),p(this,f).notify({mutation:this,type:"updated",action:e})})},tt);function lt(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}let dt={data:""},ut=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||dt,ct=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,pt=/\/\*[^]*?\*\/|  +/g,X=/\n+/g,k=(t,e)=>{let s="",i="",r="";for(let a in t){let n=t[a];a[0]=="@"?a[1]=="i"?s=a+" "+n+";":i+=a[1]=="f"?k(n,a):a+"{"+k(n,a[1]=="k"?"":e)+"}":typeof n=="object"?i+=k(n,e?e.replace(/([^,])+/g,o=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,o):o?o+" "+l:l)):a):n!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=k.p?k.p(a,n):a+":"+n+";")}return s+(e&&r?e+"{"+r+"}":r)+i},w={},et=t=>{if(typeof t=="object"){let e="";for(let s in t)e+=s+et(t[s]);return e}return t},ht=(t,e,s,i,r)=>{let a=et(t),n=w[a]||(w[a]=(l=>{let d=0,c=11;for(;d<l.length;)c=101*c+l.charCodeAt(d++)>>>0;return"go"+c})(a));if(!w[n]){let l=a!==t?t:(d=>{let c,g,y=[{}];for(;c=ct.exec(d.replace(pt,""));)c[4]?y.shift():c[3]?(g=c[3].replace(X," ").trim(),y.unshift(y[0][g]=y[0][g]||{})):y[0][c[1]]=c[2].replace(X," ").trim();return y[0]})(t);w[n]=k(r?{["@keyframes "+n]:l}:l,s?"":"."+n)}let o=s&&w.g?w.g:null;return s&&(w.g=w[n]),((l,d,c,g)=>{g?d.data=d.data.replace(g,l):d.data.indexOf(l)===-1&&(d.data=c?l+d.data:d.data+l)})(w[n],e,i,o),n},ft=(t,e,s)=>t.reduce((i,r,a)=>{let n=e[a];if(n&&n.call){let o=n(s),l=o&&o.props&&o.props.className||/^go/.test(o)&&o;n=l?"."+l:o&&typeof o=="object"?o.props?"":k(o,""):o===!1?"":o}return i+r+(n??"")},"");function G(t){let e=this||{},s=t.call?t(e.p):t;return ht(s.unshift?s.raw?ft(s,[].slice.call(arguments,1),e.p):s.reduce((i,r)=>Object.assign(i,r&&r.call?r(e.p):r),{}):s,ut(e.target),e.g,e.o,e.k)}let st,H,L;G.bind({g:1});let E=G.bind({k:1});function mt(t,e,s,i){k.p=e,st=t,H=s,L=i}function D(t,e){let s=this||{};return function(){let i=arguments;function r(a,n){let o=Object.assign({},a),l=o.className||r.className;s.p=Object.assign({theme:H&&H()},o),s.o=/ *go\d+/.test(l),o.className=G.apply(s,i)+(l?" "+l:"");let d=t;return t[0]&&(d=o.as||t,delete o.as),L&&d[0]&&L(o),st(d,o)}return r}}var yt=t=>typeof t=="function",T=(t,e)=>yt(t)?t(e):t,gt=(()=>{let t=0;return()=>(++t).toString()})(),at=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),bt=20,it=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,bt)};case 1:return{...t,toasts:t.toasts.map(a=>a.id===e.toast.id?{...a,...e.toast}:a)};case 2:let{toast:s}=e;return it(t,{type:t.toasts.find(a=>a.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=e;return{...t,toasts:t.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(a=>a.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let r=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+r}))}}},F=[],I={toasts:[],pausedAt:void 0},O=t=>{I=it(I,t),F.forEach(e=>{e(I)})},vt={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},xt=(t={})=>{let[e,s]=u.useState(I);u.useEffect(()=>(F.push(s),()=>{let r=F.indexOf(s);r>-1&&F.splice(r,1)}),[e]);let i=e.toasts.map(r=>{var a,n,o;return{...t,...t[r.type],...r,removeDelay:r.removeDelay||((a=t[r.type])==null?void 0:a.removeDelay)||(t==null?void 0:t.removeDelay),duration:r.duration||((n=t[r.type])==null?void 0:n.duration)||(t==null?void 0:t.duration)||vt[r.type],style:{...t.style,...(o=t[r.type])==null?void 0:o.style,...r.style}}});return{...e,toasts:i}},wt=(t,e="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...s,id:(s==null?void 0:s.id)||gt()}),A=t=>(e,s)=>{let i=wt(e,t,s);return O({type:2,toast:i}),i.id},m=(t,e)=>A("blank")(t,e);m.error=A("error");m.success=A("success");m.loading=A("loading");m.custom=A("custom");m.dismiss=t=>{O({type:3,toastId:t})};m.remove=t=>O({type:4,toastId:t});m.promise=(t,e,s)=>{let i=m.loading(e.loading,{...s,...s==null?void 0:s.loading});return typeof t=="function"&&(t=t()),t.then(r=>{let a=e.success?T(e.success,r):void 0;return a?m.success(a,{id:i,...s,...s==null?void 0:s.success}):m.dismiss(i),r}).catch(r=>{let a=e.error?T(e.error,r):void 0;a?m.error(a,{id:i,...s,...s==null?void 0:s.error}):m.dismiss(i)}),t};var Et=(t,e)=>{O({type:1,toast:{id:t,height:e}})},$t=()=>{O({type:5,time:Date.now()})},R=new Map,Ct=1e3,kt=(t,e=Ct)=>{if(R.has(t))return;let s=setTimeout(()=>{R.delete(t),O({type:4,toastId:t})},e);R.set(t,s)},Dt=t=>{let{toasts:e,pausedAt:s}=xt(t);u.useEffect(()=>{if(s)return;let a=Date.now(),n=e.map(o=>{if(o.duration===1/0)return;let l=(o.duration||0)+o.pauseDuration-(a-o.createdAt);if(l<0){o.visible&&m.dismiss(o.id);return}return setTimeout(()=>m.dismiss(o.id),l)});return()=>{n.forEach(o=>o&&clearTimeout(o))}},[e,s]);let i=u.useCallback(()=>{s&&O({type:6,time:Date.now()})},[s]),r=u.useCallback((a,n)=>{let{reverseOrder:o=!1,gutter:l=8,defaultPosition:d}=n||{},c=e.filter(b=>(b.position||d)===(a.position||d)&&b.height),g=c.findIndex(b=>b.id===a.id),y=c.filter((b,M)=>M<g&&b.visible).length;return c.filter(b=>b.visible).slice(...o?[y+1]:[0,y]).reduce((b,M)=>b+(M.height||0)+l,0)},[e]);return u.useEffect(()=>{e.forEach(a=>{if(a.dismissed)kt(a.id,a.removeDelay);else{let n=R.get(a.id);n&&(clearTimeout(n),R.delete(a.id))}})},[e]),{toasts:e,handlers:{updateHeight:Et,startPause:$t,endPause:i,calculateOffset:r}}},Pt=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ot=E`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Mt=E`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,St=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Pt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ot} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Mt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,jt=E`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Rt=D("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${jt} 1s linear infinite;
`,At=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Nt=E`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,zt=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${At} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Nt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Ft=D("div")`
  position: absolute;
`,It=D("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Tt=E`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Gt=D("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Tt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,_t=({toast:t})=>{let{icon:e,type:s,iconTheme:i}=t;return e!==void 0?typeof e=="string"?u.createElement(Gt,null,e):e:s==="blank"?null:u.createElement(It,null,u.createElement(Rt,{...i}),s!=="loading"&&u.createElement(Ft,null,s==="error"?u.createElement(St,{...i}):u.createElement(zt,{...i})))},Ht=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Lt=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Ut="0%{opacity:0;} 100%{opacity:1;}",qt="0%{opacity:1;} 100%{opacity:0;}",Yt=D("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Zt=D("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Bt=(t,e)=>{let s=t.includes("top")?1:-1,[i,r]=at()?[Ut,qt]:[Ht(s),Lt(s)];return{animation:e?`${E(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${E(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Jt=u.memo(({toast:t,position:e,style:s,children:i})=>{let r=t.height?Bt(t.position||e||"top-center",t.visible):{opacity:0},a=u.createElement(_t,{toast:t}),n=u.createElement(Zt,{...t.ariaProps},T(t.message,t));return u.createElement(Yt,{className:t.className,style:{...r,...s,...t.style}},typeof i=="function"?i({icon:a,message:n}):u.createElement(u.Fragment,null,a,n))});mt(u.createElement);var Kt=({id:t,className:e,style:s,onHeightUpdate:i,children:r})=>{let a=u.useCallback(n=>{if(n){let o=()=>{let l=n.getBoundingClientRect().height;i(t,l)};o(),new MutationObserver(o).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[t,i]);return u.createElement("div",{ref:a,className:e,style:s},r)},Qt=(t,e)=>{let s=t.includes("top"),i=s?{top:0}:{bottom:0},r=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:at()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(s?1:-1)}px)`,...i,...r}},Vt=G`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,z=16,se=({reverseOrder:t,position:e="top-center",toastOptions:s,gutter:i,children:r,containerStyle:a,containerClassName:n})=>{let{toasts:o,handlers:l}=Dt(s);return u.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:z,left:z,right:z,bottom:z,pointerEvents:"none",...a},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},o.map(d=>{let c=d.position||e,g=l.calculateOffset(d,{reverseOrder:t,gutter:i,defaultPosition:e}),y=Qt(c,g);return u.createElement(Kt,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Vt:"",style:y},d.type==="custom"?T(d.message,d):r?r(d):u.createElement(Jt,{toast:d,position:c}))}))},ae=m;export{se as D,ee as M,lt as g,ae as k};
