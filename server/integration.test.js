const axios = require('axios')

const url = path => `http://localhost:3002${path}`

describe('when posting a space', () => {
  beforeEach(async () =>
    await axios.delete(url('/spaces')))

  it('persists at the server', async () => {
    await axios.post(url('/space'),
      {  'city': 'A', 'street-address': '1' })
    const response = await axios.get(url('/spaces'))

    const json = response.data

    expect(json[0]).toMatchObject({ 'city': 'A', 'street-address': '1' })
  })
})
