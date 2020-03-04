import { response } from './controllerImports';
import validateUuid from '../middleware/validations/uuidValidation';

/**
 * @class ControllerUtils
 */
class ControllerUtils {
  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @param {*} Model sequelize Model
   * @returns {object} Json response
   * @memberof ControllerUtils
   * @description Fetches all same items in the db
   */
  static async getAll(req, res, Model) {
    try {
      const getAll = await Model.findAll();
      return response(res, 201, 'success', '', null, getAll);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} Model param
   * @returns {object} Json response
   * @memberof ControllerUtils
   * @description Gets one Item from db
   */
  static async getAnItem(req, Model) {
    const { id } = req.params;
    const uuidCheck = validateUuid(id);
    if (!uuidCheck) return false;
    return Model.findOne({
      where: { id },
    });
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @param {*} Model sequelize Model
   * @param {*} item Model name
   * @returns {object} Json response
   * @memberof ControllerUtils
   * @description Gets one item from the db
   */
  static async getOne(req, res, Model, item) {
    try {
      const getOne = await this.getAnItem(req, Model);
      if (!getOne) return response(res, 404, 'failure', `${item} not found`);
      return response(res, 201, 'success', '', null, getOne);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @param {*} Model sequelize Model
   * @param {*} item Model name
   * @returns {object} Json response
   * @memberof ControllerUtils
   * @description Gets one item from the db
   */
  static async deleteOne(req, res, Model, item) {
    try {
      const getOne = await this.getAnItem(req, Model);
      if (!getOne) return response(res, 404, 'failure', `${item} not found`);
      await getOne.destroy();
      return response(res, 200, 'success', `${item} was deleted successfully`, null, null);
    } catch (error) {
      /* istanbul ignore next */
      return response(res, 500, 'failure', 'Internal Server Error, please contact admin');
    }
  }
}

export default ControllerUtils;
