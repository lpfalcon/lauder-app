'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Payments', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Credit Card'
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Visa'
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    },);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');

  }
};
