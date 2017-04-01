//获取开机广告
var url = URLS.SERVER_URL + URLS.getValidAdvertise;
var data = "";	
	
//成功回调函数
var success = function(data){

	console.log("ad msg:" + data.msg);
	
	if(data.datas != null){
		
		//获取本地缓存广告结束时间
		var ad_endTime =localStorage.ad_endTime;
		
		//获取ajax广告结束时间
		var date=data.datas.endTime;


		if(ad_endTime != date ){
			
			//获取广告结束时间
			localStorage.setItem('ad_endTime', data.datas.endTime);


			var html;

			var imgsrc=data.datas.img.replace(/(\[[^\]]+\]|[\s\S])$/, '');

			html ="<div class='ad'><div class='ad_close'>跳过<em>"+data.datas.stayTime+"</em></div><a href='"+data.datas.url+"'><img src='"+imgsrc+"'></a></div>";
			$("body").append(html);

			var ad_closeTime=$(".ad_close em").html();
			var ret = setInterval(function() {
							--ad_closeTime;
							if (ad_closeTime < 0) {
								$(".ad").addClass("close");
								setTimeout(function(){$(".ad").remove();},1000);
								true;
							} else {
								$(".ad_close em").html(ad_closeTime);
							}
			}, 1000);
			//广告关闭按钮
			$(".ad_close").click(function(){
				$(".ad").addClass("close");
				setTimeout(function(){$(".ad").remove();},1000);
			});

			}
	
	}

};
ajaxPost(url,data,success);



//获取用户积分
var totalScore;
var TotalScoreParam={};
TotalScoreParam["phone"]=user;
var url = URLS.SERVER_URL + URLS.myintegral;
var data = TotalScoreParam;
//成功回调函数
var success = function(data){
	//console.log(data);
	//大于0显示积分否则显示错误信息
	if(data.code > 0){
			totalScore = data.datas.totalScore;
			$("#ajax_myintegral").html(totalScore);
			//首次加载
			goodsCategoryList();
	}else{
			console.log("user msg:"+data.msg);
	}

};
ajaxPost(url,data,success);




var param = {};
//每页显示
param["pageSize"] = 8;

//当前第几页
param["pageIndex"] = 1;

//总页数
var totalPageNum="";

//加载商品列表	
function goodsCategoryList() {
	var paramsStr = '';
	for (v in param) {
		paramsStr = paramsStr + v + '=' + param[v] + '&';
	}
	//console.log(URLS.SERVER_URL + URLS.goodsCategoryList + '?' + paramsStr.substr(0, paramsStr.length - 1));

	var url = URLS.SERVER_URL + URLS.goodsCategoryList;
	var data = param;
	//成功回调函数
	var success = function(data){

		
		var html = "";
		//总页数
		totalPageNum = data.pages;
		var goodsList = data && data.data;
		
		
		if (goodsList && goodsList.length > 0) {
			$(".nlist_nomore,.nlist_no").css("display", "none");
			for (var k = 0; k < goodsList.length; k++) {
				
				//判断按钮
				var bt;
				var my_integral=$(".index_tab .g0 b").html();
				var need_integral = goodsList[k]['score'];
				var sell_out = goodsList[k]['num'];
				if(sell_out <= 0){
					bt = 0;
				}else if(my_integral >= need_integral){
					bt = 1;
				}else{
					bt = 2;
				}

				html += "<div class='index_list_li'><div class='index_list_left'><a href='details.html?user=" + user + "&totalScore=" + totalScore + "&goodsId=" + goodsList[k]['id']+ "'"+">";
				html += "<img class='lazyload'  src="+ goodsList[k]['cover']+" >";
				html += "<span >" + goodsList[k]['name'] + "</span>";
				html += "<del>市场价：￥" + goodsList[k]['price'] + "</del>";
				html += "<em class='g0'>" + goodsList[k]['score'] + "积分</em></a></div>";
				
				
				if (bt == 1) {
					html += "<a class='index_list_right' href='settlement.html?user=" + user + "&totalScore=" + totalScore + "&goodsId=" + goodsList[k]['id']+ "'"+">"+"立即兑换</a>";
				}
				if (bt == 2) {
					html += "<a href='javascript:;' class='index_list_right bt_no'>积分不足</a>";
				}
				if (bt == 0) {
					html += "<a href='javascript:;' class='index_list_right bt_no'>售罄</a>";
				}
				html += "</div>";

			}
			
			$("#ajax_goodsList").append(html);
			//lazyload();
		
			$(".cont").removeClass("one_loading");
			//商品点击事件

		
		} else {
			nlist_no(); //没有商品
		}
		//判断没有更多商品
		if (param["pageIndex"] == data.pages) {
			nlist_no();
		}
		
	};
	
	//失败回调函数
	var error = function (){
		$(".ajax_noload").show();
	};

	ajaxPost(url,data,success,error);
	
}




//滚动加载
var range = 1000; //距下边界长度/单位px
var huadong = true;
var totalheight = 0;
var main = $("#ajax_goodsList"); //主体元素
$(window).scroll(function() {
	
	//判断当前页是否大于总页数
	if(param["pageIndex"] > totalPageNum){
		nlist_no();
		return;
	}
	
	
	var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)
	
	totalheight = parseFloat($(window).height()) + parseFloat(srollPos); //滚动条当前位置距顶部距离+浏览器的高度
	
		
		
		if(($(document).height() == totalheight)){
				//加载下一页
				param["pageIndex"]++;
				
				goodsCategoryList();

				$('.lazyload').picLazyLoad({
					threshold: 1000
				}); //图片延时加载
		}else {
			if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range
			//处理滚动时无限加载
			if(huadong){
				
					huadong = false;
				
					param["pageIndex"]++;

					goodsCategoryList();


					$('.lazyload').picLazyLoad({
						threshold: 1000
					}); //图片延时加载
				
				}
			}else {
				huadong = true;
			}
		}

});







//判断商品是否存在
function nlist_no() {
	$(".nlist_loading").css("display", "none");
	//判断是没有商品还是没有更多
	var goodsNum = $("#ajax_goodsList").html();
	if (goodsNum == "") {
		$(".nlist_no").show();
	} else {
		$(".nlist_nomore").css("display", "block");
	}
}





