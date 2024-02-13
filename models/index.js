const fs = require('fs')
const { DataTypes, Sequelize } = require('sequelize')
const { sequelize } = require('../config/dbConfig.js');
const db = {};
const pathRouter = `${__dirname}`
const removeExtension = (fileName) => fileName.split('.').shift()

fs.readdirSync(pathRouter).filter((file) => {

    const fileWithOutExtension = removeExtension(file)
    const skipFile = ['index'].includes(fileWithOutExtension)
    if (!skipFile) {
        const model = require(`./${fileWithOutExtension}`)(sequelize, DataTypes)
        db[model.name] = model
        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
    }

})
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db