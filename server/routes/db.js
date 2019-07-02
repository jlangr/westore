import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = async space => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true})
  return await client.db().collection('spaces').insertOne(space)
}

export const findAll = async () => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true})
  return await client.db().collection('spaces').find({}).toArray()
}

export const clearAll = async () => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true})
  return await client.db().collection('spaces').deleteMany({})
}


