import * as Validation from './validation'

describe('hasContent', () => {
  it('answers true when field contains anything', () => {
    expect(Validation.hasContent('abc')).toBeTruthy()
  })

  it('answers false when field is undefined or null', () => {
    expect(Validation.hasContent(null)).toBeFalsy()
    expect(Validation.hasContent(undefined)).toBeFalsy()
  })

  it('answers false when field is a zero-length string', () => {
    expect(Validation.hasContent('')).toBeFalsy()
  })

  it('answers false when field is an empty string', () => {
    expect(Validation.hasContent(' ')).toBeFalsy()
  })
})

describe('field validations', () => {
  it('adds to field errors when city not provided', () => {
    const state = { fields: { city: { value: '' } } }

    const errors = Validation.validateFieldHasContent({}, state, 'city')

    expect(errors).toEqual({ city: 'Required' })
  })

  it('does not add to field errors when city provided', () => {
    const state = { fields: { city: { value: 'Limon' }} }

    const errors = Validation.validateFieldHasContent({}, state, 'city')

    expect(errors).toEqual({} )
  })

  it('accumulates multiple field errors', () => {
    const state = { fields: { address: '', city: '' }, fieldErrors: {} }

    const errors = Validation.collectErrors(state, Validation.collectErrors(state))

    expect(errors).toEqual({ address: 'Required', city: 'Required' })
  })
})

