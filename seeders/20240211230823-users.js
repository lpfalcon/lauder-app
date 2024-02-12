'use strict';
const {ROLE_TYPES_OBJECT } = require('../utils/staticObjects');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', 
    [{
      id: crypto.randomUUID(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: ROLE_TYPES_OBJECT.DRIVER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      role: ROLE_TYPES_OBJECT.DRIVER,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: crypto.randomUUID(),
      firstName: 'Kelly',
      lastName: "O'Connel",
      email: 'kelly@example.com',
      role: ROLE_TYPES_OBJECT.RIDER,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
