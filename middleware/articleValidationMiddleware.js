import validateString from './validations/stringValidation';

import response from '../utils/apiResponse';

/**
 * @class ArticleValidationMiddleware
 * @description class contains functions for validating Article endpoints
 */
class ArticleValidationMiddleware {
  /**
   * @static
   * @description a middleware function checking if inputs fields are correct for adding Articles
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if user is not authenticated
   */
  static createArticleValidation(req, res, next) {
    try {
      const { title, content } = req.body;
      const stringLength = 2;
      const contentLength = 50;
      const isTitleLength = validateString(title, stringLength);
      const isContentLength = validateString(content, contentLength);
      if (!isTitleLength) {
        return response(
          res,
          406,
          'failure',
          `Title of Article must be at least ${stringLength} string character`,
          null
        );
      }

      if (!isContentLength) return response(res, 406, 'failure', `Content field must be at least ${contentLength} string character`, null);

      next();
    } catch (err) {
      console.log('err', err);
    }
  }
}

export default ArticleValidationMiddleware;
