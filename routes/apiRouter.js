var express = require('express');
var router = express.Router();
//var taskModel = require('../models/taskModel');
var models = require('../models/index');

router.get('/api/tasks', function (req, res) {
    models.tasks.findAll({})
        .then(function (tasks) {
            res.json({'response': tasks});
        })
        .catch(function (err) {
            console.log(err);
            res.json({'error': err.message});
        });
});

router.get('/api/tasks/:id', function (req, res) {
    var id = req.params.id;
    models.tasks.findById(id)
        .then(function (task) {
            if (!task) {
                res.status(404);
            }
            res.json({'response': task});
        })
        .catch(function (err) {
            console.log(err);
            res.json({'error': err.message});
        });
});

router.post('/api/tasks/', function (req, res) {
    var params = req.body;

    models.tasks.create(params)
        .then(function (task) {
            res.json(task);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).json({'error': err.message})
        });

});

router.put('/api/tasks/:id', function (req, res) {
    var params = req.body;
    models.tasks.find({
        where: {
            id: req.params.id
        }})
        .then(function(task){
            if (task){
                return task.update(params)
            } else {
                res.status(404).json("cant find this");
            }
        })
        .then(function(updated_task){
            res.json({"result" : "user was updated successfully" ,"response" : updated_task});
        })
        .catch(function(err){
            console.log(err);
            res.status(400).json({"err": err.message})
        });

});

router.patch('/api/tasks/:id', function (req, res) {
    var params = req.body;
    models.tasks.update(params, {
        where: {
            id: req.params.id
        }})
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            console.log (err);
            res.status(400).json({"err": err.message})
        });
});

router.delete('/api/tasks/:id', function (req, res) {
    models.tasks.find({
        where: {
            id : req.params.id
        }})
        .then(function(task){
            if (task){
                return task.destroy();
            } else {
                res.status(404).json("cant find this");
            }
        })
        .then(function(result){
            res.json({"result" : "user was deleted successfully" ,"response" : result});
        })
        .catch(function(err){
            console.log(err);
            res.status(400).json({"err": err.message})
        });
});

module.exports = router;