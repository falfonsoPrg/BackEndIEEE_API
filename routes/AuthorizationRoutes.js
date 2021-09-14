const router = require('express').Router()
const MemberController = require('../controllers/MemberController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const nodemailer = require('nodemailer');


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
    if(member == null) return res.status(401).send({error: "Couldn't found that member"})
  
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD  
        }
    });
  
  
    let mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email, 
        subject: 'New Password',
        text: 'This will be your new password IEEE'
    };  
  
     transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(402).send(err+data)
        }
        return res.status(200).send("work");
    });

  })


module.exports = router;