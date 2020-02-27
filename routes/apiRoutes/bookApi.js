import { Router } from 'express';
import BookController from '../../controllers/bookController';

import bookValidationMiddleware from '../../middleware/addBookValidationMiddleware';

const bookRoutes = Router();

const { addBook } = BookController;

bookRoutes.post('/book', bookValidationMiddleware, addBook);

export default bookRoutes;
