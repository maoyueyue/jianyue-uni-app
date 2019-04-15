<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item">
					<image @tap="goBack" class="topper-sc-image" src="../../static/back.png"></image>
					<text class="topper-text">设置</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view class="list-space"><text>通用设置</text></view>
		<view class="list-border-space"></view>
		<uni-list>
			<uni-list-item title="编辑个人资料" show-arrow="false" @click="infoin"></uni-list-item>
			<uni-list-item title="添加写文章到桌面" show-arrow="false"></uni-list-item>
			<uni-list-item title="赞赏设置" show-arrow="false"></uni-list-item>
			<uni-list-item title="字号设置" show-arrow="false"></uni-list-item>
			<uni-list-item title="隐私设置" show-arrow="false"></uni-list-item>
			<uni-list-item title="黑名单设置" show-arrow="false"></uni-list-item>
		</uni-list>
		<view class="list-border-space"></view>
		<view class="list-space"><text>其他</text></view>
		<view class="list-border-space"></view>
		<uni-list >
			<uni-list-item title="回收站" show-arrow="false"></uni-list-item>
			<uni-list-item title="版本更新" show-arrow="false"></uni-list-item>
			<uni-list-item title="分享简书" show-arrow="false" ></uni-list-item>
			<uni-list-item title="关于我们" show-arrow="false"></uni-list-item>
		</uni-list>
		<view class="list-border-space"></view>
			<view v-if="login"  class=" logitem"><button  class="outbtn"  @tap="logout">退出当前账号</button></view>
	</view>
</template>

<script>
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
export default {
	components: { uniList, uniListItem },
	data() {
		return {
			login:uni.getStorageSync('login_key').login
		};
	},
	onLoad() {
	},
	methods: {
		goBack:function(){
			uni.navigateBack({
				
			})
		},
		infoin:function() {
			uni.navigateTo({
				url:"../info/info"
			})
		},
		logout: function() {
			console.log('log out');
			uni.removeStorageSync('login_key');
			uni.showToast({
				title: '已经退出当前账号'
			});
			uni.navigateBack();
		}
	}
};
</script>

<style>
.outbtn {
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #ebaa9c;
	margin-top: 10px;
	color: #ebaa9c;
	background-color: #FFFFFF;
}
button:after {
	border: none;
}
.logitem {	
	margin: 0 auto;
	width: 50%;
	padding-bottom: 10px;
}
.list-space {
	color: #ebaa9c;
	background-color: #fcfcfc;
	width: 92%;
	margin: 0 auto;
	font-size: 30upx;
	padding-top: 40upx;
	padding-bottom: 25upx;
}
.uni-list-item {
	min-height: 53px;
}
</style>
