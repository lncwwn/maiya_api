/**
 * Topic model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');
const User = require('../models/user');

// define Topic model
const Topic = sequelize.define('Topic', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    title: {type: Sequelize.STRING, field: 'title', allowNull: false},
    summary: {type: Sequelize.STRING, field: 'summary', allowNull: true},
    star: {type: Sequelize.INTEGER, field: 'star', allowNull: true, defaultValue: 0},
    owner: {type: Sequelize.INTEGER, field: 'owner', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', allowNull: false, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_topic'
});

Topic.belongsTo(User, {foreignKey: 'owner'});

// topic list
Topic.list =  function(offset, limit) {
    return Topic.findAndCountAll({
        include: {
            model: User,
            attributes: ['id', 'nick', 'avatar']
        },
        offset: offset,
        limit: limit
    });
};

// find topic by id
Topic.findById =  function(id) {
    return Topic.findOne({
        include: {
            model: User,
            attributes: ['id', 'nick', 'email', 'avatar', 'created', 'updated']
        },
        where: {
            id: id
        }
    });
};

// find topic by user
Topic.findByUser =  function(userId) {
    return Topic.findOne({
        include: {
            model: User,
            attributes: ['id', 'nick', 'email', 'avatar', 'created', 'updated']
        },
        where: {
            owner: userId
        }
    });
};

module.exports = Topic;
