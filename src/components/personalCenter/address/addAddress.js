import Vue from 'vue'
import http from '../../../utils/HttpClient'
import router from '../../../router/index'

const state = {
	
}

const mutations = {
	save:(data,formData) =>{
		// console.log(formData.grant_type)
		http.post('saveAddress',formData)
		.then(response => {
			
			if(response.status){
				router.push({name:'address'})
			}
			// console.log(response)
			// state.data = Object.assign({},response)
		})
	}
}

const actions = {
	save:(events,formDate) => {
		events.commit('save',formDate)
	}
}

export default {
	state,
	mutations,
	actions
}