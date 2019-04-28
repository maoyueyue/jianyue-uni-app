<template>
	<view class="container">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="writeContent-left">
					<image @tap="goBack" class="topper-sc-image" src="../../static/back.png"></image>
					<text class="yulan">{{ content.length }}字</text>
				</view>
				<view class="writeContent-right">
					<text v-if="show" @tap="changeYL" class="yulan cha">取消</text>
					<text v-if="!show" @tap="changeYL" class="yulan">预览</text>
					<text @tap="postArticle" class="fabu">发布</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view v-if="!show" class="inputContent">
			<input class="write-title" type="text" v-model="title" placeholder="请输入标题" />
			<textarea auto-height="true" maxlength="3000" placeholder="输入内容" v-model="content" class="write-content" />
		</view>
		<view v-if="show" class="inputContent">
			<view class="grace-text "><rich-text :nodes="content" bindtap="tap"></rich-text></view>
		</view>
		<view class="comment-bottom">
			<view class="list-border-space"></view>
			<view><image @tap="chooseImg" class="comment-bottom-avatar" src="../../static/tupian.png"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			imgs: [],
			show: false
		};
	},
	onLoad() {},
	methods: {
		goBack: function() {
			uni.navigateBack({});
		},
		changeYL: function() {
			this.show = !this.show;
		},
		chooseImg: function() {
			var _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
					uni.uploadFile({
						url: _this.apiServer + '/avatar/upload',
						filePath: res.tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							//图片上传成功，回显图片地址
							console.log(uploadFileRes.data);
							//将图片地址加入imgs数组
							_this.imgs.push(uploadFileRes.data);
							//将图片地址拼接HTML标签，加入文章内容
							_this.content += '<img src="' + uploadFileRes.data + '" width = "100%"/>';
						}
					});
				}
			});
		},
		postArticle: function() {
			var _this = this;
			uni.request({
				url: _this.apiServer + '/article/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: this.userId,
					title: this.title,
					content: '<div>' + this.content + '</div>'
				},
				success: res => {
					if (res.data.code === 0) {
						//获得发布文章成功返回的文章id
						var aId = res.data.data;
						console.log(aId);
						uni.showToast({
							title: '简阅钻+10'
						});
						//将文章id和文章对应的图片地址数组传到后台，存入数据库
						uni.request({
							url: _this.apiServer + '/img/add',
							method: 'POST',
							header: { 'content-type': 'application/x-www-form-urlencoded' },
							data: {
								aId: aId,
								imgs: JSON.stringify(_this.imgs) //序列化imgs数组
							},
							success: res => {
								if (res.data.code === 0) {
									console.log('文章图片地址已写入数据库');
								}
							}
						});
						uni.switchTab({
							url: '../index/index'
						});
					}
				},
				complete:function(){
					var newScore=uni.getStorageSync('login_key').score+10;
					uni.request({
						url: _this.apiServer + '/user/score',
						method: 'post',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: {
							userId: _this.userId,
							score: newScore
						},
						success: resd => {
							console.log(resd.data);
							uni.request({
								url: _this.apiServer + '/user/' + uni.getStorageSync('login_key').userId,
								method: 'GET',
								data: {
									userId: _this.userId
								},
								header: {
									'content-type': 'application/json'
								},
								success: res => {
									if (res.data.code == 0) {
										//将用户数据记录在本地存储
										uni.setStorageSync('login_key', {
											userId: res.data.data.id,
											nickname: res.data.data.nickname,
											avatar: res.data.data.avatar,
											token: res.data.data.token,
											score:res.data.data.score,
											mobile: res.data.data.mobile,
											login: true
										});
									}
								}
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style>
.comment-bottom {
	position: fixed;
	bottom: 0px;
	height: 50px;
	width: 100%;
	background-color: #f7f8f9;
	border-top: 1px solid #eeeeee;
	display: flex;
	align-items: center;
}
.writeContent {
	width: 100%;
	height: 100%;
	background-color: #0062CC;
	overflow: auto;
}
.writeContent-right {
	display: flex;
	width: 95px;
	justify-content: space-between;
	align-items: center;
}
.writeContent-left {
	display: flex;
	align-items: center;
}
.yulan {
	color: #999999;
	font-size: 17px;
}
.fabu {
	color: #e96f5a;
	font-size: 17px;
}
.comment-bottom-avatar {
	width: 20px;
	height: 20px;
	margin-left: 50px;
}
.write-title {
	height: 55px;
	font-size: 25px;
	border-bottom: dashed 1px #CCCCCC;
}
.write-content {
	padding-top: 30px;
}
.inputContent {
	width: 90%;
	margin: 0 auto;
	height: 80vh;
}
</style>
