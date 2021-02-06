import {Router} from 'express';

import {associateController} from '../controllers/associateController';

import verify from "../verifyToken";

class AssociateRoutes
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }

    config() : void
    {
        this.router.get('/' ,associateController.List);
        this.router.get('/:id', associateController.GetOne);
        this.router.post('/create', associateController.Create);
        this.router.put('/inactivate/:id', associateController.Inactivate);
        this.router.put('/update/:id', associateController.Update);
    }
}

const associateRoutes = new AssociateRoutes();
export default associateRoutes.router;