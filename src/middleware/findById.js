import validateUserInput from '../utils/validation/index.js'
import { NotFoundError } from '../utils/errors.js'

const findById = (Model, resource, validationSchema) => {
  return async (req, _res, next) => {
    req[resource] = await Model.findByPk(
      validateUserInput(validationSchema, req.params.id)
    )

    if (!req[resource]) throw new NotFoundError('Blog not found!')

    next()
  }
}

export default findById
