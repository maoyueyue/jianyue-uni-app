<template>
	<view class="container">
		<view class="topper"></view>
		<view class="index-content-box">
			<view class="title">
				<scroll-view class="tab-title " scroll-x="true" id="tab-title">
					<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'tab-current' : 'tabpage']" :id="'tabTag-' + index" @tap="tabChange">
						<text>{{ tab.name }}</text>
					</view>
				</scroll-view>
			</view>
			<view class="list-border-space"></view>
			<swiper class="tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange">
				<swiper-item key="0">
					<view data-scindex="0">
						<view class="article-box">
							<!-- <view v-for="(articleAll,newIndex) in articleAll" :key="newIndex"> -->
								<view class="article" v-for="(article, index) in articles" :key="index">
									<view class="article-page">
										<text class="article-box-title" @tap="gotoDetail(article.id)">{{ article.title }}</text>
										<view class="" v-if="article.imgs.length >= 3">
											<view class="thumbnail-box">
												<view class="thumbnail-item" v-for="(item, index1) in article.imgs" :key="index1" v-if="index1 < 3">
													<image :src="item.imgUrl"></image>
												</view>
											</view>
										</view>
										<view class="" v-else-if="article.imgs.length >= 1">
											<view class="text-img-box">
												<view class="left"><rich-text :nodes="article.content" bindtap="tap"></rich-text></view>
												<view class="right"><image :src="article.imgs[article.imgs.length - 1].imgUrl"></image></view>
											</view>
										</view>
										<!-- 没用图片的显示方式 -->
										<view class="text-box" v-else>
											<text>{{ article.content }}</text>
										</view>
										<!-- 文章作者等信息 -->
										<view class="article-info">
											<text>{{ article.nickname }}</text>
											<text class="info-text">{{ article.createTime }}</text>
										</view>
									</view>
									<view class=" article-flow"></view>
								</view>
							<!-- </view> --> 
						</view>
					</view>
				</swiper-item>
				<swiper-item key="1">
					<view data-scindex="1"><view class="content2">b</view></view>
				</swiper-item>
				<swiper-item key="2">
					<view data-scindex="2"><view class="content3">C</view></view>
				</swiper-item>
				<swiper-item key="3">
					<view data-scindex="3"><view class="content4">d</view></view>
				</swiper-item>
			</swiper>
		</view>
		<button class="circle-btn" @tap="gotoWrite"><text class="icon-text">+</text></button>
		<view><image class="circle-btn-search" src="../../static/search.png"></image></view>
	</view>
</template>

<script>
	import graceLoading from '../../graceUI/components/graceLoading.vue';
import uniLoadMore from	'@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
export default {
	 components: {graceLoading,uniLoadMore},
	data() {
		return {
			// articleAll:[],
			articles: [],
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			titleShowId: 'tabTag-0',
			page:1,
			tabs: [
				//标签名称 , 分类 id , 加载更多, 加载的页码
				{ name: '推荐', id: 'pwd1', loadingType: 0, page: 1 },
				{ name: '榜单', id: 'pwd2', loadingType: 0, page: 1 },
				{ name: '专题', id: 'pwd3', loadingType: 0, page: 1 },
				{ name: '连载', id: 'pwd3', loadingType: 0, page: 1 }
			],
			showKeyboard: false
		};
	},
	onLoad: function() {
		this.getArticles();
	},
	onShow: function() {},
	onPullDownRefresh: function() {
		this.getArticles();
	},
// 	onReachBottom:function(){
// 		this.getArticles();
// 	},
	methods: {
		confirmPwd() {
			this.$refs.keyboard.show();
		},
		onInput(e) {
			//e.cancel = true;
		},
		onConfirm(e) {
			let password = e.value;
		},
		tabChange(e) {
			var index = e.target.id.replace('tabTag-', '');
			this.swiperCurrentIndex = index;
			this.tabCurrentIndex = index;
			this.titleShowId = 'tabTag-' + index;
		},
		swiperChange: function(e) {
			var index = e.detail.current;
			this.tabCurrentIndex = index;
			this.titleShowId = 'tabTag-' + index;
		},
		gotoWrite: function() {
			if (uni.getStorageSync('login_key').login === true) {
				uni.navigateTo({
					url: '../write/write'
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '您未登录',
					cancelText: '再等等',
					confirmText: '前往登录',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../signin/signin'
							});
						}
					}
				});
			}
		},
		getArticles: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/list',
				method: 'GET',
