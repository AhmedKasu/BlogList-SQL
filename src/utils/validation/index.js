import { ValidationError } from '../errors.js'

const validateUserInput = (schema, userInput, customErrorMessage) => {
  const { data, error } = schema.safeParse(userInput)

  if (error) {
    console.log(error)
    const zodErrorMessage = error.issues
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ')

    throw new ValidationError(
      customErrorMessage ? customErrorMessage : zodErrorMessage
    )
  }

  return data
}
export default validateUserInput
