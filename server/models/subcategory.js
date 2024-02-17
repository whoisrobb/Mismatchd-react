const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
        subcategoryId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // imageUrls: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrls: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Subcategory.associate = (models) => {
        Subcategory.belongsTo(models.Category);
    };

    return Subcategory;
});