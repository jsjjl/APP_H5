var url=URLS.SERVER_URL+URLS.integralRule,data="",success=function(a){console.log(a),a.code>0?(details=a.datas.details,$("#ajax_integralRule").html(details)):alert(a.msg)};ajaxPost(url,data,success);