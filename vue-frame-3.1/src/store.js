export const state = {

  user: {},
  /*
   * Int isLogin
   * -1：未知，0：未登录，1：已登录
   */
  isLogin: -1
}
export let actions = {
  login (userinfo, permission) {
    state.isLogin = 1
  },
  logout () {
    state.user = {}
    state.isLogin = 0
  },
  notLogin () {
    state.isLogin = 0
  }
}

export default {
  state,
  actions
}
