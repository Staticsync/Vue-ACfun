import getters from './getter.js';
const state = {
	isLogin: false,
	username: '',
	skinColor:true,
	showList:true,
	searchList:true,
	isListShow:true,
	searchbarShow:true

}
const mutations = {
	hasLogin: (state) => {
		state.isLogin = true
	},
	skinColor: (state) => {
    state.skinColor=true
	},

  showList: (state) => {
    state.showList=true
  },
  searchList: (state) => {
     state.searchList=true
  },
  isListShow: (state) => {
     state.isListShow=true
  },
  searchbarShow: (state) => {
    state.searchbarShow=true
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