<template>
  <div id="app" class="container_body">
    <p style="font-size: 2rem;">sdfgsdgdfsgdfg</p>
    <router-view/>
  </div>
</template>

<script>
import store from 'src/store'
export default {
  name: 'app',
  data () {
    return {
      state: store.state,
      actions: store.actions
    }
  },
  methods: {
  },
  mounted () {
    this.$nextTick(() => {
      this.actions.logout()
    })
    var that = this
    setTimeout(function () {
      that.actions.login()
    }, 2000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
