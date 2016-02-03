/**
 * User model
 *
 * @author victor li
 * @date 2016/03/04
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');

const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    nick: {type: Sequelize.STRING, field: 'nick', unique: true, allowNull: false},
    email: {type: Sequelize.STRING, field: 'email', unique: true, allowNull: true},
    password: {type: Sequelize.STRING, field: 'password', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', defaultValue: Sequelize.NOW, allowNull: false},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_user'
});

module.exports = User;

