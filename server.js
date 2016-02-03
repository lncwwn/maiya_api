/**
 * Server entry.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Hapi = require('hapi');

const APP_SETTING = require('./settings/app_setting.json');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: APP_SETTING.port
});

server.route({
    method: 'GET',
    path: '/test',
    handler: (request, reply) => {
        return reply('Hello, World');
    }
});

server.start((err)=> {
    if (err) {
        throw err;
    }
    console.log('Server start at:', server.info.uri);
});


