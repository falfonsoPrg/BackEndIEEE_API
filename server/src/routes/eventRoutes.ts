import {Router} from 'express';

import {eventController} from '../controllers/eventController';
import {verifyToken} from '../verifyToken'

class EventRoutes
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }

    config() : void
    {
        this.router.get('/',verifyToken.verify,eventController.GetAll);
        this.router.get('/:id_event',verifyToken.verify,eventController.Get);
        this.router.get('/chapter/:id_chapter',verifyToken.verify,eventController.GetEventForChapter);
        this.router.post('/create',verifyToken.verify, eventController.Create)
        this.router.put('/edit',verifyToken.verify,eventController.Update);
    }
}

const eventRoutes = new EventRoutes();
export default eventRoutes.router;