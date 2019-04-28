<template>
	<view class="container">
		<view class="top">
			<view class="topper1"></view>
			<view class="topper-box1">
				<view class="topper-box-list">
					<image @tap="goBack" src="../../static/back1.png"></image>
					<view class="top-image">
						<image src="../../static/search1.png"></image>
					<image src="../../static/more1.png"></image>
					</view>
				</view>
			</view>
			<view class="list-border-space"></view>
		</view>
		<view class="header">
			<image src="../../static/background.jpg"></image>
		</view>
		<view class="box">
			<view class="box-hd">
				<view class="avator"><img :src="user.avatar" /></view>
				<view class="button-box">
					<view class="bianji-btn" v-if="userId==user.id" @tap="goInfo">
						编辑资料
					</view>
					<view class="jianxin-btn" v-if="userId!=user.id">简信</view>
					<view class="guanzhu-btn" @tap="cancelFollow" v-if="!showGuanzhu&&userId!=user.id">已关注</view>
					<view class="guanzhu-btn2" @tap="follow" v-if="showGuanzhu&&userId!=user.id">关注</view>
					<view class="liwu-btn"><image src="../../static/liwu.png"></image></view>
				</view>
			</view>
			<view class="text-box">
				<text class="username-text">{{ user.nickname }}</text>
				<text class="number-text">{{textNum}} 字 | 67 赞</text>
				<text class="jianjie-text">暂无简介 ></text>
				<view class="guanzhu-box">
					<text @tap="goCfollow">{{follows.length}} 关注</text>
					<text @tap="goCfollowed">{{followeds.length}} 粉丝</text>
					<text>{{ user.score }} 简阅钻</text>
				</view>
			</view>
		</view>
		<view style="overflow: hidden;">
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
					<view data-scindex="0"><view class="content1"></view></view>
				</swiper-item>
				<swiper-item key="1">
					<view data-scindex="1">
						<view class="content2">
							<view class="article-list-box" v-for="(article, index) in articles" :key="index">
									<text class=" article-list" @tap="gotoDetail(article.id)">{{ article.title }}</text>
									<text class="article-list-content" @tap="gotoDetail(article.id)">{{article.content}}</text>
									<view class="myarticle-list-small">
										<text class=" grace-text-small myarticle-list-text">阅读量 50</text>
										<view class=" grace-text-small myarticle-list-text">{{ article.createTime }}</view>
									</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item key="2">
					<view data-scindex="2"><view class="content3">
						<view class="comment-bottom-box">
							<view class="comment-bottom-small">
								<image class="comment-bottom-avatar pinglun" src="../../static/ucenter/wenji.png"></image>
								<text>文集 0 </text>
							</view>
							<view class="comment-bottom-small">
								<image class="comment-bottom-avatar" src="../../static/ucenter/zhuanti.png"></image>
								<text>专题 0</text>
							</view>
							<view @tap="goCfollow" class="comment-bottom-small">
									<image  class="comment-bottom-avatar" src="../../static/ucenter/guanzhu.png"></image>
								<text>关注 {{follows.length}}</text>
							</view>
							<view @tap="goCfollowed" class="comment-bottom-small"> 
								<image class="comment-bottom-avatar" src="../../static/ucenter/fensi.png"></image>
								<text>粉丝 {{followeds.length}}</text>
							</view>
						</view>
						<view class="list-border-space"></view>
						<view class="list">
							<view @tap="goClike" class="list-item">
								<image class="comment-bottom-avatar" src="../../static/ucenter/zan.png"></image>
								<text class="center-text">赞过的文章</text>
								<text class="center-text like-num">{{likes.length}}</text>
							</view>
							<view class="list-item">
								<image class="comment-bottom-avatar" src="../../static/ucenter/gou.png"></image>
								<text class="center-text">关注的专题/文集/连载</text>
							</view>
						</view>
					</view></view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			tabCurrentIndex: 1,
			swiperCurrentIndex: 1,
			titleShowId: 'tabTag-0',
			tabs: [
				//标签名称 , 分类 id , 加载更多, 加载的页码
				{ name: '动态', id: 'pwd1', loadingType: 0, page: 1 },
				{ name: '文章', id: 'pwd2', loadingType: 0, page: 1 },
				{ name: '更多', id: 'pwd3', loadingType: 0, page: 1 }
			],
			showKeyboard: false,
			user: {
				id: 0,
				nickname: '',
				score: 0,
				avatar: ''
			},
			articles: [],
			textNum:0,
			follows: [],
			followeds: [],
			showGuanzhu:false,
			userId:uni.getStorageSync('login_key').userId,
			likes:[]
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.user.id = option.uId;
	},
	onShow: function() {
		this.getUser();
		this.getArticle();
		uni.request({
			url: this.apiServer + '/follow/list',
			method: 'GET',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			data: {
				fromUId: this.user.id
			},
			success: res => {
				this.follows = res.data.data;
			}
		});
		uni.request({
			url: this.apiServer + '/follow/listed',
			method: 'GET',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			data: {
				toUId: this.user.id
			},
			success: res => {
				this.followeds = res.data.data;
			}
		});
		uni.request({
			url: this.apiServer + '/like/list',
			method: 'GET',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			data: {
				uId: this.user.id
			},
			success: res => {
				console.log(res.data.data)
				this.likes = res.data.data;
			}
		});
	},
	methods: {
		follow: function() {
			uni.request({
				url: this.apiServer + '/follow/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: uni.getStorageSync('login_key').userId,
					toUId: this.user.id
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '关注成功'
						});
						this.showGuanzhu=false;
					}
				}
			});
		},
		cancelFollow: function() {
			uni.request({
				url: this.apiServer + '/follow/cancel',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId:  uni.getStorageSync('login_key').userId,
					toUId: this.user.id
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '已取消关注'
						});
						this.showGuanzhu=true;
					}
				}
			});
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
		getArticle: function() {
			var _this = this;
			_this.textNum=0;
			uni.request({
				url: this.apiServer + '/article/user',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: _this.user.id
				},
				success: res => {
					_this.articles = res.data.data;
					for (var i = 0; i < _this.articles.length; i++) {
						_this.articles[i].createTime = this.handleTime(_this.articles[i].createTime);
						_this.textNum=_this.textNum+_this.articles[i].content.length;
						_this.articles[i].content = this.handleContent(_this.articles[i].content);
					}
					console.log(_this.textNum)
				}
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
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId + '&userId=' + uni.getStorageSync('login_key').userId
			});
		},
		goCfollow:function(){
			uni.navigateTo({
				url:'../usercenter/cfollow?id='+this.user.id
			});
		},
		goInfo:function(){
			uni.navigateTo({
				url:'../info/info'
			});
		},
		goCfollowed:function(){
			uni.navigateTo({
				url:'../usercenter/cfollowed?id='+this.user.id
			});
		},
		goClike:function(){
			uni.navigateTo({
				url:'../usercenter/like?id='+this.user.id
			});
		},
		getUser: function() {
			var _this = this;
			var score2 = 0;
			uni.request({
				url: this.apiServer + '/user/' + _this.user.id,
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {},
				success: res => {
					console.log(res.data.data.score);
					_this.user.nickname = res.data.data.nickname;
					_this.user.avatar = res.data.data.avatar;
					_this.user.score = res.data.data.score;
					console.log(score2);
				}
			});
		},
		handleContent: function(description) {
			description = description.replace(/(\n)/g, '');
			description = description.replace(/(\t)/g, '');
			description = description.replace(/(\r)/g, '');
			description = description.replace(/<\/?[^>]*>/g, '');
			description = description.replace(/\s*/g, '');
			return description;
		},
		goBack: function() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f1f1f1;
}
.header {
	background: #fff;
	height: 300upx;
}
.header image {
	width: 100%;
	height: 100%;
}
.top {
	position: fixed;
	top: 0px;
	width: 100%;
}
.top-image {
	width: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between; 
}
.box {
	height: 365upx;
	background: #fff;
	margin-bottom: 10px;
	.box-hd {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		margin-left: 15px;
		.avator {
			width: 170upx;
			height: 170upx;
			background: #fff;
			border: 7upx solid #fff;
			border-radius: 50%;
			margin-top: -85upx;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.button-box {
	width: 185px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-left: 60px;
	margin-top: 15px;
}
.jianxin-btn {
	height: 30px;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 4upx solid #4abc3a;
	color: #4abc3a;
	width: 60px;
	border-radius: 25px;
	background-color: #fff;
	margin-right: 8px;
}
.bianji-btn {
	height: 30px;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 4upx solid #4abc3a;
	color: #4abc3a;
	width: 85px;
	border-radius: 25px;
	background-color: #fff;
	margin-right: 8px;
}
.guanzhu-btn {
	margin-right: 8px;
	width: 72px;
	height: 28px;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 4upx solid #dddddd;
	color: #999999;
	border-radius: 25px;
	background-color: #fff;
}
.guanzhu-btn2 {
	margin-right: 8px;
	width: 60px;
	height: 28px;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 4upx solid #4abc3a;
	color: #FFFFFF;
	border-radius: 25px;
	background-color: #4abc3a;
}
.liwu-btn {
	height: 30px;
	width: 30px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 4upx solid #e86e59;
	background-color: #fff;
}
.liwu-btn image {
	height: 19px;
	width: 19px;
}
.text-box {
	display: flex;
	flex-direction: column;
	padding-left: 20px;
	padding-top: 8px;
}
.username-text {
	font-size: 23px;
	color: #2e2e2e;
}
.number-text {
	font-size: 12px;
	color: #888888;
	margin-top: 4px;
}
.jianjie-text {
	font-size: 14px;
	color: #5a5a5a;
	margin-top: 4px;
}
.guanzhu-box {
	display: flex;
	justify-content: space-between;
	width: 180px;
	font-size: 15px;
	color: #2f2f2f;
	margin-top: 12px;
}
.tab {
	padding: 0;
}
/* 导航栏整体设置 */
.title {
	text-align: center;
	background-color: #fff;
}
/* 导航栏文字梳理 */
.tab-title view {
	width: 65px;
	margin: 0 auto;
	display: inline-block;
	align-items: center;
	text-align: center;
	font-size: 14px;
	padding-bottom: 13px;
}
/* .tab-title view:first-child{margin-left: 0;}
	.tab-title view:last-child{margin-right: 0;} */
/* 导航栏底部下划线设置 */
.tab-current {
	border-bottom: 2px solid #e58c7c !important;
	color: #e58c7c;
}
.tab-swiper-full {
	height: 50.5vh;
	background-color: #FFFFFF;
}
.content1 {
	height: 50.5vh;
	width: 100%;
	overflow: auto;
}
.content2 {
	height: 50.5vh;
	width: 100%;
	overflow: auto;
}
.title {
	width: 100%;
	padding-top: 12px;
	color: #aaaaaa;
}
.article-list {
	overflow: hidden;
	-webkit-line-clamp: 1;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	color: #2e2e2e;
	width: 80%;
	font-size: 18px;
}
.article-list-content {
	margin-top: 5px;
	height: 38px;
	overflow: hidden;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	font-size: 14px;
	line-height: 18px;
	color: #5e5e5e;
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
.myarticle-list-small {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 25px; 
}
.myarticle-list-text {
	color: #adadad;
	font-size: 11px;
}
.comment-bottom-avatar {
	width: 20px;
	height: 20px;
}
.comment-bottom-box {
	display: flex;
	justify-content: space-between;
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 23px;
	padding-bottom: 20px;
}
.comment-box {
	border: 1px solid #fff;
	border-radius: 5px;
	background-color: #eee;
	height: 40px;
}
.comment-bottom-small {
	height: 50px; 
	display: flex;
	flex-direction: column;
	justify-content:space-between;
	align-items: center;
	font-size: 14px;
}
.center-text {
	color: #5E5E5E;
	margin-left: 15px;
	font-size: 14px;
}
.like-num {
	margin-left: 210px;
}
</style>
