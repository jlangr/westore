// START:leaky
let spaces = []

const maxId = () => spaces.length

const clearAllSpaces = () => spaces.length = 0

// START_HIGHLIGHT
const addSpace = space => {
  const id = maxId() + 1
  spaces.push(Object.assign({ id }, space))
  return id
}
// END_HIGHLIGHT

// ...
// END:leaky
export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  if (isTestServer())
    app.route('/spaces/clear').get(clearSpaces)
}

// START:leaky
export const postSpace = (request, response) => {
  const space = request.body
// START_HIGHLIGHT
  const id = addSpace(space)
// END_HIGHLIGHT
  response.status(200).json(id)
}
// END:leaky

export const getSpaces = (request, response) =>
  response.send(spaces)

export const clearSpaces = (request, response) => {
  clearAllSpaces()
  response.end()
}
