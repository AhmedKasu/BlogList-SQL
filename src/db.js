import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { Sequelize, DataTypes } = require('sequelize')
import { DATABASE_URL_DEV } from '../src/utils/config.js'
const { Umzug, SequelizeStorage } = require('umzug')
const path = require('path')

const sequelize = new Sequelize(DATABASE_URL_DEV)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database', err)
    return process.exit(1)
  }

  return null
}

const migrationConf = {
  migrations: {
    glob: [
      'migrations/*.js',
      { cwd: path.dirname(import.meta.url.replace('file://', '')) },
    ],
    resolve: (params) => {
      if (params.path.endsWith('.js')) {
        const getModule = () =>
          import(`file:///${params.path.replace(/\\/g, '/')}`)
        return {
          name: params.name,
          path: params.path,
          up: async (upParams) => (await getModule()).up(upParams),
          down: async (downParams) => (await getModule()).down(downParams),
        }
      }
    },
  },
  context: { sequelize, DataTypes },
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'migrations',
  }),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

export { connectToDatabase, sequelize, rollbackMigration }
