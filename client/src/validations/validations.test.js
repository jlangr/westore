import {
  collectValidations,
  hasContent, isAlpha, isValidZip, maxLen, minLen,
  validation, validationWithArg
} from './validations'

describe('validation', () => {
  it('retrieves validation by name', () =>
    expect(validation('required').predicate).toEqual(hasContent))

  it('allows replacing msg fn, mostly for testing', () =>
    expect(validation('required', () => 'blah').message())
      .toEqual('blah'))
})

describe('validationWithArg', () => {
  describe('without message fn override', () => {
    let validation

    beforeEach(() => validation = validationWithArg('maxLen', 3))

    it('creates curried version of predicate', () => {
      expect(validation.predicate('1234')).toBeFalsy()
      expect(validation.predicate('123')).toBeTruthy()
    })

    it('stores arg for message', () =>
      expect(validation.arg).toEqual(3))
  })

  describe('with message fn override', () => {
    it('replaces message fn', () => {
      const validation = validationWithArg('maxLen', 3, arg => `hey ${arg}`)

      expect(validation.message(validation.arg)).toEqual('hey 3')
    })
  })
})

describe('collectValidations from props', () => {
  it('includes validations for appropriate props keys', () => {
    // TODO mystery pass
    const props = { 'whatever': 0, 'required': 0, 'maxLen': 0 }

    const validations = collectValidations(props)

    expect(Object.keys(validations)).toEqual([ 'required', 'maxLen' ])
    expect(validations.required).toEqual(validation('required'))
  })

  it('returns empty list when nothing matches', () => {
    expect(collectValidations({ 'boo': 42 })).toEqual({})

  })
})

describe('hasContent', () => {
  it('answers true when field contains anything', () =>
    expect(hasContent('abc')).toBeTruthy())

  it('answers false when field is a zero-length string', () =>
    expect(hasContent('')).toBeFalsy())

  it('answers false when field is an empty string', () =>
    expect(hasContent(' ')).toBeFalsy())
})

describe('valid zip', () => {
  it('is valid when containing 5 numbers', () =>
    expect(isValidZip('12345')).toBeTruthy())

  it('is invalid when containing fewer than 5 numbers', () =>
    expect(isValidZip('1234')).toBeFalsy())

  it('is valid when containing zip+4 format', () =>
    expect(isValidZip('12345-2349')).toBeTruthy())
})

describe('minlen', () => {
  it('is valid when containing enough characters', () =>
    expect(minLen(5, '12345')).toBeTruthy())

  it('is invalid when containing too few characters', () =>
    expect(minLen(5, '123')).toBeFalsy())
})

describe('maxlen', () => {
  it('is valid when containing no more than max characters', () =>
    expect(maxLen(5, '12345')).toBeTruthy())

  it('is invalid when containing too many characters', () =>
    expect(maxLen(5, '123456')).toBeFalsy())
})

describe('isAlpha', () => {
  it('is valid when only contains alphabetic max characters & spaces', () =>
    expect(isAlpha('Abc Def')).toBeTruthy())

  it('is invalid when containing non-alphabetic/non-space characters', () =>
    expect(isAlpha('Abc123')).toBeFalsy())
})
