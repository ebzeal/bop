import {
  db, response, tokenHelp, passwordHelp
} from '../utils/controllerImports';

const { User, Sequelize } = db;
/**
 * @class AuthController
 */
class AuthController {
  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof AuthController
   * @description logs users in
   */
  static async logIn(req, res) {
    try {
      const email = req.body.email.trim().toLowerCase();

      const isUserFound = await User.findOne({
        where: { email },
      });
      console.log('TCL: AuthController -> logIn -> isUserFound', isUserFound);

      if (!isUserFound) {
        return response(res, 404, 'failure', 'Your login information is not correct');
      }
      const isValidPassword = passwordHelp.verifyPassword(req.body.password, isUserFound.password);

      if (!isValidPassword) {
        return response(res, 401, 'failure', 'Your login information is not correct');
      }

      const payload = {
        userId: isUserFound.id,
        firstName: isUserFound.firstName,
        lastName: isUserFound.lastName,
        email: isUserFound.email,
        access: isUserFound.access,
      };

      const token = tokenHelp.sign(payload);
      return response(res, 202, 'success', 'You have successfully logged in', '', token);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }
}

export default AuthController;
