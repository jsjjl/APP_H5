var scrollh=42;
URLS.SERVER_URL = "http://yzrd.hangsheng.com.cn:8888/news/";

var zhText,autoContent; 
function baiduAuto(zhText){
zhText = encodeURI(zhText);
$("audio").remove();
$("body").append("<audio autoplay='autoplay' id='myAudio'><source src='http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text="+ zhText +"'type='audio/mpeg'><embed height='0' width='0' src='http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text="+ zhText +"'></audio>");
	
			var aud = document.getElementById("myAudio");
			aud.onended = function() 
			{
				console.log("音频已播放完成");
				$(".news_bt_r").click();
			};
}




//获取分类
var url = URLS.SERVER_URL + URLS.newsAllCategory;
var data = "";
//成功回调函数
var success = function(data){
	//console.log(data);
	var html = "";

		var tabList = data;
	//首次加载
	if (tabList && tabList.length > 0) {

			for (var k = 0; k < tabList.length; k++) {
					
				if (tabList && tabList[k].children.length > 0) {
					for (var i = 0; i < tabList[k].children.length; i++) {
						html +="<span data_id='"+tabList[k].children[i].id+"' >"+tabList[k].children[i].name+"</span>";
					}
				}
				
			}
			
			$("#ajax_news_tab").empty().append(html);
			$(".news_tab").find('span').eq(0).addClass("active");
			
				
			//获取列表
			var category_data={};
			category_data['id']=$(".news_tab").find('span').eq(0).attr("data_id");
			//console.log(category_data['parameter']);
			var url = URLS.SERVER_URL + URLS.newsNewsItem;
			var data = category_data;
			

			//成功回调函数
			var success = function(data){
				//console.log(data);
				var liList = data;
				html = "";
						if (liList && liList.length > 0) {

							for (var k = 0; k < liList.length; k++) {
								html +="<div class='news_li_box ell'  data_id='"+liList[k].id+"' ><i class='iconfont icon-notice-copy'></i> "+liList[k].title+"</div>";				
							}

							$("#ajax_news_list").empty().append(html);
							$("#ajax_news_list").find('div').eq(0).addClass("active");
							
							$('#ajax_news_list').scrollTop(0);
							scrollh=42;
							
							//获取新闻详情
							var iteml_data={};
							iteml_data['id']=$("#ajax_news_list").find('div').eq(0).attr("data_id");
							//console.log(iteml_data['id']);
							var url = URLS.SERVER_URL + URLS.newsItem;
							var data = iteml_data;
							//成功回调函数
							var success = function(data){
								//console.log(data);
								html = "";
								html +="<div class='news_li_title'>"+data.title+"</div>";
								html +="<div class='news_li_time'>"+data.relativeDate+"  "+data.author+"</div>";
								html +="<div class='news_li_main'>"+data.content+"</div>";
								//console.log(data.content);
								autoContent =data.content.replace(/<(?!\/?p\a)[^>]+>|\s|\r|\n/ig,'');

								
								var len=autoContent.replace(/[^\x00-\xff]/g, 'xx').length;; 
								if(len>2048){console.log("文字超了");autoContent = autoContent.substring(0, 850); };
								
								console.log(autoContent);
								baiduAuto(autoContent);
								$("#ajax_news_cont").empty().append(html);
								
							};
							ajaxPost(url,data,success);
							
							
							
								//新闻标题切换
								$(".news_li_box").click(function(){
									$(".news_li_box").removeClass("active");
									$(this).addClass("active");
									//获取新闻详情
									var iteml_data={};
									iteml_data['id']=$(this).attr("data_id");
									console.log(iteml_data['id']);
									var url = URLS.SERVER_URL + URLS.newsItem;
									var data = iteml_data;
									//成功回调函数
									var success = function(data){
											html = "";
											html +="<div class='news_li_title'>"+data.title+"</div>";
											html +="<div class='news_li_time'>"+data.relativeDate+"  "+data.author+"</div>";
											html +="<div class='news_li_main'>"+data.content+"</div>";
											autoContent =data.content.replace(/<(?!\/?p\a)[^>]+>|\s|\r|\n/ig,'');
											var len=autoContent.replace(/[^\x00-\xff]/g, 'xx').length;; 
											if(len>2048){console.log("文字超了");autoContent = autoContent.substring(0, 850); };

											console.log(autoContent);
										
											baiduAuto(autoContent);
											$("#ajax_news_cont").empty().append(html);
									};
									ajaxPost(url,data,success);
								});
		
							
						}
				else{
					nlist_no();
				}

					
			};
			ajaxPost(url,data,success);
		
		
		
			
		} 
	
	//tab切换
	$(".news_tab span").click(function(){
		$(".news_tab span").removeClass("active");
		$(this).addClass("active");
		//获取列表
		var category_data={};
		category_data['id']=$(this).attr("data_id");
		//获取列表
			console.log(category_data['id']);
			var url = URLS.SERVER_URL + URLS.newsNewsItem;
			var data = category_data;
			

			//成功回调函数
			var success = function(data){
				//console.log(data);
				var liList = data;
				html = "";
						if (liList && liList.length > 0) {

							for (var k = 0; k < liList.length; k++) {
								html +="<div class='news_li_box ell'  data_id='"+liList[k].id+"' ><i class='iconfont icon-notice-copy'></i> "+liList[k].title+"</div>";				
							}

							$("#ajax_news_list").empty().append(html);
							$("#ajax_news_list").find('div').eq(0).addClass("active");
							$('#ajax_news_list').scrollTop(0);
							scrollh=42;
							
							//获取新闻详情
							var iteml_data={};
							iteml_data['id']=$("#ajax_news_list").find('div').eq(0).attr("data_id");
							//console.log(iteml_data['id']);
							var url = URLS.SERVER_URL + URLS.newsItem;
							var data = iteml_data;
							//成功回调函数
							var success = function(data){
								//console.log(data);
								html = "";
								html +="<div class='news_li_title'>"+data.title+"</div>";
								html +="<div class='news_li_time'>"+data.relativeDate+"  "+data.author+"</div>";
								html +="<div class='news_li_main'>"+data.content+"</div>";
								autoContent =data.content.replace(/<(?!\/?p\a)[^>]+>|\s|\r|\n/ig,'');
								var len=autoContent.replace(/[^\x00-\xff]/g, 'xx').length;; 
								if(len>2048){console.log("文字超了");autoContent = autoContent.substring(0, 850); };
								
								console.log(autoContent);
								baiduAuto(autoContent);
								$("#ajax_news_cont").empty().append(html);
							};
							ajaxPost(url,data,success);
							
							
								//新闻标题切换
								$(".news_li_box").click(function(){
									$(".news_li_box").removeClass("active");
									$(this).addClass("active");
									//获取新闻详情
									var iteml_data={};
									iteml_data['id']=$(this).attr("data_id");
									console.log(iteml_data['id']);
									var url = URLS.SERVER_URL + URLS.newsItem;
									var data = iteml_data;
									//成功回调函数
									var success = function(data){
											html = "";
											html +="<div class='news_li_title'>"+data.title+"</div>";
											html +="<div class='news_li_time'>"+data.relativeDate+"  "+data.author+"</div>";
											html +="<div class='news_li_main'>"+data.content+"</div>";
											autoContent =data.content.replace(/<(?!\/?p\a)[^>]+>|\s|\r|\n/ig,'');
											var len=autoContent.replace(/[^\x00-\xff]/g, 'xx').length;; 
											if(len>2048){console.log("文字超了");autoContent = autoContent.substring(0, 850); };

											console.log(autoContent);
											baiduAuto(autoContent);
											$("#ajax_news_cont").empty().append(html);
									};
									ajaxPost(url,data,success);
								});
							
						}
				else{
					nlist_no();
				}

					
			};
			ajaxPost(url,data,success);
		
		
	});
	
	
	

};
ajaxPost(url,data,success);







