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
exports.eventController = void 0;
const database_1 = __importDefault(require("../database"));
class EventController {
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield database_1.default.query("SELECT * FROM ieee_event,chapter chapter WHERE ieee_event.id_chapter=chapter.id_chapter");
            if (results.length === 0) {
                return res.status(404).send({ text: "No hay eventos registrados" });
            }
            res.send(results);
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_event = req.params.id_event;
            const results = yield database_1.default.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_chapter=chapter.id_chapter AND ieee_event.id_event=" + id_event);
            if (results.length === 0) {
                return res.status(404).send({ text: "No hay ningun evento en el sistema con id " + id_event });
            }
            res.send(results);
        });
    }
    GetEventForChapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_chapter = req.params.id_chapter;
            const results = yield database_1.default.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_chapter=chapter.id_chapter AND chapter.id_chapter=" + id_chapter);
            if (results.length === 0) {
                return res.status(404).send({ text: "No hay ningun evento en el capitulo registrado con id " + id_chapter });
            }
            res.send(results);
        });
    }
    Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield database_1.default.query("SELECT * FROM chapter WHERE chapter.id_chapter=" + req.body.id_chapter);
            if (chapter.length === 0)
                return res.status(404).send({ text: "No existe ningun captiulo con el id enviado" });
            const results = yield database_1.default.query('INSERT INTO ieee_event (name_event,description,event_date,id_chapter) VALUES (?,?,?,?)', [
                req.body.name_event,
                req.body.description,
                req.body.event_date,
                req.body.id_chapter
            ]);
            if (results.insertId) {
                const eventResult = yield database_1.default.query("SELECT * FROM ieee_event WHERE ieee_event.id_event=" + results.insertId);
                return res.send(eventResult);
            }
            else {
                return res.status(404).send({ text: "Un error ha ocurrido en el servidor" });
            }
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield database_1.default.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_event=" + req.body.id_event);
            if (event.length === 0)
                return res.status(404).send({ text: "No existe ningun evento con el id enviado" });
            const chapter = yield database_1.default.query("SELECT * FROM chapter WHERE chapter.id_chapter=" + req.body.id_chapter);
            if (chapter.length === 0)
                return res.status(404).send({ text: "No existe ningun captiulo con el id enviado" });
            const results = yield database_1.default.query("UPDATE ieee_event SET name_event=?,description=?,event_date=?,id_chapter=? WHERE id_event=?", [
                req.body.name_event,
                req.body.description,
                req.body.event_date,
                req.body.id_chapter,
                req.body.id_event
            ]);
            const eventResult = yield database_1.default.query("SELECT * FROM ieee_event, chapter WHERE ieee_event.id_event=" + req.body.id_event);
            res.send(eventResult);
        });
    }
}
exports.eventController = new EventController();
