"use strict";

;!function ($) {
	$.fn.extend({ //banner轮播图
		lunbo: function lunbo() {
			var $pics = $(".img-list li");
			var $btns = $(".img-pager a");
			var $left = $('.prev');
			var $right = $('.next');
			var $banner = $('.img-panel');
			var $num = 0;
			var timer = null;
			$btns.on('click', function () {
				$num = $(this).index();
				tabswitch();
			});
			$banner.hover(function () {
				$left.show();
				$right.show();
				clearInterval(timer);
			}, function () {
				$left.hide();
				$right.hide();
				timer = setInterval(function () {
					$right.click();
				}, 2000);
			});
			$right.on('click', function () {
				$num++;
				if ($num > $btns.length - 1) {
					$num = 0;
				}
				tabswitch();
			});
			$left.on('click', function () {
				$num--;
				if ($num < 0) {
					$num = $btns.length - 1;
				}
				tabswitch();
			});
			timer = setInterval(function () {
				$right.click();
			}, 2000);
			function tabswitch() {
				$btns.eq($num).addClass('active').siblings().removeClass('active');
				$pics.eq($num).css({
					display: 'block',
					opacity: 1
				}).siblings().hide();
			}
		},
		xuanfu: function xuanfu() {
			//搜索框悬浮
			$(window).on('scroll', function () {
				var $top = $(window).scrollTop();
				if ($top >= 120) {
					$('#docHead').css({
						position: 'fixed',
						top: '0px'
					});
				} else {
					$('#docHead').css({
						position: 'relative'
					});
				}
			});
		}
	}),
	//goodslists数据
	$.ajax({
		url: 'http://10.31.158.49/kaolaxianmu/php/index.php',
		dataType: 'json'
	}).done(function (data) {
		var $strhtml = '';
		for (var i = 0; i < data.length; i++) {
			$strhtml += "\n\t\t\t\t  <li class=\"g-col\">\n                        <a href=\"datails.html?sid=" + data[i].picid + "\">\n                            <img src=\"" + data[i].imgurls + "\" alt=\"\">\n                        </a>\n                        <h3 class=\"goods-title\">\n                            <a href=\"datails.html?sid=" + data[i].picid + "\">\n\t\t\t\t\t\t\t" + data[i].title + "\n                            </a>\n                        </h3>\n                        <h6 class=\"goods-introduce\"> " + data[i].goodsintroduce + " </h6>\n                        <div class=\"m-priceitem\">\n                            <span class=\"price\"><i class=\"rmb\">\xA5</i>" + data[i].price + "</span>\n                            <span class=\"mktprice\"><del>\uFFE5" + data[i].nowprice + "</del></span>\n                            <a href=\"datails.html?sid=" + data[i].picid + "\" class=\"goods-btn\">\u7ACB\u5373\u8D2D\u4E70</a>\n                        </div>\n                    </li>\n\t\t\t\t  ";
		}
		$('.goods-list').html($strhtml);
	});
	// //tab切换数据
	// $.ajax({
	// 	url:'php/banner.php',
	// 	dataType:'json'
	// }).done(function(bannerdata){
	// 	$.each(bannerdata,function(index,value){
	// 		var $bannerstr='<ul>';

	// 	});
	// });
}(jQuery);

// 楼梯效果
!function () {
	var $loutili = $('.nav-item').not('.first-nav-item');
	var $louceng = $('.goodslists');
	var $last = $('.nav-bottom-item');
	//侧边栏显示隐藏
	$(window).on('scroll', function () {
		var $top = $(window).scrollTop();
		if ($top >= 300) {
			$('.m-sidebar').show();
		} else {
			$('.m-sidebar').hide();
		}

		// 对每个楼层遍历
		$louceng.each(function (index, element) {
			var $loucengtop = $(element).offset().top + $louceng.eq(2).height() - 300;
			if ($loucengtop >= $top) {
				$loutili.removeClass('z-selected');
				$loutili.eq(index).addClass('z-selected');
				return false;
			}
		});
	});
	//  点击楼梯 跳转到对应的楼层
	$loutili.on('click', function () {
		$(this).addClass('z-selected').siblings().removeClass('z-selected');
		var $loucengtop = $louceng.eq($(this).index() - 1).offset().top - $('h2').height() * 2;
		$('html,body').animate({
			scrollTop: $loucengtop
		}, 50);
	});
	//点击最后一个  跳转到顶部
	$last.on('click', function () {
		$('html,body').animate({
			scrollTop: 0
		}, 50);
	});
}();

// !function(){
// 	//lunbo效果

// }(jQuery);

// !function(){
// 	//小效果

// }(jQuery);