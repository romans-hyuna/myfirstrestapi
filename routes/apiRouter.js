var express = require('express');
var router = express.Router();
var taskModel = require('../models/taskModel');

router.get('/api/tasks', function (req, res) {
    taskModel.getTasks(req, res, function (err, result) {
        if (err) {
            console.log(err);
            res.json({'error': err.message});
        }
        res.json({'response': result});
    });
});

router.get('/api/tasks/:id', function (req, res) {
    taskModel.getUserById(req, res, function (err, result) {
        var response = result;
        if (err) {
            console.log(err);
            res.json({'error': err.message});
        }

        if (result.length == 0) {
            response = 'cat find task by this id';
        }

        res.json({'response': response});
    });
});

router.post('/api/tasks/', function (req, res) {
    taskModel.createUser(req, res, function (err, result) {
        if (err) {
            console.log(err);
            res.json({'error': err.message});
        }

        res.json({'response': 'task was added to db'});
    });
});

router.put('/api/tasks/:id', function (req, res) {
    taskModel.updateUser(req, res, function (err, result) {
        if (err) {
            console.log(err);
            res.json({'error': err.message});
        }
        res.json({'response': 'user was updated successfully'});
    })
});

router.delete('/api/tasks/:id', function (req, res) {
    taskModel.deleteUser(req, res, function (err, result) {
        if (err) {
            console.log(err);
            res.json({'error': err.message});
        }
        res.json({'response': 'user was deleted successfully'});
    })
});

module.exports = router;