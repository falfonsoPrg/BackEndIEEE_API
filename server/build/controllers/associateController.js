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
exports.associateController = void 0;
const database_1 = __importDefault(require("../database"));
class AssociateController {
    List(req, res) {
        res.json({ text: 'Listar pacientes' });
    }
    GetOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const associate = yield database_1.default.query("SELECT id_associate AS id, name_associate AS name,name_role AS role, name_chapter as chapter" +
                "FROM associate AS A, role AS R, chapter AS C" +
                "WHERE A.id_role=R.id_role" +
                "AND A.id_chapter=C.id_chapter" +
                "AND A.id_associate=?", id);
            if (associate.length > 0) {
                return res.json(associate[0]);
            }
            return res.status(404).json({ text: 'No existe el asociado' });
        });
    }
    Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name_associate = parseInt(req.body.name_associate);
            const id_role = parseInt(req.body.id_role);
            const id_chapter = parseInt(req.body.id_chapter);
            yield database_1.default.query("INSERT INTO associate VALUES (0,'" + name_associate + "',"
                + id_role + "," + id_chapter + ");");
            yield database_1.default.query("INSERT INTO the_user VALUES (0");
            res.json({ text: 'Paciente creado' });
        });
    }
    Inactivate(req, res) {
        res.json({ text: 'Paciente con cedula ' + req.params.cedula + " inactivado" });
    }
    Update(req, res) {
        res.json({ text: 'Paciente con cedula ' + req.params.cedula + " actualizado" });
    }
}
exports.associateController = new AssociateController();
