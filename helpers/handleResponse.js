module.exports = {
    resultResponse (resultObject) {
      const { type, data, res, status } = resultObject || {}
      const result = {
        save: {
          message: 'Este registro ha sido almacenado exitosamente',
          type: 'success',
          ...data && { data }
        },
        update: {
          message: 'Este registro ha sido modificado exitosamente',
          type: 'info'
        },
        error: {
          message: `Error: ${data && data.message}`,
          type: 'error'
        },
        custom: {
          message: data?.message,
          type:  data?.type
        },
        list: data
      }
  
      res.status(status).json(result[type])
    }
  }
  