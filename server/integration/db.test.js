import * as DB from '../persistence/db'

describe('a space database', () => {
  beforeEach(async () => await DB.clearAll())

  it('retrieves persisted space', async () => {
    await DB.add({ city: 'C', address: '99' })

    const spaces = await DB.findAll()

    // START_HIGHLIGHT
    expect(spaces).toMatchObject([ { city: 'C', address: '99' } ])
    // END_HIGHLIGHT
  })
})