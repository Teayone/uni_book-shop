<script>
	import { isLogin } from '@/utils/index.js'
	export default {
		onLaunch: async function() {
			await isLogin(this,false)
			// if(uni.getStorageSync('access_token')){
			// 		this.$store.dispatch('login/getUserInfoAsync')
			// }
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
		@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
</style>
