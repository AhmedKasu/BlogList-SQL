import 'express-async-errors'
import express from 'express'
const app = express()

import { PORT } from './utils/config.js'
import { connectToDatabase } from './db.js'

import blogsRouter from './routes/blogs.js'

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
