import express from 'express'
// START_HIGHLIGHT
import bodyParser from 'body-parser'
// END_HIGHLIGHT

const app = express()

const allowCORS = app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
allowCORS(app)

// START_HIGHLIGHT
app.use(bodyParser.json())

let space = undefined
// END_HIGHLIGHT

app.route('/space').post((request, response) => {
// START_HIGHLIGHT
  space = request.body
  space.id = 1
// END_HIGHLIGHT
  response.status(200).json(1)
})

// START_HIGHLIGHT
app.route('/spaces').get((request, response) =>
  response.send([ space ]))
// END_HIGHLIGHT

app.listen(3002, () => console.log(`server listening`))
