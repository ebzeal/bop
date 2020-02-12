import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => {
  res.status(200).json('Welcome to Ben Oketola Publications');
});

export default route;