// 				data:{
// 					page:_this.page,
// 					size:5
// 				},
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				success: res => {
					_this.articles = res.data.data;
					for (var i = 0; i < _this.articles.length; i++) {
						_this.articles[i].createTime = this.handleTime(_this.articles[i].createTime);
						_this.articles[i].content = this.handleContent(_this.articles[i].content);
					}
					// _this.articleAll.push(_this.articles);
				},
				complete: function() {
					uni.stopPullDownRefresh();
				}
			});
		},
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId
			});
		},
		handleTime: function(date) {
			var d = new Date(date);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
			var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
			var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		},
		handleContent: function(description) {
			description = description.replace(/(\n)/g, '');
			description = description.replace(/(\t)/g, '');
			description = description.replace(/(\r)/g, '');
			description = description.replace(/<\/?[^>]*>/g, '');
			description = description.replace(/\s*/g, '');
			return description;
		},
	}
};
</script>

<style>
/* 选项卡 */
.tab {
	padding: 0;
}
/* 导航栏整体设置 */
.title {
	margin-bottom: 1px;
}
.tab-swiper-full {
	height: 89vh;
}
/* 导航栏文字梳理 */
.tab-title view {
	width: 37px;
	margin: 0 10px;
	display: inline-block;
	align-items: center;
	text-align: center;
	font-size: 18px;
	padding-bottom: 7px;
}
/* 导航栏底部下划线设置 */
.tab-current {
	border-bottom: 3px solid #de533a !important;
	color: #de533a;
}
.title {
	width: 100%;
	padding-top: 12px;
	color: #2e2e2e;
}
.container {
	border-top: 1px solid #eeeeee;
}
.article-box {
	width: 100%;
	height: 89vh;
	overflow: auto;
}
.article {
	width: 100%;
}
.article-page {
	width: 92%;
	margin: 0 auto;
	padding-top: 15px;
	padding-bottom: 17px;
}
.article-box-title {
	overflow: hidden;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	margin-bottom: 6px;
	color: #2e2e2e;
	font-size: 18px;
}
.thumbnail-box {
	display: flex;
	justify-content: center;
	margin: 0 auto;
}
.thumbnail-item {
	flex: 1 1 33.3%;
	display: flex;
	justify-content: center;
}
.thumbnail-item image {
	width: 95%;
	border-radius: 3px;
	height: 80px;
}
.right image {
	width: 95%;
	border-radius: 3px;
	height: 80px;
}
.text-img-box {
	display: flex;
}
.left {
	flex: 1 1 60%;
	height: 68px;
	overflow: hidden;
	-webkit-line-clamp: 3;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	font-size: 15px;
	line-height: 23px;
	color: #5e5e5e;
}
.text-box {
	height: 68px;
	overflow: hidden;
	-webkit-line-clamp: 3;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	font-size: 15px;
	line-height: 23px;
	color: #5e5e5e;
}
.right {
	flex: 1 1 27%;
	display: flex;
	justify-content: center;
}
.article-info {
	font-size: 12px;
	color: #8f8f94;
	margin-top: 7px;
}
.article-flow {
	height: 11px;
	background-color: #f0f0f0;
}
.info-text {
	margin-left: 10px;
}
.icon-text {
	font-size: 25pt;
	color: #fff;
}
.circle-btn {
	position: fixed;
	bottom: 30px;
	right: 30px;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #de533a;
	background: linear-gradient(40deg, #ffd86f, #fc6262);
	box-shadow: 2px 5px 10px #aaa;
	cursor: pointer;
	border: none;
	outline: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
.circle-btn-search {
	position: fixed;
	top: 45px;
	right: 28px;
	width: 20px;
	height: 20px;
	cursor: pointer;
}
.circle-btn:after {
	border: none;
}
</style>
