import { rollbackMigration } from '../db.js'

;(async () => {
  try {
    await rollbackMigration()
    console.log('Rollback complete')
  } catch (error) {
    console.error('Rollback failed:', error)
  }
})()
