'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Todos', [
      {
        title: 'todo 1',
        description: 'learn sequelize init',
        status: 'completed',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'todo 2',
        description: 'learn sequelize generate model and seeding',
        status: 'active',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
