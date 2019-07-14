'use strict';

;!function ($) {
    $('.email').on('click', function () {
        $('#email').show();
        $(this).css('color', 'black').next().css('color', 'red');
        $('#telphone').hide();
    });

    $('.tel').on('click', function () {
        $('#email').hide();
        $(this).css('color', 'red').prev().css('color', 'black');
        $('#telphone').show();
    });
    $('.dologin:visible').on('click', function () {
        $.ajax({
            type: 'post',
            url: 'http://10.31.158.49/kaolaxianmu/php/login.php',
            data: {
                name: $('.username').val(),
                password: $('.password').val()
            }
        }).done(function (d) {
            console.log(d);
            if (!d) {
                $('.tswz').html('用户名或密码错误');
                $('.password').val('');
            } else {
                location.href = 'index.html';
                $.cookie('username', $('.username').val().toString(), 10);
                $.cookie('password', $('.password').val().toString(), 10);
            }
        });
    });
}(jQuery);