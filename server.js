"use strict";

var express = require('express');
var usersController = require('./controllers/userController');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

//add log requests
function logRequest (req, res, next){
    console.log('Url = ' + req.originalUrl + ', Request Type: ' + req.method);
    next();
}

function logErrors(err, req, res, next) {
    console.error(err.stack);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logRequest);
app.use(logErrors);

app.all('/',function (req, res, next){
    res.send('my first api, pls use "url"/api/"router"');
})

usersController(app);

app.use(function (req, res){
    res.status(404).send('Page Not Found');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});