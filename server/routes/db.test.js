import * as DB from './db'

describe('a space database', () => {
  beforeEach(async () => await DB.clearAll())

  it('generates a unique id for a space', async () => {
    const id1 = await DB.add({ city: 'A', address: '1' })
    const id2 = await DB.add({ city: 'B', address: '2' })

    expect(id1).not.toEqual(id2)
  })

  it('retrieves persisted space', async () => {
    await DB.add({ city: 'C', address: '99' })

    const spaces = await DB.findAll()

    expect(spaces.length).toEqual(1)
  })
})
