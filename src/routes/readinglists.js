import { Router } from 'express'

import { Blog, User, Readinglist } from '../models/index.js'

import findById from '../middleware/findById.js'

import validateUserInput from '../utils/validation/index.js'
import {
  readinglistSchema,
  idSchema,
  readinglistUpdateSchema,
} from '../utils/validation/schemas.js'

const router = Router()

router.post('/', async (req, res) => {
  const { blogId, userId } = validateUserInput(readinglistSchema, req.body)

  const blog = await Blog.findByPk(blogId)
  if (!blog) return res.status(404).send('Blog not found')

  const user = await User.findByPk(userId)
  if (!user) return res.status(404).send('User not found')

  const readinglist = await Readinglist.create({ blogId, userId })

  res.status(200).json(readinglist)
})

router.put(
  '/:id',
  findById(Readinglist, 'readinglist', idSchema)(),
  async (req, res) => {
    req.readinglist.read = validateUserInput(
      readinglistUpdateSchema,
      req.body
    ).read

    await req.readinglist.save()
    res.status(200).json(req.readinglist)
  }
)

export default router
