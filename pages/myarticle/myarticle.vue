<template>
	<view style="overflow: hidden;">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item">
					<image @tap="goBack" class="topper-sc-image" src="../../static/back.png"></image>
					<text class="topper-text">我的文章</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view class="title">
			<scroll-view class="tab-title " scroll-x="true" id="tab-title">
				<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'tab-current' : 'tabpage']" :id="'tabTag-' + index" @tap="tabChange">
					<text>&emsp;{{ tab.name }}&emsp;</text>
				</view>
			</scroll-view>
		</view>
		<view class="list-border-space"></view>
		<view class="myarticle-center-box">
			<text>{{ articles.length }}&nbsp;篇文章</text>
			<text>公开文章</text>
		</view>
		<swiper class="tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange">
			<swiper-item key="0">
				<view data-scindex="0">
					<view class="content1">
						<view class="grace-scroll-do grace-bg-white ">
							<scroll-view
								class="grace-scroll-x"
								scroll-x
								v-for="(article, index) in articles"
								:scroll-left="scrollIndex == index ? 180 : 0"
								@touchstart="touchStart"
								@touchend="touchEnd"
								:data-id="index"
								scroll-with-animation="true"
								:key="index"
							>
								<view class="grace-items">
									<view class="myarticle-list-box">
										<text class=" article-list" @tap="gotoDetail(article.id)">{{ article.title }}</text>
										<view class="myarticle-list-small">
											<text class=" grace-text-small myarticle-list-text">阅读量 50</text>
											<view class=" grace-text-small myarticle-list-text">{{ article.createTime }}</view>
										</view>
									</view>
								</view>
								<view class="grace-items btn" :data-id="index" @tap="removeArticle(article.id)" :style="{ width: index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width + 'px' }">
									删除
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item key="1">
				<view data-scindex="1">
					<view class="content2">
						<view class="article-list-box">
							<view class="article-list">;lalallalalal</view>
							<view class="article-list">;lalallalalal</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
var loginRes, _self, x, y;
import '../../graceUI/graceUI.css';
export default {
	data() {
		return {
			btn1Width: 70,
			btn2Width: 70,
			//2个按钮的总宽 = btn1Width + btn23Width【uni-app 模板内不建议复杂运算请手动配置】
			deleteBtnWidth: 140,
			//正在滑动的索引
			scrollIndex: -1,
			//正在删除的索引
			deleteIndex: -1,
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			titleShowId: 'tabTag-0',
			tabs: [
				//标签名称 , 分类 id , 加载更多, 加载的页码
				{ name: '公开文章', id: 'pwd1', loadingType: 0, page: 1 },
				{ name: '私密文章', id: 'pwd2', loadingType: 0, page: 1 }
			],
			articles: [],
			showKeyboard: false,
			userId: uni.getStorageSync('login_key').userId
		};
	},
	onLoad: function() {
		_self = this;
	},
	onShow: function() {
		this.getArticle();
	},
	methods: {
		getArticle:function(){
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/user',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: uni.getStorageSync('login_key').userId
				},
				success: res => {
					_this.articles = res.data.data;
					for (var i = 0; i < _this.articles.length; i++) {
						_this.articles[i].createTime = this.handleTime(_this.articles[i].createTime);
					}
				}
			});
		},
		removeArticle: function(aId) {
			uni.showModal({
				title: '提示',
				content: '是否删除',
				success: res => {
					if(res.confirm){
						uni.request({
							url: this.apiServer + '/article/delete/'+aId,
							method: 'GET',
							header: { 'content-type': 'application/json' },
							data: {
							},
							success: res => {
								if (res.data.code === 0) {
									uni.showToast({
										title: '删除成功'
									});
									this.getArticle();
									}
							}
						});
					}
				},
			});
		},
		touchStart: function(e) {
			x = e.mp.changedTouches[0].clientX;
			y = e.mp.changedTouches[0].clientY;
		},
		touchEnd: function(e) {
			x = x - e.mp.changedTouches[0].clientX;
			y = y - e.mp.changedTouches[0].clientY;
			if (Math.abs(x) < 50) {
				return;
			}
			if (Math.abs(x) < Math.abs(y)) {
				return;
			}
			var index = e.currentTarget.dataset.id;
			if (index == this.scrollIndex) {
				return;
			}
			_self.scrollIndex = index;
		},
		goBack: function() {
			uni.switchTab({
				url:'../my/my'
			})
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
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId + '&userId=' + uni.getStorageSync('login_key').userId
			});
		},
		done(password) {
			console.log(password);
			console.log(this.$refs);
		},
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
		}
	}
};
</script>

<style>
/* 选项卡 */
.tab {
	padding: 0;
}
/* 导航栏整体设置 */
/* 导航栏文字梳理 */
.tab-title view {
	height: 20px;
	width: 80px;
	margin: 0 50px;
	display: inline-block;
	align-items: center;
	text-align: center;
	font-size: 14px;
	padding-bottom: 13px;
}
.content1 {
	width: 100%;
	height: 80vh;
	overflow: auto;
}
/* .tab-title view:first-child{margin-left: 0;}
	.tab-title view:last-child{margin-right: 0;} */
/* 导航栏底部下划线设置 */
.tab-current {
	border-bottom: 2px solid #e58c7c !important;
	color: #e58c7c;
}
.myarticle-list-box {
	width: 85%;
	margin-left: 15px;
}
.tab-swiper-full {
	height: 80vh;
	background-color: #ececec;
}

.content {
	text-align: center;
	height: 400upx;
}

.title {
	width: 100%;
	padding-top: 12px;
	color: #aaaaaa;
}

.myarticle-center-box {
	background-color: #ececec;
	padding-left: 20px;
	padding-right: 20px;
	font-size: 12px;
	color: #8f8f94;
	display: flex;
	height: 35px;
	align-items: center;
	justify-content: space-between;
}
.article-list {
	overflow: hidden;
	-webkit-line-clamp: 1;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	color: #2e2e2e;
	width: 55%;
	font-size: 18px;
}
.article-list-box {
	width: 92%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	padding-top: 20px;
	padding-bottom: 20px;
	position: relative;
}
.article-list-box:after {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	height: 1px;
	background-color: #dfdfdf;
	transform: scaleY(0.5);
	content: '';
	display: block;
}
.myarticle-text {
	font-size: 15px;
	color: #b1b1b1;
}
.myarticle-list-small {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 25px;
}
.myarticle-list-text {
	color: #ADADAD;
}
</style>
