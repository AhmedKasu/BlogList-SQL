import { Router } from 'express'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import { User } from '../models/index.js'
import findByUserName from '../middleware/findByUserName.js'
import {
  validateUser,
  validateUserNameUpdate,
} from '../utils/validation/user.js'

const router = Router()

router.post('/', async (req, res) => {
  const validatedUser = validateUser(req.body)

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(validatedUser.password, salt)

  const newUser = await User.create({
    ...validatedUser,
    password: passwordHash,
  })
  res.status(200).json(_.omit(newUser.toJSON(), ['password']))
})

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  })
  res.status(200).json(users)
})

router.put('/:userName', findByUserName, async (req, res) => {
  req.user.userName = validateUserNameUpdate(req.body).userName
  await req.user.save()
  res.status(200).send(_.omit(req.user.toJSON(), ['password']))
})

export default router
