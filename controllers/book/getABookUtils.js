import { db } from '../../utils/controllerImports';

const { Book, Sequelize } = db;

const getABookUtils = async (req) => Book.findOne({
  where: { id: req.params.id },
});

export default getABookUtils;
