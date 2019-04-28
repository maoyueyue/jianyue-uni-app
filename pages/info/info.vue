<template>
	<view class="content">
		<view class="topper"></view>
		<view class="topper-box">
			<view class="topper-box-list">
				<view class="topper-box-item">
					<image @tap="goBack" class="topper-sc-image" src="../../static/back.png"></image>
					<text class="topper-text">编辑个人资料</text>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view class="list-space"><text>常规设置</text></view>
		<view class="list-border-space"></view>
		<view class="list">
			<view class="list-item avatar_card" @tap="showActionSheet">
				<view class="info_left"><text>更改头像</text></view>
				<view class="info_right"><image :src="avatar" class="avatar_info"></image></view>
			</view>
			<view class="list-item " @tap="tanchu">
				<view class="info_left"><text>更改昵称</text></view>
				<view class="info_right">
					<text>{{ nickname }}</text>
				</view>
			</view>
			<view class="list-item ">
				<view class="info_left"><text>更改性別</text></view>
				<view class="info_right"><text>男</text></view>
			</view>
			<view class="list-item ">
				<view class="info_left"><text>更改生日</text></view>
				<view class="info_right"><text>1997-11-27</text></view>
			</view>
			<view class="list-item bottom-item">
				<view class="info_left"><text>更改主页</text></view>
				<view class="info_right"><text></text></view>
			</view>
		</view>
		<view class="list-space"><text>绑定账号登陆简阅</text></view>
		<view class="list-border-space"></view>
		<view>
			<uni-list>
				<uni-list-item
					:title="mobile"
					show-arrow="false"
					thumb="https://niit-soft1721-25.oss-cn-beijing.aliyuncs.com/avatar/88f5781c-4825-4fe6-ba32-feea97f511ac.png"
				></uni-list-item>
				<uni-list-item
					title="未绑定"
					show-extra-icon="true"
					show-arrow="false"
					:extra-icon="{ color: '#b1b1b1', size: '22', type: 'weibo' }"
					class="bangding"
				></uni-list-item>
				<uni-list-item
					title="未绑定"
					show-extra-icon="true"
					show-arrow="false"
					:extra-icon="{ color: '#b1b1b1', size: '22', type: 'weixin' }"
					class="bangding"
				></uni-list-item>
			</uni-list>
		</view>
		<view class="list-border-space"></view>
		<view class="list-space"><text></text></view>
		<view class="list-border-space"></view>
		<view class="list"><view class="list-item bottom-item">重置密码</view></view>
		<prompt :visible.sync="promptVisible" title="修改昵称" :defaultValue="nickname" @confirm="uploadNickname"></prompt>
	</view>
</template>

<script>
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
import Prompt from '@/components/zz-prompt/index.vue';
export default {
	components: {
		Prompt,
		uniList,
		uniListItem
	},
	data() {
		return {
			nickname: uni.getStorageSync('login_key').nickname,
			avatar: uni.getStorageSync('login_key').avatar,
			userId: uni.getStorageSync('login_key').userId,
			mobile: uni.getStorageSync('login_key').mobile,
			promptVisible: false
		};
	},
	onLoad() {
	},
	methods: {
		goBack:function(){
			uni.navigateBack({
				
			})
		},
		tanchu: function() {
			this.promptVisible = true;
		},
		uploadNickname(val) {
			var _this = this;
			uni.request({
				url: _this.apiServer + '/user/nickname',
				method: 'post',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: _this.userId,
					nickname: val
				},
				success: uploadNickname => {
					console.log(uploadNickname.data);
					_this.nickname = val;
					_this.promptVisible = false;
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
		},
		showActionSheet() {
			console.log('show');
			var _this = this;
			uni.showActionSheet({
				itemList: ['拍照', '从相册选择'],
				success: function(res) {
					console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					//选择的是拍照功能
					if (res.tapIndex == 0) {
						uni.chooseImage({
							count: 1,
							sourceType: ['camera'],
							success: function(res) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePaths[0],
									success: function() {
										console.log('save success');
										uni.uploadFile({
											url: _this.apiServer +'/user/avatar',
											filePath: res.tempFilePaths[0],
											name: 'file',
											formData: {
												userId: _this.userId
											},
											success: uploadFileRes => {
												console.log(uploadFileRes.data);
												_this.avatar = uploadFileRes.data;
											},
											complete: function() {
												console.log('save');
												uni.request({
													url: _this.apiServer +'/user/' + uni.getStorageSync('login_key').userId,
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
						});
					}
					//从相册选择
					if (res.tapIndex == 1) {
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都
							sourceType: ['album'], //从相册选择
							success: function(res) {
								console.log(JSON.stringify(res.tempFilePaths));
								uni.uploadFile({
									url: _this.apiServer +'/user/avatar',
									filePath: res.tempFilePaths[0],
									name: 'file',
									formData: {
										userId: _this.userId
									},
									success: uploadFileRes => {
										console.log(uploadFileRes.data);
										_this.avatar = uploadFileRes.data;
									},
									complete:function(){
										uni.request({
											url: _this.apiServer +'/user/' + uni.getStorageSync('login_key').userId,
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
							},
						});
					}
				},
				fail: function(res) {
					console.log(res.errMsg);
				},
			});
		}
	}
};
</script>

<style>
.avatar_info {
	width: 32px;
	height: 32px;
	border-radius: 50%;
}
.savebtn {
	width: 100%;
}
.info_right {
	text-align: right;
	flex: 0 0 50%;
	color: #6f6f6f;
}
.info_left {
	flex: 0 0 50%;
}
.bottom-item {
	border-bottom: 0px;
}
.list-space {
	color: #ebaa9c;
	background-color: #fcfcfc;
	width: 92%;
	margin: 0 auto;
	font-size: 30upx;
	padding-top: 40upx;
	padding-bottom: 25upx;
}
.uni-list-item {
	min-height: 55px;
}
.bangding {
	color: #b1b1b1;
}
</style>
