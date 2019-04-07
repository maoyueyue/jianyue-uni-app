<template>
	<view class="container">
		<input
			class="uni-input"
			password
			type="text"
			placeholder="新密码"
			v-model="password"
			required="required"
		/>
		<input class="uni-input" password type="text" placeholder="确认密码" v-model="password2" />
		<button class="green-btn" @tap="changepassword">找回密码</button>
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
		uni.setNavigationBarTitle({
			title: '设置密码'
		});
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.mobile);
		this.mobile = option.mobile;
	},
	methods: {
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
	border-bottom: 1px solid #eee;
	margin-bottom: 5px;
}
</style>
