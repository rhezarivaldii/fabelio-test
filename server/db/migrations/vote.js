module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tbl_votes', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            voteUp: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            voteDown: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            CommentId: {
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'tbl_comments',
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
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tbl_votes');
    }
};