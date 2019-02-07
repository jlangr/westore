const axios = require('axios')

const url = path => `http://localhost:3002${path}`

// START:clearIntegration
describe('when posting a space', () => {
// START_HIGHLIGHT
  beforeEach(async () =>
    await axios.get(url('/spaces/clear')))
// END_HIGHLIGHT

  it('returns the generated ID', async () => {
    // ...
    // END:clearIntegration
    const response = await axios.post(url('/space'),
      { 'city': 'X', 'street-address': 'Y' })

    const json = response.data

    expect(json).toEqual(1)
    // START:clearIntegration
  })

// START_HIGHLIGHT
  it('persists at the server', async () => {
// END_HIGHLIGHT
    // ...
    // END:clearIntegration
    await axios.post(url('/space'),
      {  'city': 'A', 'street-address': '1' })
    const response = await axios.get(url('/spaces'))

    const json = response.data

    expect(json).toEqual([
      { 'city': 'A', 'street-address': '1', 'id': 1 }
    ])
  })
  // START:clearIntegration
})
// END:clearIntegration
