// @apiAuthor pmkx2 (185832959@qq.com)
/** 
* @apiDefine IdcData
* 
* IdcData
*/

define('idc/data', ['storage'], function(Storage){

    /** 
    * @api {Require 引入路径} 'idc/data' IdcData
    * @apiGroup IdcData
    *   
    * @apiVersion 1.0.0
    * @apiName 获取数据集
    * @apiDescription 获取对应接口下的数据
    *  
    * @apiParam {Boolean} cache 是否进行本地存储，此属性为全局控制
    * 
    * @apiSuccessExample 使用方法: 
    *     var IdcData = new IdcData({
    *         cache: false   //是否本地存储
    *     });
    */
    var IdcData = function( config ){
        this.config = $.extend({
            cache: false   //是否本地存储
        }, config || {});
        //本地存储
        this.Storage = new Storage;
        this.allType = null;
    };

    /** 
    * @api {GET} idc/data getData
    * @apiGroup IdcData
    *   
    * @apiVersion 1.0.0
    * @apiName 通用数据：取通用数据
    * @apiDescription 获取接口数据并返回promise
    *  
    * @apiSuccessExample 使用方法: 
    *     var data = IdcData.getData('Url');
    * 
    */
    IdcData.prototype.getData = function( url ){
        var dtd = $.Deferred();
        $.getJSON(url).done(function(res){
            dtd.resolve(res);
        });
        return dtd.promise();
    };

    /** 
    * @api {GET} idc/data getJsonData
    * @apiGroup IdcData
    *   
    * @apiVersion 1.0.0
    * @apiName 取当前Json数据
    * @apiDescription 取当前Json数据
    * 
    * @apiParam {String}       key             本地缓存名称
    * @apiParam {String}       url             接口URL
    * @apiParam {Function}     beforeFn        提交前操作
    * @apiParam {Function}     callBack        完成后操作
    * @apiParam {Boolean}      setStorage      是否写入本地缓存
    * @apiParam {String}       type            提交方式，“post” 或 “get”
    * 
    * @apiSuccessExample 使用方法: 
    *     var data = IdcData.getJsonData('ajaxurl');
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

    return IdcData;
});