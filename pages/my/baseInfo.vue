<template>
	<view class="page-base_info">
		<template v-if="isLoginState">
			<u--form labelPosition="left" ref="form1" :model="model1" :rules="rules">
				<u-form-item label="昵称" prop="userInfo.name" borderBottom ref="item1" required>
					<u--input border="none" v-model="model1.userInfo.name"></u--input>
				</u-form-item>
			</u--form>
			<u-button class="submit-btn" @click="submit">提交</u-button>
		</template>
		<template v-else>
			<u-loading-page :loading="true" loadingText=""></u-loading-page>
		</template>
	
	</view>
</template>

<script>
	import { updateUserInfo,getUserInfo } from '@/config/auth/user.js'
	import { navigateTo } from '@/utils/index.js'
	export default {
		data() {
			return {
				model1: {
					userInfo: {
						name: this.$store.state.login.userInfo ? this.$store.state.login.userInfo.name : '',
					},
				},
				showLoading:false,
				rules: {
					'userInfo.name': [
						{
							type: 'string',
							required: true,
							message: '请填写昵称',
							trigger: ['blur', 'change']
						},
						{
							pattern:/^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '不能包含特殊字符'
						}
					]
				}
			}
		},
		onLoad(){
			this.getLoginState()
		},
		methods: {
			 getLoginState(){
				setTimeout(()=>{
					if(!this.$store.state.login.isLogin){
						navigateTo('reLaunch','pages/index/index')
					}
				},1000)
			},
			submit() {
				this.$refs.form1.validate().then(async (value) => {
					const res = await updateUserInfo({name:this.model1.userInfo.name})
					if(res.statusCode === 204){
						// 更新 vuex 用户信息
						const userInfo = await this.$store.dispatch('login/getUserInfoAsync')
						uni.$u.toast('修改个人信息成功')
					}
				}).catch(errors => {
				
				})
			}
		},
	  watch:{
			'$store.state.login.isLogin'(newVal){
				if(newVal){
					this.model1.userInfo.name = this.$store.state.login.userInfo.name
				}
			}
		},
		computed:{
			isLoginState(){
				return this.$store.state.login.isLogin
			}
		}
	
	}
</script>

<style lang="scss" scoped>
.page-base_info{
	padding: 40rpx;
	.submit-btn{
		margin-top: 40rpx;
		background-color: deepskyblue;
		color: #fff;
	}
}
</style>
