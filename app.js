const { configProcess } = require('./config/dotenvConfig.js')
const db = require('./models/index.js');

const PORT = configProcess('PORT') || 3000
const app = require('./routes') 

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
