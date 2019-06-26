import * as DB from './db'

describe('a space database', () => {
  const aSpace = { city: 'A', address: '1' }

  // beforeEach(async () => {
  //   db = await DB.connect()
  // })
  //
  // afterEach(async () => {
  //   console.log('closing')
  //   console.log('...closing')
  //   await DB.close(db)
  //   console.log('!!! closed')
  // })

  it('retrieves persisted space', async () => {
    const response = {
      send: data => {
        this.data = data
        console.log("SENDING", data)
      }
    }
    const id = await DB.add(aSpace, response)
    console.log("done add")
    console.log("waited")
    // const retrieved = await DB.getSpaces(response)
    //
    // const spaces = await retrieved.toArray()
    // expect(spaces.length).toBeGreaterThan(1)
    // expect(spaces.length).toEqual(1)
  })
})

// const id = await DB.add(db, aSpace)
// let retrieved = await db.collection('spaces').findOne({ _id: id })
// expect(retrieved).toMatchObject(aSpace)

// something else will need to open the database
// function wait(ms){
//   var start = new Date().getTime();
//   var end = start;
//   while(end < start + ms) {
//     end = new Date().getTime();
//   }
// }
// wait(5000)
