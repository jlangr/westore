import * as DB from './db'

describe('a space database', () => {
  beforeEach(async () => await DB.clearAll())

  it('retrieves persisted space', async () => {
    await DB.add({ city: 'C', address: '99' })

    const spaces = await DB.findAll()

    expect(spaces).toMatchObject([ { city: 'C', address: '99' } ])
  })
})
