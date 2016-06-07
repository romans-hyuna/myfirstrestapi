var dbConn = require('../dbConnection');
var taskModel = {};

taskModel.getTasks = function(req, res, callback){
    var query = 'select * from roman_tasks';
    dbConn.query(query, function(err, result){
        if (err) {
           return callback(err);
        }
        callback(false, result);
    });
};

taskModel.getUserById = function(req, res, callback){
    var query = 'select * from roman_tasks where id = ' + req.params.id;
    dbConn.query(query, function(err, result){
        if (err) {
            callback(err);
        }
        callback(false, result);
    });
};

taskModel.createUser = function(req, res, callback){
    var query = 'insert into roman_tasks set ';
    var params = req.body;

    for (var param in params) {
        query += param + " = '" + params[param] + "', ";
    }

    if (query.slice(-2) == ', ') {
        query = query.slice(0, -2);
    }

    dbConn.query(query, function(err, result){
        if (err) {
            return callback(err);
        }
        callback(false, result);
    });
};

taskModel.updateUser =  function (req, res, callback){
    var params = req.body;
    var query = 'UPDATE roman_tasks set ';

    for (var param in params) {
        query += param + " = '" + params[param] + "', ";
    }

    if (query.slice(-2) == ', ') {
        query = query.slice(0, -2);
    }

    query += 'where id = ' + req.params.id;

    dbConn.query(query, function(err, result){
        if (err) {
            callback(err);
        }
        callback(false, result);
    });
}

taskModel.deleteUser = function(req, res, callback){
    var query = "delete from roman_tasks where id = " + req.params.id;

    dbConn.query(query, function(err, result){
        if (err) {
            callback(err);
        }
        callback(false, result);
    });
};

module.exports = taskModel;