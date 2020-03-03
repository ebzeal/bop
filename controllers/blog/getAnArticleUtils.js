import { db } from '../../utils/controllerImports';
import validateUuid from '../../middleware/validations/uuidValidation';

const { Article, Sequelize } = db;

const getAnArticleUtils = async (req) => {
  const { id } = req.params;
  const uuidCheck = validateUuid(id);
  if (!uuidCheck) return false;
  return Article.findOne({
    where: { id },
  });
};

export default getAnArticleUtils;
