import Vue from 'vue'

export default {
  signin (data) {
    return Vue.http.post('user/login', data)
  },
  signout () {
    return Vue.http.get('user/logout')
  },
  me () {
    return Vue.http.get('user/islogin')
  },
  all () {
    return Vue.http.get('user/all')
  },
  addup (data) {
    return Vue.http.post('user/addup', data)
  },
  del (data) {
    return Vue.http.post('user/delete', data)
  },
  getAllLog (data) {
    return Vue.http.post('user/getAllLog', data)
  },
}
