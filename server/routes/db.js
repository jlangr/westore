import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = (space, response) =>
  MongoClient.connect(url)
    .then(client => {
      const db = client.db()
      db.collection('spaces').insertOne(space) // This returns a promise
        .then(result => response.status(201).send(result.ops[0]._id))
        .catch(error => response.status(500).send(error.message)
      )
    })
    .catch(error => response.status(500).send(error.message) )

export const findAll = response =>
  MongoClient.connect(url)
    .then(client => {
      const db = client.db()
      db.collection('spaces').find({}).toArray() // this returns a promise
        .then(docs => response.status(200).json(docs))
        .catch(error => response.status(500).send(error.message))
    })
    .catch(error => response.status(500).send(error.message) )

