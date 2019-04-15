<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item">
					<image @tap="goBack" class="topper-sc-image" src="../../static/back.png"></image>
					<text class="topper-text">我的关注</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
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
							<view class="list">
								<view class="list-item" v-for="(follow, index) in follows" :key="index">
									<image :src="follow.avatar" class="follow-avatar"></image>
									<text class="follow-nickname">{{ follow.nickname }}</text>
									<button class=" follow-btn cancel" @tap="cancelFollow(follow.toUId)">取消关注</button>
								</view>
							</view>
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
				{ name: '关注', id: 'pwd1', loadingType: 0, page: 1 },
				{ name: '专题', id: 'pwd2', loadingType: 0, page: 1 },
				{ name: '文集', id: 'pwd3', loadingType: 0, page: 1 }
			],
			showKeyboard: false,
			follows: [],
			userId: uni.getStorageSync('login_key').userId
		};
	},
	onLoad() {},
	onShow: function() {
		this.getFollow();
	},
	methods: {
		getFollow:function(){
			var _this = this;
			uni.request({
				url: this.apiServer + '/follow/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: uni.getStorageSync('login_key').userId
				},
				success: res => {
					_this.follows = res.data.data;
				}
			});
		},
		cancelFollow: function(toUId) {
			uni.request({
				url: this.apiServer + '/follow/cancel',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toUId: toUId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '已取消关注'
						});
						this.getFollow();
					}
				}
			});
		},
		goBack:function(){
			uni.navigateBack({
				
			})
		},
		done(password) {
			console.log(password);
			console.log(this.$refs);
		},
		confirmPwd() {
			this.$refs.keyboard.show();
		},
		onInput(e) {
			//e.cancel = true;
		},
		onConfirm(e) {
			let password = e.value;
		},
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
.title {
	width: 100%;
	padding-top: 12px;
	color: #aaaaaa;
}
.follow-box {
	background-color: #000000;
}
.follow-btn {
	display: flex;
	height: 30px;
	width: 80px;
	font-size: 13px;
	border-radius: 5px;
	justify-content: center;
	align-items: center;
	color: #8f8f94;
}
.follow-avatar {
	width: 35px;
	height: 35px;
	border-radius: 50%;
	margin-left: 30px;
}
.follow-nickname {
	margin-left: 30px;
	flex: 0 0 40%;
}
</style>
