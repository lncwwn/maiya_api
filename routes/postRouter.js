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
 * list posts by columns
 * /posts/column/1?offset=0&limit=10
 *
 * @param offset optional, default is 0
 * @param limit optional, default is 10
 */
server.route({
    method: 'GET',
    path: '/posts/column/{id}',
    handler: (request, reply) => {
        const columnId = request.params.id;
        const offset = request.query.offset ? +request.query.offset : 0;
        const limit = request.query.limit ? +request.query.limit : 10;
        Post.listByColumn(columnId, offset, limit).then(data => {
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

/**
 * find post by specified title
 * /posts/title/post title
 *
 * @param title post title
 */
server.route({
    method: 'GET',
    path: '/posts/title/{title}',
    handler: (request, reply) => {
        const title = request.params.title;
        Post.findByTitle(title).then(data => {
            return reply(data);
        });
    },
    config: {
        validate: {
            params: {
                title: Joi.string().min(3)
            }
        }
    }
});

/**
 * create new post
 *
 * @author victor li
 * @date 2016/02/15
 */
server.route({
    method: 'POST',
    path: '/posts/create',
    handler: (request, reply) => {
        const title = request.payload.title;
        const content = request.payload.content;
        const created = request.payload.created;
        const author = request.payload.author;
        Post.create({
            title: title,
            content: content,
            created: created,
            author: author
        }).then(data => {
            return reply(data);
        });
    },
    config: {
        validate: {
            params: {
                title: Joi.string().min(3),
                content: Joi.string().min(1),
                author: Joi.string()
            }
        }
    }
});
