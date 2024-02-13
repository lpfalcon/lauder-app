
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
    // if(models.Ride) this.hasMany(models.Ride, {foreignKey: 'id', as:'Ride'})
     if(models.Payment) this.hasMany(models.Payment, {foreignKey: 'userId'})
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currentLatitude: {
        type: DataTypes.FLOAT,
        validate: {
          min: -90,
          max: 90
        }
      },
      currentLongitude: {
        type: DataTypes.FLOAT,
        validate: {
          min: -180,
          max: 180
        }
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true
    }
  );
  return User;
};
