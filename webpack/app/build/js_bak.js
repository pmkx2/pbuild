/**
 *
 *
 * @author pmkx2 185832959@qq.com
 **/
"use strict";

var path = require('path');

module.exports = {
    //页面入口文件
    entry: {
        app: path.join(__dirname, '../js/src/index.js')
    },
    //输出路径
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    //加载器
    module: {
        loaders: [
            { js: /\.js$/, loader: 'jsx-loader?harmony' },
        ]
    },
    //插件
    plugins: [],

    //其它解决方案
    resolve: {
        //查找时的文件后序名
        extensions: ['', '.js', '.json'],
        //包引用别名定义
        alias: {
            _configUrl: path.resolve(__dirname, './build/_config.json')
        }
    }
};
