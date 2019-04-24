import * as Routes from './index.js'
import MockExpress from 'jest-mock-express'

// START:clear
describe('when posting spaces', () => {
  let response
  const aSpace = { city: 'A', address: '1' }

  beforeEach(() => {
    response = MockExpress.response()
// START_HIGHLIGHT
    Routes.clearSpaces({}, MockExpress.response())
// END_HIGHLIGHT
    Routes.postSpace({ body: aSpace }, response)
  })
// ...
// END:clear

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

      expect(response.send).toHaveBeenCalledWith(
        [ expect.objectContaining(aSpace),
          expect.objectContaining(anotherSpace) ])
    })
  })
// START:clear
})
// END:clear
