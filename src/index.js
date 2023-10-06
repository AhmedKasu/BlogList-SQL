import 'express-async-errors'
import express from 'express'
const app = express()

import { PORT } from './utils/config.js'
import { connectToDatabase } from './db.js'

import blogsRouter from './routes/blogs.js'
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
