const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Chapter",{
        chapter_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        chapter_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true
        },
        logo_path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}
