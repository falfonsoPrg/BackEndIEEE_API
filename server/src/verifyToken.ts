import {Request, Response, NextFunction} from 'express';

const jwt = require('jsonwebtoken')

class VerifyToken
{
    verify(req: Request,res:Response,next:NextFunction){
        const token = req.header('auth-token')
        if(!token) return res.status(401).send('Access denied')
        try {
            const verified = jwt.verify(token,"token")
            req.body.user = verified
            next()
        } catch (error) {
            res.status(400).send('Invalid token')
        }
    }
}

export  const verifyToken = new VerifyToken();
