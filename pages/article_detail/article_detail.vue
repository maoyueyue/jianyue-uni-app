<template>
	<view class="container" id="comment_container">
		<view class="topper-max">
			<view class="topper"></view>
			<view class="topper-box">
				<view class="topper-box-list">
					<image @tap="goBack" src="../../static/back.png"></image>
					<image src="../../static/more.png"></image>
				</view>
			</view>
			<view class="list-border-space"></view>
		</view>
		<view class="topper-space"></view>
		<view class="detail-box">
			<text class="article-title">{{ article.title }}</text>
			<view class="article-info-box">
				<view class="article-info">
					<image :src="article.avatar" class="small-avatar"></image>
					<text class="article-nickname">{{ article.nickname }}</text>
				</view>
				<view class="article-info-follow">
					<button v-if="userId != article.uId && !followed" class="followed-btn" @tap="follow">关注</button>
					<button v-if="userId != article.uId && followed" class=" follow-btn cancel" @tap="cancelFollow">已关注</button>
				</view>
			</view>
			<view class="article-info-createTime">
				<text class="info-text">20.253&nbsp;·&nbsp;字数&nbsp;{{ article.content.length }}&nbsp;·&nbsp;阅读&nbsp;50</text>
				<text class="info-text">{{ article.createTime }}</text>
			</view>
			<view class="grace-text article-content"><rich-text :nodes="article.content" bindtap="tap"></rich-text></view>
		</view>
		<view class=" article-flow"></view>
		<view class="detail-center">
			<view class="detail-center-box">
				<text class="info-text">评论({{ comments.length }})</text>
				<text class="info-text">按时间倒序</text>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view class="detail-second-box">
			<view class="comment-item" v-for="(comment, index) in comments" :key="index">
				<view class="left"><image :src="comment.avatar" class="small-avatar"></image></view>
				<view class="right">
					<view class="right-nickename">
						<text>{{ comment.nickname }}</text>
					</view>
					<view class=" right-content-box">
						<text>{{ comment.content }}</text>
					</view>
					<view class="right-lou">
						<text>{{ comments.length - index }}楼</text>
						<text class="right-commenttime">{{ comment.commentTime }}</text>
					</view>
				</view>
			</view>
			<view id="insertcomment" class="insertcomment">
				<input class="comment-box" type="text" placeholder="写下你的评论" v-model="content" required="required" />
				<button @tap="send">提交</button>
			</view>
		</view>
		<view class="comment-bottom">
			<view class="list-border-space"></view>
			<view class="comment-bottom-box">
				<view class="comment-bottom-small">
					<image class="comment-bottom-avatar pinglun" @tap="tocomment" src="../../static/pinglun.png"></image>
					<text>评论 {{ comments.length }}</text>
				</view>
				<view class="comment-bottom-small">
					<image class="comment-bottom-avatar" src="../../static/zanshang.png"></image>
					<text>赞赏</text>
				</view>
				<view class="comment-bottom-small">
					<view class="">
						<image v-if="!liked" @tap="likeArticke" class="comment-bottom-avatar" src="../../static/xihuan.png"></image>
						<image v-if="liked" @tap="cancelLike" class="comment-bottom-avatar" src="../../static/xihuan2.png"></image>
					</view>
					<text>喜欢</text>
				</view>
				<view class="comment-bottom-small">
					<image class="comment-bottom-avatar" src="../../static/fenxiang.png"></image>
					<text>分享</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import uniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
