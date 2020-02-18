export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Ben',
        lastName: 'Oketola',
        email: 'benoketola@yahoo.com',
        access: 'admin',
        password: '$2y$10$J/wIq6U0W/CrXDjg8OHIgOA5pOBLIfTHgHHCY1BqIrtxRGq1gyk0u',
      },
      {
        firstName: 'Olusola',
        lastName: 'Ajayi',
        email: 'ebzeal@yahoo.com',
        access: 'admin',
        password: '$2y$10$BPU2wGd5SsWzyJbcK0UvjerCBdixz8B5isdFXHbM7U69KS7kgJnn6',
      },
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
