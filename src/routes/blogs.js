import { Router } from 'express'
import { Op } from 'sequelize'

import { Blog, User } from '../models/index.js'

import findById from '../middleware/findById.js'
import validateUserInput from '../utils/validation/index.js'
import {
  blogSchema,
  likesUpdateSchema,
  idSchema,
} from '../utils/validation/schemas.js'

const router = Router()
const singleRouter = Router()

router.get('/', async (req, res) => {
  const searchQuery = req.query.search
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${searchQuery}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${searchQuery}%`,
        },
      },
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['username'] },
    where,
    order: [['likes', 'DESC']],
  })
  res.status(200).json(blogs)
})

router.post('/', async (req, res) => {
  const newBlog = await Blog.create({
    ...validateUserInput(blogSchema, req.body),
    userId: req.authUser.id,
  })
  res.status(200).json(newBlog)
})

singleRouter.delete('/', async (req, res) => {
  if (req.blog.userId !== req.authUser.id) return res.status(401).end()

  await Blog.destroy({ where: { id: req.blog.id } })
  res.sendStatus(204).end()
})

singleRouter.put('/', async (req, res) => {
  req.blog.likes = validateUserInput(likesUpdateSchema, req.body).likes
  await req.blog.save()
  res.status(200).json(req.blog)
})

router.use('/:id', findById(Blog, 'blog', idSchema)(), singleRouter)

export default router
