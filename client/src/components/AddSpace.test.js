import React from 'react'
import { shallow } from 'enzyme'
import AddSpace from './AddSpace'

// START:change-text
//START_HIGHLIGHT
const changeText = (component, selector, value) =>
  component.find(selector).simulate('change', { target: { value }})
//END_HIGHLIGHT

describe('an AddSpace form', () => {
  it('captures the property address', () => {
    const component = shallow(<AddSpace />) //<callout id="code.AddSpace.test.1"/>
    //START_HIGHLIGHT

    changeText(component, '.input-street-address', '1 Main St')

    //END_HIGHLIGHT
    expect(component.state().streetAddress).toEqual('1 Main St') //<callout id="code.AddSpace.test.3"/>
  })
})
// END:change-text
