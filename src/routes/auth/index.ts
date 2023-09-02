import { Router } from 'express';
import authContoller from '../../controller/auth';

const authRouter: Router = Router();

authRouter.post('/signup', authContoller.userSignup);

export { authRouter };