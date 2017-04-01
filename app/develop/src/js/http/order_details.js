var param={};
var id,xuni;



if (GetQueryString("id")) {
	id = GetQueryString("id");
}

param["id"] = id;
//加载商品数据
function goods_select() {	
	var url = URLS.SERVER_URL + URLS.ordersView;
	var data = param;
	//成功回调函数
	var success = function(data){
		console.log(data);
		//加载_顶部商品信息	
		var html = "";
			html += "<img src=" + data.datas.cover + " >";
			html += "<span class='ell'>"+ data.datas.name + "</span><p><em class='g0'>"+ data.datas.score +"积分</em>X 1</p>";
			$("#ajax_goods_select").empty().append(html);
			$("#ajax_order_detailstop").empty().append("下单时间："+data.datas.orderTime+"<em class='r g0' id='ajax'>"+data.datas.orderStatus+"</em>");
				//判断是否虚拟物品
				xuni = data.datas.type;
				var	user_msg = "";

				if(xuni > 0){
					user_msg += "<div class='order_box order_box_yzm' data-clipboard-action='copy' data-clipboard-target='#yzm'><div class='index_list_title'>我的验证码</div><p><em id='yzm'>";
					user_msg += data.datas.cdkey+"</em>复制验证码<span>"+data.datas.reminder+"</span></p></div>";
				}else{
					user_msg += "<div class='order_box'><div class='index_list_title'>我的收货地址</div><p>";
					user_msg += data.datas.contactName+"<em>"+data.datas.contactPhone+"</em><span>"+data.datas.address+"<br/>"+data.datas.detailAddress+"</span></p></div>";
					if(data.datas.orderStatus != "已取消"){$(".cont").append("<a href='javascript:;' class='set_bt order_cancel'>取消订单</a>");}
				}
				$("#ajax_userorder_msg").append(user_msg);
		
				//提交订单开始
		var orderCancel_param={};
		orderCancel_param["id"]=id;

		$(".order_cancel").click(function(){
			if (!$(this).hasClass('bt_no')) {

				$(this).addClass("bt_no");
				$(this).html("提交中");

				var url = URLS.SERVER_URL + URLS.orderCancel;
				var data = orderCancel_param;
				var paramsStr = '';
				for (v in orderCancel_param) {
					paramsStr = paramsStr + v + '=' + orderCancel_param[v] + '&';
				}
				console.log(url + '?' + paramsStr.substr(0, paramsStr.length - 1));
				//成功回调函数
				var success = function(data){
					if(data.code > 0){
							console.log(data);
							document.location.reload();
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


goods_select();
