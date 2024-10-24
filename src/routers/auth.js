import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  authUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';
import {
  createLoginSchema,
  createUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(authUserController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

authRouter.post(
  '/login',
  validateBody(createLoginSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;
