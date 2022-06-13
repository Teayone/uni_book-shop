<template>
	<view class="login">
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<view class="input">
				<uni-icons class="icon" size="30" type="email"></uni-icons>
				<input class="login-input" type="email" placeholder="请输入邮箱" v-model="email">
			</view>
			<view class="input">
				<uni-icons class="icon" size="30" type="locked"></uni-icons>
				<input class="login-input" type="password" placeholder="请输入密码" v-model="password">
			</view>
			<button class="login-btn" :class="{disabled:inputStyle}" :disabled="inputStyle" @click="submit">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @click="toRegister">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/config/auth/login.js'
	export default {
		data() {
			return {
				email: '',
				password: '',
			}
		},
		methods: {
			async submit() {
				uni.showLoading({
					title:'登陆中...'
				})
				const data = {
					email: this.email,
					password: this.password
				}
				try{
					const {data:res} = await login(data)
					// 登陆成功同步保存 token 到本地
					uni.setStorageSync('access_token',res.access_token)
					const userInfo = await this.$store.dispatch('login/getUserInfoAsync')
					const backUrl = uni.getStorageSync('back_url')
					uni.$u.toast('登陆成功')
					// 跳转到来源页，用 uni.reLaunch 不生效
					uni.$u.route({
						type:'reLaunch',
						url:backUrl || 'pages/index/index'
					})
				}catch(e){
					 uni.hideLoading()
				}
		
			},
			
			toRegister(){
				uni.$u.route({
					url:'pages/auth/register'
				})
			}
		},
		computed: {
			inputStyle() {
				if (uni.$u.test.email(this.email) && this.password) {
					return false // 按钮取消禁用
				}
				return true // 禁用按钮
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		width: 100%;

		.content {
			.title {
				text-align: center;
				font-size: 50rpx;
				font-weight: 700;
				padding: 20rpx;
				margin: 100rpx 0;
			}

			.input {
				position: relative;
				display: flex;
				align-items: center;

				border-bottom: 2rpx solid #ccc;
				margin: 0 40rpx;
				height: 80rpx;
				margin-top: 10rpx;

				.icon {
					position: absolute;
					left: 20rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				.login-input {
					padding-left: 90rpx;
					box-sizing: border-box;
				}
			}

			.login-btn {
				margin: 50rpx 100rpx;
				border-radius: 10rpx;
				background-color: deepskyblue;
				color: #fff;
				font-size: 28rpx;
				height: 80rpx;
				line-height: 80rpx;

				&.disabled {
					background-color: skyblue;
				}
			}

			.alternative {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 100rpx;
				font-size: 28rpx;
				color: #999;
			}
		}
	}
</style>
