native = function() {}

//判断设备
var ua = navigator.userAgent.toLowerCase();
if (/iphone|ipad|ipod/.test(ua)) {
	native.platfrom = "ios";
} else if (/android/.test(ua)) {
	native.platfrom = "android";
}


//内部测试服务器地址 192.168.20.31:8888     http://yzrd.hangsheng.com.cn:8888     192.168.20.35
URLS.SERVER_URL = "http://yzrd.hangsheng.com.cn:8888/hsae-application/api/";

/*这段代码是IOS固定的，必须要放到js中*/
var setupWebViewJavascriptBridge = function(callback) {
	if (window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	if (window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0)
};

//与原生交互
native.nativeFun = function(params) {
	
	if (native.platfrom === "android") {
		//params = JSON.stringify(params);	
		//console.log(params);
		//android
		window.android[params.funName]();
		//JSInterface.nativeFunction(params);
	} else if (native.platfrom === "ios") {
		//ios
		setupWebViewJavascriptBridge(function(bridge) {
			bridge.callHandler(params.funName, params.params, function responseCallback(responseData) {
				console.log("JS received response:", responseData)
			})
		})
	}

}
//
//function connectWebViewJavascriptBridge(callback) {
//	if (window.WebViewJavascriptBridge) {
//		callback(WebViewJavascriptBridge)
//	} else {
//		document.addEventListener('WebViewJavascriptBridgeReady', function() {
//			callback(WebViewJavascriptBridge)
//		}, false)
//	}
//}
//
//connectWebViewJavascriptBridge(function(bridge) { 
//	bridge.init(function(message, responseCallback) {
//		goodsCategoryList();
//		if (responseCallback) {
//			var type = $("html").attr("data_type")
//			responseCallback(type);
//		}
//	})
//
//})

  


//ajax请求公用函数
function ajaxPost(url,data,success,error,timeout){
	//设置请求超时时间
	if(!timeout){
		timeout = 10000;
	}
	$.ajax({
		type: 'POST',
		timeout : timeout,
		url: url ,
		data: data ,
		xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
		success: function(data){
			success(data);
		} ,
		error : function(){
			$(".ajax_noload").remove();
			$("<div class='ajax_noload'><i class='iconfont icon-wifi g0'></i>网络请求失败，请稍候再试<i class='iconfont icon-shuaxin2 r'></i></div>").prependTo("body");
			$(".ajax_noload").show();
			$(".ajax_noload").unbind('click').click(function () {
				localStorage.setItem('refreshed', 'false');
				window.location.reload();
			})
			//error();
		},
		dataType: 'json'
	});
}


////刷新页面
//$(".ajax_noload").unbind('click').click(function () {
//	localStorage.setItem('refreshed', 'false');
//	window.location.reload();
////	var jsonParams = {
////		'funName': 'reload_web_fun',
////		'params': {}
////	};
////	native.nativeFun(jsonParams);
//})



