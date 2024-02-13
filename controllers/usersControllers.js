const db = require('../models/index');
const handleResponse = require('../helpers/handleResponse');

let usersController = {}

usersController.getAll = async (_req, res) => {
    try {
        const users = await db.User.findAll()
        handleResponse.resultResponse({
            status: 200,
            type: 'list',
            data: users,
            res
        })
    } catch (err) {
        handleResponse.resultResponse({
            status: 500,
            type: 'error',
            data: { message: err },
            res
        })
    }
}


module.exports = usersController