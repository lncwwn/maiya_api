/**
 * Post model.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../modules/database');
const User = require('./user');

// define Post model
const Post = sequelize.define('post', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    title: {type: Sequelize.STRING, field: 'title', allowNull: false},
    content: {type: Sequelize.TEXT, field: 'content', allowNull: false},
    author: {type: Sequelize.INTEGER, field: 'author', allowNull: false},
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

Post.belongsTo(User, {foreignKey: 'author'});

// find posts by offset and limit
Post.list = function(offset, limit) {
    return Post.findAndCountAll({
        // 查询post所属user
        include: [{
            model: User,
            attributes: ['id', 'nick']
        }],
        order: 'created DESC',
        offset: offset,
        limit: limit
    });
};

// find post by title
Post.findByTitle = function(title) {
    return Post.findOne({where: {title: title}});
};

module.exports = Post;

