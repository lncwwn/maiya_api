/**
 * Score model.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');

// define Score model
const Score = sequelize.define('Score', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    user: {type: Sequelize.INTEGER, field: 'user', allowNull: false},
    userScore: {type: Sequelize.STRING, field: 'user_score', allowNull: false, defaultValue: '10'},
    shopScore: {type: Sequelize.STRING, field: 'shop_score', allowNull: false, defaultValue: '100'}
}, {
    timestamps: false,
    tableName: 'tb_score'
});

module.exports = Score;
