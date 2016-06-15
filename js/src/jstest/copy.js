/**
 * 复制连接
 * @date 2015-01-05 10:33:54
 * @author vfasky <vfasky@gmail.com>
 * @version $Id$
 */
define('v4/copy', ['jquery',  'cepin'], 
function($, cepin){

    var ZeroClipboard;

    if(cepin.util.ie && cepin.util.ie < 9){
        return function($el, url){
            url = url || window.location.href;

            $el.on('click', function(){
                cepin.popTips.error(
                    '浏览器不支持，请手动复制以下连接<br>'+
                    url
                );
                return false;
            });
        };
    }

    var init = function($el, url){
        url = url || window.location.href;
        var client = new ZeroClipboard( $el );

        client.on( 'ready', function(){
            client.on( 'copy', function(event) {
                event.clipboardData.setData('text/plain', url);
            });

            client.on('aftercopy', function(){
                cepin.popTips.success('已成功复制到粘贴版');
            });
        });

        client.on('error', function(){
            cepin.popTips.error(
                '浏览器不支持，请手动复制以下连接<br>'+
                url
            );
        });

    };
    
    if(ZeroClipboard){
        return function($el, url){
            init($el, url);
        };
    }
    else{
        return function($el, url){
            require(['ZeroClipboard'], function(zc){
                ZeroClipboard = zc;

                ZeroClipboard.config({ 
                    swfPath: $.amd().config().baseUrl + 'js/v2/vendor/ZeroClipboard/ZeroClipboard.swf' 
                });

                init($el, url);

            });
        };
    }
        
});

