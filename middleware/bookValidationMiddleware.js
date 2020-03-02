import validateString from './validations/stringValidation';
import validateDate from './validations/dateValidation';

import response from '../utils/apiResponse';
import validateInteger from './validations/integerValidation';
import validateFloat from './validations/floatValidation';

/**
 * @class BookValidationMiddleware
 * @description class contains functions for validating book endpoints
 */
class BookValidationMiddleware {
  /**
   * @static
   * @description a middleware function checking if inputs fields are correct for adding books
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if user is not authenticated
   */
  static addBookValidation(req, res, next) {
    try {
      const {
        nameOfBook, author, datePublished, numOfPages, description, price
      } = req.body;
      const stringLength = 2;
      const descLength = 50;
      const isBookNameLength = validateString(nameOfBook, stringLength);
      const isAuthor = validateString(author, stringLength);
      const isDescription = validateString(description, descLength);
      const isDate = validateDate(datePublished);
      const isPagesNumbers = validateInteger(numOfPages);
      const isPrice = validateFloat(price);
      if (!isBookNameLength) return response(res, 406, 'failure', `Name of book must be at least ${stringLength} string character`, null);

      if (!isAuthor) return response(res, 406, 'failure', `Name of Author must be at least ${stringLength} string character`, null);

      if (!isPagesNumbers) return response(res, 406, 'failure', 'Price must be numbers', null);

      if (!isDate) return response(res, 406, 'failure', "Enter validate date pattern 'yyyy-mm-dd'", null);

      if (!isDescription) return response(res, 406, 'failure', `Description field must be at least ${descLength} string character`, null);

      if (!isPrice) return response(res, 406, 'failure', 'Enter valid price', null);
      next();
    } catch (err) {
      console.log('err', err);
    }
  }
}

export default BookValidationMiddleware;
