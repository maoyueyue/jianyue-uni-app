<template>
	<view class="uni-flex uni-column container">
		<view class="topper"></view>
		<view class="topper-box"></view>
		<view class="signin-title"><text>账号密码登陆</text></view>
		<view class="signin-content">
			<input class="sign-input" type="number" placeholder="请输入手机号" v-model="userDTO.mobile" required="required" />
			<input class="sign-input" password type="text" placeholder="请输入密码" v-model="userDTO.password" required="required" />
			<button class="signin-btn" @tap="signIn(userDTO)">登录</button>
			<view class="navsign">
				<navigator url="../signup/signup" class="nav">注册新账号</navigator>
				<text class="between-space">|</text>
				<navigator url="../forgetpsd/forgetpsd" class="nav">忘记密码？</navigator>
			</view>
			<view class="signin-bottom">
				<text class="signin-bottom-text">——— 社交账号直接登陆 ———</text>
				<view class="signin-bottom-image">
					<view class="image-box">
						<image class="signin-image1" src="../../static/weixin.png"></image>
						<text>微信</text>
					</view>
					<view class="image-box">
						<image class="signin-image" src="../../static/QQ.png"></image>
						<text>QQ</text>
					</view>
					<view class="image-box">
						<image class="signin-image1" src="../../static/weibo.png"></image>
						<text>微博</text>
					</view>
					<view class="image-box">
						<image class="signin-image" src="../../static/qita.png"></image>
						<text>其他</text>
					</view>
				</view>
				<view class="signin-bottom-text-box">
					<text>登陆代表您已经同意</text>
					<text class="signin-bottom-text-tap">用户协议</text>
					<text class="signin-bottom-text-he">和</text>
					<text class="signin-bottom-text-tap">隐私政策</text>
				</view>
			</view>
			<image src="../../static/cha.png" @tap="goBack" class="guanbi-btn"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userDTO: {
				mobile: '',
				password: ''
			}
		};
	},
	onLoad() {},
	methods: {
		goBack:function(){
			uni.switchTab({
				url:'../my/my'
			})
		},
		signIn: function(userDTO) {
			var _this = this;
			// console.log(userDTO.mobile + ',' + userDTO.password);
			uni.request({
				url: this.apiServer + '/user/sign_in',
				method: 'POST',
				data: {
					mobile: userDTO.mobile,
					password: userDTO.password
				},
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					// console.log(res.data.data);
					if (res.data.code == 0) {
						//将用户数据记录在本地存储
						uni.setStorageSync('login_key', {
							userId: res.data.data.id,
							nickname: res.data.data.nickname,
							avatar: res.data.data.avatar,
							token: res.data.data.token,
							mobile: res.data.data.mobile,
							score:res.data.data.score,
							login: true
						});
						uni.showToast({
							title: '登录成功'
						});
						uni.switchTab({
							url: '../my/my'
						});
					}
					//登录失败，弹出各种原因
					else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.guanbi-btn {
	position: fixed;
	top: 43px;
	right: 18px;
	width: 15px;
	height: 15px;
	cursor: pointer;
}
.guanbi-btn:after {
	border: none;
}
input {
	height: 50px;
	margin-bottom: 5px;
	font-size: 15px;
}
.nav {
	color: #49699c;
	font-size: 14px;
	margin-left: 10px;
	margin-right: 10px;
}
.navsign {
	display: flex;
	align-items: center;
	margin-top: 23px;
	justify-content: center;
}
.between-space {
	color: #dfdfdf;
	font-size: 16px;
}
.signin-content {
	width: 82%;
	margin: 0 auto;
	margin-top: 20px;
}
.signin-title {
	font-size: 24px;
	display: flex;
	justify-content: center;
	margin-top: 25px;
	color: #4c4c4c;
}
.signin-btn {
	border-radius: 50px;
	background-color: #e96f5a;
	color: #ffffff;
	margin-top: 20px;
}
.signin-btn:after {
	border: none;
}
.signin-bottom {
	width: 90%;
	margin: 0 auto;
	margin-top: 266px;
	display: flex;
	text-align: center;
	flex-direction: column;
}
.signin-bottom-text {
	font-size: 12px;
	color: #b1b1b1;
}
.image-box {
	display: flex;
	align-items: center;
}
.signin-bottom-image {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
	margin-top: 27px;
}
.signin-image {
	width: 22px;
	height: 22px;
	margin-right: 5px;
}
.signin-image1 {
	width: 28px;
	height: 22px;
	margin-right: 5px;
}
.signin-bottom-text-tap {
	color: #029687;
	border-bottom: #029687 solid 1px;
}
.signin-bottom-text-he {
	margin-left: 3px;
	margin-right: 3px;
}
.signin-bottom-text-box {
	font-size: 11px;
	color: #b1b1b1;
	margin-top: 45px;
}
</style>
