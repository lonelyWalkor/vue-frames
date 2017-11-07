import Home from 'components/views/home'


export default {
  routes: [
    { path: '/home', component: Home },

    { path: '/', redirect: '/home'}
  ]
}

