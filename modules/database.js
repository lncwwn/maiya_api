/**
 * Database module.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Sequelize = require('sequelize');

const DB_SETTING = require('../settings/db_setting.json');

module.exports = new Sequelize(
        DB_SETTING.database,
        DB_SETTING.username,
        DB_SETTING.password,

        {
            host: DB_SETTING.host,
            dialect: 'mysql',

            pool: {
                max: DB_SETTING.max_pool_size,
                min: DB_SETTING.min_pool_size,
                idle: DB_SETTING.idle
            }
        }

);

