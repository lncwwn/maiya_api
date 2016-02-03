/**
 * Post model.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');

// define Post model
module.exports = sequelize.define('post', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    title: {type: Sequelize.STRING, field: 'title', allowNull: false},
    content: {type: Sequelize.TEXT, field: 'content', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', defaultValue: Sequelize.NOW, allowNull: false},
    updated: {type: Sequelize.DATE, field: 'updated'}
}, {
    timestamps: false,
    tableName: 'tb_post'
});

