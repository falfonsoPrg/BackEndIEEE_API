import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import associateRoutes from './routes/associateRoutes';
import sesionRoutes from './routes/sesionRoutes';
import picturesRoutes from './routes/PicturesRoutes';
import path from 'path';

import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
class Server
{
    public app : Application;
    constructor()
    {
        this.app = express();
        this.config();
        this.routes();
    }

    config() : void
    {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use('/images', express.static(path.resolve('images')));
    }
    routes() : void
    {
        this.app.use('/',indexRoutes);
        this.app.use('/api/Associate',associateRoutes);
        this.app.use('/api/Sesion',sesionRoutes);
        this.app.use('/api/Pictures',picturesRoutes);
        this.app.use('/api/User',userRoutes);
        this.app.use('/api/Event',eventRoutes)
    }

    start() : void
    {
        this.app.listen(this.app.get('port'));
        console.log('Server on port ', this.app.get('port'))
    }
}


const server =new Server();
server.start();