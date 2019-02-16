var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');

var app = new express();

app.use(express.static('./page/'));

app.post('/addEveryDay', loader.get('/addEveryDay'));
app.post('/queryEveryDay', loader.get('/queryEveryDay'));

app.post('/addBlog', loader.get('/addBlog'));
app.post('/getBlog', loader.get('/getBlog'));
app.post('/getBlogDetial', loader.get('/getBlogDetial'));

app.post('/queryTag', loader.get('/queryTag'));

app.post('/addCommit', loader.get('/addCommit'));

app.listen(80);