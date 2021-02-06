"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const associateRoutes_1 = __importDefault(require("./routes/associateRoutes"));
const sesionRoutes_1 = __importDefault(require("./routes/sesionRoutes"));
const PicturesRoutes_1 = __importDefault(require("./routes/PicturesRoutes"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/images', express_1.default.static(path_1.default.resolve('images')));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/Associate', associateRoutes_1.default);
        this.app.use('/api/Sesion', sesionRoutes_1.default);
        this.app.use('/api/Pictures', PicturesRoutes_1.default);
        this.app.use('/api/User', userRoutes_1.default);
        this.app.use('/api/Event', eventRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'));
        console.log('Server on port ', this.app.get('port'));
    }
}
const server = new Server();
server.start();
