import * as React from 'react'
import { mount } from 'enzyme'
import FormField from './FormField'
import ReactContextMock from './ReactContextMock'
import * as Actions from '../actions'
import * as Validation from '../validations/validation'

jest.mock('../actions')

const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', {target: {value}})

describe('FormField', () => {
  const dispatch = jest.fn()
  let mockContext

  beforeEach(() => mockContext = new ReactContextMock())

  afterEach(() => mockContext.reset())

  describe('when entering field text', () => {
    beforeEach(() => {
      mockContext.returnValue({ state: { fieldErrors: [] }, dispatch })
      const form = mount(<FormField bsClass='input-field' stateKey='field' />)
      changeText(form, '.input-field', 'some value')
    })

    it('sets the field value', () =>
      expect(dispatch).toHaveBeenCalledWith(
        Actions.setFieldValue('field', 'some value')))
  })

  describe('validations', () => {
    beforeEach(() => {
      mockContext.returnValue({ state: { fieldErrors: [] }, dispatch })
      mount(<FormField bsClass='input-field' stateKey='someField' required />)
    })

    describe('hasContent', () => {
      it('adds required validation to state', () => {
        expect(dispatch).toHaveBeenCalledWith(
          Actions.setValidations('someField', [ Validation.hasContent ])
        )
      })
    })
  })
})
