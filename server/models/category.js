const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // imageUrl: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
    });

    Category.associate = (models) => {
        Category.hasMany(models.Subcategory);
    };

    return Category;
});