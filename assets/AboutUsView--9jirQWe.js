import{d as x,u as y,o as b,c as _,a as t,t as r,b as i,e as s,w as n,F as g,i as w,r as d,f as h,g as f,h as C,_ as k}from"./index-CgZPDmVA.js";const T="/home/company-middle-title.png",V="/home/icon-big.png",A="/home/company-name.png",M={class:"first-background page",id:"first"},U={class:"hero-content"},B={class:"company-description"},L={class:"second-background page",id:"second"},N={class:"team-structure-content"},P={class:"vertical-center-item"},S={class:"team-structure-description"},F={class:"third-background page",id:"third"},H={class:"team-structure-content"},I={class:"team-highlight-list"},W=["src"],j={class:"team-highligh-description"},D=x({__name:"AboutUsView",props:{navConfig:{},navConfigModifiers:{}},emits:["update:navConfig"],setup(v){const u="/home/",c=w("config"),m=y(v,"navConfig");return b(()=>{m.value.navMenuColorClass="nav-black",m.value.navWebIconSrc=u+"/web-logo-dark.png"}),(E,e)=>{const p=d("el-header"),o=d("el-aside"),a=d("el-container");return h(),_(g,null,[t("section",M,[t("div",U,[e[0]||(e[0]=t("img",{class:"company-title-icon",src:T},null,-1)),t("p",B,r(i(c).company.firstPageUnderLogo),1)])]),t("section",L,[t("div",N,[s(a,{style:{height:"30rem"}},{default:n(()=>[s(p,{class:"team-structure-title"},{default:n(()=>e[1]||(e[1]=[f("Team Structure Plan")])),_:1}),s(a,null,{default:n(()=>[s(o,{width:"50%",class:"vertical-center-container"},{default:n(()=>[t("div",P,[e[2]||(e[2]=t("p",{class:"team-structure-subtitle xx-center"},"Team Purpose",-1)),t("p",S,r(i(c).company.companyAim),1)])]),_:1}),s(o,{width:"50%",class:"vertical-center-container"},{default:n(()=>e[3]||(e[3]=[t("div",{class:"vertical-center-item"},[t("p",{class:"team-structure-subtitle xx-center"},"Team Location"),t("p",{class:"team-structure-description"},"Melbourne + World"),t("p",{class:"team-structure-description"},"Remote.")],-1)])),_:1})]),_:1})]),_:1})])]),t("section",F,[t("div",H,[s(a,null,{default:n(()=>[s(p,{style:{height:"2rem"},class:"team-structure-title"},{default:n(()=>e[4]||(e[4]=[f("Team Highlight")])),_:1}),s(a,{style:{height:"70vh"}},{default:n(()=>[s(o,{style:{"flex-direction":"column"},width:"40%",class:"vertical-center-container"},{default:n(()=>e[5]||(e[5]=[t("img",{style:{width:"140px",margin:"10px 40px 10px auto"},src:V},null,-1),t("img",{style:{width:"200px",margin:"10px 10px 10px auto"},src:A},null,-1)])),_:1}),s(o,{width:"60%",class:"vertical-center-container"},{default:n(()=>[t("div",I,[(h(),_(g,null,C(3,l=>t("div",{key:l,class:"list-item-group"},[t("img",{class:"team-highligh-num",src:i(u)+`/list-title-0${l}.png`},null,8,W),t("p",j,r(i(c).company.teamHighlights[l-1]),1)])),64))])]),_:1})]),_:1})]),_:1})])])],64)}}}),$=k(D,[["__scopeId","data-v-ead21e7d"]]);export{$ as default};
