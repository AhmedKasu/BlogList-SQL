import 'express-async-errors'
import express from 'express'
const app = express()

import { PORT } from './utils/config.js'
import { connectToDatabase } from './db.js'

import auth from './middleware/auth.js'
import errorHandler from './middleware/errorHandler.js'

import blogsRouter from './routes/blogs.js'
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'
import authorsRouter from './routes/authors.js'
import readinglistsRouter from './routes/readinglists.js'
import logoutRouter from './routes/logout.js'

app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/logout', logoutRouter)

app.use(auth)

app.use('/api/blogs', blogsRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistsRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
