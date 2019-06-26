import * as DB from './db'

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
}

export const postSpace = (request, response) => {
  const space = request.body
  DB.add(space, response)
}

export const getSpaces = (request, response) =>
  DB.findAll(response)
