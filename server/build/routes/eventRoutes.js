"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const verifyToken_1 = require("../verifyToken");
class EventRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken_1.verifyToken.verify, eventController_1.eventController.GetAll);
        this.router.get('/:id_event', verifyToken_1.verifyToken.verify, eventController_1.eventController.Get);
        this.router.get('/chapter/:id_chapter', verifyToken_1.verifyToken.verify, eventController_1.eventController.GetEventForChapter);
        this.router.post('/create', verifyToken_1.verifyToken.verify, eventController_1.eventController.Create);
        this.router.put('/edit', verifyToken_1.verifyToken.verify, eventController_1.eventController.Update);
    }
}
const eventRoutes = new EventRoutes();
exports.default = eventRoutes.router;
