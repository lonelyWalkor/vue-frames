/**
 * 压面按住奥格式配置到下面的选项中，key 为文件名，不允许自定义，
 * 以  下划线“_”开的的项为公共项目将会注入到所有html页面中
 * 
 */
const pages_config = {
//	pages: {
//		"account/bindingRelation/bindingRelation": './pages/account/bindingRelation/bindingRelation',
//		"account/findPwd/findPwd": './pages/account/findPwd/findPwd',
//		"account/findPwdSet/findPwdSet": './pages/account/findPwdSet/findPwdSet',
//	},
	common_js:{
		app: "./app",
	},
//	common_css:{
//		"account/findPwd/findPwd": "./pages/account/findPwd/findPwd"
//	}
}

module.exports = pages_config;