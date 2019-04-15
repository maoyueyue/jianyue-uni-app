<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box"></view>
		<view class="signin-title"><text>设置密码</text></view>
		<view class="signup-content">
			<input password type="text" placeholder="请输入密码" v-model="password" required="required" />
			<button class="signup-btn" @tap="signUp(userDTO)">注册</button>
		</view>
		<image src="../../static/cha.png" @tap="goBack" class="guanbi-btn"></image>
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
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.mobile);
		this.mobile = option.mobile;
	},
	methods: {
		signUp: function(userDTO) {
			var _this = this;
			uni.request({
				url: this.apiServer + '/user/sign_up',
				method: 'POST',
				header: { 'content-type': 'application/json' },
				data: {
					mobile: _this.mobile,
					password: _this.password
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showModal({
							title: '提示',
							content: '注册成功',
							confirmText:'立即登录',
							cancelText:'稍后登录',
							success: (login) => {
								if(login.confirm){
									uni.navigateTo({
										url:'../signin/signin'
									})
								}else if(login.cancel){
									uni.switchTab({
										url:'../my/my'
									})
								}
							}
						});
					} else {
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
input {
	height: 50px;
	margin-bottom: 5px;
	font-size: 15px;
}
.signup-content {
	width: 82%;
	margin: 0 auto;
	margin-top: 70px;
}
.signin-title {
	font-size: 24px;
	display: flex;
	justify-content: center;
	margin-top: 25px;
	color: #4c4c4c;
}
.signup-btn {
	border-radius: 50px;
	background-color: #e96f5a;
	color: #ffffff;
	margin-top: 45px;
}
</style>
