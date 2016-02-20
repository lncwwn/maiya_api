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
        //
    }
});

