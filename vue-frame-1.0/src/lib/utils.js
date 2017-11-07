/*
 * $root 会在 app.vue 中被赋值为根组件 App
 */

let utils = {
  $root: {},
  /*
   * 可以在所有组件中使用
   * 在屏幕中上显示弹窗，3秒后自动关闭
   */
  danger (msg) {
    utils.$root.$dispatch('alert', {
      msg,
      type: 'danger'
    })
    return Promise.resolve()
  },
  success (msg) {
    utils.$root.$dispatch('alert', {
      msg,
      type: 'success'
    })
    return Promise.resolve()
  },
  errorHandler (err) {
    console.log(err)
  },
  confirm (text, status) {
    return this.$root.$refs.confirm.in(text, status)
  }
}

export default utils

