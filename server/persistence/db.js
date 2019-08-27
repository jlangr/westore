// START:db
import { MongoClient } from 'mongodb'

// ... (removed global declaration of url)
// END:db
export const add = (space) => inMongoDbContext((resolve, reject, db) =>
  spaces(db).insertOne(space)
    .then(result =>
      resolve(result.ops[0]._id.toString())))

export const findAll = () => inMongoDbContext((resolve, reject, db) =>
  resolve(spaces(db).find({}).toArray()))

export const clearAll = () => inMongoDbContext((resolve, reject, db) =>
  resolve(spaces(db).deleteMany({})))
// START:db

const inMongoDbContext = onThen =>
  new Promise((resolve, reject) => {
// START_HIGHLIGHT
    const url = global.properties.mongoDbUrl
// END_HIGHLIGHT
    return MongoClient.connect(url, { useNewUrlParser: true })
      .then(client => onThen(resolve, reject, client.db()))
  })
// ...
// END:db

const spaces = db => db.collection('spaces')
