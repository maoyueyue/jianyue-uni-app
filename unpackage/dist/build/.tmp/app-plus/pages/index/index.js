(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0d0b":function(t,e,a){},1846:function(t,e,a){"use strict";a("175f");var n=s(a("b0ce")),i=s(a("82bc"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},2102:function(t,e,a){"use strict";a.r(e);var n=a("64a3"),i=a("e6a5");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("d2f1");var r=a("2877"),c=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},"3e83":function(t,e,a){},"43f7":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("2b87")),i=s(a("2102"));function s(t){return t&&t.__esModule?t:{default:t}}var r={components:{graceLoading:n.default,uniLoadMore:i.default},data:function(){return{articleAll:[],articles:[],tabCurrentIndex:0,swiperCurrentIndex:0,titleShowId:"tabTag-0",tabs:[{name:"推荐",id:"pwd1",loadingType:0,page:1},{name:"榜单",id:"pwd2",loadingType:0,page:1},{name:"专题",id:"pwd3",loadingType:0,page:1},{name:"连载",id:"pwd3",loadingType:0,page:1}],showKeyboard:!1}},onLoad:function(){this.getArticles()},onShow:function(){},onPullDownRefresh:function(){this.getArticles()},methods:{confirmPwd:function(){this.$refs.keyboard.show()},onInput:function(t){},onConfirm:function(t){t.value},tabChange:function(t){var e=t.target.id.replace("tabTag-","");this.swiperCurrentIndex=e,this.tabCurrentIndex=e,this.titleShowId="tabTag-"+e},swiperChange:function(t){var e=t.detail.current;this.tabCurrentIndex=e,this.titleShowId="tabTag-"+e},gotoWrite:function(){!0===t.getStorageSync("login_key").login?t.navigateTo({url:"../write/write"}):t.showModal({title:"提示",content:"您未登录",cancelText:"再等等",confirmText:"前往登录",success:function(e){e.confirm&&t.navigateTo({url:"../signin/signin"})}})},getArticles:function(){var e=this,a=this;t.request({url:this.apiServer+"/article/list",method:"GET",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){a.articles=t.data.data;for(var n=0;n<a.articles.length;n++)a.articles[n].createTime=e.handleTime(a.articles[n].createTime),a.articles[n].content=e.handleContent(a.articles[n].content);a.articleAll.push(a.articles)},complete:function(){t.stopPullDownRefresh()}})},gotoDetail:function(e){t.navigateTo({url:"../article_detail/article_detail?aId="+e})},handleTime:function(t){var e=new Date(t),a=e.getFullYear(),n=e.getMonth()+1,i=e.getDate()<10?"0"+e.getDate():""+e.getDate(),s=e.getHours()<10?"0"+e.getHours():""+e.getHours(),r=e.getMinutes()<10?"0"+e.getMinutes():""+e.getMinutes(),c=e.getSeconds()<10?"0"+e.getSeconds():""+e.getSeconds();return a+"-"+n+"-"+i+" "+s+":"+r+":"+c},handleContent:function(t){return t=t.replace(/(\n)/g,""),t=t.replace(/(\t)/g,""),t=t.replace(/(\r)/g,""),t=t.replace(/<\/?[^>]*>/g,""),t=t.replace(/\s*/g,""),t},scrollend:function(t){var e=t.currentTarget.dataset.scindex;if(1===this.tabs[e].loadingType)return!1;console.log(this.tabs[e].page),this.tabs[e].page>3?this.tabs[e].loadingType=2:(this.tabs[e].loadingType=1,setTimeout(function(){_self.articleAll[e]=_self.articleAll[e].concat(articles),_self.tabs[e].page++,_self.tabs[e].loadingType=0},1e3))}}};e.default=r}).call(this,a("6e42")["default"])},"64a3":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"uni-load-more"},[a("view",{directives:[{name:"show",rawName:"v-show",value:"loading"===t.status&&t.showIcon,expression:"status === 'loading' && showIcon"}],staticClass:"uni-load-more__img"},[a("view",{staticClass:"load1"},[a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}})]),a("view",{staticClass:"load2"},[a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}})]),a("view",{staticClass:"load3"},[a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}}),a("view",{style:{background:t.color}})])]),a("text",{staticClass:"uni-load-more__text",style:{color:t.color}},[t._v(t._s("more"===t.status?t.contentText.contentdown:"loading"===t.status?t.contentText.contentrefresh:t.contentText.contentnomore))])])},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},6590:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"uni-load-more",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=n},"6ff5":function(t,e,a){"use strict";var n=a("3e83"),i=a.n(n);i.a},"82bc":function(t,e,a){"use strict";a.r(e);var n=a("a0b0"),i=a("cf4b");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("6ff5");var r=a("2877"),c=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},a0b0:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"container"},[a("view",{staticClass:"topper"}),a("view",{staticClass:"index-content-box"},[a("view",{staticClass:"title"},[a("scroll-view",{staticClass:"tab-title ",attrs:{"scroll-x":"true",id:"tab-title"}},t._l(t.tabs,function(e,n){return a("view",{key:n,class:[t.tabCurrentIndex==n?"tab-current":"tabpage"],attrs:{id:"tabTag-"+n,eventid:"c297dc6e-0-"+n},on:{tap:t.tabChange}},[a("text",[t._v(t._s(e.name))])])}))],1),a("view",{staticClass:"list-border-space"}),a("swiper",{staticClass:"tab-swiper-full",attrs:{current:t.swiperCurrentIndex,eventid:"c297dc6e-2"},on:{change:t.swiperChange}},[a("swiper-item",{key:"0",attrs:{mpcomid:"c297dc6e-1"}},[a("view",{attrs:{"data-scindex":"0"}},[a("view",{staticClass:"article-box"},t._l(t.articleAll,function(e,n){return a("view",{key:n},t._l(t.articles,function(e,i){return a("view",{key:i,staticClass:"article"},[a("view",{staticClass:"article-page"},[a("text",{staticClass:"article-box-title",attrs:{eventid:"c297dc6e-1-"+n+"-"+i},on:{tap:function(a){t.gotoDetail(e.id)}}},[t._v(t._s(e.title))]),e.imgs.length>=3?a("view",{},[a("view",{staticClass:"thumbnail-box"},t._l(e.imgs,function(e,n){return n<3?a("view",{key:n,staticClass:"thumbnail-item"},[a("image",{attrs:{src:e.imgUrl}})]):t._e()}))]):e.imgs.length>=1?a("view",{},[a("view",{staticClass:"text-img-box"},[a("view",{staticClass:"left"},[a("rich-text",{attrs:{nodes:e.content,bindtap:"tap",mpcomid:"c297dc6e-0-"+n+"-"+i}})],1),a("view",{staticClass:"right"},[a("image",{attrs:{src:e.imgs[e.imgs.length-1].imgUrl}})])])]):a("view",{staticClass:"text-box"},[a("text",[t._v(t._s(e.content))])]),a("view",{staticClass:"article-info"},[a("text",[t._v(t._s(e.nickname))]),a("text",{staticClass:"info-text"},[t._v(t._s(e.createTime))])])]),a("view",{staticClass:" article-flow"})])}))}))])]),a("swiper-item",{key:"1",attrs:{mpcomid:"c297dc6e-2"}},[a("view",{attrs:{"data-scindex":"1"}},[a("view",{staticClass:"content2"},[t._v("b")])])]),a("swiper-item",{key:"2",attrs:{mpcomid:"c297dc6e-3"}},[a("view",{attrs:{"data-scindex":"2"}},[a("view",{staticClass:"content3"},[t._v("C")])])]),a("swiper-item",{key:"3",attrs:{mpcomid:"c297dc6e-4"}},[a("view",{attrs:{"data-scindex":"3"}},[a("view",{staticClass:"content4"},[t._v("d")])])])],1)],1),a("button",{staticClass:"circle-btn",attrs:{eventid:"c297dc6e-3"},on:{tap:t.gotoWrite}},[a("text",{staticClass:"icon-text"},[t._v("+")])]),t._m(0)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("image",{staticClass:"circle-btn-search",attrs:{src:"../../static/search.png"}})])}];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},cf4b:function(t,e,a){"use strict";a.r(e);var n=a("43f7"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},d2f1:function(t,e,a){"use strict";var n=a("0d0b"),i=a.n(n);i.a},e6a5:function(t,e,a){"use strict";a.r(e);var n=a("6590"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a}},[["1846","common/runtime","common/vendor"]]]);