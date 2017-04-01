var totalScore,goodsId;



if (GetQueryString("totalScore")) {
	totalScore = GetQueryString("totalScore");
}

if (GetQueryString("goodsId")) {
	goodsId = GetQueryString("goodsId");
}

var param = {};
param["id"] = goodsId;

//加载商品数据
function ajax() {
	var url = URLS.SERVER_URL + URLS.details;
	var data = param;
	var paramsStr = '';
		for (v in param) {
			paramsStr = paramsStr + v + '=' + param[v] + '&';
		}
	console.log(URLS.SERVER_URL + URLS.details + '?' + paramsStr.substr(0, paramsStr.length - 1));
	//成功回调函数
	var success = function(data){

		
	
		
		console.log(data);
		//加载_幻灯片	
		var html = "";
		var bannerList = data.img;
		for (var k = 0; k < data.datas.imgs.length; k++) {
			html += "<div class='swiper-slide'>";
			html += "<img class='lazyload' src='images/default.gif' data-original=" + data.datas.imgs[k] + " >";
			html += "</div>";
		}
		

		$("#ajax_banner").empty().append(html);
		
		//图片延时加载
		lazyload();

		
		//插件_幻灯片
		var swiper = new Swiper('.details_banner .swiper-container', {
				pagination: '.details_banner .swiper-pagination',
				autoplay: 2000,
				autoplayDisableOnInteraction : false,
				speed:500,
				loop: true,
				longSwipesRatio : 0.1,
		});	
		
		

		//加载_详情 标题 价格
		$("#ajax_details_main").empty().append(data.datas['details']);
		$("#ajax_details_name").empty().append(data.datas['name']);
		$("#ajax_details_integral").empty().append(data.datas['score']);
		$("#ajax_details_price").empty().append(data.datas['price']);
		
		
				var bt;
				var details_foot = "";
				var my_integral=totalScore;
				var need_integral = data.datas['score'];
				var sell_out = data.datas['num'];
				if(sell_out <= 0){
					bt = 3;
				}else if(my_integral >= need_integral){
					bt = 1;
				}else{
					bt = 2;
				}
				console.log(bt);
				
				if (bt == 1) {
					details_foot = "<a class='details_foot_right' href='settlement.html?totalScore=" + totalScore + "&goodsId=" + data.datas['id']+ "'"+">立即兑换</a>";
				}
				if (bt == 2) {
					details_foot = "<a href='javascript:;' class='details_foot_right bt_no'>积分不足</a>";
				}
				if (bt == 3) {
					details_foot = "<a href='javascript:;' class='details_foot_right bt_no'>售罄</a>";
				}


				$("#ajax_details_foot").append(details_foot);
		
				$(".loading").addClass("close");
				setTimeout(function(){$(".loading").remove();},1000);
		
		

		
		

		//点击_幻灯片
//		$(".nbanner .swiper-slide").click(function() {
//			var SORT = $(this).attr("data-SORT");
//			var BANNER_JUMP_ID = $(this).attr("data-BANNER_JUMP_ID");
//			var BANNER_CONTENT = $(this).attr("data-BANNER_CONTENT");
//			var BANNER_IMG = $(this).attr("data-BANNER_IMG");
//			var ID = $(this).attr("data-ID");
//			var BANNER_LAYOUT = $(this).attr("data-BANNER_LAYOUT");
//			var BANNER_JUMP_FLAG = $(this).attr("data-BANNER_JUMP_FLAG");
//			var STATUS = $(this).attr("data-STATUS");
//			var NUM = $(this).attr("data-NUM");
//			var BANNER_NAME = $(this).attr("data-BANNER_NAME");
//
//			var jsonParams = {
//				'funName': 'banner_item_fun',
//				'params': {
//					'SORT': SORT,
//					'BANNER_JUMP_ID': BANNER_JUMP_ID,
//					'BANNER_CONTENT': BANNER_CONTENT,
//					'BANNER_IMG': BANNER_IMG,
//					'ID': ID,
//					'BANNER_LAYOUT': BANNER_LAYOUT,
//					'BANNER_JUMP_FLAG': BANNER_JUMP_FLAG,
//					'STATUS': STATUS,
//					'NUM': NUM,
//					'BANNER_NAME': BANNER_NAME
//				}
//			};
//			native.nativeFun(jsonParams);
//		});
		
		
	};
	
	
	
	
	
	//失败回调函数
	var error = function (){
		$(".ajax_noload").show();
	};

	ajaxPost(url,data,success,error);
}

ajax();
