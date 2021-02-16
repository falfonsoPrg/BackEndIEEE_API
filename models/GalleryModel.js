const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Gallery",{
        gallery_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    })
}
