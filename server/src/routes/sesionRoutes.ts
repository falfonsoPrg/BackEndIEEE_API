import {Router} from 'express';

import {sesionController} from '../controllers/sesionController';

class SesionRoutes
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }

    config() : void
    {
        this.router.post('/inicioSesion',sesionController.IniciarSesion);
    }
}

const sesionRoutes = new SesionRoutes();
export default sesionRoutes.router;