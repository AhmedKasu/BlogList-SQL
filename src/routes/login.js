import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/index.js'
import validateLogin from '../utils/validation/login.js'
import { JWT_SECRET } from '../utils/config.js'

const router = Router()

router.post('/', async (req, res) => {
  const { username, password } = validateLogin(req.body)

  const user = await User.findOne({
    where: {
      username: username,
    },
  })

  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect))
    return res.status(401).json({ error: 'invalid username or password' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, JWT_SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

export default router
