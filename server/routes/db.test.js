import * as DB from './db'

describe('a space database', () => {
  it('retrieves persisted space', async () => {
    await DB.add({ city: 'C', address: '99' })

    const spaces = await DB.findAll()

    expect(spaces.length).toEqual(1)
  })
})