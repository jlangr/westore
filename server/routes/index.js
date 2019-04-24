// START_HIGHLIGHT
let spaces = []

const maxId = () => spaces.length
// END_HIGHLIGHT

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
}

export const postSpace = (request, response) => {
  // START_HIGHLIGHT
  const space = request.body
  const id = maxId() + 1
  spaces.push(Object.assign({ id }, space))
  response.status(200).json(id)
  // END_HIGHLIGHT
}

export const getSpaces = (request, response) =>
// START_HIGHLIGHT
  response.send(spaces)
// END_HIGHLIGHT
