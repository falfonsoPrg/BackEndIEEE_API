const router = require('express').Router()
const MemberController = require('../controllers/MemberController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

module.exports = router;