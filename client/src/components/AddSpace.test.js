import * as React from 'react'
import { mount } from 'enzyme'
import AddSpace from './AddSpace'
import ReactContextMock from './ReactContextMock'
import * as Actions from '../actions'
jest.mock('../actions/index.js')

describe('an AddSpace form', () => {
  const state = { fieldErrors: [] }
  const dispatch = jest.fn()
  let mockContext

  beforeEach(() => {
    mockContext = new ReactContextMock()
    mockContext.returnValue({ state, dispatch })
  })

  afterEach(() => mockContext.reset())

  it('adds space on submit', () => {
    const component = mount(<AddSpace />)

    component.find('.button-submit').simulate('click')

    expect(Actions.postSpace).toHaveBeenCalledWith(state, dispatch)
  })
})
