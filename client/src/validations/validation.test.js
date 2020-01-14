import {
  collectErrors,
  validateValue
} from './validation'

import {
  validation, validationWithArg
} from './validations'

import { reducer, initialState } from '../reducers'
import { addValidation } from '../actions'


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
    const init = { ...initialState, fields: { ...initialState.fields, city: { value: '' } } }
    const state = reducer(init, addValidation('city', validation('required')))

    const errors = collectErrors(state)

    expect(errors).toEqual({ city: ['Required'] })
  })

  it('supports multiple validations per field', () => {
    const state = {
      fieldValidations: {
        city: [
          validationWithArg('maxLen', 5, arg => `maxlen ${arg}`),
          validation('isAlpha', () => 'only alpha')]
      },
      fields: { city: { value: 'A123456' } },
      fieldErrors: {}
    }

    const errors = collectErrors(state)

    expect(errors).toEqual({ city: ['maxlen 5', 'only alpha'] })
  })

  it('accumulates errors for multiple fields', () => {
    const state = {
      fieldValidations: {
        city: [validation('required', () => 'Required')],
        address: [validation('required', () => 'Required')]
      },
      fields: {
        address: { value: '' },
        city: { value: '' }
      },
      fieldErrors: {}
    }

    const errors = collectErrors(state, collectErrors(state))

    expect(errors).toEqual({ address: ['Required'], city: ['Required'] })
  })

  it('only processes fields with validations', () => {
    const state = {
      fieldValidations: { city: [validation('required', () => 'Required')] },
      fields: { address: { value: '' }, city: { value: '' } },
      fieldErrors: {}
    }

    const errors = collectErrors(state, collectErrors(state))

    expect(errors).toEqual({ city: ['Required'] })
  })
})

