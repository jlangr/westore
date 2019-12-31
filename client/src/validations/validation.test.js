import {
  collectErrors,
  validateValue,
} from './validation'

import {
  validation, validationWithArg
} from './validations'

describe('field validations', () => {
  it('validates a field with multiple validations', () => {
    const validations = [
      validationWithArg('maxLen', 5, arg => `maxlen ${arg}`),
      validation('isAlpha', () => 'only alpha')]

    const errorMessages = validateValue('A123456', validations)

    expect(errorMessages).toEqual([
      'maxlen 5',
      'only alpha'])
  })
})

describe('collect errors', () => {
  it('associates error message with appropriate function', () => {
    const state = {
      fieldValidations: { city: [validation('isAlpha', () => 'hey')] },
      fields: { city: { value: '123' } },
      fieldErrors: {}
    }

    const errors = collectErrors(state, collectErrors(state))

    expect(errors).toEqual({city: ['hey']})
  })

  it('supports multiple validations per field', () => {
    const state = {
      fieldValidations: {
        city: [
          validationWithArg('maxLen', 5, arg => `maxlen ${arg}`),
          validation('isAlpha', () => 'only alpha') ]
      },
      fields: {city: {value: 'A123456' }},
      fieldErrors: {}
    }

    const errors = collectErrors(state, collectErrors(state))

    expect(errors).toEqual({city: ['maxlen 5', 'only alpha']})
  })

  it('accumulates errors for multiple fields', () => {
    const state = {
      fieldValidations: {
        city: [validation('required', () => 'Required')],
        address: [validation('required', () => 'Required')]
      },
      fields: {
        address: {value: ''},
        city: {value: ''}
      },
      fieldErrors: {}
    }

    const errors = collectErrors(state, collectErrors(state))

    expect(errors).toEqual({address: [ 'Required' ], city: [ 'Required' ]})
  })

  it('only processes fields with validations', () => {
    const state = {
      fieldValidations: { city: [validation('required', () => 'Required')] },
      fields: { address: { value: '' }, city: { value: '' } },
      fieldErrors: {}
    }

    const errors = collectErrors(state, collectErrors(state))

    expect(errors).toEqual({ city: [ 'Required' ] })
  })
})

