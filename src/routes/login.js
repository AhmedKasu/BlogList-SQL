import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/index.js'
import validateUserInput from '../utils/validation/index.js'
import { loginSchema } from '../utils/validation/schemas.js'
import { JWT_SECRET } from '../utils/config.js'

const router = Router()

router.post('/', async (req, res) => {
  const { username, password } = validateUserInput(loginSchema, req.body)

  const user = await User.findOne({
    where: { username },
  })

  if (!user)
    return res.status(401).json({ error: 'invalid username or password' })

  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!passwordCorrect)
    return res.status(401).json({ error: 'invalid username or password' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, JWT_SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

export default router
