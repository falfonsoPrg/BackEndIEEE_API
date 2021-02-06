"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pacienteController = void 0;
const database_1 = __importDefault(require("../database"));
class PacienteController {
    listarPacientes(req, res) {
        res.json({ text: 'Listar pacientes' });
    }
    obtenerPaciente(req, res) {
        res.json({ text: 'Obtener paciente con cedula ' + req.params.cedula });
    }
    crearPaciente(req, res) {
        const cedula = parseInt(req.body.cedula);
        const cod_sexo = parseInt(req.body.cod_sexo);
        const num_hijos = parseInt(req.body.num_hijos);
        const estatura = parseInt(req.body.estatura);
        const cod_eps = parseInt(req.body.cod_eps);
        const cod_ciudad = parseInt(req.body.cod_ciudad);
        const puntaje_alim = parseInt(req.body.puntaje_alim);
        const puntaje_ejer = parseInt(req.body.puntaje_ejer);
        const cod_e_civil = parseInt(req.body.cod_e_civil);
        database_1.default.query("INSERT INTO paciente VALUES (" + cedula + ",'" + req.body.direccion + "','"
            + req.body.estrato + "','" + req.body.fecha_nacimiento + "','" + req.body.ocupacion
            + "'," + num_hijos + "," + estatura + ',' + cod_eps + ',' + cod_ciudad + ','
            + puntaje_alim + ',' + puntaje_ejer + ',' + cod_e_civil + ");");
        database_1.default.query("INSERT INTO usuario VALUES (" + cedula + ",'" + req.body.nombre + "','"
            + req.body.apellido + "','" + req.body.telefono + "','" + req.body.correo
            + "','" + req.body.clave + "',NOW(), NOW()," + cod_sexo + ',' + 1 + "," + 1 + ");");
        res.json({ text: 'Paciente creado' });
    }
    inactivarPaciente(req, res) {
        res.json({ text: 'Paciente con cedula ' + req.params.cedula + " inactivado" });
    }
    actualizarPaciente(req, res) {
        res.json({ text: 'Paciente con cedula ' + req.params.cedula + " actualizado" });
    }
}
exports.pacienteController = new PacienteController();
