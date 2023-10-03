class ValidationError extends Error {
  constructor(message) {
    if (typeof message === 'string') {
      super(message)
    } else {
      super()
    }

    this.name = 'ValidationError'
    this.status = 400

    if (typeof message === 'object') this.details = message
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
  }
}

export { NotFoundError, ValidationError }
