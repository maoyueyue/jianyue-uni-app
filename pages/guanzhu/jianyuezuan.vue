<template>
	<view>
		<view class="header"></view>
		<view class="box">
			<view class="box-hd">
				<view class="avator"><img src="../../static/user/face.jpg" /></view>
				<view class="button-box">
					<view class="jianxin-btn">简信</view>
					<view class="guanzhu-btn">已关注</view> 
					<view class="liwu-btn"><image src="../../static/liwu.png"></image></view>
				</view>
			</view>
			<view class="text-box">
				<text class="username-text">啦啦啦</text>
				<text class="number-text">7149 字 | 67 赞</text>
				<text class="jianjie-text">暂无简介 ></text>
				<view class="guanzhu-box">
					<text>8 关注</text>
					<text>19 粉丝</text>
					<text>7.9 简书钻</text>
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
					<view data-scindex="0">
						<view class="content1">
						</view>
					</view>
				</swiper-item>
				<swiper-item key="1">
					<view data-scindex="1">
						<view class="content2">
					
					</view>
					</view>
				</swiper-item>
				<swiper-item key="2">
					<view data-scindex="2"><view class="content3">C</view></view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			titleShowId: 'tabTag-0',
			tabs: [
				//标签名称 , 分类 id , 加载更多, 加载的页码
				{ name: '动态', id: 'pwd1', loadingType: 0, page: 1 },
				{ name: '文章', id: 'pwd2', loadingType: 0, page: 1 },
				{ name: '更多', id: 'pwd3', loadingType: 0, page: 1 }
			],
			showKeyboard: false,
		};
	},
	onLoad() {},
	methods: {
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
	background-color: #4191ea;
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
	justify-content: space-between;
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
}
.guanzhu-btn {
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
	color:#888888; 
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
	height: 46vh;
}
.content1 {
	height: 46vh;
	width: 100%;
	overflow: auto;
}
.content2 {
	height: 46vh;
	width: 100%;
	overflow: auto;
}
.title {
	width: 100%;
	padding-top: 12px;
	color: #aaaaaa;
}
</style>
