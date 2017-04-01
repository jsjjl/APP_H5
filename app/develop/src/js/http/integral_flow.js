var TotalScoreParam={};
TotalScoreParam["phone"]=user;
var url = URLS.SERVER_URL + URLS.myintegral;
var data = TotalScoreParam;
//成功回调函数
var success = function(data){
	console.log(data);
	//大于0显示积分否则显示错误信息
	if(data.code > 0){
			$("#ajax_integralTotal").empty().append("&nbsp"+ data.datas.totalScore +"积分");
	}else{
		alert(data.msg);
	}

};
ajaxPost(url,data,success);



var param={};
param["phone"] = user;
param["pageIndex"] = 1;
param["pageSize"] = 15;
param["type"] = 1;




$(".integral_flow_bt1").click(function(){
	if(!$(this).hasClass("active")){
		$(".integral_flow_bt2").removeClass("active");
		$(".integral_flow_bt1").addClass("active");
		$("#ajax_integralList").empty();
		param["type"] = 1;
		param["pageIndex"] = 1;
		param["pageSize"] = 15;
		integralList();
	  }
});

$(".integral_flow_bt2").click(function(){
	if(!$(this).hasClass("active")){
		$(".integral_flow_bt1").removeClass("active");
		$(".integral_flow_bt2").addClass("active");
		$("#ajax_integralList").empty();
		param["type"] = 2;
		param["pageIndex"] = 1;
		param["pageSize"] = 15;
		integralList();
	  }
});

	var wheight = $(window).height();
	var theight = $(".tabs").height();
	var h = wheight - theight;
	$(".swiper-slide").css("height", h);
	$(".swiper-slide").css("overflow-y", "scroll");

//置顶
	 var try_select_top= $(".tabs").offset().top;
	
	 $(window).scroll(function() {
        var s = $(window).scrollTop()+46;
        if (s > try_select_top) {

            $(".tabs").css("position","fixed");
			$(".swiper-container").css("margin-top","38px");
			
        } else {
            $(".tabs").css("position","relative");
			$(".swiper-container").css("margin-top","0");
        };
    });



//总页数
var totalPageNum="";

//加载列表	
function integralList() {
	var paramsStr = '';
	for (v in param) {
		paramsStr = paramsStr + v + '=' + param[v] + '&';
	}
	console.log(URLS.SERVER_URL + URLS.integralTotalScore + '?' + paramsStr.substr(0, paramsStr.length - 1));

	var url = URLS.SERVER_URL + URLS.integralTotalScore;
	var data = param;
	//成功回调函数
	var success = function(data){
		console.log(data);
		
		var html = "";
		//总页数
		totalPageNum = data.pages;
		var integralList_data = data && data.data;
		
		if (integralList_data && integralList_data.length > 0) {
			$(".nlist_nomore,.nlist_no").css("display", "none");
			for (var k = 0; k < integralList_data.length; k++) {
				html += "<div class='integral_flow_li'><em>"+integralList_data[k]['integralType']+"</em>"+integralList_data[k]['integralDate']+"<b>";
				if(param["type"] == 1){
					html += "+";
				}
				html += integralList_data[k]['score'];
				html += "</b></div>";
			}
			
			$("#ajax_integralList").append(html);
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
integralList();


//滚动加载
var range = 1000; //距下边界长度/单位px

var huadong = true;

var totalheight = 0;
var main = $("#ajax_integralList"); //主体元素
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
				
				integralList();

				$('.lazyload').picLazyLoad({
					threshold: 1000
				}); //图片延时加载
		}else {
			if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range
			//处理滚动时无限加载
			if(huadong){
				
					huadong = false;
				
					param["pageIndex"]++;

					integralList();


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
	var goodsNum = $("#ajax_integralList").html();
	if (goodsNum == "") {
		$(".nlist_nomore").hide();
		$(".nlist_no").show();
	} else {
		$(".nlist_nomore").css("display", "block");
	}
}
