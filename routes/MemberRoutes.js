const router = require('express').Router()
const MemberController = require('../controllers/MemberController')
const bcrypt = require('bcryptjs')
const { CreateMemberValidation, UpdateMemberValidation, DeleteMemberValidation} = require('../middlewares/Validation')
const cloudinary = require('cloudinary').v2
const mailer = require('../services/mailer')

cloudinary.config({ 
    cloud_name: process.env.CLOUDY_NAME, 
    api_key: process.env.CLOUDY_KEY, 
    api_secret: process.env.CLOUDY_KEY_S 
});

router.get('/:member_id', async (req,res)=>{
    /**
        #swagger.tags = ['Members']
        #swagger.path = '/members/{member_id}'
        #swagger.description = 'Endpoint to get one member'
     */
    const member_id = req.params.member_id
    const member = await MemberController.getMember(member_id)
    if(member){
        return res.status(200).send({
            response: member
        })
    }
    return res.status(404).send({
        error: "Couldn't found that member"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Members']
        #swagger.path = '/members'
        #swagger.description = 'Endpoint to get all members'
     */
    const members = await MemberController.getMembers()
    if(members.length > 0){
        return res.status(200).send({
            response: members
        })
    }
    return res.status(404).send({
        error: "Couldn't found any member"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Members']
        #swagger.path = '/members'
        #swagger.description = 'Endpoint to create a member'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Member'
            }
        }]
     */
    const {error} = CreateMemberValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const notHasedPassword = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(notHasedPassword, salt)
    req.body.password = hashedPassword

    if(req.body.default_image){
        req.body.image_path = process.env.DEFAULT_MEMBER_IMAGE
    }else{
        var matches = req.body.image_path.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        if (matches.length !== 3) {
            return res.status(422).send({
                error: "The image have an incorrect format"
            })
        }
    
        await cloudinary.uploader.upload(req.body.image_path)
        .then(result =>{
            req.body.image_path = result.url
        })
        .catch(err=>{
            return res.status(422).send({
                error: "Couldn't save the image"
            })
        })    
    }

    const member = await MemberController.createMember(req.body)
    if(member.errors || member.name){
        return res.status(400).send({
            error: "Couldn't save the member"
        })
    }
    if(mailer.sendEmail(req.body.email, "New account registered", "You have been registered in the system of the IEEE Stundent Branch of the El Bosque University. Here's you password: " + notHasedPassword + " we recommend to change it once you have logged")){
        return res.status(201).send()
    }else{
        return res.status(404).send({
            error: "Couldn't send the email"
        })
    }
})

router.put('/:member_id/changePassword', async (req,res)=>{
    /**
        #swagger.tags = ['Members']
        #swagger.path = '/members/{member_id}/changePassword'
        #swagger.description = 'Endpoint to update password for a member'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Member'
            }
        }]
     */
    const objectMember = {
        member_id: req.params.member_id,
        password: req.body.password,
    }
    const {error} = UpdateMemberValidation(objectMember)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    objectMember.update_password = false
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(objectMember.password, salt)
    objectMember.password = hashedPassword

    const member = await MemberController.updateMember(objectMember);
    if(member[0] == 0 || member.name){
        return res.status(404).send({
            error: "Couldn't update the member"
        })
    }
    return res.status(204).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Members']
        #swagger.path = '/members'
        #swagger.description = 'Endpoint to update a member'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Member'
            }
        }]
     */
    const {error} = UpdateMemberValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    if(req.body.default_image){
        req.body.image_path = process.env.DEFAULT_MEMBER_IMAGE
    }else{
        if(req.body.image_path && req.body.image_path !== ""){
            var matchesUrl = req.body.image_path.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
            if(!matchesUrl){
                var matches = req.body.image_path.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
                if (matches.length !== 3) {
                    return res.status(422).send({
                        error: "The image have an incorrect format"
                    })
                }
                await cloudinary.uploader.upload(req.body.image_path)
                .then(result =>{
                    req.body.image_path = result.url
                })
            }
        }
    }

    const member = await MemberController.updateMember(req.body);
    if(member[0] == 0 || member.name){
        return res.status(404).send({
            error: "Couldn't update the member"
        })
    }
    return res.status(204).send()
})

router.delete('/:member_id', async (req,res)=>{
    /**
        #swagger.tags = ['Members']
        #swagger.path = '/members/{member_id}'
        #swagger.description = 'Endpoint to delete one member'
     */
    const toDelete = {
        member_id: req.params.member_id,
    }
    const {error} = DeleteMemberValidation(toDelete)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const existMember =  await MemberController.getMember(toDelete.member_id);
    if(!existMember || existMember.Chapter_Members.length > 0){
        return res.status(404).send({
            error: "You cannot delete this member, either don't exist or you should remove it from the chapters that is in it"
        })
    }
    const member = await MemberController.deleteMember(toDelete);
    if(member === 0){
        return res.status(404).send({
            error: "Couldn't delete the Member"
        })
    }
    return res.status(204).send()
})

module.exports = router;
