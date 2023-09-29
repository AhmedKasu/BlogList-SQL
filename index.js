import express from 'express'
import { Sequelize } from 'sequelize'

import { PORT, DATABASE_URL_DEV } from './src/utils/config.js'

const app = express()

const sequelize = new Sequelize(DATABASE_URL_DEV)

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
