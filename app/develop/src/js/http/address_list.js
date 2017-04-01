var addressId;



if (GetQueryString("addressId")) {
	addressId = GetQueryString("addressId");
}
$("#add_addressbt").attr("href","add_address.html" );

var address_param={};
address_param["phone"] = user;
//加载用户收货地址
function goods_user_address() {
	var url = URLS.SERVER_URL + URLS.userAddress;
	var data = address_param;
	var paramsStr = '';
			for (v in address_param) {
				paramsStr = paramsStr + v + '=' + address_param[v] + '&';
			}
			console.log(URLS.SERVER_URL + URLS.userAddress + '?' + paramsStr.substr(0, paramsStr.length - 1));
	//成功回调函数
	var success = function(data){
		console.log(data);
		var html = "";

		
		for (var k = 0; k < data.datas.length; k++) {
			html += "<div class='set_list' date-id="+data.datas[k].id+">";
			if(data.datas[k].theDefault == true){
				html += "<i class='iconfont icon-qiandao g0 '></i>";
			}else{
				html += "<i class='iconfont icon-qiandao g0 vh'></i>";
			}
			html += "<p>"+data.datas[k].contactName+"<em>"+data.datas[k].contactPhone+"</em><span>"+data.datas[k].address+data.datas[k].detailAddress+"</span></p>";
			html += "<a href='edit_address.html?addressId="+data.datas[k].id+"&user="+user+"'><i class='iconfont icon-weibiaoti2010104'></i></a></div>";

		}
		$("#ajax_useradd_msg").append(html);
		
		$(".set_list p").click(function(){
			if($(this).siblings(".icon-qiandao").hasClass("vh")){
			var mythis = $(this);
			var address_de={};
			address_de["id"] = $(this).parent().attr("date-id");
			address_de["theDefault"] = true;
			address_de["userInfo.phone"] = user;
			var url = URLS.SERVER_URL + URLS.userAddressmodifyDefault;
			var data = address_de;
			
			var paramsStr = '';
			for (v in address_de) {
				paramsStr = paramsStr + v + '=' + address_de[v] + '&';
			}
			console.log(URLS.SERVER_URL + URLS.userAddressmodifyDefault + '?' + paramsStr.substr(0, paramsStr.length - 1));
					
			var success = function(data){
				console.log(data.code);
				if(data.code == 1){
					$(".icon-qiandao").addClass("vh");
					mythis.siblings(".icon-qiandao").removeClass("vh");
				}
			};
			//失败回调函数
			var error = function (){
				$(".ajax_noload").show();
			};
			ajaxPost(url,data,success,error);}

});
		

	};

	//失败回调函数
	var error = function (){
		$(".ajax_noload").show();
	};
	ajaxPost(url,data,success,error);

}

goods_user_address();

$(".set_list a").mousedown(function(event){
            event.stopPropagation();
});

$(".set_list a").mousedown(function(event){
  return false;
});
