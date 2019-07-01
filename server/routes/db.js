import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = space =>
  new Promise(resolve =>
    MongoClient.connect(url, {useNewUrlParser: true})
      .then(client => {
        const db = client.db()
        db.collection('spaces').insertOne(space)
          .then(result => resolve(result.ops[0]._id))
      }))

export const findAll = () =>
  new Promise(resolve =>
    MongoClient.connect(url, {useNewUrlParser: true})
      .then(client => {
        const db = client.db()
        resolve(db.collection('spaces').find({}).toArray())
      }))

