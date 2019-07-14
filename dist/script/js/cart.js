'use strict';

!function ($) {
    //1.渲染商品列表
    function goodlists(id, num) {
        $.ajax({
            url: 'http://10.31.158.49/kaolaxianmu/php/index.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {
                if (id === value.picid) {
                    var $clonebox = $('.goodslis:hidden').clone(true, true);
                    $clonebox.find('.imgwrap').find('img').attr('src', value.imgurls);
                    $clonebox.find('.imgwrap').find('img').attr('sid', value.picid);
                    $clonebox.find('.goodtlt').find('a').html(value.title);
                    $clonebox.find('.oldprice').html(value.nowprice);
                    $clonebox.find('.newprice').find('span').html(value.price);
                    $clonebox.find('.u-setcount').find('.ipt').val(num);
                    //每个商品的总价
                    $clonebox.find('.zprice').find('.sumrow').html(Number(num * value.price).toFixed(2));

                    $clonebox.css('display', 'block');
                    $('.goodslists').append($clonebox);
                    total(); //计算总价

                }
            });
        });
    }
    //2.获取cookie，执行渲染列表的函数
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        var s = $.cookie('cookiesid').split(','); //数组sid
        var n = $.cookie('cookienum').split(','); //数组num
        $.each(s, function (i, value) {
            goodlists(s[i], n[i]);
        });
    }

    //3.如果购物车为空，显示去购物的盒子
    hollow();
    function hollow() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            $('.m-nocart').hide();
        } else {
            $('.m-nocart').show();
        }
    }

    //计算商品总价
    function total() {
        var $sum = 0;
        var $count = 0;
        $('.goodslis:visible').each(function (index, element) {
            if ($(element).find('.checksp').find('input').prop('checked')) {
                $sum += parseInt($(element).find('.u-setcount').find('input').val());
                $count += parseFloat($(element).find('.sumrow').html());
            }
        });
        $('.allgoods').find('.spnum').html($sum);
        $('.allgoods').find('.spprice').html('￥' + $count.toFixed(2));
        $('.ttbar').find('.allprice').html('商品税费（不含运费税）：￥' + $count.toFixed(2));
    }

    // 全选按钮操作
    function check(obj) {
        $(obj).on('click', function () {
            if ($(obj).prop('checked')) {
                // $('.goodslis:visible').find('input').prop('checked',true);
                $('input').prop('checked', true);
            } else {
                // $('.goodslis:visible').find('input').prop('checked',false);
                $('input').prop('checked', false);
            }
            total();
        });
    }
    check('.select1');
    check('.select2');

    var $inputs = $('.goodslis:visible').find(':checkbox');
    $('.goodslists').on('change', $inputs, function () {
        if ($('.goodslis:visible').find('input:checkbox').length == $('.goodslis:visible').find('input:checked').size()) {
            $('.selectAll').prop('checked', true);
        } else {
            $('.selectAll').prop('checked', false);
        }
        total();
    });

    //改变商品数量
    // ++
    $('.add').on('click', function () {
        var $num = $(this).parents('.u-setcount').find('input').val();
        $num++;
        if ($num >= 999) {
            $num = 999;
        }
        $(this).parents('.u-setcount').find('input').val($num);
        $(this).parents('.goodslis').find('.zprice').find('.sumrow').html(Cprice($(this)));
        total();
        addcookie($(this));
    });
    //--
    $('.z-dis').on('click', function () {
        var $num = $(this).parents('.u-setcount').find('input').val();
        $num--;
        if ($num <= 1) {
            $num = 1;
        }
        $(this).parents('.u-setcount').find('input').val($num);
        $(this).parents('.goodslis').find('.zprice').find('.sumrow').html(Cprice($(this)));
        total();
        addcookie($(this));
    });
    //直接输入输入改变
    $('.u-setcount input').on('input', function () {
        var $reg = /^\d+$/g;
        var $num = parseInt($(this).val());
        console.log($num);
        if ($reg.test($num)) {
            if ($num >= 999) {
                //限定范围
                $(this).val(999);
            } else if ($num <= 0) {
                $(this).val(1);
            } else {
                $(this).val($num);
            }
        } else {
            //不是数字
            $(this).val(1);
        }
        $(this).parents('.goodslis').find('.zprice').find('.sumrow').html(Cprice($(this)));
        total();
        addcookie($(this));
    });

    //改变数量后的单价
    function Cprice(obj) {
        var $dj = parseFloat(obj.parents('.goodslis').find('.newprice span').html());
        var $sl = parseInt(obj.parents('.goodslis').find('.ipt').val());
        return ($dj * $sl).toFixed(2); //结果
    }

    //  设置cookie

    var arrsid = []; //商品的id
    var arrnum = []; //商品的数量
    function cookievalue() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = $.cookie('cookienum').split(','); //cookie商品的num
        }
    }

    function addcookie(obj) {
        cookievalue();
        var $index = obj.parents('.goodslis').find('img').attr('sid'); //通过id找数量的位置
        arrnum[$.inArray($index, arrsid)] = parseInt(obj.parents('.goodslis').find('.ipt').val());
        $.cookie('cookienum', arrnum.toString(), 10);
    }

    //删除商品
    $('.col6 .u-opt').on('click', function () {
        if (confirm('你确定要删除吗')) {
            $(this).parents('.goodslis').remove();
        }
        cookievalue(); //获得cookie里的商品id数组和商品数量数组
        removesp($(this).parents('.goodslis').find('img').attr('sid'), arrsid);
        total();
    });
    //删除选中商品
    $('.ttbar .opt').on('click', function () {
        if (confirm('你确定要删除吗')) {
            $('.goodslis:visible').each(function () {
                if ($(this).find('input:checkbox').is(':checked')) {
                    //复选框一定是选中的
                    $(this).remove();
                    cookievalue(); //获得cookie里的商品id数组和商品数量数组
                    removesp($(this).find('img').attr('sid'), arrsid);
                }
            });
        }
        total();
    });

    // 删除商品id 和数量

    function removesp(sid, arrsid) {
        //商品id  和id的数组
        var $index = $.inArray(sid, arrsid);
        if ($index != -1) {
            arrsid.splice($index, 1); //删除商品id数组对应的值
            arrnum.splice($index, 1); //删除商品数量数组对应的值
            $.cookie('cookiesid', arrsid.toString(), 10);
            $.cookie('cookienum', arrnum.toString(), 10);
        }
    }
}(jQuery);