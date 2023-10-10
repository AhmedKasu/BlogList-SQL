import { Router } from 'express'
import { Op } from 'sequelize'

import { Blog, User } from '../models/index.js'

import findById from '../middleware/findById.js'
import { validateBlog, validateLikes } from '../utils/validation/blog.js'

const router = Router()
const singleRouter = Router()

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`,
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['userName'] },
    where,
  })
  res.status(200).json(blogs)
})

router.post('/', async (req, res) => {
  const newBlog = await Blog.create({
    ...validateBlog(req.body),
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
  req.blog.likes = validateLikes(req.body).likes
  await req.blog.save()
  res.status(200).json(req.blog)
})

router.use('/:id', findById(Blog, 'blog'), singleRouter)

export default router
