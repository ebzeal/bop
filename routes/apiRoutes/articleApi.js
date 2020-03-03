import { Router } from 'express';
import ArticleController from '../../controllers/blog/articleController';

import ArticleValidationMiddleware from '../../middleware/articleValidationMiddleware';
import AdminAccessMiddleware from '../../middleware/adminAccessMiddleware';

const articleRoutes = Router();
const { createArticleValidation } = ArticleValidationMiddleware;
const { authoriseUser } = AdminAccessMiddleware;

const {
  createArticle, getArticles, getArticle, updateArticle, deleteArticle
} = ArticleController;

articleRoutes.post('/article', authoriseUser, createArticleValidation, createArticle);
articleRoutes.get('/', getArticles);
articleRoutes.get('/article/:id', getArticle);
articleRoutes.put('/article/:id', authoriseUser, createArticleValidation, updateArticle);
articleRoutes.delete('/article/:id', authoriseUser, deleteArticle);

export default articleRoutes;
