define("v4/copy",["jquery","cepin"],function(e,t){var o;if(t.util.ie&&t.util.ie<9)return function(e,o){o=o||window.location.href,e.on("click",function(){return t.popTips.error("浏览器不支持，请手动复制以下连接<br>"+o),!1})};var r=function(e,r){r=r||window.location.href;var n=new o(e);n.on("ready",function(){n.on("copy",function(e){e.clipboardData.setData("text/plain",r)}),n.on("aftercopy",function(){t.popTips.success("已成功复制到粘贴版")})}),n.on("error",function(){t.popTips.error("浏览器不支持，请手动复制以下连接<br>"+r)})};return o?function(e,t){r(e,t)}:function(t,n){require(["ZeroClipboard"],function(a){o=a,o.config({swfPath:e.amd().config().baseUrl+"js/v2/vendor/ZeroClipboard/ZeroClipboard.swf"}),r(t,n)})}}),define("idc/data",["storage"],function(e){var t=function(t){this.config=$.extend({cache:!1},t||{}),this.Storage=new e,this.allType=null};return t.prototype.getData=function(e){var t=$.Deferred();return $.getJSON(e).done(function(e){t.resolve(e)}),t.promise()},t.prototype.getJsonData=function(e,t,o,r,n,a){var d=this,s=d.Storage,c=new Date;c=c.toLocaleDateString();var i={date:c,datas:null},u=s.get(e),l=null,o=o||function(){},r=r||function(){},a=a||"POST",g=function(t){$.ajax({type:a,url:t,dataType:"json",before:function(){o()},success:function(t){i={date:c,datas:t},s.set(e,i),l=i.datas,r(l)},error:function(e){console.log("获取数据失败")}})};return d.config.cache===!0||n===!0?null===u||u.date!==c?g(t):(l=i.datas=u.datas,r(l)):g(t),l},t.prototype.merge=function(e){var e=e||{},t="?",o=0;return $.each(e,function(e,r){r&&(t+=e+"="+r+"&",o++)}),t.substring(0,t.length-1)},t.prototype.getServerTime=function(e){var e=e||"/",t=null;return $.ajax({url:e,type:"POST",async:!1,complete:function(e){t=e.getResponseHeader("Date")}}),t},t.prototype.getOrder=function(e,t,o,r){var n=this,a=new Date,e=$.extend({shopId:"999999999",date:a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()},e||{}),d=n.merge(e);return n.getJsonData("_AllOrder","/synergyMallServcie/order_getRecommendedOrder.do"+d,t,o)},t.prototype.getSmartOrder=function(e,t,o,r){var n=this,a=new Date,e=$.extend({shopId:"999999999",type:"getRd",date:a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()},e||{}),d=n.merge(e);return n.getJsonData("_AllSmartOrder","/synergyMallServcie/order_getRecommendedOrder.do"+d,t,o)},t.prototype.getJsonDataByPost=function(e,t,o,r,n,a){var d=this,s=d.Storage,c=new Date;c=c.toLocaleDateString();var i={date:c,datas:null},u=s.get(e),l=null,r=r||function(){},n=n||function(){},g=function(t,o){$.ajax({type:"POST",url:t,data:o,dataType:"json",before:function(){r()},success:function(t){i={date:c,datas:t},s.set(e,i),l=i.datas,n(l)},error:function(e){console.log("获取数据失败")}})};return d.config.cache===!0||a===!0?null===u||u.date!==c?g(t,o):(l=i.datas=u.datas,n(l)):g(t,o),l},t.prototype.isExistDelivery=function(e,t,o){var r=this,e=$.extend({shopId:"999999999"},e||{}),n=r.merge(e);return r.getJsonData("_isExistDelivery","/synergyMallServcie/order_isExistDelivery.do"+n,t,o,!1)},t.prototype.getMallGoods=function(e,t,o,r){var n=this,e=$.extend({page:1,rp:5e3,type:"bc",catNo:"",goodsName:"",beginDate:"",orderBy:null},e||{}),a=n.merge(e);return n.getJsonData("_IndependentOrder_"+e.catNo,"/synergyMallServcie/goods_getMallGoods.do"+a,t,o,r,"POST")},t.prototype.searchMallGoods=function(e,t,o,r){var n=this,a="page=1&rp=5000&type=bc&goodsName="+e.goodsName+"&catNo="+e.catNo;return n.getJsonDataByPost("_SearchIndependentOrder_"+e.goodsName,"/synergyMallServcie/goods_getMallGoods.do",a,t,o,r)},t.prototype.getLMCategory=function(e,t,o,r){var n=this,e=$.extend({},e||{}),a=n.merge(e);return n.getJsonData("_LMCategory","/synergyMallServcie/category_getLMCategory.do"+a,t,o)},t.prototype.getRecommendedGoods=function(e,t,o,r){var n=this,a=new Date,e=$.extend({shopId:"999999999",date:a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()},e||{}),d=n.merge(e);return n.getJsonData("_AllOrderRecommendedGoods","/synergyMallServcie/order_getRecommendedGoods.do"+d,t,o)},t.prototype.getDiscount=function(e,t,o,r){var n=this,e=$.extend({shopId:null,tag:"WEB",orderType:"fsso"},e||{}),a=n.merge(e);return n.getJsonData("_OrderDiscount","/synergyMallServcie/order_dynamicDiscount.do"+a,t,o)},t.prototype.getWeekDelivery=function(e,t,o,r){var n=this,e=$.extend({goodsName:"",shopId:null,page:1,rp:30},e||{}),a="goodsName="+e.goodsName+"&shopId="+e.shopId+"&page="+e.page+"&rp="+e.rp;return n.getJsonDataByPost("_WeekDelivery","/synergyMallServcie/goods_getWeekDelivery.do",a,t,o,r)},t.prototype.getStockByShop=function(e,t,o,r){var n=this,e=(new Date,$.extend({shopId:"999999999"},e||{})),a=n.merge(e);return n.getJsonData("_AllOrder","/synergyMallServcie/goods_getStockByShopId.do"+a,t,o)},t.prototype.sendOrder=function(e,t,o){$.ajax({url:"/synergyMallServcie/order_submitRecommendedOrder.do",type:"POST",data:e,before:function(){t()},success:function(e){o(e)},error:function(e){console.log("提交订单失败！")}})},t.prototype.sendIndependentOrder=function(e,t,o){$.ajax({url:"/synergyMallServcie/order_submitOptionalOrder.do",type:"POST",data:e,before:function(){t()},success:function(e){o(e)},error:function(e){console.log("提交订单失败！")}})},t.prototype.cancelRecommendedOrder=function(e,t,o){$.ajax({url:"/synergyMallServcie/order_doOrderCancel.do",type:"POST",data:e,before:function(){t()},success:function(e){o(e)},error:function(e){console.log("取消订单失败！")}})},t.prototype.getOrdered=function(e,t,o){var r=this,e=$.extend({shopId:null,type:"getHead"},e||{}),n=r.merge(e);return r.getJsonData("_AllOrderRecommendedOrder","/synergyMallServcie/order_getHistoryOrder.do"+n,t,o)},t.prototype.userLogin=function(e,t,o){$.ajax({url:"/synergyMallServcie/user_userLogin.do",type:"POST",data:e,before:function(){t()},success:function(e){o(e)}})},t.prototype.userLogout=function(e,t,o){$.ajax({url:"/synergyMallServcie/user_userLogin.do",type:"POST",data:e,before:function(){t()},success:function(e){o(e)}})},t});