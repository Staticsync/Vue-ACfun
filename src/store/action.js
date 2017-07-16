export default {
	hasLogin: ({ commit }) => {
		if(window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
			commit('hasLogin')
		}else {
			console.log('没有登录')
		}	
	},
	noLogin: ({ commit }) => {
		if(window.localStorage.getItem('username') == null && window.localStorage.getItem('password') == null){
			commit('noLogin')
		}
	},
	setUsername: ({ commit }, username) => {
		commit('setUsername', username)
	},
	setImgurl: ({commit}, imgurl) => {
		commit('setImgurl', imgurl)
	},
	getInitShowBanner() {
       return new Promise((resolve, reject) => {
        Vue.axios.get('http://api.bilibili.com/x/web-show/res/loc?callback=jQuery17205969745067413896_1482805801285&jsonp=jsonp&pf=0&id=23&_=1482805801599')
          .then(res => {
            // resolve(res.data.showBanner)
            console.log(res.data)
          })
      })
     },
}