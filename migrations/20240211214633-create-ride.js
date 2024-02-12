'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Rides', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      initialLatitude: {
        type: DataTypes.FLOAT(10,2)
        ,
        validate: {
          min: -90,
          max: 90
        }
      },
      initialLongitude: {
        type: DataTypes.FLOAT(10,2)
        ,
        validate: {
          min: -180,
          max: 180
        }
      },
      finalLatitude: {
        type: DataTypes.FLOAT(10,2)
        ,
        validate: {
          min: -90,
          max: 90
        }
      },
      finalLongitude: {
        type: DataTypes.FLOAT(10,2)
        ,
        validate: {
          min: -180,
          max: 180
        }
      },
      fee: {
        type: DataTypes.FLOAT(10,2)
        ,
        allowNull: false,
        defaultValue: 3000
      },
      kilometres: {
        type: DataTypes.FLOAT(10,2)
        ,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      riderId: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rides');

  }
};
