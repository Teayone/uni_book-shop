export const isLogin = (vm,bool=true) => {

	return new Promise((resolve,reject)=>{
		if(uni.getStorageSync('access_token') && vm.$store.state.login.isLogin) {
			resolve(true)
			return
		}else if(uni.getStorageSync('access_token') && !vm.$store.state.login.isLogin){
			vm.$store.dispatch('login/getUserInfoAsync').then(v=>{
				if(!v){
					resolve(false)
					handleLoginState(bool)
				}else{
					resolve(true)
				}
			})
		}else{
			resolve(false)
			handleLoginState(bool)
		}
	})

}

export const navigateTo = (type,url,delay=800) => {
	setTimeout(()=>{
		uni.$u.route({
			type,
			url
		})
	},delay)
	uni.$u.toast('请先登录')
}
// 获取页面请求参数
const getQuery = (options) => {
	const res = Object.keys(options)
	let str = ''
	if(res.length>0){
		str = res.reduce((pre, current) => {
			return pre + current + "=" + options[current] + "&";
		}, "?")
		.slice(0, -1);
	}
	return str
};

export const handleLoginState = (type,bool=true,delay=800) => {
	if(bool){
		const currentPage = getCurrentPages().pop()
		const { route,options } = currentPage
		console.log(route);
		const params = getQuery(options)
		uni.setStorageSync('back_url',route + params) // 获取来源页，登陆成功后跳回来源页
		navigateTo(type,'pages/auth/login',delay)
	}
}