<template>
	<view class="container">
		<view class="top">
			<view class="avatar-box">
				<image
					src="../../static/default.png"
					mode="scaleToFill"
					class="avatar"
					v-if="!storageData.login"
				></image>
				<image
					:src="storageData.avatar"
					mode="scaleToFill"
					class="avatar"
					v-if="storageData.login"
				></image>
			</view>
			<view class="info-box">
				<navigator url="../signin/signin" v-if="!storageData.login">点击登录</navigator>
				<text class="name" v-if="storageData.login">{{ storageData.nickname }}</text>
				<navigator url="../setting/setting" class="btn">
					<text v-if="storageData.login" @tap="signOut">个人设置</text>
				</navigator>
			</view>
		</view>
		<view class="center" v-if="storageData.login">
			<view class="hi">
				<view class="info">
					<text class="title">{{ articleCount }}</text>
					<br />
					<text>文章</text>
				</view>
				<view class="info">
					<text class="title">{{ followCount }}</text>
					<br />
					<text>关注</text>
				</view>
				<view class="info">
					<text class="title">{{ messageCount }}</text>
					<br />
					<text>消息</text>
				</view>
				<view class="info4">
					<text class="title">{{ integral }}</text>
					<br />
					<text>积分</text>
				</view>
			</view>
		</view>
		<uni-list v-if="storageData.login">
			<uni-list-item
				:title="article.title"
				show-extra-icon="true"
				:extra-icon="{ color: '#f58569', size: '22', type: 'starhalf' }"
				v-for="(article, index) in articles"
				:key="index"
				note="描述信息"
			></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
var loginRes, _self;

import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
export default {
	components: { uniList, uniListItem },
	data() {
		return {
			storageData: {},
			articleCount: 10,
			followCount: 5,
			messageCount: 66,
			integral: 100,
			articles: [
				{
					id: 1,
					title: '第一篇文章'
				},
				{
					id: 2,
					title: '第二篇文章'
				},
				{
					id: 3,
					title: '第三篇文章'
				},
				{
					id: 4,
					title: '第四篇文章'
				},
				{
					id: 5,
					title: '第五篇文章'
				},
				{
					id: 6,
					title: '第六篇文章'
				}
			]
		};
	},
	onLoad: function() {},
	onShow: function() {
		const loginKey = uni.getStorageSync('login_key');
		console.log('come');
		if (loginKey) {
			console.log(loginKey);
			this.storageData = {
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar
			};
		} else {
			this.storageData = {
				login: false
			};
		}
	},
	methods: {},
	
};
</script>

<style scoped>
.top {
	display: flex;
	height: 140px;
	flex-direction: column;
	margin-top: 15px;
}
.avatar-box {
	flex: 1 1 70%;
	display: flex;
	justify-content: center;
}
.info-box {
	flex: 1 1 30%;
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
.info {
	font-size: 20px;
	border: #eee 1upx solid;
	border-left: 0px;
	border-top: 0px;
	border-bottom: 0px;
	flex: 1 1 25%;
	text-align: center;
}
.info4 {
	font-size: 20px;
	border: #eee 1upx solid;
	border-left: 0px;
	border-right: 0px;
	border-top: 0px;
	border-bottom: 0px;
	flex: 1 1 25%;
	text-align: center;
}
.hi {
	padding-top: 5px;
	display: flex;
	width: 100%;
	height: 60px;
	margin-bottom: 20px;
}

.content {
	width: 100%;
}
.btn {
	color: #109c2d;
}
.name {
	font-size: 20px;
	margin-right: 35px;
}
.card {
	margin-top: 80px;
}
.list {
	padding-top: 30px;
}
</style>
