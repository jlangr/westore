import * as Validation from './validation'

describe('hasContent', () => {
  it('answers true when field contains anything', () =>
    expect(Validation.hasContent('abc')).toBeTruthy())

  it('answers false when field is a zero-length string', () =>
    expect(Validation.hasContent('')).toBeFalsy())

  it('answers false when field is an empty string', () =>
    expect(Validation.hasContent(' ')).toBeFalsy())
})

describe('valid zip', () => {
  it('is valid when containing 5 numbers', () =>
    expect(Validation.isValidZip('12345')).toBeTruthy())

  it('is invalid when containing fewer than 5 numbers', () =>
    expect(Validation.isValidZip('1234')).toBeFalsy())

  it('is valid when containing zip+4 format', () =>
    expect(Validation.isValidZip('12345-2349')).toBeTruthy())
})

describe('minlen', () => {
  it('is valid when containing enough characters', () =>
    expect(Validation.minLen(5, '12345')).toBeTruthy())

  it('is invalid when containing too few characters', () =>
    expect(Validation.minLen(5, '123')).toBeFalsy())
})

describe('maxlen', () => {
  it('is valid when containing no more than max characters', () =>
    expect(Validation.maxLen(5, '12345')).toBeTruthy())

  it('is invalid when containing too many characters', () =>
    expect(Validation.maxLen(5, '123456')).toBeFalsy())
})

describe('isAlpha', () => {
  it('is valid when only contains alphabetic max characters & spaces', () =>
    expect(Validation.isAlpha('Abc Def')).toBeTruthy())

  it('is invalid when containing non-alphabetic/non-space characters', () =>
    expect(Validation.isAlpha('Abc123')).toBeFalsy())
})

describe('field validations', () => {
  it('adds to field errors when city not provided', () => {
    const state = {
      fieldValidations: { city: [Validation.hasContent] },
      fields: { city: { value: '' } } }

    const errors = Validation.validateFieldHasContent({}, state, 'city')

    expect(errors).toEqual({ city: 'Required' })
  })

  it('does not add to field errors when city provided', () => {
    const state = {
      fieldValidations: { city: [Validation.hasContent] },
      fields: { city: { value: 'Limon' }} }

    const errors = Validation.validateFieldHasContent({}, state, 'city')

    expect(errors).toEqual({} )
  })

  it('accumulates multiple field errors', () => {
    const state = {
      fieldValidations: { city: [Validation.hasContent], address: [Validation.hasContent] },
      fields: { address: '', city: '' }, fieldErrors: {} }

    const errors = Validation.collectErrors(state, Validation.collectErrors(state))

    expect(errors).toEqual({ address: 'Required', city: 'Required' })
  })

  it('validates a field using multiple functions', () => {
    const validations = [
      { predicate: curry1(Validation.maxLen, 5), args: [5], message: args => `Max length of ${args[0]} exceeded` },
      { predicate: Validation.isAlpha, args: [], message: () => 'Must only contain alphabetic characters' } ]

    const errorMessages = Validation.validate('A123456', validations)

    expect(errorMessages).toEqual([
      'Max length of 5 exceeded',
      'Must only contain alphabetic characters'])
  })
  //
  // it('only validates fields with appropriate function', () => {
  //   const state = {
  //     fieldValidations: { city: [Validation.hasContent] },
  //     fields: { address: '', city: '' }, fieldErrors: {}
  //   }
  //
  //   const errors = Validation.collectErrors(state, Validation.collectErrors(state))
  //
  //   expect(errors).toEqual({ city: 'Must only contain alphabetic characters' })
  // })

  it('associates error message with appropriate function', () => {
    const state = {
      fieldValidations: { city: [Validation.isAlpha] },
      fields: { city: '' }
    }

    const errors = Validation.collectErrors(state, Validation.collectErrors(state))

    expect(errors).toEqual({ city: 'Required' })
  })

  const curry1 = (fn, arg1) => arg2 => fn(arg1, arg2)

  // it('supports multiple validations per field', () => {
  //   const maxLen5 = curry1(Validation.maxLen, 5)
  //   const state = {
  //     fieldValidations: { city: [maxLen5, Validation.isAlpha] },
  //     fields: { city: 'A123456' }, fieldErrors: {}
  //   }
  //
  //   const errors = Validation.collectAllErrors(state, Validation.collectErrors(state))
  //
  //   expect(errors).toEqual({ city: ['Max length of 5 exceeded', 'Must only contain alphabetic characters'] })
  // })
})

