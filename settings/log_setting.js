'use strict';

module.exports = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: {log: '*', response: '*'}
    }, {
        reporter: require('good-file'),
        events: {log: '*', response: '*'},
        config: {
            path: './logs',
            prefix: 'maiya_api',
            rotate: 'daily'
        }
    }]
};

