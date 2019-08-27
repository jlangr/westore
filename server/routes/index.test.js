import * as Routes from './index.js'
import MockExpress from 'jest-mock-express'
import * as DB from '../persistence/db.js'

jest.mock('../persistence/db.js')

describe('given that database adds will reject', () => {
  const ASpace = {city: 'A', address: '1'}
  let response

  beforeEach(() => {
    response = MockExpress.response()
    DB.add.mockReturnValueOnce(
      Promise.reject(new Error('some error message')))
  })

  describe('when posting a space', () => {
    beforeEach(async () =>
      await Routes.postSpace({ body: ASpace }, response))

    it('answers 500 status', () =>
      expect(response.status).toHaveBeenCalledWith(500))

    it('provides an error message', () =>
      expect(response.send)
        .toHaveBeenCalledWith({ message: 'some error message' }))
  })
})
