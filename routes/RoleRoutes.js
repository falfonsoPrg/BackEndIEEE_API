const router = require('express').Router()
const RoleController = require('../controllers/RoleController')
const { CreateRoleValidation,UpdateRoleValidation, DeleteRoleValidation } = require('../middlewares/Validation')

router.get('/:role_id', async (req,res)=>{
    /**
        #swagger.tags = ['Roles']
        #swagger.path = '/roles/{role_id}'
        #swagger.description = 'Endpoint to get one role'
     */
    const role_id = req.params.role_id
    const role = await RoleController.getRole(role_id)
    if(role){
        return res.status(200).send({
            response: role
        })
    }
    return res.status(404).send({
        error: "Couldn't found that role"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Roles']
        #swagger.path = '/roles'
        #swagger.description = 'Endpoint to get all roles'
     */
    const roles = await RoleController.getRoles()
    if(roles.length > 0){
        return res.status(200).send({
            response: roles
        })
    }
    return res.status(404).send({
        error: "Couldn't found any role"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Roles']
        #swagger.path = '/roles'
        #swagger.description = 'Endpoint to create a role'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Role'
            }
        }]
     */
    const {error} = CreateRoleValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const role = await RoleController.createRole(req.body)
    if(role.errors || role.name){
        return res.status(400).send({
            error: "Couldn't save the role"
        })
    }

    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Roles']
        #swagger.path = '/roles'
        #swagger.description = 'Endpoint to update a role'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Role'
            }
        }]
     */
    const {error} = UpdateRoleValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const role = await RoleController.updateRole(req.body);
    if(role[0] == 0 || role.name){
        return res.status(404).send({
            error: "Couldn't update the Role"
        })
    }
    return res.status(204).send()
})
router.delete('/:role_id', async (req,res)=>{
    /**
        #swagger.tags = ['Roles']
        #swagger.path = '/roles/{role_id}'
        #swagger.description = 'Endpoint to delete a role'
     */
    const toDelete = {
        role_id: req.params.role_id
    }
    const {error} = DeleteRoleValidation(toDelete)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    
    const role = await RoleController.deleteRole(toDelete)
    if(role === 0){
        return res.status(404).send({
            error: "Couldn't delete the Role"
        })
    }
    return res.status(204).send()
})

module.exports = router;