export default {
	components: { uniGrid },
	data() {
		return {
			article: {
				aId: 0,
				uId: 0,
				title: '',
				content: '',
				avatar: '',
				nickname: '',
				createTime: ''
			},
			comments: [],
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			followed: false,
			liked: false
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.article.aId = option.aId;
	},
	onShow: function() {
		this.getArticle();
	},
	onPullDownRefresh: function() {
		this.getArticle();
	},
	methods: {
		goBack: function() {
			uni.navigateBack({});
		},
		tocomment: function() {
			uni.createSelectorQuery()
				.select('#comment_container')
				.boundingClientRect(function(rect) {
					// 使页面滚动到底部
					uni.pageScrollTo({
						scrollTop: rect.bottom
					});
				})
				.exec();
		},
		getArticle: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/' + this.article.aId,
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.userId
				},
				success: res => {
					// console.log(res.data.data.article);
					_this.article.aId = res.data.data.article.id;
					_this.article.uId = res.data.data.article.uid;
					_this.article.title = res.data.data.article.title;
					_this.article.content = res.data.data.article.content;
					_this.article.nickname = res.data.data.article.nickname;
					_this.article.avatar = res.data.data.article.avatar;
					_this.article.createTime = res.data.data.article.createTime;
					_this.comments = res.data.data.comments;
					_this.article.createTime = this.handleTime(_this.article.createTime);
					for (var i = 0; i < _this.comments.length; i++) {
						_this.comments[i].commentTime = this.handleTime(_this.comments[i].commentTime);
					}
					if (res.data.data.followed === '已关注') {
						_this.followed = true;
					}
					if (res.data.data.liked === '喜欢') {
						_this.liked = true;
					}
				},
				complete: function() {
					uni.stopPullDownRefresh();
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
		send: function() {
			var _this = this;
			console.log('评论人编号：' + this.userId + ',文章编号：' + this.article.aId + '，评论内容：' + this.content);
			uni.request({
				url: _this.apiServer + '/comment/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					aId: this.article.aId,
					uId: this.userId,
					content: this.content
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '简阅钻+5'
						});
						this.getArticle();
						this.content = '';
					}
				},
				complete: function() {
					var newScore = uni.getStorageSync('login_key').score + 5;
					uni.request({
						url: _this.apiServer + '/user/score',
						method: 'post',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: {
							userId: _this.userId,
							score: newScore
						},
						success: resde => {
							console.log(resde.data);
							uni.request({
								url: _this.apiServer + '/user/' + uni.getStorageSync('login_key').userId,
								method: 'GET',
								data: {
									userId: _this.userId
								},
								header: {
									'content-type': 'application/json'
								},
								success: sign => {
									if (sign.data.code == 0) {
										//将用户数据记录在本地存储
										uni.setStorageSync('login_key', {
											userId: sign.data.data.id,
											nickname: sign.data.data.nickname,
											avatar: sign.data.data.avatar,
											token: sign.data.data.token,
											score: sign.data.data.score,
											mobile: sign.data.data.mobile,
											login: true
										});
									}
								}
							});
						}
					});
				}
			});
		},
		likeArticke: function() {
			var _this = this;
			uni.request({
				url: _this.apiServer + '/like/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					aId: this.article.aId,
					uId: this.userId
				},
				success: res => {
					uni.showToast({
						title: '简阅钻+5'
					});
					this.liked = true;
				},
				complete: function() {
					var newScore = uni.getStorageSync('login_key').score + 5;
					uni.request({
						url: _this.apiServer +'/user/score',
						method: 'post',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: {
							userId: _this.userId,
							score: newScore
						},
						success: resd => {
							console.log(resd.data);
							uni.request({
								url: _this.apiServer +'/user/' + uni.getStorageSync('login_key').userId,
								method: 'GET',
								data: {
									userId: _this.userId
								},
								header: {
									'content-type': 'application/json'
								},
								success: res => {
									if (res.data.code == 0) {
										//将用户数据记录在本地存储
										uni.setStorageSync('login_key', {
											userId: res.data.data.id,
											nickname: res.data.data.nickname,
											avatar: res.data.data.avatar,
											token: res.data.data.token,
											score: res.data.data.score,
											mobile: res.data.data.mobile,
											login: true
										});
									}
								}
							});
						}
					});
				}
			});
		},
		cancelLike: function() {
			uni.request({
				url: this.apiServer + '/like/cancel',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					aId: this.article.aId,
					uId: this.userId
				},
				success: res => {
					this.liked = false;
				}
			});
		},
		follow: function() {
			uni.request({
				url: this.apiServer + '/follow/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toUId: this.article.uId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '关注成功'
						});
						this.followed = true;
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
					fromUId: this.userId,
					toUId: this.article.uId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '已取消关注'
						});
						this.followed = false;
					}
				}
			});
		}
	}
};
</script>

<style>
.container {
	width: 100%;
	padding-bottom: 60px;
}
.small-avatar {
	width: 35px;
	height: 35px;
	border-radius: 50%;
}
.detail-box {
	width: 92%;
	margin: 0 auto;
	padding-top: 25px;
}
.article-title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	font-size: 25px;
	font-weight: 800;
	color: #2e2e2e;
}
.comment-bottom-avatar {
	width: 20px;
	height: 20px;
	margin-bottom: 3px;
	margin-left: 1px;
}
.article-info-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 11px;
}
.comment-bottom-box {
	display: flex;
	justify-content: space-between;
	padding-left: 55px;
	padding-right: 55px;
	padding-top: 7px;
}
button:after {
	border: none;
}
.article-info-createTime {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 13px;
	margin-top: 13px;
}
.article-info-follow {
	display: flex;
	align-items: center;
}
.comment-box {
	border: 1px solid #fff;
	border-radius: 5px;
	background-color: #eee;
	height: 40px;
}
.followed-btn {
	display: flex;
	height: 35px;
	width: 90px;
	font-size: 15px;
	color: #ffffff;
	background-color: #00b26a;
	border-radius: 5px;
	justify-content: center;
	align-items: center;
}
.pinglun {
	margin-left: 4px;
}
.follow-btn {
	display: flex;
	height: 35px;
	width: 90px;
	font-size: 15px;
	border-radius: 5px;
	justify-content: center;
	align-items: center;
	color: #8f8f94;
}
.article-info {
	display: flex;
	align-items: center;
	color: #4c4c4c;
	font-size: 15px;
}
.info-text {
	color: #8f8f94;
}
.article-nickname {
	margin-left: 10px;
}
.article-content {
	color: #4c4c4c;
	font-size: 17px;
	line-height: 28px;
	padding-top: 18px;
}
.detail-center {
	background-color: #f8f8f8;
	display: flex;
	align-items: center;
	height: 45px;
}
.right-commenttime {
	margin-left: 60px;
}
.comment-bottom-small {
	display: flex;
	flex-direction: column;
	text-align: center;
	font-size: 11px;
	color: #8f8f94;
}
.detail-center-box {
	width: 92%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	font-size: 15px;
	color: #8f8f94;
}
.detail-second-box {
	width: 92%;
	margin: 0 auto;
}
.comment-item {
	display: flex;
	padding-top: 15px;
	border-bottom: thin solid #eeeeee;
	padding-bottom: 15px;
}
.right {
	margin-left: 10px;
}
.right-nickename {
	color: #2e2e2e;
	font-size: 18px;
}
.right-content-box {
	font-size: 15px;
	color: #5e5e5e;
}
.right-lou {
	margin-top: 12px;
	font-size: 12px;
	color: #8f8f94;
}
.article-flow {
	height: 11px;
	background-color: #f0f0f0;
}
.comment-bottom {
	position: fixed;
	bottom: 0px;
	height: 50px;
	width: 100%;
	background-color: #f7f8f9;
}
.uni-grid {
	width: 90%;
	height: 50px;
	margin: 0 auto;
}
.uni-grid image {
	width: 18px;
	height: 18px;
}
.uni-grid text {
	font-size: 10px;
	color: #8a8a8a;
}
</style>
