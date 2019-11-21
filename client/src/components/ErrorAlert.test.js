import React from 'react'
import ErrorAlert from './ErrorAlert'
import {storeContext} from '../StoreContext'
import {reducer, initialState} from '../reducers'
import {shallow} from 'enzyme'
import * as Actions from '../actions'

jest.mock('../StoreContext.js')

describe('ErrorAlert', () => {
  const dispatch = jest.fn()

  it('includes error message from state', () => {
    const state = reducer(initialState, Actions.setErrorMessage('bad stuff'))
    storeContext.mockReturnValue({ state, dispatch })

    const component = shallow(<ErrorAlert/>)

    expect(component.html()).toContain('bad stuff')
  })

  it('renders nothing if no error message', () => {
    storeContext.mockReturnValue({ state: initialState, dispatch })

    const component = shallow(<ErrorAlert/>)

    expect(component.get(0)).toBeFalsy()
  })
})