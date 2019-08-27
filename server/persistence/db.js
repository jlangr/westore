import { MongoClient } from 'mongodb'

export const add = (space) => inMongoDbContext((resolve, reject, db) =>
  spaces(db).insertOne(space)
    .then(result =>
      resolve(result.ops[0]._id.toString())))

export const findAll = () => inMongoDbContext((resolve, reject, db) =>
  resolve(spaces(db).find({}).toArray()))

export const clearAll = () => inMongoDbContext((resolve, reject, db) =>
  resolve(spaces(db).deleteMany({})))

const inMongoDbContext = onThen =>
  new Promise((resolve, reject) => {
    const url = global.properties.mongoDbUrl
    return MongoClient.connect(url, { useNewUrlParser: true })
      .then(client => onThen(resolve, reject, client.db()))
      .catch(error =>
        reject(new Error(`unable to establish connection: ${error.message}`)))
  })

const spaces = db => db.collection('spaces')
