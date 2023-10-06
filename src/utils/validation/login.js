import { loginSchema } from './schemas.js'
import { ValidationError } from '../errors.js'

const validateLogin = (loginInput) => {
  const { data, error } = loginSchema.safeParse(loginInput)

  if (error) throw new ValidationError(error.formErrors.fieldErrors)

  return data
}

export default validateLogin
