const axios = require('axios')

describe('space', () => {
  it('returns id of generated space', async () => {
    const response = await axios.post('http://localhost:3002/space',
      { 'city': 'X', 'street-address': 'Y' })

    const json = response.data

    expect(json).toEqual(1)
  })
})
