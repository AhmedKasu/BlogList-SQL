import { blogSchema, blogIdSchema } from './schemas.js'
import { ValidationError } from '../errors.js'

const validateBlog = (blog) => {
  const { data, error } = blogSchema.safeParse(blog)

  if (error) throw new ValidationError(error.formErrors.fieldErrors)

  return data
}

const validateBlogId = (id) => {
  const { data, error } = blogIdSchema.safeParse(id)

  if (error) throw new ValidationError('Blog ID must be a positive integer')

  return data
}

export { blogSchema, validateBlog, validateBlogId }
