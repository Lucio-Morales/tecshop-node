import { Router } from 'express';
import { signInUser, signUpNewUser } from '../controllers/auth.controllers';

const authRouter = Router();

authRouter.post('/signup', signUpNewUser).post('/signin', signInUser);

export default authRouter;
