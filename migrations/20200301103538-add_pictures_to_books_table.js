export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Books', 'pictures', {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: true,
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'access'),
};
