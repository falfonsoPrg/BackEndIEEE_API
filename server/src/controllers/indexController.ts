import {Request, Response} from 'express';

class IndexController
{
    index(req: Request, res: Response)
    {
        res.json({text: 'This is the API for the IEEE Application'})
    }
}

export const indexController = new IndexController();