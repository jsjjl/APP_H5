function goods_select(){var a=URLS.SERVER_URL+URLS.ordersView,s=param,d=function(a){console.log(a);var s="";s+="<img src="+a.datas.cover+" >",s+="<span class='ell'>"+a.datas.name+"</span><p><em class='g0'>"+a.datas.score+"积分</em>X 1</p>",$("#ajax_goods_select").empty().append(s),$("#ajax_order_detailstop").empty().append("下单时间："+a.datas.orderTime+"<em class='r g0' id='ajax'>"+a.datas.orderStatus+"</em>"),xuni=a.datas.type;var d="";xuni>0?(d+="<div class='order_box order_box_yzm' data-clipboard-action='copy' data-clipboard-target='#yzm'><div class='index_list_title'>我的验证码</div><p><em id='yzm'>",d+=a.datas.cdkey+"</em>复制验证码<span>"+a.datas.reminder+"</span></p></div>"):(d+="<div class='order_box'><div class='index_list_title'>我的收货地址</div><p>",d+=a.datas.contactName+"<em>"+a.datas.contactPhone+"</em><span>"+a.datas.address+"<br/>"+a.datas.detailAddress+"</span></p></div>","已取消"!=a.datas.orderStatus&&$(".cont").append("<a href='javascript:;' class='set_bt order_cancel'>取消订单</a>")),$("#ajax_userorder_msg").append(d);var e={};e.id=id,$(".order_cancel").click(function(){if(!$(this).hasClass("bt_no")){$(this).addClass("bt_no"),$(this).html("提交中");var a=URLS.SERVER_URL+URLS.orderCancel,s=e,d="";for(v in e)d=d+v+"="+e[v]+"&";console.log(a+"?"+d.substr(0,d.length-1));var t=function(a){a.code>0?(console.log(a),document.location.reload()):(alert(a.msg),window.history.back())},o=function(){$(".ajax_noload").show()};ajaxPost(a,s,t,o)}})},e=function(){$(".ajax_noload").show()};ajaxPost(a,s,d,e)}var param={},id,xuni;GetQueryString("id")&&(id=GetQueryString("id")),param.id=id,goods_select();