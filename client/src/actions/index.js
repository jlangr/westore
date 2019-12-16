import axios from 'axios'
import { type } from '../reducers'

export const ErrorRestUnknownProblem = 'unknown error'
export const ErrorRestNoResponse = 'no response from server'

export const url = path => `http://localhost:3002${path}`

// so if you request the wrong route, it returns a preflight check error, "Network Error"
// and there is no error.response
// do we need to explicitly do the 404 at the server itself?
// note: if it was unable to contact the server, isAxiosError returns true

export const clearErrorMessage = () => setErrorMessage('')

export const clearFieldError = fieldName =>
  ({ type: type.ClearFieldError, payload: fieldName })

export const getSpaces = dispatch => {
  return axios.get(url('/spaces'))
    .then(response => dispatch(setCurrentSpaces(response.data)))
    .catch(error => dispatch(restCallError(error)))
}

export const postSpace = (state, dispatch) => {
  dispatch(clearErrorMessage())
  const space = { city: state.fields.city, address: state.fields.address }
  return axios.post(url('/space'), space)
    .then(response => dispatch(setCurrentSpaceId(response.data)))
    .catch(error => dispatch(restCallError(error)))
}

export const restCallError = error => {
  if (error.response) return setErrorMessage(error.response.data.message)
  if (error.request) return setErrorMessage(ErrorRestNoResponse)
  return setErrorMessage(ErrorRestUnknownProblem)
}

export const setCurrentSpaceId = id =>
  ({ type: type.SetCurrentSpaceId, payload: id})

export const setCurrentSpaces = spaces =>
  ({ type: type.SetCurrentSpaces, payload: spaces })

export const setErrorMessage = message =>
  ({type: type.SetErrorMessage, payload: message})

export const setFieldValue = (key, value) =>
  ({ type: type.SetFormField, payload: { [ key ]: value }})

export const setValidations = (field, validationFns) =>
  ({type: type.SetValidations, payload: { field, validationFns }})

export const validateSpaceFields = () =>
  ({ type: type.ValidateSpaceFields })
