(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/like/like"],{"138c":function(t,e,a){},3401:function(t,e,a){"use strict";var i=a("138c"),n=a.n(i);n.a},"36c6":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"container"},[a("view",{staticClass:"topper"}),a("view",{staticClass:"topper-box"},[a("view",{staticClass:"topper-box-list"},[a("view",{staticClass:"topper-box-item"},[a("image",{staticClass:"topper-sc-image",attrs:{src:"../../static/back.png",eventid:"08c86483-0"},on:{tap:t.goBack}}),a("text",{staticClass:"topper-text"},[t._v("喜欢收藏")])])])]),a("view",{staticClass:"list-border-space"}),a("view",{staticClass:"list"},t._l(t.likes,function(e,i){return a("view",{key:i,staticClass:"list-item-box"},[a("view",{staticClass:"list-item-small"},[a("text",{staticClass:"like-title",attrs:{eventid:"08c86483-1-"+i},on:{tap:function(a){t.gotoDetail(e.aid)}}},[t._v(t._s(e.title))]),a("text",{staticClass:"like-nickname"},[t._v(t._s(e.nickname))])]),a("text",{staticClass:"like-nickname"},[t._v(t._s(e.createTime))])])}))])},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},9091:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{likes:[],userId:t.getStorageSync("login_key").userId}},onLoad:function(){},onShow:function(){this.getFollowed()},methods:{getFollowed:function(){var e=this,a=this;t.request({url:this.apiServer+"/like/list",method:"GET",header:{"content-type":"application/x-www-form-urlencoded"},data:{uId:t.getStorageSync("login_key").userId},success:function(t){console.log(t.data.data),a.likes=t.data.data;for(var i=0;i<a.likes.length;i++)a.likes[i].createTime=e.handleTime(a.likes[i].createTime)}})},gotoDetail:function(e){t.navigateTo({url:"../article_detail/article_detail?aId="+e+"&userId="+t.getStorageSync("login_key").userId})},handleTime:function(t){var e=new Date(t),a=e.getFullYear(),i=e.getMonth()+1,n=e.getDate()<10?"0"+e.getDate():""+e.getDate(),s=e.getHours()<10?"0"+e.getHours():""+e.getHours(),c=e.getMinutes()<10?"0"+e.getMinutes():""+e.getMinutes(),o=e.getSeconds()<10?"0"+e.getSeconds():""+e.getSeconds();return a+"-"+i+"-"+n+" "+s+":"+c+":"+o},goBack:function(){t.switchTab({url:"../my/my"})}}};e.default=a}).call(this,a("6e42")["default"])},b9a4:function(t,e,a){"use strict";a.r(e);var i=a("9091"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},cb0b:function(t,e,a){"use strict";a("175f");var i=s(a("b0ce")),n=s(a("fcb0"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},fcb0:function(t,e,a){"use strict";a.r(e);var i=a("36c6"),n=a("b9a4");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("3401");var c=a("2877"),o=Object(c["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports}},[["cb0b","common/runtime","common/vendor"]]]);