(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/password/password"],{"1bc7":function(t,e,n){"use strict";n.r(e);var a=n("21b4"),s=n("2590");for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);n("3f71");var o=n("2877"),r=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},"21b4":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"container"},[n("view",{staticClass:"topper"}),n("view",{staticClass:"topper-box"}),t._m(0),n("view",{staticClass:"signup-content"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{password:"",type:"text",placeholder:"请输入密码",required:"required",eventid:"764f5903-0"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),n("button",{staticClass:"signup-btn",attrs:{eventid:"764f5903-1"},on:{tap:function(e){t.signUp(t.userDTO)}}},[t._v("注册")])],1),n("image",{staticClass:"guanbi-btn",attrs:{src:"../../static/cha.png",eventid:"764f5903-2"},on:{tap:t.goBack}})])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"signin-title"},[n("text",[t._v("设置密码")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return s})},2590:function(t,e,n){"use strict";n.r(e);var a=n("f89d"),s=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=s.a},"3f71":function(t,e,n){"use strict";var a=n("5c77"),s=n.n(a);s.a},"5c77":function(t,e,n){},ba06:function(t,e,n){"use strict";n("175f");var a=i(n("b0ce")),s=i(n("1bc7"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(s.default))},f89d:function(t,e,n){"use strict";(function(t){var n;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=(n={data:function(){return{userDTO:{mobile:"",password:""}}},onLoad:function(){}},a(n,"onLoad",function(t){console.log(t.mobile),this.mobile=t.mobile}),a(n,"methods",{signUp:function(e){var n=this;t.request({url:this.apiServer+"/user/sign_up",method:"POST",header:{"content-type":"application/json"},data:{mobile:n.mobile,password:n.password},success:function(e){0===e.data.code?t.showModal({title:"提示",content:"注册成功",confirmText:"立即登录",cancelText:"稍后登录",success:function(e){e.confirm?t.navigateTo({url:"../signin/signin"}):e.cancel&&t.switchTab({url:"../my/my"})}}):t.showModal({title:"提示",content:e.data.msg})}})}}),n);e.default=s}).call(this,n("6e42")["default"])}},[["ba06","common/runtime","common/vendor"]]]);