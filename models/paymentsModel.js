
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
      class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
      }
      Payment.init(
        {
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
        },
        {
          sequelize,
          modelName: "Payment",
          modelName: "Payments",
          timestamps: true
        }
      );
      return Payment;
    };
    