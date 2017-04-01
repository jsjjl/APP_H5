var param={};
var goodsId,totalScore,shippingAddressId;



if (GetQueryString("goodsId")) {
	goodsId = GetQueryString("goodsId");
}

param["id"] = goodsId;
param["simple"] = true;
//虚拟物品
var xuni;

//加载商品数据
function goods_select() {	
	var url = URLS.SERVER_URL + URLS.details;
	var data = param;
	//成功回调函数
	var success = function(data){
		console.log(data);
		//加载_顶部商品信息	
		var html = "";
			html += "<img src=" + data.datas.cover + " >";
			html += "<span class='ell'>"+ data.datas.name + "</span><p><em class='g0'>"+ data.datas.score +"积分</em>X 1</p>";
			$("#ajax_goods_select").empty().append(html);
		
				//判断是否虚拟物品
				xuni = data.datas.type;
				var	user_msg = "";
				if(xuni > 0){
					user_msg += "<div class='set_virtual'>虚拟物品无需收货地址，下单后请注意查收兑换码！</div>";
					user_msg += "<a href='javascript:;' class='set_bt order_submit' id='xuni_bt'>订单提交</a>";
				}else{
					goods_user_address();
				}
				$("#ajax_user_msg").append(user_msg);
		
				//提交订单开始
		var orderSubmit_param={};
		orderSubmit_param["userInfo.phone"]=user;
		orderSubmit_param["gift.id"]=goodsId;

		$(".order_submit").click(function(){
			if (!$(this).hasClass('bt_no')) {

				$(this).addClass("bt_no");
				$(this).html("提交中");

				var url = URLS.SERVER_URL + URLS.orderSubmit;
				var data = orderSubmit_param;
				var paramsStr = '';
				for (v in orderSubmit_param) {
					paramsStr = paramsStr + v + '=' + orderSubmit_param[v] + '&';
				}
				console.log(url + '?' + paramsStr.substr(0, paramsStr.length - 1));
				//成功回调函数
				var success = function(data){
					if(data.code > 0){
						$("html").append("<div class='cover-decision'></div>");
							console.log(data);
							$("#submit_1 span").html(data.datas.cdkey);
							$("#submit_1 p").html(data.datas.reminder);
							$("#submit_1").addClass("show");
					}
					else{
						alert(data.msg);
						window.history.back();
					}
							
				};

			//失败回调函数
			var error = function (){
				$(".ajax_noload").show();
			};
			ajaxPost(url,data,success,error);

			}
		});
		//提交订单结束

	};

	
	//失败回调函数
	var error = function (){
		$(".ajax_noload").show();
	};
	ajaxPost(url,data,success,error);
}

var address_param={};
address_param["phone"] = user;
address_param["theDefault"] = true;
 
//加载用户收货地址
function goods_user_address() {
	var url = URLS.SERVER_URL + URLS.userAddress;
	var data = address_param;
	var paramsStr = '';
	for (v in address_param) {
		paramsStr = paramsStr + v + '=' + address_param[v] + '&';
	}
	console.log(url + '?' + paramsStr.substr(0, paramsStr.length - 1));
	//成功回调函数
	var success = function(data){
		console.log(data);
		var html = "";
		//判断是否有收货地址
		var userAddress = data && data.datas;
		if (userAddress && userAddress.length != "") {
			html = "<div class='set_list'><i class='iconfont icon-ditu-copy'></i><p>" + data.datas.contactName + "<em>" + data.datas.contactPhone + "</em><span>" + data.datas.address + data.datas.detailAddress + "<br/>" + "</span></p><a href='address_list.html'><i class='iconfont icon-jiantou'></i></a></div><a href='javascript:;' class='set_bt order_submit' >订单提交</a>";
			shippingAddressId=data.datas.id;
		}else{
			html = "<a href='add_address.html'class='set_bt'>添加收货地址</a>";
		}
		$("#ajax_user_msg").append(html);
		
		//提交订单开始
		var orderSubmit_param={};
		orderSubmit_param["userInfo.phone"]=user;
		orderSubmit_param["gift.id"]=goodsId;
		orderSubmit_param["shippingAddress.id"]=shippingAddressId;

		$(".order_submit").click(function(){
			if (!$(this).hasClass('bt_no')) {

				$(this).addClass("bt_no");
				$(this).html("提交中");

				var url = URLS.SERVER_URL + URLS.orderSubmit;
				var data = orderSubmit_param;
				var paramsStr = '';
				for (v in orderSubmit_param) {
					paramsStr = paramsStr + v + '=' + orderSubmit_param[v] + '&';
				}
				console.log(url + '?' + paramsStr.substr(0, paramsStr.length - 1));
				//成功回调函数
				var success = function(data){
					if( data.code > 0 ){
						$("html").append("<div class='cover-decision'></div>");
							console.log(data);
							$("#submit_2").addClass("show");
					}
					else{
						alert(data.msg);
						window.history.back();
					}
				};

			//失败回调函数
			var error = function (){
				$(".ajax_noload").show();
			};
			ajaxPost(url,data,success,error);

			}
		});
		//提交订单结束

	};

	//失败回调函数
	var error = function (){
		$(".ajax_noload").show();
	};
	ajaxPost(url,data,success,error);

}



//弹出框中确认按钮事件
$(".submit_close").click(function(){
			
			if($(this).is('.submit_copy')){
				//虚拟物品
				
				var clipboard = new Clipboard('.submit_copy');
				clipboard.on('success', function(e) {
					console.log("复制成功"+e);
					$(".cover-decision").remove();
					$(".submit").removeClass("show");
					$(".submit").css("display","none");
					window.history.back();
				});

				clipboard.on('error', function(e) {
					console.log("复制失败"+e);
					
					$(".cover-decision").remove();
					$(".submit").removeClass("show");
					$(".submit").css("display","none");
					window.history.back();
				});
				
			}else{
				//实物
				$(".cover-decision").remove();
				$(".submit").removeClass("show");
				$(".submit").css("display","none");
				window.history.back();
			}
		
});

goods_select();
