/**
 * Router for column.
 *
 * @author victor li
 * @date 2016/02/25
 */

'use strict';

const server = require('../server');
const Column = require('../models/column');

const Boom =  require('boom');
const Joi = require('joi');

server.route({
    method: 'GET',
    path: '/columns/id/{id}',
    handler: (request, reply) => {
        const id = request.params.id;
        Column.findById(id).then(data => {
            return reply(data);
        });
    }
});

server.route({
    method: 'GET',
    path: '/columns/user/{id}',
    handler: (request, reply) => {
        const userId = request.params.id;
        Column.findByUser(userId).then(data => {
            return reply(data);
        });
    }
});

/**
 * 激活用户专栏
 *
 */
server.route({
    method: 'POST',
    path: '/columns/active',
    handler: (request, reply) => {
        const name = request.payload.name;
        const userId = request.payload.user_id;

        Column.count({
            where: {
                author: userId,
                active: true
            }
        }).then(count => {
            if (count) {
                return reply(Boom.conflict('column has been actived'));
            } else {
                Column.count({
                    where: {
                        author: userId,
                        active: false
                    }
                }).then(count => {
                    if (count) {
                        Column.update({
                            active: true
                        }, {
                            where: {
                                author: userId
                            },
                            fields: ['active']
                        }).then(data => {
                            return reply(data);
                        });
                    } else {
                        Column.create({
                            author: userId,
                            name: name,
                            active: true,
                            created: new Date()
                        }).then(data => {
                            return reply(data);
                        });
                    }
                });
            }
        });
    },
    config: {
        validate: {
            payload: {
                name: Joi.string(1),
                user_id: Joi.number()
            }
        }
    }
});

