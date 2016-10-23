/**
 *
 *
 * @author pmkx2 185832959@qq.com
 **/
"use strict";

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //页面入口文件
    entry: {
        app: path.join(__dirname, '../style/scss/index.sass')
    },
    //输出路径
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].css'
    },
    //加载器
    module: {
        loaders: [
            //{ test: /\.css$/, loader: 'style-loader!css-loader' },
            //{ test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style','css!sass!scss') }
        ]
    },
    //插件
    plugins: [
        //new ExtractTextPlugin('app.css')
    ],

    //其它解决方案
    resolve: {
        //查找时的文件后序名
        extensions: ['', '.sass', '.scss'],
        //包引用别名定义
        alias: {
            _configUrl: path.resolve(__dirname, './build/_config.json')
        }
    }
};
