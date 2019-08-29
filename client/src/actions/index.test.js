import * as Actions from './index'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('a space posting', () => {
  let mock
  let component

  beforeEach(() => {
    mock = new MockAdapter(axios)
    component = { setState: jest.fn(), state: {} }
  })

  it('updates state on success', async () => {
    mock.onPost(Actions.url('/space'))
      .reply(200, 'ID0')
    component.state.city = 'X'
    component.state.streetAddress = 'Y'

    await Actions.submit(component)

    expect(component.setState)
      .toHaveBeenCalledWith({ currentSpaceId: 'ID0' })
  })

  it('updates error message on failure', async () => {
    mock.onPost(Actions.url('/space'))
      .reply(400, { message: 'invalid request' })
    // the data structure we can learn from reading the server-side tests

    await Actions.submit(component)

    expect(component.setState)
      .toHaveBeenCalledWith({ errorMessage: 'invalid request' })
  })
})