import http from '../../../utils/HttpClient'
import Vue from 'vue'


const state = {

}

const mutations = {
	address:(data,formData) => {
		http.get('fetchAddress',formData)
		.then(response => {
			// console.log(response)
			state.data = Object.assign({},response)
		})
	}
}


const actions = {
	address:(events,formData) => {
		events.commit('address',formData)
	}
}

const getters = {
	getMsg:state => state.data
}
export default {
	state,
	mutations,
	actions,
	getters
}