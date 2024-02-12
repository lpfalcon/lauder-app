const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const { configProcess } = require('./config/dotenvConfig.js')
const db = require('./models/index.js');
const app = express();
const PORT = configProcess('PORT') || 3000
const routes = require('./routes') 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10000mb' }))
app.use(bodyParser.json())

app.use('/api', routes)

db.sequelize.sync({
    alter: false,
    force: false
}).then(() => console.log('success SYNC SQL'))
    .catch((err) => console.log('error en SYNC BD SQL', err))

db.sequelize.authenticate().then(() => console.log('Conexion exitosa'))
    .catch((err) => console.log('Falló la conexión SQL DB', err, PORT))


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
