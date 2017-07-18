export default {
  login: (state) => {
    return state.isLogin
  },
  username: (state) => {
    return state.username
  },
  skinColor: (state) => {
    return state.skinColor;
  },
  showList: (state) => {
    return state.showList;
  },
  searchList: (state) => {
    return state.searchList;
  },
  isListShow: (state) => {
    return state.isListShow;
  },
  searchbarShow: (state) => {
    return state.searchbarShow;
  },
}
