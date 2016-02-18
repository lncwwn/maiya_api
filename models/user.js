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
    salt: {type: Sequelize.STRING, field: 'salt', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', defaultValue: Sequelize.NOW, allowNull: false},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_user'
});

// find users by offset and limit
User.list = function(offset, limit) {
    return User.findAndCountAll({
        attributes: ['id', 'nick', 'email', 'created', 'updated'],
        offset: offset,
        limit: limit
    });
};

// 该方法查询user所有属性用于用户验证
User.findUserForAuth = function(nick) {
    return User.findOne({where: {nick: nick}});
};

// 该方法不查询用户密码等敏感信息
User.findByNick = function(nick) {
    return User.findOne({
        attributes: ['id', 'nick', 'email', 'created', 'updated'],
        where: {nick: nick}
    });
};

module.exports = User;

