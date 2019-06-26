import express from 'express'
import bodyParser from 'body-parser'
import * as Routes from './routes'

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

Routes.configure(app)

app.listen(3002, () => console.log(`server listening`))
