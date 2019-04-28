<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item"><text class="topper-text">任务中心</text></view>
			</view>
		</view>
		<view v-if="qiandao2" class="cheng-box">
			<view class="chenggong">
				<view class="cheng-bottom">
					<view class="left_triangle"></view>
					<view class="right_triangle"></view>
					<text>恭喜签到成功</text>
					<text>简阅钻+5</text>
				</view>
				<view class="cheng-header">
					<text>签到成功</text>
					<view class="cha-btn"><text @tap="close">×</text></view>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view> 
		<view class="renwu-header">
			<view v-if="login" class="renwu-header-box">
				<image :src="avatar"></image>
				<view class="renwu-header-small">
					<text class="header-title1">每天签到可得简阅钻</text>
					<text class="header-title2">做下方任务可得更多钻哦</text>
				</view>
			</view>
			<view v-if="!login" class="renwu-header-box">
				<view class="renwu-header-small1">
					<text class="header-title1">登陆后可做任务，获得简阅钻哦</text>
					<text @tap="goSignin" class="header-title1">点击登陆</text>
				</view>
			</view>
		</view>
		<view class="renwu-bottom">
			<view class="jiandao-box">
				<view class="qiandao-box">
					<image src="../../static/yanhua1.png"></image>
					<view @tap="goqiandao" v-if="qiandao" class="qiandao-btn"><text>签到</text></view>
					<view v-if="!qiandao" class="qiandao-btn"><text>已签到</text></view>
					<image src="../../static/yanhua2.png"></image>
				</view>
			</view>
			<view class="renwu-box">
				<text class="renwu-title">做任务得钻石</text>
				<view class="small-box">
					<view class="renwutext">
						<text class="renwu-title1">公开发文赚钻</text>
						<text class="renwu-title2">公开发布文章奖励简阅钻</text>
						<text class="renwu-title3">简阅钻10个 (会员翻倍)</text>
					</view>
					<view @tap="goIndex" class="renwu-btn">去发文</view>
				</view>
				<view class="small-box">
					<view class="renwutext">
						<text class="renwu-title1">为文章点赞赚钻</text>
						<text class="renwu-title2">每天给文章点赞，奖励简阅钻</text>
						<text class="renwu-title3">简阅钻5个 (会员翻倍)</text>
					</view>
					<view @tap="goIndex" class="renwu-btn">去点赞</view>
				</view>
				<view class="small-box">
					<view class="renwutext">
						<text class="renwu-title1">为文章评论赚钻</text>
						<text class="renwu-title2">每天评论文章，奖励简阅钻</text>
						<text class="renwu-title3">简阅钻5个 (会员翻倍)</text>
					</view>
					<view @tap="goIndex" class="renwu-btn">去评论</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatar: uni.getStorageSync('login_key').avatar,
			qiandao: true,
			qiandao2: false,
			login:false,
			userId:uni.getStorageSync('login_key').userId
		};
	},
	onLoad: function() {},
	onShow: function() {
		this.login= uni.getStorageSync('login_key').login;
	},
	methods: {
		goqiandao: function() {
			var _this=this;
			if (uni.getStorageSync('login_key').login === true) {
				var newScore=uni.getStorageSync('login_key').score+5;
				uni.request({
					url: this.apiServer +'/user/score',
					method: 'post',
					header: { 'content-type': 'application/x-www-form-urlencoded' },
					data: {
						userId: _this.userId,
						score: newScore
					},
					success: resd => {
						console.log(resd.data);
						this.qiandao = false;
						this.qiandao2 = true;
						uni.request({
							url: this.apiServer +'/user/' + uni.getStorageSync('login_key').userId,
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
										score:res.data.data.score,
										mobile: res.data.data.mobile,
										login: true
									});
								}
							}
						});
					}
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
		goIndex: function() {
			if (uni.getStorageSync('login_key').login === true) {
				uni.switchTab({
					url: '../index/index'
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
		goSignin:function (){
			uni.navigateTo({
				url:'../signin/signin'
			})
		},
		close: function() {
			this.qiandao2 = false;
		}
	}
};
</script>

<style>
.container {
	background-color: #f8f8f8;
}
.renwu-header {
	background-color: #dc3522;
	height: 90px;
	padding-top: 15px;
}
.cheng-box {
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	transition: opacity 0.2s linear;
}
.chenggong {
	position: relative;
	width: 500upx;
	height: 160px;
	border-radius: 10upx;
}
.cheng-header {
	position: relative;
	background-color: #dc3522;
	height: 50px;
	width: 500upx;
	margin-top: -170px;
	border-radius: 3px;
	box-shadow: #f46c4d 0 0 10upx 0;
	font-size: 25px;
	color: #f7f8f9;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
}
.cha-btn {
	position: absolute;
	right: 18px;
	top: 0px;
}
.cheng-bottom {
	position: relative;
	background-color: #fcfcfc;
	margin: 0 auto;
	width: 450upx;
	height: 130px;
	border-radius: 10px;
	box-shadow: #eeeeee 0 0 20upx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-size: 18px;
	color: #dc3522;
	line-height: 35px;
	padding-top: 30px;
}
.jiandao-box {
	width: 93%;
	height: 133px;
	margin: 0 auto;
	margin-top: -12px;
	border-radius: 5px;
	background-color: #ffffff;
	box-shadow: #eeeeee 0 0 10upx 0;
	display: flex;
	align-items: center;
}
.qiandao-box {
	width: 70%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.qiandao-btn {
	width: 80px;
	height: 80px;
	background-color: #e84827;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
}
.qiandao-box image {
	height: 30px;
	width: 30px;
	margin-top: 30px;
}
.renwu-box {
	width: 85.5%;
	margin: 0 auto;
	margin-top: 10px;
	border-radius: 5px;
	background-color: #ffffff;
	box-shadow: #eeeeee 0 0 10upx 0;
	padding-left: 13px;
	padding-right: 13px;
	padding-top: 20px;
}
.small-box {
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	justify-content: space-between;
}
.renwutext {
	display: flex;
	flex-direction: column;
}
.renwu-btn {
	width: 68px;
	height: 29px;
	border: 1px solid #e96f5a;
	color: #e96f5a;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 15px;
	font-size: 14px;
}
.renwu-title {
	color: #2e2e2e;
	font-size: 20px;
	font-weight: normal;
}
.renwu-title1 {
	color: #303030;
	font-size: 16px;
	font-weight: 400;
}
.renwu-title2 {
	color: #9a9a9a;
	font-size: 12px;
	margin-top: 8px;
}
.renwu-title3 {
	color: #ea715e;
	font-size: 13px;
	margin-top: 8px;
}
.renwu-header-box {
	margin-top: 25px;
	width: 90%;
	margin: 0 auto;
	display: flex;
	align-items: center;
}
.renwu-header-box image {
	height: 40px;
	width: 40px;
	border-radius: 50%;
	margin-right: 15px;
}
.renwu-header-small {
	height: 50px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: #ffffff;
}
.renwu-header-small1 {
	height: 50px;
	display: flex;
	margin: 0 auto;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	color: #ffffff;
}
.header-title2 {
	font-size: 12px;
}
.left_triangle {
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	left: -26px;
	top: 0px;
	border-top: 24px solid #dc3522;
	border-bottom: 24px solid #dc3522;
	border-left: 13px solid transparent;
	border-right: 13px solid #dc3522;
}
.right_triangle {
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	right: -26px;
	top: 0px;
	border-top: 24px solid #dc3522;
	border-bottom: 24px solid #dc3522;
	border-right: 13px solid transparent;
	border-left: 13px solid #dc3522;
}
</style>
