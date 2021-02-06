"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacienteController_1 = require("../controllers/pacienteController");
class PacienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pacienteController_1.pacienteController.listarPacientes);
        this.router.get('/:cedula', pacienteController_1.pacienteController.obtenerPaciente);
        this.router.post('/crear', pacienteController_1.pacienteController.crearPaciente);
        this.router.put('/inactivar/:cedula', pacienteController_1.pacienteController.inactivarPaciente);
        this.router.put('/actualizar/:cedula', pacienteController_1.pacienteController.actualizarPaciente);
    }
}
const pacienteRoutes = new PacienteRoutes();
exports.default = pacienteRoutes.router;
