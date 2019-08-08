import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = space =>
  new Promise((resolve, _reject) =>
    MongoClient.connect(url, { useNewUrlParser: true })
      .then(client => {
        const db = client.db()
        resolve(db.collection('spaces').insertOne(space))
      }))

export const findAll = () =>
  new Promise((resolve, _reject) =>
    MongoClient.connect(url, { useNewUrlParser: true })
      .then(client => {
        const db = client.db()
        resolve(db.collection('spaces').find({}).toArray())
      }))

export const clearAll = () =>
  new Promise((resolve, _reject) =>
    MongoClient.connect(url, { useNewUrlParser: true })
      .then(client => {
        const db = client.db()
        resolve(db.collection('spaces').deleteMany({}))
      }))



