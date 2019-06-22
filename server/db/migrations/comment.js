module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tbl_comments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            ProductId: {
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'tbl_products',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tbl_comments');
    }
};