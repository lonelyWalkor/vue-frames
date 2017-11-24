/**
 * 柏 2017/8/17
 */
(function ($, D){
    D._mix(D, {
        countDownTiem: function (id, href, callback){
            if(!document.getElementById(id)){
                console.warn('countDownTiem is '+id+' null');
                return false;
            }
            var second = document.getElementById(id).textContent || 6,
                Explorer = navigator.appName.indexOf("Explorer") > -1,
                href = document.getElementById(id).getAttribute("data-href") || href,
                _this = this;
            Explorer && (second = document.getElementById(id).innerText || 6);
            var timer = D.later(function (){
                callback && callback.call(_this, second);
                second--;
                if(second < 0){
                    Explorer ? (document.getElementById(id).innerText = 0) : (document.getElementById(id).textContent = 0);
                    timer.cancel();
                    location.href = href;
                } else {
                    Explorer ? (document.getElementById(id).innerText = second--) : (document.getElementById(id).textContent = second--);
                }
            }, 1000, true);
        }
    });
    D.countDownTiem('totalSecond');
})(Zepto, DGG);