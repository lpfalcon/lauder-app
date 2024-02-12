'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentLatitude: {
      type: DataTypes.FLOAT(10,2),
      validate: {
        min: -90,
        max: 90
      }
    },
    currentLongitude: {
      type: DataTypes.FLOAT(10,2),
      validate: {
        min: -180,
        max: 180
      }
    },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};