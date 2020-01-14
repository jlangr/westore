import * as React from 'react'
import { mount } from 'enzyme'
import FormField, { lines } from './FormField'
import ReactContextMock from './ReactContextMock'
import * as Actions from '../actions'
jest.mock('../actions')

const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', { target: { value } })

const focus = (component, selector) =>
  component.find(selector).prop('onFocus')()

describe('FormField', () => {
  const dispatch = jest.fn()
  let mockContext

  beforeEach(() => mockContext = new ReactContextMock())

  afterEach(() => mockContext.reset())

  describe('when entering field text', () => {
    beforeEach(() => {
      mockContext.returnValue({ state: { fieldErrors: [] }, dispatch })
      const form = mount(<FormField bsClass='input-field' stateKey='field'/>)
      changeText(form, '.input-field', 'some value')
    })

    it('sets the field value', () =>
      expect(dispatch).toHaveBeenCalledWith(
        Actions.setFieldValue('field', 'some value')))
  })

  describe('list of br-separated messages', () => {
    it('handles multiple messages', () => {
      expect(lines(['abc', '123']))
        .toEqual(<div>
          <div key={1}>abc</div>
          <div key={1}>123</div>
        </div>)
    })

    it('returns undefined when no messages exist', () => {
      expect(lines(undefined)).toBeUndefined()
      expect(lines([])).toBeUndefined()
    })
  })

  describe('validations', () => {
    let wrapper
    let dispatch
    let state

    beforeEach(() => {
      state = { fieldErrors: [] }
      dispatch = jest.fn()
      mockContext.returnValue({ state, dispatch })
      wrapper = mount(<FormField bsClass='aField' stateKey='someField' required/>)
    })

    it('adds validations', () =>
      expect(Actions.registerValidations).toHaveBeenCalled())

    // https://github.com/airbnb/enzyme/issues/1134
    describe('on focus', () => {
      beforeEach(() => jest.clearAllMocks())

      it('clears the field error', () => {
        focus(wrapper, '.aField')

        expect(dispatch).toHaveBeenCalledWith(Actions.clearFieldError('aField'))
      })
    })
  })
})
