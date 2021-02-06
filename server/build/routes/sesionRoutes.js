"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sesionController_1 = require("../controllers/sesionController");
class SesionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/inicioSesion', sesionController_1.sesionController.IniciarSesion);
    }
}
const sesionRoutes = new SesionRoutes();
exports.default = sesionRoutes.router;
