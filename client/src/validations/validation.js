const fieldValue = (state, fieldName) => {
  const field = state.fields[fieldName]
  return field ? field.value : ''
}

export const validateValue = (value, validationPredicates) =>
  validationPredicates.reduce((errors, {predicate, arg, message}) =>
    predicate(value) ? errors : [...errors, message(arg)], [])

const hasValidations = (state, fieldName) =>
  state.fieldValidations[fieldName] && state.fieldValidations[fieldName].length > 0

const validateField = (state, fieldName)  =>
  validateValue(fieldValue(state, fieldName), state.fieldValidations[fieldName])

export const collectErrors = state =>
  Object.keys(state.fieldValidations)
    .filter(fieldName => hasValidations(state, fieldName))
    .reduce(
      (errors, fieldName) => ({...errors, [fieldName]: validateField(state, fieldName)}),
      state.fieldErrors)

