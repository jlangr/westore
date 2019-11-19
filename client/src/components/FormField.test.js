import React from 'react'
import { mount } from 'enzyme'
import FormField from './FormField'
import { storeContext } from '../StoreContext'
import * as Actions from '../actions'

jest.mock('../StoreContext.js')
jest.mock('../actions')

const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', {target: {value}})

describe('FormField', () => {
  describe('when entering field text', () => {
    const dispatch = jest.fn()
    storeContext.mockReturnValue({ state: {}, dispatch })
    const form = mount(<FormField parent={parent} bsClass='input-field' stateKey='field' />)

    beforeEach(() => changeText(form, '.input-field', 'some value'))

    it('sets the field value', () =>
      expect(Actions.setFieldValue).toHaveBeenCalledWith(dispatch, 'field', 'some value'))
  })
})
