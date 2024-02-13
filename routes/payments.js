const express = require('express')
const router = express.Router()
const paymentsController = require('../controllers/paymentsController')
const middleware = require('../middleware/authMiddleware')

router.post('/create', middleware.verifyToken, paymentsController.create)
module.exports = router
