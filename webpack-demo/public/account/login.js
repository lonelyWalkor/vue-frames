/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports) {

/**
 * Author: 柏 81962601
 * Create Date:2017/8/11 0007 9:02
 * Last Mondify Date:2017/8/11 0007 9:02
 */
(function ($, D){
    var loginPhone, loginCcount, init,
        $btnShortcut = $('.dgg-btn-1'),
        $btnAccount = $('.dgg-btn-2');
    D._mix(D, {
        tabLogin: (function (){
            var $tab = $('.dgg-login-tab');
            var $itemCon = $tab.find('.dgg-login-tab-main .item-con');
            $tab.on('click', '.dgg-login-tab-nav li', function (event){
                event.stopPropagation();
                event.preventDefault();
                var $t = $(this);
                if($t.hasClass('on')){
                    return false;
                }
                $t.addClass('on').siblings('li').removeClass('on');
                $itemCon
                    .eq($t.index()).css('display', 'block')
                    .siblings().css('display', 'none');
            });
        })(),
        inputFocus: function (){
            // 焦点事件
            $('body')
                .on({
                    focus: function (){
                        $(this).parents('.input-base').addClass('login-focus');
                    },
                    blur: function (){
                        $(this).parents('.input-base').removeClass('login-focus');
                    }
                }, '.input-text')
                // 清除手机号
                .on('click', '.js-close-text1', function (){
                    $(this).parents('.input-base').find('.input-text').val('').focus();
                    D.enableBtn($btnShortcut, false);
                })
                // 清除手机号
                .on('click', '.js-close-text2', function (){
                    $(this).parents('.input-base').find('.input-text').val('').focus();
                    D.enableBtn($btnShortcut, false);
                })
                // 密码显示隐藏
                .on('click', '.icon-login-close-pass', function (){
                    var $t = $(this),
                        $isshow = $t.parents('.input-base').find('.input-pass'),
                        isshow = $isshow.attr('type');
                    if(isshow == "text"){
                        $isshow.attr('type', 'password');
                        $t.removeClass('icon-login-look-pass');
                    } else {
                        $isshow.attr('type', 'text');
                        $t.addClass('icon-login-look-pass');
                    }

                });
        },
        /**
         * 按钮显示效果
         */
        loggingbtn: function (){
            if(D.UA.ios < 9){
                $btnShortcut.removeAttr('disabled').removeClass('disabled');
                $btnAccount.removeAttr('disabled').removeClass('disabled');
                return false;
            }
            // 快捷
            var $inputsShortcut = $('.item-shortcut').find('.input-text');
            D.loggingBtn($inputsShortcut, $btnShortcut);
            // 账号
            var $inputsAccount = $('.item-account').find('.input-text');
            D.loggingBtn($inputsAccount, $btnAccount);
        },
        /**
         * 账号验证
         * @param params
         * @returns {boolean}
         */
        validationAccount: function (params){
            var numberReg = /^[0-9]*$/;
            if(!numberReg.test(params.userName)){
                D.msg('登录帐号格式不正确！');
                return false;
            }
            if(params.password.length < 6){
                D.msg('登录密码至少6位！');
                return false;
            }
            return true;
        },
        /**
         * 快捷登陆验证
         */
        validationShortcut: function (params){
            if(!D.isMobile(params.phoneNumber)){
                D.msg('手机号码错误');
                return false;
            }
            if(params.verifyCode.length < 6){
                D.msg('验证码错误');
                return false;
            }
            return true;
        }
    });
    // 快捷登录
    loginPhone = function (){
        var $btn = $('.dgg-btn-1'),
            $shortcut = $('.item-shortcut'),
            $phoneInput = $shortcut.find('.input-phone-code'),
            $codeInput = $shortcut.find('.input-pass');
        $('.login-get-code').bind('click', function (){
            var $t = $(this);
            var shortcutVal = parseInt(D.trim($phoneInput.val()));
            if($t.hasClass('disabled')) return false;
            if(D.isMobile(shortcutVal)){
                $('.login-get-code').getCodeTimer();
                $.post(D.sites.urlRoot + '/member/getVerifyCode.html', {phoneNumber: shortcutVal}, function (data){
                    D.msg(data.info);
                });
            } else {
                D.msg('请输入正确的手机号码');
            }
        });
        // 登录
        $btn.on('click', function (){
            if(!$btn.hasClass('disabled')){
                var shortcutVal = parseInt(D.trim($phoneInput.val())),
                    numberReg = D.trim($codeInput.val()),
                    params = {
                        phoneNumber: shortcutVal,
                        verifyCode: numberReg,
                        wxobj: D.sites.wxobj,
                        loginType: '1',
						shareId:shareId
                    };
                if(!D.validationShortcut(params))return false;
                D.enableBtn($btnShortcut, false, '登录中……');
                $.ajax({
                    url: D.sites.urlRoot + '/member/verifyLogin.html',
                    data: params,
                    success: function(data){
                        if(data.status){
                            var rdata = JSON.parse(data.data);
                            var isAdviser = rdata.isAdviser;
                            if(1 == isAdviser){
                                location.href = D.sites.urlRoot + '/adviserCenter/index.shtml';
                            }else{
                                if(rdata.noBindingFlag){
                                    location.href = D.sites.urlRoot + '/wxMember/center.shtml?noBindingFlag=1';
                                } else {
                                    location.href = D.sites.urlRoot + '/wxMember/center.shtml';
                                }
                            }
                        } else {
                            D.msg(data.info);
                        }
                        D.enableBtn($btnShortcut, true, '登录');
                    },
                    error: function(){
                        D.msg("网络请求失败,请稍后尝试");
                        setTimeout(D.enableBtn($btnAccount, true, '登录'), 2000);
                    }
                });
            }
        });
    };
    // 账号登录
    loginCcount = function (){
        var $btn = $('.dgg-btn-2'),
            $account = $('.item-account'),
            $accountInput = $account.find('.input-phone-code'),
            $passwordInput = $account.find('.input-pass');
        $btn.on('click', function (){
            if(!$btn.hasClass('disabled')){
                var accountVal = parseInt($accountInput.val()),
                    numberReg = $passwordInput.val(),
                    params = {
                        userName: accountVal,
                        password: numberReg,
                        wxobj: D.sites.wxobj,
                        loginType: '2'
                    };
                if(!D.validationAccount(params))  return false;
                D.enableBtn($btnAccount, false, '登录中……');
                $.ajax({
                    url: D.sites.urlRoot + '/member/verifyLogin.html',
                    data: params,
                    success: function(data){
                        if(data.status){
                            var rdata = JSON.parse(data.data);
                            var isAdviser = rdata.isAdviser;
                            if(1 == isAdviser){
                                location.href = D.sites.urlRoot + '/adviserCenter/index.shtml';
                            }else{
                                if(rdata.noBindingFlag){
                                    location.href = D.sites.urlRoot + '/wxMember/center.shtml?noBindingFlag=1';
                                } else {
                                    location.href = D.sites.urlRoot + '/wxMember/center.shtml';
                                }
                            }
                        } else {
                            D.msg(data.info);
                        }
                        D.enableBtn($btnAccount, true, '登录');
                    },
                    error: function(data){
                        D.msg("网络请求失败,请稍后尝试");
                        setTimeout(D.enableBtn($btnAccount, true, '登录'), 2000);
                    }
                });
            }
        });
    };
    init = function (){
        loginPhone();
        loginCcount();
        D.inputFocus();
        D.loggingbtn();
    };
    init();
})(Zepto, DGG);


/***/ })

/******/ });