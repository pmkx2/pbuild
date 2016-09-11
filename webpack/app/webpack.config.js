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
        app: path.join(__dirname, '/js/src/index.js')
    },
    //输出路径
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    //加载器
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //插件
    plugins: [],

    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.sass'],
        alias: {
            _configUrl: path.join(__dirname, 'build/_config.json')
        }
    }
};
