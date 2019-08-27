import * as Routes from './index.js'
import MockExpress from 'jest-mock-express'
import * as DB from '../persistence/db.js'

jest.mock('../persistence/db.js')

describe('when posting spaces', () => {
  let response

  beforeEach(() => response = MockExpress.response())

  it('answers 500 status', async () => {
    DB.add.mockReturnValueOnce(
      Promise.reject(new Error('some error message')))

    await Routes.postSpace({body: {city: 'A', address: '1'}}, response)

    expect(response.status).toHaveBeenCalledWith(500)
  })
})
