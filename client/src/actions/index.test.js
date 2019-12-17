import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as Actions from './'

describe('actions involving rest calls', () => {
  let mock
  let dispatch

  beforeEach(() => {
    mock = new MockAdapter(axios)
    dispatch = jest.fn()
  })

  describe('posting a space via submit', () => {
    const state = { fields: { city: { value: 'X' }, address: { value: 'Y' } } }

    it('updates state on success', async () => {
      mock.onPost(Actions.url('/space'))
        .reply(200, 'ID0')

      await Actions.postSpace(state, dispatch)

      expect(dispatch)
        .toHaveBeenCalledWith(Actions.setCurrentSpaceId('ID0'))
    })

    it('dispatches to set error on failure', async () => {
      mock.onPost(Actions.url('/space'))
        .reply(400, { message: 'invalid request' })

      await Actions.postSpace(state, dispatch)

      expect(dispatch)
        .toHaveBeenCalledWith(Actions.setErrorMessage('invalid request'))
    })
  })

  describe('retrieving all spaces', () => {
    it('dispatches to update state with all spaces on success', async () => {
      const spaces = [
        { id: 'A1', city: 'Pueblo', address: '1 Main St.'},
        { id: 'A3', city: 'Boise', address: '2 Elm St.'} ]
      mock.onGet(Actions.url('/spaces'))
        .reply(200, spaces)

      await Actions.getSpaces(dispatch)

      expect(dispatch)
        .toHaveBeenCalledWith(Actions.setCurrentSpaces(spaces))
    })

    // DUPLICATE STUFF!
    it('dispatches to set error on failure', async () => {
      mock.onGet(Actions.url('/spaces'))
        .reply(400, { message: 'invalid request' })

      await Actions.getSpaces(dispatch)

      expect(dispatch)
        .toHaveBeenCalledWith(Actions.setErrorMessage('invalid request'))
    })
  })
})

describe('setting the error message for a rest call error', () => {
  const request =  { data: 123 }

  it('uses the response message', () => {
    const error = { request, response: { data: { message: 'boo' }}}

    const action = Actions.restCallError(error)

    expect(action).toEqual(Actions.setErrorMessage('boo'))
  })

  it('indicates response problem if request but no response', () => {
    const error = { request }

    const action = Actions.restCallError(error)

    expect(action).toEqual(Actions.setErrorMessage(Actions.ErrorRestNoResponse))
  })

  it('indicates unknown problem if no request or response', () => {
    const error = { }

    const action = Actions.restCallError(error)

    expect(action).toEqual(Actions.setErrorMessage(Actions.ErrorRestUnknownProblem))
  })
})