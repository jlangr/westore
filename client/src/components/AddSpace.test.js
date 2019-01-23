import React from 'react'
import { mount } from 'enzyme'
import AddSpace from './AddSpace'

const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', { target: { value }})

// START:mount_not_shallow
describe('an AddSpace form', () => {
  let component

  // START_HIGHLIGHT
  beforeEach(() => component = mount(<AddSpace />))
  // END_HIGHLIGHT
// ...
// END:mount_not_shallow

  it('captures the property address', () => {
    changeText(component, '.input-street-address', '1 Main St')

    expect(component.state().streetAddress).toEqual('1 Main St')
  })

  it('captures the city', () => {
    changeText(component, '.input-city', 'Laurel')

    expect(component.state().city).toEqual('Laurel')
  })
})
