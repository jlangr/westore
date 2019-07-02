import {MongoClient} from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = async space =>
  await (await spaces()).insertOne(space)

export const findAll = async () =>
  await (await spaces()).find({}).toArray()

export const clearAll = async () =>
  await (await spaces()).deleteMany({})

const spaces = async () => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true})
  return client.db().collection('spaces')
}

