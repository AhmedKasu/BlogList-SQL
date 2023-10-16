import { Model, DataTypes, ValidationError } from 'sequelize'
import { sequelize } from '../db.js'

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING(50),
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isYearValid(value) {
          if (value < 1991 || value > new Date().getFullYear()) {
            throw new ValidationError(
              'Year written should be between 1991 and the current year.'
            )
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
)

export default Blog
