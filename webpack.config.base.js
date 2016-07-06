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
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: __dirname
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: __dirname
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./style")]
    }
};
