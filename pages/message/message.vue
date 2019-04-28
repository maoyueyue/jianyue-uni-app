<template>
	<view class="container">
		<view class="topper-max">
			<view class="topper"></view>
			<view class="topper-box">
				<view class="topper-box-text">
					<text class="yueyou-text">阅友圈({{ message2 }})</text>
				</view>
			</view>
			<view class="list-border-space"></view>
		</view>
		<view class="topper-space"></view>
		<view class="talk-box">
			<view class="talk-content">
				<view class="message-box" v-for="(message, index) in messages" :key="index">
					<view class="othermessage" v-if="message.userId != userId">
						<view class="avatar-message"><image class="message-avatar" @tap="goToUCenter(message.userId)" :src="message.avatar" /></view>
						<view class="othermsg">
							<text>{{ message.username }}</text>
							<view class="message-msg">
								<view class="left_triangle"></view>
								<view class="message-text">{{ message.msg }}</view>
							</view>
						</view>
					</view>
					<view class="othermessage1" v-if="message.userId == userId">
						<view class="othermsg1">
							<text>{{ message.username }}</text>
							<view class="message-msg1">
								<view class="right_triangle"></view>
								<view class="message-text1">{{ message.msg }}</view>
							</view>
						</view>
						<view class="avatar-message"><image class="message-avatar" @tap="goToUCenter(message.userId)" :src="message.avatar" /></view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-border-space"></view>
		<view class="talk-bottom">
			<input class="talk-input" type="text" placeholder="在这里输入内容" v-model="sendMsg" />
			<button class="talk-btn" @tap="send">发送</button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			messages: [],
			message2: '',
			sendMsg: '',
			username: uni.getStorageSync('login_key').nickname,
			userId: uni.getStorageSync('login_key').userId,
			avatar: uni.getStorageSync('login_key').avatar
		};
	},
	onLoad: function() {
		var _this = this;
		//创建WebSocket对象，指定要连接的服务器地址和端口，建立连接

		uni.connectSocket({
			url: 'ws://192.168.137.1:8080/websocket'
		});
		uni.onSocketOpen(function() {
			console.log('WebSocket连接已打开！');
		});
		uni.onSocketError(function() {
			console.log('WebSocket连接打开失败，请检查！');
		});
		uni.onSocketMessage(function(msg) {
			console.log('收到服务器内容：' + msg.data);
			var message = JSON.parse(msg.data);
			if (message.type === 'SPEAK') {
				_this.messages.push(message);
			}
			if (message.type === 'ENTER' || message.type === 'QUIT') {
				_this.message2 = message.onlineCount;
			}
		});

		uni.onSocketClose(function() {
			console.log('WebSocket 已关闭！');
		});
		//发送错误
	},
	watch: {
		// 如果 `messages` 发生改变，这个函数就会运行
		messages: function(newMsg, oldMsg) {
			this.messages = newMsg;
		}
	},
	methods: {
		send: function() {
			if (uni.getStorageSync('login_key').login === true) { 
				uni.sendSocketMessage({
					data: JSON.stringify({ userId: this.userId, username: this.username, avatar: this.avatar, msg: this.sendMsg })
				});
				this.sendMsg = '';
			} else {
				uni.showModal({
					title: '提示',
					content: '登陆后才能发消息哦',
					cancelText: '算了吧',
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
		},
		goToUCenter: function(uId) {
			uni.navigateTo({
				url: '../usercenter/usercenter?uId=' + uId
			});
		}
	}
};
</script>

<style>
.yueyou-text {
	font-size: 17px;
	color: #888888;
}
.topper-box-text {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.talk-box {
	height: 83vh;
	background-color: #ffffff;
}
.talk-content {
	height: 83vh;
	overflow: auto;
	padding-top: 18px;
}
.talk-input {
	width: 85%;
	height: 33px;
	border-radius: 2px;
	padding-left: 10px;
	background-color: #f0f0f0;
}
.talk-btn {
	color: #e68f7d;
	font-size: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 35px;
	width: 72px;
	background-color: #ffffff;
}
.talk-btn:after {
	border: none;
}
.talk-bottom {
	height: 45px;
	display: flex;
	align-items: center;
	padding-left: 12px;
}
.message-box {
	width: 100%;
}
.othermessage {
	padding-bottom: 10px;
	padding-left: 15px;
	padding-right: 50px;
	display: flex;
}
.othermessage1 {
	padding-bottom: 10px;
	padding-left: 50px;
	padding-right: 15px;
	display: flex;
	justify-content: flex-end;
}
.message-avatar {
	height: 30px;
	width: 30px;
	border-radius: 50%;
}
.othermsg {
	margin-top: 2px;
	margin-left: 6px;
}
.othermsg1 {
	margin-top: 2px;
	margin-right: 6px;
	text-align: right;
}
.othermsg text {
	color: #adadad;
	color: 15px;
}
.message-msg {
	background-color: #e7f1fb;
	padding-bottom: 10px;
	border-radius: 2px;
	margin-top: 5px;
}
.message-msg1 {
	background-color: #eeeeee;
	padding-top: 10px;
	padding-bottom: 10px;
	border-radius: 2px;
	margin-top: 5px;
	position: relative;
	text-align: left;
}
.message-text {
	margin-left: 10px;
	margin-right: 10px;
	margin-top: 3px;
	font-size: 16px;
}
.message-text1 {
	margin-left: 10px;
	margin-right: 10px;
	font-size: 16px;
}
.left_triangle {
	position: relative;
	content: '';
	width: 0;
	height: 0;
	left: -7px;
	top: 3px;
	border-bottom: 6px solid transparent;
	border-right: 7px solid #e7f1fb;
}
.right_triangle {
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	top: 3px;
	right: -7px;
	border-bottom: 6px solid transparent;
	border-left: 7px solid #eeeeee;
}
</style>
