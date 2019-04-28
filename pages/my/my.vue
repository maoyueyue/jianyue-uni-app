<template>
	<view class="container">
		<view class="topper-max">
			<view class="topper"></view>
			<view class="topper-box">
				<view class="topper-box-list">
					<image src="../../static/erweima.png"></image>
					<view class="topper-box-item">
						<image class="topper-image" src="../../static/yejian.png"></image>
						<text>日间</text>
					</view>
				</view>
			</view>
		</view>
		<view class="topper-space"></view>
		<view class="top">
			<view class="avatar-box">
				<view class="avatar-box-login">
					<image @tap="goToUCenter(storageData.userId)" :src="storageData.avatar" mode="scaleToFill" class="avatar loginavatar" v-if="storageData.login"></image>
					<image src="../../static/default.png" mode="scaleToFill" class="avatar loginavatar" v-if="!storageData.login"></image>

					<view class="avatar-box-name">
						<text class="name" v-if="storageData.login">{{ storageData.nickname }}</text>
						<navigator class="name" url="../signin/signin" v-if="!storageData.login">点击登录</navigator>
						<view class="followbtn-box">
							<view class="followbtn-box-num" v-if="storageData.login">
								<navigator class="namelike" url="../follow/follow">关注</navigator>
								<text class="followNum">{{ follows.length }}</text>
							</view>
							<view class="followbtn-box-num" v-if="storageData.login">
								<navigator class="namelike" url="../follow/followed">粉丝</navigator>
								<text class="followNum">{{ followeds.length }}</text>
							</view>
							<text class="namelike" v-if="!storageData.login">点击领取简阅钻福利</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="list-item-chakan">
				<view class="center-jianyue-box">
					<image class="center-image" src="../../static/jianshuzuan.png"></image>
					<text class="jianyue-zuan">简阅钻：{{ storageData.score }}</text>
				</view>
				<text class="namelike">查看 〉</text>
			</view>
			<view class="list-border-space"></view>
			<uni-grid
				:options="[
					{ image: '/static/wenzhang.png', text: '我的文章', note: '0篇私密' },
					{ image: '/static/shujia.png', text: '我的书架', note: '含已购内容' },
					{ image: '/static/shoucang.png', text: '喜欢收藏' },
					{ image: '/static/renwu.png', text: '奖励任务', note: '领简阅钻' }
				]"
				column-num="4"
				@click="toindex"
				:show-border="false"
			></uni-grid>
		</view>
		<view class="my-swiper-box">
			<view><graceSwiper swiperId="garce-swiper-1" interval="3000" :indicatorDots="true" :items="swiperItems"></graceSwiper></view>
		</view>
		<view>
			<uni-list>
				<uni-list-item title="简书会员" note="限时赠简阅钻"></uni-list-item>
				<uni-list-item title="简书活动" note="万元奖金等你"></uni-list-item>
				<uni-list-item title="简东西" note="简阅人都爱买"></uni-list-item>
				<uni-list-item title="我的钱包" note="0张优惠券"></uni-list-item>
				<uni-list-item title="我的专题/文集"></uni-list-item>
				<uni-list-item title="浏览历史"></uni-list-item>
			</uni-list>
			<view class=" article-flow"></view>
			<uni-list>
				<uni-list-item title="设置" @click="tosetting"></uni-list-item>
				<uni-list-item title="帮助与反馈" note="有问题找这里"></uni-list-item>
			</uni-list>
			<view class=" article-flow"></view>
		</view>
	</view>
</template>

