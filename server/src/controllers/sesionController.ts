import {Request, Response, json} from 'express';
import db from '../database';
const jwt = require('jsonwebtoken')

class SesionController
{
    public async IniciarSesion(req: Request, res: Response)
    {
        const name_user = req.body.name_user;
        const u_password = req.body.u_password;
        const usuario = await db.query("SELECT * FROM the_user, chapter WHERE chapter.id_chapter = the_user.id_chapter AND name_user='"+name_user+"' AND u_password='"+u_password+"'");
        if(usuario[0] == null)
        {
           return res.json({error: 'Usuario o contraseña incorrecto'});
        }
        //Create and put a token
        const token = jwt.sign({id_user:usuario[0].u_password}, "token" ,{
            expiresIn: '1h'
        })
        return res.header('auth-token',token).send({text: token,user: usuario})
    }
}
export const sesionController = new SesionController(); 