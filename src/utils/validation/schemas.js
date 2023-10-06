import { z } from 'zod'

const blogSchema = z.object({
  author: z.string().max(50),
  url: z.string().url().nonempty(),
  title: z.string().max(50).nonempty(),
  likes: z.number().int().default(0),
})

const blogIdSchema = z.string().refine((value) => {
  const reg = /^\d+$/
  return reg.test(value)
})

const likesUpdateSchema = z.object({
  likes: z.number().int().min(1),
})

const userSchema = z.object({
  userName: z.string().min(3).max(30).nonempty(),
  name: z.string().max(30).nonempty(),
  password: z.string().min(5).max(30),
})

const userNameSchema = z.object({
  userName: userSchema.shape.userName,
})

export {
  blogSchema,
  blogIdSchema,
  likesUpdateSchema,
  userSchema,
  userNameSchema,
}
