import { Router } from 'express';
import authRoutes from './apiRoutes/authApi';
import bookRoutes from './apiRoutes/bookApi';
import articleRoutes from './apiRoutes/articleApi';

const route = Router();

route.get('/', (req, res) => {
  res.status(200).json('Welcome to Ben Oketola Publications');
});

route.use(authRoutes);
route.use(bookRoutes);
route.use('/blog', articleRoutes);

export default route;
