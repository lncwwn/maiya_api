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
const moment = require('moment');

/**
 * get user by specified id
 *
 * @author victor li
 * @date 2016/02/04
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

/**
 * user login api
 *
 * @author victor li
 * @date 2016/02/13
 */
server.route({
    method: 'POST',
    path: '/users/login',
    handler: (request, reply) => {
        const nick = request.payload.nick;
        const password = request.payload.password;
        User.findOne({where: {nick: nick, password: password}}).then(data => {
            return reply(data);
        });
    },
    config: {
        validate: {
            payload: {
                nick: Joi.string().min(1),
                password: Joi.string().min(6).max(30)
            }
        }
    }
});

/**
 * user register api
 *
 * @author victor li
 * @date 2016/02/14
 */
server.route({
    method: 'POST',
    path: '/users/register',
    handler: (request, reply) => {
        const nick = request.payload.nick;
        const password1 = request.payload.password1;
        const password2 = request.payload.password2;
        const password = md5(password1);
        const now = moment().format('YYYY-MM-DD hh:mm:ss');
        User.create({
            nick: nick,
            password: password,
            created: now
        }).then(data => {
            return reply(data);
        });
    },
    config: {
        validate: {
            payload: {
                nick: Joi.string().min(1),
                password1: Joi.string().min(6).max(30),
                password2: Joi.string().min(6).max(30)
            }
        }
    }
});
