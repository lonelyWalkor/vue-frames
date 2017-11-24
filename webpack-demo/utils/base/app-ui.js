/**
 * Product Name Style
 * Author: 柏 81962601
 * Create Date:2017/8/7 0007 11:46
 * Last Mondify Date:2017/8/7 0007 11:46
 */



(function ($, D, doc, win){
    D._mix(D, {
        /**
         *
         * @param options
         */
        fontSize: (function (options){
            var defaults = {
                    setup: '100*640'
                },
                opts = $.extend(true, {}, defaults, options),
                docEl = doc.documentElement,
                str = opts.setup.split('*'),
                size = str[0],
                Windth = str[1],
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function (){
                    var clientWidth = docEl.clientWidth;
                    if(!clientWidth) return;
                    if(D.config('setWindow').setUpSize){
                        docEl.style.fontSize = size * (clientWidth / Windth) + 'px';
                    } else {
                        if(clientWidth >= Windth){
                            docEl.style.fontSize = size + 'px';
                        } else {
                            docEl.style.fontSize = size * (clientWidth / Windth) + 'px';
                        }
                    }
                };
            if(!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
            $(doc).ready(function ($){
                $('body').removeClass('dgg-layout');
            });
        })({setup: $('body').data('layout')}),
        /**
         *
         * @param attr
         * @param loadFun
         * @param callback
         */
        attrJudge: function (attr, loadFun, callback){
            if(typeof window[attr] !== "undefined"){
                loadFun();
            }
            callback && callback();
        },
        /**
         * random
         */
        notData: function (){
            D.getLogger('notData').warn('Please remove “D.notData” This is just a demonstration');
            return Math.random() > 0.5;
        },
        /**
         *
         * @param option
         */
        showNothing: function (option){
            var opt = $.extend({word: '没有数据', icon: 'dgg-icon-nodata-130x163', skin: '', css: null}, option || {}),
                $html = $(D.format('<div class="dgg-box-nodata {skin}"><div class="dgg-box-nodata-text">{word}</div></div>', opt));
            opt.icon && $html.find('.dgg-box-nodata-text').prepend(D.format('<i class="dgg-box-nodata-icon {0}"></i>', opt.icon));
            option && opt.css && $html.css(opt.css);
            return $html.get(0).outerHTML;
        },
        /**
         * @param $btn
         * @param enabled
         * @param word
         * @returns {boolean}
         */
        enableBtn: function ($btn, enabled, word){
            if(!$btn)
                return false;
            var DISABLED = 'disabled',
                DATA_NAME = 'cache_html';
            if(D.isUndefined(enabled)){
                enabled = $btn.hasClass(DISABLED);
            } else {
                if(enabled == !$btn.hasClass(DISABLED)){
                    return false;
                }
            }
            if(enabled){
                $btn.removeClass(DISABLED).removeAttr(DISABLED);
                word = $btn.data(DATA_NAME);
                word && $btn.html(word);
            } else {
                $btn.addClass(DISABLED).attr(DISABLED, DISABLED);
                if(word){
                    $btn.data(DATA_NAME, $btn.html());
                    $btn.html(word);
                }
            }
        },
        /**
         * pageLoaded
         */
        pageLoaded: {
            start: function (options){
                D.layer.pageLoaded = D.layer.open($.extend({
                    type: 2,
                    content: '加载中'
                }, options));
            },
            done: function (){
                D.layer.close(D.layer.pageLoaded);
            }
        },
        /**
         * @param obj
         */
        loading: {
            start: function (obj){
                obj.prepend('<div class="dgg-loading"><i></i></div>');
            },
            done: function (obj){
                obj.find('.dgg-loading').remove();
            }
        },
        loggingBtn: function ($inputs, $btn){
            $inputs.bind('keyup', function (){
                var count = 0;
                $inputs.each(function (i, item){
                    var text = D.trim($(item).val());
                    if(text && text.length > 0){
                        count++;
                    }
                });
                count == $inputs.length ?
                    D.enableBtn($btn, true) :
                    D.enableBtn($btn, false);
            });
        },
        delval: function (){
            $(document).on({
                focus: function (){
                    var $t = $(this);
                    $t.addClass("focus").val() == this.defaultValue && $t.val("");
                },
                blur: function (){
                    var $t = $(this);
                    $t.removeClass("focus").val() == '' && $t.val(this.defaultValue);
                },
            }, '[data-bai-delval]');
        },
        goIndex: (function (){
            /*DGG.config({uiBai: {goIndex: {type:0}}});*/
            var u = D.config('uiBai'),
                o = D.sites.open;
            if(!u || !u.goIndex){
                return false;
            }
            var
                h = '',
                a = ['index.html'],
                t = u.goIndex.type;
            /**
             * 0 全部  1 返回首页
             * @type {number}
             */
            if(t == 0 || t == 1){
                if(!o){
                    D.getLogger('GG_WX_H5 OPEN').warn('undefined “返回首页” error');
                    return false;
                }
                h += '<div class="dgg-get-index"><a href="' + o + a[0] + '">返回首页</a></div>';
            }
            document.write(h);
        })()
    });
    D._mix($.fn, {
        getCodeTimer: function (options, callback){
            if(!this.length){
                return this;
            }
            var defaults = {
                    time: 60,
                    textH: '发送验证码',
                    textS: 'S后重新获取'
                },
                opts = $.extend(true, {}, defaults, options),
                type = $.isFunction(options);
            if(type){
                callback = options;
            }
            var
                $this = $(this),
                second = opts.time,
                reduceSecond;
            reduceSecond = function (){
                if(--second > 0){
                    $this.attr("disabled", "disabled").addClass('disabled').html(second + opts.textS);
                    setTimeout(reduceSecond, 1000);
                    return;
                }
                $this.removeAttr("disabled").removeClass('disabled').html(opts.textH);
                second = opts.time;
                callback && $.isFunction(callback) && callback.call(this);
            };
            !$this.hasClass('disabled') && reduceSecond();

        },
        textMax: function (){
            var $t = $(this),
                text = $t.val(),
                len = text.length,
                maxLength = $t.attr('maxlength'),
                oText = $t.siblings('.dgg-result').find('em');
            if(len > maxLength){
                text = text.substring(0, maxLength);
                $t.val(text);
                len = maxLength;
            }
            oText && oText.html(len);
        }
    });
})(Zepto, DGG, document, window);
(function ($, D){
    D.attrJudge('layer', function (){
        /**
         * 对话框扩展
         * @options  {icon:{-1:'默认没有图标',0:'感叹号',1：'勾正确',2:'叉错误',3:'问号'，4：'锁符号',5：'红哭脸',6：'绿笑脸',N>6:'感叹号'}}
         */
        D._mix(D, {
            layer: layer,
            /**
             * @param msg
             * @param options
             * @param yes
             * @returns {*}
             */
            alert: function (msg, options, yes){
                var type = D.isFunction(options);
                if(type){
                    yes = options;
                }
                return D.layer.open($.extend({
                    content: msg,
                    shadeClose: true,
                    btn: '我知道了',
                    yes: function (index){
                        yes && D.isFunction(yes) && yes.call(this);
                        D.layer.close(index);
                    }
                }, type ? {} : options));
            },
            /**
             *
             * @param msg
             * @param options
             * @param callback
             */
            msg: function (msg, options, callback){
                var type = D.isFunction(options);
                if(type){
                    callback = options;
                }
                return D.layer.open($.extend({
                    content: msg,
                    skin: 'msg',
                    time: 2,
                    yes: function (index){
                        callback && D.isFunction(callback) && callback.call(this);
                        D.layer.close(index);
                    }
                }, type ? {} : options));
            },
            /**
             *
             * @param msg
             * @param options
             * @param ok
             * @param cancel
             * @returns {*}
             */
            confirm: function (msg, options, ok, cancel){
                var type = D.isFunction(options);
                if(type){
                    cancel = ok;
                    ok = options;
                }
                return D.layer.open($.extend({
                    content: msg,
                    btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
                    btn2: cancel,
                    yes: function (index){
                        ok && D.isFunction(ok) && ok.call(this);
                        D.layer.close(index);
                    }
                }, type ? {} : options));
            },
            /**
             *
             * @param msg
             * @param options
             * @param ok
             * @param cancel
             * @returns {*}
             * 需要在回调主动关闭弹框
             */
            confirm2: function (msg, options, ok, cancel){
                var type = D.isFunction(options);
                if(type){
                    cancel = ok;
                    ok = options;
                }
                return D.layer.open($.extend({
                    content: msg,
                    btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
                    btn2: cancel,
                    yes: function (index){
                        ok && D.isFunction(ok) && ok.call(this);
                    }
                }, type ? {} : options));
            },
            /**
             *
             * @param url
             * @param options
             */
            showImage: function (url, options){
                D.layer.open(D.mix({
                    content: '<img src="' + url + '" alt="">',
                    skin: 'dgg-show-image'
                }, options));
            },
        });
    });
})(Zepto, DGG);
