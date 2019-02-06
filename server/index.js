import express from 'express'

const app = express()

// START_HIGHLIGHT
// support CORS requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
// END_HIGHLIGHT

app.route('/space').post((request, response) => {
  response.status(200).json(1)
})

app.listen(3002, () => console.log(`server listening`))
