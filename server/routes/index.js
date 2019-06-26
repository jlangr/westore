import * as DB from './db'

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
}

export const postSpace = (request, response) => {
  const space = request.body
  DB.add(space)
    .then(id => response.status(201).send(id))
    .catch(error => response.status(500).send(`server error: ${error.message}`))
}

export const getSpaces = (request, response) =>
  DB.findAll()
    .then(spaces => response.json(spaces))
    .catch(error => response.status(500).send(`server error: ${error.message}`))

