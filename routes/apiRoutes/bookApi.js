import { Router } from 'express';
import BookController from '../../controllers/book/bookController';

import BookValidationMiddleware from '../../middleware/bookValidationMiddleware';
import AdminAccessMiddleware from '../../middleware/adminAccessMiddleware';

const bookRoutes = Router();

const {
  addBook, getBooks, getBook, updateBook, deleteBook
} = BookController;

bookRoutes.post('/book', AdminAccessMiddleware.authoriseUser, BookValidationMiddleware.addBookValidation, addBook);
bookRoutes.get('/books', getBooks);
bookRoutes.get('/books', getBooks);
bookRoutes.get('/book/:id', getBook);
bookRoutes.put(
  '/book/:id',
  AdminAccessMiddleware.authoriseUser,
  BookValidationMiddleware.addBookValidation,
  updateBook
);
bookRoutes.delete('/book/:id', AdminAccessMiddleware.authoriseUser, deleteBook);

export default bookRoutes;
