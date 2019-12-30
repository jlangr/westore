const fieldValue = (state, fieldName) => {
  const field = state.fields[fieldName]
  return field ? field.value: ''
}

export const validateFieldHasContent = (fieldErrors, state, fieldName) => {
  if (hasContent(fieldValue(state, fieldName)))
    return fieldErrors
  return { ...fieldErrors, [fieldName]: 'Required' }
}

export const collectErrors = state => {
  let errors = {}
  errors = validateFieldHasContent(errors, state, 'city')
  errors = validateFieldHasContent(errors, state, 'address')
  return errors
}

export const hasErrors = errors => Object.keys(errors).length > 0

export const hasContent = field => field && field.trim()
