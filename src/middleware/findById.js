import { validateBlogId } from '../utils/validation/blog.js'
import { NotFoundError } from '../utils/errors.js'

const findById = (Model, resource) => {
  return async (req, _res, next) => {
    req[resource] = await Model.findByPk(validateBlogId(req.params.id))

    if (!req[resource]) throw new NotFoundError('Blog not found!')

    next()
  }
}

export default findById
