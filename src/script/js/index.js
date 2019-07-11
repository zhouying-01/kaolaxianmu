;!function($){
	 $.fn.extend({//banner轮播图
		 lunbo:function(){
			const $pics=$(".img-list li");
			const $btns=$(".img-pager a");
			const $left=$('.prev')
			const $right=$('.next');
			const $banner=$('.img-panel')
			let $num=0;
			let timer=null;
			$btns.on('click',function(){
			   $num=$(this).index();
			   tabswitch();
			})
            $banner.hover(function(){
				$left.show();
				$right.show();
				clearInterval(timer)
			},function(){
                $left.hide();
				$right.hide();
				timer=setInterval(function(){
					$right.click();
				},2000)
			})
			$right.on('click',function(){
				$num++;
				if($num>$btns.length-1){
					$num=0
				}
				tabswitch();
			})
			$left.on('click',function(){
				$num--;
				if($num<0){
					$num=$btns.length-1
				}
				tabswitch();
			})
			timer=setInterval(function(){
				$right.click();
			},2000)
			function tabswitch(){
				$btns.eq($num).addClass('active').siblings().removeClass('active')
				$pics.eq($num).css({
					display:'block',
					opacity:1
				}).siblings().hide();
			}
		 },
		 xuanfu:function(){//搜索框悬浮
			 $(window).on('scroll',function(){
				 var $top=$(window).scrollTop();
				 if($top>=120){
					$('#docHead').css({
						position: 'fixed',
						top:'0px'
					})
				 }else{
					$('#docHead').css({
						position: 'relative'
					})
				 }
			 })
		 }
	 }),
	//goodslists数据
	 $.ajax({
		url:'http://10.31.158.49/kaolaxianmu/php/index.php',
		dataType:'json'
	}).done(function(data){
			  var $strhtml=''
			  for(let i=0;i<data.length;i++){
				  $strhtml+=`
				  <li class="g-col">
                        <a href="datails.html?sid=${data[i].picid}">
                            <img src="${data[i].imgurls}" alt="">
                        </a>
                        <h3 class="goods-title">
                            <a href="datails.html?sid=${data[i].picid}">
							${data[i].title}
                            </a>
                        </h3>
                        <h6 class="goods-introduce"> ${data[i].goodsintroduce} </h6>
                        <div class="m-priceitem">
                            <span class="price"><i class="rmb">¥</i>${data[i].price}</span>
                            <span class="mktprice"><del>￥${data[i].nowprice}</del></span>
                            <a href="datails.html?sid=${data[i].picid}" class="goods-btn">立即购买</a>
                        </div>
                    </li>
				  `;
			  }
			  $('.goods-list').html($strhtml);
		})
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
!function(){
		const $loutili=$('.nav-item').not('.first-nav-item');
		const $louceng=$('.goodslists')
		const $last=$('.nav-bottom-item')
		//侧边栏显示隐藏
		$(window).on('scroll',function(){
	   var $top=$(window).scrollTop();
		if($top>=300){
			$('.m-sidebar').show();
		}else{
		   $('.m-sidebar').hide();
		}

		// 对每个楼层遍历
		$louceng.each(function(index,element){
			let $loucengtop=$(element).offset().top+$louceng.eq(2).height()-300;
			if($loucengtop>=$top){
			    $loutili.removeClass('z-selected')
				$loutili.eq(index).addClass('z-selected');
				return false;
			}
		})
	})
	//  点击楼梯 跳转到对应的楼层
	$loutili.on('click',function(){
		$(this).addClass('z-selected').siblings().removeClass('z-selected');
		let $loucengtop=$louceng.eq($(this).index()-1).offset().top-$('h2').height()*2;
		$('html,body').animate({
			scrollTop:$loucengtop
		},50)
	})
	//点击最后一个  跳转到顶部
	$last.on('click',function(){
		$('html,body').animate({
			scrollTop:0
		},50)
	})
}();


// !function(){
// 	//lunbo效果
	
// }(jQuery);

// !function(){
// 	//小效果
	
// }(jQuery);
