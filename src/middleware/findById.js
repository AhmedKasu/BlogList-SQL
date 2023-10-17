import validateUserInput from '../utils/validation/index.js'
import { NotFoundError } from '../utils/errors.js'

const findById = (Model, resource, validationSchema, queryOptions = {}) => {
  return async (req, _res, next) => {
    req[resource] = await Model.findByPk(
      validateUserInput(validationSchema, req.params.id),
      queryOptions
    )

    if (!req[resource]) throw new NotFoundError(`${resource} not found!`)

    next()
  }
}

export default findById
