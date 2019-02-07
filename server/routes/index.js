// START:clear
let spaces = []

// ...
// END:clear

const maxId = () => spaces.length

export const configure = app => {
  app.route('/space').post(postSpace)
  app.route('/spaces').get(getSpaces)
}

export const postSpace = (request, response) => {
  // START_HIGHLIGHT
  const space = request.body
  space.id = maxId() + 1
  spaces.push(space)
  response.status(200).json(space.id)
  // END_HIGHLIGHT
}

export const getSpaces = (request, response) =>
  response.send(spaces)
// START:clear

// START_HIGHLIGHT
export const clearSpaces = () =>
  spaces.length = 0
// END_HIGHLIGHT
// END:clear
