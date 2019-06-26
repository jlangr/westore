import * as DB from './db'

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  app.route('/spaces').delete(clearAllSpaces)
}

const defaultErrorHandler = error => response.status(500).send(`server error: ${error.message}`)

export const postSpace = (request, response) => {
  const space = request.body
  DB.add(space)
    .then(id => response.status(201).send(id))
    .catch(defaultErrorHandler)
}

export const getSpaces = (request, response) =>
  DB.findAll()
    .then(spaces => response.json(spaces))
    .catch(defaultErrorHandler)

export const clearAllSpaces = (request, response) =>
  DB.clearAll()
    .then(() => response.status(200).send())
    .catch(defaultErrorHandler)
