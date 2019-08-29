import axios from 'axios'

export const url = path => `http://localhost:3002/space${path}`

export const submit = component => {
  const space = { city: component.city, address: component.streetAddress }
  return axios.post(url('/space'), space)
    .then(response => {
      component.setState({ currentSpaceId: response.data })
    })
    .catch(error => {
      component.setState({ errorMessage: error.response.data.message })
    })
}
