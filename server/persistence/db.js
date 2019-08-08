import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/westore'

export const add = (space) => inMongoDbContext((resolve, reject, db) =>
  resolve(spaces(db).insertOne(space)))

export const findAll = () => inMongoDbContext((resolve, reject, db) =>
  resolve(spaces(db).find({}).toArray()))

export const clearAll = () => inMongoDbContext((resolve, reject, db) =>
  resolve(spaces(db).deleteMany({})))

const inMongoDbContext = onThen =>
  new Promise((resolve, reject) =>
    MongoClient.connect(url, { useNewUrlParser: true })
      .then(client => onThen(resolve, reject, client.db())))

const spaces = db => db.collection('spaces')




