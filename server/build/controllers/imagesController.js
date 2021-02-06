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
exports.imagesController = void 0;
const database_1 = __importDefault(require("../database"));
class ImagesController {
    UploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, id_chapter, acknowledgement, id_associate, id_event } = req.body;
            const newImage = {
                name_picture: req.file.originalname,
                description: description,
                id_chapter: id_chapter,
                acknowledgement: acknowledgement,
                id_associate: id_associate,
                id_event: id_event,
                location: req.file.path
            };
            yield database_1.default.query("INSERT INTO PICTURES VALUES (0,'" + newImage.location +
                "','" + newImage.name_picture + "','" + newImage.description + "'," + newImage.id_chapter
                + ",'" + newImage.acknowledgement + "'," + newImage.id_associate + "," + id_event + ");");
            return res.json({
                message: "Imagen Guardada",
                newImage
            });
        });
    }
    GalleryImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const associate = yield database_1.default.query("SELECT * FROM PICTURES");
            if (associate.length > 0) {
                return res.json(associate[0]);
            }
            return res.status(404).json({ text: 'No existe el asociado' });
        });
    }
}
exports.imagesController = new ImagesController();
