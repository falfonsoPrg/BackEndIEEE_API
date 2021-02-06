import {Request, Response} from 'express';
import db from '../database';

class AssociateController
{

    public List(req: Request, res: Response)
    {
        res.json({text: 'Listar pacientes'});
    }

    public async GetOne(req: Request, res: Response)
    {
        const {id} = req.params;
        const associate = await db.query("SELECT id_associate AS id, name_associate AS name,name_role AS role, name_chapter as chapter"+ 
        "FROM associate AS A, role AS R, chapter AS C"+
        "WHERE A.id_role=R.id_role"+
        "AND A.id_chapter=C.id_chapter"+
        "AND A.id_associate=?", id);
        if(associate. length > 0){
            return res.json(associate[0]);
        }
        return res.status(404).json({text: 'No existe el asociado'});
    }

    public async Create(req: Request, res: Response)
    {
        const name_associate = parseInt(req.body.name_associate);
        const id_role = parseInt(req.body.id_role);
        const id_chapter = parseInt(req.body.id_chapter);

        await db.query("INSERT INTO associate VALUES (0,'"+name_associate+"',"
        +id_role+","+id_chapter+");");

        await db.query("INSERT INTO the_user VALUES (0");

        res.json({text: 'Paciente creado'});
    }

    public Inactivate(req: Request, res: Response)
    {
        res.json({text: 'Paciente con cedula '+ req.params.cedula +" inactivado"});
    }

    public Update(req: Request, res: Response)
    {
        res.json({text: 'Paciente con cedula '+ req.params.cedula + " actualizado"});
    }
}

export const associateController = new AssociateController();