/**
 * Question model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');
const User = require('../models/user');

// define Question model
const Question = sequelize.define('Question', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    title: {type: Sequelize.STRING, field: 'title', allowNull: false},
    detail: {type: Sequelize.STRING, field: 'summary', allowNull: true},
    open: {type: sequelize.BOOLEAN, field: 'open', allowNull: false, defaultValue: true},
    star: {type: Sequelize.INTEGER, field: 'star', allowNull: true, defaultValue: 0},
    owner: {type: Sequelize.INTEGER, field: 'owner', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', allowNull: false, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_question'
});

Question.belongsTo(User, {foreignKey: 'owner'});

// question list
Question.list = function(offset, limit) {
    return Question.findAndCountAll({
        include: {
            model: User,
            attributes: ['id', 'nick']
        },
        offset: offset,
        limit: limit
    });
};

// find question by id
Question.findById = function(id) {
    return Question.findOne({
        include: {
            model: User,
            attributes: ['id', 'nick']
        },
        where: {
            id: id
        }
    });
};

module.exports = Question;
