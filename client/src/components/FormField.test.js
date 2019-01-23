import React from 'react'
import { mount } from 'enzyme'
import FormField from './FormField'

const changeText = (component, selector, value) => {
  component.find(selector).simulate('change', {target: {value}})
}

describe('a FormField', () => {
  describe('when entering field text', () => {
    const parent = { setState: jest.fn() }
    const form = mount(<div><FormField parent={parent} bsClass='input-field' stateKey='field' /></div>)

    beforeEach(() => changeText(form, '.input-field', 'some value'))

    it('updates the state with the field value', () => {
      expect(parent.setState).toHaveBeenCalledWith({ field: 'some value' })
    })
  })
})
