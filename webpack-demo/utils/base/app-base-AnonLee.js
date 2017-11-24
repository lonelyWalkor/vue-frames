(function ($, D){
    D._mix(D, {
        checkPhone: function (phone){
            return /^1[34578]\d{9}$/.test(phone);
        },
        //网络请求
        /**
         * options ={
         *       url 请求地址
         *       data 请求参数
         *       timeout 请求超时时间
         *       su   成功回调
         *       fa   失败回调
         *       cplt 完成回调
         *   }
         */
        sendData: function (options){
            var finalOptions = {
                type: "POST",
                su: function (res){
                    if(!!res && res.info){
                        DGG.msg(res.info);
                    } else {
                        DGG.msg("请求成功");
                    }
                },
                fa: function (){
                    DGG.msg("请求失败");
                },
                cplt: function (){
                },
                timeout: 5000
            }
            if(!!options && !!options.url){
                $.extend(finalOptions, options);
                $.ajax({
                    url: finalOptions.url,
                    data: finalOptions.data,
                    type: finalOptions.type,
                    timeout: finalOptions.timeout,
                    success: finalOptions.su,
                    error: finalOptions.fa,
                    complete: finalOptions.cplt
                });
            } else {
                DGG.msg("请求参数错误");
            }
        },
        /**
         * yyyyMM --> yyyycharMM ,char default -
         * @param monthDate
         * @returns {*}
         */
        formatMonthStr: function (monthDate, char){
            if(!monthDate){
                return "";
            }
            char = char || "-";
            var dateString = monthDate;
            return dateString.substring(0, 4) + char + dateString.substring(4, 6);
        },
        /**
         * 反转字符串
         * @param str
         */
        reverseString: function (str){
            var result = "";
            var len;
            if(!!str && (len = str.length) > 0){
                for (; len >= 0; len--) {
                    result += str.charAt(len);
                }
            }
            return result;
        },
        /**
         * 获取obj在arr数组中第一次出现的索引位置，无结果时返回-1
         * @param arr
         * @param obj
         */
        arrIndexOf: function (arr, obj){
            var result = -1;
            if(arr.constructor.name === "Array"){
                for (var i = 0, j = arr.length; i < j; i++) {
                    if(arr[i] == obj){
                        result = i;
                        break;
                    }
                }
            }
            return result;
        },
        /**
         * 截取日期字符串指定日期类型
         * @param timeString
         * @param tag
         * @param callback
         * @returns {*}
         */
        getTimeCharFrom: function (timeString, tag, callback){
            var type = D.isFunction(tag);
            if(type){
                callback = tag;
            } else {
                if(D.isArray(tag)){
                    return timeString.substring(tag[0], tag[1]);
                }
                if(D.isNumber(tag)){
                    timeString = timeString + "";
                    return {
                        1: timeString.substring(0, 4),//year
                        2: timeString.substring(4, 6), //month
                        3: timeString.substring(6, 8), //day
                        4: timeString.substring(8, 10),//hour
                        5: timeString.substring(10, 12),//minutes
                        6: timeString.substring(12, 14) //second
                    }[tag]//seconds
                }
            }
            callback && callback.call(null, timeString);
        },
        isPhoneNumber: function (phoneNumber){
            if(!!phoneNumber){
                return /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(phoneNumber);
            }
            return false;
        }
    });
})(Zepto, DGG);