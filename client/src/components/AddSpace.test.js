import React from 'react'
import { mount } from 'enzyme'
import AddSpace from './AddSpace'

const changeText = (component, selector, value) => {
  component.find(selector).simulate('change', {target: {value}})
}

describe('an AddSpace form', () => {
  it('adds space on submit', () => {
    const mockSubmit = jest.fn()
    const component = mount(<AddSpace submitFn={mockSubmit}/>)
    changeText(component, '.input-street-address', '1 Main St')
    changeText(component, '.input-city', 'Laurel')

    component.find('.button-submit').simulate('click')

    expect(mockSubmit).toHaveBeenCalledWith(
      { streetAddress: '1 Main St', city: 'Laurel' })
  })
})
