import User from '../models/User.js'
import { NotFoundError } from '../utils/errors.js'

const findByUsername = async (req, _res, next) => {
  req.user = await User.findOne({
    where: { username: req.params.username },
  })

  if (!req.user) throw new NotFoundError('User not found!')

  next()
}

export default findByUsername
