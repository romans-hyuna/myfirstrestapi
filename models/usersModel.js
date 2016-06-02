var usersModel = {};

usersModel.getUssers = function(res){
    return res.json({users:"get all users"});
};

usersModel.getUserById = function(req, res){
    res.json({users : "get user with id = " + req.params.id});
}

usersModel.createUser = function(req, res){
    res.json({users : "get user with id = " + req.params.id});
}

usersModel.deleteUser = function(req, res){
    res.json({users : "get user with id = " + req.params.id});
}

module.exports = usersModel;