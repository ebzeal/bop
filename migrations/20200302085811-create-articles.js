export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    title: {
      type: Sequelize.TEXT,
    },
    slug: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    tweets: {
      type: Sequelize.ARRAY(Sequelize.STRING(280)),
    },
    content: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Articles'),
};
