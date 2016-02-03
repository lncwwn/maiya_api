/**
 * Router for Post.
 *
 * @author victor li
 * @date 2016/02/03
 */

'use strict';

const server = require('../server');
const Post = require('../models/post');

const Joi = require('joi');

/**
 * list posts
 * /posts?offset=0&limit=10
 *
 * @param offset optional, default is 0
 * @param limit optional, default is 10
 */
server.route({
    method: 'GET',
    path: '/posts',
    handler: (request, reply) => {
        const offset = request.query.offset ? +request.query.offset : 0;
        const limit = request.query.limit ? +request.query.limit : 10;
        Post.list(offset, limit).then(data => {
            return reply(data);
        });
    }
});

/**
 * find post by seecified id
 * /posts/id/1
 *
 * @param id post id
 */
server.route({
    method: 'GET',
    path: '/posts/id/{id}',
    handler: (request, reply) => {
        const id = +request.params.id;
        if (isNaN(id)) {
            //return reply();
        }
        Post.findById(id).then(data => {
            return reply(data);
        });
    },
    config: {
        validate: {
            params: {
                id: Joi.number()
            }
        }
    }
});

