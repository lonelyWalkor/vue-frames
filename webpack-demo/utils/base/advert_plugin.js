(function () {
    /**
     * 廣告位代碼，
     * 2017/6/9
     * zhanghong
     */
    var timecount = 1;
    window.addEventListener('load',function () {
        //開起一個定時器，延時1000毫秒  以錯過load 回調邏輯的高峰執行時間段
        setTimeout(timeOurHander,100);
    });

    function timeOurHander() {
        timecount ++;
        var advlist = $(".dgg-adv-box");
        if(advlist.length == 0){
            return;
        }else{
            var ADids = "";
            advlist.each(function(index,value){
                var adv_box = $(value);
                if(adv_box.attr("isInit") == "1"){
                    return;
                }
                var advId = adv_box.attr("adv-id");
                adv_box.attr("isInit","1");
                ADids += ","+advId;
            });
            //console.log(ADids);
            loadADState(ADids.slice(1),advlist);
        }
        if(timecount >5){
            return;
        }
        setTimeout(timeOurHander,200*timecount);
    }

    function loadADState(ADids,advlist) {
        var baseurl = urlRoot || rootPath;
        if(ADids == null || ADids == ""){
            return;
        }
        $.ajax({
            type: "POST",
            url: baseurl + "AD/getADState.htm",
            data: {
                advId:ADids
            },
            dataType:"jsonp",
            success: function(data) {
                if(data.status){
                    if(data.rst == null){
                        return;
                    }

                    builADbox(data.rst,baseurl,advlist);

                }
            }
        });
    }

    function builADbox(list,baseurl,advlist) {
        var adv_box = $('.dgg-adv-box');
        for(var i=0;i<list.length;i++){
            var temp = list[i];
            if(temp.contentState != "1" || temp.data==null || temp.data.length<1){
                continue;
            }
            var advId = list[i].advId;
            adv_box.each(function (index, value) {
                //console.log(arguments);
                //console.log(adv_box);
                var adv_box = $(value);
                if(adv_box.attr("adv-id") != advId){
                    return;
                }
                var data = list[i];
                var type = data.adType;
                //var advId = data.advId;
                var width = adv_box.width();
                var height = adv_box.height();
                if(height == "auto"){
                    height = adv_box.height();
                }
                var ableClose = adv_box.attr("able-close");
                // console.log(adv_box,width,height);
                //adv_box.css("width",width);
                //adv_box.css("height",height);




                var iframe = document.createElement('iframe');
                iframe.width = width;
                iframe.height = height;
                iframe.scrolling = "no";
                $(iframe).css("border","none");
                //$(iframe).css("overflow","hidden");


                $(iframe).on("load",function () {
                    // console.log(this);
                    this.parentNode.style.display = "block";
                });
                if(type == 1){

                    iframe.src = baseurl + "AD/goImgAD.htm?ADid="+advId;


                }else if(type == 2){

                    iframe.src = baseurl + "AD/goAdviserAD.htm?ADid="+advId;

                }else if(type == 3){

                    iframe.src = baseurl + "AD/goGoodsAD.htm?ADid="+advId;

                }
                adv_box.empty().append(iframe);
                if(ableClose == "true" || ableClose == true){
                    adv_box.css("position","relative");
                    adv_box.append('<span onclick="this.parentNode.style.display = \'none\'" style="font-size: 14px;line-height: 16px;color: #fff;position: absolute;right: 10px;top: 10px;height: 16px;width: 16px;text-align: center;cursor: pointer;border-radius: 10px;background-color: rgba(0,0,0,0.4);display: inline-block;">×</span>');
                }
            })

        }

    }
})()