let space = undefined

// START_HIGHLIGHT
export const configure = app => {
// END_HIGHLIGHT
  app.route('/space').post((request, response) => {
    space = request.body
    space.id = 1
    response.status(200).json(1)
  })

  app.route('/spaces').get((request, response) =>
    response.send([ space ]))
// START_HIGHLIGHT
}
// END_HIGHLIGHT

