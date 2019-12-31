const fieldValue = (state, fieldName) => {
  const field = state.fields[fieldName]
  return field ? field.value: ''
}

export const validateFieldHasContent = (fieldErrors, state, fieldName) => {
  if (hasContent(fieldValue(state, fieldName)))
    return fieldErrors
  return { ...fieldErrors, [fieldName]: 'Required' }
}

// Ridiculous # of args
export const validateField = (fieldErrors, state, fieldName, validationPredicate, errorMessage) => {
  if (validationPredicate(fieldValue(state, fieldName)))
    return fieldErrors
  return { ...fieldErrors, [fieldName]: errorMessage }
}

export const validate = (value, validationPredicates) =>
  validationPredicates.reduce((errors, { predicate, args, message }) => {
    return predicate(value) ? errors : [ ...errors, message(args) ]
  }, [])

const hasValidations = (state, fieldName) =>
  state.fieldValidations[fieldName] && state.fieldValidations[fieldName].length > 0

export const collectErrors = state =>
  Object.keys(state.fieldValidations)
    .filter(fieldName => hasValidations(state, fieldName))
    .reduce((errors, fieldName) => validateField(errors, state, fieldName, hasContent, 'Required'), {})

export const hasErrors = errors => Object.keys(errors).length > 0

export const hasContent = field => field.trim()

export const isValidZip = field => /^\d{5}(-\d{4})?$/.test(field)

export const minLen = (minLength, field) => field.length >= minLength

export const maxLen = (maxLength, field) => field.length <= maxLength

export const isAlpha = field => field.split('').every(isLetterOrSpace)

const isLetterOrSpace = c => isLetter(c) || /\s/.test(c)

const isLetter = c => c.toLowerCase() != c.toUpperCase()
