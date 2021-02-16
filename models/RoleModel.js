const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Role",{
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        canCreate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        canDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        canUpdate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}
