import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = async space => {
  // START_HIGHLIGHT
  const result = await (await spaces()).insertOne(space)
  return result.ops[0]._id.toString()
  // END_HIGHLIGHT
}

export const findAll = async () =>
  await (await spaces()).find({}).toArray()

export const clearAll = async () =>
  await (await spaces()).deleteMany({})

const spaces = async () => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true})
  return client.db().collection('spacesx')
}
