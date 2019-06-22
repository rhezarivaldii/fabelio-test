module.exports = (sequelize, DataTypes) => {
    let Vote = sequelize.define('tbl_vote', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        voteUp: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        voteDown: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {})

    // Vote.associate = (models) => {
    //     Vote.belongsTo(models.tbl_comment, {
    //         foreignKey: 'CommentId',
    //         onDelete: 'CASCADE'
    //     })
    // }

    return Vote;
}