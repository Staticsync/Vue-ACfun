import getters from './getter.js';
const state = {
	isLogin: false,
	username: '',
}
const mutations = {
	hasLogin: (state) => {
		state.isLogin = true
	},
	noLogin: (state) => {
		state.isLogin = false
	},
	setUsername: (state, username) => {
		state.username = username
	},
}
export default {
	getters,
	state,
	mutations
}