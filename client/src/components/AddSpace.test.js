import React from 'react'
import { shallow } from 'enzyme'
import AddSpace from './AddSpace'

describe('an AddSpace form', () => {
  it('captures the property address', () => {
    const component = shallow(<AddSpace />)
    component.find('.input-street-address')
      .simulate('change', { target: { value: '1 Main St'}})
    expect(component.state().streetAddress).toEqual('1 Main St')
  })
})