define("idc/data",["storage"],function(e){var t=function(t){this.config=$.extend({cache:!1},t||{}),this.Storage=new e,this.allType=null};return t.prototype.getData=function(e){var t=$.Deferred();return $.getJSON(e).done(function(e){t.resolve(e)}),t.promise()},t.prototype.getJsonData=function(e,t,n,a,r,o){var i=this,s=i.Storage,c=new Date;c=c.toLocaleDateString();var u={date:c,datas:null},g=s.get(e),f=null,n=n||function(){},a=a||function(){},o=o||"POST",d=function(t){$.ajax({type:o,url:t,dataType:"json",before:function(){n()},success:function(t){u={date:c,datas:t},s.set(e,u),f=u.datas,a(f)},error:function(e){console.log("获取数据失败")}})};return i.config.cache===!0||r===!0?null===g||g.date!==c?d(t):(f=u.datas=g.datas,a(f)):d(t),f},t}),define("jstest/idc",["jquery"],function(e){var t=function(t){this.config=e.extend({$root:e("body")},t||{})};return t.prototype.getPayWayText=function(e){var t="";switch(e){case"SMW6":t="在线支付";break;case"SMW0":t="货到付款";break;case"SM14":t="信用支付"}return t},t.prototype.getOrderStateText=function(e){var t="";switch(e){case"E0021":t="待支付";break;case"E0001":t="订单已提交";break;case"E0002":t="订单已提交";break;case"E0003":t="订单已提交";break;case"E0004":t="订单已提交";break;case"E0005":t="订单取消";break;case"E0010":t="订单已提交";break;case"E0011":t="订单取消失败";break;case"E0012":t="取消订单审批中";break;case"E0090":t="首单拦截"}return t},t.prototype.fnDate=function(){var e=["日","一","二","三","四","五","六"],t={getDate:function(e){"string"==typeof e&&(e=e.replace(/-/g,"/")),e=e||new Date;var t=new Date(e),n=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();return n},getAllDate:function(t){"string"==typeof t&&(t=t.replace(/-/g,"/")),t=t||new Date;var n=new Date(t),a=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate(),r=n.getMonth()+1+"-"+n.getDate(),o=n.getDay(),i={allDate:n,date:a,subDate:r,week:e[o],weekNum:o};return i},getDirDate:function(e,t){"string"==typeof t&&(t=t.replace(/-/g,"/")),e=e||0;var n=86400*e,a=t?new Date(t):new Date,r=new Date(1e3*(a/1e3+n));return this.getAllDate(r)}};return t},t.prototype.checkFun={isChn:function(e){var t=/^[\u4e00-\u9fa5]+$/i;return t.test(e)},isSpecial:function(e){var t=RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);return t.test(e)}},t.prototype.getCheckCode=function(e){for(var e=e||4,t="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz",n="",a=0;e>a;a++){var r=Math.floor(Math.random()*t.length);n+=t[r]}return n},t.prototype.getBrowser=function(){var e={versions:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari")}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},t={equipment:"",browser:""};if(e.versions.mobile){var n=navigator.userAgent.toLowerCase();"micromessenger"==n.match(/MicroMessenger/i)&&(t.browser="weixin"),"weibo"==n.match(/WeiBo/i)&&(t.browser="weibo"),"qq"==n.match(/QQ/i)&&(t.browser="qq"),e.versions.ios&&(t.equipment="ios"),e.versions.android&&(t.equipment="android")}else t.equipment="pc";return t},t.prototype.trim=function(e){var e=e||"";return e.replace(/^\s+|\s+$/g,"")},new t});