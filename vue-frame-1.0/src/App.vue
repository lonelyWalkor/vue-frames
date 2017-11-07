<template>
  <div id="app">
    <login v-if="state.isLogin === 0"></login>
    <div v-if="state.isLogin === 1" class="appcontainer">
      <div  class="side-nav">
        <mymenu></mymenu>
      </div>
      <div class="right-content">

        <section class="content">
          <router-view></router-view>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import mymenu from './components/menu'
import login from './components/login/login'
import api from 'src/api'
import store from 'src/store'
import utils from 'src/lib/utils'

export default {
  name: 'app',
  data () {
    return {
      state: store.state,
      action: store.actions,
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    login,
    mymenu
  },
  methods: {
  },
  mounted () {
    this.$nextTick(() => {
        //this.action.logout()
        //utils.danger("haahhah",1);
        console.log(this)
    })
  }
}
</script>

<style>
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 13px;
  font-family: Tahoma,Verdana;
  font-weight: 400;
  line-height: 1.471;
}
h3{
	color:#5f6468;
}
html {
  height: 100%;
  margin: 0; 
  padding: 0;
}
#app{
	margin-top:0;
  height: 100%;
}
.appcontainer {
  height: 100%;
}
.right-content {
  margin-left: 220px;
  height: 100%;
}
.content {
  right: 10px;
  left: 235px;
  bottom: 0px;
  background-color: white;
  position: fixed;
  top:85px;
}

.container, .page-container {
    padding: 0 30px;
    margin: 0 auto;
}
.header .nav {
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
}

.side-nav {
  width: 220px;
  height: 100%;
  /*background-color: rgb(50, 65, 87);*/
  position: fixed;
}


.pull-right{
  margin:0px 10px 8px 0;
}


</style>
