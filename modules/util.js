/**
 * util module
 *
 * @author victor li
 * @date 2016/02/17
 */

'use strict';

module.exports.random = function() {
    const raw = [0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 'a', 'b', 'c', 'd',
                'e', 'f', 'g', 'h', 'i', 'j', 'k',
                'l', 'm', 'n', 'o', 'p', 'q', 'r',
                's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let str = '';
    for (let i = 0; i < 5; i++) {
        str += raw[Math.ceil(Math.random() * 35)];
    }
    return str;
};
