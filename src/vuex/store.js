import Vue from 'vue'
import Vuex from 'vuex'
import login from '../components/personalCenter/login/Login'
import regist from '../components/personalCenter/regist/regist'
import judge from '../components/personalCenter/regist/judge'
import address from '../components/personalCenter/address/address'
import addAddress from '../components/personalCenter/address/addAddress'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		login,
		regist,
		judge,
		address,
		addAddress
	}
})