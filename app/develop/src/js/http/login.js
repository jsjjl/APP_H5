	$(function(){
	
		if(localStorage.user_phone != null && localStorage.user_phone !="" ){
			window.location.href="index.html";
		}
		
		//提交按钮
		_need_ck = true,
		_phone = '',
		_len_tel = 0;
		_len_sms = 0;

		bindEvents();
		enableCaptcha();

	
	
	
	/*页面上所有处理事件*/
	function bindEvents() {

			/*手机号*/
			_len_tel = $('.txt_tel').on('input', function() {
				$(this).removeClass('txt_err');
				_phone = this.value;
				_len_tel = this.value.length;
				if(_len_tel == 11){
					enableCaptcha();
				}else if(_len_tel > 11){
					var nums = $(this).val();
					var newStr = nums.substring(0,11);
					$(this).val(newStr);
					_phone = newStr;
					errTips('手机号码不得超过11位');
				}else{
					errTips('');
				}
				enableCaptcha();
				enableLogin();
			}).val().length;
		
		
			/*短信验证码*/
			_len_sms = $('.txt_sms').on('input', function() {
				$(this).removeClass('txt_err');
				_len_sms = this.value.length;
				enableLogin();
			}).val().length;
		
		
		
			
			/*获取短信验证码*/
			$('.btn_retransmit').on('click', function() {
				if (!$(this).hasClass('btn_retransmit_no')) {
					docheckPhone();
				}
			});
		
			
		

			/*保存按钮*/
			$('.login_bt').on('click', function() {
				if (!$(this).hasClass('login_no')) {
					login();
				}
			});
		}
	

		/*登录按钮样式判断*/
		function enableLogin() {
			if (_len_tel&&_len_sms) {
				$('.login_bt').removeClass('login_no');
			} else {
				$('.login_bt').addClass('login_no');
			}
		}
		
		
		/*判断短信验证码是否可点击*/
		function enableCaptcha() {
			var $btn = $('.btn_retransmit');
			if (_len_tel && !$btn.hasClass('is_restransit') && _len_tel >= 11) {
				$btn.removeClass('btn_retransmit_no');
			} else {
				$btn.addClass('btn_retransmit_no');
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
			
		/*手机号验证*/
		function docheckPhone() {
			var params = {
				'mobile': _phone
			};

			if (!checkPhone(_phone)) {
				errTips('手机号格式错误');
				$('.txt_tel').focus().addClass('txt_err');
				return;
			}
			$('.item_tips').hide();
			
			//获取短信验证码接口
			var msgparam = {};
			msgparam["phone"] = _phone;
			var url = URLS.SERVER_URL + URLS.getsms;
			var data = msgparam;
			console.log(url+data);
			//成功回调函数
			var success = function(data){
				if(data.code == 1){
					sendSmsCode();
					console.log(data.datas);
				}else{
					errTips('验证码发送失败,'+data.msg);
				}
			};
			//失败回调函数
			var error = function (){
				$(".ajax_noload").show();
			};
			ajaxPost(url,data,success,error);
			
			
		}
	
		/*发送短信验证码*/
		function sendSmsCode() {
			var $btn = $('.btn_retransmit');
			$btn.html('60s后重发').addClass('btn_retransmit_no').addClass('is_restransit');
			var count = 60;
			var ret = setInterval(function() {
				--count;
				if (count == 0) {
					$btn.html('获取验证码').removeClass('btn_retransmit_no').removeClass('is_restransit');
					clearInterval(ret);
				} else {
					$btn.html('' + count + 's后重发');
				}
			}, 1000);

		}




		/*提交验证*/
		function login() {
			if (!checkPhone(_phone)) {
				errTips('手机号格式错误');
				$('.txt_tel').focus().addClass('txt_err');
				return;
			}
			
			$('.item_tips').hide().children('.err_msg').removeClass("show");
			$('.login_bt').addClass('login_no').html('登录中');
			
			var param = {};
			param["phone"] = $(".txt_tel").val();
			param["code"] = $(".txt_sms").val();
			
			var paramsStr = '';
			for (v in param) {
				paramsStr = paramsStr + v + '=' + param[v] + '&';
			}
			console.log(URLS.SERVER_URL + URLS.login + '?' + paramsStr.substr(0, paramsStr.length - 1));
			
			var url = URLS.SERVER_URL + URLS.login;
			var data = param;
			//成功回调函数
			var success = function(data){
				console.log(data);
				//console.log(data.datas.totalScore);
					if(data.code == 1){
						var user = $(".txt_tel").val(); 
						window.location.href="index.html";
						localStorage.setItem('user_phone', user);
						
					}else{
						errTips(data.msg);
						$('.login_bt').addClass('login_no').html('登录');
					}	
			};
			//失败回调函数
			var error = function (){
				$(".ajax_noload").show();
			};
			ajaxPost(url,data,success,error);
			
		}
	
		
		
		
	});