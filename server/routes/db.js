import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

const inMongoDbContext = onThen =>
  new Promise((resolve, reject) =>
    MongoClient.connect(url)
      .then(client => {
        const db = client.db()
        onThen(resolve, reject, db)
      })
      .catch(error => reject(error)))

export const add = (space) =>
  inMongoDbContext((resolve, reject, db) =>
    db.collection('spaces').insertOne(space)
      .then(result => resolve(result.ops[0]._id)))

export const findAll = () =>
  inMongoDbContext((resolve, reject, db) =>
    resolve(db.collection('spaces').find({}).toArray()))
