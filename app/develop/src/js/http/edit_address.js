var addressId;


if (GetQueryString("addressId")) {
	addressId = GetQueryString("addressId");
}
var address_param={};
address_param["id"] = addressId;
address_param["userInfo.phone"] = user;

//加载用户收货地址
function get_user_address() {
	
	var url = URLS.SERVER_URL + URLS.userAddressView;
	var data = address_param;
	var paramsStr = '';
	for (v in address_param) {
		paramsStr = paramsStr + v + '=' + address_param[v] + '&';
	}
	console.log(URLS.SERVER_URL + URLS.userAddressView + '?' + paramsStr.substr(0, paramsStr.length - 1));
	//成功回调函数
	var success = function(data){
		console.log(data);
		$(".txt_username").val(data.datas.contactName);
		$(".txt_tel").val(data.datas.contactPhone);
		
		var address_top = data.datas.address;
		
		$(".provinceName").html(data.datas.address);
		$(".txt_address").val(data.datas.detailAddress);
		$(".theDefault").val(data.datas.theDefault);
		
		

	};

	//失败回调函数
	var error = function (){
		$(".ajax_noload").show();
	};
	ajaxPost(url,data,success,error);

}
get_user_address();
$(function(){
		//地区选择弹出框
		$("#npost_dizhi").click(function(){
			$("body").append("<div class='cover-decision'></div>");
			$(".mui-dizhi").addClass("show");
			$(".mui-dizhi").css("display","block");
			
			ndz_nav01();
			
			$(".ndz_nav01").click(function(){
				if(!$(this).hasClass("active")){
					 ndz_nav01();
				  }
			});
			
			$(".ndz_nav02").click(function(){
				if(!$(this).hasClass("active") && $(".ndz_nav_li").html() != ""){
					 ndz_nav02();
					$(".ndz_nav03").empty();
				  }
			});
			
			$(".ndz_nav03").click(function(){
				if(!$(this).hasClass("active") && $(".ndz_nav_li").html() != ""){
					 ndz_nav03();
				  }
			});
			
			
			var provinceId;
			var cityId;
			var areaId;
			
			//获取省
			function ndz_nav01(){
				
				$(".ndz_nav span").removeClass("active");
				$(".ndz_nav span.ndz_nav01").addClass("active");
				$(".ndz_nav_li").empty();
				$(".ndz_nav_li").addClass("loading");
				
				var url = URLS.SERVER_URL + URLS.getArea + "";
				console.log(URLS.SERVER_URL + URLS.getArea + "");
					var data = "";
					//成功回调函数
					var success = function(data){
							console.log(data);
								var html = "";
								var getArea = data;
								  for(var k=0;k<getArea.length;k++){
									if(provinceId==getArea[k].id){
										html += "<span class='active'  data-provinceId='"+getArea[k].id+"' >";
									}
									else{
										html += "<span data-provinceId='"+getArea[k].id+"'>";
									}
									html += getArea[k].name;
									html += "</span>";
								  }
								$(".ndz_nav_li").removeClass("loading");
								$(".ndz_nav_li").empty().append(html);
								$(".ndz_nav02").empty();

								$(".ndz_nav_li span").click(function(){
									$(".ndz_nav_li span").removeClass("active");
									$(this).addClass("active");
									$(".ndz_nav01,.provinceName").empty().append($(this).html());
									provinceId=$(this).attr("data-provinceId");
									ndz_nav02();
									 enableSave();
								});
					};
					//失败回调函数
					var error = function (){
						$(".ajax_noload").show();
					};
					ajaxPost(url,data,success,error);
				
			
			}
			
			//获取市
			function ndz_nav02(){
				
				$(".ndz_nav span").removeClass("active");
				$(".ndz_nav02").addClass("active");
				$(".ndz_nav_li").empty();
				$(".ndz_nav_li").addClass("loading");
				
				$.post(URLS.SERVER_URL + URLS.getArea +"?id="+provinceId, {}, function(data) {
					$(".ndz_nav02,.cityName").empty().append(data[0].REGIONNAME);
					var html = "";
					var getArea = data;
				  	for(var k=0;k<getArea.length;k++){
					if(cityId==getArea[k].id){
						html += "<span class='active' data-cityId='"+getArea[k].id+"' >";
					}
					else{
						html += "<span data-cityId='"+getArea[k].id+"' >";
					}
					html += getArea[k].name;
					html += "</span>";
				  }
				 $(".ndz_nav_li").removeClass("loading");
					$(".ndz_nav_li").empty().append(html);
					$(".ndz_nav03").empty();
				 
				 $(".ndz_nav_li span").click(function(){
					$(".ndz_nav_li span").removeClass("active");
					$(this).addClass("active");
					$(".ndz_nav02,.cityName").empty().append($(this).html());
					cityId=$(this).attr("data-cityId");
					ndz_nav03();
					  enableSave();
				});
				},"json");
			}
			
			
			//获取区
			function ndz_nav03(){
				
				$(".ndz_nav span").removeClass("active");
				$(".ndz_nav03").addClass("active");
				$(".ndz_nav_li").empty();
				$(".ndz_nav_li").addClass("loading");
				
				$.post(URLS.SERVER_URL + URLS.getArea +"?id="+cityId, {}, function(data) {
					$(".ndz_nav03,.areaName").empty().append(data[0].REGIONNAME);
					var html = "";
					var getArea = data;
				  	for(var k=0;k<getArea.length;k++){
					if(areaId==getArea[k].id){
						html += "<span class='active' data-areaId='"+getArea[k].id+"' >";
					}
					else{
						html += "<span data-areaId='"+getArea[k].id+"' >";
					}
					html += getArea[k].name;
					html += "</span>";
				  }
					$(".ndz_nav_li").removeClass("loading");
					$(".ndz_nav_li").empty().append(html);
				 
				 $(".ndz_nav_li span").click(function(){
					$(".ndz_nav_li span").removeClass("active");
					$(this).addClass("active");
					$(".ndz_nav03,.areaName").empty().append($(this).html());
					areaId=$(this).attr("data-areaId");
					$(".cover-decision").remove();
					$(".mui-dizhi").removeClass("show");
					$(".mui-dizhi").css("display","none");
					 enableSave();
				});
				},"json");
				
			}
			


			$(".cover-decision").click(function(){
				$(".cover-decision").remove();
				$(".mui-dizhi").removeClass("show");
				$(".mui-dizhi").css("display","none");
			});
			
	});
		
		
		
		
		//提交按钮
		var _need_ck = true,
		_len_username = 0,
		_len_tel = 0,
		_len_provinceName = 0,
		_len_cityName = 0,
		_len_areaName = 0,
		_len_address = 0;

		bindEvents();

	
	
	
	/*页面上所有处理事件*/
	function bindEvents() {

			/*姓名*/
			_len_username = $('.txt_username').on('input', function() {
				$(this).removeClass('txt_err');
				_len_username = this.value.length;
				enableSave();
			}).val().length;

			/*手机号*/
			_len_tel = $('.txt_tel').on('input', function() {
				$(this).removeClass('txt_err');
				_len_tel = this.value.length;
				if(_len_tel > 11){
					 var nums = $(this).val();

					var newStr = nums.substring(0,11);
					$(this).val(newStr);
					
			  
					errTips('手机号码不得超过11位');
				}else{
					errTips('');
				}
				enableSave();
			}).val().length;
		
			
		
			/*地址*/
			_len_address = $('.txt_address').on('input', function() {
				$(this).removeClass('txt_err');
				_len_address = this.value.length;
				enableSave();
			}).val().length;

			/*保存按钮*/
			$('.save_address').on('click', function() {
				if (!$(this).hasClass('bt_no')) {
					save();
				}
			});
		}
	

		/*登录按钮样式判断*/
		function enableSave() {
			_len_provinceName=$('.provinceName').html();
			_len_username=$('.txt_username').val();
			_len_tel=$('.txt_tel').val();
			_len_address=$('.txt_address').val();
			if (_len_username&&_len_tel&&_len_address&&_len_provinceName) {
				$('.save_address').removeClass('bt_no');
				console.log(1);
			} else {
				$('.save_address').addClass('bt_no');
				console.log(2);
			}
		}



		/*错误信息提示*/
		function errTips(msg) {
			if (msg == undefined || msg.length == 0) {
				$('.item_tips').hide().children('.err_msg').removeClass("show");
			} else {
				$('.item_tips').show().children('.err_msg').html(msg);
				$('.item_tips').children('.err_msg').addClass("show");
				setTimeout(function(){$('.item_tips').hide().children('.err_msg').removeClass("show");},3000);
			}
		}
	
		/*验证手机号*/
		function checkPhone(phone) {
			var pattern = /^1[0-9]{10}$/;
			return pattern.test(phone);
		}
	
	
	
	
	



		//加载用户收货地址
		function edit_user_address() {
			
				if (!checkPhone($(".txt_tel").val())) {
					errTips('手机号格式错误');
					$('.txt_tel').focus().addClass('txt_err');
					return;
				}
			
		address_param["contactName"] = $(".txt_username").val();
		address_param["contactPhone"] = $(".txt_tel").val();
		address_param["address"] = $(".provinceName").html()+$(".cityName").html()+$(".areaName").html();
		address_param["detailAddress"] = $(".txt_address").val();
		address_param["theDefault"] = $(".theDefault").val();	
			

			var url = URLS.SERVER_URL + URLS.userAddressEdit;
			var data = address_param;
			
			var paramsStr = '';
			for (v in address_param) {
				paramsStr = paramsStr + v + '=' + address_param[v] + '&';
			}
			
		console.log(URLS.SERVER_URL + URLS.userAddressEdit + '?' + paramsStr.substr(0, paramsStr.length - 1));
			
			//成功回调函数
			var success = function(data){

				console.log(data);
				if(data.code > 0){
					window.history.back();
					localStorage.setItem('refreshed', 'false');
				}else{
					$('.item_tips').show().children('.err_msg').html(data.msg);

				}

			};

			//失败回调函数
			var error = function (){
				$(".ajax_noload").show();
			};
			ajaxPost(url,data,success,error);

		}

		/*提交*/
		function save() {
			
			$('.save_address').addClass('bt_no').html('提交中');
			$('.item_tips').hide();
			edit_user_address();
			
		}
		
		
		
	});