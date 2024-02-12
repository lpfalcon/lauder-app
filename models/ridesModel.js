
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
        static associate(models) { }
    }
    Ride.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            initialLatitude: {
                type: DataTypes.DECIMAL(10, 2),
                validate: {
                    min: -90,
                    max: 90
                }
            },
            initialLongitude: {
                type: DataTypes.DECIMAL(10, 2),
                validate: {
                    min: -180,
                    max: 180
                }
            },
            finalLatitude: {
                type: DataTypes.DECIMAL(10, 2),
                validate: {
                    min: -90,
                    max: 90
                }
            },
            finalLongitude: {
                type: DataTypes.DECIMAL(10, 2),
                validate: {
                    min: -180,
                    max: 180
                }
            },
            fee: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 3000
            },
            kilometres: {
                type: DataTypes.DECIMAL(10, 2),
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
