/**
 * Router for shop.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const server = require('../server');
const Shop = require('../models/shop');

const Joi = require('joi');

/**
 * get shops list
 */
server.route({
    method: 'GET',
    path: '/shops',
    handler: (request, reply) => {
        //const userId = request.params.user_id;
        const offset = request.query.offset ? +request.query.offset : 0;
        const limit = request.query.limit ? +request.query.limit : 10;
        Shop.list(offset, limit).then(data => {
            return reply(data);
        });
    }
});

/**
 * get shop by user
 */
server.route({
    method: 'GET',
    path: '/shops/user/{id}',
    handler: (request, reply) => {
        const userId = request.params.id;
        Shop.findByUser(userId).then(data => {
            return reply(data);
        });
    }
});

/**
 * get shop by id
 */
server.route({
    method: 'GET',
    path: '/shops/id/{id}',
    handler: (request, reply) => {
        const id = request.params.id;
        Shop.findById(id).then(data => {
            return reply(data);
        });
    }
});

/**
 * get shop by name
 */
server.route({
    method: 'GET',
    path: '/shops/name/{name}',
    handler: (request, reply) => {
        const name = request.params.name;
        Shop.findByName(name).then(data => {
            return reply(data);
        });
    }
});
