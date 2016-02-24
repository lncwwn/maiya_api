/**
 * Router for topic.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const server = require('../server');
const Topic = require('../models/topic');

const Joi = require('joi');

server.route({
    method: 'GET',
    path: '/topics/id/{id}',
    handler: (request, reply) => {
        const id = request.params.id;
        Topic.findById(id).then(data => {
            return reply(data);
        });
    }
});

server.route({
    method: 'GET',
    path: '/topics/user/{id}',
    handler: (request, reply) => {
        const userId = request.params.id;
        Topic.findByUser(userId).then(data => {
            return reply(data);
        });
    }
});

