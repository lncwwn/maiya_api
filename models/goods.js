/**
 * Goods model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');
const Shop = require('./shop');

// define Order model
const Goods = sequelize.define('Goods', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    name: {type: Sequelize.STRING, field: 'name', allowNull: false},
    price: {type: Sequelize.STRING, field: 'price', allowNull: false},
    inventory: {type: Sequelize.INTEGER, field: 'inventory', allowNull: false, defaultValue: 0},
    onSale: {type: Sequelize.BOOLEAN, field: 'on_sale', allowNull: false, defaultValue: false},
    description: {type: Sequelize.STRING, field: 'description', allowNull: true},
    star: {type: Sequelize.INTEGER, field: 'star', allowNull: true, defaultValue: 0},
    photos: {type: Sequelize.STRING, field: 'photos', allowNull: false},
    shop: {type: Sequelize.INTEGER, field: 'shop', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', allowNull: false, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_goods'
});

Goods.belongsTo(Shop, {foreignKey: 'shop'});

Goods.list = function(offset, limit) {
    return Goods.findAndCountAll({
        include: {
            model: Shop,
            attributes: ['id', 'name']
        },
        offset: offset,
        limit: limit
    });
};

Goods.listByShop = function(offset, limit, shopId) {
    return Goods.findAndCountAll({
        where: {
            shop: shopId
        },
        include: {
            model: Shop,
            attributes: ['id', 'name']
        },
        offset: offset,
        limit: limit
    });
};

Goods.findById = function(id) {
    return Goods.findOne({
        where: {
            id: id
        }
    });
};

module.exports = Goods;
