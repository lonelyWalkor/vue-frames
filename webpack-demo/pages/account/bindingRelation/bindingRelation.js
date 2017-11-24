// require('../../../app.css');
require('../../../pages/account/bindingRelation/bindingRelation.css');
// require('../../../app.js');



/**
 * 解除绑定业务逻辑
 */
(function ($,D) {
    
    var rootPath = $("#rootPath").val();

    //不绑定按钮点击事件
    $("#cancel").on("click", function(e){
        e.preventDefault();
        location.replace( rootPath + "/personal/detail.shtml");
    });
    
    //解除绑定按钮点击事件
    $("#unBundle").on("click", function(e){
        e.preventDefault();
        D.sendData({
            url: rootPath + "/member/changWxBinding.shtml",
            data:{},
            su: function(res){
                if(!!res && res.status){
                    D.msg("解绑成功,1秒后跳转到用户中心");
                    setTimeout("location.href = '" + rootPath + "/personal/detail.shtml'", 1000);
                }else{
                    D.msg(res.info);
                }
            },
            fa: function(res){
                D.msg("网络请求错误");
            }
        });
    });

})(Zepto,DGG);