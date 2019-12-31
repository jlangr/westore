export const hasErrors = errors => Object.keys(errors).length > 0

export const hasContent = field => field.trim()

export const isValidZip = field => /^\d{5}(-\d{4})?$/.test(field)

export const minLen = (minLength, field) => field.length >= minLength

export const maxLen = (maxLength, field) => field.length <= maxLength

export const isAlpha = field => field.split('').every(isLetterOrSpace)

const isLetterOrSpace = c => isLetter(c) || /\s/.test(c)

const isLetter = c => c.toLowerCase() != c.toUpperCase()

const validations = {
  required: { predicate: hasContent, message: () => 'Required' },
  isAlpha: { predicate: isAlpha, message: () => 'Must only contain alphabetic characters' },
  maxLen: { predicate: maxLen, message: arg => `Max length of ${arg} exceeded` }
}

export const validation = (name, messageFn=validations[name].message) =>
  ({ ...validations[name], message: messageFn })

const curry1 = (fn, arg1) => arg2 => fn(arg1, arg2)

export const validationWithArg = (name, arg, messageFn=validations[name].message) =>
  ({ ...validation(name), arg, predicate: curry1(validations[name].predicate, arg), message: messageFn })
