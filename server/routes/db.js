import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = space =>
  new Promise(resolve =>
    MongoClient.connect(url, {useNewUrlParser: true})
      .then(client => {
        const db = client.db()
        // START_HIGHLIGHT
        db.collection('spaces').insertOne(space)
        // END_HIGHLIGHT
      }))

export const findAll = () =>
  new Promise(resolve =>
    MongoClient.connect(url, {useNewUrlParser: true})
      .then(client => {
        const db = client.db()
        // START_HIGHLIGHT
        resolve(db.collection('spaces').find({}).toArray())
        // END_HIGHLIGHT
      }))

