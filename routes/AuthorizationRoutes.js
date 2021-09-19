const router = require('express').Router()
const MemberController = require('../controllers/MemberController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../services/mailer')

router.post('/login', async (req,res) => {
    //TODO Login Validation
    const member = await MemberController.getMemberByEmail(req.body.email)
    if(member == null) return res.status(404).send({error: "Couldn't found that member"})

    const validPass = await bcrypt.compare(req.body.password,member.password)
    if(!validPass) return res.status(422).send({error:'Incorrect credentials'})

    const token = jwt.sign({document:member.document},process.env.JWTOKEN,{
        expiresIn: "1d"
    })
    let rta = member.dataValues
    delete rta.password
    res.header('auth-token',token).send({token: token, member: rta})
})



router.post('/recoverPassword', async (req,res) => {
    const member = await MemberController.getMemberByEmail(req.body.email)
    if(member == null) return res.status(404).send({error: "Couldn't found that member"})
  
    var randomstring = Math.random().toString(36).slice(-8);

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(randomstring, salt)
  
    const user = {
        member_id: member.member_id,
        password: hashedPassword
    }
    
    const memberUpdated = await MemberController.updateMember(user)

    if(memberUpdated[0] == 0 || memberUpdated.name){
        return res.status(404).send({
            error: "Couldn't update the member"
        })
    }
    if(mailer.sendEmail(member.email, "Recover password", "Here's your new Password, make sure you change it when log in again. Password: " + randomstring)){
        return res.status(201).send()
    }else{
        return res.status(404).send({
            error: "Couldn't send the email"
        })
    }
  })


module.exports = router;