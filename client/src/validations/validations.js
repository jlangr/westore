export const hasErrors = errors => Object.keys(errors).length > 0

export const hasContent = field => field.trim()

export const isValidZip = field => /^\d{5}(-\d{4})?$/.test(field)

export const minLen = (minLength, field) => field.length >= minLength

export const maxLen = (maxLength, field) => field.length <= maxLength

export const isAlpha = field => field.split('').every(isLetterOrSpace)

export const isNumeric = field => field.split('').every(isDigit)

const isLetterOrSpace = c => isLetter(c) || /\s/.test(c)

const isLetter = c => c.toLowerCase() !== c.toUpperCase()

const isDigit = c => /\d/.test(c)

const validations = {
  required: { predicate: hasContent, message: () => 'Required' },
  isAlpha: { predicate: isAlpha, message: () => 'Must only contain alphabetic characters' },
  isNumeric: { predicate: isNumeric, message: () => 'Must only contain numbers' }, // weak, do regex
  isValidZip: { predicate: isValidZip, message: () => 'Must match valid zip code ##### or #####-####' },
  maxLen: { predicate: maxLen, message: arg => `Max length of ${arg} exceeded` },
  minLen: { predicate: minLen, message: arg => `Min length of ${arg} not met` }
}

// TODO test
export const isValidation = key => validations[key]

export const validation = (name, messageFn=validations[name].message) =>
  ({ ...validations[name], message: messageFn })

const curry1 = (fn, arg1) => arg2 => fn(arg1, arg2)

export const validationWithArg = (name, arg, messageFn=validations[name].message) =>
  ({ ...validation(name), arg, predicate: curry1(validations[name].predicate, arg), message: messageFn })

// better way? return submap of validations for keys of props that are found in it
export const collectValidations = props =>
  Object.entries(validations)
    .filter(entry => Object.keys(props).indexOf(entry[0]) !== -1)
    .reduce((subset, [key, value]) => ({ ...subset, [key]: value }), {})
