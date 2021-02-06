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
exports.sesionController = void 0;
const database_1 = __importDefault(require("../database"));
const jwt = require('jsonwebtoken');
class SesionController {
    IniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name_user = req.body.name_user;
            const u_password = req.body.u_password;
            const usuario = yield database_1.default.query("SELECT * FROM the_user, chapter WHERE chapter.id_chapter = the_user.id_chapter AND name_user='" + name_user + "' AND u_password='" + u_password + "'");
            if (usuario[0] == null) {
                return res.json({ error: 'Usuario o contraseña incorrecto' });
            }
            //Create and put a token
            const token = jwt.sign({ id_user: usuario[0].u_password }, "token", {
                expiresIn: '1h'
            });
            return res.header('auth-token', token).send({ text: token, user: usuario });
        });
    }
}
exports.sesionController = new SesionController();
