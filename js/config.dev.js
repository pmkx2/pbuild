require.config({
//$.amd().config({
	"baseUrl": "../js",
    "paths": {
        "require"           : "vendor/require/require",
        "jquery/1.8.3"		: "vendor/jquery/1.8.3/jquery.min",
        "bootstrap"			: "vendor/bootstrap/bootstrap.min",
        "config"			: "config"
    },

    "shim": {
        "bootstrap"  : ["jquery"]
    },

    "hash": {
        "jquery":"d32fer"
    },
    "packages": []
});