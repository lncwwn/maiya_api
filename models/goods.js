/**
 * Goods model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');

// define Order model
const Goods = sequelize.define('Goods', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    name: {type: Sequelize.STRING, field: 'name', allowNull: false},
    price: {type: Sequelize.STRING, field: 'price', allowNull: false},
    inventory: {type: Sequelize.INTEGER, field: 'inventory', allowNull: false, defaultValue: 0},
    onSale: {type: Sequelize.BOOLEAN, field: 'on_sale', allowNull: false, defaultValue: false},
    shop: {type: Sequelize.INTEGER, field: 'shop', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', allowNull: false, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_goods'
});

module.exports = Goods;
