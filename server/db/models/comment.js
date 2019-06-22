
module.exports = (sequelize, DataTypes) => {
    let Comment = sequelize.define('tbl_comment', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        comment: {
            allowNull: false,
            type: DataTypes.TEXT
        }
    }, {});

    Comment.associate = (models) => {
        Comment.belongsTo(models.tbl_product, {
            foreignKey: 'ProductId',
            onDelete: 'CASCADE'
        })
        Comment.hasOne(models.tbl_vote, {
            foreignKey: 'CommentId',
            onDelete: 'CASCADE',
            as: 'vote'
        });
    }

    return Comment;
}