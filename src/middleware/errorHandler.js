const errorHandler = (error, _req, res, _next) => {
  const { name, message, details, status } = error
  switch (name) {
    case 'SequelizeDatabaseError':
    case 'SequelizeValidationError':
      return res.status(400).json({
        error: name,
        details: message,
      })

    case 'SequelizeUniqueConstraintError':
      return res.status(400).json({
        error: name,
        details: error.errors[0].message,
      })

    case 'ValidationError':
      return res.status(status).json({
        error: name,
        details: message ? message : details,
      })

    case 'NotFoundError':
      return res.status(status).json({
        error: name,
        details: message ? message : 'Resource not found!',
      })

    default:
      return res.status(500).json({
        error: 'Unknown error',
        details: message,
      })
  }
}

export default errorHandler
