
require("../css/fast.css")
require('./slideshow.js')
// slideshow.pageList.init()


var $jobcate = $('.jobcate'),
	$jobcateLi = $('.jobcate li'),
	$control = $('.control'),
	$page = $('#page');

var contentList = function(url){
	this.num = 0;
	this.arr = null;
	this.jobpage = 0;
	this.page = 1;
	this.url = url;
	this.init()
}
contentList.prototype.init = function(){
	this.getMessage();
	this.clickTop();
	this.createScreen();
}
contentList.prototype.clickTop = function(){
	var that = this;
	$jobcate.on('click',function(e){
		console.log(that)
		that.page = 1; 
		$('.coltrolList').remove();
		$('.pagebox').remove();
		that.jobpage = $(e.target).index();
		that.createScreen();
		that.createPage();
		that.createList();
		$jobcateLi.attr('class','');
		$(e.target).attr('class','click');
	})
}
contentList.prototype.createScreen=function(){
	$('<div class="coltrolList"></div>').appendTo($control);
	$('<ul class="list-title"><li class="spl">职位名称</li><li class="spl1">工作地点</li><li class="splm">薪资</li><li class="splw">工作经验</li><li class="spls">最低学历</li><li class="date">发布时间</li></ul>').appendTo($('.coltrolList'));
}
contentList.prototype.getMessage = function(){
	$.ajax({
		type: 'get',
		url: this.url,
		date: '',
		context: this,
		success:function(data){
			data = JSON.parse(data);
			this.arr = data;
			this.createList();
			this.createPage();
		},
		error:function(error) {
			console.log(error)
		},
	})
}
contentList.prototype.createPage = function(){
	var that = this;
	var allpage = Math.ceil(that.arr[that.jobpage].length / 10);
	$('<ul class="pagebox"/>').appendTo($page);
	if (allpage > 1) {
		if (allpage > 5 ) {
			for(var i = 0; i < 5; i ++ ){
				$('<li class="num">'+ (i + 1) +'</li>').appendTo($('.pagebox'));
			} 	
		}else{
			for(var i = 0; i < allpage; i ++ ){
				$('<li class="num">'+ (i + 1) +'</li>').appendTo($('.pagebox'));
			}	
		}
		$('<li class="prv">上一页</li>').prependTo($('.pagebox'));
		$('<li class="next">下一页</li>').appendTo($('.pagebox'));
		$('.pagebox .num').eq(0).attr('class','num click');
		$('.pagebox li').on('click',function(e){
			var target = $(e.target).text();
			if (target == '下一页') {
				that.page ++;
			}else if (target == '上一页') {
				that.page --;
			}else{
				$('.num').attr('class','num');
				$(e.target).attr('class','num click');
				that.page = Number(target);
			};
			that.createList();
			that.changePage(allpage);
		});	
	};
}
contentList.prototype.createList = function(){
	var that = this;
	$('.coltrolList').remove();	
	this.createScreen();			
	var classname = ['spl', 'spl1', 'splm', 'splw', 'spls', 'data'];
	this.arr[this.jobpage].forEach(function(ele,index){
		if (index < that.page * 10 && index > (that.page - 1) * 10 - 1) {
			$('<ul class="ul-job ul-job'+ (index + 1) +'"/>').appendTo($('.coltrolList'));
			for (var i = 0; i < 6; i++) {
				$('<li class="'+ classname[i] +'"/>').appendTo($('.ul-job' + ( index + 1 ))).text(ele[i]);
			};	
		};
	})
}
contentList.prototype.changePage = function (allpage) {
	var that = this;
	if ( this.page == 1 ) {
		$('.prv').css('display', 'none');
		$('.next').css('display', 'inline-block');
	}else if ( this.page > 1 && this.page < 4 && allpage > 3){
		$('.prv').css('display', 'inline-block');
		$('.next').css('display', 'inline-block');
		$('.pagebox .num').each(function (index, ele) {
			ele.innerText = index + 1;
		})
	}else if (this.page > 3 && this.page <= allpage - 2 && allpage > 3){
		$('.prv').css('display', 'inline-block');
		$('.next').css('display', 'inline-block');
		var cha = this.page - 2 - Number($('.pagebox .num:first').text());
		$('.pagebox .num').each(function (index, ele) {
			ele.innerText = Number( $(ele).text() ) + cha;
		})
	}else if (this.page > allpage - 2 && this.page != allpage){
		$('.next').css('display', 'inline-block');
		$('.prv').css('display', 'inline-block');
		$('.pagebox .num').each(function (index, ele) {
			ele.innerText = index + allpage - 4;
		})
	}else if ( this.page == allpage ){
		$('.next').css('display', 'none');
		$('.prv').css('display', 'inline-block');
	}
	$('.pagebox .num').each(function (index, ele) {
		ele.className = 'num';
		if ($(ele).text() == that.page) {
			ele.className = 'num click';
		};
	})
}
var contentlist = new contentList("message.txt");
