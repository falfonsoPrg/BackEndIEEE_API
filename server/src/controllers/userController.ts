import {Request, Response, json} from 'express';
import db from '../database';

class UserController
{
    public async GetAll(req: Request, res: Response)
    {
        const results = await db.query("SELECT * FROM the_user, chapter WHERE the_user.id_chapter=chapter.id_chapter");
        if(results.length === 0){
            return res.status(404).send({text:"No hay usuarios en el sistema"})
        } 
        res.send(results)
    }
    public async Get(req: Request, res: Response)
    {
        const id_user = req.params.id_user
        const results = await db.query("SELECT * FROM the_user, chapter WHERE the_user.id_chapter=chapter.id_chapter AND the_user.id_user="+id_user);
        if(results.length === 0){
            return res.status(404).send({text:"No hay ningun usuario en el sistema con id "+ id_user})
        } 
        res.send(results)
    }

    public async GetForChapter(req: Request, res: Response)
    {
        const id_chapter = req.params.id_chapter

        const chapter = await db.query("SELECT * FROM  chapter WHERE chapter.id_chapter="+id_chapter);
        if(chapter.length === 0){
            return res.status(404).send({text:"No hay ningun capitulo en el sistema con id "+ id_chapter})
        } 

        const results = await db.query("SELECT * FROM the_user, chapter WHERE the_user.id_chapter=chapter.id_chapter AND chapter.id_chapter="+id_chapter);
        if(results.length === 0){
            return res.status(404).send({text:"No hay ningun usuario registrado en el capitulo con id "+ id_chapter})
        } 
        res.send(results)
    }

    public async Update(req: Request, res: Response)
    {
        const user = await db.query("SELECT * FROM the_user, chapter WHERE the_user.id_user="+req.body.id_user);
        if(user.length === 0) return res.status(404).send({text: "No existe ningun usuario con el id enviado"})
        
        const chapter = await db.query("SELECT * FROM chapter WHERE chapter.id_chapter="+req.body.id_chapter);
        if(chapter.length === 0) return res.status(404).send({text: "No existe ningun captiulo con el id enviado"})

        const results = await db.query("UPDATE the_user SET name_user=?,u_password=?,id_chapter=? WHERE id_user=?",[
            req.body.name_user,
            req.body.u_password,
            req.body.id_chapter,
            req.body.id_user
        ]);
        const userResult = await db.query("SELECT * FROM the_user, chapter WHERE the_user.id_user="+req.body.id_user);
        res.send(userResult)
    }
}
export const userController = new UserController();