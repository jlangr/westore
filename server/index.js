import express from 'express'
import bodyParser from 'body-parser'

const app = express()

const allowCORS = app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
allowCORS(app)

app.use(bodyParser.json())

let space = undefined

app.route('/space').post((request, response) => {
  space = request.body
  space.id = 1
  response.status(200).json(1)
})

app.route('/spaces').get((request, response) =>
  response.send([ space ]))

app.listen(3002, () => console.log(`server listening`))
