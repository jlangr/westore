import * as Routes from './index.js'
// START_HIGHLIGHT
import MockExpress from 'jest-mock-express'
// END_HIGHLIGHT

describe('when posting spaces', () => {
  let response
  const aSpace = { city: 'A', address: '1' }

  beforeEach(() => {
    response = MockExpress.response()
    Routes.postSpace({ body: aSpace }, response)
  })

  it('returns generated ID', () =>
    expect(response.json).toHaveBeenCalledWith(1))

  it('answers 200 status', () =>
    expect(response.status).toHaveBeenCalledWith(200))

  describe('with a second post', () => {
    const anotherSpace = { city: 'B', address: '2' }

    beforeEach(() => {
      response = MockExpress.response()
      Routes.postSpace({ body: anotherSpace }, response)
    })

    it('increments the generated ID', () => {
      expect(response.json).toHaveBeenCalledWith(2)
    })

    it('returns all posted spaces', () => {
      response = MockExpress.response()

      Routes.getSpaces({}, response)

      expect(response.send).toHaveBeenCalledWith([ aSpace, anotherSpace ])
    })
  })
})
