// START:leaky
let spaces = []

const maxId = () => spaces.length

// START_HIGHLIGHT
const clearAllSpaces = () => spaces.length = 0
// END_HIGHLIGHT

// ...
// END:leaky
export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  if (isTestServer())
    app.route('/spaces/clear').get(clearSpaces)
}

export const postSpace = (request, response) => {
  const space = request.body
  space.id = maxId() + 1
  spaces.push(space)
  response.status(200).json(space.id)
}

export const getSpaces = (request, response) =>
  response.send(spaces)

// START:leaky
export const clearSpaces = (request, response) => {
  // START_HIGHLIGHT
  clearAllSpaces()
  // END_HIGHLIGHT
  response.end()
}
// END:leaky
