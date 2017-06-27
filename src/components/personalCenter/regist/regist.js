import Vue from 'vue'
import http from '../../../utils/HttpClient'
import router from '../../../router/index'
import $ from 'jquery'

const state = {
}

const mutations = {
	regist:(data,formData) =>{
		// console.log(formData.grant_type)
		http.post('regist',formData)
		.then(response => {
			// console.log(response)
			if(response.status){
				router.push({name:'login'})
			}else{
				$.alert(response.message);
			}
		})
	}
}

const actions = {
	regist:(events,formDate) => {
		events.commit('regist',formDate)
	}
}
// const getters = {
// 	data: state => state.data
// }

export default {
	state,
	mutations,
	actions
}