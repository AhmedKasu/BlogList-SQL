import { Sequelize } from 'sequelize'
import { DATABASE_URL_DEV } from '../src/utils/config.js'

const sequelize = new Sequelize(DATABASE_URL_DEV)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

export { connectToDatabase, sequelize }
