import { db, response } from '../../utils/controllerImports';
import bookDetails from './bookDetails';
import getABookUtils from './getABookUtils';

const { Book, Sequelize } = db;

/**
 * @class BookController
 */
class BookController {
  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof BookController
   * @description Creates a new book record
   */
  static async addBook(req, res) {
    try {
      const { nameOfBook, author } = req.body;

      const theBookDetails = bookDetails(req.body);
      const isBookExist = await Book.findOne({
        where: {
          book: nameOfBook,
          author,
        },
      });
      if (isBookExist) return response(res, 409, 'failure', 'This book already exist', null);
      const newBook = await Book.create(theBookDetails);

      return response(res, 201, 'success', 'New Book has been added to shop', null, newBook);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof BookController
   * @description Fetches all books in the db
   */
  static async getBooks(req, res) {
    try {
      const getAllBooks = await Book.findAll();
      return response(res, 201, 'success', '', null, getAllBooks);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof BookController
   * @description Gets one book from the db
   */
  static async getBook(req, res) {
    try {
      const getBook = await getABookUtils(req);
      if (!getBook) return response(res, 404, 'failure', 'Book not found');
      return response(res, 201, 'success', '', null, getBook);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof BookController
   * @description Updates one book from the db
   */
  static async updateBook(req, res) {
    try {
      const getBook = await getABookUtils(req);
      if (!getBook) return response(res, 404, 'failure', 'Book not found');

      const theBookDetails = bookDetails(req.body);
      const modifyBook = await getBook.update(theBookDetails);
      return response(res, 201, 'success', 'Book has been updated', null, modifyBook);
    } catch (error) {
      /* istanbul ignore next */
      return response(res, 500, 'failure', 'Internal Server Error, please contact admin');
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof BookController
   * @description Deletes one book from the db
   */
  static async deleteBook(req, res) {
    try {
      const getBook = await getABookUtils(req);
      if (!getBook) return response(res, 404, 'failure', 'Book not found');
      await getBook.destroy();
      return response(res, 200, 'success', 'Book was deleted successfully', null, null);
    } catch (error) {
      /* istanbul ignore next */
      return response(res, 500, 'failure', 'Internal Server Error, please contact admin');
    }
  }
}

export default BookController;
