import * as React from 'react'
import {shallow} from 'enzyme'
import ListSpaces, {spaceComponent} from './ListSpaces'
import ReactContextMock from './ReactContextMock'
import * as Actions from '../actions'
import {initialState, reducer} from '../reducers'

const space1 = { _id: '1', city: 'Phoenix', address: '12 Pine' }
const space2 = { _id: '2', city: 'Basalt', address: '9 Jones' }

describe('ListSpaces', () => {
  const dispatch = jest.fn()
  let mockContext

  beforeEach(() => mockContext = new ReactContextMock())

  afterEach(() => mockContext.reset())

  it('loads spaces when initialized', () => {
    mockContext.returnValue({ state: initialState, dispatch })
    jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f())
    jest.spyOn(Actions, 'getSpaces')

    shallow(<ListSpaces />)

    expect(Actions.getSpaces).toHaveBeenCalled()
  })

  it('renders a row for each space', () => {
    const state = reducer(initialState, Actions.setCurrentSpaces([space1, space2]))
    mockContext.returnValue({ state, dispatch })

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