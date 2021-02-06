import {Request, Response, json} from 'express';
import db from '../database';

class EventController
{
    public async GetAll(req: Request, res: Response)
    {
        const results = await db.query("SELECT * FROM ieee_event,chapter chapter WHERE ieee_event.id_chapter=chapter.id_chapter");
        if(results.length === 0){
            return res.status(404).send({text:"No hay eventos registrados"})
        } 
        res.send(results)
    }
    public async Get(req: Request, res: Response)
    {
        const id_event = req.params.id_event
        const results = await db.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_chapter=chapter.id_chapter AND ieee_event.id_event="+id_event);
        if(results.length === 0){
            return res.status(404).send({text:"No hay ningun evento en el sistema con id "+ id_event})
        } 
        res.send(results)
    }

    public async GetEventForChapter(req: Request, res: Response)
    {
        const id_chapter = req.params.id_chapter
        const results = await db.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_chapter=chapter.id_chapter AND chapter.id_chapter="+id_chapter);
        if(results.length === 0){
            return res.status(404).send({text:"No hay ningun evento en el capitulo registrado con id "+ id_chapter})
        } 
        res.send(results)
    }

    public async Create(req: Request, res: Response){

        const chapter = await db.query("SELECT * FROM chapter WHERE chapter.id_chapter="+req.body.id_chapter);
        if(chapter.length === 0) return res.status(404).send({text: "No existe ningun captiulo con el id enviado"})

        const results = await db.query('INSERT INTO ieee_event (name_event,description,event_date,id_chapter) VALUES (?,?,?,?)',[
            req.body.name_event,
            req.body.description,
            req.body.event_date,
            req.body.id_chapter
        ])
        if(results.insertId){
            const eventResult = await db.query("SELECT * FROM ieee_event WHERE ieee_event.id_event="+results.insertId);
            return res.send(eventResult)
        }else{
            return res.status(404).send({text: "Un error ha ocurrido en el servidor"})
        }
        
    }

    public async Update(req: Request, res: Response)
    {
        const event = await db.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_event="+req.body.id_event);
        if(event.length === 0) return res.status(404).send({text: "No existe ningun evento con el id enviado"})
        
        const chapter = await db.query("SELECT * FROM chapter WHERE chapter.id_chapter="+req.body.id_chapter);
        if(chapter.length === 0) return res.status(404).send({text: "No existe ningun captiulo con el id enviado"})

        const results = await db.query("UPDATE ieee_event SET name_event=?,description=?,event_date=?,id_chapter=? WHERE id_event=?",[
            req.body.name_event,
            req.body.description,
            req.body.event_date,
            req.body.id_chapter,
            req.body.id_event
        ]);
        const eventResult = await db.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_event="+req.body.id_event);
        res.send(eventResult)
    }
}
export const eventController = new EventController();