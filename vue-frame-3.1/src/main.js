// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'style/icon/iconfont.css'
import 'style/index.less'
import initInterceptors from '@/common/httpHandlerInterceptor'
import globalVueFilter from '@/common/globalVueFilter'

Vue.config.productionTip = false

// 移动端的 根节点的自己的计算初始化
Fy.flexible(window, document)

// 加载插件
Vue.use(Resource)
Vue.use(Mint)

// 注册Vue0resources 的全局拦截handel
initInterceptors()
// 注册全局过滤器
globalVueFilter()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
