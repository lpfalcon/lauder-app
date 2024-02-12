const db = require('../models/index');
const { Op } = require('@sequelize/core');
const geolib = require('geolib');
const handleResponse = require('../helpers/handleResponse');
const { RIDE_STATUS } = require('../utils/staticObjects');

let ridesController = {}

ridesController.create = async (req, res) => {
    try {
        const {
            currentLatitude: initialLatitude,
            currentLongitude: initialLongitude,
            finalLatitude, finalLongitude
        } = req?.body || {};

        const user = req?.user || {}

        const findActiveRider = await db.Ride.findOne({ where: { status: RIDE_STATUS.PROCESS } })
        if (!findActiveRider) {
            const findDriver = await db.User.findOne({ order: db.sequelize.random() })
            if (findDriver) {
                const kilometres = geolib.getDistance({
                    latitude: initialLatitude,
                    longitude: initialLongitude,
                }, {
                    latitude: finalLatitude,
                    longitude: finalLongitude
                })
                console.log(kilometres)

                const createRide = await db.Ride.create({
                    id: crypto.randomUUID(),
                    driverId: findDriver.id,
                    riderId: user.id,
                    status: RIDE_STATUS.PROCESS,
                    initialLatitude,
                    initialLongitude,
                    finalLatitude,
                    finalLongitude,
                    kilometres
                })
                handleResponse.resultResponse({
                    status: 200,
                    type: 'save',
                    data: {
                        rider: `${user.firstName}  ${user.lastName}`,
                        driver: `${findDriver.firstName}  ${findDriver.lastName}`, rideCode: createRide.id,
                    },
                    res
                })
            } else {
                handleResponse.resultResponse({
                    type: 'custom',
                    status: 202,
                    data: {
                        message:
                            'No hemos podido encontar a un conductor en este momento',
                        type: 'Not Found'
                    },
                    res
                })
            }
        } else {
            handleResponse.resultResponse({
                type: 'custom',
                status: 202,
                data: {
                    message:
                        'Tienes un viaje en proceso, no puedes crear otro',
                    type: 'Viaje en proceso'
                },
                res
            })
        }

    } catch (error) {
        console.log(error, 'aca')
    }

}

module.exports = ridesController