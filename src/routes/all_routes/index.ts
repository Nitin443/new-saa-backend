import { Request, Response, Router } from 'express';

export default function () {

  let router = Router();
  router.get('/', (req: Request, res: Response) => {
    res.send('Basic setup for backend is complete');
  });


  return router;

}