import React from 'react'
import {shallow} from 'enzyme'
import {storeContext} from '../StoreContext'
import ListSpaces, {spaceComponent} from './ListSpaces'
import * as Actions from '../actions'
import {initialState, reducer} from '../reducers'

jest.mock('../StoreContext.js')

const space1 = { _id: '1', city: 'Phoenix', address: '12 Pine' }
const space2 = { _id: '2', city: 'Basalt', address: '9 Jones' }

describe('ListSpaces', () => {
  const dispatch = jest.fn()

  it('loads spaces when initialized', () => {
    storeContext.mockReturnValue({ state: initialState, dispatch })
    jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f())
    jest.spyOn(Actions, 'getSpaces')

    shallow(<ListSpaces />)

    expect(Actions.getSpaces).toHaveBeenCalled()
  })

  it('renders a row for each space', () => {
    const state = reducer(initialState, Actions.setCurrentSpaces([space1, space2]))
    storeContext.mockReturnValue({ state, dispatch })

    const component = shallow(<ListSpaces />)

    const oneTrForTheHeaderRow = 1
    expect(component.find('tr').length).toEqual(oneTrForTheHeaderRow + 2)

  })

  describe('space detail component', () => {
    it('renders space elements as table row', () => {
      const wrapper = shallow(spaceComponent(space1))

      expect(wrapper.contains(<td>{space1.city}</td>)).toBeTruthy()
      expect(wrapper.contains(<td>{space1.address}</td>)).toBeTruthy()
    })
  })
})