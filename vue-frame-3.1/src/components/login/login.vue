<template>
  <div id="login">
    <div class="aaa"></div>
  </div>
</template>

<script>
  import store from 'src/store'

  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
        action: store.actions
      }
    },
    methods: {
      login () {
        this.action.login()
      },
      forget () {}
    },
    mounted () {
      this.$nextTick(() => {
      })
    }
  }
</script>

<style scoped lang="less">
.container_body{
  background-color: #000;
  .aaa{
    width:500px;
  }
}
</style>
