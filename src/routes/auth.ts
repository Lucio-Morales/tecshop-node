import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controllers';

const authRouter = Router();

authRouter.post('/register', registerUser).post('/login', loginUser);

export default authRouter;
