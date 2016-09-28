exports.app = function($main) {

	require('../../style/scss/_reset.scss');

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
