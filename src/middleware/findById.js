import validateUserInput from '../utils/validation/index.js'
import { NotFoundError } from '../utils/errors.js'

const findById = (Model, resource, validationSchema) => {
  return (queryOptionsFn = () => ({})) => {
    return async (req, _res, next) => {
      const options = queryOptionsFn(req.query.read)
      req[resource] = await Model.findByPk(
        validateUserInput(validationSchema, req.params.id),
        options
      )

      if (!req[resource]) throw new NotFoundError(`${resource} not found!`)

      next()
    }
  }
}

export default findById
