var mysql = require('mysql');
var promise = require('q');


function dbConnection () {
    this.pool = mysql.createPool({
        host     : 'dev',
        user     : 'root',
        password : '******',//i don't want to show you my pass :D
        database: 'nodejs_test_db'
    });
}

dbConnection.prototype.query = function (query){
    var deferred = promise.defer();
    this.pool.getConnection(function(err, connection) {
        if (err) {
            return deferred.reject(err);
        }
            connection.query(query, function (err, rows) {
                if (err) {
                    return deferred.reject(err);
                }

                connection.release();
                return deferred.resolve(rows);
            });
    });
    return deferred.promise;
}

module.exports = new dbConnection();
