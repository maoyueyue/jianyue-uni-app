<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item">
					<image @tap="goBack" class="topper-sc-image" src="../../static/back.png"></image>
					<text class="topper-text">喜欢收藏</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view class="list">
			<view class="list-item-box" v-for="(like, index) in likes" :key="index">
				<view class="list-item-small">
					<text class="like-title" @tap="gotoDetail(like.aid)">{{ like.title }}</text>
					<text class="like-nickname">{{ like.nickname }}</text>
				</view>
				<text class="like-nickname">{{ like.createTime }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			likes: [],
			userId: uni.getStorageSync('login_key').userId
		};
	},
	onLoad() {},
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
				url: this.apiServer + '/like/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: uni.getStorageSync('login_key').userId
				},
				success: res => {
					console.log(res.data.data)
					_this.likes = res.data.data;
					for (var i = 0; i < _this.likes.length; i++) {
						_this.likes[i].createTime = this.handleTime(_this.likes[i].createTime);
						
					}
				}
			});
		},
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId + '&userId=' + uni.getStorageSync('login_key').userId
			});
		},
		handleTime: function(date) {
			var d = new Date(date);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
			var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
			var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		},
		goBack: function() {
			uni.switchTab({
				url: '../my/my'
			});
		}
	}
};
</script>

<style>
.follow-box {
	background-color: #000000;
}
.follow-avatar {
	width: 35px;
	height: 35px;
	border-radius: 50%;
	margin-left: 20px;
}
.list-item-box {
	margin: 0 auto;
	width: 100%;
	height: 75px;
	background-color: #fff;
	display: flex;
	align-items: center;
	position: relative;
	justify-content: space-between;
}
.like-title {
	font-size: 20px;
	overflow: hidden;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	color: #2e2e2e;
	width: 130px;
	font-size: 18px
	
}
.list-item-small {
	display: flex;
	flex-direction: column;
	margin-left: 30px;
	
}
.list-item-box:after {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	height: 1px;
	background-color: #dfdfdf;
	transform: scaleY(0.5);
	content: '';
	display: block;
}
.like-nickname {
	color: #ADADAD;
	margin-right: 30px;
}
</style>
