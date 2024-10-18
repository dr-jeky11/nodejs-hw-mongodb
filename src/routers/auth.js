import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper);
authRouter.post('/login');
authRouter.post('/logout');
authRouter.post('/refresh-session');

export default authRouter;
