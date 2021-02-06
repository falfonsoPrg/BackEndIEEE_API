"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const associateController_1 = require("../controllers/associateController");
class AssociateRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', associateController_1.associateController.List);
        this.router.get('/:id', associateController_1.associateController.GetOne);
        this.router.post('/create', associateController_1.associateController.Create);
        this.router.put('/inactivate/:id', associateController_1.associateController.Inactivate);
        this.router.put('/update/:id', associateController_1.associateController.Update);
    }
}
const associateRoutes = new AssociateRoutes();
exports.default = associateRoutes.router;
