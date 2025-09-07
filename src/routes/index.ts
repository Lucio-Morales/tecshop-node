import { Router } from 'express';
import authRouter from './auth';
import { authenticate } from '../middlewares/authenticatie';
import { authorize } from '../middlewares/authorization';

const mainRouter = Router();

mainRouter
  .use('/auth', authRouter)
  .use('/admin', authenticate, authorize(['admin']))
  .use('/customer', authenticate, authorize(['customer']));

export default mainRouter;
