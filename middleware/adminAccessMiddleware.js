import response from '../utils/apiResponse';
import tokenHelp from '../utils/jwtToken';

/**
 * @class AdminAccessMiddleware
 * @description class contains function for implementing Authentication middleware
 */
class AdminAccessMiddleware {
  /**
   * @static
   * @description a middleware function checking if a user is authenticated
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if user is not authenticated
   */
  static async authoriseUser(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return response(res, 401, 'failure', 'You are not logged in.');
      const token = authorization.split(' ')[1];
      const verifyToken = tokenHelp.verify(token);
      if (verifyToken) {
        req.user = verifyToken;
        return next();
      }
    } catch (error) {
      const { name } = error;
      if (name === 'TokenExpiredError' || name === 'JsonWebTokenError') {
        return response(res, 401, 'failure', 'You need to log in again.');
      }
      return response(res, 500, 'failure', 'An error occured on the server', error.message);
    }
  }
}

export default AdminAccessMiddleware;
