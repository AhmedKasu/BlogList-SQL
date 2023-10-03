import { z } from 'zod'
import { ValidationError } from '../errors.js'

const blogSchema = z.object({
  author: z.string().max(50),
  url: z.string().url().nonempty(),
  title: z.string().max(50).nonempty(),
  likes: z.number().int().default(0),
})

const validateBlog = (blog) => {
  const { data, error } = blogSchema.safeParse(blog)

  if (error) throw new ValidationError(error.formErrors.fieldErrors)

  return data
}

const blogIdSchema = z.string().refine((value) => {
  const reg = /^\d+$/
  return reg.test(value)
})

const validateBlogId = (id) => {
  const { data, error } = blogIdSchema.safeParse(id)

  if (error) throw new ValidationError('Blog ID must be a positive integer')

  return data
}

export { blogSchema, validateBlog, validateBlogId }
