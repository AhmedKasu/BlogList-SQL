import { userSchema, userNameSchema } from './schemas.js'
import { ValidationError } from '../errors.js'

const validateUser = (user) => {
  const { data, error } = userSchema.safeParse(user)

  if (error) throw new ValidationError(error.formErrors.fieldErrors)

  return data
}

const validateUserNameUpdate = (userName) => {
  const { data, error } = userNameSchema.safeParse(userName)

  if (error) throw new ValidationError(error.formErrors.fieldErrors)

  return data
}

export { validateUser, validateUserNameUpdate }
