const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrls: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0.00,
            allowNull: false
        },
        inventory: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        ratings: {
            type: DataTypes.FLOAT,
            defaultValue: 4.5,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Product.associate = (models) => {
        Product.belongsTo(models.Store);
    };

    return Product;
});