/**
 * Order model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');

// define Order model
const Order = sequelize.define('Order', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    number: {type: Sequelize.STRING, field: 'number', allowNull: false},
    // status 0: 订单创建，未支付
    // status 1: 订单已支付
    // status 2: 订单交易成功
    // status 3: 订单已过期
    status: {type: Sequelize.ENUM(0, 1, 2, 3), field: 'status', allowNull: false},
    user: {type: Sequelize.INTEGER, field: 'user', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', allowNull: false, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_order'
});

module.exports = Order;
