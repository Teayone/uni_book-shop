// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = 'https://api.shop.eduwork.cn'; /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		config.header.Authorization = 'Bearer ' + uni.getStorageSync('access_token')
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		// const data = response.data
		return response
	},(error)=>{
		const data = error.data
		if (error.statusCode == 400) {
			uni.$u.toast(data.message)
			return Promise.reject(error)
		} else if (error.statusCode == 401) {
			// if(data.message === 'Unauthorized'){
			// 		uni.$u.toast('账号或密码错误')
			// }else{
			// 	// // 如果请求了需要登陆的 API 跳转到登录页
			// 	uni.$u.toast('验证失败，请重新登录')
			// 	setTimeout(() => {
			// 		uni.$u.route({
			// 			type:'redirect',
			// 			url: 'pages/auth/login'
			// 		})
			// 	}, 1500)
			// }
			return Promise.reject(error)
		} else if (error.statusCode == 422) {
			const {
				errors
			} = data
			// 表单验证未通过
			uni.$u.toast(Object.values(errors)[0][0])
			return Promise.reject(error)
		}
	})

	// 追加 patch
	uni.$u.http.patch = (url, params = {}, header = {}) => {
		// 模拟 patch 请求
		const _params = {
			_method: 'PATCH',
			...params
		}
		return uni.$u.http.post(url, _params, header)
	}

}
