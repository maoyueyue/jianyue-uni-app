<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item">
					<image @tap="goBack" class="topper-sc-image" src="../../static/back.png"></image>
					<text class="topper-text">粉丝</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>

		<view class="list">
			<view class="list-item" v-for="(followed, index) in followeds" :key="index">
				<image :src="followed.avatar" class="follow-avatar"></image>
				<text class="follow-nickname">{{ followed.nickname }}</text>
				<!-- <button v-if="ifFollowed(followed.fromUId)" class="followed-btn">关注</button> -->
				<!-- <button v-if="!ifFollowed(followed.fromUId)" class=" follow-btn cancel">互相关注</button> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			followeds: [],
			userId: 0,
			
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.userId = option.id;
	},
	onShow: function() {
		this.getFollowed();
	},
	methods: {
// 		ifFollowed:function(showFollow,aId) {
// 			var _this = this;
// 			uni.request({
// 				url: this.apiServer + '/follow/one',
// 				method: 'POST',
// 				header: { 'content-type': 'application/x-www-form-urlencoded' },
// 				data: {
// 					fromUId: uni.getStorageSync('login_key').userId,
// 					toUId:aId
// 				},
// 				success: (res) => {
// 					if(res.data.data!=null){
// 						showFollow=false
// 					}else{
// 						showFollow=true
// 					}
// 				}
// 			});
// 			return showFollow;
// 			
// 		},
		getFollowed: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/follow/listed',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					toUId: this.userId
				},
				success: res => {
					_this.followeds = res.data.data;
				}
			});
		},
		goBack: function() {
			uni.navigateBack({
			});
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
	width: 60px;
	margin: 0 30px;
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
	height: 83vh;
}
.content1 {
	height: 83vh;
	width: 100%;
	overflow: auto;
}
.content2 {
	height: 83vh;
	width: 100%;
	overflow: auto;
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
.title {
	width: 100%;
	padding-top: 12px;
	color: #aaaaaa;
}
.follow-box {
	background-color: #000000;
}
.follow-avatar {
	width: 35px;
	height: 35px;
	border-radius: 50%;
	margin-left: 20px;
}
.follow-nickname {
	margin-left: 30px;
}
</style>
