'use strict';

;!function () {
    var $sid = location.search.substring(1).split('=')[1];
    var $spic = $('#showImgBox').find('img');
    var $sf = $('.sf');
    var $bf = $('#showDetails');
    var $bpic = $('#showImgBig');
    var $title = $('.product-title').find('span');
    var $nowprice = $('.currentPrice').find('span');
    var $price = $('.marketPrice').find('span');
    var $zk = $('#zk');

    $.ajax({
        url: 'http://10.31.158.49/kaolaxianmu/php/datails.php',
        data: {
            picid: $sid
        },
        dataType: 'json'
    }).done(function (data) {
        var $rebate = (Number(data.price) / Number(data.nowprice) * 10).toFixed(1) + '折';
        $zk.html($rebate);
        $spic.attr('src', data.imgurls);
        $bpic.attr('src', data.imgurls);
        $title.html(data.title);
        $nowprice.html(data.price);
        $price.html(data.nowprice);
        var arr = data.urlimgs.split(',');
        var str = '';
        $.each(arr, function (index, value) {
            str += '\n                    <li id="auto-id-1562548741532"  _ti="37">\n                            <a href="javascript:;" _ti="37" >\n                                <img src="' + value + '" _ti="37" >\n                            </a>\n                        </li>\n                    ';
        });
        $('#litimgUl').html(str);
    });
    // 放大镜效果
    !function () {
        $('.sf').width($('.spic').width() * $('.bf').width() / $('.bpic').width());
        $('.sf').height($('.spic').height() * $('.bf').height() / $('.bpic').height());
        var $bili = $('.bpic').width() / $('.spic').width();
        $('.spic').hover(function () {
            $('.sf').show();
            $('.bf').show();
            $(this).on('mousemove', function (ev) {
                var $left = ev.pageX - $('#showImgBox').offset().left - $('.sf').width() / 2;
                var $top = ev.pageY - $('#showImgBox').offset().top - $('.sf').height() / 2;
                if ($left <= 0) {
                    $left = 0;
                } else if ($left >= $('.spic').width() - $('.sf').width()) {
                    $left = $('.spic').width() - $('.sf').width();
                }
                if ($top <= 0) {
                    $top = 0;
                } else if ($top >= $('.spic').height() - $('.sf').height()) {
                    $top = $('.spic').height() - $('.sf').height();
                }
                $('.sf').css({
                    left: $left,
                    top: $top
                });
                $('.bpic').css({
                    left: -$bili * $left,
                    top: -$bili * $top
                });
            });
        }, function () {
            $('.sf').hide();
            $('.bf').hide();
        });
        //点击小图切换

        $('#litimgUl').on('click', 'li', function () {
            var $imgurl = $(this).find('img').attr('src');
            $('.spic img').attr('src', $imgurl);
            $('.bpic').attr('src', $imgurl);
        });

        //点击箭头进行切换
        var $num = 4;
        console.log($('.scrollRight'));
        $('.scrollRight').on('click', function () {
            var $lists = $('#litimgUl li'); //6
            if ($lists.length > $num) {
                $num++;
                $('.scrollleft').css('color', '#333');
            }if ($lists.length == $num) {
                $('.scrollRight').css('color', '#fff');
            }
            $('#litimgUl').animate({
                left: -($num - 4) * $lists.eq(0).width() - 17
            });
        });

        $('.scrollleft').on('click', function () {
            var $lists = $('#litimgUl li'); //6
            if ($num > 4) {
                $num--;
                $('.scrollRight').css('color', '#333');
            }if ($num <= 4) {
                $('.scrollleft').css('color', '#fff');
            }
            $('#litimgUl').animate({
                left: -($num - 4) * $lists.eq(0).width() - 7
            });
        });
    }();

    //   购物车

    var arrsid = []; //商品分类
    var arrnum = []; //商品数量
    function cookievalue() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //商品的类型
            arrnum = $.cookie('cookienum').split(','); //商品的数量
        }
    }
    $('.ctrnum-b-rd').on('click', function () {
        var $num = $('.ctrnum-qty').val();
        $num--;
        if ($num <= 0) {
            $num = 0;
        }
        $('.ctrnum-qty').val($num);
    });
    $('.ctrnum-b-ad').on('click', function () {
        var $num = $('.ctrnum-qty').val();
        $num++;
        if ($num >= 9999) {
            $num = 9999;
        }
        $('.ctrnum-qty').val($num);
    });
    $('#addCart').on('click', function () {
        //点击加入购物车按钮，将商品数量加入cookie
        alert('成功加入购物车');
        cookievalue(); //查看是否有存在的cookie值
        if ($.inArray($sid, arrsid) != -1) {
            //存在值就想加
            var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.ctrnum-qty').val());
            arrnum[$.inArray($sid, arrsid)] = num;
            $.cookie('cookienum', arrnum.toString(), 10);
        } else {
            arrsid.push($sid);
            $.cookie('cookiesid', arrsid.toString(), 10);
            arrnum.push($('.ctrnum-qty').val());
            $.cookie('cookienum', arrnum.toString(), 10);
        }
    });
}();