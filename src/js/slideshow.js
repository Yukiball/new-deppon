
		var i = 0;
		var lock = true;
		var num = 0;
		var arr;
		var jobpage = 0;
		var page = 1;
		//轮播图
		var pageList = {
			init: function () {
				this.append()
				this.move()
			},
			// 初始化
			append: function () {
				$('.poster ul li').eq( -3 ).css({width: 328, height: 190, left:0, top: 90, opacity:0.3,'zIndex':0});
				$('.poster ul li').eq( -2 ).css({width: 410, height: 237, left: 44, top: 67, opacity:0.5,'zIndex':1});
				$('.poster ul li').eq( -1 ).css({width: 512, height: 296, left: 87, top: 37, opacity:1,'zIndex':2});
				$('.poster ul li').eq( 0 ).css({width: 640, height: 370, left: 130, top: 0, 'zIndex':3});
				$('.poster ul li').eq( 1 ).css({width: 512, height: 296, left: 302, top: 37, opacity:1,'zIndex':2});
				$('.poster ul li').eq( 2 ).css({width: 410, height: 237, left: 447, top: 67, opacity:0.5,'zIndex':1});
				$('.poster ul li').eq( 3 ).css({width: 328, height: 190, left: 572, top: 90, opacity:0.3,'zIndex':0});
			},
			// 轮播
			move: function () {
				$('.right').on('click', this.moveright.bind(this))
				$('.left').on('click', this.moveleft.bind(this))
			},
			moveright: function () {
				if (lock) {
					lock = false;
					if (i >= 4) {
						i = -3
					};
					$('.poster ul li').eq( i - 3 ).animate({width: 328, height: 190, left: 572, top: 90, opacity:0.3,'zIndex':0},500,'swing');
					$('.poster ul li').eq( i - 2 ).animate({width: 328, height: 190, left:0, top: 90, opacity:0.3,'zIndex':0},500,'swing');
					$('.poster ul li').eq( i - 1 ).animate({width: 410, height: 237, left: 44, top: 67, opacity:0.5,'zIndex':1},500,'swing');
					$('.poster ul li').eq( i ).css('zIndex', 2).animate({width: 512, height: 296, left: 87, top: 37, opacity:1},500,'swing');
					$('.poster ul li').eq( i + 1 ).css('zIndex', 3).animate({width: 640, height: 370, left: 130, top: 0,},500,'swing');
					$('.poster ul li').eq( i + 2 ).animate({width: 512, height: 296, left: 302, top: 37, opacity:1,'zIndex':2},500,'swing');
					$('.poster ul li').eq( i + 3 ).animate({width: 410, height: 237, left: 447, top: 67, opacity:0.5,'zIndex':1},500,'swing');
					i++;
					setTimeout(function(){lock = true},500)
				};
			},
			moveleft: function () {
				if (lock) {
					lock = false;
					if (i <= -5){
						i = 2;
					};
					$('.poster ul li').eq( i - 3 ).animate({width: 410, height: 237, left: 44, top: 67, opacity:0.5,'zIndex':1},500,'swing');
					$('.poster ul li').eq( i - 2 ).animate({width: 512, height: 296, left: 87, top: 37, opacity:1,'zIndex':2},500,'swing');
					$('.poster ul li').eq( i - 1 ).css( 'zIndex', 3).animate({width: 640, height: 370, left: 130, top: 0, 'zIndex':3},500,'swing');
					$('.poster ul li').eq( i ).css('zIndex', 2).animate({width: 512, height: 296, left: 302, top: 37, opacity:1},500,'swing');
					$('.poster ul li').eq( i + 1 ).animate({width: 410, height: 237, left: 447, top: 67, opacity:0.5,'zIndex':1},500,'swing');
					$('.poster ul li').eq( i + 2 ).animate({width: 328, height: 190, left: 572, top: 90, opacity:0.3,'zIndex':0},500,'swing');
					$('.poster ul li').eq( i + 3 ).animate({width: 328, height: 190, left:0, top: 90, opacity:0.3,'zIndex':0},500,'swing');
					i--;
					setTimeout(function(){lock = true},500)

				};
			}
		}
		pageList.init();
		// module.exports = slideshow;
