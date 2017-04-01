var totalScore;





var param = {};

//每页显示
param["pageSize"] = 8;

//当前第几页
param["pageIndex"] = 1;

param["userInfo.phone"] = user;

//总页数
var totalPageNum="";

//加载商品列表	
function exchangeHistoryList() {
	var paramsStr = '';
	for (v in param) {
		paramsStr = paramsStr + v + '=' + param[v] + '&';
	}
	console.log(URLS.SERVER_URL + URLS.exchangeHistoryList + '?' + paramsStr.substr(0, paramsStr.length - 1));

	var url = URLS.SERVER_URL + URLS.exchangeHistoryList;
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

				html += "<div class='exchange_history_li'><div class='index_list_title'>" + goodsList[k]['orderTime'] + "<em class='r g0'>" + goodsList[k]['orderStatus']+ "</em></div>";
				html += "<a class='exchange_history_order' href='order_details.html?user=" + user + "&id=" + goodsList[k]['id']+ "'"+">";
				html += "<img class='lazyload'  src=" + goodsList[k]['cover'] + ">";
				html += "<span class='ell'>" + goodsList[k]['name'] + "</span>";
				html += "<p class='g0'>" + goodsList[k]['score'] + "积分</p>";
				html += "</a></div><div class='nhr'></div>";
	

			}
			
			$("#ajax_exchangeHistoryList").append(html);
			lazyload();
		
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

//首次加载
exchangeHistoryList();


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
				
				exchangeHistoryList();

				$('.lazyload').picLazyLoad({
					threshold: 1000
				}); //图片延时加载
		}else {
			if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range
			//处理滚动时无限加载
			if(huadong){
				
					huadong = false;
				
					param["pageIndex"]++;

					exchangeHistoryList();


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
	var goodsNum = $("#ajax_exchangeHistoryList").html();
	if (goodsNum == "") {
		$(".nlist_no").show();
	} else {
		$(".nlist_nomore").css("display", "block");
	}
}





//返回
function back_fun() {
	var jsonParams = {
		'funName': 'back_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
};