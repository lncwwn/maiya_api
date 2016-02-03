/**
 * Server entry.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const server = require('./server');
const APP_SETTING = require('./settings/app_setting.json');

server.connection({
    host: APP_SETTING.host,
    port: APP_SETTING.port
});

server.start((err)=> {
    if (err) throw err;
    console.log('Server start at:', server.info.uri);
});

const postRouter = require('./routes/postRouter');

