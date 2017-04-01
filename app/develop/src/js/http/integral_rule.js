var url = URLS.SERVER_URL + URLS.integralRule;
var data = "";
//成功回调函数
var success = function(data){
	console.log(data);
	//大于0显示积分否则显示错误信息
	if(data.code > 0){
			details = data.datas.details;
			$("#ajax_integralRule").html(details);
	}else{
		alert(data.msg);
	}
};
ajaxPost(url,data,success);