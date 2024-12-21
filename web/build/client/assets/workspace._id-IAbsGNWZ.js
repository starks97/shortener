import{r as x,j as w,R as Z}from"./jsx-runtime-CAOzMBF_.js";import{u as jt,b as vt}from"./queryOptions-BvVM-Wmj.js";import{u as kt,v as zt,U as Vt,m as Ht,M as ht}from"./Modal-CKsmnuEh.js";import{D as Kt,O as $t,C as Ot,a as Jt}from"./Icons-CwZxN_tX.js";import{T as Qt}from"./ToolTip-Bj-giIg6.js";import{u as Yt}from"./QueryClientProvider-BDE6StR7.js";import{_ as X}from"./index-BykE6c94.js";import{f as qt}from"./formDefinitions-BJPzAbrR.js";import{U as mt,u as Gt}from"./proxyClient-dOl5LkjN.js";import{d as Wt,af as Zt,u as Xt}from"./index-BicWogre.js";import"./query-CYgPuyg8.js";/* empty css               */class wt{static formatDateFromString(t){const i=new Date(t),r={year:"numeric",month:"long",day:"numeric"};return i.toLocaleDateString(void 0,r)}}var V={},te=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},bt={},I={};let ct;const ee=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];I.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};I.getSymbolTotalCodewords=function(t){return ee[t]};I.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};I.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');ct=t};I.isKanjiModeEnabled=function(){return typeof ct<"u"};I.toSJIS=function(t){return ct(t)};var Q={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+i)}}e.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},e.from=function(r,n){if(e.isValid(r))return r;try{return t(r)}catch{return n}}})(Q);function Bt(){this.buffer=[],this.length=0}Bt.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let i=0;i<t;i++)this.putBit((e>>>t-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var ne=Bt;function H(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}H.prototype.set=function(e,t,i,r){const n=e*this.size+t;this.data[n]=i,r&&(this.reservedBit[n]=!0)};H.prototype.get=function(e,t){return this.data[e*this.size+t]};H.prototype.xor=function(e,t,i){this.data[e*this.size+t]^=i};H.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var re=H,Nt={};(function(e){const t=I.getSymbolSize;e.getRowColCoords=function(r){if(r===1)return[];const n=Math.floor(r/7)+2,o=t(r),a=o===145?26:Math.ceil((o-13)/(2*n-2))*2,l=[o-7];for(let s=1;s<n-1;s++)l[s]=l[s-1]-a;return l.push(6),l.reverse()},e.getPositions=function(r){const n=[],o=e.getRowColCoords(r),a=o.length;for(let l=0;l<a;l++)for(let s=0;s<a;s++)l===0&&s===0||l===0&&s===a-1||l===a-1&&s===0||n.push([o[l],o[s]]);return n}})(Nt);var At={};const oe=I.getSymbolSize,yt=7;At.getPositions=function(t){const i=oe(t);return[[0,0],[i-yt,0],[0,i-yt]]};var It={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},e.from=function(n){return e.isValid(n)?parseInt(n,10):void 0},e.getPenaltyN1=function(n){const o=n.size;let a=0,l=0,s=0,c=null,f=null;for(let E=0;E<o;E++){l=s=0,c=f=null;for(let y=0;y<o;y++){let m=n.get(E,y);m===c?l++:(l>=5&&(a+=t.N1+(l-5)),c=m,l=1),m=n.get(y,E),m===f?s++:(s>=5&&(a+=t.N1+(s-5)),f=m,s=1)}l>=5&&(a+=t.N1+(l-5)),s>=5&&(a+=t.N1+(s-5))}return a},e.getPenaltyN2=function(n){const o=n.size;let a=0;for(let l=0;l<o-1;l++)for(let s=0;s<o-1;s++){const c=n.get(l,s)+n.get(l,s+1)+n.get(l+1,s)+n.get(l+1,s+1);(c===4||c===0)&&a++}return a*t.N2},e.getPenaltyN3=function(n){const o=n.size;let a=0,l=0,s=0;for(let c=0;c<o;c++){l=s=0;for(let f=0;f<o;f++)l=l<<1&2047|n.get(c,f),f>=10&&(l===1488||l===93)&&a++,s=s<<1&2047|n.get(f,c),f>=10&&(s===1488||s===93)&&a++}return a*t.N3},e.getPenaltyN4=function(n){let o=0;const a=n.data.length;for(let s=0;s<a;s++)o+=n.data[s];return Math.abs(Math.ceil(o*100/a/5)-10)*t.N4};function i(r,n,o){switch(r){case e.Patterns.PATTERN000:return(n+o)%2===0;case e.Patterns.PATTERN001:return n%2===0;case e.Patterns.PATTERN010:return o%3===0;case e.Patterns.PATTERN011:return(n+o)%3===0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(o/3))%2===0;case e.Patterns.PATTERN101:return n*o%2+n*o%3===0;case e.Patterns.PATTERN110:return(n*o%2+n*o%3)%2===0;case e.Patterns.PATTERN111:return(n*o%3+(n+o)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}e.applyMask=function(n,o){const a=o.size;for(let l=0;l<a;l++)for(let s=0;s<a;s++)o.isReserved(s,l)||o.xor(s,l,i(n,s,l))},e.getBestMask=function(n,o){const a=Object.keys(e.Patterns).length;let l=0,s=1/0;for(let c=0;c<a;c++){o(c),e.applyMask(c,n);const f=e.getPenaltyN1(n)+e.getPenaltyN2(n)+e.getPenaltyN3(n)+e.getPenaltyN4(n);e.applyMask(c,n),f<s&&(s=f,l=c)}return l}})(It);var Y={};const L=Q,K=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],$=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Y.getBlocksCount=function(t,i){switch(i){case L.L:return K[(t-1)*4+0];case L.M:return K[(t-1)*4+1];case L.Q:return K[(t-1)*4+2];case L.H:return K[(t-1)*4+3];default:return}};Y.getTotalCodewordsCount=function(t,i){switch(i){case L.L:return $[(t-1)*4+0];case L.M:return $[(t-1)*4+1];case L.Q:return $[(t-1)*4+2];case L.H:return $[(t-1)*4+3];default:return}};var St={},q={};const k=new Uint8Array(512),O=new Uint8Array(256);(function(){let t=1;for(let i=0;i<255;i++)k[i]=t,O[t]=i,t<<=1,t&256&&(t^=285);for(let i=255;i<512;i++)k[i]=k[i-255]})();q.log=function(t){if(t<1)throw new Error("log("+t+")");return O[t]};q.exp=function(t){return k[t]};q.mul=function(t,i){return t===0||i===0?0:k[O[t]+O[i]]};(function(e){const t=q;e.mul=function(r,n){const o=new Uint8Array(r.length+n.length-1);for(let a=0;a<r.length;a++)for(let l=0;l<n.length;l++)o[a+l]^=t.mul(r[a],n[l]);return o},e.mod=function(r,n){let o=new Uint8Array(r);for(;o.length-n.length>=0;){const a=o[0];for(let s=0;s<n.length;s++)o[s]^=t.mul(n[s],a);let l=0;for(;l<o.length&&o[l]===0;)l++;o=o.slice(l)}return o},e.generateECPolynomial=function(r){let n=new Uint8Array([1]);for(let o=0;o<r;o++)n=e.mul(n,new Uint8Array([1,t.exp(o)]));return n}})(St);const Tt=St;function ut(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}ut.prototype.initialize=function(t){this.degree=t,this.genPoly=Tt.generateECPolynomial(this.degree)};ut.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(t.length+this.degree);i.set(t);const r=Tt.mod(i,this.genPoly),n=this.degree-r.length;if(n>0){const o=new Uint8Array(this.degree);return o.set(r,n),o}return r};var ie=ut,Rt={},U={},ft={};ft.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var R={};const Mt="[0-9]+",se="[A-Z $%*+\\-./:]+";let z="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";z=z.replace(/u/g,"\\u");const ae="(?:(?![A-Z0-9 $%*+\\-./:]|"+z+`)(?:.|[\r
]))+`;R.KANJI=new RegExp(z,"g");R.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");R.BYTE=new RegExp(ae,"g");R.NUMERIC=new RegExp(Mt,"g");R.ALPHANUMERIC=new RegExp(se,"g");const le=new RegExp("^"+z+"$"),ce=new RegExp("^"+Mt+"$"),ue=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");R.testKanji=function(t){return le.test(t)};R.testNumeric=function(t){return ce.test(t)};R.testAlphanumeric=function(t){return ue.test(t)};(function(e){const t=ft,i=R;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(o,a){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!t.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?o.ccBits[0]:a<27?o.ccBits[1]:o.ccBits[2]},e.getBestModeForData=function(o){return i.testNumeric(o)?e.NUMERIC:i.testAlphanumeric(o)?e.ALPHANUMERIC:i.testKanji(o)?e.KANJI:e.BYTE},e.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},e.isValid=function(o){return o&&o.bit&&o.ccBits};function r(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+n)}}e.from=function(o,a){if(e.isValid(o))return o;try{return r(o)}catch{return a}}})(U);(function(e){const t=I,i=Y,r=Q,n=U,o=ft,a=7973,l=t.getBCHDigit(a);function s(y,m,p){for(let C=1;C<=40;C++)if(m<=e.getCapacity(C,p,y))return C}function c(y,m){return n.getCharCountIndicator(y,m)+4}function f(y,m){let p=0;return y.forEach(function(C){const N=c(C.mode,m);p+=N+C.getBitsLength()}),p}function E(y,m){for(let p=1;p<=40;p++)if(f(y,p)<=e.getCapacity(p,m,n.MIXED))return p}e.from=function(m,p){return o.isValid(m)?parseInt(m,10):p},e.getCapacity=function(m,p,C){if(!o.isValid(m))throw new Error("Invalid QR Code version");typeof C>"u"&&(C=n.BYTE);const N=t.getSymbolTotalCodewords(m),u=i.getTotalCodewordsCount(m,p),h=(N-u)*8;if(C===n.MIXED)return h;const g=h-c(C,m);switch(C){case n.NUMERIC:return Math.floor(g/10*3);case n.ALPHANUMERIC:return Math.floor(g/11*2);case n.KANJI:return Math.floor(g/13);case n.BYTE:default:return Math.floor(g/8)}},e.getBestVersionForData=function(m,p){let C;const N=r.from(p,r.M);if(Array.isArray(m)){if(m.length>1)return E(m,N);if(m.length===0)return 1;C=m[0]}else C=m;return s(C.mode,C.getLength(),N)},e.getEncodedBits=function(m){if(!o.isValid(m)||m<7)throw new Error("Invalid QR Code version");let p=m<<12;for(;t.getBCHDigit(p)-l>=0;)p^=a<<t.getBCHDigit(p)-l;return m<<12|p}})(Rt);var Pt={};const it=I,Lt=1335,fe=21522,pt=it.getBCHDigit(Lt);Pt.getEncodedBits=function(t,i){const r=t.bit<<3|i;let n=r<<10;for(;it.getBCHDigit(n)-pt>=0;)n^=Lt<<it.getBCHDigit(n)-pt;return(r<<10|n)^fe};var Ut={};const de=U;function D(e){this.mode=de.NUMERIC,this.data=e.toString()}D.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};D.prototype.getLength=function(){return this.data.length};D.prototype.getBitsLength=function(){return D.getBitsLength(this.data.length)};D.prototype.write=function(t){let i,r,n;for(i=0;i+3<=this.data.length;i+=3)r=this.data.substr(i,3),n=parseInt(r,10),t.put(n,10);const o=this.data.length-i;o>0&&(r=this.data.substr(i),n=parseInt(r,10),t.put(n,o*3+1))};var ge=D;const he=U,tt=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function _(e){this.mode=he.ALPHANUMERIC,this.data=e}_.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};_.prototype.getLength=function(){return this.data.length};_.prototype.getBitsLength=function(){return _.getBitsLength(this.data.length)};_.prototype.write=function(t){let i;for(i=0;i+2<=this.data.length;i+=2){let r=tt.indexOf(this.data[i])*45;r+=tt.indexOf(this.data[i+1]),t.put(r,11)}this.data.length%2&&t.put(tt.indexOf(this.data[i]),6)};var me=_;const we=U;function F(e){this.mode=we.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}F.getBitsLength=function(t){return t*8};F.prototype.getLength=function(){return this.data.length};F.prototype.getBitsLength=function(){return F.getBitsLength(this.data.length)};F.prototype.write=function(e){for(let t=0,i=this.data.length;t<i;t++)e.put(this.data[t],8)};var ye=F;const pe=U,Ce=I;function j(e){this.mode=pe.KANJI,this.data=e}j.getBitsLength=function(t){return t*13};j.prototype.getLength=function(){return this.data.length};j.prototype.getBitsLength=function(){return j.getBitsLength(this.data.length)};j.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let i=Ce.toSJIS(this.data[t]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),e.put(i,13)}};var Ee=j,xt={exports:{}};(function(e){var t={single_source_shortest_paths:function(i,r,n){var o={},a={};a[r]=0;var l=t.PriorityQueue.make();l.push(r,0);for(var s,c,f,E,y,m,p,C,N;!l.empty();){s=l.pop(),c=s.value,E=s.cost,y=i[c]||{};for(f in y)y.hasOwnProperty(f)&&(m=y[f],p=E+m,C=a[f],N=typeof a[f]>"u",(N||C>p)&&(a[f]=p,l.push(f,p),o[f]=c))}if(typeof n<"u"&&typeof a[n]>"u"){var u=["Could not find a path from ",r," to ",n,"."].join("");throw new Error(u)}return o},extract_shortest_path_from_predecessor_list:function(i,r){for(var n=[],o=r;o;)n.push(o),i[o],o=i[o];return n.reverse(),n},find_path:function(i,r,n){var o=t.single_source_shortest_paths(i,r,n);return t.extract_shortest_path_from_predecessor_list(o,n)},PriorityQueue:{make:function(i){var r=t.PriorityQueue,n={},o;i=i||{};for(o in r)r.hasOwnProperty(o)&&(n[o]=r[o]);return n.queue=[],n.sorter=i.sorter||r.default_sorter,n},default_sorter:function(i,r){return i.cost-r.cost},push:function(i,r){var n={value:i,cost:r};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(xt);var be=xt.exports;(function(e){const t=U,i=ge,r=me,n=ye,o=Ee,a=R,l=I,s=be;function c(u){return unescape(encodeURIComponent(u)).length}function f(u,h,g){const d=[];let b;for(;(b=u.exec(g))!==null;)d.push({data:b[0],index:b.index,mode:h,length:b[0].length});return d}function E(u){const h=f(a.NUMERIC,t.NUMERIC,u),g=f(a.ALPHANUMERIC,t.ALPHANUMERIC,u);let d,b;return l.isKanjiModeEnabled()?(d=f(a.BYTE,t.BYTE,u),b=f(a.KANJI,t.KANJI,u)):(d=f(a.BYTE_KANJI,t.BYTE,u),b=[]),h.concat(g,d,b).sort(function(A,S){return A.index-S.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function y(u,h){switch(h){case t.NUMERIC:return i.getBitsLength(u);case t.ALPHANUMERIC:return r.getBitsLength(u);case t.KANJI:return o.getBitsLength(u);case t.BYTE:return n.getBitsLength(u)}}function m(u){return u.reduce(function(h,g){const d=h.length-1>=0?h[h.length-1]:null;return d&&d.mode===g.mode?(h[h.length-1].data+=g.data,h):(h.push(g),h)},[])}function p(u){const h=[];for(let g=0;g<u.length;g++){const d=u[g];switch(d.mode){case t.NUMERIC:h.push([d,{data:d.data,mode:t.ALPHANUMERIC,length:d.length},{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.ALPHANUMERIC:h.push([d,{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.KANJI:h.push([d,{data:d.data,mode:t.BYTE,length:c(d.data)}]);break;case t.BYTE:h.push([{data:d.data,mode:t.BYTE,length:c(d.data)}])}}return h}function C(u,h){const g={},d={start:{}};let b=["start"];for(let B=0;B<u.length;B++){const A=u[B],S=[];for(let P=0;P<A.length;P++){const T=A[P],v=""+B+P;S.push(v),g[v]={node:T,lastCount:0},d[v]={};for(let W=0;W<b.length;W++){const M=b[W];g[M]&&g[M].node.mode===T.mode?(d[M][v]=y(g[M].lastCount+T.length,T.mode)-y(g[M].lastCount,T.mode),g[M].lastCount+=T.length):(g[M]&&(g[M].lastCount=T.length),d[M][v]=y(T.length,T.mode)+4+t.getCharCountIndicator(T.mode,h))}}b=S}for(let B=0;B<b.length;B++)d[b[B]].end=0;return{map:d,table:g}}function N(u,h){let g;const d=t.getBestModeForData(u);if(g=t.from(h,d),g!==t.BYTE&&g.bit<d.bit)throw new Error('"'+u+'" cannot be encoded with mode '+t.toString(g)+`.
 Suggested mode is: `+t.toString(d));switch(g===t.KANJI&&!l.isKanjiModeEnabled()&&(g=t.BYTE),g){case t.NUMERIC:return new i(u);case t.ALPHANUMERIC:return new r(u);case t.KANJI:return new o(u);case t.BYTE:return new n(u)}}e.fromArray=function(h){return h.reduce(function(g,d){return typeof d=="string"?g.push(N(d,null)):d.data&&g.push(N(d.data,d.mode)),g},[])},e.fromString=function(h,g){const d=E(h,l.isKanjiModeEnabled()),b=p(d),B=C(b,g),A=s.find_path(B.map,"start","end"),S=[];for(let P=1;P<A.length-1;P++)S.push(B.table[A[P]].node);return e.fromArray(m(S))},e.rawSplit=function(h){return e.fromArray(E(h,l.isKanjiModeEnabled()))}})(Ut);const G=I,et=Q,Be=ne,Ne=re,Ae=Nt,Ie=At,st=It,at=Y,Se=ie,J=Rt,Te=Pt,Re=U,nt=Ut;function Me(e,t){const i=e.size,r=Ie.getPositions(t);for(let n=0;n<r.length;n++){const o=r[n][0],a=r[n][1];for(let l=-1;l<=7;l++)if(!(o+l<=-1||i<=o+l))for(let s=-1;s<=7;s++)a+s<=-1||i<=a+s||(l>=0&&l<=6&&(s===0||s===6)||s>=0&&s<=6&&(l===0||l===6)||l>=2&&l<=4&&s>=2&&s<=4?e.set(o+l,a+s,!0,!0):e.set(o+l,a+s,!1,!0))}}function Pe(e){const t=e.size;for(let i=8;i<t-8;i++){const r=i%2===0;e.set(i,6,r,!0),e.set(6,i,r,!0)}}function Le(e,t){const i=Ae.getPositions(t);for(let r=0;r<i.length;r++){const n=i[r][0],o=i[r][1];for(let a=-2;a<=2;a++)for(let l=-2;l<=2;l++)a===-2||a===2||l===-2||l===2||a===0&&l===0?e.set(n+a,o+l,!0,!0):e.set(n+a,o+l,!1,!0)}}function Ue(e,t){const i=e.size,r=J.getEncodedBits(t);let n,o,a;for(let l=0;l<18;l++)n=Math.floor(l/3),o=l%3+i-8-3,a=(r>>l&1)===1,e.set(n,o,a,!0),e.set(o,n,a,!0)}function rt(e,t,i){const r=e.size,n=Te.getEncodedBits(t,i);let o,a;for(o=0;o<15;o++)a=(n>>o&1)===1,o<6?e.set(o,8,a,!0):o<8?e.set(o+1,8,a,!0):e.set(r-15+o,8,a,!0),o<8?e.set(8,r-o-1,a,!0):o<9?e.set(8,15-o-1+1,a,!0):e.set(8,15-o-1,a,!0);e.set(r-8,8,1,!0)}function xe(e,t){const i=e.size;let r=-1,n=i-1,o=7,a=0;for(let l=i-1;l>0;l-=2)for(l===6&&l--;;){for(let s=0;s<2;s++)if(!e.isReserved(n,l-s)){let c=!1;a<t.length&&(c=(t[a]>>>o&1)===1),e.set(n,l-s,c),o--,o===-1&&(a++,o=7)}if(n+=r,n<0||i<=n){n-=r,r=-r;break}}}function De(e,t,i){const r=new Be;i.forEach(function(s){r.put(s.mode.bit,4),r.put(s.getLength(),Re.getCharCountIndicator(s.mode,e)),s.write(r)});const n=G.getSymbolTotalCodewords(e),o=at.getTotalCodewordsCount(e,t),a=(n-o)*8;for(r.getLengthInBits()+4<=a&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const l=(a-r.getLengthInBits())/8;for(let s=0;s<l;s++)r.put(s%2?17:236,8);return _e(r,e,t)}function _e(e,t,i){const r=G.getSymbolTotalCodewords(t),n=at.getTotalCodewordsCount(t,i),o=r-n,a=at.getBlocksCount(t,i),l=r%a,s=a-l,c=Math.floor(r/a),f=Math.floor(o/a),E=f+1,y=c-f,m=new Se(y);let p=0;const C=new Array(a),N=new Array(a);let u=0;const h=new Uint8Array(e.buffer);for(let A=0;A<a;A++){const S=A<s?f:E;C[A]=h.slice(p,p+S),N[A]=m.encode(C[A]),p+=S,u=Math.max(u,S)}const g=new Uint8Array(r);let d=0,b,B;for(b=0;b<u;b++)for(B=0;B<a;B++)b<C[B].length&&(g[d++]=C[B][b]);for(b=0;b<y;b++)for(B=0;B<a;B++)g[d++]=N[B][b];return g}function Fe(e,t,i,r){let n;if(Array.isArray(e))n=nt.fromArray(e);else if(typeof e=="string"){let c=t;if(!c){const f=nt.rawSplit(e);c=J.getBestVersionForData(f,i)}n=nt.fromString(e,c||40)}else throw new Error("Invalid data");const o=J.getBestVersionForData(n,i);if(!o)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=o;else if(t<o)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`);const a=De(t,i,n),l=G.getSymbolSize(t),s=new Ne(l);return Me(s,t),Pe(s),Le(s,t),rt(s,i,0),t>=7&&Ue(s,t),xe(s,a),isNaN(r)&&(r=st.getBestMask(s,rt.bind(null,s,i))),st.applyMask(r,s),rt(s,i,r),{modules:s,version:t,errorCorrectionLevel:i,maskPattern:r,segments:n}}bt.create=function(t,i){if(typeof t>"u"||t==="")throw new Error("No input text");let r=et.M,n,o;return typeof i<"u"&&(r=et.from(i.errorCorrectionLevel,et.M),n=J.from(i.version),o=st.from(i.maskPattern),i.toSJISFunc&&G.setToSJISFunction(i.toSJISFunc)),Fe(t,n,r,o)};var Dt={},dt={};(function(e){function t(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let r=i.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+i);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(o){return[o,o]}))),r.length===6&&r.push("F","F");const n=parseInt(r.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+r.slice(0,6).join("")}}e.getOptions=function(r){r||(r={}),r.color||(r.color={});const n=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,o=r.width&&r.width>=21?r.width:void 0,a=r.scale||4;return{width:o,scale:o?4:a,margin:n,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},e.getScale=function(r,n){return n.width&&n.width>=r+n.margin*2?n.width/(r+n.margin*2):n.scale},e.getImageWidth=function(r,n){const o=e.getScale(r,n);return Math.floor((r+n.margin*2)*o)},e.qrToImageData=function(r,n,o){const a=n.modules.size,l=n.modules.data,s=e.getScale(a,o),c=Math.floor((a+o.margin*2)*s),f=o.margin*s,E=[o.color.light,o.color.dark];for(let y=0;y<c;y++)for(let m=0;m<c;m++){let p=(y*c+m)*4,C=o.color.light;if(y>=f&&m>=f&&y<c-f&&m<c-f){const N=Math.floor((y-f)/s),u=Math.floor((m-f)/s);C=E[l[N*a+u]?1:0]}r[p++]=C.r,r[p++]=C.g,r[p++]=C.b,r[p]=C.a}}})(dt);(function(e){const t=dt;function i(n,o,a){n.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=a,o.width=a,o.style.height=a+"px",o.style.width=a+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(o,a,l){let s=l,c=a;typeof s>"u"&&(!a||!a.getContext)&&(s=a,a=void 0),a||(c=r()),s=t.getOptions(s);const f=t.getImageWidth(o.modules.size,s),E=c.getContext("2d"),y=E.createImageData(f,f);return t.qrToImageData(y.data,o,s),i(E,c,f),E.putImageData(y,0,0),c},e.renderToDataURL=function(o,a,l){let s=l;typeof s>"u"&&(!a||!a.getContext)&&(s=a,a=void 0),s||(s={});const c=e.render(o,a,s),f=s.type||"image/png",E=s.rendererOpts||{};return c.toDataURL(f,E.quality)}})(Dt);var _t={};const je=dt;function Ct(e,t){const i=e.a/255,r=t+'="'+e.hex+'"';return i<1?r+" "+t+'-opacity="'+i.toFixed(2).slice(1)+'"':r}function ot(e,t,i){let r=e+t;return typeof i<"u"&&(r+=" "+i),r}function ve(e,t,i){let r="",n=0,o=!1,a=0;for(let l=0;l<e.length;l++){const s=Math.floor(l%t),c=Math.floor(l/t);!s&&!o&&(o=!0),e[l]?(a++,l>0&&s>0&&e[l-1]||(r+=o?ot("M",s+i,.5+c+i):ot("m",n,0),n=0,o=!1),s+1<t&&e[l+1]||(r+=ot("h",a),a=0)):n++}return r}_t.render=function(t,i,r){const n=je.getOptions(i),o=t.modules.size,a=t.modules.data,l=o+n.margin*2,s=n.color.light.a?"<path "+Ct(n.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",c="<path "+Ct(n.color.dark,"stroke")+' d="'+ve(a,o,n.margin)+'"/>',f='viewBox="0 0 '+l+" "+l+'"',y='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+f+' shape-rendering="crispEdges">'+s+c+`</svg>
`;return typeof r=="function"&&r(null,y),y};const ke=te,lt=bt,Ft=Dt,ze=_t;function gt(e,t,i,r,n){const o=[].slice.call(arguments,1),a=o.length,l=typeof o[a-1]=="function";if(!l&&!ke())throw new Error("Callback required as last argument");if(l){if(a<2)throw new Error("Too few arguments provided");a===2?(n=i,i=t,t=r=void 0):a===3&&(t.getContext&&typeof n>"u"?(n=r,r=void 0):(n=r,r=i,i=t,t=void 0))}else{if(a<1)throw new Error("Too few arguments provided");return a===1?(i=t,t=r=void 0):a===2&&!t.getContext&&(r=i,i=t,t=void 0),new Promise(function(s,c){try{const f=lt.create(i,r);s(e(f,t,r))}catch(f){c(f)}})}try{const s=lt.create(i,r);n(null,e(s,t,r))}catch(s){n(s)}}V.create=lt.create;V.toCanvas=gt.bind(null,Ft.render);V.toDataURL=gt.bind(null,Ft.renderToDataURL);V.toString=gt.bind(null,function(e,t,i){return ze.render(e,i)});const Ve={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00"};function Et(e){try{return Ve[e.toLowerCase()]}catch(t){console.log(t)}}const He=({url:e,canvasRef:t,size:i=200,color:r="black",bg:n="white"})=>{const o=x.useMemo(()=>({dark:Et(r),light:Et(n)}),[r,n]);return x.useEffect(()=>{(async()=>{if(!(!e||!t.current))try{const l=t.current,s=l.getContext("2d");if(!s)return;const c={width:i,margin:1,color:o},f=await V.toDataURL(e,c),E=new Image;E.onload=()=>{s.clearRect(0,0,l.width,l.height),s.drawImage(E,0,0,l.width,l.height)},E.src=f}catch(l){console.error("Error generating QR code:",l)}})()},[e,t,i,o]),null};function Ke(e,t){const i=document.createElement("a");i.download=t,i.href=e,i.click(),window.URL.revokeObjectURL(e)}function $e({canvasRef:e}){const t=()=>{const i=e.current;if(!i)return;const r=i.toDataURL("image/png"),n=atob(r.split(",")[1]),o=r.split(",")[0].split(":")[1].split(";")[0],a=new ArrayBuffer(n.length),l=new Uint8Array(a);for(let f=0;f<n.length;f++)l[f]=n.charCodeAt(f);const s=new Blob([a],{type:o}),c=URL.createObjectURL(s);Ke(c,"qrcode-canvas.png")};return w.jsx(w.Fragment,{children:w.jsx(Qt,{label:"download ",children:w.jsx("button",{onClick:t,style:{color:"white",fontSize:"2rem"},children:w.jsx(Kt,{})})})})}function Oe({category:e,id:t,original_url:i,short_url:r}){const n=Yt(),[o,a]=x.useState(null),[l,s]=x.useState({original_url:i,short_url:r,category:e}),[c,f]=x.useState({}),E=kt({mutationFn:async({original_url:u,short_url:h,category:g})=>{try{const d=await Gt(t,h,u,g);if(d.status==="error")throw Error(d.message);return d}catch(d){throw d instanceof Error?d.message:"An error occurred during updating the url."}},onMutate:async u=>{a(null),s(h=>({...h,...u})),f({})},onSuccess:u=>{X.success(u.message),a(null)},onError:u=>{u?X.error(u):X.error("An error ocurred while updating the URL.")},onSettled:()=>{n.invalidateQueries({queryKey:["url",t]}),n.invalidateQueries({queryKey:["urls"]})}}),y=u=>{a(u)},m=u=>{u.preventDefault(),s({original_url:i,short_url:r,category:e}),a(null)},p=u=>{s(h=>({...h,category:u.target.value}))},C=(u,h)=>{s(g=>({...g,[h]:u.target.value}))},N=async u=>{u.preventDefault();const{data:h,errors:g}=await zt({formData:l,schema:Vt});if(g){f(g);return}if(h){const d={};o==="original_url"?d.original_url=h.original_url:o==="short_url"?d.short_url=h.short_url:o==="category"&&(d.category=h.category),E.mutate(d)}};return w.jsx("div",{className:"container mx-auto",children:w.jsx("div",{className:"mt-4",children:w.jsx("div",{className:"flex flex-col align-start",children:qt.url.map(u=>{const h=l[u.name],g=h.length>30?`${h.slice(0,20)}...`:h;return w.jsxs("div",{className:"mb-4",children:[o!==u.name&&w.jsxs("div",{className:"flex w-full flex-col md:flex-row",children:[w.jsx("span",{className:"text-gray-200 w-1/4",children:u.name}),w.jsxs("div",{className:"flex flex-row align-start",children:[w.jsx("button",{className:"text-blue-500 hover:underline",onClick:()=>y(u.name),children:w.jsx($t,{})}),w.jsx("span",{className:"text-gray-600 text-lg line-clamp-1",children:g})]})]}),o===u.name&&w.jsxs("form",{className:"mb-4 flex items-center justify-start w-full",onSubmit:N,method:"PATCH",action:`/workspace/${t}`,children:[(c==null?void 0:c.general)&&w.jsx("div",{className:"text-red-500 text-sm mb-4",children:c==null?void 0:c.genera}),u.name!=="category"&&w.jsx("input",{type:"text",className:`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${c?"border-red-500":"border-gray-300"}`,value:l[u.name],onChange:d=>C(d,u.name),"aria-invalid":!!c,"aria-describedby":c?`${u.name}-error`:void 0}),u.name==="category"&&w.jsx("select",{className:`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${c?"border-red-500":"border-gray-300"}`,value:l.category,onChange:p,"aria-invalid":!!c,"aria-describedby":c?`${u.name}-error`:void 0,children:Object.values(mt).filter(d=>d!==mt.All).map(d=>w.jsx("option",{value:d,children:d},d))}),w.jsx("button",{className:"ml-2 bg-orange-400 text-white px-2 py-2 rounded",type:"submit",children:w.jsx(Ot,{})}),w.jsx("button",{className:"ml-2 bg-orange-400 text-white px-2 py-2 rounded",onClick:m,children:w.jsx(Jt,{})})]})]},u.name)})})})})}function Je(){const e=Wt(),{id:t}=Zt(),[i]=Xt(),r=Z.useRef(null),n=Z.useRef(null),o=Z.useRef(null),a=i.get("modal");x.useEffect(()=>{var E,y;if(!a){(E=r.current)==null||E.close(),(y=o.current)==null||y.close();return}Ht[a](r,o)},[a]);const l=()=>{e(-1)},{data:s,error:c,isLoading:f}=jt(vt(t));return f?w.jsx("div",{children:"Loading..."}):c instanceof Error?w.jsxs("div",{children:["Error: ",c.message]}):w.jsx(w.Fragment,{children:s&&w.jsxs(w.Fragment,{children:[w.jsxs(ht,{id:`modal-${t}`,title:s.short_url,ref:r,footer:w.jsx("button",{onClick:l,children:"Close"}),close:l,children:[w.jsx(Oe,{category:s.category,id:s.id,original_url:s.original_url,short_url:s.short_url}),w.jsxs("div",{className:"flex flex-row w-full mt-4",children:[w.jsx("span",{className:"text-gray-200 w-1/4",children:"Views"}),w.jsx("p",{className:"text-gray-200",children:s.views})]}),w.jsxs("div",{className:"flex flex-row w-full mt-4",children:[w.jsx("span",{className:"text-gray-200 w-1/4",children:"Created:"}),w.jsx("p",{className:"text-gray-200",children:wt.formatDateFromString(s.createdAt)})]}),w.jsxs("div",{className:"flex flex-row w-full mt-4",children:[w.jsx("span",{className:"text-gray-200 w-1/4",children:"Updated"}),w.jsx("p",{className:"text-gray-200",children:wt.formatDateFromString(s.updatedAt)})]})]}),w.jsxs(ht,{id:`qr_modal-${t}`,title:"QR Generator",ref:o,footer:w.jsx("button",{onClick:l,children:"Close"}),close:l,children:[w.jsx(He,{canvasRef:n,url:`http://localhost:8000/api/url/redirect/${s.slug}`,size:200}),w.jsx("div",{className:"flex justify-center items-center ",children:w.jsx("canvas",{ref:n,width:200,height:200,style:{border:"2px solid orange"}})}),w.jsx($e,{canvasRef:n})]})]})})}function sn(){return w.jsx(Je,{})}export{sn as default};
