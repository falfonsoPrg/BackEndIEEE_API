const { Role } = require('../database/sequelize')

RoleController = {}
RoleController.getRole = async (role_id) => {
    try {
        return await Role.findByPk(role_id,{
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
RoleController.getRoles = async () => {
    try {
        return await Role.findAll({
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
RoleController.createRole = async (pRole) => {
    try {
        return await Role.create(pRole)
    } catch (error) {
        return error
    }
}

RoleController.updateRole = async (pRole) => {
    try {
        return await Role.update(pRole,{
            where: {
                role_id: pRole.role_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = RoleController