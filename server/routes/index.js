// import * as DB from './db'
import { add, clearAll, findAll } from './db'

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  app.route('/spaces').delete(clearAllSpaces)
}

const sendErrorResponse = (response, error) =>
  response.status(500).send(`server error: ${error.message}`)

export const postSpace = (request, response) => {
  const space = request.body
  add(space)
    .then(id => response.status(201).send(id))
    .catch(error => sendErrorResponse(response, error))
}

export const getSpaces = (request, response) =>
  /* DB. */findAll()
    .then(spaces => response.json(spaces))
    .catch(error => sendErrorResponse(response, error))

export const clearAllSpaces = (request, response) => {
  // console.log("DB:", DB)
  /* DB. */clearAll()
    .then(() => response.status(200).send())
    .catch(error => sendErrorResponse(response, error))
}
