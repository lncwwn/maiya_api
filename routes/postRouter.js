/**
 * Router for Post.
 *
 * @author victor li
 * @date 2016/02/03
 */

'use strict';

const server = require('../server');
const Post = require('../models/post');

// list posts
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

server.route({
    method: 'GET',
    path: '/posts/{id}',
    handler: (request, reply) => {
        const id = request.params.id;
        Post.findById(id).then(data => {
            return reply(data);
        });
    }
});

