/**
 * router for User.
 *
 * @author victor li
 * @date 2016/03/04
 */

'use strict';

const server = require('../server');
const User = require('../models/user');
const util = require('../modules/util');

const Boom =  require('boom');
const Joi = require('joi');
const moment = require('moment');
const md5 = require('md5');

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
        User.findOne({where: {nick: nick}}).then(data => {
            if (!data) {
                return reply(Boom.unauthorized(`cannot find user named "${nick}"`));
            }
            if (data.password === md5(password + data.salt)) {
                return reply({
                    id: data.id,
                    nick: data.nick,
                    created: data.created,
                    updated: data.updated
                });
            }
            return reply(Boom.unauthorized('invalid password'));
        });
    },
    config: {
        validate: {
            payload: {
                nick: Joi.string().min(1),
                password: Joi.string().length(32) // for encrypted password
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
        const email = request.payload.email;
        const salt = util.random().toString();
        const password = md5(md5(password1) + salt);
        const now = moment().format('YYYY-MM-DD hh:mm:ss');
        User.create({
            nick: nick,
            password: password,
            email: email,
            salt: salt,
            created: now
        }).then(data => {
            if (data && data.salt) {
                data.salt = null;
                data.password = null;
            }
            return reply(data);
        });
    },
    config: {
        validate: {
            payload: {
                nick: Joi.string().min(1),
                password1: Joi.string().length(32), // raw password
                password2: Joi.string().length(32), // raw password
                email: Joi.string().email()
            }
        }
    }
});
