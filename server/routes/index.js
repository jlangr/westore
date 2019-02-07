let space = undefined

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
}

const postSpace = (request, response) => {
  space = request.body
  space.id = 1
  response.status(200).json(1)
}

const getSpaces = (request, response) =>
  response.send([ space ])
