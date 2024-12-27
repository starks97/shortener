import{j as e,R as u}from"./jsx-runtime-CAOzMBF_.js";import{u as $,a as U}from"./queryOptions-BvVM-Wmj.js";/* empty css               */import{T as k}from"./ToolTip-Bj-giIg6.js";import{L as _,V as O,Q as T}from"./Icons-CwZxN_tX.js";import{L as S,h as A}from"./components-B9677cET.js";import{U as F}from"./proxyClient-dOl5LkjN.js";import{u as Q}from"./index-BicWogre.js";import"./QueryClientProvider-BDE6StR7.js";import"./query-CYgPuyg8.js";function q({short_url:s,id:n,slug:r}){const c=`http://localhost:8000/api/url/redirect/${r}`,i=()=>{window.open(`${c}`,"_blank")};return e.jsxs("div",{className:"max-w-sm p-6 border-y border-orange-400 rounded-2xl flex items-center space-x-4 flex-col w-full h-auto",children:[e.jsx("div",{className:"inline-flex font-medium items-center gap-2",children:e.jsxs("button",{onClick:()=>i(),className:"w-full text-white py-2 px-5 rounded-xl transition flex items-center justify-center bg-transparent border-2 border-orange-500 hover:bg-orange-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-300 }","aria-label":"Shorten URL",children:[e.jsx(_,{}),s]})}),e.jsxs("div",{className:"mt-5 w-full flex items-center justify-between",children:[e.jsx(S,{to:{pathname:`/workspace/${n}`,search:"?modal=view"},className:"btn-grad",children:e.jsx(k,{label:"info",children:e.jsx(O,{})})}),e.jsx(S,{to:{pathname:`/workspace/${n}`,search:"?modal=qr"},className:"btn-grad",children:e.jsx(k,{label:"qr code",children:e.jsx(T,{})})})]})]})}const D=u.createContext({}),C=!0;function I({baseColor:s,highlightColor:n,width:r,height:c,borderRadius:i,circle:d,direction:h,duration:t,enableAnimation:l=C,customHighlightBackground:o}){const a={};return h==="rtl"&&(a["--animation-direction"]="reverse"),typeof t=="number"&&(a["--animation-duration"]=`${t}s`),l||(a["--pseudo-element-display"]="none"),(typeof r=="string"||typeof r=="number")&&(a.width=r),(typeof c=="string"||typeof c=="number")&&(a.height=c),(typeof i=="string"||typeof i=="number")&&(a.borderRadius=i),d&&(a.borderRadius="50%"),typeof s<"u"&&(a["--base-color"]=s),typeof n<"u"&&(a["--highlight-color"]=n),typeof o=="string"&&(a["--custom-highlight-background"]=o),a}function p({count:s=1,wrapper:n,className:r,containerClassName:c,containerTestId:i,circle:d=!1,style:h,...t}){var l,o,a;const L=u.useContext(D),b={...t};for(const[m,f]of Object.entries(t))typeof f>"u"&&delete b[m];const g={...L,...b,circle:d},E={...h,...I(g)};let w="react-loading-skeleton";r&&(w+=` ${r}`);const P=(l=g.inline)!==null&&l!==void 0?l:!1,x=[],j=Math.ceil(s);for(let m=0;m<j;m++){let f=E;if(j>s&&m===j-1){const y=(o=f.width)!==null&&o!==void 0?o:"100%",N=s%1,R=typeof y=="number"?y*N:`calc(${y} * ${N})`;f={...f,width:R}}const v=u.createElement("span",{className:w,style:f,key:m},"‌");P?x.push(v):x.push(u.createElement(u.Fragment,{key:m},v,u.createElement("br",null)))}return u.createElement("span",{className:c,"data-testid":i,"aria-live":"polite","aria-busy":(a=g.enableAnimation)!==null&&a!==void 0?a:C},n?x.map((m,f)=>u.createElement(n,{key:f},m)):x)}function M(){return e.jsxs("div",{className:"max-w-sm p-6 border-y border-gray-400 rounded-2xl flex items-center space-x-4 flex-col w-full h-auto",children:[e.jsx("div",{className:"inline-flex font-medium items-center gap-2",children:e.jsxs("button",{className:"w-full text-white py-2 px-5 rounded-xl transition flex items-center justify-center bg-transparent border-2 border-gray-400 ","aria-label":"Shorten URL",children:[e.jsx(p,{circle:!0,height:24,width:24}),e.jsx(p,{width:"60%",height:20,style:{marginLeft:"0.5rem"}})]})}),e.jsxs("div",{className:"mt-5 w-full flex items-center justify-between",children:[e.jsx("div",{className:"btn-grad flex items-center justify-center w-10 h-10",children:e.jsx(p,{circle:!0,height:24,width:24})}),e.jsx("div",{className:"btn-grad flex items-center justify-center w-10 h-10",children:e.jsx(p,{circle:!0,height:24,width:24})})]})]})}function V({offset:s,limit:n,category:r}){const[c,i]=Q(),d=t=>{i(l=>{const o=new URLSearchParams(l.toString());return o.set("offset",t.toString()),o.set("limit",n.toString()),o.set("category",r),o})},h=t=>{const l=t.target.value;i({offset:"1",limit:n.toString(),category:l})};return e.jsxs("div",{className:"w-full flex justify-between",children:[e.jsxs("div",{className:"space-x-8",children:[e.jsx("button",{onClick:()=>d(s-1),disabled:s<=1,children:"Previous"}),e.jsxs("span",{children:["Page ",s]}),e.jsx("button",{onClick:()=>d(s+1),children:"Next"})]}),e.jsxs("div",{className:"filter-section",children:[e.jsx("label",{htmlFor:"category",children:"Category:"}),e.jsx("select",{id:"category",value:r,onChange:h,children:Object.values(F).map(t=>e.jsx("option",{value:t,children:t},t))})]})]})}function W({offset:s,limit:n,category:r}){const c=(s-1)*n,{data:i,error:d,isLoading:h}=$(U(n,c,r));return d instanceof Error?e.jsxs("div",{children:["Error: ",d.message]}):e.jsxs(e.Fragment,{children:[e.jsx(V,{category:r,limit:n,offset:s}),e.jsx("div",{className:"grid gid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center w-full p-10 ",children:h?Array.from({length:n}).map((t,l)=>e.jsx(M,{},l)):i?i.map(t=>e.jsx(q,{id:t.id,short_url:t.short_url,slug:t.slug},t.id)):null})]})}function te(){const{offset:s,limit:n,category:r}=A();return e.jsx(W,{category:r,limit:n,offset:s})}export{te as default};