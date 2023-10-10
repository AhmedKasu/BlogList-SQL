import { Router } from 'express'

import { sequelize } from '../db.js'
import { Blog } from '../models/index.js'

const router = Router()

router.get('/', async (_req, res) => {
  const { fn, col } = sequelize
  const authorsData = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('author')), 'articles'],
      [fn('SUM', col('likes')), 'totallikes'],
    ],
    group: ['author'],
    order: [[fn('SUM', col('likes')), 'DESC']],
  })

  return res.status(200).json(authorsData)
})

export default router
