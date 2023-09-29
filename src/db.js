import { Sequelize } from 'sequelize'
import { DATABASE_URL_DEV } from '../src/utils/config.js'

const sequelize = new Sequelize(DATABASE_URL_DEV)

export default sequelize
