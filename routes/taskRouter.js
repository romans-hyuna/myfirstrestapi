var express = require('express');
var router = express.Router();
var taskModel = require('../models/taskModel');

router.get('/tasks', function(req,res){
    taskModel.getTasks(req, res, function(err, result) {
        res.render('tasks', {tasks: result});
    });
});

module.exports = router;
