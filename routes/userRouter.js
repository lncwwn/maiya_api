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
 * get user by specified nick
 *
 * @author victor li
 * @date 2016/02/17
 */
server.route({
    method: 'GET',
    path: '/users/nick/{nick}',
    handler: (request, reply) => {
        const nick = request.params.nick;
        User.findUserForAuth(nick).then(data => {
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
                // for encrypted password
                password: Joi.string().length(32)
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
        const password = request.payload.password1;
        const email = request.payload.email;
        const salt = util.random().toString();
        const _password = md5(password + salt);
        const now = moment().format('YYYY-MM-DD hh:mm:ss');
        User.create({
            nick: nick,
            password: _password,
            email: email,
            salt: salt,
            created: now
        }).then(data => {
            if (data && data.salt) {
                data.salt = null;
                data.password = null;
            }
            return reply(data);
        }).catch(function(err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return reply(Boom.conflict(`nick "${nick}" has been used`));
            } else {
                return reply(err.errors);
            }
        });
    },
    config: {
        validate: {
            payload: {
                nick: Joi.string().min(1),
                // encrypted password
                password: Joi.string().length(32),
                email: Joi.string().email()
            }
        }
    }
});

/**
 * update user profile(exclude password)
 */
server.route({
    method: 'PUT',
    path: '/users/{id}',
    handler: (request, reply) => {
        const id = request.params.id;
        const _params = request.payload;
        const params = {};
        const fields = [];
        for (let key in _params) {
            if (key !== 'password') {
                params[key] = _params[key];
                fields.push(key);
            }
        }

        User.update(params, {
            where: {id: id},
            fields: fields
        }).then(data => {
            return reply(data);
        }).catch(function(err) {
            console.log(err);
            return reply(err.errors);
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

