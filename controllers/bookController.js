import { db, response } from '../utils/controllerImports';

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
      const {
        nameOfBook, author, numOfPages, datePublished, genre, description, price
      } = req.body;

      const bookDetails = {
        book: nameOfBook,
        author,
        pages: numOfPages,
        datePublished,
        genre,
        description,
        price,
      };

      const newBook = await Book.create(bookDetails);

      return response(res, 201, 'success', 'New Book has been added to shop', null, newBook);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }
}

export default BookController;
