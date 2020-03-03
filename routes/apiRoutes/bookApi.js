import { Router } from 'express';
import BookController from '../../controllers/book/bookController';

import BookValidationMiddleware from '../../middleware/bookValidationMiddleware';
import AdminAccessMiddleware from '../../middleware/adminAccessMiddleware';

const bookRoutes = Router();

const { authoriseUser } = AdminAccessMiddleware;
const { addBookValidation } = BookValidationMiddleware;
const {
  addBook, getBooks, getBook, updateBook, deleteBook
} = BookController;

bookRoutes.post('/book', authoriseUser, addBookValidation, addBook);
bookRoutes.get('/books', getBooks);
bookRoutes.get('/books', getBooks);
bookRoutes.get('/book/:id', getBook);
bookRoutes.put('/book/:id', authoriseUser, addBookValidation, updateBook);
bookRoutes.delete('/book/:id', authoriseUser, deleteBook);

export default bookRoutes;
