const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Chapter_Info",{
        chapter_info_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        mision: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vission:{
            type: DataTypes.STRING,
            allowNull: false
        },
        objetives: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chapter_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}
