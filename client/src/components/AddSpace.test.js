import React from 'react'
import { mount } from 'enzyme'
import AddSpace from './AddSpace'

describe('an AddSpace form', () => {
  it('adds space on submit', () => {
    const mockSubmit = jest.fn()
    const component = mount(<AddSpace submitFn={mockSubmit}/>)

    component.find('.button-submit').simulate('click')

    expect(mockSubmit).toHaveBeenCalled()
  })
})
