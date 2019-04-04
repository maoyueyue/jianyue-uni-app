<template>
	<view class="content">
		<view class="list-item avatar_card" @tap="showActionSheet">
			<view class="info_left"><text>更改头像</text></view>
			<view class="info_right"><image :src="avatar" class="avatar_info"></image></view>
		</view>
		<view class="list-item" >
			<view class="info_left"><text>更改昵称</text></view>
			<view class="info_right">
				<text>{{ nickname }}</text>
			</view>
		</view>
		<view class="list-item" @tap="uploadNickname">
			<view class="info_left"><input type="text" v-model="newNickname"></view>
			<view class="info_right">
				<button type="primary" @tap="uploadNickname">确定</button>
			</view>
		</view>
		<view class="list-item">
			<button class="savebtn" type="primary" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nickname: uni.getStorageSync('login_key').nickname,
			avatar: uni.getStorageSync('login_key').avatar,
			userId: uni.getStorageSync('login_key').userId,
			newNickname:''
			
		};
	},
	onLoad() {},
	methods: {
		uploadNickname:function(name){
			var _this=this;
			uni.request({
				url: 'http://losthost:8080/api/user/username',
				method: 'post',
				Data: {
					userId:_this.userId,
					nickname:_this.newNickname
					
				},
				header: {
					'content-type': 'application/json'
				},
				success:uploadNickname =>{
					console.log(uploadNickname.data);
					_this.nickname=_this.newNickname;
				} ,
			});
				
		},
		showActionSheet: function() {
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
											url: 'http://losthost:8080/api/user/avatar',
											filePath: res.tempFilePaths[0],
											name: 'file',
											formData: {
												userId: _this.userId
											},
											success: uploadFileRes => {
												console.log(uploadFileRes.data);
												_this.avatar = uploadFileRes.data;
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
									url: 'http://47.101.34.195:8080/api/user/avatar',
									filePath: res.tempFilePaths[0],
									name: 'file',
									formData: {
										userId: _this.userId
									},
									success: uploadFileRes => {
										console.log(uploadFileRes.data);
										_this.avatar = uploadFileRes.data;
									}
								});
							}
						});
					}
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		}
	}
};
</script>

<style scoped="info">
.content {
	display: flex;
	flex-direction: column;
}
.avatar_card {
}
.avatar_info {
	width: 55px;
	height: 55px;
	border-radius: 50%;
}
.savebtn {
	width: 100%;
}
.info_right {
	flex: 0 0 30%;
	color: #6f6f6f;
}
.info_left {
	flex: 0 0 70%;
}
</style>
