import {Router} from 'express';

import {userController} from '../controllers/userController';
import {verifyToken} from '../verifyToken'

class UserRoutes
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }

    config() : void
    {
        this.router.get('/',verifyToken.verify,userController.GetAll);
        this.router.get('/:id_user',verifyToken.verify,userController.Get);
        this.router.get('/chapter/:id_chapter',verifyToken.verify,userController.GetForChapter);
        this.router.put('/edit',verifyToken.verify,userController.Update);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;