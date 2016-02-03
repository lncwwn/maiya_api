/**
 * router for User.
 *
 * @author victor li
 * @date 2016/03/04
 */

'use strict';

const server = require('../server');
const User = require('../models/user');

const Joi = require('joi');

/**
 * get user by specified id
 *
 * @author victor li
 * @date 2016/03/04
 */
server.route({
    method: 'GET',
    path: '/users/id/{id}',
    handler: (request, reply) => {
        const id = request.params.id;
        User.findById(id).then((data) => {
            return reply(data);
        });
    }
});

