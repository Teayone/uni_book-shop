import {
	getUserInfo
} from '@/config/auth/user.js'
export default {
	namespaced: true,
	state() {
		return {
			isLogin: false,
			userInfo:null
		}
	},
	mutations: {
		changeIsLogin(state, bool) {
			state.isLogin = bool
		},
		changeUserInfo(state,info){
			state.userInfo = info
		}
	},
	actions: {
		// 页面刷新，请求用户状态，并存在 state 中
		async getUserInfoAsync({
			commit
		}) {
			try {
				const res = await getUserInfo()
				if (res.statusCode === 200) {
					console.log(res);
					commit('changeIsLogin', true)
					commit('changeUserInfo', res.data)
				}
				return true
			} catch (e) {
				// 如果请求失败，则标记为未登录
				commit('changeIsLogin', false)
				commit('changeUserInfo', null)
				return false
			}
		}
	}
}
