const db = require('../models/index');
const axios = require('axios')
const handleResponse = require('../helpers/handleResponse');
const { PAYMENT_STATUS } = require('../utils/staticObjects')
const { configProcess } = require('../config/dotenvConfig.js');
const paymentUrlBase = configProcess("PAYMENT_SERVICE")
const paymentApiKey = configProcess("PAYMENT_API_KEY")
const acceptanceToken = configProcess("ACCEPTANCE_TOKEN")
let paymentsController = {}

paymentsController.create = async (req, res) => {
    try {
        const {
            exp_year,
            exp_month,
            cvc,
            card_holder,
        } = req?.body || {};

        const user = req?.user || {}

        //    createRide = await db.Payment.create({
        //     id: crypto.randomUUID(),
        //     number: 'TOKEN'+crypto.randomUUID(),
        //     brand: 'VISA',
        //     name:'VISA-1223',
        //     paymentSource:'frefer',
        //     userId: "107e9066-9e4f-4da7-b46f-869434ea0c59",
        //     expYear:exp_year,
        //     expMonth:exp_month,
        //     cvc,
        //     cardHolder: card_holder
        // })
        const createCreditCard = await axios({
            method: 'POST',
            url: `${paymentUrlBase}/tokens/cards`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${paymentApiKey}`
            },
            data: req.body
        })
        if (createCreditCard?.status === PAYMENT_STATUS.CREATED) {
            const { data } = createCreditCard
            const paymentSource = await axios({
                method: 'POST',
                url: `${paymentUrlBase}/payment_sources`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${paymentApiKey}`
                },
                data: {
                    customer_email: user.email,
                    type: 'CARD',
                    token: data.id,
                    acceptance_token: acceptanceToken
                }
            })

            if (paymentSource?.data.status === PAYMENT_STATUS.AVAILABLE) {
                await db.Payment.create({
                    id: crypto.randomUUID(),
                    number: data.id,
                    brand: data.brand,
                    name: data.name,
                    paymentSource: paymentSource?.data?.id,
                    userId: user.id,
                    expYear: exp_year,
                    expMonth: exp_month,
                    cvc,
                    cardHolder: card_holder
                })

                handleResponse.resultResponse({
                    status: 200,
                    type: 'save',
                    data: {
                        name: data.name,
                        exp_year,
                        exp_month,
                        cvc,
                        card_holder
                    },
                    res
                })
            } else {
                handleResponse.resultResponse({
                    type: 'custom',
                    status: 202,
                    data: {
                        message:
                            'No hemos podido crear la fuente de pagos, intente mas tarde',
                        type: 'Payment Source'
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
                        'No hemos podido crear la fuente de pagos, intente mas tarde',
                    type: 'Payment Source'
                },
                res
            })

        }

    } catch (err) {
        console.error(err)
        handleResponse.resultResponse({
            status: 500,
            type: 'error',
            data: { message: err },
            res
        })
    }

}

module.exports = paymentsController