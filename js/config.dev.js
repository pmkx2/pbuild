require.config({
	"baseUrl": "./js",
    "paths": {
        "jquery"			: "vendor/jquery/1.8.3/jquery.min",
        "require"			: "vendor/require/require",
        "bootstrap"			: "vendor/bootstrap/bootstrap.min",
        "config"			: "config"
    },

    "shim": {
        "bootstrap"  : ["jquery"],
        "lazyload"   : ["jquery"],
        "superSlide" : ["jquery"]
    }
});