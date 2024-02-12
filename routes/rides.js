const express = require('express')
const router = express.Router()
const ridesController = require('../controllers/ridesController')
const middleware = require('../middleware/authMiddleware')

router.post('/create', middleware.verifyToken, ridesController.create)
module.exports = router
