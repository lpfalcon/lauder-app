const { Sequelize } = require('sequelize');
const { configProcess } = require('./dotenvConfig.js')
const configObject = require('./config.js')
const enviroment = configProcess("NODE_ENV") || 'development'
const sequelize = new Sequelize(configObject[enviroment]?.database,
    configObject[enviroment]?.username,
    configObject[enviroment]?.password, {
    host: configObject[enviroment]?.host,
    dialect: configObject[enviroment]?.dialect
});


module.exports = {
    sequelize
}