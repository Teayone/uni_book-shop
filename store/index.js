import Vuex from 'vuex'
import Vue from 'vue'
import  Login  from './login/login.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state(){
		return {}
	},
	mutations(){},
	actions(){},
	modules:{
		login:Login
	}
})
export default store