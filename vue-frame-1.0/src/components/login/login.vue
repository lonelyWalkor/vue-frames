<template>
<div id="login">
  <div  class="w">
    <!--img src="../../assets/chinatobacco_c.png" class="logo"-->
  </div>
  <span class="line"></span>
  <span class="logintext">XX系统</span>
  <div class="login-cont">
    <div class="w">
      <div class="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;margin:-10px auto;">
          <h2>用户登录</h2>
        </div>
        <div  class="text item">
          <el-form ref="form" >
            <el-form-item  >
              <el-input v-model="username" placeholder="账号">
                <template slot="prepend"><i class="fa fa-user"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item >
              <div class="el-input el-input-group el-input-group--prepend" >
                <div class="el-input-group__prepend">
                  <i  class="fa fa-lock"></i>
                </div>
                <input type="password" placeholder="密码" autocomplete="off" class="el-input__inner" v-model="password" v-on:keyup.13="login">
              </div>
            </el-form-item>
            <el-form-item >
              <a style="float:right;font-size:10px;margin:-20px 0;" @click="forget">忘记密码</a>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" style="width:264px;">登录</el-button>
            </el-form-item>
            <!--el-form-item>
              <el-button type="" @click="dialogRegister = true" style="width:264px;">立即注册</el-button>
            </el-form-item-->
          </el-form>
        </div>
      </el-card>  
     
      </div>
    </div>
  </div>
  <div class="footer">
  	<h3 style="color:black">xx公司</h3>
  	<h4>Copyright @xx  <a href=""></a></h4>
  </div>
</div>
</template>

<script>
import api from 'src/api'
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

<style scoped>

.w {
    width: 990px;
    margin: 0 auto;
}
.login {
  width: 280px;
  float: right;
  position: relative;
  z-index: 4;
  background: #fff;
  overflow: visible;
  width: 346px;
  top: 40px;
}
.el-form-item {
  margin: 20px;
}
h2 {
  font-weight: 400;
}
.logintext{
	font-size: 18px;
	font-weight: bold;
	margin:20px 25px;
	float: left;
}
.line{
	float: left;
	border-right: solid 1px #666;
	width:5px;
	height:50px;
	margin-top:18px;
}
.footer{
	padding-bottom: 30px;
  text-align: center;
}
</style>
