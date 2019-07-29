import * as DB from './db'

describe('a space database', () => {
  beforeEach(async () => await DB.clearAll())

  // START_HIGHLIGHT
  const ASpace = { city: 'C' }
  const AnotherSpace = { city: 'D' }
  // END_HIGHLIGHT

  it('retrieves persisted space', async () => {
    // START_HIGHLIGHT
    await DB.add(ASpace)
    // END_HIGHLIGHT

    const spaces = await DB.findAll()

    expect(spaces).toMatchObject([ { city: 'C', address: '99' } ])
  })

  // START_HIGHLIGHT
  it('returns an ID string', async () => {
    const id1 = await DB.add(ASpace)

    expect(typeof id1).toEqual('string')
  })

  it('returns unique IDs', async () => {
    const id1 = await DB.add(ASpace)
    const id2 = await DB.add(AnotherSpace)

    expect(id1).not.toEqual(id2)
  })
  // END_HIGHLIGHT
})
