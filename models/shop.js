/**
 * Shop model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');
const User = require('../models/user');

// define Shop model
const Shop = sequelize.define('Shop', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    name: {type: Sequelize.STRING, field: 'name', allowNull: false},
    active: {type: Sequelize.BOOLEAN, field: 'active', allowNull: false, defaultValue: false},
    owner: {type: Sequelize.INTEGER, field: 'owner', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', allowNull: false, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_shop'
});

Shop.belongsTo(User, {foreignKey: 'owner'});

// 分页获取店铺列表
Shop.list = function(offset, limit) {
    return Shop.findAndCountAll({
        offset: offset,
        limit: limit
    });
};

// 根据用户id查找店铺
Shop.findByUser = function(userId) {
    return Shop.findOne({
        include: {
            model: User,
            attributes: ['id', 'nick', 'email', 'avatar', 'created', 'updated']
        },
        where: {
            owner: userId
        }
    });
};

// 根据店铺ID获取店铺信息
Shop.findById = function(id) {
    return Shop.findOne({
        include: {
            model: User,
            attributes: ['id', 'nick', 'email', 'avatar', 'created', 'updated']
        },
        where: {
            id: id
        }
    });
};

// 根据店铺名称获取店铺信息
Shop.findByName = function(name) {
    return Shop.findOne({
        include: {
            model: User,
            attributes: ['id', 'nick', 'email', 'avatar', 'created', 'updated']
        },
        where: {
            name: name
        }
    });
};

module.exports = Shop;
