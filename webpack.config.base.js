var path = require('path');
var webpack = require('webpack');

module.exports = {
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: __dirname
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./style")]
    }
};

