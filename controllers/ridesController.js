const axios = require('axios')
const db = require('../models/index');
const geolib = require('geolib');
const handleResponse = require('../helpers/handleResponse');
const { RIDE_STATUS, ROLE_TYPES_OBJECT } = require('../utils/staticObjects');
const { configProcess } = require('../config/dotenvConfig.js');
const paymentUrlBase = configProcess("PAYMENT_SERVICE")
const paymentApiKey = configProcess("PAYMENT_API_KEY")
const { differenceInMinutes } = require('date-fns')


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
            const findDriver = await db.User.findOne({ where: { role: ROLE_TYPES_OBJECT.DRIVER }, order: db.sequelize.random() })
            if (findDriver) {
                const kilometres = geolib.getDistance({
                    latitude: initialLatitude,
                    longitude: initialLongitude,
                }, {
                    latitude: finalLatitude,
                    longitude: finalLongitude
                }) / 1000
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
                    status: 201,
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

    } catch (err) {
        handleResponse.resultResponse({
            status: 500,
            type: 'error',
            data: { message: err },
            res
        })
    }

}


ridesController.finishRide = async (req, res) => {
    try {
        const { id } = req.params || {}
        const { finalLatitude, finalLongitude } = req.body || {}
        const findRide = await db.Ride.findOne({
            where: {
                id, finalLatitude, finalLongitude,
                status: RIDE_STATUS.PROCESS
            }, include: { model: db.User, include: { model: db.Payment } }
        })
        if (findRide) {
            const { User } = findRide || {}
            const [paymentMethod] = User?.Payments || []
            if (paymentMethod) {
                const now = new Date()
                let totalKmAmout = findRide.kmFee * findRide.kilometres
                let minutes = differenceInMinutes(now, findRide.createdAt)
                let totalMnAmout = findRide.timeFee * minutes
                let amount = totalMnAmout + totalKmAmout + findRide.baseFee
                const travelPayment = await axios({
                    method: 'POST',
                    url: `${paymentUrlBase}/transactions`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${paymentApiKey}`
                    },
                    data: {
                        "amount_in_cents": amount,
                        "currency": "COP",
                        "signature": configProcess("SIGNATURE_TOKEN"),
                        "customer_email": User.email, // Email del usuario
                        "payment_method": {
                            "installments": 1 // Número de cuotas si la fuente de pago representa una tarjeta de lo contrario el campo payment_method puede ser ignorado.
                        },
                        "reference": "sJK4489dDjkd390ds02", // Referencia única de pago
                        "payment_source_id": paymentMethod.paymentSource
                    }
                })
                if (travelPayment?.data) {
                    await db.Ride.update({ status: RIDE_STATUS.COMPLETED }, {
                        where: {
                            id,
                        },
                    });

                    handleResponse.resultResponse({
                        type: 'custom',
                        status: 200,
                        data: {
                            message:
                                'Page realizado con exito',
                            type: 'Payment'
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
                            'El usuario no tiene registrado los metodos de pago',
                        type: 'Payment Methods'
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
                        'No puede terminar un viaje si la localizacion actual no coincide con la localizacion final que indico el usuario, o el viaje ya ha sido culminado',
                    type: 'Finish'
                },
                res
            })
        }

    } catch (err) {
        handleResponse.resultResponse({
            status: 500,
            type: 'error',
            data: { message: err },
            res
        })
    }


}
module.exports = ridesController