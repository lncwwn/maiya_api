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
const Column = require('./column');

// define Post model
const Post = sequelize.define('post', {
    id: {type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true, unique: true},
    title: {type: Sequelize.STRING, field: 'title', allowNull: false},
    content: {type: Sequelize.TEXT, field: 'content', allowNull: false},
    author: {type: Sequelize.INTEGER, field: 'author', allowNull: false},
    active: {type: Sequelize.BOOLEAN, field: 'active', allowNull: false, defaultValue: true},
    star: {type: Sequelize.INTEGER, field: 'star', allowNull: true, defaultValue: 0},
    column: {type: Sequelize.INTEGER, field: 'column', allowNull: true},
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

// 文章与作者 m:1
Post.belongsTo(User, {foreignKey: 'author'});
// 文章与专栏 m:1
Post.belongsTo(Column, {foreignKey: 'column'});

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

