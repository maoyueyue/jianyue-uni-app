<template>
	<view class="container">
		<view class="top">
			<view class="avatar-box">
				<view class="avatar-box-login">
					<image :src="storageData.avatar" mode="scaleToFill" class="avatar loginavatar" v-if="storageData.login"></image>
					<image src="../../static/default.png" mode="scaleToFill" class="avatar loginavatar" v-if="!storageData.login"></image>
					
					<view class="avatar-box-name">
					<text class="name" v-if="storageData.login">{{ storageData.nickname }}</text>
					<text class="namelike" v-if="storageData.login">关注  10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;粉丝 3</text>
					<navigator url="../signin/signin" v-if="!storageData.login">点击登录</navigator>	
					</view>
				</view>
				
			</view>
		</view>
		<view class="center" v-if="storageData.login">
			<view class="list-item-chakan">
				<text >简书钻： 0.11</text><text class="namelike">查看 ></text>
			</view>
			<uni-grid
				:options="[
					{ image: '/static/wenzhang.png', text: '我的文章' },
					{ image: '/static/shujia.png', text: '我的书架' },
					{ image: '/static/shoucang.png', text: '喜欢收藏' },
					{ image: '/static/renwu.png', text: '奖励任务' }
				]"
				column-num="4"
				@click="toindex"
				:show-border="false"
			></uni-grid>
		</view>
		<view v-if="storageData.login">
			<view class="center_list">
				<uni-list>
					<uni-list-item title="简书会员"></uni-list-item>
					<uni-list-item title="简书活动"></uni-list-item>
					<uni-list-item title="简东西" disabled="true"></uni-list-item>
					<uni-list-item title="我的钱包"></uni-list-item>
					<uni-list-item title="我的专题/文集" disabled="true"></uni-list-item>
					<uni-list-item title="浏览历史" disabled="true"></uni-list-item>
				</uni-list>
			</view>
			<uni-list>
				<uni-list-item title="设置" @click="tosetting"></uni-list-item>
				<uni-list-item title="帮助与反馈"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
var loginRes, _self;
import uniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
export default {
	components: { uniGrid, uniList, uniListItem },
	data() {
		return {
			storageData: {},
			articleCount: 10,
			followCount: 5,
			messageCount: 66,
			integral: 100
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
	methods: {
		tosetting: function() {
			uni.navigateTo({
				url: '../setting/setting'
			});
		},
		toindex(e) {
			console.log(e.index);
			var num = e.index;
			if (num == 0) {
				uni.switchTab({
					url: '../index/index'
				});
			}
		}
	}
};
</script>

<style scoped>
.container {
	background-color: #fcfcfc;
	height: 100vh;
}
.loginavatar {
	margin-right: 20px;
}
.list-item-chakan {
	margin: 0 auto;
	width: 92%;
	height: 40px;
	background-color: #fff;
	border-bottom: 1px solid #eee;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 12pt;
}
.top {
	width: 93%;
	padding-top: 15px;
	display: flex;
	flex-direction: column;
}
.namelike {
	font-size: 14px;
	color: #B1B1B1;
}
.avatar-box-login {
	width: 90%;
	margin: 0 auto;
	align-items: center;
	display: flex;
}
.avatar-box-name {
	display: flex;
	flex-direction: column;
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

.center {
	width: 94%;
	border-radius: 10px;
	margin: 0 auto;
	margin-bottom: 20px;
	margin-top: 8px;
	background-color: #ffffff;
	border: 1px solid #eeeeee;
}
.btn {
	color: #109c2d;
	font-size: 20px;
}
.name {
	font-size: 30px;
	margin-right: 35px;
}
.card {
	margin-top: 80px;
}
.list {
	padding-top: 30px;
}
.center_list {
	margin-bottom: 20px;
}
</style>
