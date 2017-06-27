import Vue from 'vue'
import http from '../../../utils/HttpClient'
import router from '../../../router/index'
import $ from 'jquery'

const state={
	data:{

	}
}

const mutations = {
	login: (data,formdata) =>{
		http.post('login', formdata)
		.then(response => {
			if(response.status){
				// console.log(response)
				window.localStorage.setItem('user',JSON.stringify({username:response.data.username,phone:response.data.phone,email:response.data.email}));
				router.push({name:'personal'})
			}else{
				$.alert(response.message)
			}
		})
	}
}

const actions = {
	login: (events,formdata) => {
		// console.log('111',events,formdata)
		events.commit('login',formdata)
	}
}

// const getters = {
// 	data: state => state.data
// }
export default {
	state,
	mutations,
	actions
	// getters
}