;!function($){
	//banner轮播图
	 $.fn.extend({
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
		 xuanfu:function(){
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

	 })




	//lunbo数据
	// $.ajax({
	// 	url:'php/banner.php',
	// 	dataType:'json'
	// }).done(function(bannerdata){
	// 	$.each(bannerdata,function(index,value){
	// 		var $bannerstr='<ul>';
			
	// 	});
	// });
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

// !function(){
// 	//banner效果
	
// }(jQuery);

// !function(){
// 	//lunbo效果
	
// }(jQuery);

// !function(){
// 	//小效果
	
// }(jQuery);
