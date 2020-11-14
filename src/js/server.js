"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require('path');
var app = express();
var PORT = process.env.PORT;
var srcPath = __dirname + "/../";
var htmlPath = path.join(srcPath, 'html');
//app.use(cookieParser());
app.use('/', require('./route'));
app.use(express.static(srcPath));
//app.use(express.static(htmlPath));
app.get('/', function (req, res) {
    res.sendFile(path.join(htmlPath, 'index.html'));
});
app.listen(PORT, function () {
    console.log("Express App on port " + PORT + "!");
});
