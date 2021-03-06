"use strict";

import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    app.get("/static/bundle.js", function (req, res) {
        res.sendFile(__dirname + '/build/bundle.js');
    });
}
else {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var config = require('./webpack.config.dev');
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.get("*", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("Listening on port %s.", port);
    }
});
