const express = require('express')
const app = express();
const router = express.Router()
const fs = require('fs')
const cors = require('cors');
const bodyParser = require('body-parser')
const pathRouter = `${__dirname}`


const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file)
    const skip = ['index'].includes(fileWithOutExt)
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
    }
})

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10000mb' }))
app.use(bodyParser.json())

app.use('/api', router)
module.exports = app