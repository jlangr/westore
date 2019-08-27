import * as DB from '../persistence/db'

describe('a space database', () => {
  const ASpace = { city: 'C', address: '99' }
  const AnotherSpace = { city: 'D', address: '100' }

  beforeEach(async () => await DB.clearAll())

  it('retrieves persisted space', async () => {
    await DB.add(ASpace)

    const spaces = await DB.findAll()

    expect(spaces).toMatchObject([ ASpace ])
  })

  it('returns an ID string', async () => {
    const id1 = await DB.add(ASpace)

    expect(typeof id1).toEqual('string')
  })

  it('returns unique IDs', async () => {
    const id1 = await DB.add(ASpace)
    const id2 = await DB.add(AnotherSpace)

    expect(id1).not.toEqual(id2)
  })
})
