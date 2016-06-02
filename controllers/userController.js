usersModel = require('../models/usersModel');

 var usersController = function(app) {
     users =
    app.get('/api/users', function (req, res){
        usersModel.getUssers(res);
    });

    app.get('/api/users/:id', function (req, res){
        usersModel.getUserById(req, res);
    });

    app.post('/api/users/', function (req, res){
        res.json({users: 'new user was added'});
    });
}

module.exports = usersController;

