"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../verifyToken");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken_1.verifyToken.verify, userController_1.userController.GetAll);
        this.router.get('/:id_user', verifyToken_1.verifyToken.verify, userController_1.userController.Get);
        this.router.get('/chapter/:id_chapter', verifyToken_1.verifyToken.verify, userController_1.userController.GetForChapter);
        this.router.put('/edit', verifyToken_1.verifyToken.verify, userController_1.userController.Update);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
