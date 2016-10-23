/**
 *
 *
 * @author pmkx2 185832959@qq.com
 **/
"use strict";

var path = require('path');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    //插件项
    //plugins: [commonsPlugin],
    plugins: [],
    //页面入口文件配置
    entry: {
        index : './js/src/index.js'
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: path.resolve(__dirname, './build/_config.json'), //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};



/*
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
            { sass: /\.scss$/, loader: ExtractTextPlugin.extract('style','css!sass!scss') }
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
*/