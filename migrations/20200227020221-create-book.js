export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    book: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    pages: {
      type: Sequelize.INTEGER,
    },
    datePublished: {
      type: Sequelize.DATEONLY,
    },
    genre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    price: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Books'),
};
