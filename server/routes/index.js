import * as DB from '../persistence/db'

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  if (isTestServer())
    app.route('/spaces/clear').get(clearSpaces)
  // TODO add handling for route not found and make sure the client gets an appropriate message
}

export const postSpace = (request, response) => {
  const space = request.body
  return DB.add(space)
    .then(id => { response.status(200).json(id) })
    .catch(error => {
      response.status(500).send({ message: error.message })
    })
}

export const getSpaces = (request, response) =>
  DB.findAll()
    .then(spaces => response.send(spaces))

export const clearSpaces = (request, response) =>
  DB.clearAll()
    .then(() => response.end())
