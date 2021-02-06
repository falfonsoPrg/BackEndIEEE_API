import {Request, Response, json} from 'express';
import db from '../database';

class PicturesController
{
    public async UploadPicture(req: Request, res: Response) : Promise<Response>
    {
        const {description, id_chapter, acknowledgement,id_associate, id_event} = req.body;
        const newPicture = {
            name_picture: req.file.originalname,
            description: description,
            id_chapter: id_chapter,
            acknowledgement: acknowledgement,
            id_associate: id_associate,
            id_event: id_event,
            location: req.file.path
        }
        await db.query("INSERT INTO PICTURES VALUES (0,'"+newPicture.location+
        "','"+newPicture.name_picture+"','"+newPicture.description+"',"+newPicture.id_chapter
        +",'"+newPicture.acknowledgement+"',"+newPicture.id_associate+","+id_event+");");
        return res.json({
            message: "Imagen Guardada",
            newPicture
        });
    }

    public async BranchGalleryPictures(req: Request, res: Response): Promise<Response>
    {
        const galleryPictures = await db.query("SELECT TOP 10 location FROM PICTURES");
        return res.json(galleryPictures);
    }

    public async ChapterGalleryPictures(req: Request, res: Response): Promise<Response>
    {   
        const id_chapter = req.params.id_chapter
        console.log(id_chapter);
        const galleryPictures = await db.query("SELECT name_picture, location, description FROM PICTURES WHERE id_chapter=?",id_chapter);
        if(galleryPictures. length > 0){
            return res.json(galleryPictures);
        }
        return res.json({mensaje: "No hay imágenes"});
    }
}
export const picturesController = new PicturesController(); 