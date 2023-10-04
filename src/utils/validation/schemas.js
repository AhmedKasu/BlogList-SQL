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

export { blogSchema, blogIdSchema }