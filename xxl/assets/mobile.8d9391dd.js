import{_ as y,d as k,r as C,a as b,t as E,b as x,o as n,c as l,w as F,v as S,e as s,f as r,g as _,h as w,u as d,F as B,i as D,p as $,k as I,E as A,n as L,j as N,l as p}from"./index.f9f11d14.js";import{S as T,_ as V}from"./stage.7f24fb15.js";const z=t=>($("data-v-cb7168d6"),t=t(),I(),t),j={class:"container"},q={class:"welcome"},M=z(()=>s("img",{class:"title-img",src:V},null,-1)),O=p("\u5F00\u59CB\u6E38\u620F"),R={class:"score"},W={class:"stage"},G=["onClick"],H=p("\u7ED3\u675F\u6E38\u620F"),J=k({name:"mobile",setup(t){const a=C(!0);let v=document.documentElement.clientWidth;const o=b(new T(7,7,(v-20)/7)),{data:h,score:u}=E(o),m=()=>{a.value=!1,o.gameLoop(!0)},f=c=>{o.click(c)},g=()=>{A.alert(`\u5F53\u524D\u6210\u7EE9\uFF1A${u.value}\u5206`,"\u96EA\u7CD5\u6D88\u6D88\u5927\u4F5C\u6218",{confirmButtonText:"\u786E\u5B9A",callback:c=>{a.value=!0}})};return(c,K)=>{const i=x("el-button");return n(),l("div",j,[F(s("div",q,[M,r(i,{class:"change-btn",type:"primary",onClick:m},{default:_(()=>[O]),_:1})],512),[[S,a.value]]),s("div",R,w(d(u))+"\u5206",1),s("div",W,[(n(!0),l(B,null,D(d(h),e=>(n(),l("div",{style:L({left:`${e.positionLeft}px`,top:`${e.positionTop}px`}),key:e.key,class:N(["square",`type${e.type}`,`scale${e.scale}`,{active:e.active}]),onClick:P=>f(e)},null,14,G))),128))]),r(i,{class:"change-btn",type:"primary",onClick:g},{default:_(()=>[H]),_:1})])}}});var X=y(J,[["__scopeId","data-v-cb7168d6"]]);export{X as default};
