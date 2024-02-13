
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
    static associate(models) {
      if (models.User) {
        this.belongsTo(models.User, {foreignKey:'userId'});
      }
    }
  }
  Payment.init(
    {
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
      cvc: {
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
      paymentSource: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      cardHolder: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "Payments",
      timestamps: true
    }
  );
  return Payment;
};
