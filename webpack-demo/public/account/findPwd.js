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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ (function(module, exports) {

/**
 * Author: 柏 81962601
 * Create Date:2017/8/11 0007 9:02
 * Last Mondify Date:2017/8/11 0007 9:02
 */
(function ($, D){
    var
        $inputsAccount = $('.item-shortcut').find('.input-text'),
        $btn = $('.js-findpwd-btn'),
        url = ['/member/getVerifyCode.html', 'member/changPwdLogin.html'],
        _validationShortcut,
        _bindshow,
        _findPwd,
        init;
    /**
     * 验证工具
     */
    _validationShortcut = function (params){
        if(!D.isMobile(params.phoneNumber)){
            D.msg('手机号码错误');
            return false;
        }
        if(params.verifyCode.length < 6){
            D.msg('验证码错误');
            return false;
        }
        return true;
    };
    /**
     * 视图效果
     * @private
     */
    _bindshow = function (){
        // 焦点效果
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
                D.enableBtn($btn, false);
            });
        D.loggingBtn($inputsAccount, $btn);
    };
    /**
     * 找回密码
     */
    _findPwd = function (){
        var $shortcut = $('.item-shortcut'),
            $phoneInput = $shortcut.find('.input-phone-code'),
            $codeInput = $shortcut.find('.input-pass');
        // 获取验证码
        $('.login-get-code').bind('click', function (){
            var $t = $(this),
                shortcutVal = parseInt(D.trim($phoneInput.val()));
            if($t.hasClass('disabled'))return false;
            if(D.isMobile(shortcutVal)){
                $('.login-get-code').getCodeTimer({time: 90});
                $.post(D.sites.urlRoot + url[0], {
                    phoneNumber: shortcutVal, vcodeType: '3'
                }, function (data){
                    D.msg(data.info);
                });
            } else {
                D.msg('请输入正确的手机号码');
            }
        });
        // 登录
        $btn.bind('click', function (){
            var $t = $(this);
            if(!$btn.hasClass('disabled')){
                var shortcutVal = parseInt(D.trim($phoneInput.val())),
                    numberReg = D.trim($codeInput.val()),
                    params = {
                        phoneNumber: shortcutVal,
                        verifyCode: numberReg,
                        wxobj: D.sites.wxobj,
                        loginType: '1'
                    };
                if(!_validationShortcut(params)){
                    return false;
                }
                D.enableBtn($t, false);
                $.post(D.sites.urlRoot + url[1], params, function (data){
                    if(data.status){
                        D.enableBtn($t, true);
                        window.location.href = D.sites.urlRoot + 'member/findPwdSet.html?Phone=' + params.phoneNumber;
                    } else {
                        D.msg(data.info);
                    }
                    D.enableBtn($t, true);
                });
            }
        });
    };
    init = function (){
        _bindshow();
        _findPwd();
    };
    init();
})(Zepto, DGG);


/***/ })

/******/ });