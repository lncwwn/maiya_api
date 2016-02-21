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

// register logger plugin
server.register({
    register: require('good'),
    options: require('./settings/log_setting')
}, (err) => {
    if (err) {
        server.log(['error'], err);
        throw err;
    }
    server.start(() => {
        server.log(['info'], 'Server start at:'+server.info.uri);
    });
});

const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const shopRouter = require('./routes/shopRouter');
const topicRouter = require('./routes/topicRouter');

