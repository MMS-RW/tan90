import Vue from 'vue'
import http from '../../../utils/HttpClient'
import router from '../../../router/index'

const state = {
	data:{

	}
}

const mutations = {
	judge:(data,formData) =>{
		// console.log(formData.grant_type)
		http.post('judge',formData)
		.then(response => {
			console.log(response)
			state.data = Object.assign({},response)
		})
	}
}

const actions = {
	judge:(events,formDate) => {
		events.commit('judge',formDate)
	}
}

export default {
	state,
	mutations,
	actions
}