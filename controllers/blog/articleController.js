import { db, response } from '../../utils/controllerImports';
import articleDetails from './articleDetails';
import getAnArticleUtils from './getAnArticleUtils';

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
      const getAllArticles = await Article.findAll();
      return response(res, 201, 'success', '', null, getAllArticles);
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
      const getArticle = await getAnArticleUtils(req);
      if (!getArticle) return response(res, 404, 'failure', 'Article not found');
      return response(res, 201, 'success', '', null, getArticle);
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
      const getArticle = await getAnArticleUtils(req);
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
      const getArticle = await getAnArticleUtils(req);
      if (!getArticle) return response(res, 404, 'failure', 'Article not found');
      await getArticle.destroy();
      return response(res, 200, 'success', 'Article was deleted successfully', null, null);
    } catch (error) {
      /* istanbul ignore next */
      return response(res, 500, 'failure', 'Internal Server Error, please contact admin');
    }
  }
}

export default ArticleController;
