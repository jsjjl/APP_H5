$(function(){function t(){_len_tel=$(".txt_tel").on("input",function(){if($(this).removeClass("txt_err"),_phone=this.value,_len_tel=this.value.length,11==_len_tel)e();else if(_len_tel>11){var t=$(this).val(),l=t.substring(0,11);$(this).val(l),_phone=l,s("手机号码不得超过11位")}else s("");e(),n()}).val().length,_len_sms=$(".txt_sms").on("input",function(){$(this).removeClass("txt_err"),_len_sms=this.value.length,n()}).val().length,$(".btn_retransmit").on("click",function(){$(this).hasClass("btn_retransmit_no")||o()}),$(".login_bt").on("click",function(){$(this).hasClass("login_no")||a()})}function n(){_len_tel&&_len_sms?$(".login_bt").removeClass("login_no"):$(".login_bt").addClass("login_no")}function e(){var t=$(".btn_retransmit");_len_tel&&!t.hasClass("is_restransit")&&_len_tel>=11?t.removeClass("btn_retransmit_no"):t.addClass("btn_retransmit_no")}function s(t){void 0==t||0==t.length?$(".item_tips").hide().children(".err_msg").removeClass("show"):($(".item_tips").show().children(".err_msg").html(t),$(".item_tips").children(".err_msg").addClass("show"),setTimeout(function(){$(".item_tips").hide().children(".err_msg").removeClass("show")},3e3))}function l(t){var n=/^1[0-9]{10}$/;return n.test(t)}function o(){({mobile:_phone});if(!l(_phone))return s("手机号格式错误"),void $(".txt_tel").focus().addClass("txt_err");$(".item_tips").hide();var t={};t.phone=_phone;var n=URLS.SERVER_URL+URLS.getsms,e=t;console.log(n+e);var o=function(t){1==t.code?(i(),console.log(t.datas)):s("验证码发送失败,"+t.msg)},a=function(){$(".ajax_noload").show()};ajaxPost(n,e,o,a)}function i(){var t=$(".btn_retransmit");t.html("60s后重发").addClass("btn_retransmit_no").addClass("is_restransit");var n=60,e=setInterval(function(){--n,0==n?(t.html("获取验证码").removeClass("btn_retransmit_no").removeClass("is_restransit"),clearInterval(e)):t.html(""+n+"s后重发")},1e3)}function a(){if(!l(_phone))return s("手机号格式错误"),void $(".txt_tel").focus().addClass("txt_err");$(".item_tips").hide().children(".err_msg").removeClass("show"),$(".login_bt").addClass("login_no").html("登录中");var t={};t.phone=$(".txt_tel").val(),t.code=$(".txt_sms").val();var n="";for(v in t)n=n+v+"="+t[v]+"&";console.log(URLS.SERVER_URL+URLS.login+"?"+n.substr(0,n.length-1));var e=URLS.SERVER_URL+URLS.login,o=t,i=function(t){if(console.log(t),1==t.code){var n=$(".txt_tel").val();window.location.href="index.html",localStorage.setItem("user_phone",n)}else s(t.msg),$(".login_bt").addClass("login_no").html("登录")},a=function(){$(".ajax_noload").show()};ajaxPost(e,o,i,a)}null!=localStorage.user_phone&&""!=localStorage.user_phone&&(window.location.href="index.html"),_need_ck=!0,_phone="",_len_tel=0,_len_sms=0,t(),e()});