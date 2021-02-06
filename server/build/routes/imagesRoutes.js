"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagesController_1 = require("../controllers/imagesController");
const multer_1 = __importDefault(require("../libs/multer"));
class ImagesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.route('/upload')
            .post(multer_1.default.single('image'), imagesController_1.imagesController.UploadImage);
        this.router.get('/gallery', imagesController_1.imagesController.GalleryImages);
    }
}
const imagesRoutes = new ImagesRoutes();
exports.default = imagesRoutes.router;
