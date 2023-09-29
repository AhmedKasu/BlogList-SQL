import express from 'express'
import { PORT } from './utils/config.js'
import sequelize from './db.js'

const app = express()

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
