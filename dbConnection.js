var mysql = require('mysql');

function dbConnection ()
{
    this.pool = mysql.createPool({
        host     : 'dev',
        user     : 'root',
        password : '*******',//i don't want to show you my pass :D
        database: 'nodejs_test_db'
    });
}

dbConnection.prototype.query = function (query, callback){
    this.pool.getConnection(function(err, connection) {
        if (err) {
            callback(err);
        }
        connection.query(query, function(err, rows) {
            if(err){
                callback(err);
            }

            connection.release();
            callback(false, rows);
        });

    });
}

module.exports = new dbConnection();