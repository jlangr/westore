import React from 'react'
import { shallow } from 'enzyme'
import AddSpace from './AddSpace'

const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', { target: { value }})

// START:refactored-test
describe('an AddSpace form', () => {
  // START_HIGHLIGHT
  let component

  beforeEach(() => component = shallow(<AddSpace />))
  // END_HIGHLIGHT

  it('captures the property address', () => {
    changeText(component, '.input-street-address', '1 Main St')

    expect(component.state().streetAddress).toEqual('1 Main St')
  })

  it('captures the city', () => {
    changeText(component, '.input-city', 'Laurel')

    expect(component.state().city).toEqual('Laurel')
  })
})
// END:refactored-test
