import * as Actions from '../actions'
import * as Validation from '../validations/validation'
import { reducer, initialState } from './'

// it seems silly to directly test actions that simply return a data structure
// with a hardcoded type and payload (unless there's some involved
// manipulation transforming the input into that payload, but in most
// cases there should not be.

// It's kind of like testing accessors.

// As a result, these tests do double duty: they bring the Action
// functions into the picture and make sure they are at least exercised
// and properly consumed by the reducer

describe('space reducers', () => {
  const validFields = { city: { value: 'Laurel' }, address: { value: '1000 Main' } }

  it ('returns current state when action unrecognized', () => {
    const currentState = { init: 123 }

    const state = reducer(currentState, { type: 'unrecognized' })

    expect(state).toEqual(currentState)
  })

  describe('SetCurrentSpaceId', () => {
    it('updates space ID', () => {
      const currentState = { currentSpaceId: '123', data: 0 }

      const state = reducer(currentState, Actions.setCurrentSpaceId('999'))

      expect(state).toEqual({ currentSpaceId: '999', data: 0 })
    })
  })

  describe('SetErrorMessage', () => {
    it('updates errorMessage', () => {
      const currentState = { data: 0, errorMessage: undefined }

      const state = reducer(currentState, Actions.setErrorMessage('bad'))

      expect(state).toEqual({ data: 0, errorMessage: 'bad' })
    })
  })

  describe('SetFormField', () => {
    it('adds a field value', () => {
      const currentState = { data: 0, fields: { a: { value: 1 } } }

      const state = reducer(currentState, Actions.setFieldValue('newKey', 42))

      expect(state).toEqual({ data: 0, fields: { a: { value: 1 }, newKey: { value: 42 } }})
    })

    it('overwrites an existing field value', () => {
      const currentState = { data: 0, fields: { a: { value: 1 }, someKey: { value: 42 } } }

      const state = reducer(currentState, Actions.setFieldValue('someKey', 86))

      expect(state).toEqual({ data: 0, fields: { a: { value: 1 }, someKey: { value: 86 } } })
    })
  })

  describe('field validations', () => {
    it('adds to field errors when city not provided', () => {
      const currentState = { fields: { ...validFields, city: { value: '' } }, fieldErrors: {} }

      const state = reducer(currentState, Actions.validateSpaceFields())

      expect(state.fieldErrors).toEqual({ city: 'Required' })
    })

    it('does not add to field errors when city provided', () => {
      const currentState = { fields: validFields, fieldErrors: {} }

      const state = reducer(currentState, Actions.validateSpaceFields())

      expect(state.fieldErrors).toEqual({} )
    })

    it('adds to field errors when address not provided', () => {
      const currentState = { fields: { ...validFields, address: '' }, fieldErrors: {} }

      const state = reducer(currentState, Actions.validateSpaceFields())

      expect(state.fieldErrors).toEqual({ address: 'Required' })
    })

    it('does not add to field errors when address provided', () => {
      const currentState = { fields: validFields, fieldErrors: {} }

      const state = reducer(currentState, Actions.validateSpaceFields())

      expect(state.fieldErrors).toEqual({} )
    })

    it('accumulates multiple field errors', () => {
      const currentState = { fields: { ...validFields, address: '', city: '' }, fieldErrors: {} }

      const state = reducer(currentState, Actions.validateSpaceFields())

      expect(state.fieldErrors).toEqual({ address: 'Required', city: 'Required' })
    })
  })

  describe('adding field validations', () => {
    it('sets validation functions for field', () => {
      const currentState = { fieldValidations: { city: [] } }

      const state = reducer(currentState, Actions.setValidations('city', [ Validation.hasContent ]))

      expect(state.fieldValidations).toEqual({ city: [Validation.hasContent] })
    })
  })

  describe('clearing field errors', () => {
    const currentState = { ...initialState, fieldErrors: { city: [ 'Required' ], address: [ 'Required'] }}

    const state = reducer(currentState, Actions.clearFieldError('city'))

    expect(state.fieldErrors).toEqual({ address: [ 'Required'] })
  })

  // TODO redundancy with setting a simple field
  describe('current spaces', () => {
    it('is empty by default', () => {
      const state = reducer(initialState, { type: 'unrecognized', })

      expect(state.currentSpaces).toEqual([])
    })

    it('updates currentSpaces', () => {
      const currentState = { data: 0 }

      const state = reducer(currentState, Actions.setCurrentSpaces([{ id: 'ABC' }]))

      expect(state).toEqual({ data: 0, currentSpaces: [{ id: 'ABC' }] })
    })
  })
})