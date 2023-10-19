import { JWT_SECRET } from '../utils/config.js'
import jwt from 'jsonwebtoken'

import { Session } from '../models/index.js'

const auth = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const undecodedToken = authorization.substring(7)

    try {
      const decodedToken = jwt.verify(undecodedToken, JWT_SECRET)

      const validSession = await Session.findOne({
        where: { token: undecodedToken },
      })

      if (!validSession)
        return res.status(401).json({ error: 'session invalid or expired' })

      req.authUser = decodedToken
      req.session = validSession
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

export default auth
