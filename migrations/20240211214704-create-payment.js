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
      number: {
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
        defaultValue: 'VISA'
      },
      expYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      cardHolder: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      cvc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentSource:{
        type: DataTypes.STRING,
        allowNull: false,
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
