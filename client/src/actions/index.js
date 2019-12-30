import axios from 'axios'
import { type } from '../reducers'
import * as Validation from '../validations/validation'

export const ErrorRestUnknownProblem = 'unknown error'
export const ErrorRestNoResponse = 'no response from server'

export const url = path => `http://localhost:3002${path}`

// so if you request the wrong route, it returns a preflight check error, "Network Error"
// and there is no error.response
// do we need to explicitly do the 404 at the server itself?
// note: if it was unable to contact the server, isAxiosError returns true

export const clearErrorMessage = () => setErrorMessage('')

export const clearFieldError = fieldName => ({ type: type.ClearFieldError, payload: fieldName })

export const getSpaces = dispatch => {
  return axios.get(url('/spaces'))
    .then(response => dispatch(setCurrentSpaces(response.data)))
    .catch(error => dispatch(restCallError(error)))
}


export const addSpaceIfValid = (state, dispatch) => {
  const errors = Validation.collectErrors(state)
  if (Validation.hasErrors(errors))
    dispatch(setErrors(errors))
  else
    postSpace(state, dispatch)
}

// Fix test! .value
export const postSpace = (state, dispatch) => {
  dispatch(clearErrorMessage())
  const space = { city: state.fields.city.value, address: state.fields.address.value }
  return axios.post(url('/space'), space)
    .then(response => dispatch(setCurrentSpaceId(response.data)))
    .catch(error => dispatch(restCallError(error)))
}

export const restCallError = error => {
  if (error.response) return setErrorMessage(error.response.data.message)
  if (error.request) return setErrorMessage(ErrorRestNoResponse)
  return setErrorMessage(ErrorRestUnknownProblem)
}

export const setCurrentSpaceId = id => ({ type: type.SetCurrentSpaceId, payload: id})

export const setCurrentSpaces = spaces => ({ type: type.SetCurrentSpaces, payload: spaces })

export const setErrorMessage = message => ({type: type.SetErrorMessage, payload: message})

export const setErrors = errors => ({type: type.SetErrors, payload: errors })

export const setFieldValue = (field, value) => ({ type: type.SetFormField, payload: { field, value }})

export const setValidations = (field, validationFns) => ({type: type.SetValidations, payload: { field, validationFns }})

export const validateSpaceFields = () => ({ type: type.ValidateSpaceFields })

