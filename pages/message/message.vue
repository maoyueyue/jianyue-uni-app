<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box"></view>
		<view>
			<view class="grace-scroll-do grace-bg-white grace-common-mt">
				<scroll-view class="grace-scroll-x" scroll-x v-for="(article, index) in articles" :scroll-left="scrollIndex == index ? 180 : 0" @touchstart='touchStart' @touchend='touchEnd' :data-id="index" scroll-with-animation="true" :key="index">
					<view class="grace-items">
						<view class="contents">
							<view class="grace-h5 grace-blod" @tap="gotoDetail(article.id)">{{ article.title }}</view>
							<view class="grace-text-small">{{article.createTime}}</view>
						</view>
					</view>
					<view class="grace-items btn" :data-id="index" @tap="removeMsg" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px'}">删除</view>
				</scroll-view>
			</view>
		</view>
		<view class="top">
			<view class="avatar-box">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				<image :src="storageData.avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
			</view>
			<view class="info-box">
				<navigator url="../signin/signin" v-if="!storageData.login">点击登录</navigator>
				<text v-if="storageData.login">{{ storageData.nickname }}</text>
				<navigator url="../setting/setting" v-if="storageData.login"><text class="setting-txt">个人设置</text></navigator>
			</view>
		</view>

		<!-- 中间文章数量、好友数量、消息数量等统计区域，横向排列 -->
		<view>
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
				<view
					v-for="(cate, index) in categories"
					:key="index"
					:data-cateid="cate.cateid"
					:data-index="index"
					:class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
					@tap="tabChange"
				>
					{{ cate.name }}
				</view>
			</scroll-view>
			<view class="demo-content">
				<!-- 文章部分 -->
				<view class="content" v-if="cateCurrentIndex === 0">
					<view class="list">
						<view class="list-item" v-for="(article, index) in articles" :key="index">
							<text @tap="gotoDetail(article.id)">{{ article.title }}</text>
						</view>
					</view>
				</view>
				<!-- 关注部分 -->
				<view class="content" v-if="cateCurrentIndex === 1">
					<view class="list">
						<view class="list-item" v-for="(follow, index) in follows" :key="index">
							<image :src="follow.avatar" class="avatar small"></image>
							<text style="margin-left: 20px;">{{ follow.nickname }}</text>
						</view>
					</view>
				</view>
				<!-- 收藏部分 -->
				<view class="content" v-if="cateCurrentIndex === 2"><text>收藏</text></view>
				<!-- 积分部分 -->
				<view class="content" v-if="cateCurrentIndex === 3"><text>积分</text></view>
			</view>
		</view>
	</view>
</template>

<script>
var loginRes, _self;
import "../../graceUI/graceUI.css";
export default {
	data() {
		return {
			btn1Width : 70,
			btn2Width : 70,
			//2个按钮的总宽 = btn1Width + btn23Width【uni-app 模板内不建议复杂运算请手动配置】
			deleteBtnWidth : 140,
			//正在滑动的索引
			scrollIndex : -1,
			//正在删除的索引
			deleteIndex : -1,
			storageData: {
				userId: 0,
				nickname: '',
				avatar: '',
				login: false
			},
			//分类信息
			categories: [{ cateid: 0, name: '文章' }, { cateid: 1, name: '关注' }, { cateid: 2, name: '收藏' }, { cateid: 3, name: '积分' }],
			// 当前选择的分类
			cateCurrentIndex: 0,
			articles: [],
			follows: []
		};
	},
	onLoad: function() {
		_self = this;
	},
	onShow: function() {
		var _this = this;
		const loginKey = uni.getStorageSync('login_key');
		if (loginKey) {
			this.storageData = {
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar,
				userId: loginKey.userId
			};
			uni.request({
				url: this.apiServer + '/article/user',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: this.storageData.userId
				},
				success: res => {
					_this.articles = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/follow/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.storageData.userId
				},
				success: res => {
					_this.follows = res.data.data;
				}
			});
		} else {
			this.storageData = {
				login: false
			};
		}
	},
	methods: {
		removeMsg : function(e){
			var index = e.target.dataset.id;
			//删除确认
			if (this.deleteIndex != index){
				this.deleteIndex = index;
				setTimeout(function(){
					_self.deleteIndex = -1;
				}, 2000);
				return false;
			}
			this.scrollIndex = -1;
			setTimeout(function(){
				_self.msg.splice(index, 1);
				_self.deleteIndex = -1;
			}, 500);
		},
		touchStart: function (e) {
			x = e.mp.changedTouches[0].clientX;
			y = e.mp.changedTouches[0].clientY;
		},
		touchEnd : function(e){
			x = x - e.mp.changedTouches[0].clientX;
			y = y - e.mp.changedTouches[0].clientY;
			if (Math.abs(x) < 50) { return; }
			if (Math.abs(x) < Math.abs(y)) { return; }
			var index = e.currentTarget.dataset.id;
			if (index == this.scrollIndex){return ;}
			_self.scrollIndex = index;
		},
		tabChange: function(e) {
			// 选中的索引
			var index = e.currentTarget.dataset.index;
			// 具体的分类id
			var cateid = e.currentTarget.dataset.cateid;
			this.cateCurrentIndex = index;
			// 动态替换内容
			this.content = this.categories[index].name;
		},
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId + '&userId=' + this.storageData.userId
			});
		}
	}
};
</script>

<style scoped>
.top {
	display: flex;
	flex-direction: column;
	text-align: center;
	height: 100px;
	margin-top: 5px;
}
.avatar-box {
	flex: 1 1 30%;
}
.info-box {
	flex: 1 1 70%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.setting-txt {
	color: #00b26a;
	margin-left: 15px;
}
.center {
	display: flex;
	justify-content: center;
}
.info {
	flex: 1 1 25%;
	display: flex;
	flex-direction: column;
	text-align: center;
	border-right: 1px solid #eee;
}
.title {
	font-size: 14pt;
}
.content {
	margin-top: 20px;
}
</style>
