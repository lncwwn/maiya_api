/**
 * Router for goods.
 *
 * @author victor li
 * @date 2016/03/04
 */

'use strict';

const server = require('../server');
const Goods = require('../models/goods');

const Boom =  require('boom');
const Joi = require('joi');

/**
 * list goods
 */
server.route({
    method: 'GET',
    path: '/goods',
    handler: (request, reply) => {
        const offset = request.query.offset ? +request.query.offset : 0;
        const limit = request.query.limit ? +request.query.limit : 10;
        Goods.list(offset, limit).then(data => {
            return reply(data);
        });
    }

});

/**
 * list goods by shop
 */
server.route({
    method: 'GET',
    path: '/goods/shop/{id}',
    handler: (request, reply) => {
        const offset = request.query.offset ? +request.query.offset : 0;
        const limit = request.query.limit ? +request.query.limit : 10;
        const shopId = request.query.id;
        Goods.listByShop(offset, limit, shopId).then(data => {
            return reply(data);
        });
    }
});
