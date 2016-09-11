
exports.app = function($main) {
    var AppMd = function(){
        return 'Hello!';
    };

    var app = new AppMd($main);

    return app;
};
