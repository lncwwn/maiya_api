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

/**
 * create new goods
 */
server.route({
    method: 'POST',
    path: '/goods/new',
    handler: (request, reply) => {
        const name = request.payload.name;
        const price = request.payload.price;
        const inventory = request.payload.inventory;
        const description = request.payload.description;
        const photos = request.payload.photos;
        const shop = request.payload.shop;
        Goods.create({
            name: name,
            price: price,
            inventory: inventory,
            description: description,
            photos: photos,
            shop: shop,
            onSale: true
        }).then(data => {
            return reply(data);
        });
    },
    config: {
        validate: {
            payload: {
                name: Joi.string().min(1),
                price: Joi.number().min(0),
                inventory: Joi.number().min(0),
                description: Joi.required(),
                photos: Joi.required(),
                shop: Joi.required()
            }
        }
    }
});
