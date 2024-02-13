const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersControllers')

router.get('/', usersController.getAll)

module.exports = router
