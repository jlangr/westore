const axios = require('axios')

const url = path => `http://localhost:3002${path}`

describe('when posting a space', () => {
  let postSpaceResponse

  beforeEach(async () => {
    await axios.get(url('/spaces/clear'))
    postSpaceResponse = await axios.post(url('/space'),
      {  'city': 'A', 'street-address': '1' })
  })

  it('persists at the server', async () => {
    const allSpaces = await axios.get(url('/spaces'))

    expect(allSpaces.data).toMatchObject([
      {'city': 'A', 'street-address': '1'}
    ])
  })

  it('returns the assigned ID', async() => {
    const id = postSpaceResponse.data
    const allSpaces = await axios.get(url('/spaces'))

    expect(id).toEqual(allSpaces.data[0]._id)
  })
})
