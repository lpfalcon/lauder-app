
'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ride extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            if (models.User) {
                this.belongsTo(models.User, {foreignKey:'driverId'});
                this.belongsTo(models.User, {foreignKey:'riderId'});
            }
        }
    }
    Ride.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            initialLatitude: {
                type: DataTypes.FLOAT,
                validate: {
                    min: -90,
                    max: 90
                }
            },
            initialLongitude: {
                type: DataTypes.FLOAT,
                validate: {
                    min: -180,
                    max: 180
                }
            },
            finalLatitude: {
                type: DataTypes.FLOAT,
                validate: {
                    min: -90,
                    max: 90
                }
            },
            finalLongitude: {
                type: DataTypes.FLOAT,
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
                type: DataTypes.FLOAT,
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
            }
        },
        {
            sequelize,
            modelName: "Ride",
            tableName: "Rides",
            timestamps: true
        }
    );
    return Ride;
};
