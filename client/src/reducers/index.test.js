import * as Actions from '../actions'
import { reducer } from './'

// it seems silly to directly test actions that simply return a data structure
// with a hardcoded type and payload (unless there's some involved
// manipulation transforming the input into that payload, but in most
// cases there should not be.

// It's kind of like testing accessors.

// As a result, these tests do double duty: they bring the Action
// functions into the picture and make sure they are at least exercised
// and properly consumed by the reducer

describe('space reducers', () => {
  it ('returns current state when action unrecognized', () => {
    const initialState = { init: 123 }

    const state = reducer(initialState, { type: 'unrecognized' })

    expect(state).toEqual(initialState)
  })

  describe('SetCurrentSpaceId', () => {
    it('updates space ID', () => {
      const initialState = { currentSpaceId: '123', data: 0 }

      const state = reducer(initialState, Actions.setCurrentSpaceId('999'))

      expect(state).toEqual({ currentSpaceId: '999', data: 0 })
    })
  })

  describe('SetErrorMessage', () => {
    it('updates errorMessage', () => {
      const initialState = { data: 0, errorMessage: undefined }

      const state = reducer(initialState, Actions.setErrorMessage('bad'))

      expect(state).toEqual({ data: 0, errorMessage: 'bad' })
    })
  })

  describe('SetFormField', () => {
    it('adds a field value', () => {
      const initialState = { data: 0, fields: { a: 1 } }

      const state = reducer(initialState, Actions.setFieldValue('newKey', 42))

      expect(state).toEqual({ data: 0, fields: { a: 1, newKey: 42 }})
    })

    it('overwrites an existing field value', () => {
      const initialState = { data: 0, fields: { a: 1, someKey: 42 } }

      const state = reducer(initialState, Actions.setFieldValue('someKey', 86))

      expect(state).toEqual({ data: 0, fields: { a: 1, someKey: 86 }})
    })
  })
})