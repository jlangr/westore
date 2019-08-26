// START_HIGHLIGHT
import * as DB from '../persistence/db'
// END_HIGHLIGHT

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  if (isTestServer())
    app.route('/spaces/clear').get(clearSpaces)
}

export const postSpace = (request, response) => {
  const space = request.body
// START_HIGHLIGHT
  DB.add(space)
    .then(id => response.status(200).json(id))
// END_HIGHLIGHT
}

export const getSpaces = (request, response) =>
// START_HIGHLIGHT
  DB.findAll()
    .then(spaces => response.send(spaces))
// END_HIGHLIGHT

export const clearSpaces = (request, response) =>
// START_HIGHLIGHT
  DB.clearAll()
    .then(() => response.end())
// END_HIGHLIGHT
