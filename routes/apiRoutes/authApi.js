import { Router } from 'express';
import AuthController from '../../controllers/authController';

import loginMiddleware from '../../middleware/loginMiddleware';

const authRoutes = Router();

const { logIn } = AuthController;

authRoutes.post('/auth/login', loginMiddleware, logIn);

export default authRoutes;
