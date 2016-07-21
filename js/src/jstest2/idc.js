// @apiAuthor pmkx2 (185832959@qq.com)
/** 
* @apiDefine IdcTool2 Idc工具集2
* 
* IdcTool2
*/

define('idc/idcTool', ['jquery'], function($){
	/** 
	* @api {Require 引入路径} 'idc/idcTool' IdcTool
	* @apiGroup IdcTool2
	* 
	* @apiVersion 1.0.0
	* @apiDescription Idc项目公用方法集2
	*  
	* @apiSuccessExample 使用方法: 
	* var IdcTool = new IdcTool();
	*/
	var IdcTool = function( config ){
	    this.config = $.extend({
	        $root 		: $('body')
	    }, config || {});
	};

	/** 
	* @api {GET} 'idc/idcTool' getPayWayText
	* @apiGroup IdcTool2
	* 
	* @apiVersion 1.0.0
	* @apiDescription 获取支付方式文字2
	*  
	* @apiParam {String} code 
	* 获取支付方式中文解释。目前存在的支付方式：<br>
	* SMW6 => 在线支付 <br>
	* SMW0 => 货到付款 <br>
	* SM14 => 信用支付
	*
	* @apiSuccessExample 使用方法: 
	* var payWay = IdcTool.getPayWayText('SMW6');
	* // => '在线支付'
	*/
	IdcTool.prototype.getPayWayText = function( code ){
		var payWay = '';
		switch(code){
			//在线支付
			case 'SMW6': payWay = '在线支付'; break;
			//货到付款
			case 'SMW0': payWay = '货到付款'; break;
			//信用支付
			case 'SM14': payWay = '信用支付'; break;
		}
		return payWay;
	};

	/** 
	* @api {GET} 'idc/idcTool' getOrderStateText
	* @apiGroup IdcTool2
	* 
	* @apiVersion 1.0.0
	* @apiDescription 获取订单状态文字2
	*  
	* @apiParam {String} code 
	* 获取订单状态中文解释。目前存在的支付方式：<br>
	* E0021 => 待支付 <br>
	* E0001 => 订单已提交 <br>
	* E0002 => 订单已提交 <br>
	* E0003 => 订单已提交 <br>
	* E0004 => 订单已提交 <br>
	* E0005 => 订单取消 <br>
	* E0010 => 订单已提交 <br>
	* E0011 => 订单取消失败 <br>
	* E0012 => 取消订单审批中 <br>
	* E0090 => 首单拦截 <br>
	*
	* @apiSuccessExample 使用方法: 
	* var orderStateText = IdcTool.getOrderStateText('E0021');
	* // => '待支付'
	*/
	IdcTool.prototype.getOrderStateText = function( code ){
		var state = '';
		switch(code){
			//待支付
			case 'E0021': state = '待支付'; break;
			//待审批
			case 'E0001': state = '订单已提交'; break;
			//已审批
			case 'E0002': state = '订单已提交'; break;
			//已确认
			case 'E0003': state = '订单已提交'; break;
			//订单异常
			case 'E0004': state = '订单已提交'; break;
			//订单取消
			case 'E0005': state = '订单取消'; break;
			//同步SAP失败
			case 'E0010': state = '订单已提交'; break;
			//订单取消失败
			case 'E0011': state = '订单取消失败'; break;
			//取消订单审批中
			case 'E0012': state = '取消订单审批中'; break;
			//首单拦截
			case 'E0090': state = '首单拦截'; break;
		}
		return state;
	};

	/** 
	* @api {GET} idc/idcTool fnDate
	* @apiGroup IdcTool2
	* 
	* @apiVersion 1.0.0
	* @apiDescription 日期方法2
	*  
	* @apiParam {String} code 获取日期方法
	*
	* @apiSuccessExample 使用方法: 
	* var FnDate = IdcTool.fnDate();
	* var allDate = FnDate.getAllDate(date);
	*/
	IdcTool.prototype.fnDate = function(){
		var week = ['日','一','二','三','四','五','六'];
		var fnDate = {
			//获取一个正常日期
			getDate: function( date ){
				if(typeof date === 'string'){ date = date.replace(/-/g,'/'); }
				date = date || new Date();
				var d = new Date(date);
				var sd = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
				return sd;
			},
			//获取全部日期
			getAllDate: function( date ){
				if(typeof date === 'string'){ date = date.replace(/-/g,'/'); }
				date = date || new Date();
				var d = new Date(date);
				var sd = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
				var subDate = (d.getMonth()+1)+'-'+d.getDate();
				var day = d.getDay();
				var allDate = {allDate:d, date:sd, subDate:subDate, week:week[day], weekNum:day };
				return allDate;
			},
			//获取上下一天日期：days：提前的天数，date：对照日期
			getDirDate: function( days, date ){
				if(typeof date === 'string'){ date = date.replace(/-/g,'/'); }
				days = days || 0;
				var dirs = 86400 * days;
				var titleDate = !date ? new Date() : new Date(date);
				var newDate = new Date((titleDate/1000+dirs)*1000);
				return this.getAllDate(newDate);
			}
		};
		return fnDate;
	};

	//验证方法
	IdcTool.prototype.checkFun = {
		//是否全部为中文
		isChn: function( str ){
			var reg=/^[\u4e00-\u9fa5]+$/i;
			return reg.test(str);
		},
		//是否有特殊字符
		isSpecial: function( str ){
			var reg = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
    		return reg.test(str);
		}
	};


	//生成文字验证码
	IdcTool.prototype.getCheckCode = function(codeLength){
		var codeLength = codeLength || 4;
		var selectChar = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz';
		var code = '';
		for(var i=0; i<codeLength; i++) {
			var charIndex = Math.floor(Math.random() * selectChar.length);
			code += selectChar[charIndex];
		}
		return code;
	};


	//判断移动端浏览器版本信息：
	IdcTool.prototype.getBrowser = function(){
		var browser = {
		    versions: function () {
		        var u = navigator.userAgent, app = navigator.appVersion;
		        return {         //移动终端浏览器版本信息
		            trident: 	u.indexOf('Trident') > -1, //IE内核
		            presto: 	u.indexOf('Presto') > -1, //opera内核
		            webKit: 	u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		            gecko: 		u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		            mobile: 	!!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		            ios: 		!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		            android: 	u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
		            iPhone: 	u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
		            iPad: 		u.indexOf('iPad') > -1, //是否iPad
		            webApp: 	u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		       };
		    }(),
		    language: (navigator.browserLanguage || navigator.language).toLowerCase()
		}

		var nowBrowser = {
			equipment:'',	//设备
			browser:''		//浏览环境
		};
		//判断移动端微信、新浪微博、QQ空间、IOS、安卓浏览器环境：
		if(browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
		    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
		    if (ua.match(/MicroMessenger/i) == "micromessenger") {
		        //在微信中打开
		        nowBrowser.browser = 'weixin';
		    }
		    if (ua.match(/WeiBo/i) == "weibo") {
		        //在新浪微博客户端打开
		        nowBrowser.browser = 'weibo';
		    }
		    if (ua.match(/QQ/i) == "qq") {
		        //在QQ空间打开
		        nowBrowser.browser = 'qq';
		    }
		    if (browser.versions.ios) {
		        //是否在IOS浏览器打开
		        nowBrowser.equipment = 'ios';
		    } 
		    if(browser.versions.android){
		        //是否在安卓浏览器打开
		        nowBrowser.equipment = 'android';
		    }
		} else {
		    //否则就是PC浏览器打开
		    nowBrowser.equipment = 'pc';
		}
		return nowBrowser;
	};

	//清空前后空格
	IdcTool.prototype.trim = function(text) {
		var text = text || '';
		return text.replace(/^\s+|\s+$/g, "");
	};

	return new IdcTool();
});