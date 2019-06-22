'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tbl_products', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            productName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            productDesc: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            productImg: {
                type:Sequelize.TEXT,
                allowNull: true
            },
            productUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tbl_products');
    }
};