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
      password: '123456789',
      role: ROLE_TYPES_OBJECT.DRIVER,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentLatitude: 6.15153,
      currentLongitude: -75.61657
    },
    {
      id: crypto.randomUUID(),
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: '123456789',
      role: ROLE_TYPES_OBJECT.DRIVER,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentLatitude: 6.18461,
      currentLongitude: -75.59913
    },
    {
      id: crypto.randomUUID(),
      firstName: 'Kelly',
      lastName: "O'Connel",
      email: 'kelly@example.com',
      password: '123456789',
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
