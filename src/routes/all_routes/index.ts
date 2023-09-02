import { Request, Response, Router } from 'express';
import { authRouter } from '../auth';

export default function () {

  let router = Router();
  router.get('/', (req: Request, res: Response) => {
    res.send('Basic setup for backend is complete');
  });

  router.use('/', authRouter);


  return router;

}