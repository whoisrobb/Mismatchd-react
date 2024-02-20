const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        postId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        summary: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        coverImage: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Post;
});