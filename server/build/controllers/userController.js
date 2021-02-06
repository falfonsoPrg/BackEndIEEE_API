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
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
class UserController {
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield database_1.default.query("SELECT * FROM the_user, chapter WHERE the_user.id_chapter=chapter.id_chapter");
            if (results.length === 0) {
                return res.status(404).send({ text: "No hay usuarios en el sistema" });
            }
            res.send(results);
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_user = req.params.id_user;
            const results = yield database_1.default.query("SELECT * FROM the_user, chapter WHERE the_user.id_chapter=chapter.id_chapter AND the_user.id_user=" + id_user);
            if (results.length === 0) {
                return res.status(404).send({ text: "No hay ningun usuario en el sistema con id " + id_user });
            }
            res.send(results);
        });
    }
    GetForChapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_chapter = req.params.id_chapter;
            const chapter = yield database_1.default.query("SELECT * FROM  chapter WHERE chapter.id_chapter=" + id_chapter);
            if (chapter.length === 0) {
                return res.status(404).send({ text: "No hay ningun capitulo en el sistema con id " + id_chapter });
            }
            const results = yield database_1.default.query("SELECT * FROM the_user, chapter WHERE the_user.id_chapter=chapter.id_chapter AND chapter.id_chapter=" + id_chapter);
            if (results.length === 0) {
                return res.status(404).send({ text: "No hay ningun usuario registrado en el capitulo con id " + id_chapter });
            }
            res.send(results);
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.default.query("SELECT * FROM the_user, chapter WHERE the_user.id_user=" + req.body.id_user);
            if (user.length === 0)
                return res.status(404).send({ text: "No existe ningun usuario con el id enviado" });
            const chapter = yield database_1.default.query("SELECT * FROM chapter WHERE chapter.id_chapter=" + req.body.id_chapter);
            if (chapter.length === 0)
                return res.status(404).send({ text: "No existe ningun captiulo con el id enviado" });
            const results = yield database_1.default.query("UPDATE the_user SET name_user=?,u_password=?,id_chapter=? WHERE id_user=?", [
                req.body.name_user,
                req.body.u_password,
                req.body.id_chapter,
                req.body.id_user
            ]);
            const userResult = yield database_1.default.query("SELECT * FROM the_user, chapter WHERE the_user.id_user=" + req.body.id_user);
            res.send(userResult);
        });
    }
}
exports.userController = new UserController();