//判断是否有数据
function nlist_no() {
	//判断是没有商品还是没有更多
	var newsNum = $("#ajax_news_list").html();
	if (newsNum == "") {
		$("#ajax_news_list").append("<p class='tc'>暂无新闻</p>");
		$("#ajax_news_cont").append("<p class='tc'>暂无新闻</p>");
	}
}




	
$(function(){


	$(".news_bt_l").click(function(){
		var x = document.getElementById("myAudio");

	
		if($(this).hasClass("icon-yuyuying")){
			  x.pause(); 
			$(this).removeClass("icon-yuyuying");
			$(this).addClass("icon-zanting- stop");
			
			
		}else{
			 x.play(); 
			$(this).addClass("icon-yuyuying");
			$(this).removeClass("icon-zanting- stop");
		}
	});
	 

	$(".news_bt_r").click(function(){
		var current=$("#ajax_news_list div.active");
		
		 if(current.next().length > 0){
			 
			current.next().addClass("active");
			current.removeClass("active");
			 
			 var container=$('#ajax_news_list');
			 container.scrollTop(scrollh);
			 scrollh = scrollh + 42;
			 console.log(scrollh);
			 
					//获取新闻详情
					var iteml_data={};
					iteml_data['id']=$("#ajax_news_list div.active").attr("data_id");
					console.log(iteml_data['id']);

					var url = URLS.SERVER_URL + URLS.newsItem;
					var data = iteml_data;
					//成功回调函数
					var success = function(data){
							html = "";
							html +="<div class='news_li_title'>"+data.title+"</div>";
							html +="<div class='news_li_time'>"+data.relativeDate+"  "+data.author+"</div>";
							html +="<div class='news_li_main'>"+data.content+"</div>";			
						
							autoContent =data.content.replace(/<(?!\/?p\a)[^>]+>|\s|\r|\n/ig,'');
							var len=autoContent.replace(/[^\x00-\xff]/g, 'xx').length;; 
							if(len>2048){console.log("文字超了");autoContent = autoContent.substring(0, 850); };
								
							console.log(autoContent);
							baiduAuto(autoContent);
							$("#ajax_news_cont").empty().append(html);
					};
					ajaxPost(url,data,success);
			 
		 }else{
			 
//			 $("#ajax_news_list").append("<div class='g0 tc new_no'>没有更多新闻啦</div>");
		 };
		
		
		
		
		

				


		
		
	});
	
	
	
	$(".news_bt_f").click(function(){
		if($(this).children("i").hasClass("icon-xinwen")){
			$(this).children("i").removeClass("icon-xinwen");
			$(this).children("i").addClass("icon-fenlei");
			$(this).children("b").html("新闻标题");
			$(".project").addClass("hover");
			
		}else{
			$(this).children("i").addClass("icon-xinwen");
			$(this).children("i").removeClass("icon-fenlei");
			$(this).children("b").html("新闻内容");
			$(".project").removeClass("hover");
			
			
		}
	});
})