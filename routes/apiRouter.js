var express = require('express');
var router = express.Router();
var taskModel = require('../models/taskModel');

router.get('/api/tasks', function (req, res) {
    taskModel.getTasks()
        .then(function(rows){
            res.json({'response': rows});
        })
        .fail(function(err){
            console.log(err);
            res.json({'error': err.message});
        });
});

router.get('/api/tasks/:id', function (req, res) {
    taskModel.getTaskById(req)
        .then(function(row){
            res.json({'response': row});
        })
        .fail(function(err){
            console.log(err);
            res.json({'error': err.message});
        })
});

router.post('/api/tasks/', function (req, res) {
    taskModel.createTask(req)
        .then(function(response){
            res.json({'response': {
                'msg' : response.msg,
                'result' : response.result
            }});
        })
        .fail(function(err){
            console.log(err);
            res.json({'error': err.message});
        })
});

router.put('/api/tasks/:id', function (req, res) {
    taskModel.updateTask(req)
        .then(function(response){
            res.json({'response': {
                'msg' : response.msg,
                'result' : response.result
            }});
        })
        .fail(function(err){
            console.log(err);
            res.json({'error': err.message});
        })
});

router.delete('/api/tasks/:id', function (req, res) {
    taskModel.deleteTask(req)
        .then(function(response){
            res.json({'response': {
                'msg' : response.msg,
                'result' : response.result
            }});
        })
        .fail(function(err){
            console.log(err);
            res.json({'error': err.message});
        })
});

module.exports = router;