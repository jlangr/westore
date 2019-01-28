import express from 'express'

const app = express()

app.route('/space').post((request, response) => {
  response.status(200).json(1)
})

app.listen(3002, () => console.log(`server listening`))
