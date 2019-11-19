import React from 'react'
import { mount } from 'enzyme'
import AddSpace from './AddSpace'
import * as Actions from '../actions'
import { storeContext } from '../StoreContext'

jest.mock('../actions/index.js')
jest.mock('../StoreContext.js')

describe('an AddSpace form', () => {
  const state = {}
  const dispatch = jest.fn()

  beforeEach(() => {
    storeContext.mockReturnValue({ state, dispatch })
  })

  it('adds space on submit', () => {
    const component = mount(<AddSpace />)

    component.find('.button-submit').simulate('click')

    expect(Actions.postSpace).toHaveBeenCalledWith(state, dispatch)
  })
})
