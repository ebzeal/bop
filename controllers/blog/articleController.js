import { db, response } from '../../utils/controllerImports';
import articleDetails from './articleDetails';
import ControllerUtils from '../../utils/controllerUtils';

const { Article, Sequelize } = db;

/**
 * @class ArticleController
 */
class ArticleController {
  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof ArticleController
   * @description Creates a new article record
   */
  static async createArticle(req, res) {
    try {
      const theArticleDetails = articleDetails(req.body, req.user);
      const isArticleExist = await Article.findOne({
        where: {
          slug: theArticleDetails.slug,
          userId: theArticleDetails.userId,
        },
      });
      if (isArticleExist) return response(res, 409, 'failure', 'You already have an article with this same title', null);
      const newArticle = await Article.create(theArticleDetails);

      return response(res, 201, 'success', 'New Article has been added to blog', null, newArticle);
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
   * @memberof ArticleController
   * @description Fetches all articles in the db
   */
  static async getArticles(req, res) {
    try {
      await ControllerUtils.getAll(req, res, Article);
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
   * @memberof ArticleController
   * @description Gets one article from the db
   */
  static async getArticle(req, res) {
    try {
      await ControllerUtils.getOne(req, res, Article, 'Article');
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
   * @memberof ArticleController
   * @description Updates one article from the db
   */
  static async updateArticle(req, res) {
    try {
      const getArticle = await ControllerUtils.getAnItem(req);
      if (!getArticle) return response(res, 404, 'failure', 'Article not found');

      const theArticleDetails = articleDetails(req.body, req.user);
      const modifyArticle = await getArticle.update(theArticleDetails);
      return response(res, 201, 'success', 'Article has been updated', null, modifyArticle);
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
   * @memberof ArticleController
   * @description Deletes one article from the db
   */
  static async deleteArticle(req, res) {
    try {
      await ControllerUtils.deleteOne(req, res, Article, 'Article');
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send(error);
    }
  }
}

export default ArticleController;
