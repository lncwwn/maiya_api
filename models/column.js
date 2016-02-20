/**
 * Column model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');

// define Topic model
const Column = sequelize.define('Column', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    name: {type: Sequelize.STRING, field: 'title', allowNull: false},
    active: {type: Sequelize.BOOLEAN, field: 'active', allowNull: false, defaultValue: false},
    star: {type: Sequelize.INTEGER, field: 'star', allowNull: true, defaultValue: 0},
    author: {type: Sequelize.INTEGER, field: 'author', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', allowNull: false, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, field: 'updated', allowNull: true}
}, {
    timestamps: false,
    tableName: 'tb_column'
});

module.exports = Column;