<script>
var loginRes, _self;
import graceSwiper from '../../graceUI/components/graceSwiper.vue';
import uniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
export default {
	components: { graceSwiper, uniGrid, uniList, uniListItem },
	data() {
		return {
			swiperItems: [
				{ imgUrl: 'http://niit-soft1721-25.oss-cn-beijing.aliyuncs.com/lunbo/Snipaste_2019-04-12_17-57-34_mh1555064382403.jpg', path: '' },
				{ imgUrl: 'http://niit-soft1721-25.oss-cn-beijing.aliyuncs.com/lunbo/Snipaste_2019-04-12_17-58-01_mh1555064341501.jpg', path: '' },
				{ imgUrl: 'http://niit-soft1721-25.oss-cn-beijing.aliyuncs.com/lunbo/Snipaste_2019-04-12_17-58-23_mh1555064298486.jpg', path: '' },
				{ imgUrl: 'http://niit-soft1721-25.oss-cn-beijing.aliyuncs.com/lunbo/Snipaste_2019-04-12_17-58-50_mh1555064218786.jpg', path: '' }
			],
			storageData: {},
			articleCount: 10,
			followCount: 5,
			messageCount: 66,
			integral: 100,
			follows: [],
			followeds: []
		};
	},
	onLoad: function() {},
	onShow: function() {
		const loginKey = uni.getStorageSync('login_key');
		console.log('come');
		if (loginKey) {
			console.log(loginKey);
			this.storageData = {
				userId: loginKey.userId,
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar,
				score: loginKey.score
			};
			uni.request({
				url: this.apiServer + '/follow/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: loginKey.userId
				},
				success: res => {
					this.follows = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/follow/listed',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					toUId: loginKey.userId
				},
				success: res => {
					this.followeds = res.data.data;
				}
			});
		} else {
			this.storageData = {
				login: false
			};
		}
	},
	methods: {
		goToUCenter: function(uId) {
			uni.navigateTo({
				url: '../usercenter/usercenter?uId=' + uId
			});
		},
		tosetting: function() {
			uni.navigateTo({
				url: '../setting/setting'
			});
		},
		toindex(e) {
			console.log(e.index);
			var num = e.index;
			if (uni.getStorageSync('login_key').login === true) {
				if (num == 0) {
					uni.navigateTo({
						url: '../myarticle/myarticle'
					});
				}
				if (num == 2) {
					uni.navigateTo({
						url: '../like/like'
					});
				}
				if (num == 3) {
					uni.switchTab({
						url: '../jianyuezuan/jianyuezuan'
					});
				}
			} else {
				uni.showModal({
					title: '提示',
					content: '您未登录',
					cancelText: '再等等',
					confirmText: '前往登录',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../signin/signin'
							});
						}
					}
				});
			}
		}
	}
};
</script>

<style>
.loginavatar {
	margin-right: 13px;
}
.list-item-chakan {
	margin: 0 auto;
	width: 92%;
	height: 35px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.top {
	width: 93%;
	padding-top: 7px;
	display: flex;
	flex-direction: column;
}
.jianyue-zuan {
	margin-left: 6px;
	font-size: 15px;
	color: #2f2f2f;
}
.center-image {
	width: 25px;
	height: 25px;
	border-radius: 50%;
}
.center-jianyue-box {
	display: flex;
	align-items: center;
}
.namelike {
	font-size: 14px;
	color: #b1b1b1;
}
.followNum {
	font-size: 14px;
	color: #2f2f2f;
}
.followbtn-box {
	display: flex;
	justify-content: space-between;
	width: 130px;
}
.my-swiper-box {
	width: 92%;
	margin: 0 auto;
}
.followbtn-box-num {
	display: flex;
	justify-content: space-between;
	width: 50px;
}
.avatar-box-login {
	width: 90%;
	margin: 0 auto;
	align-items: center;
	padding-bottom: 13px;
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
	border-radius: 5px;
	margin: 0 auto;
	margin-bottom: 20px;
	margin-top: 8px;
	background-color: #ffffff;
	box-shadow: #eeeeee 0 0 20upx 0;
	padding-top: 5px;
	padding-bottom: 4px;
}
.btn {
	color: #109c2d;
	font-size: 20px;
}
.name {
	font-size: 20px;
	margin-right: 35px;
	color: #2f2f2f;
	margin-bottom: 5px;
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
.article-flow {
	height: 16px;
	background-color: #f0f0f0;
}
.list-border-space {
	width: 92%;
	margin: 0 auto;
}
</style>
