<template>
	<view class="register">
		<view class="register-title">邮箱注册</view>
		<view class="register-content">
			<view class="register-input-box">
				<uni-icons class="register-icon" size="30" type="person"></uni-icons>
				<input v-model="registerInfo.username" class="register-input" type="text" placeholder="请输入昵称">
			</view>
			<view class="register-input-box">
				<uni-icons class="register-icon" size="30" type="email-filled"></uni-icons>
				<input v-model="registerInfo.email" class="register-input" type="text" placeholder="请输入邮箱">
			</view>
			<view class="register-input-box">
				<uni-icons class="register-icon" size="30" type="locked-filled"></uni-icons>
				<input v-model="registerInfo.password" class="register-input" :type="inputType" placeholder="请输入密码">
				<uni-icons v-show="registerInfo.password!==''" @click="showPassword" size="25" class="input-eye" :type="icon" ></uni-icons>
			</view>
			<view class="register-input-box">
				<uni-icons class="register-icon" size="30" type="locked-filled"></uni-icons>
				<input v-model="registerInfo.confirmPassword" class="register-input" :type="inputType" placeholder="确认密码">
			</view>
		</view>
		<view class="register-submit">
			<button @click="registerClick" class="register-btn" :disabled="isDisabled">注册</button>
		</view>
	</view>
</template>

<script>
	import { register } from '@/config/auth/login.js'
	export default {
		data() {
			return {
				registerInfo:{
					username:'',
					email:'',
					password:'',
					confirmPassword:''
				},
				icon:'eye-filled',
				inputType:'password'
			};
		},
		methods:{
			showPassword(){
				if(this.inputType === 'password'){
					this.inputType = 'text'
					this.icon = 'eye-slash-filled'
				}else{
					this.inputType = 'password'
					this.icon = 'eye-filled'
				}
			},
			async registerClick(){
				uni.showLoading({
					title:'注册中，请稍等'
				})
				try{
					const res = await register({
						name:this.registerInfo.username,
						email:this.registerInfo.email,
						password:this.registerInfo.password,
						password_confirmation:this.registerInfo.confirmPassword
					})
					console.log(res);
					if(res.statusCode===201){
						// 跳转至登录页
						uni.$u.toast('登陆成功')
						setTimeout(()=>{
							uni.$u.route({
								type:'redirect',
								url:'pages/auth/login'
							})
						},500)
					}
	
				}catch(e){
					//TODO handle the exception
					
				}finally{
					uni.hideLoading()
				}
		
			}
		},
		computed:{
			isDisabled(){
				const username = this.registerInfo.username
				const email = this.registerInfo.email
				const password = this.registerInfo.password
				const confirmPassword = this.registerInfo.confirmPassword
				if(username && uni.$u.test.email(email) && password && confirmPassword && password === confirmPassword){
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
.register{
	padding: 40rpx;
	.register-title{
		font-size: 50rpx;
		font-weight: 700;
		text-align: center;
	}
	.register-content{
		margin-top: 50rpx;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.register-input-box{
			position: relative;
			height: 80rpx;
			border-bottom: 2rpx solid #ccc;
			// border-radius: 20rpx;
			.register-icon{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 10rpx;
			}
			.register-input{
				width: 100%;
				height: 100%;
				padding: 0 90rpx;
				box-sizing: border-box;
				outline: none;
			}
			.input-eye{
				position: absolute;
				right: 10rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	.register-submit{
		margin-top: 50rpx;
		padding: 0 30rpx;
		.register-btn{
			border-radius: 50rpx;
			border: 2rpx solid #666;
		}
	}
}
</style>
