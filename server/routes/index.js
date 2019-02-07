let spaces = []

const maxId = () => spaces.length

// START:clear
export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  // START_HIGHLIGHT
  app.route('/spaces/clear').get(clearSpaces)
  // END_HIGHLIGHT
}
// ...
// END:clear

export const postSpace = (request, response) => {
  const space = request.body
  space.id = maxId() + 1
  spaces.push(space)
  response.status(200).json(space.id)
}

export const getSpaces = (request, response) =>
  response.send(spaces)
// START:clear

// START_HIGHLIGHT
export const clearSpaces = (request, response) => {
// END_HIGHLIGHT
  spaces.length = 0
// START_HIGHLIGHT
  response.end()
}
// END_HIGHLIGHT
// END:clear
