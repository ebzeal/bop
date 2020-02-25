export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'access', {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user',
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'access'),
};
