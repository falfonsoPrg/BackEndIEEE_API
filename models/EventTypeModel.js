const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Event_Type",{
        event_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        event_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
