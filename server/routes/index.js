let spaces = []

const maxId = () => spaces.length

const clearAllSpaces = () => spaces.length = 0

const addSpace = space => {
  const id = maxId() + 1
  spaces.push(Object.assign({ id }, space))
  return id
}

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
  if (isTestServer())
    app.route('/spaces/clear').get(clearSpaces)
}

export const postSpace = (request, response) => {
  const space = request.body
  const id = addSpace(space)
  response.status(200).json(id)
}

export const getSpaces = (request, response) =>
  response.send(spaces)

export const clearSpaces = (request, response) => {
  clearAllSpaces()
  response.end()
}
