'use strict'

let ProductPrice = require('../index').productPrice;
module.exports = (sequelize, DataTypes) => {
    let Product = sequelize.define('tbl_product', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productDesc: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        productImg: {
            type:DataTypes.TEXT,
            allowNull: true
        },
        productUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {})

    // Product.hasMany(ProductPrice);

    // Product.associate = (models) => {
    //     Product.hasMany(models.tbl_product_price, {
    //         foreignKey: 'ProductId',
    //         onDelete: 'CASCADE',
    //         as: 'productPrice'
    //     });
    //     Product.hasMany(models.tbl_comment, {
    //         foreignKey: 'ProductId',
    //         onDelete: 'CASCADE',
    //         as: 'comment'
    //     });
    // }

    return Product;
}