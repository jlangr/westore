import React from 'react'
import { shallow } from 'enzyme'
import AddSpace from './AddSpace'

const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', { target: { value }})

describe('an AddSpace form', () => {
  it('captures the property address', () => {
    const component = shallow(<AddSpace />)

    changeText(component, '.input-street-address', '1 Main St')

    expect(component.state().streetAddress).toEqual('1 Main St')
  })

  // START:new-test
  it('captures the city', () => {
    const component = shallow(<AddSpace />)

    changeText(component, '.input-city', 'Laurel')

    expect(component.state().city).toEqual('Laurel')
  })
  // END:new-test
})
