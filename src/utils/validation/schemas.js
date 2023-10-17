import { z } from 'zod'

const currentYear = new Date().getFullYear()
const blogSchema = z.object({
  author: z
    .string()
    .max(50, "Author's name should be no more than 50 characters"),
  url: z.string().url('Invalid URL format').nonempty('URL cannot be empty'),
  title: z
    .string()
    .max(50, 'Title should be no more than 50 characters')
    .nonempty('Title cannot be empty'),
  likes: z.number().int('Likes must be an integer').default(0),
  year: z
    .number()
    .int('Year must be an integer')
    .min(1991, 'Year must be 1991 or later')
    .max(currentYear, `Year must be ${currentYear} or earlier`)
    .optional(),
})

const idSchema = z
  .string()
  .nonempty('ID cannot be empty')
  .refine((value) => {
    const reg = /^\d+$/
    return reg.test(value)
  }, 'ID must be a positive integer')

const likesUpdateSchema = z.object({
  likes: z
    .number()
    .int('Likes must be an integer')
    .min(1, 'Minimum likes must be at least 1'),
})

const userSchema = z.object({
  username: z
    .string()
    .min(3, 'Username should be at least 3 characters')
    .max(30, 'Username should be no more than 30 characters')
    .nonempty('Username cannot be empty'),
  name: z
    .string()
    .max(30, 'Name should be no more than 30 characters')
    .nonempty('Name cannot be empty'),
  password: z
    .string()
    .min(5, 'Password should be at least 5 characters')
    .max(30, 'Password should be no more than 30 characters'),
})

const usernameSchema = z.object({
  username: userSchema.shape.username,
})

const loginSchema = z.object({
  username: userSchema.shape.username,
  password: userSchema.shape.password,
})

export {
  blogSchema,
  idSchema,
  likesUpdateSchema,
  userSchema,
  usernameSchema,
  loginSchema,
}
