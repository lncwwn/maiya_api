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

/**
 * make shop active
 */
server.route({
    method: 'POST',
    path: '/shops/active',
    handler: (request, reply) => {
        const name = request.payload.name;
        const userId = request.payload.user_id;

        Shop.count({
            where: {
                owner: userId,
                active: 0
            }
        }).then(count => {
            if (count === 0) {
                Shop.count({
                    where: {
                        owner: userId,
                        active: 1
                    }
                }).then(count => {
                    if (count === 0) {
                        Shop.create({
                            name: name,
                            owner: userId,
                            active: true
                        }).then(data => {
                            return reply(data);
                        });
                    }
                });
            } else if (count === 1) {
                Shop.update({
                    name: name,
                    active: true
                }, {
                    where: {owner: userId},
                    fields: ['name', 'active']
                }).then(data => {
                    return reply(data);
                });
            }
        });
    }
});
