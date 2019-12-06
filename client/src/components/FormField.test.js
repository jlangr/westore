import React from 'react'
import { mount } from 'enzyme'
import FormField from './FormField'
import { storeContext } from '../StoreContext'
import * as Actions from '../actions'
import * as Validation from '../validations/validation'

jest.mock('../StoreContext.js')
jest.mock('../actions')

const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', {target: {value}})

describe('FormField', () => {
  describe('when entering field text', () => {
    const dispatch = jest.fn()
    storeContext.mockReturnValue({ state: { fieldErrors: [] }, dispatch })
    const form = mount(<FormField bsClass='input-field' stateKey='field' />)

    beforeEach(() => changeText(form, '.input-field', 'some value'))

    it('sets the field value', () =>
      expect(dispatch).toHaveBeenCalledWith(
        Actions.setFieldValue('field', 'some value')))
  })

  describe('validations', () => {
    describe('hasContent', () => {
      const dispatch = jest.fn()
      storeContext.mockReturnValue({ state: { fieldErrors: [] }, dispatch })
      mount(<FormField bsClass='input-field' stateKey='someField' required />)

      it('adds required validation to state', () => {
        expect(dispatch).toHaveBeenCalledWith(
          Actions.setValidations('someField', [ Validation.hasContent ])
        )
      })
    })
  })
})
