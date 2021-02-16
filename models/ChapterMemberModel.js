const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Chapter_Member",{
        member_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        chapter_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
}
