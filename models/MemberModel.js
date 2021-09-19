const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Member",{
        member_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull:true
        },
        update_password: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}

