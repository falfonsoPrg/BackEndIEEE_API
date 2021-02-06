"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PicturesController_1 = require("../controllers/PicturesController");
const multer_1 = __importDefault(require("../libs/multer"));
class PicturesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.route('/upload')
            .post(multer_1.default.single('picture'), PicturesController_1.picturesController.UploadPicture);
        this.router.get('/branchGallery', PicturesController_1.picturesController.BranchGalleryPictures);
        this.router.get('/chapterGallery/:id_chapter', PicturesController_1.picturesController.ChapterGalleryPictures);
    }
}
const picturesRoutes = new PicturesRoutes();
exports.default = picturesRoutes.router;
