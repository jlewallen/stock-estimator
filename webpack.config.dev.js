'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);
config.devtool = 'cheap-module-eval-source-map';
config.entry = [
    'webpack-hot-middleware/client',
    './index'
];
config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev')
    })
];

module.exports = config;
