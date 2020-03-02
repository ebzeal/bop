import { Router } from 'express';
import AuthController from '../../controllers/authController';

import loginValidationMiddleware from '../../middleware/loginValidationMiddleware';

const authRoutes = Router();

const { logIn } = AuthController;

authRoutes.post('/auth/login', loginValidationMiddleware, logIn);

export default authRoutes;
