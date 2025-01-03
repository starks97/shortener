import{R as j,r as i,j as a}from"./jsx-runtime-CAOzMBF_.js";import{u as w}from"./QueryClientProvider-BDE6StR7.js";import{m as C,u as N,M as S,v as E,C as R}from"./Modal-CD0xIWmW.js";import{k as m}from"./index-VuzOEtzj.js";import{f as U}from"./formDefinitions-BJPzAbrR.js";import{n as k}from"./consts-DKFDT57y.js";import{c as q}from"./proxyClient-HgQj7PMq.js";import{u as M,d as P}from"./index-BicWogre.js";function A(){const h=w(),[y]=M(),d=P(),n=j.useRef(null),u=y.get("modal");i.useEffect(()=>{var r;if(!u){(r=n.current)==null||r.close();return}C[u](n,void 0)},[u]);const[c,g]=i.useState({original_url:"",short_url:"",category:""}),v=U.url,[o,p]=i.useState({}),x=()=>{d(-1)},l=N({mutationFn:async({original_url:r,short_url:t,category:e})=>{try{const s=await q(r,t,e);if(s.status==="error")throw Error(s.message);return s}catch(s){throw s instanceof Error?s.message:"An error occurred during creating the url."}},onMutate:async r=>{g(t=>({...t,...r})),p({})},onSuccess:()=>{m.success("Custom URL created!")},onError:r=>{r?m.error(r):m.error("An error ocurred while updating the URL.")},onSettled:()=>{h.invalidateQueries({queryKey:["urls"]})}}),b=(r,t)=>{g(e=>({...e,[r]:t}))},f=async r=>{r.preventDefault();const{data:t,errors:e}=await E({formData:c,schema:R});if(e){p(e);return}l.mutate(t),d(k,{replace:!0})};return a.jsx(S,{id:"modal-create_url",title:"Create new Url",ref:n,close:x,children:a.jsxs("form",{onSubmit:f,className:"space-y-8",method:"POST",children:[v.map(r=>{var t;return a.jsxs("div",{className:"form-group",children:[a.jsx("label",{htmlFor:r.name,children:r.label}),r.type!=="select"?a.jsx("input",{id:r.name,name:r.name,type:r.type,placeholder:r.placeholder,required:r.required,value:c[r.name]||"",onChange:e=>b(r.name,e.target.value),className:`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${o?"border-red-500 ":"border-gray-300"}`,"aria-invalid":!!o,"aria-describedby":o?`${r.name}-error`:void 0}):a.jsxs("select",{id:r.name,name:r.name,required:r.required,value:c[r.name]||"",onChange:e=>b(r.name,e.target.value),className:`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${o?"border-red-500":"border-gray-300"}`,"aria-invalid":!!o,"aria-describedby":o?`${r.name}-error`:void 0,children:[a.jsx("option",{value:"",disabled:!0,children:r.placeholder}),(t=r.options)==null?void 0:t.map(e=>a.jsx("option",{value:e.value,children:e.label},e.value))]}),o[r.name]&&a.jsx("p",{className:"error-message",children:o[r.name]})]},r.name)}),a.jsx("button",{type:"submit",disabled:l.isPending,className:"w-full bg-transparent border-2 border-orange-500 hover:bg-orange-400 hover:text-black py-2 px-4 rounded ",children:l.isPending?"Creating...":"Create URL"})]})})}function K(){return a.jsx(A,{})}export{K as default};
