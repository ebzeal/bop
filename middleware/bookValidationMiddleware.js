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
      const err = [];
      if (!isBookNameLength) err.push(`Name of book must be at least ${stringLength} string character`);
      if (!isAuthor) err.push(`Name of Author must be at least ${stringLength} string character`);
      if (!isDescription) err.push(`Description field must be at least ${descLength} string character`);
      if (!isDate) err.push("Enter validate date pattern 'yyyy-mm-dd'");
      if (!isPagesNumbers) err.push('Page Number must be integer');
      if (!isPrice) err.push('Enter Valid Price');
      return err.length > 0 ? response(res, 406, 'failure', err, null) : next();
    } catch (err) {
      console.log('err', err);
    }
  }
}

export default BookValidationMiddleware;
