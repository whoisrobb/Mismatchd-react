const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        storeId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Store.associate = (models) => {
        Store.hasMany(models.Product);
    };

    return Store;
});