import {Router} from 'express';

import {picturesController} from '../controllers/PicturesController';
import multer from "../libs/multer"

class PicturesRoutes
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }

    config() : void
    {
        this.router.route('/upload')
        .post(multer.single('picture'), picturesController.UploadPicture);
        this.router.get('/branchGallery', picturesController.BranchGalleryPictures);
        this.router.get('/chapterGallery/:id_chapter', picturesController.ChapterGalleryPictures);
    }
}

const picturesRoutes = new PicturesRoutes();
export default picturesRoutes.router;