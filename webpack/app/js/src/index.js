exports.app = function($main) {
    //加载样式
	require('../../style/scss/_reset.scss');

    //新建项目
    var AppMd = function( $main ){
    	this.$main = $main;
        this.x = 'Hello!';
    };

    AppMd.prototype.showName = function() {
    	var self = this;
    	self.$main.text(self.x);
    };

    return new AppMd($main);
};


var app = this.app($('#Main'));
app.showName();
