require('dotenv').config()
module.exports = {
    configProcess: (key) => {
      return process.env[key]
    }
  }
  