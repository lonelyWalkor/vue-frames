<template>
  <div id="mymenu"> 
        <el-menu 
        mode="vertical" 
        default-active="1" 
        class="side-nav" 
        @open="handleOpen" 
        @close="handleClose" 
        theme="light"
        :default-active = "paths"
        router>
          <el-menu-item-group>
            <div v-for="(m1,mindex) in menuinfo">
              <el-menu-item  :index="m1.link" v-if="!m1.second" >
              	<i :class="m1.icon"></i>
                <span style="margin-left:-4px">{{m1.title}}</span>
              </el-menu-item>
              <el-submenu v-bind:index="setindex([mindex])" v-if="m1.second && m1.second.length">
                <template slot="title"><i :class="m1.icon" class="icon" style="margin-right: 20px;color: rgb(32, 160, 255);"></i>{{m1.title}}</template>
                <div v-for="(m2,m2in) in m1.second">
                  <el-menu-item  :index="m2.link" >
                    <span style="padding-left: 17px;">{{m2.title}}</span>
                  </el-menu-item>
                </div>
                
              </el-submenu>
            </div>
        </el-menu-item-group>

        </el-menu>
  </div>
</template>

<script>
import store from 'src/store'
import _ from 'lodash'
import api from 'src/api'

export default {
  name: 'mymenu',
  data () {
    return {
      menuinfo: [{
            title: '首页',
            icon: 'fa fa-home',
            link:'/home'
          }]
    }
  },
  computed: {
  },
  methods: {
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #FFFFFF;
  text-decoration: none; 
}
.profile_info {
    padding: 0px 48px;    
}
.profile_info span{
   color: #FFFFFF;
   font-size: 18px;  
}
.side-nav {

}
.logo {
  margin-left: 1px; 
  margin-top: -10px;
}
.logintext{
	font-size: 20px;
}
.fa {
  margin-right: 10px;
  font-size: 22px;
}
</style>
