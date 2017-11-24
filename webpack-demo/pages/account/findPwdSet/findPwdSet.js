/**
 * Author: 柏 81962601
 * Create Date:2017/8/11 0007 9:02
 * Last Mondify Date:2017/8/11 0007 9:02
 */
(function ($, D){
    var Phone = D.uri().Phone;
    var $inputsAccount = $('.item-shortcut').find('.input-text'),
        $btn = $('.js-findPwdSet-btn'),
        pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    /**
     * 提交按钮点亮
     */
    D.loggingBtn($inputsAccount, $btn);
    /**
     * 焦点效果
     */
    $('body').on({
        focus: function (){
            $(this).parents('.input-base').addClass('login-focus');
        },
        blur: function (){
            $(this).parents('.input-base').removeClass('login-focus');
        }
    }, '.input-text');
    /**
     * 显示密码
     */
    $('.js-show-pwd').bind('click', function (){
        var $t = $(this),
            $inputPwd = $t.parents('.input-base').find('.input-text');
        if($inputPwd.attr('type') === "password"){
            $inputPwd.attr('type', 'text');
            $t.toggleClass('icon-login-close-pass icon-login-look-pass');
            $t.addClass('d-btn-on');
        } else {
            $inputPwd.attr('type', 'password');
            $t.removeClass('d-btn-on');
        }
    });
    /**
     * 提交
     */
    $btn.bind('click', function (){
        if($(this).hasClass('disabled')){
            return false;
        }
        var newPwdOne = D.trim($(".input-phone-code").val()),
            newPwdTwo = D.trim($(".input-pass").val());
        if(!newPwdOne.match(pattern)){
            D.msg("密码必须是6-20位数字字母组合");
            return false;
        }
        if(newPwdOne != newPwdTwo){
            D.msg("两次密码输入不一致");
            return false;
        }
        $.post(D.sites.urlRoot + '/member/changLoginPassword.html', {
            phoneNum: Phone, nowPwd: newPwdTwo
        }, function (data){
            if(data.status){
                location.href = D.sites.urlRoot + '/member/findPwdSuccess.html';
            } else {
                D.msg(data.info);
            }
            D.enableBtn($btn, true, '登录');
        });
    });
})(Zepto, DGG);
