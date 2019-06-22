'use strict'

let Product = require('../index').product;
module.exports = (sequelize, DataTypes) => {
    let ProductPrice = sequelize.define('tbl_product_price', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        productPrice: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {});

    // ProductPrice.associate = (models) => {
    //     ProductPrice.belongsTo(models.tbl_product, {
    //         foreignKey: 'ProductId',
    //         onDelete: 'CASCADE'
    //     });
    // }

    // ProductPrice.belongsToMany(Product, {through: 'productPrice'})

    return ProductPrice;
}