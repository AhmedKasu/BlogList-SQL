import { ValidationError } from '../errors.js'

const validateUserInput = (schema, userInput, errorMessage) => {
  const { data, error } = schema.safeParse(userInput)

  if (error)
    throw new ValidationError(
      errorMessage ? errorMessage : error.formErrors.fieldErrors
    )

  return data
}

export default validateUserInput
