import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

const inMongoDbContext = onThen =>
  new Promise((resolve, reject) =>
    MongoClient.connect(url, { useNewUrlParser: true })
      .then(client => onThen(resolve, reject, client.db()))
      .catch(error => reject(error)))

const spaces = db => db.collection('spaces')

export const add = (space) =>
  inMongoDbContext((resolve, reject, db) =>
    spaces(db).insertOne(space)
      .then(result => resolve(result.ops[0]._id)))

export const findAll = () =>
  inMongoDbContext((resolve, reject, db) =>
    resolve(spaces(db).find({}).toArray()))

export const clearAll = () =>
  inMongoDbContext((resolve, reject, db) =>
    resolve(spaces(db).deleteMany({})))
