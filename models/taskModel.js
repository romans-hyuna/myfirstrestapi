var dbConn = require('../dbConnection');
var promise = require('q');


var taskModel = {
    getTasks: function() {
        var query = 'select * from roman_tasks';

        return dbConn.query(query);
    },

    getTaskById: function(req){
        var query = 'select * from roman_tasks where id = ' + req.params.id;
        return dbConn.query(query)
            .then(function(rows){
                return rows[0];
            });
    },

    createTask: function(req){
        var query = 'insert into roman_tasks set ';
        var params = req.body;

        for (var param in params) {
            query += param + " = '" + params[param] + "', ";
        }

        if (query.slice(-2) == ', ') {
            query = query.slice(0, -2);
        }

        return dbConn.query(query)
            .then(function(result){
                return {'msg': 'task was successfully created', 'result': result}
            });
    },

    updateTask: function(req) {
        return this.getTaskById(req)
            .then(function(row){
                if(!row) {
                    return {'msg': 'cant find task by this id', 'result': null}
                }

                var params = req.body;
                var query = 'UPDATE roman_tasks set ';

                for (var param in params) {
                    query += param + " = '" + params[param] + "', ";
                }

                if (query.slice(-2) == ', ') {
                    query = query.slice(0, -2);
                }

                query += 'where id = ' + req.params.id;

                return dbConn.query(query);
            })
            .then(function(result){
                if (result.msg){
                    return result;
                }
                return {'msg': 'task was successfully updated', 'result': result}
            });
    },

    deleteTask: function(req) {
        return this.getTaskById(req)
            .then(function(row){
                if(!row) {
                    return {'msg': 'cant find task by this id', 'result': null}
                }
                var query = "delete from roman_tasks where id = " + req.params.id;

                return dbConn.query(query);
            })
            .then(function(result){
                if (result.msg){
                    return result;
                }
                return {'msg': 'task was successfully deleted', 'result': result}
            })
    }


};

module.exports = taskModel;
