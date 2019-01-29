const axios = require('axios')

describe('space', () => {
  it('returns id of generated space', async () => {
    const response = await axios.post('http://localhost:3002/space',
      { 'city': 'X', 'street-address': 'Y' })

    const json = response.data

    expect(json).toEqual(1)
  })

  describe('get spaces', () => {
    it('returns added space', async () => {
      await axios.post('http://localhost:3002/space',
        {  'city': 'A', 'street-address': '1' })
      const response = await axios.get('http://localhost:3002/spaces')

      const json = response.data

      expect(json).toEqual([
        { 'city': 'A', 'street-address': '1', 'id': 1 }
      ])
    })
  })
})
