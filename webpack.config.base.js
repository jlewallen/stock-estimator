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
            include: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "node_modules/flash-notification-react-redux")
            ]
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
