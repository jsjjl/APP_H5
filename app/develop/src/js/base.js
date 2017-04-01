//页面rem
(function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
			  var clientWidth = $(".nwrapper").width();
              /*if (!clientWidth) return;*/
              docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			  
            };
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



//图片预加载
function lazyload(){
	$('.lazyload').picLazyLoad({
	threshold: 400
	});
}

var user;

if(GetQueryString("user")!=null){
	user = GetQueryString("user");
}else{
	user = localStorage.user_phone;
}


//页面淡入效果
$(document).ready(function(e) {
	//图片延时加载
	lazyload();
	
	//设置本地缓存处理返回上一页重新加载
	localStorage.setItem('refreshed', 'true');	
	
	//返回
	$('.back').on('click', function() {
		window.history.back();
		localStorage.setItem('refreshed', 'false');
	});
	
	
	
	
	
	

	
	
	//判断各种浏览器，找到正确的方法
//	function launchFullscreen(element) {
//	  if(element.requestFullscreen) {
//		element.requestFullscreen();
//	  } else if(element.mozRequestFullScreen) {
//		element.mozRequestFullScreen();
//	  } else if(element.webkitRequestFullscreen) {
//		element.webkitRequestFullscreen();
//	  } else if(element.msRequestFullscreen) {
//		element.msRequestFullscreen();
//	  }
//	}

	// 启动全屏
	//launchFullScreen(document.documentElement);
	

	
//	  var width = document.documentElement.clientWidth;  
//	  var height =  document.documentElement.clientHeight;  
//	  if( width < height ){  
//		  console.log(width + " " + height);  
//		  $print =  $('.nwrapper');  
//		  $print.width(height);  
//		   $print.height(width);  
//		  $print.css('top',  (height-width)/2 );  
//		  $print.css('left',  0-(height-width)/2 );  
//		  $print.css('transform' , 'rotate(90deg)');  
//		   $print.css('transform-origin' , '50% 50%');  
//	 }  
//	
//	var evt = "onorientationchange" in window ? "orientationchange" : "resize";  
//  
//   window.addEventListener(evt, function() {  
//       console.log(evt);  
//        var width = document.documentElement.clientWidth;  
//        var height =  document.documentElement.clientHeight;  
//        $print =  $('.nwrapper');  
//        if( width > height ){  
//           $print.width(width);  
//           $print.height(height);  
//           $print.css('top',  0 );  
//           $print.css('left',  0 );  
//           $print.css('transform' , 'none');  
//           $print.css('transform-origin' , '50% 50%');  
//        }  
//        else{  
//           $print.width(height);  
//           $print.height(width);  
//           $print.css('top',  (height-width)/2 );  
//           $print.css('left',  0-(height-width)/2 );  
//           $print.css('transform' , 'rotate(90deg)');  
//           $print.css('transform-origin' , '50% 50%');  
//        }  
//  
//   }, false); 
	
	

		$("body").css("visibility","visible");$("body").addClass("jbox");
	});


//获取url
function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(decodeURIComponent(r[2]));
    }
    return null;
}

function back_fun() {
		var jsonParams = {
			'funName': 'back_fun',
			'params': {}
		};
		native.nativeFun(jsonParams);
};

 