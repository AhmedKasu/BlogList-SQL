import User from '../models/User.js'
import { NotFoundError } from '../utils/errors.js'

const findByUserName = async (req, _res, next) => {
  req.user = await User.findOne({
    where: { userName: req.params.userName },
  })

  if (!req.user) throw new NotFoundError('User not found!')

  next()
}

export default findByUserName
