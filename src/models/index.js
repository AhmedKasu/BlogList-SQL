import Blog from './Blog.js'
import User from './User.js'
import Readinglist from './Readinglist.js'
import Session from './Session.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'readers' })

export { Blog, User, Readinglist, Session }
