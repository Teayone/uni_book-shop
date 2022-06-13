<template>
	<view class="my" >
		<template v-if="isLoginState">
			<view class="my-info">
				<view class="my-info-avator" @click="toUpload">
					<image class="avator" :src="avatar"></image>
				</view>
				<view class="my-info-content text_overflow">
					<view class="my-info-content_name text_overflow">
						{{username? username: '登录'}}
					</view>
					<view class="my-info-content_email text_overflow">
					{{email ? '邮箱：'+email:''}}
					</view>
				</view>
			</view>
			<view class="my-cell">
				<u-cell-group>
					<u-cell icon="account" title="个人信息" :isLink="true" arrow-direction="right" @click="toBaseInfo"></u-cell>
				</u-cell-group>
			</view>
			<view class="my-cell">
				<u-cell-group>
					<u-cell icon="rmb-circle" title="全部订单" :isLink="true" arrow-direction="right"></u-cell>
					<u-cell icon="star" title="商品收藏" :isLink="true" arrow-direction="right"></u-cell>
					<u-cell icon="map" title="收获地址" :isLink="true" arrow-direction="right"></u-cell>
				</u-cell-group>
			</view>
			<button class="logout" @click="logout">退出登录</button>
		</template>
		<template v-else>
			<u-loading-page :loading="true" loadingText=""></u-loading-page>
		</template>
	</view>
	
</template>

<script>
	import { handleLoginState } from '@/utils/index.js'
	import { logout as requestLogout } from '@/config/auth/login.js'
	export default {
		data() {
			return {
				showLoading:false
			}
		},
		async onLoad() {
			this.getData()
		},
		methods: {
		  getData() {
				setTimeout(()=>{
					if(!this.$store.state.login.isLogin){
						handleLoginState('redirect')
					}
				},800)
			},
			toBaseInfo(){
				uni.$u.route({
					type:'navigateTo',
					url:'pages/my/baseInfo'
				})
			},
			toUpload(){
				uni.$u.route({
					url:'pages/my/avator'
				})
			},
			// 退出登录
			async logout(){
				uni.showLoading({
					title:'正在退出登录'
				})
				const res = await requestLogout()
				if(res.statusCode === 204){
					uni.$u.toast('退出成功')
					setTimeout(()=>{
						uni.removeStorageSync('access_token')
						this.$store.commit('login/changeIsLogin',false)
						this.$store.commit('login/changeUserInfo',null)
						uni.$u.route({
							type:'reLaunch',
							url:'pages/index/index'
						})
					},1000)
				}
			}
		},
	
	computed:{
		username(){
			return this.$store.state.login.userInfo ? this.$store.state.login.userInfo.name : ''
		},
		email(){
			return this.$store.state.login.userInfo ? this.$store.state.login.userInfo.email : ''
		},
		avatar(){
			return this.$store.state.login.userInfo ? this.$store.state.login.userInfo.avatar_url : ''
		},
		isLoginState(){
			return this.$store.state.login.isLogin
		}
	}
	
	}
</script>

<style lang="scss">
	.my {
		height: 100vh;
		background-color: #f1f2f3;

		.my-info {
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			background-color: #fff;

			.my-info-avator {
				width: 150rpx;
				height: 150rpx;
				background-color: #f1f2f3;
				border-radius: 50%;
				overflow: hidden;
				flex-shrink: 0;

				.avator {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.my-info-content {
				padding-left: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 150rpx;

				.my-info-content_name {
					font-size: 40rpx;
					font-weight: 700;
				}

				.my-info-content_email {
					color: #bcbcbc;
					font-size: 28rpx;
				}
			}
		}

		.my-cell {
			background-color: #fff;
			margin: 10rpx 0;
		}
		.logout{
			margin: 40rpx;
			background-color: #ff3333;
			color: #fff;
			font-size: 28rpx
		}
		.loading{
			text-align: center;
			font-weight: 600;
			font-size: 40rpx
		}
	}
</style>
