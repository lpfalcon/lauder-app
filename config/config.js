const { configProcess } = require('./dotenvConfig.js')
module.exports = {
    development: {
        username: configProcess("SQLSERVER_USER"),
        password: configProcess("SQLSERVER_PASS"),
        database: configProcess("SQLSERVER_DBNAME"),
        host: configProcess("SQLSERVER_IP"),
        dialect: configProcess("SQLDIALECT")
    },
    test: {
        username: configProcess("SQLTEST_USER"),
        database: configProcess("SQLTEST_DBNAME"),
        password: configProcess("SQLTEST_PASS"),
        host: configProcess("SQLTEST_IP"),
        dialect: configProcess("SQLDIALECT")
    },
    production: {
        username: configProcess("SQLPRODUCTION_USER"),
        password: configProcess("SQLPRODUCTION_PASS"),
        database: configProcess("SQLPRODUCTION_DBNAME"),
        host: configProcess("SQLPRODUCTION_IP"),
        dialect: configProcess("SQLDIALECT")
    }
};