import { JWT_SECRET } from '../utils/config.js'

const auth = async (req, res, next) => {
  console.log('auuuuthhhhthhhtth')
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.authUser = jwt.verify(authorization.substring(7), JWT_SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

export default auth
