const axios = require('axios')

const url = path => `http://localhost:3002${path}`

describe('when posting a space', () => {
  beforeEach(async () =>
    await axios.get(url('/spaces/clear')))

  it('returns the generated ID', async () => {
    const response = await axios.post(url('/space'),
      { 'city': 'X', 'street-address': 'Y' })

    const json = response.data

    expect(json).toEqual(1)
  })

  it('persists at the server', async () => {
    await axios.post(url('/space'),
      {  'city': 'A', 'street-address': '1' })
    const response = await axios.get(url('/spaces'))

    const json = response.data

    expect(json).toEqual([
      { 'city': 'A', 'street-address': '1', 'id': 1 }
    ])
  })
})
