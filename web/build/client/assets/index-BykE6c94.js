var K=t=>{throw TypeError(t)};var _=(t,e,s)=>e.has(t)||K("Cannot "+s);var p=(t,e,s)=>(_(t,e,"read from private field"),s?s.call(t):e.get(t)),j=(t,e,s)=>e.has(t)?K("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),A=(t,e,s,a)=>(_(t,e,"write to private field"),a?a.call(t,s):e.set(t,s),s),$=(t,e,s)=>(_(t,e,"access private method"),s);import{R as ot,c as nt,b as lt}from"./QueryClientProvider-BDE6StR7.js";import{r as c}from"./jsx-runtime-CAOzMBF_.js";var x,f,O,v,C,st,se=(st=class extends ot{constructor(e){super();j(this,v);j(this,x);j(this,f);j(this,O);this.mutationId=e.mutationId,A(this,f,e.mutationCache),A(this,x,[]),this.state=e.state||dt(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options=e,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(e){p(this,x).includes(e)||(p(this,x).push(e),this.clearGcTimeout(),p(this,f).notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){A(this,x,p(this,x).filter(s=>s!==e)),this.scheduleGc(),p(this,f).notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){p(this,x).length||(this.state.status==="pending"?this.scheduleGc():p(this,f).remove(this))}continue(){var e;return((e=p(this,O))==null?void 0:e.continue())??this.execute(this.state.variables)}async execute(e){var r,i,n,o,l,d,u,y,m,g,S,Y,Z,q,B,J,Q,V,W,X;A(this,O,nt({fn:()=>this.options.mutationFn?this.options.mutationFn(e):Promise.reject(new Error("No mutationFn found")),onFail:(h,R)=>{$(this,v,C).call(this,{type:"failed",failureCount:h,error:R})},onPause:()=>{$(this,v,C).call(this,{type:"pause"})},onContinue:()=>{$(this,v,C).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>p(this,f).canRun(this)}));const s=this.state.status==="pending",a=!p(this,O).canStart();try{if(!s){$(this,v,C).call(this,{type:"pending",variables:e,isPaused:a}),await((i=(r=p(this,f).config).onMutate)==null?void 0:i.call(r,e,this));const R=await((o=(n=this.options).onMutate)==null?void 0:o.call(n,e));R!==this.state.context&&$(this,v,C).call(this,{type:"pending",context:R,variables:e,isPaused:a})}const h=await p(this,O).start();return await((d=(l=p(this,f).config).onSuccess)==null?void 0:d.call(l,h,e,this.state.context,this)),await((y=(u=this.options).onSuccess)==null?void 0:y.call(u,h,e,this.state.context)),await((g=(m=p(this,f).config).onSettled)==null?void 0:g.call(m,h,null,this.state.variables,this.state.context,this)),await((Y=(S=this.options).onSettled)==null?void 0:Y.call(S,h,null,e,this.state.context)),$(this,v,C).call(this,{type:"success",data:h}),h}catch(h){try{throw await((q=(Z=p(this,f).config).onError)==null?void 0:q.call(Z,h,e,this.state.context,this)),await((J=(B=this.options).onError)==null?void 0:J.call(B,h,e,this.state.context)),await((V=(Q=p(this,f).config).onSettled)==null?void 0:V.call(Q,void 0,h,this.state.variables,this.state.context,this)),await((X=(W=this.options).onSettled)==null?void 0:X.call(W,void 0,h,e,this.state.context)),h}finally{$(this,v,C).call(this,{type:"error",error:h})}}finally{p(this,f).runNext(this)}}},x=new WeakMap,f=new WeakMap,O=new WeakMap,v=new WeakSet,C=function(e){const s=a=>{switch(e.type){case"failed":return{...a,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...a,isPaused:!0};case"continue":return{...a,isPaused:!1};case"pending":return{...a,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:e.isPaused,status:"pending",variables:e.variables,submittedAt:Date.now()};case"success":return{...a,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...a,data:void 0,error:e.error,failureCount:a.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"}}};this.state=s(this.state),lt.batch(()=>{p(this,x).forEach(a=>{a.onMutationUpdate(e)}),p(this,f).notify({mutation:this,type:"updated",action:e})})},st);function dt(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}let ct={data:""},ut=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||ct,pt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ht=/\/\*[^]*?\*\/|  +/g,tt=/\n+/g,P=(t,e)=>{let s="",a="",r="";for(let i in t){let n=t[i];i[0]=="@"?i[1]=="i"?s=i+" "+n+";":a+=i[1]=="f"?P(n,i):i+"{"+P(n,i[1]=="k"?"":e)+"}":typeof n=="object"?a+=P(n,e?e.replace(/([^,])+/g,o=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,o):o?o+" "+l:l)):i):n!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=P.p?P.p(i,n):i+":"+n+";")}return s+(e&&r?e+"{"+r+"}":r)+a},w={},at=t=>{if(typeof t=="object"){let e="";for(let s in t)e+=s+at(t[s]);return e}return t},ft=(t,e,s,a,r)=>{let i=at(t),n=w[i]||(w[i]=(l=>{let d=0,u=11;for(;d<l.length;)u=101*u+l.charCodeAt(d++)>>>0;return"go"+u})(i));if(!w[n]){let l=i!==t?t:(d=>{let u,y,m=[{}];for(;u=pt.exec(d.replace(ht,""));)u[4]?m.shift():u[3]?(y=u[3].replace(tt," ").trim(),m.unshift(m[0][y]=m[0][y]||{})):m[0][u[1]]=u[2].replace(tt," ").trim();return m[0]})(t);w[n]=P(r?{["@keyframes "+n]:l}:l,s?"":"."+n)}let o=s&&w.g?w.g:null;return s&&(w.g=w[n]),((l,d,u,y)=>{y?d.data=d.data.replace(y,l):d.data.indexOf(l)===-1&&(d.data=u?l+d.data:d.data+l)})(w[n],e,a,o),n},mt=(t,e,s)=>t.reduce((a,r,i)=>{let n=e[i];if(n&&n.call){let o=n(s),l=o&&o.props&&o.props.className||/^go/.test(o)&&o;n=l?"."+l:o&&typeof o=="object"?o.props?"":P(o,""):o===!1?"":o}return a+r+(n??"")},"");function G(t){let e=this||{},s=t.call?t(e.p):t;return ft(s.unshift?s.raw?mt(s,[].slice.call(arguments,1),e.p):s.reduce((a,r)=>Object.assign(a,r&&r.call?r(e.p):r),{}):s,ut(e.target),e.g,e.o,e.k)}let it,H,L;G.bind({g:1});let E=G.bind({k:1});function yt(t,e,s,a){P.p=e,it=t,H=s,L=a}function k(t,e){let s=this||{};return function(){let a=arguments;function r(i,n){let o=Object.assign({},i),l=o.className||r.className;s.p=Object.assign({theme:H&&H()},o),s.o=/ *go\d+/.test(l),o.className=G.apply(s,a)+(l?" "+l:"");let d=t;return t[0]&&(d=o.as||t,delete o.as),L&&d[0]&&L(o),it(d,o)}return r}}var gt=t=>typeof t=="function",F=(t,e)=>gt(t)?t(e):t,bt=(()=>{let t=0;return()=>(++t).toString()})(),rt=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),xt=20,N=new Map,vt=1e3,et=t=>{if(N.has(t))return;let e=setTimeout(()=>{N.delete(t),M({type:4,toastId:t})},vt);N.set(t,e)},wt=t=>{let e=N.get(t);e&&clearTimeout(e)},U=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,xt)};case 1:return e.toast.id&&wt(e.toast.id),{...t,toasts:t.toasts.map(i=>i.id===e.toast.id?{...i,...e.toast}:i)};case 2:let{toast:s}=e;return t.toasts.find(i=>i.id===s.id)?U(t,{type:1,toast:s}):U(t,{type:0,toast:s});case 3:let{toastId:a}=e;return a?et(a):t.toasts.forEach(i=>{et(i.id)}),{...t,toasts:t.toasts.map(i=>i.id===a||a===void 0?{...i,visible:!1}:i)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(i=>i.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let r=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+r}))}}},T=[],z={toasts:[],pausedAt:void 0},M=t=>{z=U(z,t),T.forEach(e=>{e(z)})},Et={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$t=(t={})=>{let[e,s]=c.useState(z);c.useEffect(()=>(T.push(s),()=>{let r=T.indexOf(s);r>-1&&T.splice(r,1)}),[e]);let a=e.toasts.map(r=>{var i,n;return{...t,...t[r.type],...r,duration:r.duration||((i=t[r.type])==null?void 0:i.duration)||(t==null?void 0:t.duration)||Et[r.type],style:{...t.style,...(n=t[r.type])==null?void 0:n.style,...r.style}}});return{...e,toasts:a}},Ct=(t,e="blank",s)=>({createdAt:Date.now(),visible:!0,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...s,id:(s==null?void 0:s.id)||bt()}),D=t=>(e,s)=>{let a=Ct(e,t,s);return M({type:2,toast:a}),a.id},b=(t,e)=>D("blank")(t,e);b.error=D("error");b.success=D("success");b.loading=D("loading");b.custom=D("custom");b.dismiss=t=>{M({type:3,toastId:t})};b.remove=t=>M({type:4,toastId:t});b.promise=(t,e,s)=>{let a=b.loading(e.loading,{...s,...s==null?void 0:s.loading});return t.then(r=>(b.success(F(e.success,r),{id:a,...s,...s==null?void 0:s.success}),r)).catch(r=>{b.error(F(e.error,r),{id:a,...s,...s==null?void 0:s.error})}),t};var Pt=(t,e)=>{M({type:1,toast:{id:t,height:e}})},kt=()=>{M({type:5,time:Date.now()})},Ot=t=>{let{toasts:e,pausedAt:s}=$t(t);c.useEffect(()=>{if(s)return;let i=Date.now(),n=e.map(o=>{if(o.duration===1/0)return;let l=(o.duration||0)+o.pauseDuration-(i-o.createdAt);if(l<0){o.visible&&b.dismiss(o.id);return}return setTimeout(()=>b.dismiss(o.id),l)});return()=>{n.forEach(o=>o&&clearTimeout(o))}},[e,s]);let a=c.useCallback(()=>{s&&M({type:6,time:Date.now()})},[s]),r=c.useCallback((i,n)=>{let{reverseOrder:o=!1,gutter:l=8,defaultPosition:d}=n||{},u=e.filter(g=>(g.position||d)===(i.position||d)&&g.height),y=u.findIndex(g=>g.id===i.id),m=u.filter((g,S)=>S<y&&g.visible).length;return u.filter(g=>g.visible).slice(...o?[m+1]:[0,m]).reduce((g,S)=>g+(S.height||0)+l,0)},[e]);return{toasts:e,handlers:{updateHeight:Pt,startPause:kt,endPause:a,calculateOffset:r}}},Mt=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,St=E`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,jt=E`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,At=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Mt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${St} 0.15s ease-out forwards;
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
    animation: ${jt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Dt=E`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Rt=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${Dt} 1s linear infinite;
`,It=E`
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
}`,Tt=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${It} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,zt=k("div")`
  position: absolute;
`,Ft=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Gt=E`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_t=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Gt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ht=({toast:t})=>{let{icon:e,type:s,iconTheme:a}=t;return e!==void 0?typeof e=="string"?c.createElement(_t,null,e):e:s==="blank"?null:c.createElement(Ft,null,c.createElement(Rt,{...a}),s!=="loading"&&c.createElement(zt,null,s==="error"?c.createElement(At,{...a}):c.createElement(Tt,{...a})))},Lt=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ut=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Yt="0%{opacity:0;} 100%{opacity:1;}",Zt="0%{opacity:1;} 100%{opacity:0;}",qt=k("div")`
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
`,Bt=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Jt=(t,e)=>{let s=t.includes("top")?1:-1,[a,r]=rt()?[Yt,Zt]:[Lt(s),Ut(s)];return{animation:e?`${E(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${E(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Qt=c.memo(({toast:t,position:e,style:s,children:a})=>{let r=t.height?Jt(t.position||e||"top-center",t.visible):{opacity:0},i=c.createElement(Ht,{toast:t}),n=c.createElement(Bt,{...t.ariaProps},F(t.message,t));return c.createElement(qt,{className:t.className,style:{...r,...s,...t.style}},typeof a=="function"?a({icon:i,message:n}):c.createElement(c.Fragment,null,i,n))});yt(c.createElement);var Vt=({id:t,className:e,style:s,onHeightUpdate:a,children:r})=>{let i=c.useCallback(n=>{if(n){let o=()=>{let l=n.getBoundingClientRect().height;a(t,l)};o(),new MutationObserver(o).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[t,a]);return c.createElement("div",{ref:i,className:e,style:s},r)},Wt=(t,e)=>{let s=t.includes("top"),a=s?{top:0}:{bottom:0},r=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:rt()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(s?1:-1)}px)`,...a,...r}},Xt=G`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,I=16,ae=({reverseOrder:t,position:e="top-center",toastOptions:s,gutter:a,children:r,containerStyle:i,containerClassName:n})=>{let{toasts:o,handlers:l}=Ot(s);return c.createElement("div",{style:{position:"fixed",zIndex:9999,top:I,left:I,right:I,bottom:I,pointerEvents:"none",...i},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},o.map(d=>{let u=d.position||e,y=l.calculateOffset(d,{reverseOrder:t,gutter:a,defaultPosition:e}),m=Wt(u,y);return c.createElement(Vt,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Xt:"",style:m},d.type==="custom"?F(d.message,d):r?r(d):c.createElement(Qt,{toast:d,position:u}))}))},ie=b;export{ae as I,se as M,ie as _,dt as g};
