import { Router } from 'express'
import Blog from '../models/Blog.js'

import errorHandler from '../middleware/errorHandler.js'
import findById from '../middleware/findById.js'
import { validateBlog } from '../utils/validation/blog.js'

const router = Router()
const singleRouter = Router()

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.status(200).json(blogs)
})

router.post('/', async (req, res) => {
  const newBlog = await Blog.create(validateBlog(req.body))
  res.status(200).json(newBlog)
})

singleRouter.delete('/', async (req, res) => {
  await Blog.destroy({ where: { id: req.blog.id } })
  res.sendStatus(204).end()
})

router.use('/:id', findById(Blog, 'blog'), singleRouter, errorHandler)
router.use(errorHandler)

export default router
