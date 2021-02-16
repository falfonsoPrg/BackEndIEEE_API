const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Event",{
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        event_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chapter_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}
