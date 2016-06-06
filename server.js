"use strict";

var express = require('express');
var apiRouter = require('./routes/apiRouter');
var taskRouter = require('./routes/taskRouter');
var bodyParser = require('body-parser');
var app = express();

//add log requests
function logRequest(req, res, next) {
    console.log('Url = ' + req.originalUrl + ', Request Type: ' + req.method);
    next();
}

//middleware functions
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logRequest);

//base route
app.all('/', function (req, res) {
    res.send('my first api, pls use "url"/api/"router"');
})

//router for view
app.use('/', taskRouter);
//router for api
app.use('/', apiRouter);

//404
app.use(function (req, res) {
    res.status(404).send('Page Not Found');
});

//500
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

//run server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});