/**
 * Post model.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');

// define Post model
const Post = sequelize.define('post', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    title: {type: Sequelize.STRING, field: 'title', allowNull: false},
    content: {type: Sequelize.TEXT, field: 'content', allowNull: false},
    created: {type: Sequelize.DATE, field: 'created', defaultValue: Sequelize.NOW, allowNull: false},
    updated: {type: Sequelize.DATE, field: 'updated'}
},
{
    getterMethods: {
        lastModified: function() {
            if (this.updated)
                return this.updated;
            return this.created;
        }
    },
    setterMethods: {
    },
    timestamps: false,
    tableName: 'tb_post'
});

// find posts by offset and limit
Post.list = function(offset, limit) {
    return Post.findAndCountAll({
        offset: offset,
        limit: limit
    });
};

module.exports = Post;

