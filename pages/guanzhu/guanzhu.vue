<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item">
					<text class="topper-text">任务中心</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view class="renwu-header"></view>
		<view class="renwu-bottom">
			<view class="jiandao-box"></view>
			<view class="renwu-box">
				<text class="renwu-title">做任务得钻石</text>
				<view class="small-box">
					<view class="renwutext">
						<text class="renwu-title1">公开发文赚钻</text>
						<text class="renwu-title2">公开发布文章奖励简阅钻</text>
						<text class="renwu-title3">简阅钻10个 (会员翻倍)</text>
					</view>
					<view class="renwu-btn">
						去发文
					</view>
				</view>
				<view class="small-box">
					<view class="renwutext">
						<text class="renwu-title1">为文章点赞赚钻</text>
						<text class="renwu-title2">每天给文章点赞，奖励简阅钻</text>
						<text class="renwu-title3">简阅钻5个 (会员翻倍)</text>
					</view>
					<view class="renwu-btn">
						去点赞
					</view>
				</view>
				<view class="small-box">
					<view class="renwutext">
						<text class="renwu-title1">为文章评论赚钻</text>
						<text class="renwu-title2">每天评论文章，奖励简阅钻</text>
						<text class="renwu-title3">简阅钻5个 (会员翻倍)</text>
					</view>
					<view class="renwu-btn">
						去评论
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad: function() {},
	onReady: function() {},
	methods: {}
};
</script>

<style>
.container {
	background-color: #f8f8f8;
}
.renwu-header {
	background-color: #dc3522;
	height: 105px;
}
.jiandao-box {
	width: 93%;
	height: 133px;
	margin: 0 auto;
	margin-top: -12px;
	border-radius: 5px;
	background-color: #ffffff;
	box-shadow: #eeeeee 0 0 10upx 0;
}
.renwu-box {
	width: 87.5%;
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
	color:#2e2e2e ;
	font-size: 20px;
	font-weight: normal;
}
.renwu-title1 {
	color:#303030 ;
	font-size: 16px;
	font-weight: 400; 
}
.renwu-title2 {
	color: #9a9a9a;
	font-size: 12px;
	margin-top: 8px;
}
.renwu-title3 {
	color:#ea715e ;
	font-size: 13px; 
	margin-top: 8px;
}
</style>
