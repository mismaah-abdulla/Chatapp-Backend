(function(e){function t(t){for(var r,o,i=t[0],l=t[1],c=t[2],d=0,p=[];d<i.length;d++)o=i[d],n[o]&&p.push(n[o][0]),n[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(p.length)p.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],r=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},n={app:0},s=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0b53":function(e,t,a){},2912:function(e,t,a){},"2cfd":function(e,t,a){"use strict";var r=a("96d5"),n=a.n(r);n.a},"4dc0":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),n=a("bb71"),s=(a("da64"),a("fcf4"));r["a"].use(n["a"],{iconfont:"md",theme:{primary:s["a"].deepOrange,secondary:s["a"].lightBlue,accent:s["a"].grey.lighten1,error:"#b71c1c",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}});var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-toolbar",{staticClass:"px-2",attrs:{app:"",dark:"",height:"40px"}},[a("img",{staticStyle:{width:"40px",height:"40px"},attrs:{src:"/Logo_deep_orange.png"}}),a("v-toolbar-title",{staticClass:"headline",attrs:{color:"primary"}},[a("span",{staticClass:"secondary--text"},[e._v(e._s(e.app.name))])]),a("v-spacer"),a("v-btn",{attrs:{flat:"",color:"accent",to:"/"}},[e._v(" Home ")]),a("v-btn",{attrs:{flat:"",color:"accent",to:"/chats"}},[e._v(" Chats ")]),a("v-btn",{attrs:{flat:"",color:"accent",to:"/about"}},[e._v(" About ")]),"/chats"===e.$route.path?a("v-toolbar-side-icon",{staticClass:"hidden-lg-and-up",on:{click:function(t){e.drawer=!e.drawer}}}):e._e()],1),a("v-content",["/chats"===e.$route.path?a("v-navigation-drawer",{attrs:{fixed:"",app:"",right:"",clipped:"",dark:"",width:280},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-toolbar",[a("v-list",[a("v-list-tile",[a("v-list-tile-title",{staticClass:"subheading font-weight-medium"},[e._v(" Chats ")])],1)],1)],1),a("v-divider"),a("v-list",{staticClass:"pa-0",attrs:{dense:""}},e._l(e.chats,(function(t){return a("v-list-tile",{key:t.title},[a("v-list-tile-action",[a("v-icon",[e._v(e._s(t.icon))])],1),a("v-list-tile-content",[t.current?a("v-list-tile-title",{staticClass:"primary--text"},[e._v(e._s(t.title))]):a("v-list-tile-title",[e._v(e._s(t.title))])],1)],1)})),1)],1):e._e(),a("router-view",{attrs:{app:e.app}}),"/Chats"!==e.$route.path?a("v-btn",{attrs:{href:"https://github.com/mismaah-abdulla/chatapp",target:"_blank",flat:"",fixed:"",bottom:"",right:"",fab:"",small:""}},[a("img",{staticStyle:{width:"35px",height:"35px"},attrs:{src:"/githubLogo.png"}})]):e._e()],1)],1)},i=[],l={name:"Messenger",description:"Web chat app made with Vue.js and Vuetify"},c={name:"App",components:{},data:function(){return{app:l,drawer:null,chats:[{title:"Main",icon:"dashboard",current:!0},{title:"Chat 2",icon:"question_answer",current:!1},{title:"Chat 3",icon:"question_answer",current:!1}]}}},u=c,d=a("2877"),p=a("6544"),f=a.n(p),v=a("7496"),m=a("8336"),h=a("549c"),g=a("ce7e"),b=a("132d"),x=a("8860"),y=a("ba95"),_=a("40fe"),w=a("5d23"),C=a("f774"),V=a("9910"),k=a("71d9"),O=a("706c"),j=a("2a7f"),T=Object(d["a"])(u,o,i,!1,null,null,null),L=T.exports;f()(T,{VApp:v["a"],VBtn:m["a"],VContent:h["a"],VDivider:g["a"],VIcon:b["a"],VList:x["a"],VListTile:y["a"],VListTileAction:_["a"],VListTileContent:w["a"],VListTileTitle:w["b"],VNavigationDrawer:C["a"],VSpacer:V["a"],VToolbar:k["a"],VToolbarSideIcon:O["a"],VToolbarTitle:j["a"]});var S=a("8c4f"),E=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("Welcome"),a("Login")],1)},F=[],$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"pa-0":""}},[a("v-layout",{attrs:{"text-xs-center":"",wrap:"","pa-0":"","ma-0":""}},[a("v-flex",{attrs:{xs12:"","pa-0":"","ma-0":""}},[a("img",{attrs:{src:"/Logo_deep_orange.png",alt:"Deep Orange Logo"}})]),a("v-flex",{attrs:{"mb-4":""}},[a("h1",{staticClass:"display-2 font-weight-regular mb-3"},[e._v(" Welcome to "),a("span",{staticClass:"primary--text"},[e._v(e._s(e.app.name))])]),a("p",{staticClass:"subheading font-weight-regular"},[e._v(" "+e._s(e.app.description)+" ")])])],1)],1)},A=[],D={data:function(){return{app:l}}},q=D,I=(a("c21d"),a("a523")),M=a("0e8f"),P=a("a722"),R=Object(d["a"])(q,$,A,!1,null,null,null),N=R.exports;f()(R,{VContainer:I["a"],VFlex:M["a"],VLayout:P["a"]});var B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"pa-0":""}},[a("v-layout",{attrs:{"align-center":"","justify-center":""}},[a("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[a("v-card",{staticClass:"elevation-4"},[a("v-toolbar",{attrs:{height:"40px",dark:"",color:"primary"}},[a("v-toolbar-title",{staticClass:"pa-0"},[e._v("Login")])],1),a("v-card-text",{staticClass:"pb-0"},[a("v-form",[a("v-text-field",{attrs:{color:"secondary","prepend-icon":"pregnant_woman",name:"login",label:"Username",type:"text"}}),a("v-text-field",{staticClass:"pt-0",attrs:{color:"secondary",id:"password","prepend-icon":"lock",name:"password",label:"Password",type:"password"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"}},[e._v("Login")])],1)],1)],1)],1),a("v-layout",{attrs:{"text-xs-center":"",wrap:"","pt-3":"","pb-0":""}},[a("v-flex",{attrs:{"pb-0":""}},[a("p",{staticClass:"subheading font-weight-regular"},[e._v(" Don't have an account? "),a("v-btn",{attrs:{flat:"",outline:"",color:"primary",to:"/register"}},[e._v("Register")])],1)])],1)],1)},W=[],H={},J=H,U=a("b0af"),z=a("99d9"),G=a("4bd4"),Y=a("2677"),K=Object(d["a"])(J,B,W,!1,null,null,null),Q=K.exports;f()(K,{VBtn:m["a"],VCard:U["a"],VCardActions:z["a"],VCardText:z["b"],VContainer:I["a"],VFlex:M["a"],VForm:G["a"],VLayout:P["a"],VSpacer:V["a"],VTextField:Y["a"],VToolbar:k["a"],VToolbarTitle:j["a"]});var X={components:{Welcome:N,Login:Q}},Z=X,ee=Object(d["a"])(Z,E,F,!1,null,null,null),te=ee.exports;f()(ee,{VContainer:I["a"]});var ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{xs12:"","text-xs-center":""}},[a("img",{attrs:{src:"/Logo_deep_orange.png",alt:"Deep Orange Logo"}}),a("h1",{staticClass:"display-2 font-weight-regular mb-3"},[e._v(" Register ")])]),a("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[a("v-card",{staticClass:"pa-3"},[a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-text-field",{attrs:{color:"secondary",counter:10,rules:e.nameRules,label:"Username",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("v-text-field",{attrs:{color:"secondary",rules:e.emailRules,label:"E-mail",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("v-text-field",{attrs:{color:"secondary",rules:e.passwordRules,type:"password",label:"Password",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("v-checkbox",{attrs:{color:"secondary",rules:[function(e){return!!e||"You must agree to continue!"}],label:"I agree to the terms and conditions",required:""},model:{value:e.checkbox,callback:function(t){e.checkbox=t},expression:"checkbox"}}),a("v-btn",{attrs:{disabled:!e.valid,color:"primary"},on:{click:e.validate}},[e._v(" Submit ")]),a("v-btn",{attrs:{flat:"",outline:"",color:"primary"},on:{click:e.reset}},[e._v(" Clear ")])],1)],1)],1)],1)],1)},re=[],ne={data:function(){return{valid:!0,password:"",name:"",nameRules:[function(e){return!!e||"Name is required"},function(e){return e&&e.length<=10||"Name must be less than 10 characters"}],email:"",emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/\S+@\S+\.\S+/.test(e)||"E-mail must be valid"}],passwordRules:[function(e){return!!e||"Password is required"},function(e){return!!e&&e.length>=6||"Password must be greater than 6 characters"}],select:null,checkbox:!1}},methods:{validate:function(){this.$refs.form.validate()&&(this.snackbar=!0)},reset:function(){this.$refs.form.reset()},resetValidation:function(){this.$refs.form.resetValidation()}}},se=ne,oe=(a("2cfd"),a("ac7c")),ie=Object(d["a"])(se,ae,re,!1,null,null,null),le=ie.exports;f()(ie,{VBtn:m["a"],VCard:U["a"],VCheckbox:oe["a"],VContainer:I["a"],VFlex:M["a"],VForm:G["a"],VLayout:P["a"],VTextField:Y["a"]});var ce=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("Chat")],1)},ue=[],de=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-layout",{attrs:{"justify-space-around":""}},[a("v-flex",{attrs:{xl6:"",lg6:"",md8:"",xs12:"",sm10:""}},[a("v-card",[a("div",{attrs:{id:"chatWindow"}},e._l(e.msgs,(function(t){return a("div",{key:t.messageID},[a("div",{staticClass:"chatBubble"},["Me"==t.username?a("span",{staticClass:"primary--text font-weight-medium"},[e._v(" "+e._s(t.username)+" ")]):a("span",{style:{color:e.stringToColor(t.username)}},[e._v(" "+e._s(t.username)+" ")]),e._v(" — "),a("span",{staticClass:"black--text"},[e._v(" "+e._s(t.message)+" ")])]),a("br")])})),0),e.username?a("v-text-field",{staticClass:"pb-3 pl-4 pr-5",attrs:{"append-icon":"send",counter:"70",placeholder:"Send a message",clearable:"",type:"text"},on:{"click:append":function(t){return e.send()},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.send()}},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}):a("v-text-field",{staticClass:"pb-3 pl-4 pr-5",attrs:{"append-icon":"send",counter:"10",placeholder:"Enter a username",type:"text"},on:{"click:append":e.selectuser,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.selectuser(t)}},model:{value:e.userselect,callback:function(t){e.userselect=t},expression:"userselect"}})],1)],1)],1)},pe=[],fe=(a("6b54"),a("5118")),ve={data:function(){return{header:"Main",ws:null,username:null,userselect:"",message:"",messageID:1,msgs:[]}},created:function(){var e=this;this.ws=new WebSocket("ws://localhost:8000/ws"),this.ws.addEventListener("message",(function(t){var a=JSON.parse(t.data),r={};r.messageID=a.messageID,r.username=a.username,r.message=a.message,e.msgs.push(r)}))},watch:{msgs:function(e){Object(fe["setTimeout"])((function(){var e=document.getElementById("chatWindow");e.scrollTop=e.scrollHeight}),50)}},methods:{send:function(){""!==this.message&&(this.ws.send(JSON.stringify({ID:this.messageID,username:this.username,message:this.message})),this.message="")},selectuser:function(){this.username=this.userselect},stringToColor:function(e){for(var t=0,a=0;a<e.length;a++)t=e.charCodeAt(a)+((t<<5)-t);for(var r="#",n=0;n<3;n++){var s=t>>8*n&255;r+=("00"+s.toString(16)).substr(-2)}return r}}},me=ve,he=(a("f196"),Object(d["a"])(me,de,pe,!1,null,null,null)),ge=he.exports;f()(he,{VCard:U["a"],VFlex:M["a"],VLayout:P["a"],VTextField:Y["a"]});var be={components:{Chat:ge}},xe=be,ye=Object(d["a"])(xe,ce,ue,!1,null,null,null),_e=ye.exports;f()(ye,{VContainer:I["a"]});var we=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-layout",{attrs:{"text-xs-center":"",wrap:"","justify-center":""}},[a("v-flex",{attrs:{xs12:""}},[a("img",{attrs:{src:"/Logo_deep_orange.png",alt:"Deep Orange Logo"}}),a("h1",{staticClass:"display-2 font-weight-regular mb-3"},[e._v(" About ")])]),a("v-flex",{attrs:{shrink:""}},[a("v-card",{staticClass:"elevation-4"},[a("div",{staticClass:"v-card__text subheading font-weight-regular",attrs:{"pa-2":""}},[e._v(" "+e._s(e.app.name)+" is a web chat application made with Vue.js and Vuetify by Mismaah Abdulla"),a("br"),a("a",{attrs:{href:"https://twitter.com/MismaahAbdulla"}},[e._v("Twitter")]),e._v(" / "),a("a",{attrs:{href:"https://github.com/mismaah-abdulla"}},[e._v("GitHub")])])])],1)],1)],1)},Ce=[],Ve={data:function(){return{app:l}}},ke=Ve,Oe=(a("e76e"),Object(d["a"])(ke,we,Ce,!1,null,null,null)),je=Oe.exports;f()(Oe,{VCard:U["a"],VContainer:I["a"],VFlex:M["a"],VLayout:P["a"]}),r["a"].use(S["a"]);var Te=[{path:"/",name:"Home",component:te},{path:"/about",name:"About",component:je},{path:"/register",name:"Register",component:le},{path:"/chats",name:"Chats",component:_e}],Le=new S["a"]({mode:"history",base:"",routes:Te}),Se=Le,Ee=a("2f62");r["a"].use(Ee["a"]);var Fe=new Ee["a"].Store({state:{},mutations:{},actions:{}}),$e=a("9483");Object($e["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var Ae=a("5b80");r["a"].config.productionTip=!1,new r["a"]({router:Se,store:Fe,render:function(e){return e(L)}}).$mount("#app"),r["a"].use(Ae["a"])},"96d5":function(e,t,a){},c21d:function(e,t,a){"use strict";var r=a("0b53"),n=a.n(r);n.a},e76e:function(e,t,a){"use strict";var r=a("2912"),n=a.n(r);n.a},f196:function(e,t,a){"use strict";var r=a("4dc0"),n=a.n(r);n.a}});
//# sourceMappingURL=app.252e2a52.js.map