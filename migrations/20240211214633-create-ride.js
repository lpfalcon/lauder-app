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
        type: DataTypes.FLOAT
        ,
        validate: {
          min: -90,
          max: 90
        }
      },
      initialLongitude: {
        type: DataTypes.FLOAT
        ,
        validate: {
          min: -180,
          max: 180
        }
      },
      finalLatitude: {
        type: DataTypes.FLOAT
        ,
        validate: {
          min: -90,
          max: 90
        }
      },
      finalLongitude: {
        type: DataTypes.FLOAT
        ,
        validate: {
          min: -180,
          max: 180
        }
      },
      baseFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 3500
      },
      timeFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 200
      },
      kmFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1000
      },
      kilometres: {
        type: DataTypes.FLOAT
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
