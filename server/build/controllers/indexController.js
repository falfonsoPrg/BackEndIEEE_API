"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'This is the API for the IEEE Application' });
    }
}
exports.indexController = new IndexController();
