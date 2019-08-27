import * as Routes from './index.js'
import MockExpress from 'jest-mock-express'

jest.mock('../persistence/db.js')

describe('when posting spaces', () => {

  it('answers 500 status', () => {
    // DB.
    //
    // const aSpace = {city: 'A', address: '1'}
    // const response = MockExpress.response()
    // // Routes.clearSpaces({}, MockExpress.response())
    //
    // Routes.postSpace({body: aSpace}, response)
    //
    // expect(response.status).toHaveBeenCalledWith(500)
  })

})
