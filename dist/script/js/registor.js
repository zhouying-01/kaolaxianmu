'use strict';

;!function ($) {
    var $oInput = $('input').not(':last');
    var $span = $('.span');
    var yhmflag = true,
        yxflag = true,
        mmflag = true,
        qdmmflag = true,
        sjhflag = true,
        yzmflag = true;
    //验证用户名
    $oInput.eq(0).focus(function () {
        if ($(this).val() == '') {
            console.log($span.eq($(this).index()));
            $span.eq(0).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入用户名');
            yhmflag = false;
        }
    });
    $oInput.eq(0).blur(function () {
        if ($(this).val() != '') {
            var reg = /^[\u4e00-\u9fa5]+|[a-zA-Z]+\d+$/;
            if (reg.test($(this).val())) {
                var len = this.value.replace(/[\u4e00-\u9fa5]/g, 'bb').length;
                if (len <= 14) {
                    $span.eq(0).css({
                        fontSize: 11,
                        color: 'green'
                    }).html('√');
                    yhmflag = true;
                } else {
                    $span.eq(0).css({
                        fontSize: 11,
                        color: 'red'
                    }).html('用户名为8-16位字符');
                    yhmflag = false;
                }
            } else {
                //报错
                $span.eq(0).css({
                    fontSize: 11,
                    color: 'red'
                }).html('不能使用特殊字符');
                yhmflag = false;
            }
        }
    });

    //邮箱验证
    $oInput.eq(1).focus(function () {
        if ($(this).val() == '') {
            $span.eq(1).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入邮箱');
            yxflag = false;
        }
    });
    $oInput.eq(1).blur(function () {
        if ($(this).val() != '') {
            var reg = /^([\w]\w+)\@([\w]\w+)\.([\w]\w+)$/;
            if (reg.test($(this).val())) {
                $span.eq(1).css({
                    fontSize: 11,
                    color: 'green'
                }).html('√');
                yxflag = true;
            } else {
                $span.eq(1).css({
                    fontSize: 11,
                    color: 'red'
                }).html('请输入正确的邮箱');
                yxflag = false;
            }
        } else {
            //报错
            $span.eq(1).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入正确的邮箱');
            yxflag = false;
        }
    });

    //密码验证
    $oInput.eq(2).focus(function () {
        if ($(this).val() == '') {
            $span.eq(2).addClass('span2').removeClass('span1').html('请输入密码');
            mmflag = false;
        }
    });
    $oInput.eq(2).blur(function () {
        if ($(this).val() != '') {
            var num = 0;
            var regnum = /\d+/;
            var reglowercase = /[a-z]+/;
            var reguppercase = /[A-Z]+/;
            var othercase = /[\W\_]+/;
            if (regnum.test($(this).val())) {
                num++;
            }
            if (reglowercase.test($(this).val())) {
                num++;
            }
            if (reguppercase.test($(this).val())) {
                num++;
            }
            if (othercase.test($(this).val())) {
                num++;
            }
            if ($(this).val().length >= 8 && $(this).val().length <= 16 && num == 1) {
                $span.eq(2).addClass('span1').removeClass('span2').html('弱');
                mmflag = true;
            } else if ($(this).val().length >= 8 && $(this).val().length <= 16 && num == 2 || num == 3) {
                $span.eq(2).addClass('span1').removeClass('span2').html('中');
                mmflag = true;
            } else if ($(this).val().length >= 8 && $(this).val().length <= 16 && num == 4) {
                $span.eq(2).addClass('span1').removeClass('span2').html('强');
                mmflag = true;
            } else {
                $span.eq(2).addClass('span2').removeClass('span1').html('请输入8-16的密码');
                mmflag = false;
            }
        } else {
            $span.eq(2).addClass('span2').removeClass('span1').html('密码不能为空');
            mmflag = false;
        }
    });

    //再次确定密码
    $oInput.eq(3).focus(function () {
        if ($(this).val() == '') {
            $span.eq(3).css({
                fontSize: 11,
                color: 'red'
            }).html('请再次输入密码');
            qdmmflag = false;
        }
    });
    $oInput.eq(3).blur(function () {
        var num = $oInput.eq(2).val();
        if ($(this).val() == num && $(this).val() != '') {
            $span.eq(3).css({
                fontSize: 11,
                color: 'green'
            }).html('√');
            qdmmflag = true;
        } else {
            //报错
            $span.eq(3).css({
                fontSize: 11,
                color: 'red'
            }).html('密码输入错误');
            qdmmflag = false;
        }
    });

    //手机号码验证
    $oInput.eq(4).focus(function () {
        if ($(this).val() == '') {
            $span.eq(4).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入手机号');
            sjhflag = false;
        }
    });
    $oInput.eq(4).blur(function () {
        if ($(this).val() != '') {
            var reg = /1[3|5|6|7|8|9]\d{9}/;
            if (reg.test($(this).val())) {
                $span.eq(4).css({
                    fontSize: 11,
                    color: 'green'
                }).html('√');
                sjhflag = true;
            } else {
                $span.eq(4).css({
                    fontSize: 11,
                    color: 'red'
                }).html('请输入正确的手机号');
                sjhflag = false;
            }
        } else {
            //报错
            $span.eq(4).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入正确的手机号');
            sjhflag = false;
        }
    });

    //验证码

    $oInput.eq(5).focus(function () {
        if ($(this).val() == '') {
            $span.eq(5).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入验证码');
            yzmhflag = false;
        }
    });
    $oInput.eq(5).blur(function () {
        if ($(this).val() != '') {
            if ($(this).val() == $('.oBox').html()) {
                $span.eq(5).css({
                    fontSize: 11,
                    color: 'green'
                }).html('√');
                yzmflag = true;
            } else {
                $span.eq(5).css({
                    fontSize: 11,
                    color: 'red'
                }).html('请输入正确的验证码');
                yzmflag = false;
            }
        } else {
            //报错
            $span.eq(5).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入正确的验证码');
            yzmflag = false;
        }
    });
    $oInput.eq(4).blur(function () {
        $.ajax({
            type: 'post',
            url: 'http://10.31.158.49/kaolaxianmu/php/reg.php',
            data: {
                tel: $oInput.eq(4).val()
            }
        }).done(function (d) {
            if (!d) {
                $span.eq(4).css({
                    fontSize: 11,
                    color: 'green'
                }).html('√');
            } else {
                $span.eq(4).css({
                    fontSize: 11,
                    color: 'red'
                }).html('手机号已经被注册');
                sjhflag = false;
            }
        });
    });

    $('.submit').on('click', function () {
        if ($oInput.eq(0).val() == '') {
            $span.eq(0).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入用户名');
            yhmflag = false;
        }
        if ($oInput.eq(1).val() == '') {
            $span.eq(1).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入邮箱');
            yxflag = false;
        }
        if ($oInput.eq(2).val() == '') {
            $span.eq(2).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入密码');
            mmflag = false;
        }
        if ($oInput.eq(3).val() == '') {
            $span.eq(3).css({
                fontSize: 11,
                color: 'red'
            }).html('请再次输入密码');
            qdmmflag = false;
        }
        if ($oInput.eq(4).val() == '') {
            $span.eq(4).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入手机号');
            sjhflag = false;
        }
        if ($oInput.eq(5).val() == '') {
            $span.eq(5).css({
                fontSize: 11,
                color: 'red'
            }).html('请输入验证码');
            yzmflag = false;
        }
        console.log(yhmflag, yxflag, mmflag, qdmmflag, sjhflag, yzmflag);
        if (!yxflag || !mmflag || !qdmmflag || !sjhflag || !yzmflag || !yhmflag) {
            return false;
        }
    });
}(jQuery)

// 验证码
;!function () {
    var oBox = document.querySelector('.oBox');
    var oA = document.querySelector('.oa');
    //  验证码
    function yzm() {
        var arr = [];
        for (i = 48; i <= 57; i++) {
            arr.push(String.fromCharCode(i));
        }
        for (i = 65; i <= 90; i++) {
            arr.push(String.fromCharCode(i));
        }
        for (j = 0, sum = ''; j < 5; j++) {
            rannum = parseInt(Math.random() * arr.length);
            if (rannum > 9) {
                if (Math.random() > 0.5) {
                    sum += arr[rannum].toLowerCase();
                } else {
                    sum += arr[rannum];
                }
            } else {
                sum += arr[rannum];
            }
        }
        return sum;
    }
    oBox.innerText = yzm();
    oA.onclick = function () {
        oBox.innerText = yzm();
    };
}();