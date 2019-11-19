import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as Actions from './'

describe('posting a space via submit', () => {
  let mock
  let dispatch
  const state = { fields: { city: 'X', streetAddress: 'Y' } }

  beforeEach(() => {
    mock = new MockAdapter(axios)
    dispatch = jest.fn()
  })

  it('updates state on success', async () => {
    mock.onPost(Actions.url('/space'))
      .reply(200, 'ID0')

    await Actions.postSpace(state, dispatch)

    expect(dispatch)
      .toHaveBeenCalledWith(Actions.setCurrentSpaceId('ID0'))
  })

  it('updates error message on failure', async () => {
    mock.onPost(Actions.url('/space'))
      .reply(400, { message: 'invalid request' })

    await Actions.postSpace(state, dispatch)

    expect(dispatch)
      .toHaveBeenCalledWith(Actions.setErrorMessage('invalid request'))
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