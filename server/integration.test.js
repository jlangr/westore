const axios = require('axios')

const url = path => `http://localhost:3002${path}`

// START_HIGHLIGHT
describe('when posting a space', () => {
  it('returns the generated ID', async () => {
// END_HIGHLIGHT
    const response = await axios.post(url('/space'),
      { 'city': 'X', 'street-address': 'Y' })

    const json = response.data

    expect(json).toEqual(1)
  })

// START_HIGHLIGHT
  it('persists the space', async () => {
// END_HIGHLIGHT
    await axios.post(url('/space'),
      {  'city': 'A', 'street-address': '1' })
    const response = await axios.get(url('/spaces'))

    const json = response.data

    expect(json).toEqual([
      { 'city': 'A', 'street-address': '1', 'id': 1 }
    ])
  })
})
