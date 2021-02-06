"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.picturesController = void 0;
const database_1 = __importDefault(require("../database"));
class PicturesController {
    UploadPicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, id_chapter, acknowledgement, id_associate, id_event } = req.body;
            const newPicture = {
                name_picture: req.file.originalname,
                description: description,
                id_chapter: id_chapter,
                acknowledgement: acknowledgement,
                id_associate: id_associate,
                id_event: id_event,
                location: req.file.path
            };
            yield database_1.default.query("INSERT INTO PICTURES VALUES (0,'" + newPicture.location +
                "','" + newPicture.name_picture + "','" + newPicture.description + "'," + newPicture.id_chapter
                + ",'" + newPicture.acknowledgement + "'," + newPicture.id_associate + "," + id_event + ");");
            return res.json({
                message: "Imagen Guardada",
                newPicture
            });
        });
    }
    BranchGalleryPictures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const galleryPictures = yield database_1.default.query("SELECT TOP 10 location FROM PICTURES");
            return res.json(galleryPictures);
        });
    }
    ChapterGalleryPictures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_chapter = req.params.id_chapter;
            console.log(id_chapter);
            const galleryPictures = yield database_1.default.query("SELECT name_picture, location, description FROM PICTURES WHERE id_chapter=?", id_chapter);
            if (galleryPictures.length > 0) {
                return res.json(galleryPictures);
            }
            return res.json({ mensaje: "No hay imágenes" });
        });
    }
}
exports.picturesController = new PicturesController();
