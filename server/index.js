import express from 'express'

const app = express()

// START_HIGHLIGHT
<<<<<<< HEAD
const allowCORS = app => {
// END_HIGHLIGHT
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
// START_HIGHLIGHT
allowCORS(app)
// END_HIGHLIGHT

app.route('/space').post((request, response) => {
  response.status(200).json(1)
})

app.listen(3002, () => console.log(`server listening`))
