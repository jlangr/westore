import * as React from 'react'
import ErrorAlert from './ErrorAlert'
import {reducer, initialState} from '../reducers'
import {shallow} from 'enzyme'
import * as Actions from '../actions'
import ReactContextMock from './ReactContextMock'

describe('ErrorAlert', () => {
  const dispatch = jest.fn()
  let mockContext

  beforeEach(() =>  {
    mockContext = new ReactContextMock()
  })

  afterEach(() => mockContext.reset())

  it('includes error message from state', () => {
    const state = reducer(initialState, Actions.setErrorMessage('bad stuff'))
    mockContext.returnValue( { state, dispatch })

    const component = shallow(<ErrorAlert/>)

    expect(component.html()).toContain('bad stuff')
  })

  it('renders nothing if no error message', () => {
    mockContext.returnValue({ state: initialState, dispatch })

    const component = shallow(<ErrorAlert/>)

    expect(component.get(0)).toBeFalsy()
  })
})