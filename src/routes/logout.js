import { Router } from 'express'

import auth from '../middleware/auth.js'

const router = Router()

router.delete('/', auth, async (req, res) => {
  await req.session.destroy()
  res.status(204).end()
})

export default router
