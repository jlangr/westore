import MockExpress from 'jest-mock-express'

describe('when posting spaces', () => {
  let response
  const aSpace = { city: 'A', address: '1' }

  beforeEach(async () => {
    jest.resetModules()

    response = MockExpress.response()
    jest.mock("./db", () => ({ add: () => Promise.resolve('A123') }))
    const { postSpace } = require('./index.js')
    await postSpace({ body: aSpace }, response)
  })

  it('returns generated ID', () => {
    expect(response.send).toHaveBeenCalledWith('A123')
  })

  // https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b

  it('answers 200 status', () =>
    expect(response.status).toHaveBeenCalledWith(201))
})
