import { Router } from 'express';
import authRoutes from './apiRoutes/authApi';

const route = Router();

route.get('/', (req, res) => {
  res.status(200).json('Welcome to Ben Oketola Publications');
});

route.use(authRoutes);

export default route;
