import { QueryTypes } from 'sequelize'
import sequelize from './src/db.js'

const printBlogs = async () => {
  try {
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    })
    console.log(blogs)
  } catch (error) {
    console.log('Error fetching blogs', error)
  }
}

printBlogs()
