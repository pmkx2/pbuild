/**
 * 微信iDC商城 － 数据集
 * @module idc/date
 * @author pmkx2 (185832959@qq.com)
 */
define('idc/data', ['storage'], function(Storage){

    //数据集
    var IdcData = function( config ){
        this.config = $.extend({
            cache: false   //是否本地存储
        }, config || {});
        //本地存储
        this.Storage = new Storage;
        this.allType = null;
    };

    /**
     * 通用数据：取通用数据
     * @return {Promise}
     */
    IdcData.prototype.getData = function( url ){
        var dtd = $.Deferred();
        $.getJSON(url).done(function(res){
            dtd.resolve(res);
        });
        return dtd.promise();
    };

    /**
     * 通用数据：取当前Json数据
     * key：本地缓存名称
     * url：url
     * beforeFn：提交前操作
     * callBack：完成后操作
     * setStorage：是否写入本地缓存
     * type：提交方式
     */
    IdcData.prototype.getJsonData = function( key, url, beforeFn, callBack, setStorage, type){
        var self        = this;
        var Storage     = self.Storage;
        var date        = new Date();
            date        = date.toLocaleDateString();
        var _Data       = { date:date, datas:null };
        var storageData = Storage.get(key);
        var datas       = null;
        var beforeFn    = beforeFn || function(){};
        var callBack    = callBack || function(){};
        var type        = type || 'POST';
        var ajaxData = function(url){
            $.ajax({ type:type, url:url, dataType:'json', 
                before:function(){
                    beforeFn();
                },
                success:function(res){  
                    //加入存储日期
                    _Data = { date:date, datas:res };
                    Storage.set(key, _Data);
                    datas = _Data.datas;
                    callBack(datas);
                },
                error : function(error) {  
                    console.log('获取数据失败');
                }
            });
        };
        //是否读取本地存储
        if(self.config.cache === true || setStorage === true){
            //没有数据或者日期有变动时取值
            if(storageData === null || storageData.date !== date){
                ajaxData(url);
            } else {
                datas = _Data.datas = storageData.datas;
                callBack(datas);
            }
        } else {
            ajaxData(url);
        }
        return datas;
    };

    //组合查询元素
    IdcData.prototype.merge = function( element ){
        //开始组合查询条件
        var element = element || {};
        var info = '?';
        var i = 0;
        $.each(element,function(k,v){
            if(v){
                info += k + '=' + v + '&';
                i++;
            }
        });
        return info.substring(0,info.length-1);
    };

    //获取服务器时间
    IdcData.prototype.getServerTime = function( url ){
    	var url = url || '/';
    	var time = null;
        $.ajax({
            url:url,
            type:'POST', 
            async:false,
            complete:function(x){
            	time = x.getResponseHeader('Date');
            }
        });
        return time;
    };

    //按日期获取推送订单商品：推送订单
    IdcData.prototype.getOrder = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        var nowDate = new Date();
        //查询条件
        var element = $.extend({
            shopId 	: '999999999',
            //type    : 'getFs',
            date 	: nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
        }, element || {});
        //开始组合查询条件
        var searchInfo = self.merge(element);
        return self.getJsonData('_AllOrder','/synergyMallServcie/order_getRecommendedOrder.do'+searchInfo, beforeFn, callBack);
    };

    //按日期获取智能单商品：智能订单
    IdcData.prototype.getSmartOrder = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        var nowDate = new Date();
        //查询条件
        var element = $.extend({
            shopId  : '999999999',
            type    : 'getRd',
            date    : nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
        }, element || {});
        //开始组合查询条件
        var searchInfo = self.merge(element);
        return self.getJsonData('_AllSmartOrder','/synergyMallServcie/order_getRecommendedOrder.do'+searchInfo, beforeFn, callBack);
    };

	//POST方式AJAX请求  2016-03-03 by kevin
	IdcData.prototype.getJsonDataByPost = function(key,url,data,beforeFn,callBack,setStorage){
		 var self        = this;
        var Storage     = self.Storage;
        var date        = new Date();
            date        = date.toLocaleDateString();
        var _Data       = { date:date, datas:null };
        var storageData = Storage.get(key);
        var datas       = null;
        var beforeFn    = beforeFn || function(){};
        var callBack    = callBack || function(){};
        var ajaxData = function(url,data){
			$.ajax({
                type: 'POST', url: url, data: data, dataType: 'json',
                before: function () {
                    beforeFn();
                },
                success: function (res) {
                    _Data = {date: date, datas: res};
                    Storage.set(key, _Data);
                    datas = _Data.datas;
                    callBack(datas);
                },
                error: function (error) {
                    console.log('获取数据失败');
                }
            });
		};
		//是否读取本地存储
        if(self.config.cache === true || setStorage === true){
            //没有数据或者日期有变动时取值
            if(storageData === null || storageData.date !== date){
                ajaxData(url,data);
            } else {
                datas = _Data.datas = storageData.datas;
                callBack(datas);
            }
        } else {
            ajaxData(url,data);
        }
        return datas;
	};
    //判断用户补货时是否有1200的限制
    IdcData.prototype.isExistDelivery = function(element,beforeFn,callBack){
        var self = this;
        var element = $.extend({
            shopId : '999999999'
        },element || {});
        var searchInfo = self.merge(element);
        return self.getJsonData('_isExistDelivery','/synergyMallServcie/order_isExistDelivery.do'+searchInfo,beforeFn,callBack,false);
    };
    //按条件获取自由订单商品：自由订单
    IdcData.prototype.getMallGoods = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        //查询条件
        var element = $.extend({
            page 		: 1,
            rp 			: 5000,
            type 		: 'bc',	//'bc'为大类查询, 'mc'为中类查询
            catNo		: '',	//商品类型
            goodsName 	: '',	//商品名称
            beginDate : '',   //有效期
            orderBy		: null	//排序方式（ 0：价格从低到高，1：价格从高到低，2：销量从低到高1，3：销量从高到低 ）
        }, element || {});
        //开始组合查询条件
        var searchInfo = self.merge(element);
        return self.getJsonData('_IndependentOrder_'+element.catNo,'/synergyMallServcie/goods_getMallGoods.do'+searchInfo, beforeFn, callBack, setStorage,'POST');
    };

    //按条件搜索自由订单商品：自由订单
    IdcData.prototype.searchMallGoods = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        //查询条件
		
       /* var element = $.extend({
            page        : 1,
            rp          : 5000,
            type        : 'bc', //'bc'为大类查询, 'mc'为中类查询
            catNo       : '',   //商品类型
            goodsName   : '',   //商品名称
            orderBy     : null  //排序方式（ 0：价格从低到高，1：价格从高到低，2：销量从低到高1，3：销量从高到低 ）
        }, element || {});*/
        //开始组合查询条件
		/*var data = {
			page        : 1,
            rp          : 5000,
            type        : 'bc', //'bc'为大类查询, 'mc'为中类查询
            catNo       : '',   //商品类型
            goodsName   : element.goodsName,   //商品名称
            orderBy     : null  //排序方式（ 0：价格从低到高，1：价格从高到低，2：销量从低到高1，3：销量从高到低 ）
		}*/
        //var searchInfo = self.merge(element);
        var data = 'page=1&rp=5000&type=bc&goodsName='+element.goodsName+'&catNo='+element.catNo;
        return self.getJsonDataByPost('_SearchIndependentOrder_'+element.goodsName,'/synergyMallServcie/goods_getMallGoods.do',data, beforeFn, callBack, setStorage);
    };

    //获取大类包中类信息
    IdcData.prototype.getLMCategory = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        //查询条件
        var element = $.extend({ }, element || {});
        //开始组合查询条件 
        var searchInfo = self.merge(element);
        return self.getJsonData('_LMCategory','/synergyMallServcie/category_getLMCategory.do'+searchInfo, beforeFn, callBack);
    };

    //按日期获取推荐商品：每日优选
    IdcData.prototype.getRecommendedGoods = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        var nowDate = new Date();
        //查询条件
        var element = $.extend({
            shopId 	: '999999999',
            date 	: nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
        }, element || {});
        //开始组合查询条件
        var searchInfo = self.merge(element);
        return self.getJsonData('_AllOrderRecommendedGoods','/synergyMallServcie/order_getRecommendedGoods.do'+searchInfo, beforeFn, callBack);
    };

    //获取优惠信息：每日优选
    IdcData.prototype.getDiscount = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        //查询条件
        var element = $.extend({
            shopId 	: null,
            tag		: 'WEB',
            orderType : 'fsso'
        }, element || {});
        //开始组合查询条件
        var searchInfo = self.merge(element);
        return self.getJsonData('_OrderDiscount','/synergyMallServcie/order_dynamicDiscount.do'+searchInfo, beforeFn, callBack);
    };


    //获取一周配送详情：每日优选
    IdcData.prototype.getWeekDelivery = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        //查询条件
        var element = $.extend({
            goodsName : '',
            shopId    : null,
            page      : 1,
            rp        : 30
        }, element || {});
		//var data = 'page=1&rp=5000&type=bc&goodsName='+element.goodsName+'&catNo='+element.catNo;
        //return self.getJsonDataByPost('_SearchIndependentOrder_'+element.goodsName,'/synergyMallServcie/goods_getMallGoods.do',data, beforeFn, callBack, setStorage);
        //开始组合查询条件
        //var searchInfo = self.merge(element);
		var data = 'goodsName='+element.goodsName+'&shopId='+element.shopId+'&page='+element.page+'&rp='+element.rp;
		return self.getJsonDataByPost('_WeekDelivery','/synergyMallServcie/goods_getWeekDelivery.do',data,beforeFn,callBack,setStorage);
        //return self.getJsonData('_WeekDelivery','/synergyMallServcie/goods_getWeekDelivery.do'+searchInfo, beforeFn, callBack);
    };

    //获取门店的商品库存
    IdcData.prototype.getStockByShop = function( element, beforeFn, callBack, setStorage ){
        var self = this;
        var nowDate = new Date();
        //查询条件
        var element = $.extend({
            shopId  : '999999999',
        }, element || {});
        //开始组合查询条件
        var searchInfo = self.merge(element);
        return self.getJsonData('_AllOrder','/synergyMallServcie/goods_getStockByShopId.do'+searchInfo, beforeFn, callBack);
    };

    //发送订单：每日优选
    IdcData.prototype.sendOrder = function( element, beforeFn, callBack ){
        $.ajax({
            url:'/synergyMallServcie/order_submitRecommendedOrder.do',
            type:'POST', 
            data:element,
            before:function(){
                beforeFn();
            },
            success:function(res){  
                callBack(res);
            },
            error : function(error) {  
                console.log('提交订单失败！');
            }
        });
    };

    //发送订单：自由订单
    IdcData.prototype.sendIndependentOrder = function( element, beforeFn, callBack ){
        $.ajax({
            url:'/synergyMallServcie/order_submitOptionalOrder.do',
            type:'POST', 
            data:element,
            before:function(){
                beforeFn();
            },
            success:function(res){  
                callBack(res);
            },
            error : function(error) {  
                console.log('提交订单失败！');
            }
        });
    };

    //取消订单：每日优选
    IdcData.prototype.cancelRecommendedOrder = function( element, beforeFn, callBack ){
    	$.ajax({
            url:'/synergyMallServcie/order_doOrderCancel.do',
            type:'POST', 
            data:element,
            before:function(){
                beforeFn();
            },
            success:function(res){  
                callBack(res);
            },
            error : function(error) {  
                console.log('取消订单失败！');
            }
        });
    };

    //获取历史订单
    IdcData.prototype.getOrdered = function( element, beforeFn, callBack ){
        var self = this;
        //查询条件
        var element = $.extend({
            shopId 	: null,
            type 	: 'getHead'
        }, element || {});
        //开始组合查询条件
        var searchInfo = self.merge(element);
        return self.getJsonData('_AllOrderRecommendedOrder','/synergyMallServcie/order_getHistoryOrder.do'+searchInfo, beforeFn, callBack);
    };

    //登录
    IdcData.prototype.userLogin = function(element, beforeFn, callBack){
        $.ajax({
            url:'/synergyMallServcie/user_userLogin.do',
            type:'POST', 
            data:element,
            before:function(){
                beforeFn();
            },
            success:function(res){  
                callBack(res);
            }
        });
    };

    //退出登录
    IdcData.prototype.userLogout = function(element, beforeFn, callBack){
        $.ajax({
            url:'/synergyMallServcie/user_userLogin.do',
            type:'POST', 
            data:element,
            before:function(){
                beforeFn();
            },
            success:function(res){  
                callBack(res);
            }
        });
    };
    return IdcData;
});