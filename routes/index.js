import { Router } from 'express';
import authRoutes from './apiRoutes/authApi';
import bookRoutes from './apiRoutes/bookApi';

const route = Router();

route.get('/', (req, res) => {
  res.status(200).json('Welcome to Ben Oketola Publications');
});

route.use(authRoutes);
route.use(bookRoutes);

export default route;
