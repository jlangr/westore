// START:properties
import express from 'express'
import bodyParser from 'body-parser'
import * as Routes from './routes'
// START_HIGHLIGHT
import PropertiesReader from 'properties-reader'

global.properties =
  new PropertiesReader('./persistence/db.prod.properties').getAllProperties()
// END_HIGHLIGHT

const app = express()
// ...
// END:properties

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
