const axios = require('axios')

// START_HIGHLIGHT
const url = path => `http://localhost:3002${path}`
// END_HIGHLIGHT

describe('space', () => {
  it('returns id of generated space', async () => {
// START_HIGHLIGHT
    const response = await axios.post(url('/space'),
// END_HIGHLIGHT
      { 'city': 'X', 'street-address': 'Y' })

    const json = response.data

    expect(json).toEqual(1)
  })

  // START_HIGHLIGHT
  describe('get spaces', () => {
    it('returns added space', async () => {
// START_HIGHLIGHT
      await axios.post(url('/space'),
// END_HIGHLIGHT
        {  'city': 'A', 'street-address': '1' })
// START_HIGHLIGHT
      const response = await axios.get(url('/spaces'))
// END_HIGHLIGHT

      const json = response.data

      expect(json).toEqual([
        { 'city': 'A', 'street-address': '1', 'id': 1 }
      ])
    })
  })
  // END_HIGHLIGHT
})
