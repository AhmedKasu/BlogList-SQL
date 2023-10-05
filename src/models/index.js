import Blog from './Blog.js'
import User from './User.js'

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync()
User.sync()

export { Blog, User }
