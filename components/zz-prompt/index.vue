<template>
	<view id="back" class="prompt-box" v-if="visible" @touchmove="true">
		<view class="prompt">
			<view class="prompt-top">
				<text class="prompt-title">{{ title }}</text>
				<input class="prompt-input" type="text" v-model="value" />
			</view>
			<view class="prompt-button">
				<view class="bottom-title" @tap="close"><text>取消</text></view>
				<view class="bottom-title prompt-bottom" @tap="$emit('confirm',value)">
					<text>确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false,
			required: true
		},
		title: {
			type: String,
			default: '提示'
		},
		mainColor: {
			type: String,
			default: '#e74a39'
		},
		defaultValue: {
		  type: String,
		}
	},
	mounted() {
		this.value = this.defaultValue;
	},
	data() {
		return {
			value: '',
		};
	},
	methods: {
		close() {
			this.$emit('update:visible', false);
		}
	}
};
</script>

<style scoped="index">
view,
button,
input {
	box-sizing: border-box;
}

.prompt-box {
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.2);
	transition: opacity 0.2s linear;
}
.prompt {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 600upx;
	margin-top: 50%;
	height: 135px;
	background: white;
	border-radius: 10upx;
	overflow: hidden;
}
.prompt-top {
	padding-top: 35upx;
	margin-left: 40upx;
	display: flex;
	flex-direction: column;
	width: 100%;
}
.prompt-title {
	color: #6f6f6f;
	font-weight: 550;
	font-size: 14pt;
}
.prompt-input {
	margin-top: 20upx;
	width: 520upx;
	height: 45upx;
	font-size: 32upx;
	outline: none;
	color: #6f6f6f;
	border-bottom: 2px #e74a39 solid;
}
.prompt-button {
	margin-top: 50upx;
	margin-left: 170px;
	display: flex;
	height: 80upx;
}
.prompt-bottom {
	margin-left: 75upx;
}
.bottom-title {
	font-weight: 550;
	font-size: 33upx;
	color: #333333;
}
</style>
