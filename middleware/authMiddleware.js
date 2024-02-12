const db = require('../models/index');
const { configProcess } = require('../config/dotenvConfig.js')

const verifyToken = async (req, res, next) => {
    try {
        const { headers } = req || {}
        const token = headers?.authorization && headers.authorization.split(' ')[1] // AUthorization
        if (token === configProcess("USER_TOKEN")) {
            const findUser = await db.User.findOne({ where: { email: configProcess("USER_EMAIL") } })
            if (!findUser) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario Incorrecto'
                    }
                })
            } else {
                req.user = findUser
                next()
            }
        } else {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            err
        })
    }

}

module.exports = {
    verifyToken
}
