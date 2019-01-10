import React from 'react'
import { shallow } from 'enzyme'
import AddSpace from './AddSpace'

describe('an AddSpace form', () => {
  it('captures the property address', () => {
    const component = shallow(<AddSpace />) //<callout id="code.AddSpace.test.1"/>
    // START:simulate-change
    component.find('.input-street-address') //<callout id="code.AddSpace.test.2"/>
      .simulate('change', { target: { value: '1 Main St'}})
    // END:simulate-change
    expect(component.state().streetAddress).toEqual('1 Main St') //<callout id="code.AddSpace.test.3"/>
  })
})
