import axios from 'axios'

export const url = path => `http://localhost:3002${path}`

export const submit = component => {
  console.log(component)
  const space = { city: component.state.city, address: component.state.streetAddress }
  console.log(`submitting space `, space)
  return axios.post(url('/space'), space)
    .then(response => {
      component.setState({ currentSpaceId: response.data })
    })
    .catch(error => {
      component.setState({ errorMessage: error.response.data.message })
    })
}
