'use strict';
module.exports = function (sequelize, DataTypes) {
    var tasks = sequelize.define('tasks', {
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        description: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
        author_id: DataTypes.INTEGER
    }, {
        timestamps: false,
        tableName: 'roman_tasks',
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return tasks;
};