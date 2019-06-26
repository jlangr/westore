import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = (space) =>
  new Promise((resolve, reject) =>
    MongoClient.connect(url)
      .then(client => {
        const db = client.db()
        db.collection('spaces').insertOne(space)
          .then(result => resolve(result.ops[0]._id))
      })
      .catch(error => reject(error)))

export const findAll = () =>
  new Promise((resolve, reject) =>
    MongoClient.connect(url)
      .then(client => {
        const db = client.db()
        resolve(db.collection('spaces').find({}).toArray())
      })
      .catch(error => reject(error)))

