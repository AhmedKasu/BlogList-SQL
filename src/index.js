import express from 'express'
import 'express-async-errors'
import { PORT } from './utils/config.js'
import sequelize from './db.js'

import blogsRouter from './routes/blogs.js'

const app = express()

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
main()

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
