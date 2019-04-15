<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box"></view>
		<view class="signin-title"><text>重置密码</text></view>
		<view class="signup-content">
			<input password type="text" placeholder="新密码" v-model="password" required="required" />
			<input password type="text" placeholder="确认密码" v-model="password2" />
			<button class="signup-btn" @tap="changepassword">找回密码</button>
		</view>
		<image src="../../static/cha.png" @tap="goBack" class="guanbi-btn"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobile: '',
			password: '',
			password2: ''
		};
	},
	onLoad() {
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.mobile);
		this.mobile = option.mobile;
	},
	methods: {
		goBack:function(){
			uni.navigateTo({
				url:'../signin/signin'
			})
		},
		changepassword: function() {
			var _this = this;
			if (_this.password === _this.password2) {
				uni.request({
					url: this.apiServer + '/user/changepsd',
					method: 'POST',
					header: { 'content-type': 'application/x-www-form-urlencoded' },
					data: {
						mobile: _this.mobile,
						password: _this.password
					},
					success: res => {
						uni.showModal({
							title: '提示',
							content: '修改成功'
						});
						uni.navigateTo({
							url: '../signin/signin'
						});
					}
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '密码不同'
				});
			}
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
	margin-top: 60px;
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
	margin-top: 40px;
}
</style>
