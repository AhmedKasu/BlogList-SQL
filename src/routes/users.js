import { Router } from 'express'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import { User, Blog } from '../models/index.js'
import findByUsername from '../middleware/findByUsername.js'
import findById from '../middleware/findById.js'
import auth from '../middleware/auth.js'
import {
  idSchema,
  userSchema,
  usernameSchema,
} from '../utils/validation/schemas.js'
import validateUserInput from '../utils/validation/index.js'

const router = Router()
const singleUser = Router()

router.post('/', async (req, res) => {
  const validatedUser = validateUserInput(userSchema, req.body)

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(validatedUser.password, salt)

  const newUser = await User.create({
    ...validatedUser,
    password: passwordHash,
  })
  res.status(200).json(_.omit(newUser.toJSON(), ['password']))
})

router.get('/', auth, async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: { model: Blog, attributes: { exclude: ['userId'] } },
  })
  res.status(200).json(users)
})

router.put('/:username', auth, findByUsername, async (req, res) => {
  if (req.user.id !== req.authUser.id) return res.status(401).end()

  req.user.username = validateUserInput(usernameSchema, req.body).username
  await req.user.save()
  res.status(200).send(_.omit(req.user.toJSON(), ['password']))
})

singleUser.get('/', auth, async (req, res) => {
  res.status(200).json(req.user)
})

const singleUserQueryOptions = {
  attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  include: {
    model: Blog,
    as: 'readings',
    attributes: {
      exclude: ['userId', 'createdAt', 'updatedAt', 'readinglist'],
    },
    through: {
      attributes: [],
    },
  },
}

router.use(
  '/:id',
  findById(User, 'user', idSchema, singleUserQueryOptions),
  singleUser
)

export default router
