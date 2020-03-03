import { db } from '../../utils/controllerImports';
import validateUuid from '../../middleware/validations/uuidValidation';

const { Book, Sequelize } = db;

const getABookUtils = async (req) => {
  const { id } = req.params;
  const uuidCheck = validateUuid(id);
  if (!uuidCheck) return false;
  return Book.findOne({
    where: { id },
  });
};

export default getABookUtils;